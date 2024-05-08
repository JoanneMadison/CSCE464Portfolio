/*
    This file is used to create a chart using Chart.js JavaScript Library.
    It will fetch data from the backend and use it to create a bar graph chart.
*/ 

//Fetch the data from the backend and perform actions and calculations to create the chart.
fetch("data.php")
  .then(response => { 
    return response.json(); 
    
  })
  .then(ratings => {
    console.log("Ratings:", ratings);
    const ratingData = ratings.map(Number);
    const ratingFrequency = calculateFrequency(ratingData);
    let average = calculateAverage(ratingData);
    
    createChart(ratingFrequency);
    document.getElementById("averageRating").innerHTML = "Average Rating: " + average;
    
  })
  .catch(error => {
    console.error('Error fetching ratings:', error);
  });


  //This function create the actual bar graph using Chart.js
  //An example can be found here: https://www.chartjs.org/docs/latest/charts/bar.html
  function createChart(ratingData) { 
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
        datasets: [{
          label: 'Frequency of Ratings',
          data: ratingData,
          backgroundColor: 'rgba(186, 191, 209, 0.5)',
          borderColor: 'rgba(186, 191, 209, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            maintainAspectRatio: false,
            responsive: true

          }
        }
      }
    });
  }

  //This function calculates the frequency of each rating.
  function calculateFrequency(ratingData){ 
    const frequency = [0, 0, 0, 0, 0];
    for(let i = 0; i < ratingData.length; i++){
        for(let j = 1; j <= 5; j++){
            if(ratingData[i] === j){
                frequency[j-1]++;
            }
        }
    }

    return frequency;
  }

    //This function calculates the average rating.
  function calculateAverage(ratingData){ 
    let total = 0; 
    for(let i = 0; i < ratingData.length; i++){
        total += ratingData[i];
    }

    return (total / ratingData.length).toPrecision(2);

    
  }