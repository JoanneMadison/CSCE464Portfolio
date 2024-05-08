/*
    This file is used to validate the contact form on the contact page.
    It will check if the name, email, subject, and message fields are filled out correctly.
*/    
    
    
    //This function is called when the submit button is clicked.
    function contactFormProcess(event) {
      var contactFormObj = document.getElementById("contact-form");

        if (contactFormValidate(contactFormObj)) {
            //Trigger alert here
            alert("Message sent successfully!");    
            var formData = new FormData(contactFormObj);
        //Send the contact form info to the backend via POST request.
        fetch("email.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                contactFormObj.reset();
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while sending the message. Please try again later.");
        });

        } else {
            alert("Please fill out all fields before submitting.");
        }
    }

    //This function is called to validate the form fields. To make sure they are filled out correctly.
    function contactFormValidate(contactFormObj) {
        var name = contactFormObj.nameInput.value;
        var email = contactFormObj.emailInput.value;
        var subject = contactFormObj.subjectInput.value;
        var message = contactFormObj.messageInput.value;

        if (validateName(name) && validateEmail(email) && validateSubject(subject) && validateMessage(message)) {
            return true;
        } else {
            return false;
        }
    }

    //This function validates the name field.
    function validateName(name) {
        let regex = new RegExp('^[a-zA-Z\s ]+$');
        if (regex.test(name)) {
            return true;
        } else {
            alert("Please enter a valid name, First and Last name only.");
            return false;
        }
    }

    //This function validates the email field.
    function validateEmail(email) {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (regex.test(email)) {
            return true;
        } else {
            alert("Please enter a valid email address.");
            return false;
        }
    }

    //This function validates the subject field.
    function validateSubject(subject) {
        if (subject != "") {
            return true;
        } else {
            alert("Please enter a subject line, this can not be left blank.");
            return false;
        }
    }

    //This function validates the message field.
    function validateMessage(message) {
        if (message != "") {
            return true;
        } else {
            alert("Please enter a message, this can not be left blank.");
            return false;
        }

    }