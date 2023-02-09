
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
function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send(); 
  return response;
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
(function() {
    var out = {};
     var html_jobs = document.querySelectorAll("div.job-listing > table.table.table-striped.table-responsive > tbody > tr");
    var jobs = [];for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("td:nth-child(1)").textContent.trim();
        job.url = elem.querySelector("td:nth-child(1) > a").href.trim();
      //job.location = elem.querySelector("").textContent.trim();
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_empname = elem.querySelector("td:nth-child(3)").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
       //#################OBTENER LOCATION DEL JOBDATA###################
        var jobdata       = document.createElement('DIV');
        jobdata.innerHTML = getDescription(job.url);
        var selector = "";
        var full_html = jobdata.querySelector(selector);
        job.location = full_html.textContent.trim();
        //job.location = full_html.textContent.trim(); //jobdata.split('Job Location')[1].split('</li>')[0].replace(/(<([^>]+)>)/ig,'').trim();
          //job.dateposted_raw =cambiofecha(jobdata.split('Posted On')[1].split('</li>')[0].replace(/(<([^>]+)>)/ig,'').trim().replace('th','').replace(',','').replace(':',''),' ',0,1,2);
 
      job.temp = 1;
        jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send(); 
  return response;
}
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
   
              jobs.push(jobw); // Multi-location jobs
            }
        
        }else{
        
        jobs.push(job); // Single Location jobs

        }

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
var job_fantasma = {title:window.location.href};
jobs.push(job_fantasma);
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
//----------------MULTILINK PAGINATION---------------//
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
