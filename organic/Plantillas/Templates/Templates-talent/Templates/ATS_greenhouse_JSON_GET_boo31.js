

/////////////////////////////////////////////////////////////////////
// Greenhouse ATS - Json Get template (includes publication date) // 
///////////////////////////////////////////////////////////////////


// https://api.greenhouse.io/v1/boards/ poppulo /jobs?content=true

https://boards.greenhouse.io/justworks
 
//USAR ESTA URL COMO JOBSITE Y DEJAR EN EL COMENTARIO EL JOBSITE ORIGINAL
https://api.greenhouse.io/v1/boards/companyName/jobs?content=true
 //SI SE DEJA CONTENT TRUE ENTREGA DESDE EL EXTRACT EL JOBDATA


Expired jobs are being filtered | Current Jobsite:

// Spider config

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


// Before extract


(function() {
var out = {};
out.waitFor = "pre";
//out["wait"]= 1000;
return out;
})();



// Extract --------------------------------------------------------------------------------------------------------//



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
    var jobs = json.jobs; 
  
  var returnedJobs = [];  
  for(i in jobs) {
        var job = {};/*init*/
      
    var dom = ""; // Domino del url
    
    
      job.title    = jobs[i].title;
      job.url      = dom + jobs[i].absolute_url;
      job.location = jobs[i].location.name;

    //PARA SACAR LA DESCRIPCIÓN DESDE EL EXTRACT -----------------------------------------------------------------------------------------------//
    
     var full_html = jobs[i].content;//getDescription(job.url); Verificar que coincidadan los valores con el JSON y el resto del código.
     var div       = document.createElement("div");
     div.innerHTML = full_html
     var desc = div; //.querySelector("div.jobDisplay"); Se puede usar el querySelector si se quiere ser más específico
     
     var remove_selectors = [
                    
                     "a","style","script",
                     "input",
                     "div.alert",
                     "img", "button",
                     "div.alert"
                    
                        ]; 


         var desc = div; //.querySelector(""); // Selector del jobdata
         
         if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
         if(div.querySelector(remove_selector)) div.querySelector(remove_selector).remove();});
     
         
     for (const a of desc.querySelectorAll('p')) {
     if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
         job.experienced_required = a.textContent;
       } 
     }
         

        for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
         if (a){ 
           a.remove(); 
         } 
       }

  
       job.html = desc.innerHTML.trim(); 
     
     
       //job.html = removeTextBefore(job.html, "", false);
       //job.html = removeTextBefore(job.html, "", false);
       //job.html = removeTextBefore(job.html, "", false);
     
   
       //job.html = job.html.split("")[0];
       //job.html = job.html.split("")[0];
       //job.html = job.html.split("")[0];
       job.html = job.html.split("So there you go")[0];
       //job.html = job.html.split("")[0];

       //job.html = job.html.replace("","").trim();

       job.html    = cleanHTML(job.html);
       job.jobdesc = job.html;
    
    
      /*----------DATE-POSTED-------------------------------------*/
             
            let datum = jobs[i].updated_at.split("T")[0];
                datum = datum.trim();
   			let cut = "-";
          
            
            let day   =  datum.split(cut)[2];
            let month =  datum.split(cut)[1];
            let year  =  datum.split(cut)[0];
          
           job.dateposted_raw  = month +"/"+  day +"/"+ year;
    

      /*---------------------------------------------------------*/

      job.temp = "MAR-2020";
      
      returnedJobs.push(job);
    }
    
    out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
    return out;
})();

// Pagination ------------------------------------------------------------------------------------------------//


(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();



// Job Description --------------------------------------------------------------------------------//



(function() {
  var out = {};
  var job = {};
  
  var selector = "div#main div#content";
 
  var full_html = $(selector);
  
    //---------INFO-------------------------------------

    var html_2 = $(selector).text(); 

    // job.location           = $("").text().trim();
    // job.source_jobtype     = $("").text().trim();
    // job.source_empname     = $("").text().trim();
    // job.logo               = $("").attr("src");
    // job.source_salary      = $("").text().trim();
    // job.dateclosed_raw     = $("").text().trim();
    //job.source_apply_email = $("").text().trim();

  
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
    
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

 //----------------------------------------------------- 
  

  var full_html_text = full_html.text();

 

  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("The job is no longer available")>-1){
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

