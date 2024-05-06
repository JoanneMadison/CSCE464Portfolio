<?php

// Set up variables needed to connect to the database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "webbook";

// Connect to the database
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (mysqli_connect_errno() || ($conn == null)) {
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

if ($success) {
    //echo "Select query succesful!";
    while ($row = mysqli_fetch_assoc($success)) {
        $data[] = $row['rating'];
    }
} else {
    echo "Error: " . $sql_select . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

echo json_encode($data);
