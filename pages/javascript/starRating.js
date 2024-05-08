/**
 * This file is used to create the functionality behind the star rating system on the contact page. 
 * The following website was referenced to help create the rating system: https://dev.to/leonardoschmittk/how-to-make-a-star-rating-with-js-36d3
 */

const ratingStars = [...document.getElementsByClassName("rating-star")];
let rating;

//This function creates the mouse click dynamic functionality for the star rating system.
//Once the user clicks on the submit button on their selected star, the numerical rating is retrieved and passed to the backend.
function executeRating(stars) {
    const starClassActive = "rating-star fas fa-star fa-xl";
    const starClassInactive = "rating-star far fa-star fa-xl";
    const starsLength = stars.length;
    const button = document.getElementById("ratingButton");
    let i;

    stars.map((star) => {
        star.onclick = () => {
            i = stars.indexOf(star);

            if (star.className === starClassInactive) {
                for (i; i >= 0; --i) {
                    stars[i].className = starClassActive;
                }
                rating = parseInt(star.getAttribute("value"));
                button.onclick = () => {
                    getRating(rating);
                };
            } else {
                for (i; i < starsLength; ++i) {
                    stars[i].className = starClassInactive;
                }
                rating = parseInt(star.getAttribute("value"));
                button.onclick = () => {
                    getRating(rating);
                };

            }
        };
    });
}

//This function sends the rating to the backend to be stored in the database.
//It also gets the timestamp of when the rating was submitted.
function getRating(ratingNumber) {
    const timeDate = getLocalTimeDate();

    var formData = new FormData();
    formData.append('timeDate', timeDate);
    formData.append('rating', ratingNumber)

    fetch("rating.php", {
        method: "POST",
        body: formData,
    }).then((response) => {
        console.log("response:", response);
        response.json();
    }).then((data) => {
        console.log(data);
        alert("Thank you for submitting your rating!");
    }).catch((error) => {
        console.log("Error:", error);
        alert("There was an error submitting your rating. Please try again.");
    });

}

//This function gets the local time and date of the user.
function getLocalTimeDate() {
    const date = new Date();
    let timeNow = date.toLocaleTimeString();
    let dateToday = date.toLocaleDateString();
    let fullDateTime = dateToday + " " + timeNow;
    return fullDateTime;

}
executeRating(ratingStars);