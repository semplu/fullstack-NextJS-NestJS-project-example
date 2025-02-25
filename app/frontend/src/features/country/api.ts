import { apiClient } from '@/shared/api/client';
import {Country, CountryFormData} from '@/entities/country/types';

export const getCountries = async (page: number, limit: number) => {
  const response = await apiClient.get<{ countries: Country[]; total: number }>('/countries', {
    params: { page, limit },
  });
  return response.data;
};

export const createCountry = async (data: CountryFormData) => {
  const response = await apiClient.post<Country>('/countries', data);
  return response.data;
};

export const updateCountry = async (id: string, data: CountryFormData) => {
  const response = await apiClient.patch<Country>(`/countries/${id}`, data);
  return response.data;
};

export const deleteCountry = async (id: string) => {
  await apiClient.delete(`/countries/${id}`);
};
