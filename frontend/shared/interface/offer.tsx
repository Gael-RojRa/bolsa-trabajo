export interface OfferSimple {
  id: number;
  title: string;
  salary: string;
  company_name: string;
  company_logo: string;
  workingHours: string;
}

export interface OfferDetail {
  id: number;
  title: string;
  description: string;
  salary: string;
  area: string;
  location: {
    country: string;
    city: string;
  };
  company: {
    name: string;
    logo: string;
    description: string;
  };
  requirements?: string;
  skills: string[];
}

export interface OfferDetailResponse {
  data: OfferDetail;
  has_applied: boolean;
}