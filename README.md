# terribly_tiny_tale_assignment

This project is a web application that fetches data from a text file and generates a histogram of the top 20 most frequently occurring words. It also provides an option to export the data in CSV format.

"To see a live demo of this application, please visit https://main--endearing-chimera-3eeee5.netlify.app/."

## Usage

1. Click on the "Submit" button to fetch the data from the URL `https://www.terriblytinytales.com/test.txt`.

2. The top 20 most frequently occurring words will be displayed as a histogram.

3. Click on the "Export" button to download the data in CSV format.

## Technologies Used

- React
- Chart.js
- react-csv

## code explaination

When the "Submit" button is clicked, the `handleFetchData()` function is called. It first fetches a text file from the URL 'https://www.terriblytinytales.com/test.txt' using `fetch()` and then gets the frequency of each word in the text using `reduce()` and a `Map` data structure. The resulting word frequency map is sorted in descending order and the top 20 words are selected.

The top 20 words are then transformed into an array of objects, where each object has two properties - "word" and "count", representing the word and its frequency respectively. This data is stored in the `histogramData` state using `setHistogramData()`. The `showExport` and `showSubmit` states are also updated to show the export button and hide the submit button.

The `createChart()` function is then called with the `data` array as an argument. This function uses Chart.js library to create a bar chart with the top 20 words on the X-axis and their frequencies on the Y-axis. The resulting chart is displayed using a canvas element with id "myChart".

Finally, if the export button is clicked, the `CSVLink` component from the `react-csv` library is used to generate a CSV file from the `histogramData` state and prompt the user to download it.
