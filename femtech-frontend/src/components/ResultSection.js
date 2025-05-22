// File: src/components/ResultSection.js
import React, { useRef } from 'react';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import RiskScoreCircle from './RiskScoreCircle';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const conditionStyles = {
  "PCOS": { emoji: "⚙️", bg: "#F8BBD0" },
  "Hypothyroidism": { emoji: "🐌", bg: "#B3E5FC" },
  "PMDD": { emoji: "😔", bg: "#D1C4E9" },
  "Perimenopause": { emoji: "🔥", bg: "#C8E6C9" }
};

const ResultSection = ({ result, name }) => {
  const ref = useRef();
  const { condition_predicted, risk_score, recommendation } = result;
  const style = conditionStyles[condition_predicted] || { emoji: "", bg: "#E0E0E0" };

  const handleDownload = async () => {
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('hormone-health-report.pdf');
  };

  return (
    <>
      <Paper ref={ref} elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3, backgroundColor: '#fafafa' }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Hi {name}, based on your inputs:
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="body1" gutterBottom>
            Our analysis suggests that your hormonal pattern may be linked to:
          </Typography>
          <Box
            sx={{
              backgroundColor: style.bg,
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1rem',
              px: 2,
              py: 1,
              borderRadius: 2,
              display: 'inline-block',
              mt: 1
            }}
          >
            {style.emoji} {condition_predicted}
          </Box>
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Risk Score
          </Typography>
          <RiskScoreCircle value={risk_score} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: '#f1f8e9' }}>
          <Typography variant="subtitle2" gutterBottom>
            Recommendation
          </Typography>
          <Typography variant="body2">
            {recommendation}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleDownload}>
          Download My Report
        </Button>
      </Box>
    </>
  );
};

export default ResultSection;
