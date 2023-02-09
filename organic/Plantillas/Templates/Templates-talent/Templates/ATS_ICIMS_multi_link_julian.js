

// ATS ICIMS Multi-link 

// Spider Config --------------------------------------------------------------------------------------------------//

{
    "options": {
        "inactivateJQuery": false,
        "ignoreLoadErrors": false,
        "waitForPageLoadEvent": false,
        "waitForResources": true
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
}


// Before Extract --------------------------------------------------------------------------------------------------//

  (function() {
  var out = {};
    out.iframeSelector = 'iframe[id="icims_content_iframe"]';
    out.iframeWaitFor = "div .iCIMS_JobsTable .row";
    return out;
})();

// Extract ---------------------------------------------------------------------------------------------------------//


(function() {
	var out = {};
	
  	if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    if (!pass_it["urls"]) {
        out["pass_it"] = {
          
            "jobs": 0,
            "urls": ["https://careers-bc.icims.com/jobs/search?ss=1", 
                     "https://drivercareers-bc.icims.com/jobs/search?ss=1"
                    ],
            "currentUrl": 0,
            "cont": 0,
            "total_jobs": 0
          
        };
    } else {
        out["pass_it"] = pass_it;
    }
  
    var iframe_selector = 'iframe#icims_content_iframe';
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div .iCIMS_JobsTable .row");
  	var jobs = [];
  
  	for (var x in html_jobs) {
    	if (typeof html_jobs[x] === "function") continue;
      	if (typeof html_jobs[x] === "number") continue;
    	var job = {};
    	var elem = html_jobs[x];
      
        var tracker = "&mode=job&iis=Neuvoo";
      
    	job.title    = elem.querySelector('.iCIMS_Anchor span:not(.field-label)').textContent.trim();
    	job.url      = elem.querySelector('.iCIMS_Anchor').href.trim() + tracker;
    	job.location = elem.querySelector('dl:nth-child(3) .iCIMS_JobHeaderData').textContent.trim();

      
        var datePosted     = elem.querySelector('div.col-xs-6.header.right span[title]').getAttribute("title").split(" ").shift().trim();
        job.dateposted_raw = getDateFormat(datePosted,'/',1,0,2);
      
      job.temp = "Aug-2020";
      
      var loc = job.location;
      var multilocation = "|";
      
          job.location = job.location.split("|").shift().trim();
          job.location = job.location.split("-").reverse().join(", ");
          job.location = job.location.replace(/\ , /g,", ");  

      if(loc.indexOf(multilocation)>-1){
        var aux = loc.split(multilocation);
          
          for(i in aux){ var jobx = {};
           
                  
           jobx.title    = elem.querySelector("div.col-xs-12.title a span:not(.field-label)").textContent.trim();
           jobx.url      = elem.querySelector("a.iCIMS_Anchor").href.trim() + tracker;
                     
           jobx.location = aux[i]; 
                        
             jobx.location = job.location.split("-").reverse().join(", ");
             jobx.location = job.location.replace(/\ , /g,", ");   
             jobx.dateposted_raw = job.dateposted_raw;      

            jobx.temp = job.temp;
     
            //if(job.title.length > 0 && job.location.length > 0){
              jobs.push(jobx);
            //}
             
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


  // Pagination ----------------------------------------------------------------------------------------------------------------//

  (function() {
    var out = {};
    out["pass_it"] = pass_it;
    var iframe_selector = "iframe#icims_content_iframe";  
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var next_page_selector= '.iCIMS_Paging > a[class="glyph "]:nth-child(4)';
  
  var clickable_elem = iframeDocument.querySelector(next_page_selector);
  
    if (clickable_elem) {
      clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        out["pass_it"]["currentUrl"] += 1;
        if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
          msg("NUEVO LINK");
            var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
            window.location.href = url;
            out["has_next_page"] = true;
        } else {
            out["has_next_page"] = false;
        }
    }
    //out["pass_it"]["jobs"] += per_page;
    return out;
  })();

  // Before Job Description -----------------------------------------------------------------------------------------------------//


  (function() {
  var out = {};
    out.iframeSelector = 'iframe[id="icims_content_iframe"]';
    out.iframeWaitFor = "div .iCIMS_JobsTable .row";
    return out;
})();

  // Description ---------------------------------------------------------------------------------------------------------------//

(function() {
    var out = {};
    //IFRAME
    var iframe_selector = 'iframe#icims_content_iframe';
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var job = {};
    var selector = "div.iCIMS_MainWrapper"; 
     
    job.html = $(selector, iframeDocument).html(); 
    if (typeof job.html === 'undefined') {
        job.html = "";
    }
    
    //job.source_jobtype = $(selector,myIframe).find("").text();
    
    job.html = $("<div>"+job.html+"</div>").find("div.alert, #jobSocialOptions, h2:contains(Need help)").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_JobOptions, div.jobOptionsMobile").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_PageFooter").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_Navigation").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_Logo").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_profilePicture").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("a,div.container-fluid.iCIMS_JobsTable,div.iCIMS_TopHeader").remove().end().html();
    job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_InfoMsg.iCIMS_InfoMsg_Connect").remove().end().html();
    
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
    
    //job.html = job.html.split("Options")[0];
    //job.html = job.html.split("Need help finding the right job?")[0];
    
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    
    job.html = cleanHTML(job.html);
    job.jobdesc = job.html;
    
    out["job"] = job;
    return out;
})();
    
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) 
        newHtml = newHtml.split(text).pop();
    if (!flag) 
        newHtml = "<h3>" + text + "</h3>" + newHtml;
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) 
        newHtml = newHtml.split(text).shift();
    if (!flag) 
        newHtml = newHtml + "<p>" + text + "</p>";    
    return newHtml;
}