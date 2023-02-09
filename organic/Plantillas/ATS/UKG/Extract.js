(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.opportunity");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div:nth-child(1)> div:nth-child(1) > h3 > a").textContent.trim();
    	job.url = elem.querySelector("div:nth-child(1)> div:nth-child(1) > h3 > a").href.trim();
      	job.dateposted_raw = new Date(elem.querySelector("div:nth-child(1) > div:nth-child(2) > h3 > small").textContent.trim());
      	job.dateposted_raw = (job.dateposted_raw.getMonth()+1) +"/"+ job.dateposted_raw.getDate() +"/"+ job.dateposted_raw.getFullYear();
    	job.location = elem.querySelector("div:nth-child(3)> div:nth-child(1)  > div > div > candidate-physical-location > address > span:nth-child(5) > span").textContent.trim().replace(/\d+/g,"").replace(" ,",",");
        job.reqid = elem.querySelector("div:nth-child(2) > div:nth-child(2) > span > span").textContent.trim();
        job.source_jobtype = elem.querySelector("div:nth-child(2) > div:nth-child(3) > span > span").textContent.trim();
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