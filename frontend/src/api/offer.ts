import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export interface Offer {
  id: number;
  title: string;
  description: string | null;
  company_name: string;
  location: string | null;
  salary: number | null;
  status: 'open' | 'accepted' | 'rejected';
  created_at: string;
}

export const listOffers = async (page = 1) => {
  const { data } = await api.get<{ data: Offer[]; next_page_url: string | null }>(
    `/offers?page=${page}`,
    { headers: getAuthHeader() },
  );
  return data;
};

export const getOffer = async (id: number) => {
  const { data } = await api.get<Offer>(`/offers/${id}`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const acceptOffer = (id: number) =>
  api.post(`/offers/${id}/accept`, null, { headers: getAuthHeader() });

export const rejectOffer = (id: number) =>
  api.post(`/offers/${id}/reject`, null, { headers: getAuthHeader() });
