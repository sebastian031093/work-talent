// ICIMS - NEW extract SELECTOR 

// Spider config


{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": true,
"waitForResources": true
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false



// EXTRACT (Cuando la locación aparece en la esquina superior izquirda sin Multi-location)----------------------------------------------------------------------------------------------//

(function() {
  var out = {};
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable .row");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      
      var tracker = "&mode=job&iis=Neuvoo";
      
      job.title    = elem.querySelector("div.col-xs-12.title a span:not(.field-label)").textContent.trim();
      job.url      = elem.querySelector("a.iCIMS_Anchor").href.trim() + tracker;
      job.location = elem.querySelector(".col-xs-6.header.left span:not(.field-label)").textContent.trim();
      
          //job.location = job.location.split("|").shift().trim();
          job.location = job.location.split("-").reverse().join(", ");
          job.location = job.location.replace(/\ , /g,", ");  
    
       job.temp  = "MAR-2020";
      //job.jobid = MD5(job.title+job.location+job.temp);
        
     //if(job.title.indexOf("")>-1){job.title = "";}
     
     //if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
      jobs.push(job);
    //}
    
    } 
  
  out["jobs"]= jobs;
    return out;
})();
      
  

// Extract - MULTILOCATION - (Cuando la locación aparece en la esquina superior izquirda)

(function() {
  var out = {};
    var iframe_selector = "#icims_content_iframe";
    var iframeDocument  = document.querySelector(iframe_selector).contentWindow.document;
    var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable .row");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      
      var tracker = "&mode=job&iis=Neuvoo";
      
      
      job.title    = elem.querySelector("div.col-xs-12.title a span:not(.field-label)").textContent.trim();
      job.url      = elem.querySelector("a.iCIMS_Anchor").href.trim() + tracker;
      job.location = elem.querySelectorAll(".col-xs-6.header.left span")[1].textContent.trim();

/*
      var info = elem.querySelector('div.additionalFields div[role="list"]');
      for (const a of info.querySelectorAll('dl')) {
        if (a.textContent.search('Company')>-1){
             job.source_empname = a.querySelector('dd.iCIMS_JobHeaderData').textContent.trim();
         }

      }
 */     
          job.location = job.location.split("|").shift().trim();
          job.location = job.location.split("-").reverse().join(", ");
          job.location = job.location.replace(/\ , /g,", ");  
    
      job.temp = "1";
      
  
      
      var loc = elem.querySelectorAll(".col-xs-6.header.left span")[1].textContent.trim();
      var multilocation = "|";

      if(loc.indexOf(multilocation)>-1){
        var aux = loc.split(multilocation);
          
          for(i in aux){ var jobx = {};
           
                  
           jobx.title    = elem.querySelector("div.col-xs-12.title a span:not(.field-label)").textContent.trim();
           jobx.url      = elem.querySelector("a.iCIMS_Anchor").href.trim() + tracker;
                     
           jobx.location = aux[i]; 
                        
             jobx.location = job.location.split("-").reverse().join(", ");
             jobx.location = job.location.replace(/\ , /g,", ");   
             //jobx.source_empname = job.source_empname;        

            jobx.temp = job.temp;
     
            //if(job.title.length > 0 && job.location.length > 0){
              jobs.push(jobx);
            //}
             
          }
       

      }else{
        jobs.push(job);
      }
          
      
    } 
  
  out["jobs"] = jobs;
    return out;
})();



// PAG UNIVERSAL

 (function() {
  var out = {};
 
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
    var nuevaUrl = window.location.protocol + "//" + window.location.hostname + "/jobs/search?pr=" + out["pass_it"].cont + "&searchRelation=keyword_all";
    out["pass_it"].cont++;
    window.location.href = nuevaUrl;
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  //out["pic"] = true;
  //out.wait = 1;
  out.iframeSelector = iframe_selector;
  out.iframeWaitFor = "body > div.iCIMS_MainWrapper.iCIMS_ListingsPage > ul";
  return out;
})();



// Before job description ----------------------------------------------------------------------------------------------------//

(function() {
  var out = {};
    out.iframeSelector = "#icims_content_iframe";
    out.iframeWaitFor = "div.iCIMS_JobContent";
    return out;
})();

// Description  JQUERY ------------------------------------------------------------------------------------------------------------------//



(function() {
var out = {};
//IFRAME
var idIframe = "#icims_content_iframe";
  var myIframe = document.querySelector(idIframe).contentWindow.document;

var job = {};
  var selector = "div.iCIMS_MainWrapper"; // donde está la descripción
 
job.html = $(selector,myIframe).html(); //con iframe
  if (typeof job.html == 'undefined'){
          job.html = "";
        }


//job.source_jobtype = $(selector,myIframe).find("").text();

  job.html = $("<div>"+job.html+"</div>").find("div.alert, #jobSocialOptions, h2:contains(Need help)").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_JobOptions, div.jobOptionsMobile").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_PageFooter").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_Navigation").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_Logo").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_profilePicture").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("a,div.container-fluid.iCIMS_JobsTable,div.iCIMS_TopHeader").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_InfoMsg.iCIMS_InfoMsg_Connect").remove().end().html();


  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  job.html = job.html.split("Options")[0];
  job.html = job.html.split("Need help finding the right job?")[0];
  //
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];


    job.html = cleanHTML(job.html);
    job.jobdesc = job.html;


out["job"] = job;
return out;
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml =  text + " " + newHtml;
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


  //DESCRIPTON JS PLANO ------------------------------------------------------------------------------------------------------------//


(function() {
var out = {};
var job = {};

  var iframe_selector = "#icims_content_iframe";
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var selector = "div.iCIMS_JobContent";
 // var remove_selector = "";
  //var job = pass_it["job"];

//  var full_html = iframeDocument.querySelector(selector);

var remove_selectors = ['a','input','div.alert','img', 'button',
                        'script','style','div#iCIMS_Header','header','div.iCIMS_JobHeaderGroup'
                        
];
  //var job = pass_it["job"];

  //------------INFO----------------------------------------------------------//

  // job.location       = document.querySelector('').textContent.trim();
  // job.source_jobtype = document.querySelector('').textContent.trim();
  // job.source_salary  = document.querySelector('').textContent.trim();

  // job.experienced_required = document.querySelector('').textContent.trim();

  //var datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"/",0,1,2); // SIgue el orden de los parmetros en la función "getDateFormat"

  //--------------------------------------------------------------------------//

  var full_html = iframeDocument.querySelector(selector);

if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;



  var full_html_text = full_html.textContent;

  /*  // E-mail 
  if(full_html_text.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
  job.source_apply_email = full_html_text.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
  */

   
    for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.search('Location:')>-1){
         //job.location = a.textContent.trim();
        a.remove(); 
      } 
    }
        for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.indexOf("$")>-1){
         job.source_salary = a.textContent.trim();
        //a.remove(); 
      } 
    }
      for (const a of full_html.querySelectorAll('li')) {
      if (a.textContent.indexOf("$")>-1){
         //job.location = a.textContent.trim();
        a.remove(); 
      } 
    }
     
    


 // TO Remove selectors 
  for (const a of full_html.querySelectorAll('a, img, header, script,div.iCIMS_JobOptions, #jobSocialOptions,.iCIMS_Logo,div.col-xs-6.header.left')) {
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


  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  job.html = job.html.split("Options")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];

/*
  if(job.html.indexOf("Location")>-1 && job.html.indexOf("Job Description")>-1){
        
    let a = job.html.indexOf("Location");
    let b = job.html.indexOf("Job Description");
    let x = job.html.slice(a,b);

    let b_length = "Job Description".lenth;
    job.html = job.html.replace(x + b_length,"").trim();
  }
*/
 
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

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


