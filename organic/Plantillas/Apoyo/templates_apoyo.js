
/*
primer indexación de prueba 216149

Actualizado Marzo, 19 2021

1. EXTRACT 
2. JOBDATA JS PLANO
3. JOBDTA JQuery
4. MULTI-LOCATION SIMPLE
5. OBTENIENDO DESCRIPCIÓN DESDE EL EXTRACT: SIMPLE (DESDE LA MISMA PÁGINA), JSON, AJAX
6. ACCEDIENDO A UN IFRAME 
7. JOB FANTASMA
8. CLICKING A BUTTON TO ACCESS JOBS LIST
9. CODIGO DE APOYO RESUMIDO
                            #1 TITLE
                            #2 LOCATION
                            #3 JOBTYPE
                            #4 E-MAIL
                            #5 URL
                            #6 VALIDACIONES
                            #7 EXPERIENCE
                            #8 ESPERAS

*/


// 1. EXTRACT ----------------------------------------------------------------------------------------------------------------------------------------------//
(function() {
    var out = {};
        var html_jobs = document.querySelectorAll("");
    var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("").textContent.trim();
        job.url = elem.querySelector("").href.trim();
        job.location = elem.querySelector("").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.dateclosed_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
        //job.experience_required = elem.querySelector("").textContent.trim();
        //job.reqid = elem.querySelector("").textContent.trim();
        job.temp = 1;
        jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
})();
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll(".jobdetail");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("span.jobtitel").textContent.trim();
    	job.url = elem.href.trim();
        job.location = elem.querySelector("span.ort").textContent.trim().replace("/ ARGO Aviation",'');
    	//job.location = elem.querySelector("span.ort").textContent.trim().replace(/[0-9]{2}\,/,'');
        job.dateposted_raw = elem.querySelector("span.datum").textContent.trim();
        
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
      
      
      //job.reqid = elem.href.trim().match(/[0-9]{9}/)[0];
      job.reqid = elem.href.trim().match(/[0-9]{5}/)[0];
      job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();
//EXTRACT ----------------------------------------------------------------------------------------------------------------------------------------------//

(function() {
  var out = {};

      var html_jobs = document.querySelectorAll(''); 
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector('').textContent.trim();
      job.url      = elem.querySelector('').href.trim();
      job.location = elem.querySelector('').textContent.trim();   

      //job.reqid = elem.querySelector('').textContent.trim();   

      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experienced_required = elem.querySelector('').textContent.trim();

      //job.source_empname = elem.querySelector('').textContent.trim();
      //job.logo           = elem.querySelector('').getAttribute("src").trim();
      
      //var datePosted     = elem.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted,"/",0,1,2);

      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);

      job.temp  = "2021";

      //job.jobid = MD5(job.title+job.location+job.temp);  
      
      //if(job.title.search(//i)>-1){job.title = "";}
     
      //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
      //}
    
    } 
  
  out["jobs"]= jobs;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"");

       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/rd|st|th/i,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch, French
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar|maar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai|mei/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct|okt/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
        }
  var datum = month +"/"+  day +"/"+ year;
    return datum;
}

  // 2. JOBDATA JS PLANO ----------------------------------------------------------------------------------------------------------------------------------------------//

(function() {//August-2021

var out = {};
var job = {};

var selector  = '';

var full_html = document.querySelector(selector); 

//var job = pass_it["job"];

/*  // VALIDAR UN SELECTOR 
var jobtype = document.querySelector('selectorDelJobtype');
if(jobtype !== null){
 job.source_jobtype = jobtype.textContent.trim();
}
*/

//--------------------------JOB-INFO ------------------------------------//
  //job.location       = document.querySelector('').textContent.trim();
  //job.source_jobtype = document.querySelector('').textContent.trim();
  
  //let datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
 //---------------------------------------------------------------------//

/*
if(cleanHTML(full_html.textContent).trim().length < 200){

  job.flag_active =  0;
  job.html        = "";
  job.jobdesc     = "";

}else{
*/

  // To Remove selectors 
for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
    if (a){
      a.remove();
    }
}

/*
for (const a of full_html.querySelectorAll('tr')) {
    if (a.textContent.search(//)>-1){
          //job.location = a.textContent.trim();
          //job.source_jobtype = a.querySelector('').textContent.trim();
          //a.remove();
    } 
}
 */
   
   job.html = full_html.innerHTML.trim();

  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
//}

out["job"] = job;
return out;

})();

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

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"");

       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/rd|st|th/i,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch and French
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar|maar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai|mei/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct|okt/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
        }
  var datum = month +"/"+  day +"/"+ year;
    return datum;
}

// 3. JOBDTA JQuery -----------------------------------------------------------------------------------------------------------------------------------------------//

(function() {

  var out = {};
  var job = {};

  var selector  = ""; 

  var full_html = $(selector);
  var html_2    = $(selector).text();

  //------------INFO--------------------------------------//

  // job.location             = $('').text().trim();
  // job.source_jobtype       = $('').text().trim();
  // job.source_salary        = $('').text().trim();
  
 // job.experienced_required   = $('').text().trim();
 
  // job.source_empname       = $('').text().trim();
  // job.logo                 = $('').attr("src");  


  //var date = $('').text().trim();
  //job.dateposted_raw  = getDateFormat(); // Function parameters: dateRaw, cut, dayPosition, monthPosition, yearPosition

     /*
     if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
     job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
     */
  
 //-----------REMOVE SELECTORS--------------------------------------//

    full_html.find('a, input, button').remove().end().html();
    full_html.find('img, div.alert, style, script').remove().end().html();
    full_html.find('form').remove().end().html();
    
    //full_html.find("h1").remove().end().html();

    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

    //full_html.find("p:contains(CONTACT)").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();


 //-----------------------------------------------------------------// 

  var full_html_text = full_html.text();

  if(full_html_text.trim().length < 200){
  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
  

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{

  var full_html = full_html.html();

   job.html = full_html.trim();

  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

//CLEAN EMOJIS
// job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();

  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
}
  out["job"]  = job;
  return out;
  
})();

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
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"");

       if(dateRaw.indexOf(".")>-1){
          var periods = dateRaw.match(/\./g).length;
          if(periods > 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
       }

        let day   = dateRaw.split(cut)[dayPosition].trim(), 
            month = dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/rd|st|th/i,"").trim();    
         if(day < 10 && day.length < 2){day = "0" + day;}
         if(year.length == 2){year = "20" + year;}
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
           //English, Dutch and French
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar|maar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai|mei/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct|okt/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
        }
  var datum = month +"/"+  day +"/"+ year;
    return datum;
}

 // 4. MULTI-LOCATION SIMPLE ----------------------------------------------------------------------------------------------------------------------------------------------//

        if(job.location.indexOf("/")>-1){
          var locs = job.location.split("/");
            for(w in locs){
              var jobw = {...job};
              jobw.location = locs[w];
              jobs.push(jobw); 
            }
        }else{
            jobs.push(job); // Single Location jobs
        }
//---MULTI-LOCATION MODIFIED-------------------------------------------------------------------------------------------------------------------------------------------
job.location = job.location.split("/");
        job.location.map(location =>{
          var jobx = {};
          jobx ={...job}
          jobx.location = location;
          jobs.push(jobx);
        })
        
// 5. OBTENIENDO DESCRIPCIÓN DESDE EL EXTRACT: SIMPLE (DESDE LA MISMA PÁGINA), JSON, AJAX ----------------------------------------------------------------------------//

/////////////////////////////////////
// SIMPLE (DESDE LA MISMA PÁGINA) //
/////////////////////////////////// 


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
      
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();


          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);



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

///////////
// JSON //
/////////

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

         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);


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

///////////
// AJAX //
/////////

        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div.querySelector("jobdataSelector");

          
         for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }

          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextBefore(job.html, "", false);
        
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();

          //job.html = job.html.replace("","").trim();

          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);



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


// 6. ACCEDIDENDO A UN IFRAME  ------------------------------------------------------------------------------------------------------------------------------------//

// En la plantilla del extract colocar debajo de var "out = {};" y arriba de "var html_jobs = document.querySelectorAll("");" 

  /* // To extract from iframe
    var iframe_selector = "";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll(""); // Loop selector
  */ // The following line must be inactivated 

// 7. JOB FANTASMA ------------------------------------------------------------------------------------------------------------------------------------------------//

//Job fantasma
if(jobs.length == 0){
  var job_fantasma = {title:"GHOST"};
  jobs.push(job_fantasma);
}
//Se coloca justo antes de: out["jobs"]= jobs;


// 8. Click on button to display jobs ------------------------------------------------------------------------------------------------------------------------------//

 (function() {
  var out = {};
   var buttonSelector = '';
    document.querySelector(selector).click();
    return out;
})();


// 9. CODIGO DE APOYO RESUMIDO -------------------------------------------------------------------------------------------------------------------------------------//

/*

#1 TITLE
#2 LOCATION
#3 JOBTYPE
#4 E-MAIL
#5 URL
#6 VALIDACIONES
#7 EXPERIENCE
#8 ESPERAS

*/

////////////////
// #1 TITLE  //
//////////////     

     job.title = job.title.trim().replace(/^\,/,"").trim();

     job.title   = job.title.trim();
     var firstCharTitle = job.title.charAt(0);
     if(firstCharTitle === "-" || firstCharTitle === "," || firstCharTitle === "("){job.title = job.title.slice(1).trim();}

    job.title = job.title.trim();
    let lastCharTitle = job.title.substr(job.title.length -1);
     if(lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "(" ){job.title = job.title.slice(0,-1).trim();}


      //if(job.title.indexOf("")>-1){job.title =  "";} 
      //if(job.title.indexOf("")>-1){job.title =  "";} 
      //if(job.title.indexOf("")>-1){job.title =  "";}
      //if(job.title.indexOf("")>-1){job.title =  "";} 

    
      job.title = job.title.replace(/[0-9]/g, '');

      job.title = job.title.replace(/\(.*?\)/g, '');

      job.title = job.title.replace(/\{.*?\}/g, '');

      job.title = job.title.replace(/\[.*?\]/g, '').trim();
               

              // Split - city 2

      if(job.location.indexOf(",")>-1){
         let city = job.location.split(",")[0].trim();
              var preClean = job.title.split(city).shift().trim();
               if(preClean.length > 10){
                   job.title = job.title.split(city).shift().trim();
                      let lastChar = job.title.substr(job.title.length -1);
                        if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                          job.title = job.title.slice(0,-1).trim();}
                        }else{
                          job.title = job.title.replace(city,"").trim();
                          job.title = job.title.trim().replace(/^\-|\–/,"").trim();
                          }
      }

  
 
/////////////////////
//  #2 LOCATION   //
///////////////////

    job.location = job.location.trim().replace(/^\;/,"").trim();

    job.location = job.location.trim();
    let lastChar = job.location.substr(job.location.length -1);
    if(lastChar === "-" || lastChar === "," || lastChar === "(" ){job.location = job.location.slice(0,-1).trim();}

    //Delete first hyphen "-" from location.  
    job.location  = job.location.trim();
    var firstCharLoc = job.location.charAt(0);
    if(firstCharLoc === "-"){job.location = job.location.slice(1).trim();}

    //Delete last hyphen "-" from location. 
    job.location    = job.location.trim();
    var lastCharLoc = job.location.substr(job.location.length -1);
     if(lastCharLoc === "-"){job.location = job.location.slice(0,-1).trim();}

 
    job.location = job.location.replace(/[0-9]/g, "");
    
    job.location = job.location.replace(/\(.*?\)/g, '');

    job.locaion  = job.location.replace(/\[.*?\]/g, ''); 

    job.locaion  = job.location.replace(/\<.*?\>/g, '');

    
    job.location = job.location.split("-").reverse().join(", ");  



    //Location array "city, country"

    var city    = elem.querySelector("selectorDeLaCiudad").textContent;
    var country = elem.querySelector("selectorDelPaís").textContent;
          
    var loc = "";
    var array_loc = Array();

    if(city) array_loc.push(city);
    if(country) array_loc.push(country);
          
    if(array_loc.length) loc = array_loc.join(", ");

  job.location = loc;

///////////////////
//  #3 JOBTYPE  //
/////////////////

      //----------Job-Type-Array()-------------------------------------------------------//

        var type   = $("li:contains(Contrat)").text().split(":").pop().trim();
        var temps  = $("li:contains(Temps de travail)").text().split(":").pop().trim();
         
        var jobType = "";
        var array_jobType = Array();

        if(type) array_jobType.push(type);
        if(temps) array_jobType.push(temps);
        if(array_jobType.length) jobType = array_jobType.join(" - ");

    job.source_jobtype = jobType;


    // variable "html_2" to be used within jobdata code; the variable is declare at the beggining.

    if(html_2.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
    if(html_2.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}


    if(type.indexOf("CDI")>-1){job.source_jobtype = "CDI";}
    if(type.indexOf("CDD")>-1){job.source_jobtype = "CDD";}
    if(type.toLowerCase().indexOf("stage")>-1){job.source_jobtype =  "Stage";}
    if(type.toLowerCase().indexOf("alternance")>-1){job.source_jobtype =  "Alternance";}

    
    job.title = job.title.replace(/part time|full time|full\-time|part\-time/g,"").replace("()","").trim();

    job.title = job.title.replace(/stage/i,"").trim();
    job.title = job.title.replace(/alternance/i,"").trim();


        job.title = job.title.replace("(CDI)","").trim();
        job.title = job.title.replace("(CDD)","").trim();
        job.title = job.title.replace(/CDI/i,"").trim();
        job.title = job.title.replace(/CDD/i,"").trim();


/////////////////
// #4 E-MAIL  //
///////////////

 
    //To extract the string that contains email in job descriptions. 
    /*
    if(full_html.innerText.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    job.source_apply_email = full_html.innerText.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
    */

 //////////////
// #5 URL  //
////////////

/*

"¿Qué es una URL?"

https://developer.mozilla.org/es/docs/Learn/Common_questions/Qu%C3%A9_es_una_URL

*/

window.location.protocol + "//" + window.location.hostname + window.location.pathname

var x  = window.location.protocol + "//" + window.location.hostname;

var org = window.location.origin;


     window.location.href       returns the href (URL) of the current page
     window.location.hostname   returns the domain name of the web host
     window.location.pathname   returns the path and filename of the current page
     window.location.protocol   returns the web protocol used (http: or https: ) 

(Tomado de https://www.w3schools.com/js/js_window_location.asp, NOV 28, 2019)


     if (job.html.indexOf('@') > -1) {  
  job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  }  if (job.html.indexOf('https') > -1) {  
    job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); 
  }  if (job.html.indexOf('http') > -1) {   job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('HTTPS') > -1) {   job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }  if (job.html.indexOf('HTTP') > -1) {   job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");     }



//////////////////////
// #6 VALIDACIONES //
////////////////////

    //if(job.title.search(//i)>-1){job.title = "";}
    if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
    jobs.push(job);
    }


 //////////////////
// #7 Experience //
//////////////////


    for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.search(/experience/i)>-1 && a.textContent.search(/[0-9]/g)>-1){
        job.experienced_required = a.textContent;
      } 
    }


 ////////////////
// #8 ESPERAS //
////////////////

(function() {
var out = {};
//out.waitFor = '';
//out.html = true
//out["pic"] = true;
//out["wait"] = 200;
//out.iframeSelector = '';
//out.iframeWaitFor = '';
//location.reload(); // Refresh
return out;
})();

//-------------------------------//

setTimeout(function(){
}, 1500);


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
sleep(15000);

//----------------REMOVE SELECTOR----------------//
function removeSelector(selectorDom, elements){
  selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
}
//----------------MULTILINK SIMPLE---------------//
(function () {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["urls"]) {
    out["pass_it"] = {
      "urls": []                //Colocar las urls
    };
  } else {
    out["pass_it"] = pass_it;
  }
  if (out["pass_it"]["urls"].length > 0) {
    var url = out["pass_it"].urls.shift();
    //msg(url);
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out.waitFor = '';  // COLOCAR EL SELECTOR A ESPERAR
  return out;
})();
//-------------------------MULTILINK CON PAGINACION--------------------------------------------------------------

(function() {
  var out = {};
  var next_page_selector = 'a[id="dnn_ctr400_Offres_rDocuments_ctl16_HL_PAGE_SUIVANTE_BAS"]'; //selector to identify the next button
  var clickable_elem = document.querySelector(next_page_selector);
  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["urls"]) {
    out["pass_it"] = {
      "urls": ["https://www.clicandsport.fr/emploi/mc/cdd/ct/cdd.aspx"]                //Colocar las urls
    };
  } else {
    out["pass_it"] = pass_it;
  }



  if(clickable_elem){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
    if (out["pass_it"]["urls"].length > 0) {
      var url = out["pass_it"].urls.shift();
      //msg(url);
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
  }

  out.waitFor = "";//'div[style="width: 710px;"] > a';
  return out;
})();

//----------------------------------FUNCION FORMATEADORA DE FECHA*--------------------------------------------------------------
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {​​​
        dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
	let day   =  dateRaw.split(cut)[dayPosition].trim(), 
        month =  dateRaw.split(cut)[monthPosition].trim(), 
        year  = dateRaw.split(cut)[yearPosition].trim();
        day = day.replace(/rd|st|th|nd/i,"").trim();    
	if(day < 10 && day.length < 2){​​​day = "0" + day;}​​​ 
	if(dateRaw.search(/[a-z]/gi)>-1){​​​ 
	//English, Dutch, French
	if(month.search(/jan/i)>-1){​​​month = "01";}​​​
	if(month.search(/feb|fév/i)>-1){​​​month = "02";}​​​
	if(month.search(/mar|maar/i)>-1){​​​month = "03";}​​​
	if(month.search(/apr|avr/i)>-1){​​​month = "04";}​​​
	if(month.search(/may|mai|mei/i)>-1){​​​month = "05";}​​​
	if(month.search(/jun|juin/i)>-1){​​​month = "06";}​​​
	if(month.search(/jul|juil/i)>-1){​​​month = "07";}​​​
	if(month.search(/aug|août/i)>-1){​​​month = "08";}​​​
	if(month.search(/sep/i)>-1){​​​month = "09";}​​​
	if(month.search(/oct|okt/i)>-1){​​​month = "10";}​​​
	if(month.search(/nov/i)>-1){​​​month = "11";}​​​
	if(month.search(/dec|déc/i)>-1){​​​month = "12";}​​​
            }​​​
	var datum = month +"/"+  day +"/"+ year;
	return datum;
    }​​​
//------------------------------------LIMPIAR DESDE UN PUNTO A OTRO---------------------------------------------------------------------------------
function cleanFromPointaToB_false(text,a,b){
  var a = text.indexOf(a), b = text.indexOf(b);
      if(a >-1 && b >-1){
        let a_b = text.slice(a,b);
        text = text.replace(a_b,"").trim();
      }
  return text;
}
//----------------------------------------------------IFRAME----------------------------------------------------------------------------
var iframe_selector = 'iframe#grnhse_iframe';
var iframeDocument = document.querySelector(iframe_selector).contentWindow.document; 
//---------------------------------------------------SHADOW-ROOT----------------------------------------------------------------------
let shadowRoot = document.querySelector("ewz-joboffers").shadowRoot;
let html_jobs =shadowRoot.querySelectorAll("")
//----------------------------------------OBTENER DATOS DESDE EL JOBDESCRIPTION-------------------
var full_html = getDescription(job.url);
var tmp = document.createElement("div");
tmp.innerHTML = full_html; 

function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    //xhrrequest.setRequestHeader(header, value);
    var response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) { 
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}
//---------------------------------------------ELIMINAR TAGS DE UN HTML(LIMPIAR)-----------------------
for(const a of full_html.querySelectorAll("a, input, div.alert, img, button, div.alert, style, script, link")){
  if(a){a.remove();}
}

document.querySelectorAll("a, script, style").forEach(item =>{
  item.remove();
});
//----------------------------------------------JSON POR AJAX-------------------------------------------------
(function() {
  var jobs = [];
  var out = {};      
    var data = {};
    $.ajax({
      url : '',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      type : 'POST',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        msg("request successfull");
        msg(result);
      },
      error: function(error){
        msg(error);
      }
    });
  
  out["jobs"]= jobs;
  return out;
})();
//-----------------------------------------------FORMATO FECHA----------------------------------------
job.dateposted_raw = job.dateposted_raw.trim().replace("st", "").replace("rd", "").replace("th", "").replace("nd", "");

job.dateposted_raw = new Date(job.dateposted_raw);
job.dateposted_raw = (job.dateposted_raw.getMonth()+1) +"/"+ job.dateposted_raw.getDate() +"/"+ job.dateposted_raw.getFullYear();

job.dateclosed_raw = new Date(job.dateclosed_raw);
job.dateclosed_raw = (job.dateclosed_raw.getMonth()+1) +"/"+ job.dateclosed_raw.getDate() +"/"+ job.dateclosed_raw.getFullYear();

job.dateposted_raw = new Date(job.dateposted_raw);
job.dateposted_raw = job.dateposted_raw.toLocaleDateString();

var timestamp = 1640991600 
var date = new Date(timestamp * 1000); 
job.dateposted_raw = (date.getMonth()+1) +"/"+ date.getDate() +"/"+ date.getFullYear();

function EpochToDate(epoch) {
  if (epoch < 10000000000)
    epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
  var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
  return new Date(epoch);
}

//-----------------------------------------------------FORMATO FECHA POTENTE------------------------------------------------------
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();
  day = day.replace(/rd|st|th|nd/, "").trim();
  if (day < 10 && day.length < 2) { day = "0" + day; }
  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.search(/ene|jan|january|januari|jan?eiro|Январь|janvier/i) > -1) { month = "01"; }
    if (month.search(/feb?v?|february|fév|februar|fev?ereiro|Февраль|février/i) > -1) { month = "02"; }
    if (month.search(/mar|march|maar|maart|março|Март|mars/i) > -1) { month = "03"; }
    if (month.search(/apr|abr|april|avr|april|abril|Апрель|avril/i) > -1) { month = "04"; }
    if (month.search(/may|mai|mei|maio|Май|Май|mai/i) > -1) { month = "05"; }
    if (month.search(/jun|june|juin|juni|junho|червня|juin/i) > -1) { month = "06"; }
    if (month.search(/jul|july|juil|juli|julho|Июль|juillet/i) > -1) { month = "07"; }
    if (month.search(/aug|ago|august|août|augustus|agosto|Август|août/i) > -1) { month = "08"; }
    if (month.search(/sep|set|september|set?embro|Сентябрь|septembre/i) > -1) { month = "09"; }
    if (month.search(/oct|out|october|okt|oktober|out?ubro|Октябрь|octobre/i) > -1) { month = "10"; }
    if (month.search(/nov|november|novembro|Ноябрь|novembre/i) > -1) { month = "11"; }
    if (month.search(/dec|dez|december|déc|dezembro|Декабрь|décembre/i) > -1) { month = "12"; }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}
//-------------------------------------------------------------------GERMANDATE----------------------------------------------------
function germanDateFormat(texto){
  var text = texto;
  if(text.includes("Januar")){
    text = text.replace("Januar","January");
  }else if(text.includes("Februar")){
    text = text.replace("Februar","February");
  }else if(text.includes("März")){
    text = text.replace("März","March");
  }else if(text.includes("April")){
    text = text.replace("April","April");
  }else if(text.includes("Mai")){
    text = text.replace("Mai","May");
  }else if(text.includes("Juni")){
    text = text.replace("Juni","June");
  }else if(text.includes("Juli")){
    text = text.replace("Juli","July");
  }else if(text.includes("August")){
    text = text.replace("August","August");
  }else if(text.includes("September")){
    text = text.replace("September","September");
  }else if(text.includes("Oktober")){
    text = text.replace("Oktober","October");
  }else if(text.includes("November")){
    text = text.replace("November","November");
  }else if(text.includes("Dezember")){
    text = text.replace("Dezember","December");
  }
  text = new Date(text);
  text = (text.getMonth()+1) +"/"+ text.getDate() +"/"+ text.getFullYear();
  return text;
}

//----------------------------------------------------------------------------------NEEDERLANDDATE-------------------------------------------------------------------
function neederlanDateFormat(texto){
  var text = texto;
  if(text.includes("januari")){
    text = text.replace("januari","January");
  }else if(text.includes("februari")){
    text = text.replace("februari","February");
  }else if(text.includes("maart")){
    text = text.replace("maart","March");
  }else if(text.includes("april")){
    text = text.replace("april","April");
  }else if(text.includes("mei")){
    text = text.replace("mei","May");
  }else if(text.includes("juni")){
    text = text.replace("juni","June");
  }else if(text.includes("juli")){
    text = text.replace("juli","July");
  }else if(text.includes("augustus")){
    text = text.replace("augustus","August");
  }else if(text.includes("september")){
    text = text.replace("september","September");
  }else if(text.includes("oktober")){
    text = text.replace("oktober","October");
  }else if(text.includes("november")){
    text = text.replace("november","November");
  }else if(text.includes("dezember")){
    text = text.replace("dezember","December");
  }
  text = new Date(text);
  text = (text.getMonth()+1) +"/"+ text.getDate() +"/"+ text.getFullYear();
  return text;
}

//--------------------------------------------------------------------------ANOTHER NEEDERLANDATE------------------------------------------------------
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();

  let day   =  dateRaw.split(cut)[dayPosition], 
      month =  dateRaw.split(cut)[monthPosition], 
      year  = dateRaw.split(cut)[yearPosition];
  if(day < 10 && day.length < 2){day = "0" + day;} 

  if(dateRaw.search(/[a-z]/gi)>-1){ 
    if(month.search(/Jan/i)>-1){month = "01";}
    if(month.search(/Feb|fév/i)>-1){month = "02";}
    if(month.search(/Maa/i)>-1){month = "03";}
    if(month.search(/Apr|avr/i)>-1){month = "04";}
    if(month.search(/Mei|mai/i)>-1){month = "05";}
    if(month.search(/Jun|juin/i)>-1){month = "06";}
    if(month.search(/Jul|juil/i)>-1){month = "07";}
    if(month.search(/Aug|août/i)>-1){month = "08";}
    if(month.search(/Sep/i)>-1){month = "09";}
    if(month.search(/Okt/i)>-1){month = "10";}
    if(month.search(/Nov/i)>-1){month = "11";}
    if(month.search(/Dec|déc/i)>-1){month = "12";}
  }
  var datum = month +"/"+  day +"/"+ year;
  return datum;
}
//------------------------------------------------------------NL LOCATION--------------------------------------------------------------------------------
function locationNL(loc){  //funcion con ciudades de NL
  let job = {};
  country = "NL";
  let city_NL = ["Amsterdam","Rotterdam", "Rotterdam", "La Haya", "Den Haag", "Utrecht", "Delft", "Maastricht", "Hengelo","Haarlem", "Eindhoven", "Leiden", "Alkmaar", "Groninga", "Volendam", "Marken", "Dordrecht",
                 "Breda", "Hoorn", "Zwolle", "Arnhem", "Epe", "Zaanse Schans", "Bolduque", "Gouda", "Amersfoort", "Edam-Volendam",
                 "Kinderdijk", "Leeuwarden", "Almere", "Deventer", "Zandvoort", "Naarden", "Enkhuizen", "Lelystad", "Soest", "Lisse",
                 "Amstelveen", "Middelburg", "Bloemendaal", "Kampen", "Venlo", "Apeldoorn", "Nimega", "Giethoorn", "Edam",
                 "Roermond", "Den Helder", "Tilburg", "Urk", "Zaanstad", "Hilversum", "Texel", "Aalsmeer", "Purmerend", "Nimega",
                 "Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Zeeland","Zuid-Holland",'Naaldwijk','Oud-Beijerland','Rosmalen','Uden','Veenendaal','Berkel en Rodenrijs','Barendrecht','Cruquius','Hellevoetsluis','Huizen','Zoeterwoude','Zeist','Vlaardingen','Spijkenisse','Sliedrecht','Oosterhout','Zoetermeer','Zutphen', 'Zetten']

  city_NL.forEach(function(e){             //recorrer el arrego de ciudades
    if(loc.indexOf(e)>-1){loc = e + ', ' + country; }
  });
  return loc
}

//---------------------------------------------------------------------NORWAYDATE--------------------------------------------------------------
function norwayDateFormat(texto){
  var text = texto;
  if(text.includes("januar")){
    text = text.replace("januar","January");
  }else if(text.includes("februar")){
    text = text.replace("februar","February");
  }else if(text.includes("mars")){
    text = text.replace("mars","March");
  }else if(text.includes("april")){
    text = text.replace("april","April");
  }else if(text.includes("mai")){
    text = text.replace("mai","May");
  }else if(text.includes("juni")){
    text = text.replace("juni","June");
  }else if(text.includes("juli")){
    text = text.replace("juli","July");
  }else if(text.includes("august")){
    text = text.replace("august","August");
  }else if(text.includes("september")){
    text = text.replace("september","September");
  }else if(text.includes("oktober")){
    text = text.replace("oktober","October");
  }else if(text.includes("november")){
    text = text.replace("november","November");
  }else if(text.includes("desember")){
    text = text.replace("desember","December");
  }
  text = new Date(text);
  text = (text.getMonth()+1) +"/"+ text.getDate() +"/"+ text.getFullYear();
  return text;
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------DATEAGO----------------------------------------------------------------------
/*
    @Description:
      Funcion para cambiar fecha en multiples idiomas
      ENG, DUCH, FR, ESP
      
    @parameters:
        text, donde se encuentra el texto a convertir, ejm: Published 4 months ago
        char_separator, el tipo de caracter para usar la funcion split
        value_DWMY. posicion donde se encuentra el numero dentro del texto
        calendar_DWMY, Texto que especifica el tiempo ejm: day, month, etc.
    @Recently added:
    • IsNaN check for the value_DWMY parameter
    • Spanish support 
*/
function dateAgo(text, char_separator, value_DWMY, calendar_DWMY) {
  // Variables utilizadas desde el texto
  var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY], 10);
  if (isNaN(numberDWMY)) {
    numberDWMY = 0;
  }
  msg("Numero de dias? => " + numberDWMY);
  var Day_Week_Month_Year = text.split(char_separator)[calendar_DWMY];
  msg("\x1b[33m Valor de hace cuanto --> " + Day_Week_Month_Year);
  var date_Now = new Date(); //declaro un objeto tipo fecha
  var nDays = 0;
  if (typeof Day_Week_Month_Year !== "undefined") {
    Day_Week_Month_Year = text.split(char_separator)[calendar_DWMY];
  } else {
    Day_Week_Month_Year =
      text.split(char_separator)[text.split(char_separator).length - 1];
  }
  msg("\x1b[36m Testing despues valor hace cuanto ---> " + Day_Week_Month_Year);
  // Agregar mas definiciones para diferentes idiomas
  let regex_NOW = /[today|hour|heute|Stunden|maintenant|hoy]+/i;
  let regex_YESTERDAY = /YESTERDAY|GESTERN|hier|ayer/i;
  let regex_DAYS = /DAYS|TAGE|jours|dias|días/i;
  let regex_WEEK = /WEEK|WOCHE||semaine|semana/i;
  let regex_MONTH = /MONTH|MONAT|mois|mes/i;
  let regex_YEARS = /YEAR|JAHR|année|año/i;
  // Condicion sobre que dia es el que hay que descontar sobre la fecha
  nDays = regex_NOW.test(Day_Week_Month_Year) ? 0 : nDays;
  nDays = regex_YESTERDAY.test(Day_Week_Month_Year) ? 1 : nDays;
  nDays = regex_DAYS.test(Day_Week_Month_Year) ? numberDWMY : nDays;
  nDays = regex_WEEK.test(Day_Week_Month_Year) ? numberDWMY * 7 : nDays;
  nDays = regex_MONTH.test(Day_Week_Month_Year) ? numberDWMY * 30 : nDays;
  nDays = regex_YEARS.test(Day_Week_Month_Year) ? numberDWMY * 365 : nDays;
  msg("\x1b[33m Resultado de los dias => " + nDays);
  // CALCULAR LA FECHA EN QUE SE POSTEO EL JOB
  var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date); //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var day = datePosted.getDate(); //devuelve el numero del dia del mes.
  var month = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var year = datePosted.getFullYear().toString(); //devuelve el año.
  if (day < 10) {
    day = "0" + day.toString().trim();
  } else {
    day = day.toString().trim();
  }
  if (month < 10) {
    month = "0" + month.toString();
  } else {
    month = month.toString();
  }
  dateJob = month + "/" + day + "/" + year;
  return dateJob;
}
//FRANCÉS-------------------------------------------------------------------------------------------------------------------------------
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toLowerCase().search(/aujourd'hui|heures|maintenant/g) > -1) { nDays = 0; }
  if (dayWeekMonthYear.toLowerCase().indexOf('Hier') > -1) { nDays = 1; }
  if (dayWeekMonthYear.toLowerCase().indexOf('jours') > -1) { nDays = numberDWMY; }
  if (dayWeekMonthYear.toLowerCase().indexOf('semaines') > -1) { nDays = numberDWMY * 7; }
  if (dayWeekMonthYear.toLowerCase().indexOf('mois') > -1) { nDays = numberDWMY * 30; }
  if (dayWeekMonthYear.toLowerCase().indexOf('ans') > -1) { nDays = numberDWMY * 365; }
  var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  dateJob = mm + '/' + dd + '/' + yyyy;
  return dateJob;
}
//Dutch - Nederlands - holanda
    
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
      var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
  }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
      if (dayWeekMonthYear.toUpperCase().search(/VANDAAG|NU|UUR/g)>-1){nDays = 0;}
      if (dayWeekMonthYear.toUpperCase().indexOf('GISTEREN')>-1) {nDays = 1;}
      if (dayWeekMonthYear.toUpperCase().indexOf('DAGEN')>-1){nDays = numberDWMY;}
      if (dayWeekMonthYear.toUpperCase().search(/WEKEN|WEEK/g)>-1){nDays = numberDWMY * 7;}
      if (dayWeekMonthYear.toUpperCase().search(/MAANDEN|MAAND/g)>-1){nDays = numberDWMY * 30;}
      if (dayWeekMonthYear.toUpperCase().indexOf('JAAR')>-1){nDays = numberDWMY * 365;}   
      var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
      var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
      var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
        //Obtengo dia mes y Año
      var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
      var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
      var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
      if (dd < 10){dd ='0'+dd;}    
      if (mm < 10){mm ='0'+ mm;}
      dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}
//----------------------------------------------------------------------DATE-AGO POTENTE-----------------------------------------------------
//job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 0, 1);

function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY){  
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR|HORAS|NOW|VANDAAG|UUR/g)>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().search(/YESTERDAY|AYER|GISTEREN/)>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().search(/DAYS|DIAS|DAGEN|DAY|DIA|DAG/)>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().search(/WEEKS|SEMANAS|WEKEN|WEEK|SEMANA/)>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().search(/MONTH|MESES|MAANDEN|MAAD|MES|MONTHS/)>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().search(/YEAR|AÑOS|JAAR|AÑO|YEARS/)>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y año
  var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;} // dd<10?'0'+dd:dd;
  if (mm<10){mm ='0'+ mm;} //mm<10?'0'+mm:mm;  
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}

//-------------------------------------------------CLOSING DATE IN DESCRIPTION----------------------------------------------------
if(div.querySelector('.job_description').textContent.indexOf('Closing Date:') > -1){
  var get_date_closed = div.querySelector('.job_description').textContent.split(':').pop().trim();
  get_date_closed = get_date_closed.replace(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/gi,'').trim();
  get_date_closed = get_date_closed.replaceAll("/"," ").replaceAll("Please","").replace(/\n|\n#|\t|\tx|#|x/gi,"");
  job.dateclosed_raw = getDateFormat(get_date_closed," ",0,1,2);
}
//-------------------------------------------------DESCRIPTION IN THE EXTRACT WITHOUT A FORMAT--------------------------------------
//scanid-- - > 187600
//Jobsite-- - > "https://www.manageengine.com/careers.html";
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("div.group.clear > h2");
  var jobs = [];
  for (var x in html_jobs) {
      if (typeof html_jobs[x] == "function") continue;
      if (typeof html_jobs[x] == "number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.textContent.trim();
      job.url = window.location.href;
      job.location = document.querySelector("li.comSubTreeAct").textContent.trim();
      var full_html = document.querySelector('div.container.sec-pTB.clearfix');
      job.html = full_html.innerHTML.trim();
      //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
      //job.html = removeTextAfter(job.html, 'Application Instructions', true);
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
  }
  for (var y in jobs) {
      if (typeof jobs[y] == "function") continue;
      if (typeof jobs[y] == "number") continue;
      var elem = jobs[y];
      var next = jobs[parseInt(y) + 1];
      msg("elem.title " + elem.title);
      elem.html = removeTextBefore(elem.html, elem.title, false);
      if (y < jobs.length - 1) {
          msg("next---> " + next.title);
          elem.html = removeTextAfter(elem.html, next.title, true);
          elem.html = removeTextAfter(elem.html, 'appreciated.', false);
      } 
      elem.html = cleanHTML(elem.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = elem.html;
      elem.jobdesc = tmp.textContent.trim();
      elem.jobdesc = cleanHTML(elem.jobdesc);
  }
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
//-------------------------------TEMPLATE BUTTON MORE AND SCROLL-------------------------------------------
(function() {
    var out = {};
    //var selectorscroll = 'BARRA DE DESPLAZAMIENTO para hacer scroll';
    var selectorjobs = 'div.job-listing.card.simple';     //selector de los jobs
    //msg(pass_it);
    if (!pass_it["jobs_lengths"]) out["pass_it"] = { "jobs_lengths": [] };
    else out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if (out["pass_it"]["jobs_lengths"].length > 3) {
        var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);
        if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2])
            out["has_next_page"] = false;
    }
    var next_page_selector = "button#btLoadMore";
    var clickable_elem = document.querySelector(next_page_selector);  
    if(clickable_elem)clickable_elem.click();        
    //window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)
    //document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight)
    out["wait"] = true;
    //out["pic"] = true;  
    out.waitFor = 'div.job-listing.card.simple';  
    out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);
    return out;
})();
//-------------------------------------------BUTTON MORE AND SCROLL (POTENTE)---------------------------------------------------
(function() {
  var out = {};
  var selectorscroll = 'BARRA DE DESPLAZAMIENTO para hacer scroll';
  var selectorjobs = 'SELECTOR QUE CONTIENE los jobs';
  msg(pass_it);
  if (!pass_it["jobs_lengths"]) out["pass_it"] = { "jobs_lengths": [] };
  else out["pass_it"] = pass_it;
  out["has_next_page"] = true;
  if (out["pass_it"]["jobs_lengths"].length > 3) {
      var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);
      if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2])
          out["has_next_page"] = false;
  }
  //var next_page_selector = "div.container.job-list-wrapper > div.paginator > button";
  //var clickable_elem = document.querySelector(next_page_selector);  
  //if(clickable_elem)clickable_elem.click();         
  //window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)
  document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight)
  out["wait"] = true;
  out["pic"] = true;
  //out["html"]   = true;
  out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);
  return out;
})();
//-----------------------------------------------------------BUTTON MORE NUEVO--------------------------------------------------------------------
(function() {
  var out = {};
  var next_page_selector = '#load-more-positions'; //selector to identify the next button
  //var last_page_selector = ""; //selector to identify the last page
  var clickable_elem = document.querySelector(next_page_selector);
  //var perpage_fijo = 12;
  var perpage_actual = document.querySelector("#load-more-positions").getAttribute("style");

  if(perpage_actual == "display: none;"){

    out["has_next_page"] = false;
  }else{
    clickable_elem.click();
    //msg("\x1b[45m loading jobs...");
    out["has_next_page"] = true; 
  }

  out["wait"] = true;
  return out;
})();

//--------------------------------JSON POR URL------------------------------------------------------------
(function() {
  var out = {};
  var jobs = [];  
  //  Selector pre is usually where the string of the json is
  var element = document.querySelector("pre").textContent;
  //  We parse the json so it can be worked
  var json = JSON.parse(element);
  //  Replace positionOfJobs for the path were are the jobs
  let json_jobs = json.content;
  let limit = json.positionLimit;


  for(var i = 0; i<json_jobs.length; i++) {
    var job = {};
    var elem = json_jobs[i];
    job.title = elem.name;
    job.location = elem.location.city+", "+elem.location.region+", "+elem.location.country;
    job.reqid = elem.id;
    job.url = "https://jobs.smartrecruiters.com/TessenderloGroup/"+elem.id;   
    job.dateposted_raw = new Date(elem.releasedDate);
    job.dateposted_raw = (job.dateposted_raw.getMonth()+1) +"/"+ job.dateposted_raw.getDate() +"/"+ job.dateposted_raw.getFullYear();
    //job.dateposted_raw = elem.positionOfDatePosted;
    //job.dateclosed_raw = elem.positionOfDateClosed;
    //job.source_jobtype = elem.positionOfJobtype;
    //job.source_salary = elem.positionOfSalary;         
    //job.source_empname = elem.positionOfEmpname;
    //job.logo = elem.positionOfLogo;
    //job.source_apply_email = elem.positionOfEmail;

    job.temp = "1";
    jobs.push(job);
  } 


  out["jobs"]= jobs;
  return out;
})();
//---------------------------------------CASO INLAND-------------------------------------------------------------------------------------------------------------------
//Before-extract
(function () {
  let out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      cont: 0,
      totalJobs: 0,
      newPage: true,
      jobs: []
    }
  }
  else {
    out["pass_it"] = pass_it;
  }


  if (out["pass_it"].newPage) {
    let container = Array.from(document.querySelectorAll("div[ng-repeat*='vacancy']")); // Main job container    // This will contain all the extracted jobs    
    let jobs = container.reduce((jobsArr, elem) => {
      let job = {};
      job.title = elem.querySelector("").textContent.trim();
      job.url = elem.querySelector("").href.trim();
      job.location = elem.querySelector("").textContent.trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();


      jobsArr.push(job);
      return jobsArr;
    },[]);
    out["pass_it"].jobs = jobs;
    out["pass_it"].totalJobs = jobs.length;
    container[out["pass_it"].cont].querySelector("a").click();
  }
  else {
    let container = Array.from(document.querySelectorAll("div[ng-repeat*='vacancy']")); // Main job container    
    container[out["pass_it"].cont].querySelector("a").click();
    msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
  }
  out.pic = true;
  out.waitFor = ".vacancy-description";
  return out;
})();
//extract
(function () {
  var out = {};
  var jobs = [];
  var selector = ".vacancy-description";
  out["pass_it"] = pass_it;
  var job = out["pass_it"].jobs[out["pass_it"].cont];
  var remove_selectors = ["a", "script", "style", "input", "button"];
  var full_html = document.querySelector(selector);
  if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
  if (typeof msg == "undefined") msg = console.log;
  if (full_html) {
    var detailsSel = full_html.textContent.trim();
    if (detailsSel.search(/ate?é? o dia/gi) > -1) {
      var preDate = detailsSel.split(/ate?é? o di?í?a/gi).pop().replace(/[^\d|\/]/g, "").split("/");
      job.dateposted_raw = preDate.slice(0, 2).reverse().join("/").trim() + "/" + preDate.pop().trim();
    }
    job.html = full_html.innerHTML.trim();
    job.url = window.location.href;
    job.reqid = job.url.split(/vacancyId=/i).pop().split("#").shift().trim();
    job.temp = 96;
    job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www.\S+|https?\S+|\(\d+\)/gi, "");
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);    
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
  }
  else {
    job.flag_active = 0;
  }
  document.querySelector("a#voltar-para-a-lista-de-vagas").click();
  jobs.push(job);
  out["jobs"] = jobs;
  out.wait = true;
  out.html = true;
  out.pic = true;
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
//Pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
    out["pass_it"].nextPage = false;
    out["pass_it"].cont += 1;
    out["has_next_page"] = true;
    msg("Another Job");
  } else {
    var next_page_selector = "a#pagina-next"; //selector to identify the next button      
    var last_page_selector = "a#pagina-next[disabled]"; //selector to identify the last page    
    var clickable_elem = document.querySelector(next_page_selector);
    //stop condition    
    if (document.querySelector(last_page_selector)) {
      //last page      msg("END OF PAGINATION");
      out["has_next_page"] = false;
      out["pass_it"].nextPage = false;
    } else {
      //go to next page      
      msg("Another page");
      out["pass_it"].cont = 0;
      out["pass_it"].totalJobs = 0;
      clickable_elem.click();
      out["has_next_page"] = true;
      out["pass_it"].nextPage = true;
    }
  }
  msg(out["pass_it"].cont);
  out.html = true;
  out.pic = true;
  out.wait = true;
  return out;
})();
//-----------------------------------------------------------------------INLAND SARA----------------------------------------------------------------------------------------------------
//before extract
(function() {
  let out = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "jobs_selector": "li.search-item", //selector to loop all jobs.
      //  "selector_click": "a.js-job-preview-modal", //selector for go to the description.
      //"selector_close_desc": "a.preview-close", //selector to click / close the description.
      "desc": "div.ajax-details", //selector for job data.
      "next_selector": '#newsSearchPager > a:nth-child(7):not([disabled="disabled"])', //selector for go to the next page.
      "cont": 0,
      "length_jobs": 0,
      "jobs": [],
      "end_page": false
    };
  } else {
    out["pass_it"] = pass_it;
  }    

  let html_jobs = [...document.querySelectorAll(out["pass_it"].jobs_selector)];	
  out["pass_it"].length_jobs = html_jobs.length-1;  
  let jobs = html_jobs.map(elem =>{
    return {
      title: elem.querySelector("p.search-desc > a").textContent.trim(),
      //url : elem.querySelector("").href.trim(),
      location : elem.querySelector("span.search-country").textContent.trim(),
      //dateposted_raw : elem.querySelector("").textContent.trim(),
      //logo : elem.querySelector("").getAttribute("src").trim(),
      //source_apply_email : elem.querySelector("").textContent.trim(),
      //source_empname : elem.querySelector("").textContent.trim(),
      //source_jobtype : elem.querySelector("").textContent.trim(),
      //source_salary : elem.querySelector("").textContent.trim(),
      temp : 1
    }
  })

  if(out["pass_it"].cont <= out["pass_it"].length_jobs){
    let elem = document.querySelectorAll(out["pass_it"].jobs_selector)[out["pass_it"].cont];
    if(!out["pass_it"].selector_click){          
      elem.click();
    }else {          
      elem.querySelector(out["pass_it"].selector_click).click();
      //document.querySelectorAll(out["pass_it"].selector_click)[out["pass_it"].cont].click(); 
    }      	        

  }
  out.wait = true;
  out.waitFor = out["pass_it"].desc;
  out["pass_it"].jobs = jobs;	
  return out;
})();    
//--------EXTRACT
(function() {
	let out = {};    
  	out["pass_it"] = pass_it;
  	out["pass_it"].prueba = "El valor de prueba desde extract";
  	let jobs = [];  	
  	//msg("cont:"+out["pass_it"].cont+" -- lmit:"+out["pass_it"].length_jobs);
  	if(out["pass_it"].cont <= out["pass_it"].length_jobs){      	
    	let job = out["pass_it"].jobs[out["pass_it"].cont];
      	job.url = window.location.href;
      	//job.source_jobtype = document.querySelector("");
    	if(document.querySelector(out["pass_it"].desc)){
            let remove_selectors = ["style", "script"];      // remove with selector
          
			let full_html = document.querySelector(out["pass_it"].desc);
            remove_selectors.forEach(e =>full_html.querySelectorAll(e).forEach(item=> item.remove()));
        	job.html = full_html.innerHTML.trim();
            //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
            //job.html = removeTextAfter(job.html, 'Application Instructions', true);
            job.html      = cleanHTML(job.html);
            let tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
          	jobs.push(job);
          	
          	//return to the job jobsite
          	if(document.querySelector(out["pass_it"].selector_closed_desc)){  //selector to close description
          		document.querySelector(out["pass_it"].selector_closed_desc).click();  //selector to close description
            }
          	//window.history.back()   		//go back
          	//window.location.href = "";    //job site URL
        }else{
        	msg("No Jobdata");
        }      	
    }else{ 
    	msg("Not have more jobs available");
        out["pass_it"].end_page = true;
      	//jobs.push({title:"ghost"});
      	jobs.push({url: window.location.href});
    }  	
  	  	
	out["jobs"]= jobs;
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
//----PAGINATION
(function() {
  var out = {};
  out["pass_it"] = pass_it;
  out["pass_it"].cont++;
  if(out["pass_it"].next_selector) var clickable_elem = document.querySelector(out["pass_it"].next_selector);

  if(out["pass_it"].end_page && clickable_elem){
    msg("Go to the next");
    clickable_elem.click();
    out["has_next_page"] = true;
    out["pass_it"].end_page = false;   //reinicialization
    out["pass_it"].cont = 0;      //start with the first job
    out.waitFor = out["pass_it"].jobs_selector;
    out.wait = true;
  }else{      	      	
    !out["pass_it"].end_page ? out["has_next_page"] = true : out["has_next_page"] = false;
  }
  return out;
})(); 

//------------------------------------------------------------------OTRO INLAND-----------------------------------------------------------------------------------------------
//----------Beforeeeee  Extract----------------------------------------------------------------------------------------------------------------------------------------
(function() {​
    var out = {​}​;
    var selector_jobs = "li.job";
    var selector_desc = ".job-description";
    //var selector_click_Job = "a";
    if (typeof pass_it == "undefined")
        pass_it = {​}​;
    if (!pass_it["cont"]) {​
        out["pass_it"] = {​
            "cont": 0,
            "salir": false,
            "selector_jobs": selector_jobs,
            //  "selector_click_Job": selector_click_Job,          
            "selector_desc": selector_desc
        }​;
    }​ else {​
        out["pass_it"] = pass_it;
    }​
    msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length);
    var elemento = out["pass_it"]["selector_jobs"];
    var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]];
    if (elem) {​
        var title = elem.querySelector("").textContent.trim();
        //var url = elem.querySelector("").href.trim();
        var location = elem.querySelector("").textContent.trim();
        /*var fecha = elem.querySelector("").textContent.trim().split("/");
        var dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
        //var dateposted_raw = elem.querySelector("").textContent.trim();
        //var dateclosed_raw = elem.querySelector("").textContent.trim();       
        //var logo = elem.querySelector("").getAttribute("src").trim();
        //var source_apply_email = elem.querySelector("").textContent.trim();
        //var source_empname = elem.querySelector("").textContent.trim();
        //var source_jobtype = elem.querySelector("").textContent.trim();
        //var source_salary = elem.querySelector("").textContent.trim();
        out["pass_it"]["title"] = title;
        out["pass_it"]["location"] = location;
        //out["pass_it"]["url"] = url;
        //out["pass_it"]["dateposted_raw"] = dateposted_raw;
        //out["pass_it"]["dateclosed_raw"] = dateclosed_raw;
        //out["pass_it"]["logo"] = logo;
        //out["pass_it"]["source_apply_email"] = source_apply_email;  
        //out["pass_it"]["source_empname"] = source_empname; 
        //out["pass_it"]["source_jobtype"] = source_jobtype;
        //out["pass_it"]["source_salary"] = source_salary;   
        if (typeof(selector_click_Job) == 'undefined') {​
            elem.click();
            out.waitFor = out["pass_it"]["selector_desc"];
        }​ else {​
            elem.querySelector(selector_click_Job).click();
            out.waitFor = out["pass_it"]["selector_desc"];
        }​
    }​ else {​
        msg("EN EL FALSE DE BEFORE");
        msg(elemento);
        msg(elem);
        out["pass_it"]["salir"] = true;
    }​
    return out;
}​)();
//----------Extract-------------------
(function() {​
    var out = {​}​;
    var jobs = [];
    out["pass_it"] = pass_it;
    if (out["pass_it"]["salir"]) {​
        var job = {​}​;
        job.title = 'holaa';
        jobs.push(job);
    }​ else {​
        // msg(out["pass_it"]["selector"]);
        if (document.querySelector(out["pass_it"]["selector_desc"])) {​
            var job = {​}​;
            var remove_selectors = ["a", "script", "style"];
            job.title = out["pass_it"]["title"];
            job.location = out["pass_it"]["location"];
            //job.url = out["pass_it"]["url"];
            //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
            //job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];    
            //job.logo = out["pass_it"]["logo"];
            //job.source_apply_email = out["pass_it"]["source_apply_email"];
            //job.source_empname = out["pass_it"]["source_empname"];
            //job.source_jobtype = out["pass_it"]["source_jobtype"];
            //job.source_salary = out["pass_it"]["source_salary"];
            var full_html = document.querySelector(out["pass_it"]["selector_desc"]);
            // remove something from the jobdatata
            if (remove_selectors.length > 0) {​
                remove_selectors.forEach(remove_selector => {​
                    let salir
                    do {​
                        salir = false;
                        if (full_html.querySelector(remove_selector)) {​
                            full_html.querySelector(remove_selector).remove();
                            salir = true;
                        }​
                    }​ while (salir);
                }​);
            }​
            job.html = full_html.innerHTML.trim();
            job.jobdesc = full_html.textContent.trim();
            //job.html = removeTextBefore(job.html, "", false);
            //job.jobdesc = removeTextBefore(job.html, "", false);
            //job.html = removeTextAfter(job.html, "", true);
            //job.jobdesc = removeTextAfter(job.html, "", true);
            job.html = cleanHTML(job.html);
            job.jobdesc = cleanHTML(job.jobdesc);
            job.temp = 1;
            jobs.push(job);
        }​ else
            msg("en el else");
    }​
    //out["pic"] = true;
    out["jobs"] = jobs;
    return out;
}​)();
function removeTextBefore(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).pop();
        if (!flag) {​
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }​
    }​
    return newHtml;
}​
function removeTextAfter(html, text, flag) {​
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {​
        newHtml = newHtml.split(text).shift();
        if (!flag) {​
            newHtml = newHtml + "<p>" + text + "</p>";
        }​
    }​
    return newHtml;
}​

//-----------------------------------------------------------PAGINATION CON SELECTORES DE BOTON NUMEROS---------------------------------------------------------
(function () {
  var out = {};
  var jobs_number = 30; // número de jobs por página. Jobs amount per page
  var selector = "#pager_container > a";//Selector paginaciones

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1,
      "jobs": jobs_number
    };
  } else {
    out["pass_it"] = pass_it;
  }

  if (out["pass_it"]["jobs"] > 0) {
    out["pass_it"].cont += 1;
    var all_elems = document.querySelectorAll(selector);
    [].forEach.call(all_elems, function(elemento){
      if(elemento.textContent.trim() == out["pass_it"].cont){ 
        //msg("click!!!!!"+elemento.textContent.trim());
        elemento.click();
        out["has_next_page"] = true;
      }
    }); 
  } else {
    out["has_next_page"] = false;
  }

  out.waitFor = '';
  return out;
})();
//-------------------------------------------------------------URL-PAGINATION CON MENSAJES------------------------------------
(function () {
  var out = {};
  out.wait=2000;

  var url_base = "https://companies.naukri.com/act-jobs/jobs/?pageNo=";

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function(x){return x; };

  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 0,
          "jobs": 0
      };
  } else {
      out["pass_it"] = pass_it;
  }


var perpage_fijo = "15";
var perpage_actual = document.querySelectorAll("table.searchResults.full.table.table-striped.table-hover tbody tr.data-row").length;

msg("perpage_fijo: "+perpage_fijo);
msg("perpage_actual: "+perpage_actual);

if (perpage_actual >= perpage_fijo){
  var nuevaUrl = url_base+ out["pass_it"].cont;
  out["pass_it"].cont+=15;
  msg("\x1b[45m URL siguiente:\x1b[45m"+nuevaUrl);
  window.location.href = nuevaUrl;
  out["has_next_page"] = true; 
} else {
  msg('\x1b[41m NO HAY MAS PAGINA ');
  out["has_next_page"] = false;

}

 out["wait"] = true;
  return out;
})();
//-------------------------------------------PAGINATION SIN NEXT PAGE--------------------------------
(function () {
  var out = {};
  out.waitFor = "div.row > div.col-sm-6.vacancies-filter__col"; //COLOCAR SELECTOR POR EL CUAL ESPERAR

  var url_base = "https://www.pilgrimsuk.com/join-us/vacancies/page/".split('/page/')[0]+"/page/"; //COLOCAR URL

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function(x){return x; };

  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 2,
          "jobs": 0
      };
  } else {
      out["pass_it"] = pass_it;
  }


var perpage_fijo = 8; //CANTIDAD ELEMENTOS POR PAGINA (O cantidad de jobs que extrae de la página)
var perpage_actual = document.querySelectorAll("div.row > div.col-sm-6.vacancies-filter__col").length; //COLOCAR SELECTOR PARA EXTRAER JOBS
  

msg("perpage_fijo: "+perpage_fijo);
msg("perpage_actual: "+perpage_actual);


if (perpage_actual >= perpage_fijo){
  var nuevaUrl = url_base+ out["pass_it"].cont;
  out["pass_it"].cont++;	//NÚMERO QUE AUMENTA LA PAGINACIÓN CADA VEZ
  msg("\x1b[45m URL siguiente:\x1b[45m"+nuevaUrl);
  window.location.href = nuevaUrl;
  out["has_next_page"] = true; 
} else {
  msg('\x1b[41m NO HAY MAS PAGINA ');
  out["has_next_page"] = false;

}
 
  return out;
})();
//-------------------------------OTRO PAGINATION SIN NEXT PAGE------------------------------------------
(function() {
  var out = {};
var next_page_selector = document.querySelector("#gvwVagas > tbody > tr:last-child > td tr > td > span"); //selector to identify the next button 
  if(next_page_selector){
    next_page_selector = next_page_selector.parentNode.nextElementSibling;
  }//stop condition
  if (!next_page_selector) {
      //last page
  out["has_next_page"] = false;
} else {
    next_page_selector.querySelector("a").click();
      out["has_next_page"] = true;
  }

  out.wait = true;
  out.html = true;
  out.pic = true;
  return out;
})();
//-----------------------------------------------------OTRO PAGINATION SIN NEXT Y LAST ITEM NO DESAPARECE-------------------------------------------------------

(function () {
  var out = {};
  var selector = "div.site__rounded--large.cursor-pointer.h-40.w-40.flex.items-center.justify-center.mx-4.border-2"; // selector donde esta la paginacion

     if (typeof pass_it == "undefined") pass_it = {};

     if (!pass_it["cont"]) {
       out["pass_it"] = {
       "cont": 1
       };
     } else {
       out["pass_it"] = pass_it;
       }

     out["has_next_page"] = false;
     out["pass_it"].cont += 1;

     var all_elems = document.querySelectorAll(selector);
     [].forEach.call(all_elems, function(elemento){
     if(elemento.textContent.trim() == out["pass_it"].cont){
     //msg("click!!!!!"+elemento.textContent.trim());
       elemento.click();
       out["has_next_page"] = true;
       }
})();
//----------------------------OTRO PAGINATION SIN NEXT PAGE---------------------------------
(function () {
  var out = {};
  var selector = "div.site__rounded--large.cursor-pointer.h-40.w-40.flex.items-center.justify-center.mx-4.border-2  ";  // selector donde esta la paginacion

if (typeof pass_it == "undefined") pass_it = {};
  
if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1
      };
  } else {
      out["pass_it"] = pass_it;
  }

out["has_next_page"] = false;
out["pass_it"].cont += 1;
      
      var all_elems = document.querySelectorAll(selector);
      [].forEach.call(all_elems, function(elemento){
          if(elemento.textContent.trim() == out["pass_it"].cont){                
              //msg("click!!!!!"+elemento.textContent.trim());
              elemento.click();
              out["has_next_page"] = true;
          }
      });  

  out.waitFor = '';
  return out;
})();
//------------------------LIMPIAR TITULOS Y JEXTRAER OBTYPE-------------------------
if(job.title.match(/\d+%/g) != null){
  if(job.title.includes("100")){
    job.source_jobtype = "Full-time";
  }else{
    job.source_jobtype = "Partial-time";
  }
}
job.title = job.title.replace(/\d+%/g,"").replace(/\d+-/g,"");
 

//-------------------------------------RECORRER LOCACIONES Y RECORRER JOBS-----------------------------------------------------

//job site: https://ltcc.hiretouch.com/imagetrend-university-jobs-home/view-all-jobs/default.cfm?&start=1&per=100
(function() {
  var out = {};
  var jobs = [];
  document.querySelectorAll("li.title_subheader").forEach(li =>{
      let jobtype = li.querySelector("h2").textContent.trim();
      li.querySelectorAll("ul.jobs li.job.test").forEach(elem =>{
        //console.log("job:"+item.querySelector("a[title]").textContent.trim());
          var job = {};
          job.title = elem.querySelector("a[title]").textContent.trim();
          job.url = elem.querySelector("a[title]").href.trim();
          //job.location = elem.querySelector("").textContent.trim();
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //if(jobtype.includes("")){
              job.source_jobtype = jobtype;
          //}
          //job.source_salary = elem.querySelector("").textContent.trim();
          job.temp = 1;
          jobs.push(job);
   }) 
  })
  out["jobs"]= jobs;
  return out;
})();
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------DATE--------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------GERMAN-MONTH---------------------------------------------------------------------------
function dateMonthGerman(textMonth){
  var month = '';
  month = textMonth.replace("januari","January");
  month = textMonth.replace("februari","February");
  month = textMonth.replace("maart","March");
  month = textMonth.replace("april","April");
  month = textMonth.replace("mei","May");
  month = textMonth.replace("juni","June");
  month = textMonth.replace("juli","July");
  month = textMonth.replace("augustus","August");
  month = textMonth.replace("september","September");
  month = textMonth.replace("oktober","October");
  month = textMonth.replace("november","November");
  month = textMonth.replace("december","December");
  return month;
}
//-------------------------------------------------------------FRENCH-MONTH--------------------------------------------------------------------------
function dateMonthFrench(textMonth){
  var month = textMonth;
  if(textMonth.includes("janvier")){
    month = textMonth.replace("janvier","January").trim();
  }else   if(textMonth.includes("février")){
    month = textMonth.replace("février","February").trim();
  }else   if(textMonth.includes("mars")){
    month = textMonth.replace("mars","March").trim();
  }else   if(textMonth.includes("avril")){
    month = textMonth.replace("avril","April").trim();
  }else   if(textMonth.includes("mai")){
    month = textMonth.replace("mai","May").trim();
  }else   if(textMonth.includes("juin")){
    month = textMonth.replace("juin","June").trim();
  }else   if(textMonth.includes("juillet")){
    month = textMonth.replace("juillet","July").trim();
  }else   if(textMonth.includes("août")){
    month = textMonth.replace("août","August").trim();
  }else   if(textMonth.includes("septembre")){
    month = textMonth.replace("septembre","September").trim();
  }else   if(textMonth.includes("octobre")){
    month = textMonth.replace("octobre","October").trim();
  }else   if(textMonth.includes("novembre")){
    month = textMonth.replace("novembre","November").trim();
  }else   if(textMonth.includes("décembre")){
    month = textMonth.replace("décembre","December").trim();
  }
  return month;
}

//-----------------------------------------------------------JOBTYPE IN DESCSRIPTION----------------------------------------------------------------------
  if(job.html.toLowerCase().indexOf("cdi") > -1 ){job.source_jobtype = "CDI";}
  if(job.html.toLowerCase().indexOf("cdd") > -1 ){job.source_jobtype = "CDD";}
  if(job.html.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("parttime") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("fulltime") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}

  // --EN ALEMAN --
  if(job.html.toLowerCase().indexOf("cdi") > -1 ){job.source_jobtype = "CDI";}
  if(job.html.toLowerCase().indexOf("cdd") > -1 ){job.source_jobtype = "CDD";}
  if(job.html.toLowerCase().indexOf("vollzeit") > -1 ){job.source_jobtype = "Vollzeit";}
  if(job.html.toLowerCase().indexOf("teilzeit") > -1 ){job.source_jobtype = "Teilzeit";}  
  if(job.html.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("parttime") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("fulltime") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}


  //EN HOLANDÉS   bepaalde tijd

  if(job.html.toLowerCase().indexOf("bepaalde tijd") > -1 ){job.source_jobtype = "Bepaalde Tijd";}
  if(job.html.toLowerCase().indexOf("vollzeit") > -1 ){job.source_jobtype = "Vollzeit";}
  if(job.html.toLowerCase().indexOf("teilzeit") > -1 ){job.source_jobtype = "Teilzeit";}  
  if(job.html.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("parttime") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("fulltime") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}
  //  --EN FRANCES  --
  if(job.html.toLowerCase().indexOf("cdi") > -1 ){job.source_jobtype = "CDI";}
  if(job.html.toLowerCase().indexOf("cdd") > -1 ){job.source_jobtype = "CDD";}
  if(job.html.toLowerCase().indexOf("à temps plein") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("temps partiel") > -1 ){job.source_jobtype = "Partial time";}  
  if(job.html.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("parttime") > -1 ){job.source_jobtype = "Part time";}
  if(job.html.toLowerCase().indexOf("fulltime") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
  if(job.html.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}

  

  job.source_jobtype = contains(document.querySelectorAll('div.info'),'Contract Type:').textContent;
  job.source_jobtype =job.source_jobtype.replace('Contract Type:','').trim();

  //---------------------------------------------------------CAMBIAR VALOR DE SELECT-------------------------------------------------------------------
  var element = document.getElementById('id="mat-select-10"');//SELECTOR DEL SELECT
element.value = 100
var event = new Event('change');
element.dispatchEvent(event);

//----------------------------------------------------------------------JOBS PAGE CONSTRUCTOR --------------------------------------------------------------------
https://sjobs.brassring.com/TGnewUI/Search/Home/HomeWithPreLoad?partnerid=25405&siteid=5455&PageType=searchResults#keyWordSearch=&locationSearch=
//-------------------------------------------------------------------MATCH FECHAS EN INGLÉS-----------------------------------------------------------------------
/(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{4})/gi
/(\d{1,2})\s+(jan(?:uari)?|feb(?:ruari)?|ma(?:art)?|apr(?:il)?|may|jun(?:i)?|jul(?:i)?|aug(?:ustus)?|sep(?:tember)?|okt(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{4})/gi
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------PARENTESIS--------------------------------------------------------------
\(([^()]*con[^()]*)\)
//---------------------------------------------------------------------------LIMPIAR DESC-----------------------------------------------------------------------------
job.html = splitDescriptionRemovetor(job.html);

function splitDescriptionRemovetor(html, split_w=' '){
  var NewHtml = html;
  var expression1 =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex1 = new RegExp(expression1);
  var regex = new RegExp(expression);
  var t = html.split(split_w);
  for (const a of t){
    if (a.match(regex) || a.match(regex1)) {
      NewHtml=NewHtml.replace(a,'').trim();
    }  
  }  
  return NewHtml;  
}