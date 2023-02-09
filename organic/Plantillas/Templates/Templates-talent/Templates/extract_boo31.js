

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

      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experienced_required = elem.querySelector('').textContent.trim();

      //job.source_empname     = elem.querySelector('').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
      
      
      //var datePosted     = elem.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted);

      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);

    
      job.temp  = "Aug-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);
        
      //if(job.title.indexOf("")>-1){job.title = "";}
     
     // if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
     // }
    
    } 
  
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