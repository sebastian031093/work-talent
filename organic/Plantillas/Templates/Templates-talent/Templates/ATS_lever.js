

// Jobs lever

// Extract

(function() {
  var out = {};

      var html_jobs = document.querySelectorAll('a.posting-title');
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector("h5").textContent.trim();
      job.url      = elem.href.trim();
      job.location = elem.querySelector('span.sort-by-location').textContent.trim();

      job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
  

          //split on city 2 - Limpia las ciudades de los títulos
          if(job.location.indexOf(",")>-1){
             let city = job.location.split(",")[0].trim();
                  var preClean = job.title.split(city).shift().trim();
                   if(preClean.length > 10){
                       job.title = job.title.split(city).shift().trim();
                          let lastChar = job.title.substr(job.title.length -1);
                            if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                              job.title = job.title.slice(0,-1);}
                            }else{
                      job.title = job.title.replace(city,"").trim();
                              }

                }  
                
      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experienced_required = elem.querySelector('').textContent.trim();

      job.temp  = "Aug-2020";
     
      if(job.title.toUpperCase().indexOf(/Open Application|General Application/)>-1){job.title = "";}
      
     
     if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
     }
    
    } 
  
  out["jobs"]= jobs;
    return out;
})();



  // DESC

(function() {
var out = {};
var job = {};

var selector = 'div[class="section-wrapper page-full-width"]';

var remove_selectors = ['input','div.alert','img', 'button',
                        'script','style',
                        
];
  //var job = pass_it["job"];

  //------------INFO----------------------------------------------------------//
 
  var check = document.querySelector('div.sort-by-commitment'); 
  if(check !== null){
    if(check.innerText.search(/time/i)>-1){
      job.source_jobtype = check.innerText.trim();
    }
 }

  // job.location       = document.querySelector('').textContent.trim();
  // job.source_salary  = document.querySelector('').textContent.trim();

  //--------------------------------------------------------------------------//

var full_html = document.querySelector(selector);

if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;



  var full_html_text = full_html.textContent;
  
  

  /*  // E-mail 
  if(full_html_text.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
  job.source_apply_email = full_html_text.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
  */
    for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
        job.experienced_required = a.textContent;
      } 
    }

   
    for (const a of full_html.querySelectorAll('div.section.page-centered > div')) {
      if (a.textContent.search('http')>-1){
         //job.location = a.textContent.trim();
           a.remove(); 
      } 
    }
     
    


 // TO Remove selectors 
  for (const a of full_html.querySelectorAll('option, select, button, input, img, script, [data-qa="btn-apply-bottom"]')) {
      if (a){
        a.remove(); 
      } 
    }
  

  if(cleanHTML(full_html_text).trim().length < 200){
  //if(cleanHTML(full_html_text).trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{
   
job.html    = full_html.innerHTML.trim();
    
    
    job.html = job.html.replace(/<div>|<h1>|<h2>|<h3>|<h4>|<h5>|<h6>|<h7>/g,"<p>");
    job.html = job.html.replace(/<\/div>|<\/h1>|<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>|<\/h7>/g,"</p>");



  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];


  //var title = pass_it["job"].title;
  //job.html  = job.html.replace(title,"");

  //CLEAN EMOJIS
 // job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();


job.html    = cleanHTML(job.html);
job.jobdesc = job.html;
}

out["job"] = job;
return out;

})();

function removeTextBefore(html, text, flag) {
var newHtml = html;
if (newHtml.indexOf(text) > -1) {
newHtml = newHtml.split(text).pop();
if (!flag) {
newHtml = text + " " + newHtml;
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
