
interface JobOffer {
  id: number;
  title: string;
  salary: number;
  workingHours: string;
  description: string;
  location: string;
  skills: string[];
  company: {
    id: number;
    name: string;
    logo: string;
  };
}

export default JobOffer;