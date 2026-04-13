function checkOven() {
    return new Promise((resolve, reject) => {
        const isOvenHot = true; // Setze auf false, um die Ablehnung zu testen
        if (isOvenHot) {
            resolve({ success: true, message: "Ofen ist bereit!" });
        } else {
            reject({ success: false, message: "Ofen ist defekt." });
        }
    });
}

function bakePizza(pizzaName) {
    return new Promise((resolve, reject) => {
        if (pizzaName === "") {
            reject("Fehler: Keine Pizza ausgewählt.");
        } else {
            resolve("Pizza " + pizzaName + " ist fertig gebacken!");
        }
    });
}

checkOven()
    .then((result) => {
        console.log(result.message);
        return bakePizza("Margherita");
    })
    .then((msg) => {
        console.log(msg);
    })
    .catch((err) => {
        console.error("Pizza-Bestellung gescheitert:", err);
    });
