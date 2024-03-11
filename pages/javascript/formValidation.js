    function contactFormProcess() {
        var contactFormObj = document.getElementById("contact-form");
        

        if (contactFormValidate(contactFormObj)) {
            //Trigger alert here
            const alertPlaceholder = document.getElementById('sent-alert');
            const appendAlert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')

                alertPlaceholder.append(wrapper)
            }

            const alertTrigger = document.getElementById('alert-button')
            if (alertTrigger) {
            
                    setTimeout(() => {
                    alertTrigger.addEventListener('click', () => {
                        appendAlert('Nice, you triggered this alert message!', 'success');
                    });
                }, 5000);

            }    

        } else {
            alert("Please fill out all fields before submitting.");
        }
    }

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

    function validateName(name) {
        let regex = new RegExp('^[a-zA-Z\s]+$');
        if (regex.test(name)) {
            return true;
        } else {
            alert("Please enter a valid name, First and Last name only.");
            return false;
        }
    }

    function validateEmail(email) {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (regex.test(email)) {
            return true;
        } else {
            alert("Please enter a valid email address.");
            return false;
        }
    }

    function validateSubject(subject) {
        if (subject != "") {
            return true;
        } else {
            alert("Please enter a subject line, this can not be left blank.");
            return false;
        }
    }

    function validateMessage(message) {
        if (message != "") {
            return true;
        } else {
            alert("Please enter a message, this can not be left blank.");
            return false;
        }

    }