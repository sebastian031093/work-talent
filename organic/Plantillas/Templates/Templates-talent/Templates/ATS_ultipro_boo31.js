
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

/*

Nota: Si se extraen los jobs con el JSON debe extraerse el jobtype desde la descripción.
job.source_jobtype     = $("span#JobFullTime").text().trim();

*/

// Before extract ---------------//


// Extract -------------------------------------------------------------------------------------------------------------//

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
                //msg("SUCCES");
                json  = result.opportunities; 
                //ToKen = result.;                                      // 5) ruta de los trabajos
        //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                  var dom = window.location.origin + window.location.pathname + "OpportunityDetail?opportunityId=";
                  
                    job.title    = json[i].Title;
                    job.url      = dom + json[i].Id;
                    
                     //Location array "city, state, country"

                      var city    = json[i].Locations[0].Address.City;
                      var state   = json[i].Locations[0].Address.State.Name;
                      var country = json[i].Locations[0].Address.Country.Name;

                      var loc = "";
                      var array_loc = Array();

                      if(city) array_loc.push(city);
                      if(state) array_loc.push(state);
                      if(country) array_loc.push(country);


                      if(array_loc.length) loc = array_loc.join(", ");

                    job.location = loc;
                  
                    
                    /*----------DATE-POSTED-----------------------------*/

                    var datum = json[i].PostedDate; // 2019-10-07T22:50:45.562Z
                        datum = datum.split("T").shift().trim();
                        
                    job.dateposted_raw = getDateFormat(datum,"-",2,1,0);

                  
                   /*-------------------------------------------------*/

                    job.temp = "2020";

                    jobs.push(job);
                }
                cont += 50;
            },
            error: function (error) {
                //msg(error);
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
// No pagination -----------//

(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();

// Job Description ----------------------------------------------------------------------------------------//

(function() {
  var out = {};
  var job = {};
  
  var selector = "div.col-md-18 p.opportunity-description";
 
  var full_html = $(selector);
  
    
    //---------INFO-------------------------------------

    var html_2 = $(selector).text(); 

    // job.location           = $("").text().trim();
       job.source_jobtype     = $("span#JobFullTime").text().trim();
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
    full_html.find('style, script').remove().end().html();

    //full_html.find("h1").remove().end().html();

   //full_html.find("p:contains(Our Company is an equal employment opportunity employer)").remove().end().html();
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

   job.html = full_html.trim();
 
  //job.html = removeTextBefore(job.html, "", false);
  //job.html = removeTextBefore(job.html, "", false);

  job.html = job.html.split("If you are interested in")[0];
  //job.html = job.html.split("Qualifications")[0];
 
  //job.html = job.html.split("")[0];


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


