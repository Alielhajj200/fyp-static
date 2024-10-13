// pages/chat.js
import { cookies } from 'next/dist/client/components/headers';
"use client"
import React, { useEffect, useState } from 'react';
import { fetchData, ProductOptions } from '@/utils/fetchData';

const ChatPage = () => {
  const TOKEN_KEY = 'abcd123';
  
  interface User {
    _id: string;
    email: string;
    password: string;
    role: string[];
    age: number;
    gender: string | null;
    weight: number;
    height: number;
    activityLevel: string | null;
    goal: string | null;
    bmi: number;
    bodyType: string | null;
    progress: any[];
    __v: number;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [userEmails, setUserEmails] = useState<{ _id: string; email: string }[]>([]);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedDietitianId, setSelectedDietitianId] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const tokenResponse = localStorage.getItem(TOKEN_KEY);

      if (tokenResponse) {
        try {
          const base64Url = tokenResponse.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const decodedPayload = JSON.parse(atob(base64));

          // Set the logged-in user ID here
          setLoggedInUserId(decodedPayload.user._id);

          if (decodedPayload.user.role == "user") {
            const dietData: User[] = await fetchData(
              "http://192.168.56.1:3007/fyp/users/allDietitians",
              ProductOptions(tokenResponse)
            );
            setUsers(dietData);
            const emails = dietData.map((user) => ({ _id: user._id, email: user.email }));
            setUserEmails(emails);
          } else if (decodedPayload.user.role == "dietitian") {
            const userData: User[] = await fetchData(
              "http://192.168.56.1:3007/fyp/users/allusers",
              ProductOptions(tokenResponse)
            );
            const emails = userData.map((user) => ({ _id: user._id, email: user.email }));
            setUserEmails(emails);

            const historyData: User[] = await fetchData(
              "http://192.168.56.1:3007/fyp/users/user-chats",
              ProductOptions(tokenResponse)
            );
            const history = historyData.map((user) => user.user.email);
            setChatHistory(history);
          } else {
            console.log("Role not recognized.");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };

    const fetchMessages = async () => {
      if (selectedDietitianId) {
        try {
          const url = `http://192.168.56.1:3007/fyp/users/${selectedDietitianId}`;
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Error fetching messages: ${response.statusText}`);
          }

          const data = await response.json();
          const formattedMessages = data.map((msg: any) => ({
            sender: msg.user === selectedDietitianId ? "receiver" : "sender",
            text: msg.message,
          }));

          setMessages(formattedMessages);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    // Fetch data initially
    fetchInitialData();

    // Set intervals to refresh data every second
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedDietitianId]);
  
  
  
  

  const handleEmailClick = async (id: string) => {
    setSelectedDietitianId(id); // Set selected dietitian ID

    try {
      const url = `http://192.168.56.1:3007/fyp/users/${id}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching messages: ${response.statusText}`);
      }

      const data = await response.json();

      const formattedMessages = data.map((msg: any) => ({
        sender: msg.user === id ? 'receiver' : 'sender',
        text: msg.message,
      }));

      setMessages(formattedMessages);
      console.log('Messages:', formattedMessages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage || !selectedDietitianId || !loggedInUserId) return;

    try {
      const response = await fetch('http://192.168.56.1:3007/fyp/users/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
        body: JSON.stringify({
          message: currentMessage,
          dietitianId: selectedDietitianId,
        }),
      });

      if (response.status === 201) {
        console.log('Message sent successfully');
        setMessages([...messages, { sender: 'sender', text: currentMessage }]);
        setCurrentMessage("");
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat area whenever messages are updated
    const chatArea = document.querySelector('.chat-area');
    if (chatArea) {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Users list */}
      <div className="w-1/4 bg-primary text-white p-4">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <div style={{ maxHeight: 'calc(25 * 1.5rem)', overflowY: 'auto' }}>
          <ul>
            {userEmails.map((email, index) => (
              <li
                key={index}
                className="py-2 px-3 hover:bg-secondary rounded cursor-pointer"
                onClick={() => handleEmailClick(email._id)}
              >
                {email.email}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat area */}
      <div className="w-2/4 bg-white flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 chat-area" style={{ maxHeight: 'calc(25 * 1.5rem)', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.sender === 'receiver' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.sender === 'receiver' ? 'bg-gray-300 text-black' : 'bg-secondary text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input and send button */}
        <div className="sticky bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              onClick={sendMessage}
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Chat history */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">History</h2>
        <ul>
          {chatHistory.map((user, index) => (
            <li key={index} className="py-2 px-3 hover:bg-secondary rounded cursor-pointer">
              {user}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
