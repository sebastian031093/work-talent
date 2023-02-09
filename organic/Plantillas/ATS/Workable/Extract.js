(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("li.job-item");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("p.job-title > a").textContent.trim();
    	job.url = elem.querySelector("p.job-title > a").href.trim();
    	job.location = elem.querySelector("p.job-location").textContent.replace("Location:","").trim();
      	job.reqid = job.url.split("/").pop();
          
      	let endpoint = "https://apply.workable.com/api/v2/accounts/digitalscientists/jobs/"+job.reqid;
      	var full_html = getDescription(endpoint);
      	let json = JSON.parse(full_html);
      	job.source_jobtype = json.type;
        if (job.source_jobtype.toLowerCase().indexOf("part") > -1) { job.source_jobtype = "Part time"; }
        if (job.source_jobtype.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
        if (job.source_jobtype.toLowerCase().indexOf("full") > -1) { job.source_jobtype = "Full time"; }
        if (job.source_jobtype.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }
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