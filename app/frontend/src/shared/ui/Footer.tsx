import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
      <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} My App. All rights reserved.
      </Typography>
    </Box>
  );
}
