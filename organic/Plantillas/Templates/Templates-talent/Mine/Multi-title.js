//E
(function() {
    var out = {};
  
        var html_jobs = document.querySelectorAll('div.view.view-careers div.view-content div[class^="views-row views-row"]');
        var jobs = [];
    
        for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
        
        var job  = {};
        var elem = html_jobs[x];
          
          /*
          
          El patrón de los multi-title es mv hf 
          Entonces el condicional para las descripciones sería...
          
          Si los títulos dicen (m/v) o (M/V) será la columna izquierda
          Si los títulos dicen (h/f) o (H/F) será la columna derecha
          
          Los que no tengan ((h/f) o (H/F)) y ((m/v) o (M/V)) entonces su descripción serán las dos columnas o completa. 
          
          */
  
        job.title    = elem.querySelector('a').textContent.trim();
        job.url      = elem.querySelector('a').href.trim();
        job.location = "Brussels, BE"; // HQ's location 
          
          job.title = job.title.trim().replace(/^[0-9]/,"");
  
        job.temp  = "NOV-06-2020";
          
        if(job.title.indexOf("(M/V) -")>-1 && job.title.indexOf("(H/F)")>-1){
          job.title = job.title.replace("(M/V) -","(M/V) /");
        } 
  
        
  
        if(job.title.indexOf(" / ")>-1){
        
        var multi_title = job.title.split(" / "), l;
          
            for(l in multi_title){
  
            var jobx = {};
  
  
              jobx.title    = multi_title[l]; // + "** Multi-title **";
              jobx.url      = job.url;
              jobx.location = job.location;
              jobx.temp     = job.temp;
              
                      jobx.title = jobx.title.trim().replace(/^[0-9]/,"").trim();
              
                      if(jobx.title.search(/VLAANDEREN/i)>-1){jobx.location = "Vlaanderen, BE";}
                      if(jobx.title.search(/FLANDRE/i)>-1){jobx.location = "Flandre, BE";}
                      jobx.title = jobx.title.replace(/VLAANDEREN|FLANDRE/,"").trim(); 
  
              jobs.push(jobx);
  
            }  
  
        }else{
        jobs.push(job);
        }
      
      } 
    
    out["jobs"]= jobs;
      return out;
  })();
  
///////////////////////////////////////////////////////////////////////////////////////////
//P
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();
////////////////////////////////////////////////////////////////////////////////////////////////
//JD
(function() {
    var out = {};
    var job = {};
    
      var selector  = 'div.panel-pane.pane-node-content';
      var job = pass_it["job"];
      
      var x = document.querySelector('div.field.field--name-field-job-company div.field__item');
      if(x !== null){
      x = x.innerText.split(" - ").shift().trim();
      job.source_empname  = x;
      }  
    
    
    var full_html = document.querySelector(selector); 
    var full_html_text = full_html.innerText;
    
    
    
    if(cleanHTML(full_html_text).trim().length < 200){
    
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
    
    }else{
      
    
      // To Remove selectors 
    for (const a of full_html.querySelectorAll('div.field.field--name-field-country, div.field.field--name-field-job-company, a, h2.pane-title, img, script, style, button')) {
        if (a){
          a.remove();
        }
    }
      
      job.html = full_html.innerHTML;
      
      if(job.title.toLowerCase().indexOf("m/v")>-1){
      
        job.html = full_html.querySelector("div.group-left").innerHTML.trim();
        msg("*** Multi-title tipo 1 ***");
      
      }
        if(job.title.toLowerCase().indexOf("h/f")>-1){
      
        job.html = full_html.querySelector("div.group-right").innerHTML.trim();
        msg("*** Multi-title tipo 2 ***");
      }
      
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
    
    
      job.html = job.html.split("Interested?").shift();
      job.html = job.html.split("Geïnteresseerd?").shift();
      job.html = job.html.split("Intéressé(e)?").shift();
      //job.html = job.html.split("").shift();
       
        
    
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
    