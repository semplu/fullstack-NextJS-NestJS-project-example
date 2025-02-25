'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCountry, updateCountry } from '../api';
import { Country, CountryFormData } from '@/entities/country/types';
import { Dialog, DialogContent, TextField, Button } from '@mui/material';
import {useState} from "react";

interface EditCountryModalProps {
  open: boolean;
  country: Country | null;
  onClose: () => void;
}

export function EditCountryModal({ open, country, onClose }: EditCountryModalProps) {
  const [name, setName] = useState(country?.name || '');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CountryFormData) =>
      country ? updateCountry(country.id, data) : createCountry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Country Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin={'dense'}
            fullWidth
          />
          <Button type="submit" variant="contained">
            {country ? 'Update' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
