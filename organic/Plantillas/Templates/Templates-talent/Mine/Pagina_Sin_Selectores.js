(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("p.MsoNormal+table > tbody > tr > td > h3:last-child");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.textContent.trim();
    	job.url = window.location.href;
      	job.location = "Auckland, NZ"
      	var tr =  elem.parentNode.parentNode;
    	var type = tr.nextElementSibling.querySelector("td:nth-child(2)").textContent.trim();
      	if (type.toLowerCase().search("full") > -1) {job.source_jobtype = "Full-time";}
      	if (type.toLowerCase().search("part") > -1) {job.source_jobtype = "Part-time";}

       	job.temp = "OCT-26-2020";

        var remove_selectors = [];
        var full_html = tr.nextElementSibling.nextElementSibling.querySelector("td:nth-child(2)");
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
      	job.html      = cleanHTML(job.html);
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);

        //OTRA FORMA DE SACAR LA DESCRIPCIÓN 
        //---------------------------------------------------------------------------
        /*
        var remove_selectors = [];
        //var job = pass_it["job"];
      	var info = [];
      	var h2 = elem.nextElementSibling;
      	//info.push(h2);
      	//for (var x = 0; x < 4; x++){
      	while (h2.tagName != "HR"){
          	h2 = h2.nextElementSibling;
          	if (h2.textContent.search('@')==-1){
             info.push(h2.innerHTML);
          	} 
        }
        var full_html = info.join("");
      
        // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
        job.html      = full_html;    
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);
        job.html      = cleanHTML(job.html);
      	var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc); 
        */
        //------------------------------------------------------------------------------
              
      	jobs.push(job);
          } 
  
	out["jobs"]= jobs;
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



