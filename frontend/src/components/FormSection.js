// File: src/components/FormSection.js
import React, { useState } from 'react';
import {
  Typography, TextField, Select, MenuItem, Button, FormControl,
  InputLabel, Box, Alert, Grid, Fade, Paper
} from '@mui/material';
import axios from 'axios';
import ResultSection from './ResultSection';
import SymptomCard from './SymptomCard';

const symptomList = [
  'Fatigue',
  'Weight gain',
  'Irregular periods',
  'Acne',
  'Hair loss',
  'Mood swings',
  'Low sex drive (libido)',
  'Hot flashes',
  'Sleep disturbance'
];

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    blood_group: '',
    cycle_length: '',
    stress_level: 'medium',
    sleep_hours: '',
    activity_level: 'medium',
    symptoms: symptomList.reduce((acc, s) => ({ ...acc, [s]: null }), {}),
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSymptomChange = (symptom, value) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (parseFloat(formData.sleep_hours) < 0) {
      setError('Sleep hours cannot be negative.');
      return;
    }

    const selectedSymptoms = Object.entries(formData.symptoms)
      .filter(([_, v]) => v === 'yes')
      .map(([k]) => k);

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        cycle_length: parseInt(formData.cycle_length),
        sleep_hours: parseFloat(formData.sleep_hours),
        symptoms: selectedSymptoms,
      };
      const response = await axios.post('http://localhost:8000/predict', payload);
      setResult(response.data);
    } catch (err) {
      setError('Prediction failed. Please check your backend or input.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: result ? 'row' : 'column' },
        justifyContent: result ? 'flex-start' : 'center',
        alignItems: result ? 'stretch' : 'center',
        gap: 4,
        mt: 4
      }}
    >
      {/* Left: Form Section */}
      <Box sx={{ flex: 1, maxWidth: 700, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, backgroundColor: '#ffffff', flex: 1 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Hormonal Health Predictor
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom color="text.primary">
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" name="name" fullWidth required value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Age" name="age" type="number" fullWidth required value={formData.age} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Height (cm)" name="height" type="number" fullWidth required value={formData.height} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Weight (kg)" name="weight" type="number" fullWidth required value={formData.weight} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Blood Group" name="blood_group" fullWidth required value={formData.blood_group} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Cycle Length (days)" name="cycle_length" type="number" fullWidth required value={formData.cycle_length} onChange={handleChange} />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Symptoms
              </Typography>
              <Grid container spacing={2}>
                {symptomList.map((symptom) => (
                  <Grid item xs={12} sm={4} key={symptom}>
                    <SymptomCard
                      symptom={symptom}
                      value={formData.symptoms[symptom]}
                      onChange={handleSymptomChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="stress-level-label">Stress Level</InputLabel>
              <Select
                labelId="stress-level-label"
                id="stress-level"
                name="stress_level"
                value={formData.stress_level}
                onChange={handleChange}
                label="Stress Level"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Sleep Hours" name="sleep_hours" type="number" fullWidth margin="normal" required value={formData.sleep_hours} onChange={handleChange} />

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="activity-level-label">Activity Level</InputLabel>
              <Select
                labelId="activity-level-label"
                id="activity-level"
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                label="Activity Level"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="contained" color="primary" type="submit">
                Check My Hormone Health
              </Button>
            </Box>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </Paper>
      </Box>

      {/* Right: Result Section */}
      {result && (
        <Fade in={!!result} timeout={600}>
          <Box sx={{ flex: 1, maxWidth: 700, display: 'flex', flexDirection: 'column' }}>
            <ResultSection result={result} name={formData.name} />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default FormSection;
