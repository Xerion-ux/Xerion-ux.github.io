const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('optionInput');
const optionsList = document.getElementById('optionsList');
const resultDiv = document.getElementById('result');

let options = ["Suerte", "Premio", "Sigue buscando"]; 
let currentRotation = 0;
let isSpinning = false;

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addOption();
    }
});

function drawWheel() {
    const numOptions = options.length;
    if (numOptions === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    const arcSize = (2 * Math.PI) / numOptions;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    options.forEach((text, i) => {
        const angle = i * arcSize;
        
        ctx.beginPath();
        ctx.fillStyle = `hsl(${(i * 360) / numOptions}, 70%, 50%)`;
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, angle, angle + arcSize);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(text.substring(0, 15), 180, 5); // Limitar texto largo
        ctx.restore();
    });
}

function updateList() {
    optionsList.innerHTML = "";
    options.forEach((opt, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${opt}
            <button class="delete-btn" onclick="removeOption(${index})">Eliminar</button>
        `;
        optionsList.appendChild(li);
    });
}

function addOption() {
    const val = input.value.trim();
    if (val !== "") {
        options.push(val);
        input.value = "";
        drawWheel();
        updateList();
    }
}

function removeOption(index) {
    options.splice(index, 1);
    drawWheel();
    updateList();
}

function spinWheel() {
    if (isSpinning || options.length < 2) return;

    isSpinning = true;
    resultDiv.innerText = "¡Girando...!";
    
    const extraDegrees = Math.floor(Math.random() * 360) + 3600; 
    currentRotation += extraDegrees;
    
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        const actualRotation = currentRotation % 360;
        const arcSize = 360 / options.length;
        
        const winningIndex = Math.floor((360 - (actualRotation % 360) + 270) % 360 / arcSize);
        resultDiv.innerText = `🏆 ${options[winningIndex]}`;
    }, 4000);
}

drawWheel();
updateList();