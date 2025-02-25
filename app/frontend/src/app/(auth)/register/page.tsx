'use client';

import { useMutation } from '@tanstack/react-query';
import { register } from '@/features/auth/api';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/shared/lib/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  const registerMutation = useMutation({
    mutationFn: () => register(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      setUser(data.user);
      router.push('/countries');
    },
    onError: (error: Error) => {
      setError(error.message || 'Registration failed. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    registerMutation.mutate();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Registration
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: '100%', maxWidth: 400 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            error={!!error && !email}
            helperText={!!error && !email ? 'Email is required' : ''}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && !password}
            helperText={!!error && !password ? 'Password is required' : ''}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!error && (password !== confirmPassword || !confirmPassword)}
            helperText={
              !!error && !confirmPassword
                ? 'Confirmation is required'
                : !!error && password !== confirmPassword
                  ? 'Passwords do not match'
                  : ''
            }
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Registration'
            )}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => router.push('/login')}
            sx={{ mt: 1 }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
