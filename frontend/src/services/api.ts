// Use relative path for Vite proxy in development, or env variable for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime: number;
  database: {
    status: string;
    connected: boolean;
  };
  environment: string;
}

export const healthCheck = async (): Promise<HealthCheckResponse> => {
  const url = API_BASE_URL ? `${API_BASE_URL}/api/health` : '/api/health';
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }
  
  return response.json();
};

