// File: src/components/SymptomCard.js
import React from 'react';
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Box
} from '@mui/material';

const symptomStyles = {
  "Fatigue": { emoji: "💤", bg: "#E3F2FD" },
  "Weight gain": { emoji: "⚖️", bg: "#FFF3E0" },
  "Irregular periods": { emoji: "🩸", bg: "#FCE4EC" },
  "Acne": { emoji: "😣", bg: "#F3E5F5" },
  "Hair loss": { emoji: "🧑‍🦲", bg: "#E8F5E9" },
  "Mood swings": { emoji: "😡", bg: "#FFFDE7" },
  "Low sex drive (libido)": { emoji: "💔", bg: "#E1F5FE" },
  "Hot flashes": { emoji: "🌡️", bg: "#FFEBEE" },
  "Sleep disturbance": { emoji: "🌙", bg: "#EDE7F6" },
};

const SymptomCard = ({ symptom, value, onChange }) => {
  const style = symptomStyles[symptom] || { emoji: "", bg: "#F9F9F9" };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        background: `linear-gradient(135deg, ${style.bg} 0%, #ffffff 100%)`,
        height: '100%',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <FormControl fullWidth>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="body2">{style.emoji}</Typography>
          <Typography variant="body2">{symptom}</Typography>
        </Box>
        <RadioGroup
          row
          name={symptom.replace(' (libido)', '')}
          value={value || ''}
          onChange={(e) => onChange(symptom, e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default SymptomCard;
