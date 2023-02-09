
// ATS myHR

/*

El URL se construye buscando recibir la descripción del job por correo

*/

// EXTRACT 


(function() {
  var out = {};
      var html_jobs = document.querySelectorAll('li.ps_grid-row.psc_rowact');
      var jobs = [];
  
      for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      
      var job  = {};
      var elem = html_jobs[x];

      job.title    = elem.querySelector('span[id*="JOB_TITLE"]').textContent.trim();
      job.location = elem.querySelector('span[id^="LOCATION"]').textContent.trim();
        
       var jobID = elem.querySelector('span[id*="JOB_OPENING_ID"]').textContent.trim();
       var dom   = "https://careers.northwestern.edu/psp/hr857prd_er/" + "EMPLOYEE/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?";
       var path  =  "Page=HRS_APP_JBPST_FL&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=" +  jobID  + "&PostingSeq=1";
        
      job.url = dom + path;

      //job.source_jobtype = elem.querySelector('').textContent.trim();
      //job.source_salary  = elem.querySelector('').textContent.trim();

      //job.experienced_required = elem.querySelector('').textContent.trim();

      //job.source_empname     = elem.querySelector('').textContent.trim();
      //job.logo               = elem.querySelector('').getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector('').textContent.trim();
      
      
      var datePosted     = elem.querySelector('span[id*="SCH_OPENED"]').textContent.trim();
      job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);

      //var dateClosed     = elem.querySelector('').textContent.trim();
      //job.dateclosed_raw = getDateFormat(dateClosed);

    
      job.temp  = "Jul-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);
        
      //if(job.title.indexOf("")>-1){job.title = "";}
     
     // if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
     // }
    
    } 
  
  out["jobs"]= jobs;
    return out;
})();

  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();
         if(day < 10 && day.length < 2){day = "0" + day;} 
    
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

  // Infinite PAG 

  (function () {
  var out = {};


  var elemento = ".ps_box-more";
  if (document.querySelector(elemento)) {
    document.querySelector(elemento).click();
    out["has_next_page"] = true;  
  }else{
    out["has_next_page"] = false;  
  }
  out["wait"]= 200;
  out.pic = true;
  out.pic = true;
  out.waitfor = true;
  return out;
})();

// DESC 

(function() {
var out = {};
var job = {};

var selector = "span[id^='HRS_SCH_PSTDSC_DESCRLONG']";

var remove_selectors = ["a","input","div.alert",
                        "img", "button","div.alert","style",
                        "script"
                        
];
  //var job = pass_it["job"];

  //------------INFO----------------------------------------------------------//
 
  // job.location       = document.querySelector('').textContent.trim();
  // job.source_jobtype = document.querySelector('').textContent.trim();
  // job.source_salary  = document.querySelector('').textContent.trim();

  // job.experienced_required = document.querySelector('').textContent.trim();

  //var datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted);

  //--------------------------------------------------------------------------//

var full_html = document.querySelector(selector);
// remove something from the jobdatata
if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;



  var full_html_text = full_html.textContent;
  
  
      for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
        job.experienced_required = a.textContent.split(";").shift().trim();
      } 
    }

   
    for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.includes('Equal Opportunity')){
       // job.location = a.textContent.trim(); 
        a.remove(); 
      } 
    }
  

/*  // TO Remove selectors 
    for (const a of full_html.querySelectorAll('a')) {
      if (a){
        a.remove(); 
      } 
    }
  */
  if(cleanHTML(full_html_text).trim().length < 200){
  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{
   
job.html    = full_html.innerHTML.trim();
job.jobdesc = full_html.textContent.trim();

  job.html = removeTextBefore(job.html, "Job Summary:", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

 // job.html = job.html.split("Northwestern Univer")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];

/*
  if(job.html.indexOf("-")>-1 && job.html.indexOf("")>-1){
        
    let a = job.html.indexOf("");
    let b = job.html.indexOf("");
    let x = job.html.slice(a,b);
    job.html = job.html.replace(x,"").trim();
  }
*/
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

  //var title = pass_it["job"].title;
  //job.html  = job.html.replace(title,"");

  //CLEAN EMOJIS
  //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();


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