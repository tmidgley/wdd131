const year = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

year.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;