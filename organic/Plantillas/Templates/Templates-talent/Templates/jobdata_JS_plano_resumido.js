(function() {
var out = {};
var job = {};

var selector  = ''; 

  // -------------------------- INFO ------------------------------------//
  
  //job.location       = document.querySelector('').textContent.trim();
  //job.source_jobtype = document.querySelector('').textContent.trim();
  
  //let datePosted     = document.querySelector('').textContent.trim();
  //job.dateposted_raw = getDateFormat(datePosted,"/",0,1,2);
 //---------------------------------------------------------------------//

var full_html = document.querySelector(selector); 

// To Remove selectors 
for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
    if (a){a.remove();}
}
  
if(cleanHTML(full_html_text).trim().length < 200){

  job.flag_active =  0;
  job.html        = "";
  job.jobdesc     = "";

}else{
   
   job.html = full_html.innerHTML.trim();

  //job.html = removeTextBefore(job.html, "", false);
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