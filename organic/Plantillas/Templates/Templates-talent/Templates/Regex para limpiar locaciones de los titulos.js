//Entrada del titulo: "Programador junior Medellin"
var city = "Medellin";
var title = "Programador junior MEDELLIN";
let regex = new RegExp(`${city}`, 'gi');
job.title = title.replace(regex, "");
job.location = "Medellin";
//Salida del titulo: Programador junior


// caso real 
var title = document.querySelector("selector").textContent.trim();
var location = document.querySelector("selector").textContent.trim();
let regex = new RegExp(`${location}`, 'gi');
job.title = title.replace(regex, "");
job.location = location;