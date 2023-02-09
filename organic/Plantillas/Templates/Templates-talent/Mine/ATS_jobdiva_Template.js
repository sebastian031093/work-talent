//E

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("#root > div > div > div.container.d-block.d-sm-block.d-md-none.d-lg-none.d-xl-none > div > div:nth-child(2) > div.col-md-12.col-xs-12.job-sec > div > div.col-md-12.white-bkg.p-t-20.p-l-20.p-r-20.p-b-20 > div > div > div > div.col-8.col-sm-8.col-md-8.col-lg-9.col-xl-10.clickable > div > div.col-12.col-sm-12.col-md-12.job-row-info-section > h4");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h4 > a").textContent.replace(/[0-9]/g, '').trim();
        job.title = job.title.replace("- ", " ").trim();
        aux = elem.querySelector("a");
         for(key in aux) {
         if(aux.hasOwnProperty(key)) {
          id = aux[key]["_currentElement"]["_owner"]["_currentElement"]["props"]["jobid"];                                
        //do something with value;
          }
         }
        var link = window.location.href.split('a=').pop().split('&').shift();
     	job.url =  "https://www2.jobdiva.com/portal/?a="+link+id+"#/jobs/"+id; 
        //job.url = elem.querySelector("a").href.trim();
    	job.location = elem.parentNode.parentNode.querySelector("div.row > div:last-child").innerHTML.split('">').pop().split('<').shift().trim();
        job.location = job.location.replace("n/a", "Plainsboro, NJ");
        job.location = job.location+", US";
        if(elem.parentNode.parentNode.querySelector(".col-12.col-sm-12.col-md-4.p-l-21.job-row-d.text-capitalize")) {
        	job.dateposted_raw = elem.parentNode.parentNode.querySelector(".col-12.col-sm-12.col-md-4.p-l-21.job-row-d.text-capitalize").textContent.trim();
        }
      	if(elem.parentNode.parentNode.querySelector("div.col-12.col-sm-12.col-md-4.job-row-d.job-row-d-xs")) {
        	job.reqid = elem.parentNode.parentNode.querySelector("div.col-12.col-sm-12.col-md-4.job-row-d.job-row-d-xs").textContent.trim();
        }
        //job.location = elem.querySelector("a").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
      
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       		job.temp = "2019";
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();


///////////////////////////////////////////////////////////////////////////////////////
//P

(function () {
    var out = {};
    var selector = "div.col-md-12.col-xs-12.pagination-section button";  // 1) selector donde esta la paginacion
  	var jobSelec = '#root > div > div > div.container.d-block.d-sm-block.d-md-none.d-lg-none.d-xl-none > div > div:nth-child(2) > div.col-md-12.col-xs-12.job-sec > div > div.col-md-12.white-bkg.p-t-20.p-l-20.p-r-20.p-b-20 > div > div > div > div.col-8.col-sm-8.col-md-8.col-lg-9.col-xl-10.clickable > div > div.col-12.col-sm-12.col-md-12.job-row-info-section > h4';  // 2) selector de los jobs

  if (typeof pass_it == "undefined") pass_it = {};
    
  if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;
  
  var targetPage = document.querySelector(jobSelec).textContent.length;
      	
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
          //msg(elemento.textContent.trim());
            if(elemento.textContent.trim() == out["pass_it"].cont){                
              	msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
              	out["has_next_page"] = true;
            }
        });  

   
    out.waitForFunction = {
  	"function": waitForPage.toString(),
    "args": [targetPage, jobSelec]
  };
  
    return out;
})();

function waitForPage (target, jobSelec) {
	var current = document.querySelector(jobSelec).textContent.length;
  msg(target != current);
  return target != current

}


/////////////////////////////////////////////////////////////////////////////////////////////
//Before JD

(function() {
    var out = {};
    out["pic"] = true;
    out.waitFor = "#root > div > div > div.container > div > div:nth-child(3)"
    return out;
    })();


    ///////////////////////////////////////////////////////////////////////////////////////
    //JD

    (function() {
        var out = {};
        var job = {};
          var selector = "#root > div > div > div.container > div > div:nth-child(3)";
          var remove_selector = "";
          //var job = pass_it["job"];
      
        var full_html = document.querySelector(selector);
          // remove something from the jobdatata
        if (remove_selector != "") full_html.querySelector(remove_selector).remove();
          if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
          if (typeof msg == "undefined") msg = function(x){return x};
    
      
        job.html 		= full_html.innerHTML.trim();
        if (job.html.length < 200) {job.flag_active = 0; job.html="";}
        job.jobdesc 	= full_html.textContent.trim();
        if (job.jobdesc.length < 200) {job.flag_active = 0; job.html="";}
      
       job.html = removeTextBefore(job.html, "Job Description", false);
       job.html = removeTextBefore(job.html, "Responsibilities:", false);
        //job.html = removeTextAfter(job.html, "Posted", true);
      job.html = job.html.split("::")[0];
      job.html = job.html.split("Thanks &")[0];
      job.html = job.html.split("Sign in")[0];
      job.html = job.html.split("Posted")[0];
       
      
        job.html 		= cleanHTML(job.html);
        job.jobdesc 	= cleanHTML(job.jobdesc);
      
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