const rows = 24;
const cols = 32;

function getColorScale() {
  console.log('Getting color scale');
  return [
    [0, 'rgb(0,0,139)' ],
    [0.25, 'rgb(0,204,0)'],
    [0.5, 'rgb(255,255,0)'],
    [0.75,'rgb(255,128,0)' ],
    [1, 'rgb(255,0,0)']
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
      tickvals: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7],
      ticktext: ['20', '22', '24', '26', '28', '30', '32', '34']
    }
  };

  const layout = {
    title: 'Thermal Data',
    xaxis: { ticks: '', side: 'bottom',  },
    yaxis: { ticks: '', ticksuffix: ' ', width: 900, height: 600  }
  };

  Plotly.newPlot('thermal-plot', [trace], layout);
}

async function fetchDataFromEndpoint() {
  console.log('Fetching data from endpoint')
  try {
    const response = await fetch('https://team-vigyan.vercel.app/api/v1/thermal');
    const data = await response.json();

    if (data.length === rows && data.every(row => row.length === cols)) {
      updateHeatmapWithData(data.reverse());
    } else {
      console.error('Invalid data format received from the endpoint.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


setInterval(fetchDataFromEndpoint, 10);



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
