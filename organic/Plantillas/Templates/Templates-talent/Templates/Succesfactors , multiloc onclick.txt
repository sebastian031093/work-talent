//https://career5.successfactors.eu/career?company=AmadeusProd&career%5fns=job%5flisting%5fsummary&navBarLevel=JOB%5fSEARCH&_s.crb=FSaktukoKof9PRI9PAlxGkCgikqJhwEvZJDeioPeOow%3d
(function() {
	var out = {};
  	var jobs = [];
    var html_jobs = document.querySelectorAll("tr.jobResultItem");
  	
  
  for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var elem = html_jobs[x];
    
     var loc1 = elem.querySelector("div:nth-child(1) > span:nth-child(4)").getAttribute("onclick").split('["').pop().split('"]').shift().trim();
     var loc = loc1.split('","');
     loc.forEach( function (element){
    	var job = {};
    	
    	job.title = elem.querySelector("a.jobTitle").textContent.trim().split("&selected_lang=").shift();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = element.trim();
    	job.dateposted_raw = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(2)").textContent.trim().split(" on ").pop().trim();
            var separador = '/';
            var ano = job.dateposted_raw.split(separador)[2];
            var mes = job.dateposted_raw.split(separador)[1];
            var dia = job.dateposted_raw.split(separador)[0];
          
        job.dateposted_raw = mes+"/"+dia+"/"+ano; 
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		job.source_jobtype = elem.querySelector("div:nth-child(1) > span:nth-child(5)").textContent.trim();
        job.reqid =  elem.querySelector("div:nth-child(1) > span:nth-child(1)").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
     }, elem);
  }  
  
	out["jobs"]= jobs;
  	return out;
})();


/////////////////////

==================== Paginacion =======================

(function() {
    var out = {};
    //out["pic"] = true;
  var next_page_selector = "li.next > a"; //selector to identify the next button
  var last_page_selector = "li.last_disabled"; //selector to identify the last page
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

    out["wait"] = true;
    return out;
})();

/////////////////////////

(function() {
	var out = {};
	var job = {};
  	var selector = "div.joqReqDescription";
  	var remove_selectors = [];
  	//var job = pass_it["job"];
  
	var full_html = document.querySelector(selector);
  	// remove something from the jobdatata
	if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;

  
	job.html 		= full_html.innerHTML.trim().replace("Head of Global Accounts, Asia Regional Office","");
	job.jobdesc 	= full_html.textContent.trim();
 	job.html = removeTextBefore(job.html, "Position Summary:", false);
    job.html = removeTextBefore(job.html, "MISSION :", false);
  	job.html = removeTextBefore(job.html, "Mission:", false);
  	job.html = removeTextBefore(job.html, "Summary Description", false);
  	job.html = removeTextAfter(job.html, "**Please send a copy", true);
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

