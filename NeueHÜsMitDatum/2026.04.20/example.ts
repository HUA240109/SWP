// Beispiel-Script: Verwendung verschiedener KI-Provider
// Demonstriert das Wechseln zwischen Providern und deren Verwendung

import KIProviderManager from "./kiProviderManager.ts";

/**
 * Hauptdemonstration der KI-Provider-Verwaltung
 */
async function demonstrateProviders() {
  const manager = new KIProviderManager();
  
  console.log("\n🤖 ====== KI-Provider Demo ======\n");

  // 1. Verfügbare Provider anzeigen
  console.log("📋 Verfügbare Provider:");
  const allProviders = manager.listProviders();
  allProviders.forEach((p) => console.log(`   - ${p}`));

  // 2. Aktivierte Provider anzeigen
  console.log("\n✅ Aktivierte Provider:");
  const enabled = manager.listEnabledProviders();
  if (enabled.length === 0) {
    console.log("   ⚠️  Keine Provider aktiviert!");
    console.log("   Setzen Sie die Umgebungsvariablen:");
    console.log("   - GOOGLE_API_KEY für Gemini");
    console.log("   - OPENAI_API_KEY für OpenAI");
    console.log("   - ANTHROPIC_API_KEY für Anthropic");
  } else {
    enabled.forEach((p) => console.log(`   - ${p}`));
  }

  // 3. Mit lokalem Ollama-Provider testen (falls vorhanden)
  try {
    console.log("\n🔄 Wechsle zu Ollama (lokal)...");
    manager.setProvider("ollama");
    
    const testPrompt = "Erkläre in 2 Sätzen, was ein API ist.";
    const response = await manager.callProvider(testPrompt);
    
    console.log("\n💬 Antwort:");
    console.log(response);
  } catch (error) {
    console.log(`\n⚠️  Ollama nicht verfügbar: ${error.message}`);
    console.log("   Tipp: Installiere Ollama von https://ollama.ai");
  }

  // 4. Mit OpenAI testen (falls API-Key vorhanden)
  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (openaiKey) {
    try {
      console.log("\n🔄 Wechsle zu OpenAI...");
      manager.setProvider("openai");
      
      const testPrompt = "Was ist der Unterschied zwischen REST und GraphQL?";
      const response = await manager.callProvider(testPrompt);
      
      console.log("\n💬 Antwort:");
      console.log(response);
    } catch (error) {
      console.log(`\n⚠️  OpenAI-Fehler: ${error.message}`);
    }
  }

  // 5. Mit Google Gemini testen (falls API-Key vorhanden)
  const geminiKey = Deno.env.get("GOOGLE_API_KEY");
  if (geminiKey) {
    try {
      console.log("\n🔄 Wechsle zu Google Gemini...");
      manager.setProvider("gemini");
      
      const testPrompt = "Schreibe einen kurzen Witz über Programmieren.";
      const response = await manager.callProvider(testPrompt);
      
      console.log("\n💬 Antwort:");
      console.log(response);
    } catch (error) {
      console.log(`\n⚠️  Gemini-Fehler: ${error.message}`);
    }
  }

  console.log("\n✨ Demo abgeschlossen!\n");
}

/**
 * Interaktiver Modus: Akzeptiere Eingaben vom Benutzer
 */
async function interactiveMode() {
  const manager = new KIProviderManager();
  
  console.log("\n🤖 ====== KI-Provider Interaktiv ======\n");
  console.log("Verfügbare Provider:", manager.listProviders().join(", "));
  console.log("Aktivierte Provider:", manager.listEnabledProviders().join(", "));
  
  // Beispiel: Mit verfügbarem Provider testen
  const enabledProviders = manager.listEnabledProviders();
  if (enabledProviders.length > 0) {
    const firstProvider = enabledProviders[0].split(" ")[0];
    console.log(`\nVerwende aktuellen Provider: ${firstProvider}`);
    
    const testPrompt = "Hallo! Wer bist du?";
    console.log(`\n📤 Frage: "${testPrompt}"`);
    
    try {
      const response = await manager.callProvider(testPrompt);
      console.log(`\n💬 Antwort: ${response}`);
    } catch (error) {
      console.log(`\n❌ Fehler: ${error.message}`);
    }
  } else {
    console.log("\n⚠️  Keine Provider konfiguriert. Bitte API-Keys setzen.");
  }
}

// Haupteinstiegspunkt
if (import.meta.main) {
  // Starte Demo oder interaktiv je nach Argument
  const args = Deno.args;
  
  if (args.includes("--interactive")) {
    await interactiveMode();
  } else {
    await demonstrateProviders();
  }
}
