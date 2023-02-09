

(function () {
    var jobs = [];
    var out = {};
    var json;
    var cont = 1000;
    var company_name  = window.location.pathname.split("/").pop().trim();


 // do {

    var data = {"query":{"bool":{"must":{"match_all":{}},"should":{"match":{"userArea.isFeaturedJob":{"query":true,"boost":1}}}}},"sort":[{"_score":"desc"},{"datePosted":"desc"}],"aggs":{"occupationalCategory":{"terms":{"field":"occupationalCategory.raw","size":1000}},"account":{"terms":{"field":"userArea.bELevel1.raw","size":1000}}}};

        $.ajax({
            url: 'https://pm.healthcaresource.com/JobseekerSearchAPI/' + company_name + '/api/Search?size=' + cont,   // 1) url
            headers: {                                                      
                "Accept": "*/*",
                "Content-Type":"application/json; charset=UTF-8"                // 2) headers
            },
            type: 'POST',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            //data: data,
            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.hits.hits; 
                //ToKen = result.;                               // 5) ruta de los trabajos
        //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};
          var dom = "https://pm.healthcaresource.com/cs/"+ company_name +  "#/job/"; 

          job.title    = json[i]["_source"]["title"];
                    job.url      = dom + json[i]["_source"]["userArea"]["jobPostingID"];
                    job.location = json[i]["_source"]["jobLocation"]["address"];
                  
                     job.title = job.title.split("$").shift().trim();
                  
                      job.title = job.title.trim();
                      let lastCharTitle = job.title.substr(job.title.length -1);
                       if(lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "/" ){job.title = job.title.slice(0,-1).trim();}

                  
                            var city  = json[i]["_source"]["jobLocation"]["address"]["addressLocality"];
                            var state = json[i]["_source"]["jobLocation"]["address"]["addressRegion"];
                             city = city.split(" or ").shift().trim();

                            var loc = "";
                            var array_loc = Array();

                            if(city) array_loc.push(city);
                            if(state) array_loc.push(state);

                            if(array_loc.length) loc = array_loc.join(", ");

                            job.location = loc;
                    

                    job.source_jobtype = json[i]["_source"]["employmentType"];

                    job.dateposted_raw = json[i]["_source"]["datePosted"].split("T").shift().trim();
                    job.dateposted_raw = getDateFormat(job.dateposted_raw,"-",2,1,0);
                  
                  job.html    = json[i]["_source"]["userArea"]["jobSummaryDisplay"];  

                   if(typeof job.html !== 'undefined'){
                    job.html = job.html.split("Labor Condition Application Posting Information").shift().trim();

                  }
                   if(typeof job.html !== 'undefined'){
                    
                    job.html = removeTextBefore(job.html, "JOB SUMMARY", false);  
               }
                  
                   // job.html.split("JOB SUMMARY").shift().trim(); 
                job.html    = cleanHTML(job.html);
              job.jobdesc = job.html;
                  
                  
            job.temp = "June/2020";


      if(typeof job.html !== 'undefined'){
               jobs.push(job);
      }
     
                }
                
               // cont++;
            },
            error: function (error) {
                msg(error);
            }
        });
  //  } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml =   text + " " + newHtml;
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

  ///////////////////////////////////////////////////////////////////

  // Obteniendo el valor de la experiencia

  

(function () {
    var jobs = [];
    var out = {};
    var json;
    var cont = 1000;
    var company_name  = window.location.pathname.split("/").pop().trim();


 // do {

    var data = {"query":{"bool":{"must":{"match_all":{}},"should":{"match":{"userArea.isFeaturedJob":{"query":true,"boost":1}}}}},"sort":[{"_score":"desc"},{"datePosted":"desc"}],"aggs":{"occupationalCategory":{"terms":{"field":"occupationalCategory.raw","size":1000}},"account":{"terms":{"field":"userArea.bELevel1.raw","size":1000}}}};

        $.ajax({
            url: 'https://pm.healthcaresource.com/JobseekerSearchAPI/' + company_name + '/api/Search?size=' + cont,   // 1) url
            headers: {                                                      
                "Accept": "*/*",
                "Content-Type":"application/json; charset=UTF-8"                // 2) headers
            },
            type: 'POST',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            //data: data,
            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.hits.hits; 
                //ToKen = result.;                               // 5) ruta de los trabajos
        //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};
          var dom = "https://pm.healthcaresource.com/cs/"+ company_name +  "#/job/"; 

          job.title    = json[i]["_source"]["title"];
                    job.url      = dom + json[i]["_source"]["userArea"]["jobPostingID"];
                    job.location = json[i]["_source"]["jobLocation"]["address"];
                  
                     job.title = job.title.split("$").shift().trim();
                  
                      job.title = job.title.trim();
                      let lastCharTitle = job.title.substr(job.title.length -1);
                       if(lastCharTitle === "-" || lastCharTitle === "," || lastCharTitle === "/" ){job.title = job.title.slice(0,-1).trim();}

                  
                            var city  = json[i]["_source"]["jobLocation"]["address"]["addressLocality"];
                            var state = json[i]["_source"]["jobLocation"]["address"]["addressRegion"];
                             city = city.split(" or ").shift().trim();

                            var loc = "";
                            var array_loc = Array();

                            if(city) array_loc.push(city);
                            if(state) array_loc.push(state);

                            if(array_loc.length) loc = array_loc.join(", ");

                            job.location = loc;
                    

                    job.source_jobtype = json[i]["_source"]["employmentType"];

                    job.dateposted_raw = json[i]["_source"]["datePosted"].split("T").shift().trim();
                    job.dateposted_raw = getDateFormat(job.dateposted_raw,"-",2,1,0);
                  
                  job.html    = json[i]["_source"]["userArea"]["jobSummaryDisplay"];  

                   if(typeof job.html !== 'undefined'){
                    job.html = job.html.split("Labor Condition Application Posting Information").shift().trim();

                  }
                   if(typeof job.html !== 'undefined'){
                    
                    job.html = removeTextBefore(job.html, "JOB SUMMARY", false);  
               }
                  
                  
                  /*
                     for (const a of full_html.querySelectorAll('tr')) {
                      if (a.textContent.search('Location:')>-1){
                         //job.location = a.textContent.trim();
                         //job.source_jobtype = a.textContent.trim();
                      } 
                    }
                  */
                  var full_html = job.html;
                  var div       = document.createElement("div");
                  div.innerHTML = full_html
                  var desc = div;


                   for (const a of desc.querySelectorAll('li')) {
                   if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
                    job.experienced_required = a.textContent;
                   } 
                   }

                  
                  
                   // job.html.split("JOB SUMMARY").shift().trim(); 
                job.html    = cleanHTML(job.html);
                job.jobdesc = job.html;
                  
                  
            job.temp = "June/2020";


      if(typeof job.html !== 'undefined'){
               jobs.push(job);
      }
     
                }
                
               // cont++;
            },
            error: function (error) {
                msg(error);
            }
        });
  //  } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml =   text + " " + newHtml;
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





