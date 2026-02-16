// Funktionen definieren
function f(x) {
    return x;
}

function g(x) {
    return x * x;
}

function h(x) {
    return x * x * x;
}

function i(x) {
    return 2 * x;
}

// Tabelle mit Werten füllen
function calculateAndFill() {
    const startInput = document.getElementById('start').value;
    const endInput = document.getElementById('end').value;
    const stepInput = document.getElementById('step').value;

    // Validierung
    if (!startInput || !endInput || !stepInput) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    const start = parseFloat(startInput);
    const end = parseFloat(endInput);
    const step = parseFloat(stepInput);

    if (step <= 0) {
        alert('Die Schrittweite muss größer als 0 sein!');
        return;
    }

    // Tabelle leeren
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    // Werte berechnen und einfügen
    for (let x = start; x <= end; x += step) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${x.toFixed(2)}</td>
            <td>${f(x).toFixed(2)}</td>
            <td>${g(x).toFixed(2)}</td>
            <td>${h(x).toFixed(2)}</td>
            <td>${i(x).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    }

    // Grafik zeichnen
    drawChart(start, end, step);
}

// Grafik zeichnen mit Canvas
function drawChart(start, end, step) {
    const canvas = document.getElementById('chart');
    const ctx = canvas.getContext('2d');

    // Canvas löschen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Achsen zeichnen
    drawAxes(ctx, canvas, start, end);

    // Funktionsgrafen zeichnen
    drawFunction(ctx, canvas, f, start, end, step, '#FF6B6B', 'f(x) = x');
    drawFunction(ctx, canvas, g, start, end, step, '#4ECDC4', 'g(x) = x²');
    drawFunction(ctx, canvas, h, start, end, step, '#95E1D3', 'h(x) = x³');
    drawFunction(ctx, canvas, i, start, end, step, '#FFE66D', 'i(x) = 2x');

    // Legende zeichnen
    drawLegend(ctx, canvas);
}

// Achsen zeichnen
function drawAxes(ctx, canvas, start, end) {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // X-Achse
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y-Achse
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Gitternetzlinien
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    const scale = width / (end - start);
    
    for (let i = start; i <= end; i++) {
        const x = centerX + (i - start) * scale;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Beschriftung
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    for (let i = Math.ceil(start); i <= Math.floor(end); i++) {
        const x = centerX + (i - start) * scale;
        ctx.fillText(i, x, centerY + 15);
    }
}

// Funktion zeichnen
function drawFunction(ctx, canvas, func, start, end, step, color, label) {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = width / (end - start);
    const yScale = height / 20; // Y-Skalierung

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;
    for (let x = start; x <= end; x += step / 2) {
        const y = func(x);
        const canvasX = centerX + (x - start) * scale;
        const canvasY = centerY - y * yScale;

        // Nur Punkte im sichtbaren Bereich zeichnen
        if (canvasY > -100 && canvasY < canvas.height + 100) {
            if (firstPoint) {
                ctx.moveTo(canvasX, canvasY);
                firstPoint = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
}

// Legende zeichnen
function drawLegend(ctx, canvas) {
    const legendX = 10;
    const legendY = 10;
    const colors = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#FFE66D'];
    const labels = ['f(x) = x', 'g(x) = x²', 'h(x) = x³', 'i(x) = 2x'];

    ctx.font = '12px Arial';
    ctx.textAlign = 'left';

    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(legendX, legendY + i * 20, 15, 15);
        
        ctx.fillStyle = '#333';
        ctx.fillText(labels[i], legendX + 20, legendY + i * 20 + 12);
    }
}

// Event Listener
document.getElementById('calculate').addEventListener('click', calculateAndFill);

// Initial calculation mit Standard-Werten
document.getElementById('start').value = '-5';
document.getElementById('end').value = '5';
document.getElementById('step').value = '1';
calculateAndFill();
