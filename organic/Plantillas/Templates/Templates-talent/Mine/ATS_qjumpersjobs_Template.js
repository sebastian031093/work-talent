//BE
(function() {
	var out = {};
  	out.waitFor = "a.dashboard-list-item > div.row > div > h4";
    return out;
})();

//E
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("a.dashboard-list-item");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div.row > div > h4").textContent.trim();
    	job.url = elem.href.trim();
      	job.reqid = job.url.split("-").pop();
      job.location = elem.querySelector("div.row > div > strong.black-txt.qjicon.location-icon").textContent.trim().replace(" City","").split(" - ").join(", ") + ", NZ";
      job.dateclosed_raw = elem.querySelector("div.text-right > strong").textContent.trim();
      job.dateclosed_raw = getDateFormat(job.dateclosed_raw, " ", 0, 1, 2);
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = "OCT-2020";
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();
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


//P (SIN PAGINACIÓN)
(function() {
  var out = {};  
  out["has_next_page"] = false;  
  out["wait"] = false;
  return out;
})();

//P (CON PAGINACIÓN)
(function() {
  var out = {};
  var total = document.querySelectorAll("ul.pagination > li").length;
var next_page_selector = 'ul.pagination > li:nth-child(' + (total - 1) + ') > a'; //selector to identify the next button
var last_page_selector = 'ul.pagination > li:nth-child(' + (total - 2) + ')[class = "active"]'; //selector to identify the last page
 
  var clickable_elem = document.querySelector(next_page_selector);

  //stop condition
  if (document.querySelector(last_page_selector)) {
      //last page
  out["has_next_page"] = false;
} else if(clickable_elem){
      //go to next page
    clickable_elem.click();
      out["has_next_page"] = true;
  } else {
      //try again
    out["has_next_page"] = true;
  }

  out.waitFor = "";
  return out;
})();

//JD
(function() {
  var out = {};
  var job = {};
  var selector = "div.job-detail--body";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;
  
  for (const a of full_html.querySelectorAll('p')) {
    if (a.textContent.search('@')>-1){
       a.remove();
    } 
  }
  
  job.html      = full_html.innerHTML.trim();    
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  job.html = removeTextAfter(job.html, 'APPLY FOR THIS JOB', true);
  job.html = removeTextAfter(job.html, 'If this sounds like', true);
  job.html = removeTextAfter(job.html, 'Is this you?', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  if (job.jobdesc.search('Full Time')>-1){job.source_jobtype = "Full Time";}
  if (job.jobdesc.search('Part Time')>-1){job.source_jobtype = "Part Time";}
  if (job.jobdesc.search('Application Closes')>-1){
    job.dateclosed_raw = job.jobdesc.split('Application Closes ').pop().split(" ",3).join(" ");
    job.dateclosed_raw = getDateFormat(job.dateclosed_raw, " ", 0, 1, 2);
  }//.join("/")}
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