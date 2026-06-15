// Type-Definitionen für KI-Provider

export type ProviderType = "rest" | "local" | "grpc";

export interface Provider {
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  enabled: boolean;
  type: ProviderType;
}

export interface ProviderResponse {
  provider: string;
  model: string;
  content: string;
  duration: number;
  timestamp: Date;
}
