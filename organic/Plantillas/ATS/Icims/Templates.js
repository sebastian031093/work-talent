(function() {
    var out = {};
    if (!pass_it["expected_jobs"]) {
        out["pass_it"] = {
            "expected_jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    //Asignacion de variables------------------------------------------------------------------
    var iframeDocument = document.querySelector('#icims_content_iframe').contentWindow.document
    var html_jobs = iframeDocument.querySelectorAll('.iCIMS_JobsTable > div.row');
    var jobs = [];
    //Asignacion de variables------------------------------------------------------------------


    //Ciclo for--------------------------------------------------------------------------------------------------------------
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector("div.title a").textContent.split('Job Title').pop().trim();
        job.url = elem.querySelector("div.title a").href.trim()+ "&mode=job&iis=Neuvoo";
		job.reqid = job.url.split('/jobs/').pop().split('/').shift().trim();
        //Selector de localizacion------------------------------------------------------------------------------------
        if (elem.querySelector("div.col-xs-6.header.left > span:nth-child(2)")) {
            job.location = elem.querySelector("div.col-xs-6.header.left > span:nth-child(2)").textContent;
            //job.location = job.location.replace('-',',');
            job.location = job.location.split("-").reverse().join(", ").trim();
        } else {
            job.location = "Hq de la empresa";
        } 
      
      if(elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)")){      		
        	let date = elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").getAttribute("title").trim();
            let d = new Date(date);          
            job.dateclosed_raw = (d.getMonth()+1) +"/"+ d.getDate() +"/"+ d.getFullYear();
      }
        //Selector de localizacion------------------------------------------------------------------------------------

        //Selector de dateposted------------------------------------------------------------------------------------
       
        //Selector de dateposted------------------------------------------------------------------------------------

        job.temp = 51123;
        jobs.push(job);
    }
    //Ciclo for-----------------------------------------------------------------------------------------------------------------

    out["pass_it"]["expected_jobs"] += jobs.length;
    out["jobs"] = jobs;
    return out;
})();


//PAGINACION

(function() {
    var out = {};
    var iframeDocument = document.querySelector('#icims_content_iframe').contentWindow.document    
    var clickable_elem = iframeDocument.querySelector('span[title="Next page of results"]');

	 if (clickable_elem) {
        //go to next page
        if(!clickable_elem.parentNode.getAttribute("class").includes('invisible') ){
          out["has_next_page"] = true;
          clickable_elem.parentNode.click(); 
        }else {
          out["has_next_page"] = false; 
        }
    }   

    out.iframeSelector = "#icims_content_iframe";
  	out.waitFor = ".iCIMS_JobsTable > div.row";
    return out;
})();


//DESCRIPTION


(function() {
  var out = {};
  var job = {};
  var selector = "div.iCIMS_JobContent";
  var remove_selector = "";
  //var job = pass_it["job"];

  var iframe_selector = "#icims_iframe_span > iframe";   
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;

  var full_html = iframeDocument.querySelector(selector);
  // remove something from the jobdatata 
  if (remove_selector != "") full_html.querySelector(remove_selector).remove();
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

if(iframeDocument.querySelectorAll("div.iCIMS_JobHeaderGroup > dl:nth-child(4) > dd").length > 0){  
job.source_salary = iframeDocument.querySelector("div.iCIMS_JobHeaderGroup > dl:nth-child(4) > dd").textContent.trim();  
}  
  
  job.html 		= full_html.innerHTML.trim();
  job.jobdesc 	= full_html.textContent.trim();

  job.html 		= cleanHTML(job.html);
  job.jobdesc 	= cleanHTML(job.jobdesc);

  job.html = removeTextBefore(job.html, "Overview", false);
  job.jobdesc = removeTextBefore(job.jobdesc, "Overview", false);
  job.html = removeTextAfter(job.html, "Options", true);
  job.jobdesc = removeTextAfter(job.jobdesc, "Options", true);
  job.html = removeTextAfter(job.html, "Catholic Community Services and Catholic Housing Services is an Equal Opportunity Employer", true);
  job.jobdesc = removeTextAfter(job.jobdesc, "Catholic Community Services and Catholic Housing Services is an Equal Opportunity Employer", true);

  out["job"] = job;
  return out;

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
})();