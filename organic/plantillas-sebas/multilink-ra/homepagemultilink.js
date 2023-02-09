//-------------infinite pag.--------

(function() {
	var out = {}; 
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
  
     var multilink = document.querySelectorAll('div.container.container-pad > div > div > div > div >a'); //selector de las categorias de los trabajos
  	var urls = []
    for(var x in multilink){
    	if(typeof multilink[x] =="function") continue;
      	if(typeof multilink[x] =="number") continue;    	
    	var elem = multilink[x];
    	urls.push(elem.href.trim())    	
  	} 
  
  if (!pass_it["urls"]) {
    out["pass_it"] = {
      "currentUrl": 0,
      "urls": urls
    };
  } else {
    out["pass_it"] = pass_it;
  }  
  
  window.location.href = urls[0];
  //msg("Primera URL> : : ");
  //msg(urls[0]);
  return out;
})();

//---------------extract--------------

(function() {
    var out = {};
    var html_jobs = document.querySelectorAll(".panel-title");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a").textContent.trim();
      job.url = elem.querySelector("a").href.trim();
      job.location = "Gurgaon, India" 
      //job.reqid = job.url.split('job/').pop().split('/').shift();
      //job.dateposted_raw = elem.querySelector("span.job-postdate").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    } 
    out.pic = true 
    out["jobs"]= jobs;
    return out;
  })();

// ---------pagination------------

(function() {
    var out = {};
    out["pass_it"] = pass_it;
    if (typeof msg == "undefined") msg = function(x) { return x; };

    out["pass_it"]["currentUrl"] += 1;
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {      	
        var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
        window.location.href = url;
        msg("Next URL Category ///: "+url);
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }

    return out;
})(); 