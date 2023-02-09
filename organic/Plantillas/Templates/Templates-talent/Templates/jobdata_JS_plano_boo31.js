
(function() {
var out = {};
var job = {};

var selector = '';

var remove_selectors = ['a','input','div.alert','img', 'button',
                        'script','style',
                        
];
  //var job = pass_it["job"];

  //------------INFO----------------------------------------------------------//
 /* // Para validar la existencia del selector. Si no existe habrá error de selector. 
  var check = document.querySelector('selectorDeLaLocacion') !== null;
  if(check){
    job.location = document.querySelector('selectorDeLaLocacion').textContent.trim();
 }else{
  job.location = ""; // HQ's location


 }
*/
  // job.location       = document.querySelector('').textContent.trim();
  // job.source_jobtype = document.querySelector('').textContent.trim();
  // job.source_salary  = document.querySelector('').textContent.trim();

  // job.experienced_required = document.querySelector('').textContent.trim();

  //var datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"/",0,1,2); // SIgue el orden de los parmetros en la función "getDateFormat"

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

   /*
    for (const a of full_html.querySelectorAll('tr')) {
      if (a.textContent.search('Location:')>-1){
         //job.location = a.textContent.trim();
         //job.source_jobtype = a.textContent.trim();
      } 
    }
     
    */


 // TO Remove selectors 
  for (const a of full_html.querySelectorAll('a, img, script')) {
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

  //job.html = job.html.split("")[0];
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