<?php

/**
 * This file is used to retrieve the ratings from the database and send them back to the client.
 * This is used to display the ratings on the bar graph chart.
 */

// Set up variables needed to connect to the database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "webbook";

// Connect to the database
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    printf(
        "Database connection failed: %s<br>",
        mysqli_connect_error()
    );
    exit(0);
}

// Select ratings from the database
$sql_select = "SELECT rating from `Ratings`";

$success = mysqli_query($conn, $sql_select);

$data = array();

// If the query was successful, add the ratings to the data array
if ($success) {
    while ($row = mysqli_fetch_assoc($success)) {
        $data[] = $row['rating'];
    }
} else {
    echo "Error: " . $sql_select . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

//This sends the data back to the client side
echo json_encode($data);
