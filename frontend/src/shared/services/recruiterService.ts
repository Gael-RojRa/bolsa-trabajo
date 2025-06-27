import axios from '../api/axiosInstance';// la misma instancia que usas para login

export const getMyOffers = () => axios.get('/recruiter/offers');

export interface OfferFormData {
  title: string;
  description: string;
  requirements?: string;
  salary: string;
  workingHours?: string;
  location_id: number;
}

export const createOffer = async (offerData: OfferFormData) => {
  const response = await axios.post('/recruiter/offers', offerData);
  console.log('Created Offer:', response.data);
  return response.data;
};

export const getOfferDetail = async (offerId: number) => {
  const response = await axios.get(`/recruiter/offers/${offerId}`);
  console.log('Offer Details:', response.data);
  return response.data;
};

export const updateOffer = async (offerId: number, offerData: OfferFormData) => {
  try {
    console.log('Enviando datos a la API:', JSON.stringify(offerData));
    
    // Asegurarse de enviar datos consistentes al API
    const cleanData = {
      ...offerData,
      salary: String(offerData.salary), // Garantizar que sea string
      // Asegurar que los campos opcionales sean al menos string vacíos
      requirements: offerData.requirements || '',
      workingHours: offerData.workingHours || '',
      location_id: offerData.location_id
    };
    
    const response = await axios.put(`/recruiter/offers/${offerId}`, cleanData);
    console.log('Updated Offer Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en updateOffer:', error);
    throw error; // Re-lanzar para manejo en componente
  }
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

export const getLocations = async () => {
  const response = await axios.get('/locations');
  console.log('Locations:', response.data);
  return response.data;
};