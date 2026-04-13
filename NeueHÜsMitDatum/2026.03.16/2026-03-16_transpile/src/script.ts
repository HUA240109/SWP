import { holeEssen, loescheEssen } from "./essen.ts";

type EssenGlobals = typeof globalThis & {
    holeEssen: typeof holeEssen;
    loescheEssen: typeof loescheEssen;
};

const globals = globalThis as EssenGlobals;

globals.holeEssen = holeEssen;
globals.loescheEssen = loescheEssen;

const infoElement = document.getElementById("info");

function updateInfo(duration: number) {
    if (infoElement) {
        infoElement.textContent = `Fetch-Dauer: ${(duration)}ms`;
    }
}

async function startFetch() {
    const start = Date.now();
    await holeEssen();
    updateInfo(Date.now() - start);
}

document.getElementById("hole-essen")?.addEventListener("click", startFetch);
document.getElementById("loesche-essen")?.addEventListener("click", loescheEssen);
