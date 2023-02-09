//E
(function() {
    var out = {};
  
    var iframes = document.querySelector("iframe#icims_content_iframe"); //get Iframes page
    var iframeDocument = iframes.contentWindow.document; //now we have the iframe
    var html_jobs = iframeDocument.querySelectorAll("div.job-card");
  
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      var title = elem.querySelector("div.job-link a").textContent.trim();
      if (title.search("-") > -1) {
            job.title = title.split("-").shift().trim();
          job.location = title.split('-').pop().trim();
      }
      else {
          job.title = elem.querySelector("div.icims-ui-job-search-limitview").textContent.split("Hunter Engineering Company").shift().trim();
            job.location = elem.querySelector("div.job-link").textContent.split("Region Positions").shift().trim();
      }
      job.url = elem.querySelector("div.job-link a").href.trim();
      job.source_jobtype = elem.querySelector("div.additional-fields dd span span").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
  
      job.temp = "Nov-23";
  /*
      if(job.location.indexOf("|")>-1){
        var array = job.location.split("|");
        //msg(array);
        for (var i = 0; i < array.length; i++) {
          var jobx = {};
          jobx.title = job.title;
          jobx.url = job.url;
          //jobx.source_empname = job.source_empname
          jobx.dateposted_raw = job.dateposted_raw;
          //jobx.temp = job.temp
          jobx.location = array[i].trim();
          jobx.location = jobx.location.split("-").reverse().join(", ");
          jobs.push(jobx);
        }
      }else{
        job.location = job.location.split("-").reverse().join(", "); */
        jobs.push(job);
      //}
    } 
  
    out["jobs"]= jobs;
    return out;
  })();


  ///////////////////////////
  //P
  (function() {
    var out = {};
   
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 20,
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var textPaginador = iframeDocument.querySelector("div.icims-ui-pagination-location").textContent.trim();
  
    var max = textPaginador.split("/").pop().trim();
    var min = textPaginador.split("/").shift().split("To").pop().trim();
  
    if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
      msg(min + " - " + max);
      var nuevaUrl = "https://salesandservice-hunterengineering.icims.com/jobs/search?ics_offset=" + out["pass_it"].cont;
      out["pass_it"].cont = out["pass_it"].cont + 20;
      window.location.href = nuevaUrl;
      out["has_next_page"] = true;
    } else {
      //try again
      out["has_next_page"] = false;
    }
  
    //out["pic"] = true;
    //out.wait = 1;
    out.iframeSelector = iframe_selector;
    //out.iframeWaitFor = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > ul";
    return out;
  })();