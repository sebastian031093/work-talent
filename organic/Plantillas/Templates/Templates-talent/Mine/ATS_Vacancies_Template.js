//E 
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.list");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	var title = elem.querySelector("p > a.title").textContent.trim().split("-");//.shift();
      	if (title.length > 0) {
          job.title = title.shift();
          job.source_jobtype = title.pop();
        }
      	else {job.title = title}
    	job.url = elem.querySelector("p > a.title").href.trim();
    	job.location = elem.querySelector('span[title="New Zealand"]').textContent.trim() + ", NZ";
      	job.reqid = elem.querySelector('p.info > span:nth-child(2)').textContent.trim();
        job.dateclosed_raw = elem.querySelector("p.info > span:last-child > span").textContent.trim(); 
      	job.dateclosed_raw = getDateFormat(job.dateclosed_raw, " ", 0, 1, 2);
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = "OCT-26-2020";
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();
//ORGANIZAR FECHA
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
       
     let day   =  dateRaw.split(cut)[dayPosition], 
           month =  dateRaw.split(cut)[monthPosition], 
           year  = dateRaw.split(cut)[yearPosition];
  
       if(dateRaw.search(/[a-z]/gi)>-1){ 
         if(month.search(/jan/i)>-1){month = "01";}
         if(month.search(/feb/i)>-1){month = "02";}
         if(month.search(/mar/i)>-1){month = "03";}
         if(month.search(/apr/i)>-1){month = "04";}
         if(month.search(/may/i)>-1){month = "05";}
         if(month.search(/jun/i)>-1){month = "06";}
         if(month.search(/jul/i)>-1){month = "07";}
         if(month.search(/aug/i)>-1){month = "08";}
         if(month.search(/sep/i)>-1){month = "09";}
         if(month.search(/oct/i)>-1){month = "10";}
         if(month.search(/nov/i)>-1){month = "11";}
         if(month.search(/dec/i)>-1){month = "12";}
       }
  var datum = month +"/"+  day +"/"+ year;
  return datum;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
//P (No pagination)
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

///////////////////////////////////////////////////////////////////////////////////////////////////
//JD
(function() {
    var out = {};
    var job = {};
    var selector = "div.job_description";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    job.html      = cleanHTML(job.html);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'When applying for this role', true);
    job.html = removeTextAfter(job.html, 'Interested?', true);
    job.html = removeTextAfter(job.html, 'Interested please apply', true);
    
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
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