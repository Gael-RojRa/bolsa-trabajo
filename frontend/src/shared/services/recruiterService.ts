import axios from '../api/axiosInstance';// la misma instancia que usas para login

export const getMyOffers = () => axios.get('/recruiter/offers');

export const getOfferPostulations = (offerId: number) =>
  axios.get(`/recruiter/offers/${offerId}/postulations`);

export const updatePostulationStatus = (
  postulationId: number,
  status: 'accepted' | 'rejected'
) => axios.patch(`/postulations/${postulationId}`, { status });
