//Infinity

(function() {
	var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

     var multilink = document.querySelectorAll('div.categories-block__item     a.link.link--dark'); //selector de las categorias de los trabajos
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

/**extract */
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("li.jobs-list-item");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("div.job-title").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    if (elem.querySelector("span.au-target.type")){
      job.source_jobtype = elem.querySelector("span.au-target.type").textContent.trim();
    }
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 1;
    jobs.push(job);
  }
  //out.pic = true
  out["jobs"]= jobs;
  return out;
})();


///paginacion simple
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
