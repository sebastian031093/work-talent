//E
(function() {
	var out = {};
  out.pic = true;
     var html_jobs = document.querySelectorAll("ul#list li.position");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h2 a").textContent.trim();
    	job.url = elem.querySelector("h2 a").href.trim();
      	job.reqid = job.url.split("id=").pop().split("&").shift().trim();
      	job.dateposted_raw = elem.querySelector("span.PostedDateColour").textContent.trim().split(":").pop().trim();
		job.dateposted_raw = getDateFormat(job.dateposted_raw, " ", 0, 1, 2);
        job.temp = "NOV-09-2020";
      
    	job.location = elem.querySelector("span.LocationNameColour").textContent.trim().split(":").pop().trim().replace("Vetcare","");
      	if (job.location.toLowerCase().search("locations") > -1) {
        	var full_html = getDescription(job.url);
            var div       = document.createElement("div");
            div.innerHTML = full_html;
            var loc = div.querySelectorAll('#LocationStates option:not([value = ""])');
			if (loc.length > 1) {
            	for (var y = 0; y < loc.length; y++) {
                  var jobx = {};
                  jobx = {...job};
                  jobx.location = loc[y].innerHTML.trim();
                  jobs.push(jobx);
                }
            }
          	else {
            	job.location = loc[0].innerHTML;
              	jobs.push(job);
            }
        }
      	else {
        	jobs.push(job);
        }
        
      	//job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	
    	
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

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


//////////////////////////////////////////////////////////////////////////////////////////////
//No Pag
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

//////////////////////////////////////////////////////////////////////////////////////77
//JD
(function() {
    var out = {};
    var job = {};
    var selector = "div.LongDescription";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
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