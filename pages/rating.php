<?php

// Set up variables needed to connect to the database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "webbook";
var_dump($_POST);

// Retrieve rating and timeDate from the POST request
$rating = $_POST['rating'];
$timeDate = $_POST['timeDate'];

var_dump($_POST);
echo $rating . ", " . $timeDate;

// Connect to the database
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (mysqli_connect_errno() || ($conn == null)) {
    printf(
        "Database connection failed: %s<br>",
        mysqli_connect_error()
    );
    exit(0);
}

// Insert rating and timeDate into the database
$sql_insert = "INSERT INTO `Ratings` (timeDate, rating) VALUES ('$timeDate', '$rating')";

$success = mysqli_query($conn, $sql_insert);

if ($success) {
    echo "Rating submitted successfully!";
} else {
    echo "Error: " . $sql_insert . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);