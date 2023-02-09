//BE
(function() {
    var out = {};
    //out.waitFor = '';
    //out.html = true
    //out["pic"] = true;
    out["wait"] = 200;
    
    return out;
    })();
    


//E
(function() {
    var out = {};
  
        var html_jobs = document.querySelectorAll('div#job_results_list_hldr div.job_list_row');
        var jobs = [];
    
        for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        
        var job  = {};
        var elem = html_jobs[x];
  
        job.title    = elem.querySelector('a.job_link').textContent.trim();
        job.url      = elem.querySelector('a.job_link').href.trim();
        job.location = elem.querySelector('span.location').textContent.trim();
          
          job.temp  = "NOV-2020";
          
          if(job.location.search(/additional location/i)>-1){
          
          var full_html = getDescription(job.url);
          var div       = document.createElement("div");
          div.innerHTML = full_html
          var locs = div.querySelectorAll("div.additional_locations.jAdditionalLocations a"), w;
  
            for(w in locs){    
              if(typeof locs[w] =="function") continue;
              if(typeof locs[w] =="number") continue;
  
              var jobw = {};
              
              jobw.title    = job.title;
              jobw.location = locs[w].innerText.split(", ").reverse().join(", ");
              jobw.url      = job.url;
              
              jobs.push(jobw); // Multi-location jobs
  
            }
  
          }else{
           
           job.location = job.location.split(", ").reverse().join(", ");
              
          }  
            
  
          job.location = job.location.split(" and ").shift().trim();
          jobs.push(job); // Single location jobs
      
      } 
    
    out["jobs"]= jobs;
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
        


//P


(function () {
    var out  = {};
    out.wait = 200;
  
    var url_base           = "https://careers.intercontinentalexchange.com/jobs/search/1434787/page";
    var main_loop_selector = "div#job_results_list_hldr div.job_list_row";


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
  

  var perpage_fijo = 10;
  var perpage_actual = document.querySelectorAll(main_loop_selector).length;
    

    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
 if(perpage_actual < perpage_fijo){
    msg('\x1b[41m The pagination has finished \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
  //out.waitFor = "";
   //out["wait"] = true;
    return out;
})();



//JD

(function() {
    var out = {};
    var job = {};
    
      var selector  = 'div.job_description';
    
    // -------------------------- INFO ------------------------------------//
      
      job.reqid       = document.querySelector('dd.job_external_id span.field_value').textContent.trim();
      //job.source_jobtype = document.querySelector('').textContent.trim();
      
      let datePosted     = document.querySelector('dd.job_post_date span.field_value').textContent.trim();
      if(datePosted.search("20")>-1){
      job.dateposted_raw = getDateFormat(datePosted," ",1,0,2);
      }
      if(datePosted.search(/hours/i)>-1){
      
        var today   = new Date();
        var current_day   = today.getDate();
        var current_month = (today.getMonth()+1);
        var current_year  = today.getFullYear();
    
        job.dateposted_raw  = current_month +"/"+  current_day +"/"+ current_year;
      
      }
     //---------------------------------------------------------------------//
    
    var full_html = document.querySelector(selector); 
    var full_html_text = full_html.innerText;
    
    // To Remove selectors 
    for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
        if (a){
          a.remove();
        }
    }
    
    
      
    if(cleanHTML(full_html_text).trim().length < 200){
    
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
    
    }else{
      
      var desc = document.querySelector(selector);
      
            for (const a of desc.querySelectorAll('li')) {
          if (a.textContent.search(/Schedule/)>-1){
            job.source_jobtype = a.textContent.split(":").pop().trim();
          } 
        }
        
            for (const a of desc.querySelectorAll('li')) {
          if (a.textContent.search(/Schedule/)>-1){
              a.remove();
          } 
        }
       
       job.html = full_html.innerHTML.trim();
    
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
    
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
     
      job.html = job.html.replace("Responsibilities","<br>Responsibilities");
      //job.html = job.html.replace("","");
    
    job.html    = cleanHTML(job.html.trim());
    job.jobdesc = job.html;
    }
    
    out["job"] = job;
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
    
    function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
    let day   =  dateRaw.split(cut)[dayPosition],
        month =  dateRaw.split(cut)[monthPosition],
        year  = dateRaw.split(cut)[yearPosition];
    
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