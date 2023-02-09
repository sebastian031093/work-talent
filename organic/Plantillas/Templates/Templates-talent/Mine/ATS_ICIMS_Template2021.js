//JSON Y SIMPLE
////////////////////JSON/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Extract 
(function () {
    var out = {};   
    var jobs = [];  
        if (!pass_it["cont"]) {
          out["pass_it"] = {
            "cont": 0,
            "total": 0
          };
        } else {
          out["pass_it"] = pass_it;
        }   
        
      var data = {fields: ["title", "url", "postDate", "category", "locations", "description"], filters: {}};
      $.ajax({
        url: 'https://careers-solenis.icims.com/proxy/uxs/portals/search/job?limit=20&offset=' + out["pass_it"].cont,
        headers: {                                                      
          "accept": "application/json, text/plain, */*",
          "Content-Type":"application/json;charset=UTF-8"    // 2) headers
        },
        type: 'POST',                                        // 3) tipo
        dataType: "json",                                   // 4) data que retorna
        //data: data,
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
          msg("\x1b[45m loading jobs...");
          var json = result.jobs;
          var total = result.total; 
          out["pass_it"].total =total;
          
          for (var i = 0; i < json.length; i++) {
            var job = {};
            job.title = json[i].title;
            job.url = json[i].applyUrl;
            job.source_jobtype = json[i].employmentType.replace("_"," ").trim();
            job.dateposted_raw = json[i].datePosted.split('T').shift().split('-');
            job.dateposted_raw = `${job.dateposted_raw[1]}/${job.dateposted_raw[2]}/${job.dateposted_raw[0]}`;

            //OPCIONES PARA LOCATION:
            // (1)
            job.location = json[i].customFields.Job_AllLocations.stringValues[0];

            // (2)
            /*
            var city = json[i].customFields.Job_JobLocation_City.stringValues[0];
            var state = json[i].customFields.Job_JobLocation_State.stringValues[0];
            var country = json[i].customFields.Job_JobLocation_Country.stringValues[0];
            job.location = `${city}, ${state}, ${country}`;
            */

            // (3)
            /*
            job.location = json[i].customFields.Job_JobLocation_CountryStateCity.stringValues[0]
            job.location = job.location.split("-").reverse().join(", ").trim();
            */


            job.reqid = json[i].identifier; 
           /* job.html = json[i].description; 
                //limpieza
                job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
                job.html = removeTextAfter(job.html, 'Application Instructions', true);
            
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);*/
            //job.title = job.title.split(": ").pop().split("|").shift();
            //job.location = json[i].jobSite;
            //job.logo = json[i].;
            //job.source_apply_email = json[i].;
            //job.source_empname = json[i].;            
            //job.source_salary = json[i].;            
            //job.dateclosed_raw = json[i].;
            job.temp = 1;
            
            //multilocation (SIN REQID)
            job.location =job.location.split("\n");
            job.location.map(location =>{
              var jobx = {...job};
              jobx.location = location.split('-').reverse().join(', ').trim();
              jobs.push(jobx);
            });
            
            //multilocation (CON REQID)
            /*
            var cont = 1;
            job.location =job.location.split("\n");
            job.location.map(location =>{
              var jobx = {...job};
              jobx.reqid = job.reqid + "-" + cont
              jobx.location = location.split('-').reverse().join(', ').trim();
              jobs.push(jobx);
              cont++;
            });
            */

          }
        },
        error: function (error) {
          msg(error);
        }
      });
    out["jobs"] = jobs;
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

//Paginacion 
(function() {
    var out = {}; 
    out["pass_it"] = pass_it;   
    out["pass_it"].cont+= 20;
    if(out["pass_it"].cont < out["pass_it"].total){
        out["has_next_page"] = true;
    }else {
        out["has_next_page"] = false;
    }
 
    return out;
})();

//BEFORE Job Description
(function() {
  var out = {};
    out.iframeSelector = "#icims_content_iframe";
    out.iframeWaitFor = "div.iCIMS_JobContent";
    return out;
})();

//Job Description
(function() {
  var out = {};
  var job = {};
  
  var iframe_selector = "#icims_content_iframe";
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var selector = "div.iCIMS_JobContent";
  
  var remove_selectors = ['a','input','div.alert','img', 'button',
                          'script','style','div#iCIMS_Header','header',
                          'div.iCIMS_JobHeaderGroup'
                          ];
  var full_html = iframeDocument.querySelector(selector);
  
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;
  
    var full_html_text = full_html.textContent;
     
    job.html    = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'Overview', false);
    job.html = removeTextAfter(job.html, 'Options', true);
    job.html = removeTextAfter(job.html, 'IND2', true);
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







  ////////////////////SIMPLE/////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Extract
  (function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div.iCIMS_JobsTable > div.row");
    var jobs = [];
  
    for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("a span:nth-child(2)").textContent.trim();
      // job.title = job.title.replace(/\s+/gi, ' ');
      job.url = elem.querySelector("a").href.trim();
      job.location = elem.querySelector("div.header.left span:last-child").textContent.replace(/\d+/,"").replace(/-/g,"").trim();
      job.dateposted_raw = elem.querySelector("div.header.right span:last-child span").textContent.replace(/\(|\)/g,"").split(" ").shift().trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      // job.source_jobtype = elem.querySelector("div.iCIMS_JobHeaderGroup dl:nth-child(3)").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = "Feb-22-2021";
      jobs.push(job);
    }
  
    //out.wait=2000;
    out["jobs"]= jobs;
    return out;
  })();


  //Pag
  (function() {
    var out = {};
    out.wait = 2000;
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    var textPaginador = iframeDocument.querySelector(".pull-left > h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs").textContent.trim();
  
    var max = textPaginador.split(" of ").pop();
    var min = textPaginador.split(" of ").shift().split("Page ").pop();
  
    if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
      msg(min + " - " + max);
      var nuevaUrl = "https://external-raleys.icims.com/jobs/search?pr=" + out["pass_it"].cont + "&schemaId=&o=";
      out["pass_it"].cont++;
      window.location.href = nuevaUrl;
      out["has_next_page"] = true;
    } else {
      //try again
      out["has_next_page"] = false;
    }
  
  
  
    out.iframeSelector = iframe_selector;
    //out.iframeWaitFor = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > ul";
    return out;
  })();


  //JD
  (function() {
    var out = {};
    var job = {};
      var selector = "div.iCIMS_JobContent";
      var remove_selector = "div.container-fluid.iCIMS_JobsTable";
      //var job = pass_it["job"];
    
      var iframe_selector = "#icims_iframe_span > iframe";   
      var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  
      for (const a of iframeDocument.querySelectorAll("dl")) {
        if (a.textContent.includes("Employment Type")){//tambien se puede usar search o match
          job.source_jobtype = a.querySelector("dd").textContent.trim();
        } 
      }
    
      var full_html = iframeDocument.querySelector(selector);
        // remove something from the jobdatata
      if (remove_selector != "") if(full_html.querySelector(remove_selector))full_html.querySelector(remove_selector).remove();
      
      if (full_html.querySelector('div.iCIMS_JobOptions')) 
          full_html.querySelector('div.iCIMS_JobOptions').remove();
  
      if (full_html.querySelector('div.iCIMS_Logo')) 
        full_html.querySelector('div.iCIMS_Logo').remove();
  
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  
      
    
    job.html 		= full_html.innerHTML.trim();
    
      //job.html = removeTextBefore(job.html, "Responsibilities", false); 	
      job.html = removeTextAfter(job.html, "Must be 18 years of age.", true);
      job.html =  job.html.split("(function(d,").shift()
    
    
      job.html 		  = cleanHTML(job.html);
      var tmp       = document.createElement("DIV");
      tmp.innerHTML = job.html;
      job.jobdesc 	= tmp.textContent.trim();
    
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
