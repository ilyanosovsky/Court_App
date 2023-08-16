import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const CourtImagesDisplay = ({ courtPicturePath, BASE_URL }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setSelectedImage((prev) => Math.max(prev - 1, 0));
    } else if (direction === 'next') {
      setSelectedImage((prev) => Math.min(prev + 1, courtPicturePath.length - 1));
    }
  };

  return (
    <Box>
      {/* Display main picture */}
      <img
        src={`${BASE_URL}/assets/${courtPicturePath[selectedImage]}`}
        alt="court"
      />

      {/* Display thumbnails */}
      <Box display="flex" mt={2}>
        {courtPicturePath.map((picture, index) => (
          <IconButton key={index} onClick={() => handleThumbnailClick(index)}>
            <img
              src={`${BASE_URL}/assets/${picture}`}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '5px',
                border: index === selectedImage ? '2px solid blue' : 'none', // Highlight selected thumbnail
              }}
            />
          </IconButton>
        ))}
      </Box>

      {/* Transparent arrows for navigation */}
      <IconButton onClick={() => handleArrowClick('prev')}>
        <ArrowBackIosOutlinedIcon />
      </IconButton>
      <IconButton onClick={() => handleArrowClick('next')}>
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default CourtImagesDisplay;
