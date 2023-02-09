(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.opportunity");
    var jobs = [];
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job  = {};
      var elem = html_jobs[x];
  
      job.title    = elem.querySelector("a").textContent.trim();
      if(job.title.indexOf("-")>-1){
        job.title = job.title.split("-").shift();
      }
      job.url      = elem.querySelector("a").href.trim();
      job.reqid = job.url.split("Id=").pop().split("-").shift().trim();
      job.source_location = elem.querySelector("address > span:nth-child(5) > span").textContent.trim();
      job.location = job.source_location;
      if(job.location.indexOf(",")>-1){
        var numberOfCommas = job.location.match(/\,/g).length;
        if(numberOfCommas === 2){
          var city    = job.location.split(",").shift().trim();
          var state   = job.location.split(",")[1].replace(/[0-9]/g,"").trim();
          var country = job.location.split(",")[2].trim().replace("USA","US");
          var loc = "";
          var array_loc = Array();
          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(country) array_loc.push(country);
          if(array_loc.length) loc = array_loc.join(", ");
          job.location = loc;
        }
      }
  
      job.source_jobtype = elem.querySelector("span[data-automation=job-hours]").textContent.trim();
      /*----------DATE-POSTED-----------------------------*/
      var datum = elem.querySelector("div.col-lg-4.col-md-5.col-sm-6.col-xs-6.text-right").textContent.trim();
      datum = datum.trim().replace(/\,/g,"").trim();
      var cut = " ";
      var day   =  datum.split(cut)[1];
      var month =  datum.split(cut)[0];
      var year  =  datum.split(cut)[2];
  
      if(month.toLowerCase().indexOf("jan")>-1){month = "1";}
      if(month.toLowerCase().indexOf("feb")>-1){month = "2";}
      if(month.toLowerCase().indexOf("mar")>-1){month = "3";}
      if(month.toLowerCase().indexOf("apr")>-1){month = "4";}
      if(month.toLowerCase().indexOf("may")>-1){month = "5";}
      if(month.toLowerCase().indexOf("jun")>-1){month = "6";}
      if(month.toLowerCase().indexOf("jul")>-1){month = "7";}
      if(month.toLowerCase().indexOf("aug")>-1){month = "8";}
      if(month.toLowerCase().indexOf("sep")>-1){month = "9";}
      if(month.toLowerCase().indexOf("oct")>-1){month = "10";}
      if(month.toLowerCase().indexOf("nov")>-1){month = "11";}
      if(month.toLowerCase().indexOf("dec")>-1){month = "12";}
  
      job.dateposted_raw  = month +"/"+  day +"/"+ year;
      /*-------------------------------------------------*/
      job.dateposted_raw = job.dateposted_raw.replace("/1/", "/01/");
      job.dateposted_raw = job.dateposted_raw.replace("/2/", "/02/");
      job.dateposted_raw = job.dateposted_raw.replace("/3/", "/03/");
      job.dateposted_raw = job.dateposted_raw.replace("/4/", "/04/");
      job.dateposted_raw = job.dateposted_raw.replace("/5/", "/05/");
      job.dateposted_raw = job.dateposted_raw.replace("/6/", "/06/");
      job.dateposted_raw = job.dateposted_raw.replace("/7/", "/07/");
      job.dateposted_raw = job.dateposted_raw.replace("/8/", "/08/");
      job.dateposted_raw = job.dateposted_raw.replace("/9/", "/09/");
  
      job.dateposted_raw = "0"+job.dateposted_raw;
  
      job.dateposted_raw = job.dateposted_raw.replace("010/", "10/");
      job.dateposted_raw = job.dateposted_raw.replace("011/", "11/");
      job.dateposted_raw = job.dateposted_raw.replace("012/", "12/");
  
      job.temp = 329;
  
  
      if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
        jobs.push(job);
      }
  
  
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  