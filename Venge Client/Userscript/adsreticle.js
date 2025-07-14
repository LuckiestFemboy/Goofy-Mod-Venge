// Create canvas element
const canvas2 = document.createElement('canvas');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 250; // Set the desired width
canvas2.height = 250; // Set the desired height

// Append canvas to the center of the page
document.body.appendChild(canvas2);
canvas2.style.position = 'absolute';
canvas2.style.top = '50%';
canvas2.style.left = '50%';
canvas2.style.transform = 'translate(-50%, -50%)';

pc.app.on('Player:Focused', (state) => {
    if (state) {
        let currentWeapon = pc.app.root.findByName('Player').script.player.weaponManager.currentWeaponName
        if (currentWeapon === "Scar" || currentWeapon === "AK-47") {
            drawRedDotReticle();
        }
        else if (currentWeapon === "Sniper" || currentWeapon === "AWP") {
            drawACSSReticle();
        }
        else if (currentWeapon === "Tec-9" || currentWeapon === "M4") {
            drawSMGReticle();
        }
        else {
            console.log(currentWeapon)
        }
    } else {
        clearCanvas()
    }
})

// Function to draw the SMG reticle
function drawSMGReticle() {
    
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    // Outer Glow
    ctx2.shadowBlur = 6;
    ctx2.shadowColor = '#ff0000';
    // Draw the horizontal lines
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2) - 4.5 - 12, (canvas2.height / 2));
    ctx2.lineTo((canvas2.width / 2) - 12, (canvas2.height / 2));
    ctx2.moveTo((canvas2.width / 2) + 12, (canvas2.height / 2));
    ctx2.lineTo((canvas2.width / 2) + 4.5 + 12, (canvas2.height / 2));
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = '#ffa6a6';
    ctx2.stroke();
    // Draw the vertical lines
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2), (canvas2.height / 2) - 4.5 - 12);
    ctx2.lineTo((canvas2.width / 2), (canvas2.height / 2) - 12);
    ctx2.moveTo((canvas2.width / 2), (canvas2.height / 2) + 12);
    ctx2.lineTo((canvas2.width / 2), (canvas2.height / 2) + 4.5 + 12);
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = '#ffa6a6';
    ctx2.stroke();
    // Draw the circle
    ctx2.beginPath();
    ctx2.arc((canvas2.width / 2), (canvas2.height / 2), 12, 0, 2 * Math.PI);
    ctx2.fillStyle = 'transparent';
    ctx2.fill();
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = '#ffa6a6';
    ctx2.stroke();
    // Draw the dot
    ctx2.beginPath();
    ctx2.arc((canvas2.width / 2), (canvas2.height / 2), 1.75, 0, 2 * Math.PI);
    ctx2.fillStyle = '#ffa6a6';
    ctx2.fill();
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = 'transparent';
    ctx2.stroke();
    
    // Reset shadow settings to prevent affecting subsequent drawings
    ctx2.shadowBlur = 0;
    ctx2.shadowColor = 'transparent';
}

// Function to draw the red dot reticle
function drawRedDotReticle() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    // Outer glow
    ctx2.beginPath();
    ctx2.arc(canvas2.width / 2, canvas2.height / 2, 3.5, 0, 2 * Math.PI);
    ctx2.shadowBlur = 10;
    ctx2.shadowColor = '#ff3333';
    ctx2.fillStyle = '#ff3333';
    ctx2.fill();
    // Middle glow
    ctx2.beginPath();
    ctx2.arc(canvas2.width / 2, canvas2.height / 2, 3, 0, 2 * Math.PI);
    ctx2.shadowBlur = 7.5;
    ctx2.shadowColor = '#ff1a1a';
    ctx2.fillStyle = '#ff1a1a';
    ctx2.fill();
    // Inner glow
    ctx2.beginPath();
    ctx2.arc(canvas2.width / 2, canvas2.height / 2, 2.5, 0, 2 * Math.PI);
    ctx2.shadowBlur = 5;
    ctx2.shadowColor = '#ff0000';
    ctx2.fillStyle = '#ff0000';
    ctx2.fill();
    
    // Reset shadow settings to prevent affecting subsequent drawings
    ctx2.shadowBlur = 0;
    ctx2.shadowColor = 'transparent';
    
    // Central dot
    ctx2.beginPath();
    ctx2.arc(canvas2.width / 2, canvas2.height / 2, 2, 0, 2 * Math.PI);
    ctx2.fillStyle = '#ffe5e5';
    ctx2.fill();
}
// Function to draw ACSS Reticle
function drawACSSReticle() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    // Central Line Gradient
    const gradient = ctx2.createLinearGradient((canvas2.width / 2), (canvas2.height / 2) - 75, (canvas2.width / 2), (canvas2.height / 2) + 75);
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(1, 'black');
    
    // Central Line
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2), (canvas2.height / 2) + 7);
    ctx2.lineTo((canvas2.width / 2), (canvas2.height / 2) + 75);
    ctx2.strokeStyle = gradient;
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    
    // Range1
    const range1 = ((canvas2.height / 2) + (canvas2.height / 2) + 10) / 2 + 15;
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2) - 10, range1);
    ctx2.lineTo((canvas2.width / 2) + 10, range1);
    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    // Range2
    const range2 = ((canvas2.height / 2) + (canvas2.height / 2) + 40) / 2 + 15;
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2) - 7, range2);
    ctx2.lineTo((canvas2.width / 2) + 7, range2);
    ctx2.strokeStyle = 'black';
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    // Range3
    const range3 = ((canvas2.height / 2) + (canvas2.height / 2) + 70) / 2 + 15;
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2) - 5, range3);
    ctx2.lineTo((canvas2.width / 2) + 5, range3);
    ctx2.strokeStyle = 'black';
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    // Range4
    const range4 = ((canvas2.height / 2) + (canvas2.height / 2) + 120) / 2 + 15;
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2) - 5, range4);
    ctx2.lineTo((canvas2.width / 2) + 5, range4);
    ctx2.strokeStyle = 'black';
    ctx2.lineWidth = 1.5;
    ctx2.stroke();
    
    // Arrow Left Stroke
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2), (canvas2.height / 2));
    ctx2.lineTo((canvas2.width / 2) - 5.5, (canvas2.height / 2) + 7);
    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 2;
    ctx2.stroke();
    // Arrow Right Stroke
    ctx2.beginPath();
    ctx2.moveTo((canvas2.width / 2), (canvas2.height / 2));
    ctx2.lineTo((canvas2.width / 2) + 5.5, (canvas2.height / 2) + 7);
    ctx2.strokeStyle = 'red';
    ctx2.lineWidth = 2;
    ctx2.stroke();
}

// Function to clear the canvas
function clearCanvas() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}