//EXTRACT
(function() {
	var out = {};
  	var jobs = [];
    var html_jobs = document.querySelectorAll(".search-results > li");
  	
  
  for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var elem = html_jobs[x];
    
    var loc = elem.querySelector(".location").textContent.trim().split(";");
    loc.forEach( function (element){
    	var job = {};
    	
    	job.title = elem.querySelector(".posting-title > a").textContent.trim();
      	//job.title = job.title.split(":").shift().trim();
      	//job.title = job.title.split("-").shift().trim();
    	job.url = elem.querySelector(".posting-title > a").href.trim();
    	job.location = element.trim();
      	job.location = job.location.split(",").slice(1, 4).toString();
    	 /*var fecha = elem.querySelector("").textContent.trim().split("/");
        job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
      
      // DATE POSTED//
  		 var datum = elem.querySelector(".posting-date").textContent.replace(/,/gi,"").trim();
      
        	datum = datum.replace('January','01').replace('February','02').replace('March','03').replace('April','04').replace('May','05').replace('June','06');
            datum = datum.replace('July','07').replace('August','08').replace('September','09').replace('October','10').replace('November','11').replace('December','12');
           
    	   var day   =  datum.split(" ")[2];
           var month =  datum.split(" ")[1];
           var year  =  datum.split(" ")[3];
          
           job.dateposted_raw  = month +"/"+  day +"/"+ year;
      
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
	    //job.source_apply_email = elem.querySelector("").textContent.trim();
	    //job.source_empname = elem.querySelector("").textContent.trim();
	    //job.source_jobtype = elem.querySelector("").textContent.trim();
	    //job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
     }, elem);
  }  
  
	out["jobs"]= jobs;
  	return out;
})();

//////////////////////////////////////////////////////
//PAGINATION
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

///////////////////////////////////////////////////////
//JD

(function() {
    var out = {};
    var job = {};
    
    var selector = "div.job-posting-section";
   
    var full_html = $(selector);
    
      
      //---------INFO-------------------------------------
  
      var html_2 = $(selector).text(); 
  
      // job.location           = $("").text().trim();
      // job.source_jobtype     = $("li#resumator-job-employment[title=Type]").text().trim();
      // job.source_empname     = $("").text().trim();
      // job.logo               = $("").attr("src");
      // job.source_salary      = $("").text().trim();
      // job.dateclosed_raw     = $("").text().trim();
    
        /*----------DATE-POSTED-----------------------------
            
        var datum = $("").text().trim();
            datum = datum.trim();
  
            var cut = "";
            
        var day   =  datum.split(cut)[0];
        var month =  datum.split(cut)[1];
        var year  =  datum.split(cut)[2];
            
        job.dateposted_raw  = month +"/"+  day +"/"+ year;
  
        /*-------------------------------------------------*/
  
       /*
       if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
       job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
       */
    
   //---------REMOVE---------------------------------------
  
      full_html.find('a, u, i').remove().end().html();
      full_html.find('input, img, button').remove().end().html();
      full_html.find('div.alert, form').remove().end().html();
      full_html.find('style, script').remove().end().html();
  
      //full_html.find("h1").remove().end().html();
  
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
      //full_html.find("").remove().end().html();
  
   //----------------------------------------------------- 
    
    var full_html = full_html.html();
    
     job.html = full_html.trim();
   
    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);
  
    //job.html = job.html.split("How to Apply")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
    //job.html = job.html.split("")[0];
  
    //job.html = job.html.replace("","");
    //job.html = job.html.replace("","");
  
    //job.html = full_html.innerHTML.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  
    job.html    = cleanHTML(job.html);
    job.jobdesc = job.html;
    
    out["job"]  = job;
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