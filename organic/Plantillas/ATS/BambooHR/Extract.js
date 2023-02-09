(function() {
	var out = {};
    var html_jobs = document.querySelectorAll("li.BambooHR-ATS-Jobs-Item");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("a").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = elem.querySelector("span").textContent.trim();
        job.reqid = job.url.split("id=").pop();
      
        var full_html = getDescription(job.url);
        var tmp = document.createElement("div");
        tmp.innerHTML = full_html; 
      	if(tmp.querySelector("ul.posInfoList > li:nth-child(3)> div.posInfo__Value") != null){
        	job.source_jobtype = tmp.querySelector("ul.posInfoList > li:nth-child(3)> div.posInfo__Value").textContent.trim();
        }
      	if(tmp.querySelector("ul.posInfoList > li:nth-child(4)> div.posInfo__Value") != null){
          	job.experience_required_min = tmp.querySelector("ul.posInfoList > li:nth-child(4)> div.posInfo__Value").textContent.trim();
        }
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		
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