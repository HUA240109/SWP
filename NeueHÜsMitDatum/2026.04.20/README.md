# HÜ5: Freie KI-Provider Konfiguration

Demonstration und Verwaltung verschiedener freier und opencode KI-Provider mit Deno.

## 📋 Übersicht

Dieses Projekt zeigt, wie verschiedene freie KI-Provider wie **Google Gemini**, **OpenAI**, **Anthropic Claude**, und **Ollama** konfiguriert und verwendet werden können.

## 🚀 Verwendung

### 1. Demo ausführen (alle verfügbaren Provider anzeigen)
```bash
deno run -A example.ts
```

### 2. Interaktiver Modus
```bash
deno run -A example.ts --interactive
```

## 🔧 Konfiguration

### Umgebungsvariablen setzen:

#### Google Gemini (kostenlos)
```bash
$env:GOOGLE_API_KEY = "your-api-key-here"
```
Hole dir einen API-Key unter https://ai.google.dev

#### OpenAI (Freemium mit Credits)
```bash
$env:OPENAI_API_KEY = "your-api-key-here"
```
Hole dir einen API-Key unter https://platform.openai.com/api-keys

#### Anthropic Claude (Freemium)
```bash
$env:ANTHROPIC_API_KEY = "your-api-key-here"
```

#### Ollama (Lokal & Kostenlos)
```bash
# Installiere Ollama von https://ollama.ai
# Starte: ollama serve
# Modell: ollama pull llama2
```

## 📁 Dateien

- **providers.txt**: Liste aller freien KI-Provider mit Links und Informationen
- **kiProviderManager.ts**: Hauptklasse zur Verwaltung verschiedener Provider
- **types.ts**: TypeScript-Type-Definitionen
- **example.ts**: Demo-Script zur Verwendung der Provider

## 🌟 Besonderheiten

- **Einheitliche Schnittstelle** für verschiedene KI-Provider
- **Automatische API-Key-Validierung** beim Start
- **Error-Handling** mit aussagekräftigen Fehlermeldungen
- **Lokal & Remote**: Unterstützt sowohl lokale (Ollama) als auch Remote-Provider
- **Extensible Design**: Einfach neue Provider hinzufügen

## 💡 Beispiel

```typescript
const manager = new KIProviderManager();

// Wechsle zu Ollama
manager.setProvider("ollama");

// Stelle eine Frage
const antwort = await manager.callProvider("Erkläre APIs");
console.log(antwort);
```

## 🔗 Nützliche Links

- [Google Generative AI](https://ai.google.dev)
- [OpenAI Platform](https://platform.openai.com)
- [Anthropic Claude](https://www.anthropic.com)
- [Ollama](https://ollama.ai)
- [Hugging Face Inference API](https://huggingface.co/inference-api)
- [Together AI](https://together.ai)
- [OpenRouter](https://openrouter.ai)

## 📝 Lernziele

✓ Konfiguration verschiedener KI-Provider  
✓ API-Integration mit Deno und TypeScript  
✓ Error-Handling und Validierung  
✓ Provider-abstraktion und Pattern Design  
✓ Umgebungsvariablen und Secrets-Management
