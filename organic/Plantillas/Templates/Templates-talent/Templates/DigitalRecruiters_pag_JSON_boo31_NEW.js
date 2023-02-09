

//Notas: 

/*

¡ MODIFICAR EL DOMINIO EN LA PAGINACIÓN ! 

Locaciones y jobtype tomado desde el jobdata. 
El jobdata puede ser extraído usando JQuery.



*/



// Spider config ---------------------------------------------------------------------------------------------------//

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


// BEFORE EXTRACT ---------------------------------------------------------------------------------------------------//

(function() {
  var out = {};
  out.waitFor = "pre";
  //out["wait"]= 1000;
   return out;
})();

// EXTRACT ---------------------------------------------------------------------------------------------------//

(function() {
  var out = {};
   
  if(typeof pass_it == "undefined") pass_it = {};
 
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 20,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.jobAds;
  
  
  var returnedJobs = [];  
  for(j in jobs) {
       var job = {};
      
    

      job.title = jobs[j].title;

 
    
      var dom = window.location.href.split("/fr/careers-sites").shift().trim() + "/fr/annonce/";
    
      
      var id    = jobs[j].id;
      var title = jobs[j].title;
      
          
      
     if(job.title.indexOf("h/f")>-1){job.title = job.title.split("h/f")[0] + "h/f"}; 
     if(job.title.indexOf("(H/F)")>-1){job.title = job.title.split("(H/F)")[0] + "(H/F)";} 
     if(job.title.indexOf("H/F")>-1 && job.title.indexOf("(")==-1){job.title = job.title.split("H/F")[0] + "H/F";}
      
       
         job.title = job.title.trim();

      var title = jobs[j].title;

      
      var pre_url = dom + id + "-"  + title;   
      
      title = title.replace("(H/F)","hf").replace("(F/H)","-fh-").replace(/ - /gi,"-").replace(/[/]/gi,"");
      title = title.replace(/é/gi,"e").replace(/è/gi,"e").replace(/á/gi,"a").replace(/à/gi,"a").replace(/'/g,"-");
      title = title.toLowerCase().replace(/ /g,"-").replace(/hf/gi,"-hf-").replace(/--/g,"-").replace("(","").replace(")","");
      pre_url = pre_url.replace(/ /gi,"-").replace(/--/g,"-").replace("(","").replace(")","");
    
    
    
      
      job.url = dom + id + "-"  + title;  
    
         job.url    = job.url.trim();
         var lastChar = job.url.substr(job.url.length -1);
         if(lastChar === "-"){job.url = job.url.slice(0,-1);}

      job.temp = 3;
      returnedJobs.push(job);
      
  }

  
    out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
    return out;
})();

// PAGINATION ---------------------------------------------------------------------------------------------------//

(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
    if(typeof msg == "undefined") msg = function(x){return x;};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

    if (out["pass_it"]["jobs"] == 20) {
      

      // Values taken from current JSON-URL 

      /* ¡¡¡¡ MODIFICAR DOMINIO DE LA PAGINACIÓN !!!! */

      var dom    = "https://recrutement.ldc.fr/fr/careers-sites/job-ads-more/28691/0/"; 
      

      var concat = "/0?";
      
      var url    = dom +  out["pass_it"].cont + concat;
        
        
    out["pass_it"].cont += 20;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();

// DESCRIPTION ---------------------------------------------------------------------------------------------------//

(function() {
	var out = {};
	var job = {};
  
  	var selector = ".content-text:first";
 
	var full_html = $(selector);
  
  	
    //---------INFO-------------------------------------


    job.location = $("address").text().replace(/[0-9]/gi,"").trim();
      

  
      var type   = $("li:contains(Contrat) ").text().split(":").pop().trim();
      var temps  = $("li:contains(Temps de travail)").text().split(":").pop().trim();
       
        var jobType = "";
        var array_jobType = Array();

        if(type) array_jobType.push(type);
        if(temps) array_jobType.push(temps);

        if(array_jobType.length) jobType = array_jobType.join(" - ");

        job.source_jobtype = jobType;
  
 //---------REMOVE---------------------------------------

    full_html.find('a').remove().end().html();
    full_html.find('input, img, script, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
    full_html.find("li:contains(Contrat)").remove().end().html();
    full_html.find("li:contains(Temps de travail)").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

 //----------------------------------------------------- 
	
  var full_html = full_html.html();
  
   job.html 		= full_html.trim();
 
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);


  job.html = job.html.split("N’hésitez plus")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];



  
	job.html 		  = cleanHTML(job.html);
	job.jobdesc 	= job.html;
  
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

    ////////////


    /*
    Description; 

  Se extrae el nuevo valor "job.experienced_required" y se limpia de las descripciones. Si el valor es "indiferente" no se registra pero se deja en las descripcioens.

    */

    (function() {
  var out = {};
  var job = {};
  
    var selector  = ".content-text:first";
    var full_html = $(selector);
    var sum       = $("div.classified-summary").text();
  
    if(sum.toLowerCase().indexOf("expérience")>-1 && sum.toLowerCase().indexOf("indifférent")==-1){
    job.experienced_required = $("li:contains(Expérience)").text().split(":").pop().trim();
    }
  
    
    //---------INFO-------------------------------------

    job.location = $("address").text().replace(/[0-9]/gi,"").trim();
   
      var type   = $("li:contains(Contrat) ").text().split(":").pop().trim();
      var temps  = $("li:contains(Temps de travail)").text().split(":").pop().trim();
       
        var jobType = "";
        var array_jobType = Array();

        if(type) array_jobType.push(type);
        if(temps) array_jobType.push(temps);

        if(array_jobType.length) jobType = array_jobType.join(" - ");

        job.source_jobtype = jobType;
  
 //---------REMOVE---------------------------------------

    full_html.find('a').remove().end().html();
    full_html.find('input, img, script, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
    full_html.find("li:contains(Contrat)").remove().end().html();
    full_html.find("li:contains(Temps de travail)").remove().end().html();

  
  
  if(full_html.find("li:contains(Expérience)").text().indexOf("Indifférent")==-1){
  full_html.find('li:contains(Expérience)').remove().end().html();
  
  }
  
 //----------------------------------------------------- 
  
  var full_html = full_html.html();
  
   job.html     = full_html.trim();
 
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);


  job.html = job.html.split("N’hésitez plus")[0];
  //job.html = job.html.split("")[0];
  //job.html = job.html.split("")[0];



  
  job.html      = cleanHTML(job.html);
  job.jobdesc   = job.html;
  
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