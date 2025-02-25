'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCountries, deleteCountry } from '@/features/country/api';
import { Country } from '@/entities/country/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Pagination,
  Container,
  Box, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { EditCountryModal } from '@/features/country/edit';
import { useAuth } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';

export default function CountriesPage() {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const limit = 5;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  const { data, isLoading } = useQuery({
    queryKey: ['countries', page],
    queryFn: () => getCountries(page, limit),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCountry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries', page] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this country?')) {
      deleteMutation.mutate(id);
    }
  };

  if (loading) return <div>Loading authentication...</div>;
  if (!user) return null;

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography component="h1" variant="h4" marginBottom={'20px'}>
        Countries
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Country
        </Button>
      </Box>
      {isLoading ? (
        <div>Loading countries...</div>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.countries?.map((country) => (
                <TableRow key={country.id}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>
                    {country.createdBy.id === user?.id && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            setSelectedCountry(country);
                            setOpenModal(true);
                          }}
                          sx={{ mr: 1, minWidth: '100px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(country.id)}
                          disabled={deleteMutation.isPending}
                          sx={{ minWidth: '100px' }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
            />
          </Box>
        </>
      )}
      <EditCountryModal
        open={openModal}
        country={selectedCountry}
        onClose={() => {
          setOpenModal(false);
          setSelectedCountry(null);
        }}
      />
    </Container>
  );
}
