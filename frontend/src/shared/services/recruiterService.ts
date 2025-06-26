import axios from '../api/axiosInstance';// la misma instancia que usas para login

export const getMyOffers = () => axios.get('/recruiter/offers');

interface OfferFormData {
  title: string;
  description: string;
  requirements?: string;
  salary: string;
  workingHours?: string;
  location?: string;
  company_name?: string;
  company_logo?: string;
}

export const createOffer = async (offerData: OfferFormData) => {
  const response = await axios.post('/recruiter/offers', offerData);
  console.log('Created Offer:', response.data);
  return response.data;
};

export const getOfferPostulations = async (offerId: number) => {
  const response = await axios.get(`/offers/${offerId}/postulations`);
  console.log('Postulations:', response.data);
  return response.data;
}

export const updatePostulationStatus = async (
  postulationId: number,
  status: 'accepted' | 'rejected'
) => {
  const response = await axios.patch(`/postulations/${postulationId}/status`, { status });
  console.log('Updated Postulation:', response.data);
  return response.data;
};