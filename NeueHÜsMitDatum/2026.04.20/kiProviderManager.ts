// KI-Provider Konfiguration und Manager
// Demonstriert die Verwendung verschiedener OpenCode-Provider

import type { Provider } from "./types.ts";

// Provider-Konfiguration mit verschiedenen Optionen
const providersConfig: Record<string, Provider> = {
  "gemini": {
    name: "Google Gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    apiKey: Deno.env.get("GOOGLE_API_KEY") || "",
    model: "gemini-pro",
    enabled: !!Deno.env.get("GOOGLE_API_KEY"),
    type: "rest",
  },
  
  "openai": {
    name: "OpenAI GPT",
    baseUrl: "https://api.openai.com/v1",
    apiKey: Deno.env.get("OPENAI_API_KEY") || "",
    model: "gpt-3.5-turbo",
    enabled: !!Deno.env.get("OPENAI_API_KEY"),
    type: "rest",
  },
  
  "anthropic": {
    name: "Anthropic Claude",
    baseUrl: "https://api.anthropic.com",
    apiKey: Deno.env.get("ANTHROPIC_API_KEY") || "",
    model: "claude-3-sonnet-20240229",
    enabled: !!Deno.env.get("ANTHROPIC_API_KEY"),
    type: "rest",
  },
  
  "ollama": {
    name: "Ollama (Lokal)",
    baseUrl: "http://localhost:11434/api",
    apiKey: "", // Ollama benötigt normalerweise keinen API-Key
    model: "llama2",
    enabled: true,
    type: "local",
  },
};

// Provider Manager Klasse
export class KIProviderManager {
  private currentProvider: string = "gemini";
  private providers: Record<string, Provider> = providersConfig;

  /**
   * Wechselt den aktiven Provider
   */
  setProvider(providerName: string): void {
    if (!this.providers[providerName]) {
      throw new Error(`Provider '${providerName}' nicht konfiguriert`);
    }
    if (!this.providers[providerName].enabled) {
      throw new Error(`Provider '${providerName}' ist nicht aktiviert (API-Key fehlt)`);
    }
    this.currentProvider = providerName;
    console.log(`✓ Provider gewechselt zu: ${this.providers[providerName].name}`);
  }

  /**
   * Gibt alle verfügbaren Provider zurück
   */
  listProviders(): string[] {
    return Object.keys(this.providers);
  }

  /**
   * Gibt alle aktivierten Provider zurück
   */
  listEnabledProviders(): string[] {
    return Object.entries(this.providers)
      .filter(([_, provider]) => provider.enabled)
      .map(([key, provider]) => `${key} (${provider.name})`);
  }

  /**
   * Gibt den aktuellen Provider zurück
   */
  getCurrentProvider(): Provider {
    return this.providers[this.currentProvider];
  }

  /**
   * Ruft eine KI-API auf und gibt die Antwort zurück
   */
  async callProvider(prompt: string): Promise<string> {
    const provider = this.getCurrentProvider();
    
    console.log(`\n📤 Sende Anfrage an ${provider.name}...`);
    console.log(`   Model: ${provider.model}`);
    console.log(`   Prompt: ${prompt.substring(0, 50)}...`);

    try {
      const response = await this.makeRequest(provider, prompt);
      console.log(`✓ Antwort erhalten von ${provider.name}`);
      return response;
    } catch (error) {
      console.error(`✗ Fehler bei ${provider.name}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Intern: HTTP-Request zur API
   */
  private async makeRequest(provider: Provider, prompt: string): Promise<string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    let body: string;
    let endpoint: string;

    // Provider-spezifische Request-Formatierung
    switch (this.currentProvider) {
      case "gemini":
        headers["Authorization"] = `Bearer ${provider.apiKey}`;
        endpoint = `${provider.baseUrl}/models/${provider.model}:generateContent`;
        body = JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        });
        break;

      case "openai":
        headers["Authorization"] = `Bearer ${provider.apiKey}`;
        endpoint = `${provider.baseUrl}/chat/completions`;
        body = JSON.stringify({
          model: provider.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        });
        break;

      case "anthropic":
        headers["x-api-key"] = provider.apiKey;
        headers["anthropic-version"] = "2023-06-01";
        endpoint = `${provider.baseUrl}/v1/messages`;
        body = JSON.stringify({
          model: provider.model,
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });
        break;

      case "ollama":
        endpoint = `${provider.baseUrl}/generate`;
        body = JSON.stringify({
          model: provider.model,
          prompt: prompt,
          stream: false,
        });
        break;

      default:
        throw new Error(`Unbekannter Provider: ${this.currentProvider}`);
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`HTTP ${res.status}: ${error}`);
    }

    const data = await res.json();
    
    // Response-Parsing je nach Provider
    switch (this.currentProvider) {
      case "gemini":
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Keine Antwort";
      case "openai":
        return data.choices?.[0]?.message?.content || "Keine Antwort";
      case "anthropic":
        return data.content?.[0]?.text || "Keine Antwort";
      case "ollama":
        return data.response || "Keine Antwort";
      default:
        return JSON.stringify(data);
    }
  }
}

export default KIProviderManager;
