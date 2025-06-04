import axios from '../api/axiosInstance';// la misma instancia que usas para login

export const getMyOffers = () => axios.get('/recruiter/offers');



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