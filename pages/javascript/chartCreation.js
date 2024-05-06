// ratings.js

const array = [1, 2, 3, 4, 5];

fetch("data.php")
  .then(response => { 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log("Response:", response);
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
    // Handle error
  });


  function createChart(ratingData) { 
    // Use the ratings array to create a chart using Chart.js
    // Example:
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
        datasets: [{
          label: 'Frequency of Ratings',
          data: ratingData, // Use the ratings array here
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

  function calculateFrequency(ratingData){ 
    const frequency = [0, 0, 0, 0, 0];
    for(let i = 0; i < ratingData.length; i++){
        for(let j = 1; j <= 5; j++){
            if(ratingData[i] === j){
                frequency[j-1]++;
                console.log("Frequency inner:", frequency[j-1]);
            }
        }
    }

    return frequency;
  }

  function calculateAverage(ratingData){ 
    let total = 0; 
    for(let i = 0; i < ratingData.length; i++){
        total += ratingData[i];
    }

    return (total / ratingData.length).toPrecision(2);

    
  }