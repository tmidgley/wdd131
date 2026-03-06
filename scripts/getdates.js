// Set current year in footer
const year = new Date().getFullYear();
document.querySelector("#currentyear").textContent = year;

// Set last modified date
document.querySelector("#lastmodified").textContent = document.lastModified;