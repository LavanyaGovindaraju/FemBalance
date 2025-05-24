// Enhanced ResultSection.js with better data visualization
import React, { useRef } from 'react';
import { 
  Paper, Typography, Box, Divider, Button, Chip, 
  List, ListItem, ListItemIcon, ListItemText, LinearProgress 
} from '@mui/material';
import { 
  Warning as WarningIcon, 
  CheckCircle as CheckIcon,
  LocalHospital as HospitalIcon,
  Favorite as HeartIcon 
} from '@mui/icons-material';
import RiskScoreCircle from './RiskScoreCircle';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const conditionStyles = {
  "PCOS": { 
    emoji: "⚙️", 
    bg: "linear-gradient(135deg, #F8BBD0 0%, #FCE4EC 100%)",
    color: "#880E4F"
  },
  "Hypothyroidism": { 
    emoji: "🐌", 
    bg: "linear-gradient(135deg, #B3E5FC 0%, #E1F5FE 100%)",
    color: "#01579B"
  },
  "PMDD": { 
    emoji: "😔", 
    bg: "linear-gradient(135deg, #D1C4E9 0%, #EDE7F6 100%)",
    color: "#4A148C"
  },
  "Perimenopause": { 
    emoji: "🔥", 
    bg: "linear-gradient(135deg, #C8E6C9 0%, #E8F5E9 100%)",
    color: "#1B5E20"
  }
};

const getConfidenceColor = (confidence) => {
  switch(confidence?.toLowerCase()) {
    case 'high': return '#4CAF50';
    case 'medium': return '#FF9800';
    case 'low': return '#757575';
    default: return '#757575';
  }
};

const getRiskScoreMessage = (score) => {
  if (score >= 0.8) return "High likelihood - Consider professional consultation";
  if (score >= 0.6) return "Moderate likelihood - Continue monitoring symptoms";
  if (score >= 0.4) return "Low-moderate likelihood - Track patterns";
  return "Low likelihood based on current symptoms";
};

const ResultSection = ({ result, name }) => {
  const ref = useRef();
  const { 
    condition_predicted, 
    risk_score, 
    recommendation, 
    confidence_level,
    risk_factors = [],
    next_steps = []
  } = result;
  
  const style = conditionStyles[condition_predicted] || { 
    emoji: "🔍", 
    bg: "linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 100%)",
    color: "#424242"
  };

  const handleDownload = async () => {
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${name.replace(/\s+/g, '_')}_hormone_health_report.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Report download failed. Please try again.');
    }
  };

  return (
    <>
      <Paper 
        ref={ref} 
        elevation={6} 
        sx={{
        p: 4,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
        border: '1px solid #e0e0e0',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Health Analysis Report
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Hello {name}, here's your personalized hormonal health assessment
          </Typography>
        </Box>

        {/* Condition Prediction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Primary Condition Indicator
          </Typography>
          <Box
            sx={{
              background: style.bg,
              color: style.color,
              fontWeight: 'bold',
              fontSize: '1.2rem',
              p: 3,
              borderRadius: 3,
              textAlign: 'center',
              boxShadow: 2,
              mb: 2
            }}
          >
            <Box sx={{ fontSize: '2rem', mb: 1 }}>
              {style.emoji}
            </Box>
            {condition_predicted}
          </Box>
          
          {/* Confidence Level */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="body2">Confidence Level:</Typography>
            <Chip 
              label={confidence_level || 'Medium'} 
              size="small"
              sx={{ 
                backgroundColor: getConfidenceColor(confidence_level),
                color: 'white'
              }}
            />
          </Box>
        </Box>

        {/* Risk Score Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Risk Assessment
          </Typography>
          <Box sx={{ mb: 2 }}>
            <RiskScoreCircle value={risk_score} />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {getRiskScoreMessage(risk_score)}
          </Typography>
          
          {/* Risk Score Bar */}
          <Box sx={{ mt: 2, mx: 4 }}>
            <LinearProgress 
              variant="determinate" 
              value={risk_score * 100} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: risk_score > 0.7 ? '#f44336' : 
                                 risk_score > 0.4 ? '#ff9800' : '#4caf50'
                }
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Risk Factors */}
        {risk_factors && risk_factors.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon color="warning" />
              Identified Risk Factors
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {risk_factors.map((factor, index) => (
                <Chip 
                  key={index}
                  label={factor}
                  variant="outlined"
                  color="warning"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Primary Recommendation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HeartIcon color="primary" />
            Primary Recommendation
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              backgroundColor: '#f1f8e9',
              borderLeft: '4px solid #4caf50'
            }}
          >
            <Typography variant="body1">
              {recommendation}
            </Typography>
          </Paper>
        </Box>

        {/* Next Steps */}
        {next_steps && next_steps.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon color="success" />
              Recommended Next Steps
            </Typography>
            <List dense>
              {next_steps.map((step, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <Box sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary={step}
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.95rem' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Disclaimer */}
        <Box sx={{ 
          mt: 4, 
          p: 2, 
          backgroundColor: '#fff3e0', 
          borderRadius: 2,
          border: '1px solid #ffcc02'
        }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HospitalIcon fontSize="small" />
            <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
          </Typography>
        </Box>
      </Paper>

      {/* Download Button */}
      <Box sx={{ textAlign: 'center', mt: 'auto', pt: 3 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleDownload}
          sx={{ px: 4, py: 1.5 }}
        >
          📄 Download Detailed Report
        </Button>
      </Box>
    </>
  );
};

export default ResultSection;