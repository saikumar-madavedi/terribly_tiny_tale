import './App.css'
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import Chart from 'chart.js/auto';

const App = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);

  const handleFetchData = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await response.text();

    const wordMap = text.split(/\s+/).reduce((map, word) => {
      const count = map.get(word) || 0;
      map.set(word, count + 1);
      return map;
    }, new Map());

    const sortedWords = Array.from(wordMap).sort((a, b) => b[1] - a[1]).slice(0, 20);

    const data = sortedWords.map(([word, count]) => ({
      word,
      count,
    }));

    setHistogramData(data);
    setShowExport(true);
    setShowSubmit(false);

    createChart(data);
  };

  const csvData = histogramData.map(({ word, count }) => [word, count]);

  const createChart = (data) => {
    const labels = data.map(({ word }) => word);
    const values = data.map(({ count }) => count);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Frequency of top 20 words',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      {showSubmit && <button onClick={handleFetchData}>Submit</button>}
      {showExport && <CSVLink data={csvData} className="export-button">Export</CSVLink>}
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default App;
