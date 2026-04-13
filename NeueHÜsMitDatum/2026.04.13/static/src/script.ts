/// <reference lib="dom" />

const url = "https://pokeapi.co/api/v2/pokemon/";

async function holePokemon() {
    // Zufällige Pokemon-ID von 1 bis 1010
    const randomId = Math.floor(Math.random() * 1010) + 1;
    const response = await fetch(url + randomId);
    if (!response.ok) {
        throw new Error("Fehler beim Abrufen des Pokemons: " + response.status);
    }
    const data = await response.json();
    const imgUrl = data.sprites.other.home.front_default;
    if (!imgUrl) {
        throw new Error("Kein Sprite verfügbar für dieses Pokemon");
    }
    const img = globalThis.document.createElement("img");
    img.src = imgUrl;
    img.alt = data.name;
    img.style.maxWidth = "200px";
    img.style.maxHeight = "200px";
    globalThis.document.body.appendChild(img);

    // globalThis erkunden
    console.log("globalThis ist window:", globalThis === window);
    console.log("Pokemon Name:", data.name);
}

(async () => {
    try {
        await holePokemon();
        console.log("holePokemon wurde aufgerufen");
    } catch (e) {
        console.log("Fehler aufgetreten: ", e instanceof Error ? e.message : String(e));
    } finally {
        console.log("IMMER");
    }
})();
