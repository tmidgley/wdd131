// Set current year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// Set last modified date
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;

// Weather values
const temperature = 42;
const windSpeed = 10;

// Show values on page
document.getElementById("temp").textContent = temperature;
document.getElementById("wind").textContent = windSpeed;

// Wind chill function
function calculateWindChill(temp, speed) {
    return (
        35.74 +
        (0.6215 * temp) -
        (35.75 * Math.pow(speed, 0.16)) +
        (0.4275 * temp * Math.pow(speed, 0.16))
    ).toFixed(1);
}

// Display wind chill if conditions are met
if (temperature <= 50 && windSpeed > 3) {
    document.getElementById("windchill").textContent =
        calculateWindChill(temperature, windSpeed) + " °F";
} else {
    document.getElementById("windchill").textContent = "N/A";
}