

// WORK FORCE NOW

/*



1. Sección spider info. En el URL del JSON GET en el spider info debe cambiarse el valor del query "$top=10" a "$top=20" ya que 
   la paginación va de 20 en 20; aparece al final del enlace. 

 
2. Extract. Para construir el URL de cada job se tienen 3 variables.

currentURLdomConstant, cidTillType, jobId, lang

Solamente debe cambiar el valore de cidTillType. Tomar del URL del landpage o no JSON. En otras palabras, el enlace que pegamos en 
el dev comment para indicar al agente QA para que verifique nuestra indexación

Ejemplo: 

https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=fbd46039-a8c1-430f-a96f-7ede782f2f7c&ccId=19000101_000001&type=MP&lang=en_US


Se toma desde "cid" a "type=" 
cid=fbd46039-a8c1-430f-a96f-7ede782f2f7c&ccId=19000101_000001&type=MP



      var currentURLdomConstant = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?";
      var cidTillType           = "cid=fbd46039-a8c1-430f-a96f-7ede782f2f7c&ccId=19000101_000001&type=MP"; 
      var jobId                 = jobs[i].itemID;
      var lang                  = '&lang=en_US';

3. Paginación. Deseamos paginar el JSON, por ello tomamos el URL del JSON GET que tenemos en el spider info. 
https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=fbd46039-a8c1-430f-a96f-7ede782f2f7c&timeStamp=1598387437035&lang=en_US&ccId=19000101_000001&locale=en_US&$top=20
cambiamos el valor de la variable "cidTillTop" 
asignandole este valor
cid=fbd46039-a8c1-430f-a96f-7ede782f2f7c&timeStamp=1598387437035&lang=en_US&ccId=19000101_000001&locale=en_US&$top=20
*/


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
}

/*---EXTRACT--------------------------------------------------------------------------------------------------------------------------*/


(function() {
  var out = {};
  
  if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
 

    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.jobRequisitions;
  
  var returnedJobs = [];  
  for(i in jobs) {
        var job = {};/*init*/
        
      job.title = jobs[i].requisitionTitle;

      
       if(jobs[i].requisitionLocations[0].nameCode.shortName){

      job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
      }else{
        job.location = "US";
      }
      //Values taken from current URL in spider info/dev comment
    
      var currentURLdomConstant = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?";
      var cidTillType           = "cid=6e1bed32-26a6-443c-a7b3-cad7a37767c4&ccId=702412794_4138&type=MP"; 
      var jobId                 = jobs[i].itemID;
      var lang                  = "&lang=en_US";
      
      job.url = currentURLdomConstant + cidTillType + "&jobId=" + jobId  + lang;
      
      
      
            //----------DATE-POSTED-------------------------------------
              //2019-07-09  <---muestra de fecha
            var datum = jobs[i].postDate.split("T")[0];
                datum = datum.trim();
          
            
            var day   =  datum.split("-")[2];
            var month =  datum.split("-")[1];
            var year  =  datum.split("-")[0];
          
           job.dateposted_raw  = month +"/"+  day +"/"+ year;

           //---------------------------------------------------------

      job.temp = "Jul-2020";
      
      returnedJobs.push(job);
    }
    
    out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
    return out;
})();
/*-----PAGINATION------------------------------------------------------------------------------------------------------------------------*/


(function() {
    var out = {};
    
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;
    
    
    
        if (out["pass_it"]["jobs"] < 20) {
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 20;
    
      var domConstant = window.location.origin + window.location.pathname + "?";
      var cidTillTop  = "cid=fbd46039-a8c1-430f-a96f-7ede782f2f7c&timeStamp=1598387437035&lang=en_US&ccId=19000101_000001&locale=en_US&$top=20";
      
      var url = domConstant + cidTillTop + "&$skip=" + out["pass_it"].cont;


     
      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    //out["wait"] = true;
    return out;
    })(); 
   

	 /*------BEFORE-JOB-DESCRIPTION---------------------------------------------------------------------------------------------------------------------------------------------*/

 (function() {
  var out = {};
  out.waitFor = ".job-description-data-item";
  return out;
  })();

	/*----------------------------------------------------------------------------------------------------------------------------------------------------*/

  (function() {
  var out = {};
  var job = {};
  
  var selector = ".job-description-data-item";
 
  var full_html = $(selector);
  
    
    //---------INFO-------------------------------------

    var html_2 = $(selector).text(); 

    // job.location           = $("").text().trim();
    // job.source_jobtype     = $(".job-description-worker-catergory span").text().trim();
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

    full_html.find('a').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
    full_html.find('style, script').remove().end().html();

    //full_html.find("h1").remove().end().html();

   //full_html.find("p:contains()").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
  

    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

 //----------------------------------------------------- 
  

  var full_html_text = full_html.text();

 

  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("no description available")>-1){
  if(full_html_text.trim().length < 200){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";


  }else{

  var full_html = full_html.html();

   job.html = full_html.trim();
 
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];

  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");
  //job.html = job.html.replace("","");

//CLEAN EMOJIS
//  job.html = full_html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();

  job.html    = cleanHTML(job.html);
  job.jobdesc = job.html;


}
  
  out["job"]  = job;
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // jobdata JS PLANO 

    (function() {
var out = {};
var job = {};

var selector = ".job-description-data-item";

var remove_selectors = [
                        "a",
                        "input",
                        "div.alert",
                        "img", "button",
                        "div.alert",
                        "style", "script"

];
  //var job = pass_it["job"];

  //------------INFO----------------------------------------------------------//

  // job.location             = document.querySelector('').textContent.trim();
   job.source_jobtype       = document.querySelector('div.job-description-details-sub-left-container span.job-description-worker-catergory').textContent.trim();
  // job.source_salary        = document.querySelector('').textContent.trim();

  //var datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted);

  //--------------------------------------------------------------------------//

var full_html = document.querySelector(selector);
// remove something from the jobdatata
if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
if (typeof msg == "undefined") msg = console.log;



  var full_html_text = full_html.textContent;

 
    for (const a of full_html.querySelectorAll('strong')) {
      if (a.textContent.includes('NOTE:')){
       // job.location = a.textContent.trim(); 
        a.remove(); 
      } 
    }
      for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.includes('experience')){
       if(a.textContent.search(/[0-9]/g)>-1){
        job.experienced_required = a.textContent.replace("·","").trim();
       }
      } 
    }
  


  if(cleanHTML(full_html_text).trim().length < 200){
  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

  }else{
   
job.html    = full_html.innerHTML.trim();
job.jobdesc = full_html.textContent.trim();

  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  //job.html = job.html.split("")[0];
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