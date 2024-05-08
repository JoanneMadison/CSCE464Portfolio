<?php

/**
 * This file is used to recieve the contact form data from the client. 
 * Once received it will send an email to the MailHog SMTP client and insert the data into the database.
 */

//Set up variables needed to connect to database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "webbook";

//Post contact form data from client side
$to = "contactform@gmail.com";
$from = $_POST['email'];
$subject = $_POST['subject'];
$name = $_POST['name'];
$message = $_POST['message'];

//Create headers to format email.
$headers = "From: $name <$from>" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

//Mail the email
mail($to, $subject, $message, $headers);

//Connect to database and insert POSTed data to it.
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    printf(
        "Database connection failed: %s<br>",
        mysqli_connect_error()
    );
    exit(0);
}

$sql_insert = "INSERT INTO `Contact-Form` (name, email, subject, message) 
               VALUES ('$name', '$from', '$subject', '$message')";

$success = mysqli_query($conn, $sql_insert);

if ($success) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql_insert . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
