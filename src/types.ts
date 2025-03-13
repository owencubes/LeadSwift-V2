export interface Lead {
  title: string;
  url: string;
  email: string;
}

export interface LeadGenerationRequest {
  niche: string;
  pages: number;
}

export interface LeadGenerationResponse {
  leads: Lead[];
}