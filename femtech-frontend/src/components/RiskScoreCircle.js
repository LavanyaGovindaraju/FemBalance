// src/components/RiskScoreCircle.js
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const RiskScoreCircle = ({ value }) => {
  const percent = value * 100;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={percent} size={100} thickness={5} />
      <Box
        sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(percent)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default RiskScoreCircle;
