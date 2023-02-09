//E
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll('li.opening-job:not([class *= "js-more-container"])');
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h4.details-title").textContent.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
    	job.url = elem.querySelector("a").href.trim();
    	job.location = elem.parentElement.parentElement.querySelector('h3.opening-title').textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		job.source_jobtype = elem.querySelector("p.details-desc.job-desc span").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = "Jan-14-2021";
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();


//////////////////////////////////////////////////////////
//No P
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})(); 

///////////////////////////////////////////////////////////////
//P (Sroll y luego botones more)
(function(){
	var out = {};
	var event = new Event('scroll');  
	//msg(pass_it);
	if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
	else 					out["pass_it"] = pass_it;
	
	var next_page_selector = "a.link.details-desc.js-more"; //selector to identify the next button
	var clickable_elem = document.querySelector(next_page_selector);
	
	out["has_next_page"] = true;
  
	/*****///validación para detener el scroll ya si a la tercera vez no coincide nueva longitud
	if(out["pass_it"]["heights"].length > 3){
	   var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
		if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
		  if(clickable_elem){//Click Button more
			clickable_elem.click();
			out["has_next_page"] = true;
		  } 
		  else {
			out["has_next_page"] = false;
		  }
	}
	
  window.scrollBy(0, document.body.scrollHeight); ////// scrollBy es un metodo que desplaza un número especifico de pixeles
  window.dispatchEvent(event);
  /********************/ // horizontal en cero y vertical la altura del html
	
	//out["wait"] = true;
	out["pic"] 	= true;
	//out["html"] 	= true;
	
	out["pass_it"]["heights"].push(document.body.scrollHeight); ///añadiendo la altura del html obtenida al arreglo de pass_it
	msg(out["pass_it"]["heights"]);
	return out;
  })();

///////////////////////////////////////////////////////////////
//JD
(function() {
	var out = {};
	var job = {};
  	var selector = "div.job-sections";
 
	var full_html = $(selector);
  
  	// quitar selectores del jobdata
    full_html.find('a').remove().end().html();
    full_html.find('input').remove().end().html();
    full_html.find('div.alert').remove().end().html();

	var full_html = full_html.html();
  
  
		//job.location = $("span.job-detail").text().trim();
		// job.logo = $("").attr("src");
		// job.source_apply_email = $("").text().trim();
		// job.source_empname = $("").text().trim();
		//job.source_jobtype = $("").text().trim();
		// job.source_salary = $("").text().trim();
		// job.dateposted_raw = $("").text().trim();
		// job.dateclosed_raw = $("").text().trim();
  
	job.html 		= full_html.trim();

  
         job.html = removeTextBefore(job.html, "Job Description", false);
		job.html = removeTextAfter(job.html, "Additional Information", true);
  
	job.html 		= cleanHTML(job.html);
	job.jobdesc 	= job.html;
  
  
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










	(function() {
		var out = {};
	  out.pic = true;
		 var html_jobs = document.querySelectorAll('table.srJobList tr[class ^= "srJobListJob"]');
		  var jobs = [];for(var x in html_jobs){
			if(typeof html_jobs[x] =="function") continue;
			  if(typeof html_jobs[x] =="number") continue;
			var job = {};
			var elem = html_jobs[x];
			job.title = elem.querySelector("td.srJobListJobTitle").textContent.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
			job.url = elem.getAttribute("onclick").split('("').pop().split('")').shift().trim();
			job.location = elem.querySelector("td.srJobListLocation").textContent.trim();
			//job.dateposted_raw = elem.querySelector("").textContent.trim();
			//job.logo = elem.querySelector("").getAttribute("src").trim();
			//job.source_apply_email = elem.querySelector("").textContent.trim();
			//job.source_empname = elem.querySelector("").textContent.trim();
			job.source_jobtype = elem.querySelector("td.srJobListTypeOfEmployment").textContent.trim();
			//job.source_salary = elem.querySelector("").textContent.trim();
			   job.temp = "Ene-14-2021";
			jobs.push(job);
		  } 
	  
		out["jobs"]= jobs;
		  return out;
	})();