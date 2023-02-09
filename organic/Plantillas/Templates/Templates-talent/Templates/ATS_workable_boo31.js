



// Workable JSON POST Universal

// Spider Config

{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": false,
"waitForResources": true
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}

// Exctract -----------------------------------------------------------------------------------------------------//

(function () {
    var jobs = [];
    var out = {};
    var cont = 1;
    var Token
    var json;
  
    var companyName = window.location.pathname;

  
  do {

    var data = {"token":Token + cont,"query":"","location":[],"department":[],"worktype":[],"remote":[]};

        $.ajax({// Verificar URL
            url: 'https://careers-page.workable.com/api/v2/accounts' + companyName +'jobs',  // 1) url
            headers: {                                                      
                "Accept": "application/json, text/plain, */*",
                "Content-Type":"application/json;charset=UTF-8"                               // 2) headers
            },
            type: 'POST',                                                                     // 3) tipo
            dataType: "json",                                                                 // 4) data que retorna
            //data: data,
            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.results;                                                        // 5) ruta de los trabajos
                Token = result.nextPage;
                //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = window.location.protocol + "//" + window.location.hostname + window.location.pathname +"j/";


                    job.title    = json[i].title;
                    job.url      = dom + json[i].shortcode + "/";
              
                    //Location array "city, state, country"

             
                          var city    = json[i].location.city;
                          var state   = json[i].location.region;
                          var country = json[i].location.country;

                          var loc = "";
                          var array_loc = Array();

                          if(city) array_loc.push(city);
                          if(state) array_loc.push(state);
                          if(country) array_loc.push(country);


                          if(array_loc.length) loc = array_loc.join(", ");

                     job.location = loc;

                             /*----------DATE-POSTED-------------------------------------*/
                             
                              var datum = json[i].published.split("T")[0];
                                  datum = datum.trim();


                              var day   =  datum.split("-")[2];
                              var month =  datum.split("-")[1];
                              var year  =  datum.split("-")[0];

                             job.dateposted_raw  = month +"/"+  day +"/"+ year;

                             /*---------------------------------------------------------*/

              

                    job.temp = "2020";

                    //if(job.title.indexOf("")>-1){job.title = "";}
     
                   // if(job.title.length > 0 && job.location.length > 0 && job.url.length > 0){
                      jobs.push(job);
                    //}

                }
                cont++;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (json.length >= 10);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();


// Pagination  ----------------------------------------------------------------------------------------------------------------------------//


(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();


// Job Description --------------------------------------------------------------------------------------------------------------------------//


(function() {
var out = {};
var job = {};

    var selector = "main[class^='job-preview-styles__preview']";

// -------------------------- INFO ------------------------------------//
  
  //job.location       = document.querySelector('').textContent.trim();
  
  var type = document.querySelector('[data-ui="job-type"]');
  if(type !== null){
  	job.source_jobtype = type.innerText.trim();
  }

 //---------------------------------------------------------------------//

var full_html = document.querySelector(selector); 
var full_html_text = full_html.innerText;

// To Remove selectors 
for (const a of full_html.querySelectorAll('a, img, script, style, buttonstyle, meta, symbol, svg, [class^="job-preview-socialshare"], [class*="shared-ui-organisms-select-option"]')) {
    if (a){a.remove();}
}
       for (const a of full_html.querySelectorAll('p')) {
          if (a.textContent.search(/Years of experience|Year of experience|Experience/)>-1){
            var prob_exp = a.textContent.split(":").pop().trim();
              if(prob_exp.search(/[0-9]/g)>-1 && prob_exp.length < 30){
                job.experienced_required = prob_exp.replace(".","").trim();
              }  
          } 
        }
     
  for (const a of full_html.querySelectorAll('p')) {
        if (a.textContent.search(/Experience|Year of experience|Years of experience/)>-1
           && a.textContent.indexOf("Fresher")==-1 && a.textContent.trim().length < 80){
    		 a.remove();
         } 
      }
    for (const a of full_html.querySelectorAll('p')) {
        if (a.textContent.search(/Website|Job Title|External Title|Location/)>-1){
    		 a.remove();
         } 
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


