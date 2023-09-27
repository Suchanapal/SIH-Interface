const rows = 24;
const cols = 32;

function getColorScale() {
  console.log('Getting color scale');
  return [
    [0, 'rgb(001, 050, 032)'],
    
    [1, 'rgb(255,255,153)']
  ];
}

function updateHeatmapWithData(data) {
  console.log('update heatmap:', data);
  const trace = {
    z: data,
    type: 'heatmap',
    colorscale: getColorScale(),
    colorbar: {
      title: 'Temperature',
      titleside: 'top',
      tickvals: [0, 5, 10, 15, 20], // Adjusted tickvals
      ticktext: ['20', '15', '10', '5', '0'] // Adjusted ticktext
    }
  };

  const layout = {
    title: 'Thermal Data',
    xaxis: { ticks: '', side: 'bottom' }, // Changed side to 'bottom'
    yaxis: { 
      ticks: '', 
      ticksuffix: ' ', 
      tickvals: [0, 5, 10, 15, 20], // Adjusted tickvals
      ticktext: ['','20', '15', '10', '5', '0'], // Adjusted ticktext
      // autorange: 'reversed' // Reverse the y-axis
    }
  };

  Plotly.newPlot('thermal-plot', [trace], layout);
}


async function fetchDataFromEndpoint() {
  console.log('Fetching data from endpoint')
  try {
    const response = await fetch('https://team-vigyan.vercel.app/api/v1/thermal');
    const data = await response.json();

    if (data.length === rows && data.every(row => row.length === cols)) {
      updateHeatmapWithData(data);
    } else {
      console.error('Invalid data format received from the endpoint.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


setInterval(fetchDataFromEndpoint, 1000);











// chart_script.js doppler 
let periods = [];
let frequencies = [];
const maxDataPoints = 15; 

let chart = Plotly.newPlot('chart', [{
    x: periods,
    y: frequencies,
    type: 'scatter', 
    fill: 'tozeroy', 
    fillcolor: 'rgba(218, 224, 255, 0.8)' 
}]);

function updateChart() {
    let newPeriod = new Date();
    let newFrequency = Math.floor(Math.random() * 100);

    periods.push(newPeriod);
    frequencies.push(newFrequency);

    if (periods.length > maxDataPoints) {
        periods.shift(); 
        frequencies.shift();
    }

    Plotly.update('chart', {x: [periods], y: [frequencies]});
}

setInterval(updateChart, 200);
