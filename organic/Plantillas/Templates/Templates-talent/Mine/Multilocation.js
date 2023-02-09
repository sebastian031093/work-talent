// MULTILOCATION CON AJAX DESDE EXTRACT (SACA LA DESCRIPCIÓN DESDE EXTRACT)
(function() {
	var out = {};
    var html_jobs = document.querySelectorAll("a.card.card.post-card");
  	var jobs = [];
  	for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
      
    	job.title = elem.querySelector("a.card.card.post-card > h3").textContent.trim();
    	job.url = html_jobs[x].href.trim();


        var full_html = getDescription(job.url);
        var div       = document.createElement("div");
        div.innerHTML = full_html
        var desc = div.querySelector("ul.p-0.job_detail-list.job_detail-list");
        
        job.location = desc.innerHTML;
      

        job.location = job.location.replace(/\<\/li>/g,"|").replace(/\<.*?\>/g, '').trim();
      
          job.title = job.title.trim();
      	  let lastCharTitle = job.title.substr(job.title.length -1);
          if(lastCharTitle === "|"){job.title = job.title.slice(0,-1).trim();}

      

        job.temp  = "Aug-2020";
        var multilocation = job.location;
        job.location = job.location.split("|").shift().trim();
   
            if (multilocation.indexOf("|") > -1) {
              
              multilocation = multilocation.split('|');
              for (l in multilocation) {

                var jobx = {};

                jobx.title    = job.title;
                jobx.url      = job.url;
                jobx.location = multilocation[l]; //.replace(/\<.*?\>/g, '').trim();
                jobx.temp     = job.temp;
                //jobx.source_empname = job.source_empname;
                
  

                if(jobx.location.length > 0){
                  jobs.push(jobx);
                }

            }
      
       }else{ 
        
        jobs.push(job);
        }
 
  }

  out["jobs"] = jobs;
  return out;

})();


function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MULTILOCATION MAS SIMPLE
(function() {
  var out = {};
  var iframe_selector = "#icims_content_iframe";
  var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
  var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable .row");
  var jobs = [];
  
  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    
    var job = {};
    var elem = html_jobs[x];
    var tracker = "&mode=job&iis=Neuvoo";

    job.title    = elem.querySelector("div.col-xs-12.title a span:not(.field-label)").textContent.trim().split("-").shift();
    job.url      = elem.querySelector("a.iCIMS_Anchor").href.trim() + tracker;
    job.temp  = "OCT-2020";
    
    job.location = elem.querySelector(".col-xs-6.header.left span:not(.field-label)").textContent.trim();
    job.location = job.location.split("-").reverse().join(", ");
    
    if(job.location.search("Central") > -1) {job.location = "IN, MO, KS, OK"};
    if(job.location.search("Southwest") > -1) {job.location = "CO, WA, AZ, NM, UT, OR"};
    
    var loc = job.location.split(", ");
    if (loc.length > 1) {
      //FORMA LARGA DE HACER EL FOR!!!!!
    	for (var y = 0; y < loc.length; y++) {
          var jobx = {};
          jobx.location = loc[y].trim();
          jobx.title = job.title;
          jobx.url   = job.url;
          jobx.temp = job.temp;
          jobs.push(jobx);
        }
        //FORMA CORTA DE HACER EL FOR!!!!!
        for (var y = 0; y < loc.length; y++) {
          var jobx = {};
          jobx = {...job};
          jobx.location = loc[y].trim();
          jobs.push(jobx);
        }
    }
    else {
    	jobs.push(job);
    }    
  } 
  
  //out.pic = true;
  out["jobs"]= jobs;
  return out;
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
