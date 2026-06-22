import type { Company } from "./companies";

export interface CompanyOutletContext{ 
    company: Company | null;
    setCompany: React.Dispatch<React.SetStateAction<Company | null>>
}