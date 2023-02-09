        // Tomando la descripción con AJAX

        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div.querySelector("div.jobDisplay");

          
         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
        
      
          job.html = job.html.split("")[0];
          job.html = job.html.split("")[0];
          job.html = job.html.split("")[0];

          //job.html = job.html.replace("","").trim();

          job.html    = cleanHTML(job.html);
          job.jobdesc = job.html;





          // Función para el llamdo de AJAX

          function getDescription(url) {
           var xhrrequest = new XMLHttpRequest();
          xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job

            var response = "";
            xhrrequest.onreadystatechange = function () {
              if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
               //console.log(xhrrequest.responseText);
               response = xhrrequest.responseText;
            }
          };

            xhrrequest.send();
          return response;
        }

function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}



// Jobdata tomado de un JSON 

 // Tomando la descripción con AJAX

        var full_html = json[i].description;
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div;

          
         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
        
      
          job.html = job.html.split("")[0];
          job.html = job.html.split("")[0];
          job.html = job.html.split("")[0];

          //job.html = job.html.replace("","").trim();

          job.html    = cleanHTML(job.html);
          job.jobdesc = job.html;



function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}


// Tomando la descripción desde el extract 


        var full_html = elem.querySelector("span.description").innerHTML;
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div;

          
         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
        
      
          job.html = job.html.split("")[0];
          job.html = job.html.split("")[0];
          job.html = job.html.split("")[0];

          //job.html = job.html.replace("","").trim();

          job.html    = cleanHTML(job.html);
          job.jobdesc = job.html;



function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
}
}
return newHtml;
}