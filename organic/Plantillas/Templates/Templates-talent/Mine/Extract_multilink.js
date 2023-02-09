//INFINITE PAGINATION - Saca las URL con un for, mientras se tengan los botones que redirigen a los links
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) { return x; };
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "cont": 0,
          	"jobsT":0,
            "currentUrl": 0,
            "urls": [],
            "url":'',
            "salir" : false,
            "SelectorDesc":''
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var areas = document.querySelectorAll('div[class*="department"] a'); //Selector de los links
    for (var x in areas) {
        if (typeof areas[x] == "function") continue;
        if (typeof areas[x] == "number") continue;
        var url = areas[x].href.trim();
      	out["pass_it"].urls.push(url);
    }
  	if(out["pass_it"]["urls"].length > 0) {
       out["pass_it"]["url"] = out["pass_it"]["urls"].shift();
  
    }
    return out;
})();

//BEFORE EXTRACT




//EXTRACT




//PAG





/*--------------------extract-------------------------*/
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) { return x; };
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "totalJobs": 0,
            "jobs": 0,
            "page": 1,
            "currentUrl": 0,
            "urls": [
                "http://www.hbc.monstermediaworks.ca/?search_BannerName=All&search_JobCategory=All&search_State=All&search_City=All&search_PayFrequencyBasis=All&search_keyword=&page=1",
                "http://www.hbc.monstermediaworks.ca/fr?search_BannerName=All&search_JobCategory=All&search_State=All&search_City=All&search_PayFrequencyBasis=All&search_keyword=&page=1"
            ]
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var html_jobs = document.querySelectorAll("div.job-panel");
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('a').textContent.trim();
        job.title = job.title.replace(/part time|full time|part-time|full-time|H\/F/gi, '').trim() //remove words and phrases
        job.title = job.title.replace(/\([^)]*\)/g, "").trim(); //remove thing in brackets ()
        //job.title = job.title.split(' - ')[0].trim();
        //job.title = job.title.replace(/[0-9]/g, "").trim() //remove numbers
        //job.title = job.title.replace(/[^\w\s]/gi, "").trim(); //remove especial characters
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('').textContent.trim();
        //job.dateposted_raw = elem.querySelector('').textContent.trim();
        //job.dateclosed_raw = elem.querySelector('').textContent.trim();        
        //job.source_apply_email = elem.querySelector('').textContent.trim();
        //job.source_jobtype = elem.querySelector('').textContent.trim();
        //job.source_salary = elem.querySelector('').textContent.trim();
        //job.source_empname = elem.querySelector('').textContent.trim();
        //job.logo = elem.querySelector('').getAttribute('src').trim();
        job.temp = 1;
        jobs.push(job);
    }
    out["pass_it"]["jobs"] = jobs.length;
    out["jobs"] = jobs;
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
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    return out;
})();