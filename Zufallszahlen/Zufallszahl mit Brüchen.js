function erstelleBruch(zaehler, nenner) {
    if (typeof zaehler !== "number" || typeof nenner !== "number" || isNaN(zaehler) || isNaN(nenner)) {
        throw new Error("Bitte nur Zahlen eingeben.");
    }
    if (nenner === 0) {
        throw new Error("Nenner darf nicht 0 sein.");
    }
    return { zaehler: zaehler, nenner: nenner };
}

function addiereBrueche(b1, b2) {
    if (!b1 || !b2 || typeof b1.zaehler !== "number" || typeof b1.nenner !== "number" ||
        typeof b2.zaehler !== "number" || typeof b2.nenner !== "number") {
        throw new Error("Parameter müssen Brüche sein!");
    }
    const neuerZaehler = b1.zaehler * b2.nenner + b2.zaehler * b1.nenner;
    const neuerNenner = b1.nenner * b2.nenner;
    return kuerzeBruch({ zaehler: neuerZaehler, nenner: neuerNenner });
}

function kuerzeBruch(bruch) {
    const ggt = berechneGGT(Math.abs(bruch.zaehler), Math.abs(bruch.nenner));
    return {
        zaehler: bruch.zaehler / ggt,
        nenner: bruch.nenner / ggt
    };
}

function berechneGGT(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function bruchZuString(bruch) {
    return `${bruch.zaehler}/${bruch.nenner}`;
}

for (let i = 0; i < 15; i++) {
    const nenner = Math.ceil(Math.random() * 100) + 1;
    const zaehler = Math.ceil(Math.random() * 100);

    const ergebnis = erstelleBruch(zaehler, nenner);

    const a = Math.floor(Math.random() * (zaehler + 1));
    const b = zaehler - a;

    let n1 = nenner;
    let n2 = nenner;
    while (n2 === n1) {
        n2 = Math.ceil(Math.random() * 100) + 1;
    }

    const bruch1 = erstelleBruch(a, n1);
    const bruch2 = erstelleBruch(b, n2);

    const summe = addiereBrueche(bruch1, bruch2);

    const ergebnisGekuerzt = kuerzeBruch(ergebnis);

    const korrekt = (summe.zaehler === ergebnisGekuerzt.zaehler && summe.nenner === ergebnisGekuerzt.nenner);

    console.log(
        `Test ${i + 1}: ${bruchZuString(bruch1)} + ${bruchZuString(bruch2)} = ${bruchZuString(summe)} | Erwartet: ${bruchZuString(ergebnisGekuerzt)} | ${korrekt ? "✔️" : "❌"}`
    );
}