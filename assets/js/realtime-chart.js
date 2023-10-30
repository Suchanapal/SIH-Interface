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




// chart_script.js doppler let periods = [];
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

async function fetchData() {
    try {
        const response = await fetch('https://team-vigyan.vercel.app/api/v1/doppler');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function updateChartWithApiData() {
    const apiData = await fetchData();

    if (apiData && Array.isArray(apiData) && apiData.length === 2) {
        
        periods = apiData[0];
        frequencies = apiData[1];

        // Update the chart
        Plotly.update('chart', {x: [periods], y: [frequencies]});
    }
}

updateChartWithApiData();
setInterval(updateChartWithApiData, 1000);

// --Live footage--

function videoFeed() {
  // Get the video element
  const video = document.getElementById("camera-feed");

  // Use navigator.mediaDevices.getUserMedia to access the camera
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      // Set the video source to the camera stream
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error accessing camera:", error);
    });
}

updateChartWithApiData();
setInterval(updateChartWithApiData, 1000);
videoFeed();


