

/*

Ultipro multi-location 
Jobsite: https://recruiting.ultipro.com/SOU1031SOUCB/JobBoard/208ddef8-7478-4f53-8418-831215cfd860/?q=&o=postedDateDesc&w=&wc=&we=&wpst=


*/

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
}


// Extract 

(function () {
    var jobs = [];
    var out  = {};
    var cont = 0;
    var json;
 
  do {

    var data = {"opportunitySearch":{"Top":50,"Skip": cont,"QueryString":"","OrderBy":[{"Value":"postedDateDesc","PropertyName":"PostedDate","Ascending":false}],"Filters":[{"t":"TermsSearchFilterDto","fieldName":4,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":5,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":6,"extra":null,"values":[]}]},"matchCriteria":{"PreferredJobs":[],"Educations":[],"LicenseAndCertifications":[],"Skills":[],"hasNoLicenses":false,"SkippedSkills":[]}};

        $.ajax({
            url: window.location.protocol + "//" + window.location.hostname + window.location.pathname + "/JobBoardView/LoadSearchResults",                                            // 1) url
            headers: {                                                      
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Content-Type":"application/json; charset=utf-8"                // 2) headers
            },
            type: 'POST',                                               // 3) tipo
            dataType: "json",                                           // 4) data que retorna

            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.opportunities; 
                //ToKen = result.;                                      // 5) ruta de los trabajos
                //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                  var dom = window.location.origin + window.location.pathname + "OpportunityDetail?opportunityId=";
                  
                  var reqid = json[i].RequisitionNumber;
                  job.reqid = reqid;
                  
                  
                    job.title = json[i].Title;
                    job.url   = dom + json[i].Id;
                  	job.temp  = "2020";
                  
                    job.title = job.title.split(reqid).shift();
                    job.title = job.title.split(/Remote/i).shift();
                    job.title = job.title.replace(/\{.*?\}/g, '').trim();
                  
                      job.title = job.title.trim();
                      let lastCharTitle = job.title.substr(job.title.length -1);
                       if(lastCharTitle === "-"){job.title = job.title.slice(0,-1).trim();}
                
       
          
                    
                  
           	     /*----------DATE-POSTED----------------------------------*/
				    var datum = json[i].PostedDate;
                        datum = datum.split("T").shift().trim();
                        
                    job.dateposted_raw = getDateFormat(datum,"-",2,1,0);
				 /*------------------------------------------------------*/
               
                    if(json[i].Locations){
                      
                          var locs = json[i].Locations, w;
                              for(w in locs){
                                    if(typeof locs[w] =="function") continue;
                                    if(typeof locs[w] =="number") continue;

							    var jobw = {};

                                  jobw.title    = job.title;
                                  jobw.url      = job.url;
                                  jobw.temp     = job.temp;
                                  jobw.dateposted_raw = job.dateposted_raw;
                                  jobw.reqid = job.reqid;

                                   //Location array "city, state, country"

                                    var city    = locs[w].Address.City,
                                        state   = locs[w].Address.State.Name,
                                        country = locs[w].Address.Country.Name;

                                    var loc = "";
                                    var array_loc = Array();

                                    if(city && city.search(/Remote/i)==-1 & typeof city !== null) array_loc.push(city);
                                    if(state && typeof state !== null) array_loc.push(state);
                                    if(country && typeof country !== null) array_loc.push(country);

								    if(array_loc.length) loc = array_loc.join(", ");

                                    jobw.location = loc;
                                
                                      // Split on city 2
                                      if(jobw.location.indexOf(",")>-1){
                                         let city = jobw.location.split(",")[0].trim();
                                              var preClean = jobw.title.split(city).shift().trim();
                                               if(preClean.length > 10){
                                                   jobw.title = jobw.title.split(city).shift().trim();
                                                      let lastChar = jobw.title.substr(jobw.title.length -1);
                                                        if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                                                          jobw.title = jobw.title.slice(0,-1);}
                                                        }else{
                                                          jobw.title = jobw.title.replace(city,"").trim();
                                                          jobw.title = jobw.title.trim().replace(/^\-|\–/,"").trim();
                                                          }
                                      }   
                                

					              jobs.push(jobw);
                              }
                      }  
              }
                cont += 50;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (json.length > 0);  // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

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

// Pag 



(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

// Jobdata 


(function() {
  var out = {};
  var job = {};
  
  var selector = "div.col-md-18";
 
  var full_html = $(selector);
  
    
    //---------INFO-------------------------------------

    var html_2 = $(selector).text(); 

    // job.location           = $("").text().trim();
      if($("span#JobFullTime") !== null){
       job.source_jobtype     = $("span#JobFullTime").text().trim();
  }
    // job.source_empname     = $("").text().trim();
    // job.logo               = $("").attr("src");
    // job.source_salary      = $("").text().trim();
    // job.dateclosed_raw     = $("").text().trim();

     /*
     if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
     job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];}
     */
  
 //---------REMOVE---------------------------------------


  
    full_html.find('a').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
    full_html.find('style, script, [style="display: none;"],[style="display: none"]').remove().end().html();

    //full_html.find("h1").remove().end().html();

   full_html.find("strong:contains(Creating an account))").remove().end().html();
   //full_html.find("p:contains(When you apply for this job)").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
   //full_html.find("p.p.opportunity-description p:contains()").remove().end().html();
   //full_html.find("p.p.opportunity-description p:contains()").remove().end().html();
   //full_html.find("p.p.opportunity-description p:contains()").remove().end().html();
  


 //----------------------------------------------------- 
  

  var full_html_text = full_html.text();

  if(full_html_text.length < 200){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";


  }else{

  var full_html = full_html.html();
  var desc = document.querySelector("div.col-md-18");  
    for (const a of desc.querySelectorAll('li')) {
      if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
        job.experienced_required = a.textContent.replace(/\(.*?\)/g, '').trim();

      } 
    }

   job.html = full_html.trim();
 
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  job.html = job.html.split("If you are interested in")[0];
  //
 
  //job.html = job.html.split("")[0];


  job.html = job.html.replace("Genuine Spirit of Hospitality","<br>Genuine Spirit of Hospitality");
  //job.html = job.html.replace("","");
    
  if(html_2.indexOf("Qualifications")>-1){
    var after_Qualifications_string_length = html_2.split("Qualifications").pop().trim().length;
    //msg("after_Qualifications_string_length---->" +after_Qualifications_string_length);
    if(after_Qualifications_string_length < 1800){
    job.html = job.html.split("Qualifications")[0];
    }
  }


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