


// ATS tedk12

/*

Enlacees de referencia: 

https://scottsdale.tedk12.com/hire/index.aspx
https://chandler.tedk12.com/hire/index.aspx

*/

// SPIDER INFO


{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": false,
"waitForResources": false
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}


// EXTRACT 



(function() {
  var out = {};

      var html_jobs = document.querySelectorAll('div#divJobs span[id="JobList"] table tr[id^="JobList"]');
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector('td strong a').textContent.trim();
      job.url      = elem.querySelector('td strong a').href.trim();
      //job.location = elem.querySelector('').textContent.trim();
        
        //

      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experienced_required = elem.querySelector('').textContent.trim();

      //job.source_empname     = elem.querySelector('').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
      
      
      var datePosted     = elem.querySelector('td:nth-child(2)').textContent.trim();
      job.dateposted_raw = getDateFormat(datePosted,'/',1,0,2);

      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);

    
      job.temp  = "Aug-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);



        
      //if(job.title.toUpperCase().indexOf("")>-1){job.title = "";}
      
     
     //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
      //}
    
    } 
  
  out["jobs"]= jobs;
    return out;
})();

  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();
        // if(day < 10 && day.length < 2){day = "0" + day;} 
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
  }

// PAGINATION

(function () {
    var out = {};
    var selector = "span.PageIndexNumber";  // selector donde esta la paginacion

  if (typeof pass_it == "undefined") pass_it = {};
    
  if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;
        
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == out["pass_it"].cont){                
                //msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
                out["has_next_page"] = true;
            }
        });  

    out.waitFor = 'span.PageIndexNumber';
    return out;
})();



// DESCRIPTION

(function() {
var out = {};
var job = {};

  var iframe_selector = "#ifJobDescriptoin";
  var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
  var selector        = "#divJobDetails";

// -------------------------- INFO ------------------------------------//
  
  //job.location       = document.querySelector('').textContent.trim();
  //job.source_jobtype = document.querySelector('').textContent.trim();
  
  //let datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
 //---------------------------------------------------------------------//
var full_html = iframeDocument.querySelector(selector);
var full_html_text = full_html.innerText;

// To Remove selectors 
for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
    if (a){a.remove();}
}

for (const a of full_html.querySelectorAll('p')) {
    if (a.textContent.search(/CLASSIFICATION|TITLE|CALENDAR|SALARY|REPORTS TO/i)>-1){
          a.remove(); 
        } 
    }
  
if(cleanHTML(full_html_text).trim().length < 200){

  job.flag_active =  0;
  job.html        = "";
  job.jobdesc     = "";

}else{
   
   job.html = full_html.innerHTML.trim();

  job.html = removeTextBefore(job.html, "JOB DESCRIPTION", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("").shift();
  //job.html = job.html.split("").shift();
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

job.html    = cleanHTML(job.html.trim());
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