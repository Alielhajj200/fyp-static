import { Box, Typography } from '@mui/material';
import React, { useRef } from 'react';
import BodyPart from './BodyPart';

const LeftArrow = ({ scrollContainer }) => {
  const scrollPrev = () => {
    scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  return (
    <Typography onClick={scrollPrev} className="right-arrow">
      <img src="https://cdn2.iconfinder.com/data/icons/arrows-part-1/32/tiny-arrow-left-2-512.png" alt="right-arrow" width="40px" height="40px" />
    </Typography>
  );
};

const RightArrow = ({ scrollContainer }) => {
  const scrollNext = () => {
    scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <Typography onClick={scrollNext} className="left-arrow">
      <img src="https://cdn2.iconfinder.com/data/icons/arrows-part-1/32/tiny-arrow-right-2-256.png" alt="right-arrow" width="40px" height="40px" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {
  const scrollContainer = useRef(null);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LeftArrow scrollContainer={scrollContainer} />
      <div
        ref={scrollContainer}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          width: '100%', // Adjust this width as necessary
        }}
      >
        {data.map((item) => (
          <Box
            key={item.id || item}
            title={item.id || item}
            m="0 40px"
            flexShrink={0}
          >
            <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
          </Box>
        ))}
      </div>
      <RightArrow scrollContainer={scrollContainer} />
    </div>
  );
};

export default HorizontalScrollbar;
