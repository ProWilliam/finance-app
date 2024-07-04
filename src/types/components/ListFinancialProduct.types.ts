export interface FinanceProduct  { 
  id: string;
  name: string;
  description: string;
  logo: string;
  dataRelease: string;
  dataRevision: string;
}

export interface FinanceProductsProps {
  data: FinanceProduct[];
}