(function() {
	var out = {};
    var iframe_selector = "iframe#HBIFRAME";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document; 
    var html_jobs = iframeDocument.querySelectorAll("ul.jobs");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("li > span > a").textContent.trim();
    	job.url = elem.querySelector("li > span > a").href.trim();
      	var reqid = job.url.split("jid=").pop().split("&");
      	job.reqid = reqid.shift();
  		var full_html = getDescription(job.url);
        var tmp = document.createElement("div");
        tmp.innerHTML = full_html;
		job.location = tmp.querySelector("span#ctl00_pageContent_ctl00_jobloc").textContent.trim();
      	//job.location = elem.querySelector("div#rightcol.col-xs-12.col-sm-6.col-md-8.rightcol > span.groupbyname").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
        
      
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
