const canvas = document.getElementById('thermal-canvas');
const ctx = canvas.getContext('2d');

const rows = 24;
const cols = 32;

function generateRandomTemperature() {
  return (Math.random() * 14) + 20;
}

const sampleData = [];
for (let i = 0; i < rows; i++) {
  const row = [];
  for (let j = 0; j < cols; j++) {
    row.push(generateRandomTemperature());
  }
  sampleData.push(row);
}

function drawThermalData(data) {
  const cellWidth = canvas.width / cols;
  const cellHeight = canvas.height / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const value = data[i][j];
      const color = getColor(value);
      ctx.fillStyle = color;
      ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    }
  }

  drawColorBar();
}

function getColor(value) {
  const minTemp = 20.0;
  const maxTemp = 34.0;
  const ratio = (value - minTemp) / (maxTemp - minTemp);

  const r = Math.floor(255 * (1 - ratio));
  const g = Math.floor(255 * ratio);
  const b = 0;

  return `rgb(${r},${g},${b})`;
}

function drawColorBar() {
  const colorBar = document.getElementById('color-bar');

  for (let i = 34; i >= 20; i -= 2) {
    const color = getColor(i);

    const colorBlock = document.createElement('div');
    colorBlock.style.backgroundColor = color;
    colorBar.appendChild(colorBlock);

    const label = document.createElement('div');
    label.textContent = i.toString();
    colorBar.appendChild(label);
  }
}

drawThermalData(sampleData);
