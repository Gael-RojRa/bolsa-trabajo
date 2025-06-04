import api from '../../../../shared/utils/axios';
import { OfferSimple, OfferDetailResponse } from '../../../../shared/interface/offer';

export const getOffers = async (): Promise<OfferSimple[]> => {
  const response = await api.get<{ data: OfferSimple[] }>('/offers');
  return response.data.data;
};

export const getOfferDetail = async (id: number): Promise<OfferDetailResponse> => {
  const response = await api.get<OfferDetailResponse>(`/offers/${id}`);
  return response.data;
};

export const applyToOffer = async (offerId: number): Promise<void> => {
  const response = await api.post(`/offers/apply`, { offer_id: offerId });
  if (response.status !== 201) {
    throw new Error('Failed to apply to offer');
  }
}
