
// Multilocation Case #1: All locations are contained within an unique location selector. 


//#1 validando el selector del multilocation
(function() {
  var out = {};

      var html_jobs = document.querySelectorAll('li.jobs-list-item');
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector('div.job-title').textContent.trim();
      job.url      = elem.querySelector('a[ph-tevent="job_click"]').href.trim();
        
        
   var loc_check = elem.querySelector("li.jobs-list-item p.job-info span.job-location") !== null;
        if(loc_check){
          job.location = elem.querySelector("li.jobs-list-item p.job-info span.job-location").innerHTML.split(">").pop().trim();
      }//else{
          //job.location = "MULTI-LOCATION";//elem.querySelector("div.job-multi-locations ul.au-target.show[ref='listItem']").innerHTML; //.split("</li>").join("|").replace(/\<.*?\>/g, '').trim();
     
    
        //}
      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experienced_required = elem.querySelector('').textContent.trim();

      job.source_empname  = elem.querySelector('span[class="au-target organisation"]').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
      
      
      //var datePosted     = elem.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted);

      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);

    
      job.temp  = "Jul-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);
        
      if(job.source_empname.search(/Trinity Health Senior Communities/i)>-1){job.title = "";}

      var multilocation_check = elem.querySelector("div.job-multi-locations ul.au-target.show[ref='listItem']") !== null;
      if(multilocation_check) {

              var locclean = elem.querySelector("div.job-multi-locations ul.au-target.show[ref='listItem']").innerHTML;

              var locs = locclean;

              locs = locs.split('</li>');
              for (l in locs) {

                var jobx = {};

                jobx.title    = job.title;
                jobx.url      = job.url;
                jobx.location = locs[l].replace(/\<.*?\>/g, '').trim();
                jobx.temp     = job.temp;
       
                if(jobx.location.length > 0){
                  jobs.push(jobx);
                }

            }
      
       }else{ 
        
        jobs.push(job);
        }
 
  }

  out["jobs"] = jobs;
  return out;
})();

  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();
         if(day < 10){day = "0" + day;} 
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
  }

///////////////////////////////////////////////////////////////////////////////////

//#2 
(function() {
  var out = {};


    var html_jobs = document.querySelectorAll(""); // Loop selector
    var jobs = [];
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      
      job.title    = elem.querySelector("").textContent.trim();
      job.url      = elem.querySelector("").href.trim();
      job.location = elem.querySelector("").textContent.trim();

      job.temp = "2020";


          var multilocation = job.location;
          var separator     = "|";

          job.location = job.location.split("|").shift().trim();

      if(multilocation.indexOf(separator) > -1){

          var locs       = multilocation; // String that contains locations
          var array_locs = locs.split(separator); //A new Array is created 
              
              for (l in array_locs) { // Loop 

                var jobx = {};

                jobx.title    = job.title;
                jobx.url      = job.url;
                jobx.location = locs[l]; 
                
                
                jobx.temp     = job.temp;
                
                if(jobx.location.length > 0){
                  jobs.push(jobx);
                }
                 
              }
      
      }else{
        
        jobs.push(job);
      }
 
  }

  out["jobs"] = jobs;
  return out;
})();

/*
 Multilocation Case #2: The first location is contain in the location tag but the rest of the locations are taken doing an AJAX Call. 


 tags con una locación, tags con multilocation: 1 locación + "x additional locations" que se encuentran las descripciones.

 tag con una locación --> jobs.push(job);
 tag con multilocation --> jobs.push(job); para la primera que aparece como String y jobs.push(jobx); para el arreglo de locaciones 
 que está en las descripciones. 


*/
// Ejemplo: Selecteds minds ATS
/*  https://tetratech.referrals.selectminds.com/jobs/search/2215341   */


(function() {
  var out = {};
   out["pic"] = true;

     /* // To extract from an iframe *
    var iframe_selector = "";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll(""); // Loop selector
  /* // The bottom line must be inactivated */
  
     var html_jobs = document.querySelectorAll("div#job_results_list_hldr").querySelectorAll("div[id^='job_list']");
    
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector('a.job_link').textContent.trim();
      job.url      = elem.querySelector('a.job_link').href.trim();
      job.location = elem.querySelector('span.location').textContent.trim();
        
        job.title = job.title.split("–").shift().trim();
      

        job.temp  = "June-2020";

        
        
        var multilocation = elem.querySelector('span.location').textContent.trim();
        job.location = job.location.split(" and ").shift().trim();
        
        jobs.push(job);
   
            if (multilocation.search(/additional/i) > -1) {

              var full_html = getDescription(job.url);
              var div = document.createElement("div");
              div.innerHTML = full_html
              var locclean = div.querySelector('div.additional_locations.jAdditionalLocations').innerHTML;

              var locs = locclean;

              locs = locs.split('</a>');
              for (l in locs) {

                var jobx = {};

                jobx.title    = job.title;
                jobx.url      = job.url;
                jobx.location = locs[l].replace(/\<.*?\>/g, '').trim();
                jobx.temp     = job.temp;
                
  

                if(jobx.location.length > 0){
                  jobs.push(jobx);
                }

            }
      
       }//else{ 
        
        //jobs.push(job);
        //}
 
  }

  out["jobs"] = jobs;
  return out;
})();

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


// Caso 3. Si a cada tag le corresponde una locación a excepción de los que dicen "Multiple Locacions" y todas se encuentran en 
// las descripciones. Por lo que hay que hacer llamado de AJAX. 


// Success-factor 

  // Multilocation success-factor
    
    var multilocation_button = elem.querySelector('span[aria-label^=" More"]') !== null;
    if(multilocation_button){
      
      var multilocation =  elem.querySelector('span[aria-label^=" More"]').getAttribute('onclick');
          multilocation = multilocation.split("[").pop().trim().split("]").shift().trim();
          multilocation = multilocation.replace(/\,/g,"/").replace(/\"/g,"").trim();
      
      multilocation = String(multilocation);
    
      console.log("Multilocation: " + multilocation);
    }
    
    // aria-label=" More
    

      if(multilocation_button) {

              var locclean = multilocation;

              var locs = locclean;

              locs = locs.split('/');
              for (l in locs) {

                var jobx = {};
                
                 if(typeof locs[l] == 'string'){

                jobx.title = job.title;
                jobx.url   = job.url;
                jobx.temp  = job.temp;
                
               jobx.location = locs[l].split(" - ").reverse().join(", ").trim();
               
      
               //console.log(typeof locs[l]);
                
                jobx.temp     = job.temp;

                    jobs.push(jobx);

        }
            }
      
       }else{ 
        
        jobs.push(job);
        }
 
  }

  out["jobs"] = jobs;
  return out;
})(); 

///////////////////////////////////////////////////////////////////

        var multilocation = job.location;
        job.location = job.location.split("/").shift().trim();
        
        jobs.push(job); // SI tiene al menos una locación y un enlace para adicionles. Ej.: "US, CA, More Locations..."
   
            if (multilocation.search(/additional/i) > -1) {

              //var full_html = getDescription(job.url);
              //var div = document.createElement("div");
              //div.innerHTML = full_html
              //var locclean = div.querySelector('div.additional_locations.jAdditionalLocations').innerHTML;

              //var locs = locclean;

              multilocation = multilocation.split('/');
              for (l in locs) {

                var jobx = {};

                jobx.title    = job.title;
                jobx.url      = job.url;
                jobx.location = multilocation[l]; //.replace(/\<.*?\>/g, '').trim();
                jobx.temp     = job.temp;
                
  

                if(jobx.location.length > 0){
                  jobs.push(jobx);
                }

            }
      
       }//else{ // Si tiene multilocation en un solo string "US/CA/FR" se descomenta el else y las líneas de abajo
        
        //jobs.push(job);
        //}
 
  }

  out["jobs"] = jobs;
  return out;
})();