//ELIMINAR CIERTOS TITULOS O PARTES
//Borra los que dice general aplication
if(job.title.toLowerCase().indexOf("general application")==-1){
    jobs.push(job);
  } 
  
  //Borra los a que tengan www
  for (const a of full_html.querySelectorAll('a')) {
    if (a.textContent.search('wwww')>-1){
       //newLocation = a.textContent.trim();
         a.remove(); 
    } 
  }

  //Borra todos los p que tengan un tag a
  for (const a of full_html.querySelectorAll('p')) {
    if (a.textContent.querySelector("a")){
       //newLocation = a.textContent.trim();
         a.remove(); 
    } 
  }

  //Borra los p que tengan un @
  for (const a of document.querySelectorAll('p')) {
    if (a.textContent.search('@')>-1){
       a.remove();
    } 
  }

  for (const a of full_html.querySelectorAll('p')) {
    if (a.textContent.search('@')>-1 | a.textContent.search('www.')>-1 | a.textContent.search('.com')>-1){
       a.remove();
    } 
  }

  //Eliminar los enter, espacios en blanco es con s
  newLocation = info[1].replace(/\n/g, "").trim(); //.replace(/\s\s+/g, ' ')

//Borra los () y lo que haya dentro
newLocation = newLocation.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim(); 
  
//Borra las descripciones muy cortas
  if(cleanHTML(full_html_text).trim().length < 200){
    //if(cleanHTML(full_html_text).trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
    job.flag_active =  0;
    job.html        = "";
    job.jobdesc     = "";
    }
  else{ //LIMPIAR Y ORGANIZAR TEXTO
    job.html    = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'Description', false);
    job.html = removeTextAfter(job.html, 'Location', true);
    job.html = job.html.replace(/<div>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>|<h7>/g,"<p>"); //Reemplaza esos tags por p
    job.html = job.html.replace(/<\/div>|<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>|<\/h7>/g,"</p>");
    job.html    = cleanHTML(job.html);
    job.jobdesc = job.html;
  }
  
  //Borra las descripciones muy cortas
  if(job.jobdesc.length < 50){​​​​​​​
        msg('\x1b[31m Sorry! :( description not available')
        job.flag_active = 0;
        job.html = "";
        job.jobdesc = "";
    }​​​​​​

    
//BORRAR SECCIÓN
    if (job.title.indexOf("-")>-1) {
      job.title = job.title.split("-")
      for (var x = 0; x < job.title.length; x++) {
          if(job.title[x].toLowerCase().indexOf("bonus")>-1){ //job.title[x].indexOf("$")>-1 | 
            job.title[x] = job.title[x].replace(job.title[x],"");
            //if (job.title.indexOf("/")>-1) {job.title[x] = job.title.split("/").shift()};
          }
      }
      job.title = job.title.join("");
    }

//Eliminar selectores con cierto texto
removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN',full_html)
function removeTextSelector(textSelector,elements){
  let selectors = textSelector.split(',');
  selectors.forEach(function(selector){
  let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
    elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
}

//Eliminar todos los que tengan ese selector
removeSelector('script, style, a, img',document);
function removeSelector(selectorDom, elements){
  selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
}

//Eliminar jobs sin variables principales
if(job.title.length > 0 && newLocation.length > 0 && job.url.length > 0){
  jobs.push(job);
}

//ELIMINAR JOBS VENCIDOS - DATECLOSED
//Obtener meses restantes del job

var day, month, year, fullClosedDate;
day   = Number(job.dateclosed_raw.split("/")[1]);
month = Number(job.dateclosed_raw.split("/")[0]);
year  = Number(job.dateclosed_raw.split("/")[2]);

fullClosedDate = new Date();
fullClosedDate.setFullYear(year, month - 1, day);
var date = fullClosedDate;    

var today   = new Date();

var monthS = (date - today)/2629800000;

if(monthS.toString().indexOf("-")>-1){
msg("EXPIRED JOB. Date closed: " + job.dateclosed_raw );
}

job.temp = "Jan-25-2021";
if(monthS.toString().indexOf("-")==-1){// To filter expired jobs
jobs.push(job);
}



//ELIMINAR JOBS VENCIDOS - DATEPOSTED
//Obtener meses restantes del job
job.dateposted_raw = elem.querySelector("div > span").textContent.trim().replace(",", '');
job.dateposted_raw = getDateFormat(job.dateposted_raw, " ",1, 0, 2);
//DETENER PAGINACIÓN Y FILTRAR JOBS VIEJOS
var day, month, year, fullClosedDate;
day   = Number(job.dateposted_raw.split("/")[1]);
month = Number(job.dateposted_raw.split("/")[0]);
year  = Number(job.dateposted_raw.split("/")[2]);

fullClosedDate = new Date();
fullClosedDate.setFullYear(year, month - 1, day);
var date = fullClosedDate;    

var today   = new Date();

var monthS = (today - date);
if (monthS > 15552000000){ //6 meses en milisegundos
  msg("EXPIRED JOB. Date closed: " + job.dateposted_raw );
  out["pass_it"].no_more_pagination = true;
}
else {
  out["pass_it"].no_more_pagination = false;
}




//Eliminar jobs duplicados
const seen = new Set();
var  filteredArr = jobs.filter(el => {
  const duplicate = seen.has(el.title + el.location + el.url + el.reqid);
  seen.add(el.title + el.location + el.url + el.reqid);
  return !duplicate;
});
out["jobs"]= filteredArr;



//Eliminar esperas 
document.querySelector('.ctdcs-load').remove();
undefined
document.querySelector('.ctdcs-load').parentElement.remove();



//ELIMINAR EMOJIS
let regex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2000-\u29FF\u00A9-\uFFFF]+/g;
// Example using a replace.
job.html.replace(regex, '');