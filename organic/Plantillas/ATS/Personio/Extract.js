(function() {
	var out = {};
  	var iframe_selector = "iframe#personio-iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document; 
    var html_jobs = iframeDocument.querySelectorAll("section.job-category-wrapper.all-tab-category-wrapper > div");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("a > div:nth-child(1) > div:nth-child(1)").textContent.trim();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = elem.querySelector("a > div:nth-child(1) > div:nth-child(2) > span:nth-child(3)").textContent.trim();
        
      	job.reqid = job.url.split("/").pop().split("?language=").shift();
      	//job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		job.source_jobtype = elem.querySelector("a > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)").textContent.split(",").pop().trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();