

// Taleo 
/*
URLS de ejemplo:
https://acetalent.taleo.net/careersection/cica_external/jobsearch.ftl#
https://onsemi.taleo.net/careersection/on_ex/moresearch.ftl?lang=en&searchExpanded=false

*/

// EXTRACT con multilocation ---------------------------------------------------------------------//

(function() 
 {
  var out = {};
  var html_jobs = document.querySelectorAll('tbody tr[class="ftlcopy ftlrow"]');
  var jobs = [];for(var x in html_jobs)
  {
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    var company_name = window.location.hostname.split(".").shift().trim();

    job.title    = elem.querySelector("span.titlelink").textContent.trim();
  
        var check = elem.querySelector('span[id*="reqContestNumberValue"]') !== null;
        if(check){
        var id = elem.querySelector('span[id*="reqContestNumberValue"]').textContent.trim();
        }else{
        var id = elem.querySelector('div.iconcontentpanel').getAttribute('id').trim();
        }
    
    job.url      = 'https://'+ company_name + '.taleo.net/careersection/jobdetail.ftl?job=' +id+ '&lang=en';
    job.location = elem.querySelector("div.morelocation").textContent.trim();
    
    job.temp = "Aug-2020";

    var date = elem.querySelector('span[id*="reqPostingDate."]').innerText;
    job.dateposted_raw = getDateFormat(date," ",1,0,2);
    
    
    job.location = job.location.replace("Virtual/Home Office","");
    
    var multilocation = job.location;
    job.location = job.location.split(",").shift().trim();
    job.location = job.location.split(/more/i).shift().trim();
    job.location = job.location.split("-").reverse().join(", ");
    
    
    
    if(job.location.indexOf(",")>-1){
    
      let commas = job.location.match(/\,/g).length;
      if(commas > 2 || commas == 2){
      
                  //Location array "city, state, country"

          let city    = job.location.split(",")[0].split(/more/i).shift().trim();
          let state   = job.location.split(",")[1].trim();
          let country = job.location.split(",")[2].trim();
         
          let loc = "";
          let array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(city != country) array_loc.push(country);
       

          if(array_loc.length) loc = array_loc.join(", ");

        job.location = loc;
      
      }
    
    }
            if(job.location.indexOf(",")>-1){
        
        let countr = job.location.split(",").pop().trim();
        let cit = job.location.split(",")[1].trim();
        if(countr == cit){

          let deleteFromJobLocation = job.location.split(",").pop().trim();
              job.location = job.location.replace(deleteFromJobLocation,"").trim();

          let lastCharLoc = job.location.substr(job.location.length -1);
           if(lastCharLoc === ","){job.location = job.location.slice(0,-1);}

        
        }
        
        }
job.location = job.location.replace(", , ",", ").trim();
    if (multilocation.indexOf(",") > -1) {
      var locs = multilocation;
      locs = locs.split(',');
      for (l in locs) {
        var jobx = {};
        
        jobx.title          = job.title;
        jobx.url            = job.url;
        jobx.location       = locs[l].trim().split("-").reverse().join(", ");
        jobx.dateposted_raw = job.dateposted_raw;
        jobx.temp           = job.temp;
        
        
 
         if(jobx.location.indexOf(",")>-1){
    
            var commas = jobx.location.match(/\,/g).length;
            if(commas > 2 || commas == 2){

                        //Location array "city, state, country"

                let city    = jobx.location.split(",")[0].split(/more/i).shift().trim();
                let state   = jobx.location.split(",")[1].trim();
                let country = jobx.location.split(",")[2].trim();

                let loc = "";
                let array_loc = Array();

                if(city) array_loc.push(city);
                if(state) array_loc.push(state);
                if(city !== country) array_loc.push(country);


                if(array_loc.length) loc = array_loc.join(", ");

              jobx.location = loc;
          }
       }
    
        if(jobx.location.indexOf(",")>-1){
        
        var countr = jobx.location.split(",").pop().trim();
        var cit = jobx.location.split(",")[1].trim();
        if(countr == cit){

          let deleteFromJobLocation = jobx.location.split(", ").pop().trim();
              jobx.location = jobx.location.replace(deleteFromJobLocation,"").trim();

          let lastCharLoc = jobx.location.substr(jobx.location.length -1);
           if(lastCharLoc === ","){jobx.location = jobx.location.slice(0,-1);}

        
        }
        
        }
        jobx.location = jobx.location.replace(", , ",", ").trim();
        
        if (jobx.location.length > 3) {
          jobs.push(jobx);
        }
      }
    } else {
      //job.location = job.location;
      if(job.location.length > 3){
      jobs.push(job);
      }
    }

  } 
  out["pic"] = true;
  out["jobs"]= jobs;
  return out;
})();

  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();
         if(day < 10 && day.length < 2){day = "0" + day;} 
    
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


// PAGINATION -------------------------------------------------------------------------------//

(function() {
    var out = {};
  var next_page_selector = 'a[title="Go to the next page"]'; // Selector del next 
  //var last_page_selector = ''; //Selector de la última página
  
    var clickable_elem = document.querySelector(next_page_selector);
  
  
  var current_number_of_jobs = Number(document.querySelector("div.pagerpanel span.pagersectionpanel").innerText.split('out').shift().split(/page/i).pop().trim());
  var total_number_of_jobs   = Number(document.querySelector("div.pagerpanel span.pagersectionpanel").innerText.split(/out/i).pop().replace(/[a-z]/gi,"").trim());
   
    
  
  console.log(current_number_of_jobs);
  console.log(total_number_of_jobs);
  
    //stop condition
    if (current_number_of_jobs == total_number_of_jobs) {
    out["has_next_page"] = false;
    } else {
        clickable_elem.click();
      out["has_next_page"] = true;
    }

    out.waitFor = 'a[title="Go to the next page"]';
    return out;
})();




