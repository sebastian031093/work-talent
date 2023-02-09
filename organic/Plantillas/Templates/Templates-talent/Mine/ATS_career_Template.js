//EXTRACT
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("tr.data-row.clickable");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("td.colTitle > span.jobTitle.hidden-phone > a").textContent.trim();
    	job.url = elem.querySelector("td.colTitle > span.jobTitle.hidden-phone > a").href.trim();
      	job.reqid = job.url.split("/")[5];
    	job.location = elem.querySelector("td.colLocation.hidden-phone> span.jobLocation").textContent.trim();
      	//job.location = "Auckland, NZ"
        job.dateposted_raw = elem.querySelector("td.colDate.hidden-phone > span.jobDate").textContent.trim();
      	job.dateposted_raw = getDateFormat(job.dateposted_raw, "-", 0, 1, 2);
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

  //PAGINATION (Si tiene)
  (function() {
    var out = {};
  var next_page_selector = "a.paginationItemLast"; //selector to identify the next button
  var last_page_selector = 'ul.pagination > li.active > a[title="Page 2"]'; //selector to identify the last page
   
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
    var selector = "div.job"; //div.buttontext.center.unmodified.backgroundimage.backgroundcolor5b64bcbe9e57edce.displayDTM  > div.inner
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    job.source_jobtype = document.querySelector('span[itemprop="customfield5"]').textContent.trim();
    
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextBefore(job.html, 'Our purpose at Vodafone is', false);
    job.html = removeTextAfter(job.html, 'Vodafone is committed to attracting', true); //
    job.html = removeTextAfter(job.html, '“We work together for the benefit of all”', true); 
    job.html      = cleanHTML(job.html);
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //OTRO TEMPLATE
  //BE
  (function() {
    var out = {};
      out.waitFor = "div.job > h2.title > a";
      return out;
  })();

  ////////////////////////////
  //E
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.job");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h2.title > a").textContent.trim();
      	job.reqid = elem.querySelector("h2.title > a").dataset.jobId;
    	job.url = "https://armstrongs.co.nz/careers/positions-available/?ja-job=" + job.reqid;
    	job.location = elem.querySelector("div.meta > ul > li:nth-child(3)").textContent.trim().replace("All ","");
        job.dateposted_raw = elem.querySelector("div.meta > p.date-posted").textContent.trim().split("/");
      	job.dateposted_raw = job.dateposted_raw[1] + "/" + job.dateposted_raw[0] + "/" + job.dateposted_raw[2];
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		job.source_jobtype = elem.querySelector("div.meta > ul > li:nth-child(4)").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = "OCT-27-2020";
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

  ////////////////////////////
  //P
  (function() {
  	var out = {};
	var next_page_selector = "a.next"; //selector to identify the next button
	//var last_page_selector = ""; //selector to identify the last page
 	
    var clickable_elem = document.querySelector(next_page_selector);
  
  	//stop condition
  	/*if (!document.querySelector(last_page_selector)) {
      	//last page
		out["has_next_page"] = false;
	} else */if(clickable_elem){
      	//go to next page
    	clickable_elem.click();
      	out["has_next_page"] = true;
    } else {
      	//try again
    	out["has_next_page"] = false;
    }

  	out.waitFor = "div.job > h2.title > a";
  	return out;
})();

  ////////////////////////////
  //BJD
  (function() {
    var out = {};
      out.waitFor = "div.ja-job-details"
      return out;
  })();

  ////////////////////////////
  //JD
  (function() {
    var out = {};
    var job = {};
    var selector = "div.ja-job-details";
    var remove_selectors = ["div.meta"];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.search('@')>-1 | a.textContent.search('http')>-1 | a.textContent.search('www')>-1){
         a.remove();
      } 
    }
    
    job.html      = full_html.innerHTML.trim(); 
    job.html      = cleanHTML(job.html);
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Back to search results', true);
    job.html = removeTextAfter(job.html, 'Apply', true);
    job.html = removeTextAfter(job.html, 'What are you waiting for?', true);
    job.html = removeTextAfter(job.html, 'Interested?', true);
    job.html = removeTextAfter(job.html, 'Click', true);
    job.html = removeTextAfter(job.html, 'Head to', true);
    job.html = removeTextAfter(job.html, 'Learn some more', true);
    job.html = removeTextAfter(job.html, 'Applications will be', true);
    job.html = removeTextAfter(job.html, 'To see more', true);
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

  