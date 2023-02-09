(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.oracletaleocwsv2-accordion-head");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div.oracletaleocwsv2-accordion-head-info > h4 > a").textContent.trim();
    	job.url = elem.querySelector("div.oracletaleocwsv2-accordion-head-info > h4 > a").href.trim();
    	job.location = "Welland, ON, CA";
      

        var full_html = getDescription(job.url);
        var tmp = document.createElement("div");
        tmp.innerHTML = full_html; 
      	if(tmp.querySelector("div.row >div.col-xs-12.col-sm-4.col-md-12:last-child") != null){
          job.dateclosed_raw = tmp.querySelector("div.row >div.col-xs-12.col-sm-4.col-md-12:last-child").textContent.replace("Close Date","").trim();
        }
        if(tmp.querySelector("div.row >div.col-xs-12.col-sm-4.col-md-12:first-child") != null){
          job.reqid = tmp.querySelector("div.row >div.col-xs-12.col-sm-4.col-md-12:first-child").textContent.replace("Req #","").trim();
        }
        if(tmp.querySelector("div.row >div.col-xs-12.col-sm-4.col-md-12:nth-child(2)") != null){
          job.source_jobtype = tmp.querySelector("div.row >div.col-xs-12.col-sm-4.col-md-12:nth-child(2)").textContent.replace("Req #","").replace("Job Classification","").trim();
        }
      	
        var selector = "div.col-xs-12.col-sm-12.col-md-8.row > div";
        //var job = pass_it["job"];
        var full_html = tmp.querySelector(selector);
        // remove something from the jobdatata
        for(const a of full_html.querySelectorAll("a, script, style")){
          if(a){a.remove();}
        }
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;

        job.html      = full_html.innerHTML.trim();    
        //job.html = removeTextBefore(job.html, 'Responsibilities include, but are not limited to:', false);
        job.html = removeTextBefore(job.html, 'Responsibilities include, but are not limited to:', false);
        job.html = removeTextBefore(job.html, 'Duties and Responsibilities:', false);
        //job.html = removeTextAfter(job.html, 'If selected for an interview', true);
        job.html = removeTextAfter(job.html, 'If selected for an interview', true);
        job.html = removeTextAfter(job.html, 'A Job Fact Sheet is available', true);
        job.html = removeTextAfter(job.html, 'Close Date:', true);
        job.html = removeTextAfter(job.html, 'Closing date:', true);
        job.html = removeTextAfter(job.html, 'The Position Description Form is available', true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
        if(!job.source_jobtype.includes("Faculty") && !job.source_jobtype.includes("Part Time")){
          job.temp = 1;
          jobs.push(job);
        }
  	} 
    
	out["jobs"]= jobs;
  	return out;
})();

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