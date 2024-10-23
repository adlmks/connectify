function updateDateTime() {
    const dateTimeElement = document.getElementById("date-time");

    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    };

    const formattedDateTime = now.toLocaleString('en-US', options);

    dateTimeElement.textContent = `Current Date and Time: ${formattedDateTime}`;
}

function getGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
        greeting = "Good morning Mr. Adil!";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good afternoon Mr. Adil!";
    } else {
        greeting = "Good evening Mr. Adil!";
    }

    const greetingElement = document.getElementById("greeting");
    greetingElement.textContent = greeting;
}

setInterval(updateDateTime, 1000);
updateDateTime();

const greetingButton = document.getElementById("greeting-button");
greetingButton.addEventListener("click", getGreeting);
