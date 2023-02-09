/*

INLAND. 

3 STEPS. 

1) BEFORE EXTRACT: Se toman los selectores. 1. Main loop == selector jobs 2. Selector de la descripción. 3. Selector: title, location. 
                   Verificar si existe enlace URL. Descomentar las líneas necesarias en la parte inferior para pasar la información al 
                   step extract. 

                   (-) SI NO SE TOMA el valor del url en el before-extract, la línea queda comentada "//var url..." y por ende la linea 
                   ""//out["pass_it"]["url"] = url; (también del step extrac).
                   En el step siguiente, EXTRACT, se coloca "job.url      = window.location.href;" para que tome el current URL del josite. 

                    
                   (+) SI SE TOMA EL VALOR del URL. La variable en before extract queda como "var url = elem.href.trim();" y se descomenta la línea
                   de abajo para que quede como "out["pass_it"]["url"] = url;"



                   SI HAY QUE HACER CLICK EN UN INPUT O BOTÓN DEL JOB. 

                   En "var selector_click_Job = "selector del input o botón
                   y más abajo se descomenta ""selector_click_Job": selector_click_Job,"

                   Después se prueba el código en la consola. 

                   En caso contrario, se presiona el job automáticamente.



2) EXTRACT:         se limpia la descripción. 
3) PAGINACIÓN       se prueba entre los 3 vías diferentes. 


*/




// #1 STEP:  BEFORE EXTRACT ------------------------//

/*

Se toma los valores del selector para iterar los jobs o en otras palabras donde se realiza el "loop" o "ciclo"
Selector de la descripción. 


Objetivo. 

Obtener título, locacion, url de cada job. 

Primero se ejecuta el before-extract. Se colocan los selectores: main-loop y selector que contiene la descripción de los jobs. 

Después como de costumbre. Los selectores que contienen el título, locación y si existe de URL. 
Se descomentan las lineas de abajo que corresponden al pass it, para pasar a esa inforación al step extract. 
Eliminando los mensajes se puede probar el código en la cosola. 

Fijarse si es necesario descomentar la línea "selector_click_Job"


*/

// Before extract

(function() {
  var out = {};
  
    var selector_jobs = "";  //1) Selector de los jobs - main_loop_selector 
    var selector_desc = "";   //2) Selector de la descripción
    //var selector_click_Job = "a";
  
  if (typeof pass_it == "undefined") 
      pass_it = {};

    if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
      "salir":false,
            "selector_jobs": selector_jobs,
          //  "selector_click_Job": selector_click_Job,          
            "selector_desc": selector_desc


      };
    } else {
      out["pass_it"] = pass_it;
    }
  //msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length);
  var elemento = out["pass_it"]["selector_jobs"];
  var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]];
  if (elem){
   
      var title    = elem.querySelector("div.job-item-job-title").textContent.trim();
      //var url      = elem.querySelector("").href.trim();
      var location = elem.querySelector("div.job-item-location").textContent.trim();
    
        //var source_jobtype     = elem.querySelector("").textContent.trim();
        //var source_salary      = elem.querySelector("").textContent.trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();

         //var source_empname = elem.querySelector("").textContent.trim();
         //var logo           = elem.querySelector("").getAttribute("src").trim();


      //var dateposted_raw = elem.querySelector("").textContent.trim();
      //    dateposted_raw = getDateFormat(job.dateposted_raw);

    

   

  out["pass_it"]["title"]    = title; 
  out["pass_it"]["location"] = location;
    
  //out["pass_it"]["url"] = url;
  //out["pass_it"]["dateposted_raw"] = dateposted_raw;
  //out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
  //out["pass_it"]["logo"] = logo;
  //out["pass_it"]["source_apply_email"] = source_apply_email;  
  //out["pass_it"]["source_empname"] = source_empname; 
  //out["pass_it"]["source_jobtype"] = source_jobtype;
  //out["pass_it"]["source_salary"] = source_salary;   
  

    if (typeof(selector_click_Job) == 'undefined'){
        elem.click();
        out.waitFor = out["pass_it"]["selector_desc"];
    }else{
        elem.querySelector(selector_click_Job).click();
      out.waitFor = out["pass_it"]["selector_desc"];
    }
    
}else{
  
    //msg("EN EL FALSE DE BEFORE");
    //msg(elemento);
    //msg(elem);
    out["pass_it"]["salir"] = true;
  }
  

    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

          if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr/i)>-1){month = "04";}
            if(month.search(/may/i)>-1){month = "05";}
            if(month.search(/jun/i)>-1){month = "06";}
            if(month.search(/jul/i)>-1){month = "07";}
            if(month.search(/aug/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// #2  STEP EXTRACT 


(function() {

  var out = {};
  var jobs = [];
    out["pass_it"] = pass_it;
  if (out["pass_it"]["salir"]){
    var job = {};
    job.title = 'holaa';
    jobs.push(job);
  }else{
  
   // msg(out["pass_it"]["selector"]);
  if (document.querySelector(out["pass_it"]["selector_desc"])){
    var job = {};
    var remove_selectors = ["a", "script", "style"];

    
        job.title    = out["pass_it"]["title"];
        job.location = out["pass_it"]["location"];
        job.url      = window.location.href;

        //job.source_jobtype = out["pass_it"]["source_jobtype"];
        //job.source_salary  = out["pass_it"]["source_salary"];

        //job.source_apply_email = out["pass_it"]["source_apply_email"];
    
        //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
       
         //job.source_empname = out["pass_it"]["source_empname"];
         //job.logo           = out["pass_it"]["logo"];
         
   
      var full_html = document.querySelector(out["pass_it"]["selector_desc"]);
    // remove something from the jobdatata
          if (remove_selectors.length > 0) {       
            remove_selectors.forEach(remove_selector => {
        let salir
              do{
                salir = false;
                if (full_html.querySelector(remove_selector)) {
                    full_html.querySelector(remove_selector).remove();
                    salir = true;
                }
              }while (salir);  
            });
        } 
  
  job.html    = full_html.innerHTML.trim();
  job.jobdesc   = full_html.textContent.trim();
  
  //job.html    = removeTextBefore(job.html, "", false);
  //job.html    = removeTextBefore(job.html, "", false);
  
  
  //job.html    = removeTextAfter(job.html, "", true);
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  
  job.html      = cleanHTML(job.html);
  job.jobdesc   = job.html;
  
  job.temp = 1;
      if(job.title.length > 0 && job.location.length > 0){
      jobs.push(job);
      }
      
  } else
    msg("en el else");
  }
   //out["pic"] = true;
  out["jobs"] = jobs;
  return out;
  
   
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = "<h3>" + text + "</h3>" + newHtml;
        }     
      }
      return newHtml;
    }

    function removeTextAfter(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
          newHtml = newHtml + "<p>" + text + "</p>";
        }     
      }
      return newHtml;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Pagination 

    (function () {
    var out = {};
     
    out["pass_it"] = pass_it;
        out["pass_it"].cont += 1;
  
  
    window.location.href = ''; // URL del jobsite 
      

     // window.history.back(); // método para presionar "back"


      /*if (document.querySelector("span.icon"))                // click en el icóno de jobs
        document.querySelector("span.icon").click();*/
  
  if (out["pass_it"]["salir"])
      out["has_next_page"] = false;
  else
      out["has_next_page"] = true;

  out.waitFor = out["pass_it"]["selector_jobs"];
//out["wait"] = true;
    return out;
})();/*

INLAND. 

3 STEPS. 

1) BEFORE EXTRACT: Se toman los selectores. 1. Main loop == selector jobs 2. Selector de la descripción. 3. Selector: title, location. 
                   Verificar si existe enlace URL. Descomentar las líneas necesarias en la parte inferior para pasar la información al 
                   step extract. 

                   (-) SI NO SE TOMA el valor del url en el before-extract, la línea queda comentada "//var url..." y por ende la linea 
                   ""//out["pass_it"]["url"] = url; (también del step extrac).
                   En el step siguiente, EXTRACT, se coloca "job.url      = window.location.href;" para que tome el current URL del josite. 

                    
                   (+) SI SE TOMA EL VALOR del URL. La variable en before extract queda como "var url = elem.href.trim();" y se descomenta la línea
                   de abajo para que quede como "out["pass_it"]["url"] = url;"



                   SI HAY QUE HACER CLICK EN UN INPUT O BOTÓN DEL JOB. 

                   En "var selector_click_Job = "selector del input o botón
                   y más abajo se descomenta ""selector_click_Job": selector_click_Job,"

                   Después se prueba el código en la consola. 

                   En caso contrario, se presiona el job automáticamente.



2) EXTRACT:         se limpia la descripción. 
3) PAGINACIÓN       se prueba entre los 3 vías diferentes. 


*/




// #1 STEP:  BEFORE EXTRACT ------------------------//

/*

Se toma los valores del selector para iterar los jobs o en otras palabras donde se realiza el "loop" o "ciclo"
Selector de la descripción. 


Objetivo. 

Obtener título, locacion, url de cada job. 

Primero se ejecuta el before-extract. Se colocan los selectores: main-loop y selector que contiene la descripción de los jobs. 

Después como de costumbre. Los selectores que contienen el título, locación y si existe de URL. 
Se descomentan las lineas de abajo que corresponden al pass it, para pasar a esa inforación al step extract. 
Eliminando los mensajes se puede probar el código en la cosola. 

Fijarse si es necesario descomentar la línea "selector_click_Job"


*/

// Before extract

(function() {
  var out = {};
  
    var selector_jobs = "";  //1) Selector de los jobs - main_loop_selector 
    var selector_desc = "";   //2) Selector de la descripción
    //var selector_click_Job = "a";
  
  if (typeof pass_it == "undefined") 
      pass_it = {};

    if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
      "salir":false,
            "selector_jobs": selector_jobs,
          //  "selector_click_Job": selector_click_Job,          
            "selector_desc": selector_desc


      };
    } else {
      out["pass_it"] = pass_it;
    }
  //msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length);
  var elemento = out["pass_it"]["selector_jobs"];
  var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]];
  if (elem){
   
      var title    = elem.querySelector("div.job-item-job-title").textContent.trim();
      //var url      = elem.querySelector("").href.trim();
      var location = elem.querySelector("div.job-item-location").textContent.trim();
    
        //var source_jobtype     = elem.querySelector("").textContent.trim();
        //var source_salary      = elem.querySelector("").textContent.trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();

         //var source_empname = elem.querySelector("").textContent.trim();
         //var logo           = elem.querySelector("").getAttribute("src").trim();


      //var dateposted_raw = elem.querySelector("").textContent.trim();
      //    dateposted_raw = getDateFormat(job.dateposted_raw);

    

   

  out["pass_it"]["title"]    = title; 
  out["pass_it"]["location"] = location;
    
  //out["pass_it"]["url"] = url;
  //out["pass_it"]["dateposted_raw"] = dateposted_raw;
  //out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
  //out["pass_it"]["logo"] = logo;
  //out["pass_it"]["source_apply_email"] = source_apply_email;  
  //out["pass_it"]["source_empname"] = source_empname; 
  //out["pass_it"]["source_jobtype"] = source_jobtype;
  //out["pass_it"]["source_salary"] = source_salary;   
  

    if (typeof(selector_click_Job) == 'undefined'){
        elem.click();
        out.waitFor = out["pass_it"]["selector_desc"];
    }else{
        elem.querySelector(selector_click_Job).click();
      out.waitFor = out["pass_it"]["selector_desc"];
    }
    
}else{
  
    //msg("EN EL FALSE DE BEFORE");
    //msg(elemento);
    //msg(elem);
    out["pass_it"]["salir"] = true;
  }
  

    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

          if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr/i)>-1){month = "04";}
            if(month.search(/may/i)>-1){month = "05";}
            if(month.search(/jun/i)>-1){month = "06";}
            if(month.search(/jul/i)>-1){month = "07";}
            if(month.search(/aug/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// #2  STEP EXTRACT 


(function() {

  var out = {};
  var jobs = [];
    out["pass_it"] = pass_it;
  if (out["pass_it"]["salir"]){
    var job = {};
    job.title = 'holaa';
    jobs.push(job);
  }else{
  
   // msg(out["pass_it"]["selector"]);
  if (document.querySelector(out["pass_it"]["selector_desc"])){
    var job = {};
    var remove_selectors = ["a", "script", "style"];

    
        job.title    = out["pass_it"]["title"];
        job.location = out["pass_it"]["location"];
        job.url      = window.location.href;

        //job.source_jobtype = out["pass_it"]["source_jobtype"];
        //job.source_salary  = out["pass_it"]["source_salary"];

        //job.source_apply_email = out["pass_it"]["source_apply_email"];
    
        //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
       
         //job.source_empname = out["pass_it"]["source_empname"];
         //job.logo           = out["pass_it"]["logo"];
         
   
      var full_html = document.querySelector(out["pass_it"]["selector_desc"]);
    // remove something from the jobdatata
          if (remove_selectors.length > 0) {       
            remove_selectors.forEach(remove_selector => {
        let salir
              do{
                salir = false;
                if (full_html.querySelector(remove_selector)) {
                    full_html.querySelector(remove_selector).remove();
                    salir = true;
                }
              }while (salir);  
            });
        } 
  
  job.html    = full_html.innerHTML.trim();
  job.jobdesc   = full_html.textContent.trim();
  
  //job.html    = removeTextBefore(job.html, "", false);
  //job.html    = removeTextBefore(job.html, "", false);
  
  
  //job.html    = removeTextAfter(job.html, "", true);
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  
  job.html      = cleanHTML(job.html);
  job.jobdesc   = job.html;
  
  job.temp = 1;
      if(job.title.length > 0 && job.location.length > 0){
      jobs.push(job);
      }
      
  } else
    msg("en el else");
  }
   //out["pic"] = true;
  out["jobs"] = jobs;
  return out;
  
   
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = "<h3>" + text + "</h3>" + newHtml;
        }     
      }
      return newHtml;
    }

    function removeTextAfter(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
          newHtml = newHtml + "<p>" + text + "</p>";
        }     
      }
      return newHtml;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Pagination 

    (function () {
    var out = {};
     
    out["pass_it"] = pass_it;
        out["pass_it"].cont += 1;
  
  
    window.location.href = ''; // URL del jobsite 
      

     // window.history.back(); // método para presionar "back"


      /*if (document.querySelector("span.icon"))                // click en el icóno de jobs
        document.querySelector("span.icon").click();*/
  
  if (out["pass_it"]["salir"])
      out["has_next_page"] = false;
  else
      out["has_next_page"] = true;

  out.waitFor = out["pass_it"]["selector_jobs"];
//out["wait"] = true;
    return out;
})();