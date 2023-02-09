



/*

ICIMS JSON POST MULTILOCATION 

Nota: Los selectores del ATS cambiaron 

*/

// Extract 

(function () {
    var jobs = [];
    var out = {};
   // var cont = 1;
    var json;
    //var ToKen;

  
 // do {

    var data = {"fields":["title","url","postDate","category","locations","description"],"filters":{}};

        $.ajax({
            url: 'https://factual-data-cbc-companies.icims.com/proxy/uxs/portals/search/job?limit=20&offset=0',                                            // 1) url
            headers: {                                                      
                "Accept": "application/json, text/plain, */*",
                "Content-Type":"application/json;charset=UTF-8"                // 2) headers
            },
            type: 'POST',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            //data: data,
            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.jobs; 
                //ToKen = result.;                               // 5) ruta de los trabajos
                //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = "";


                    job.title    = json[i].title;
                    job.url      = dom + json[i].applyUrl;//factual-data-cbc-companies.icims.com/jobs/1423/job;
                    job.location = json[i]['customFields']['Job_AllLocations']['stringValues'][0];
                  
                    job.location = job.location.replace(/US/g,"/US").replace(/^\//,"").trim();
                    
                    job.source_jobtype = json[i]['customFields']['Job_PositionType']['stringValues'][0];

                    
                    var datePosted = json[i].primaryPostedSite.datePosted.split("T")[0];
                job.dateposted_raw = getDateFormat(datePosted,"-",2,1,0);
              
                    job.reqid = json[i].identifier;
                  
                  
                    //split on last comma - title

                    if(job.title.indexOf(" - ")>-1){

                      let deleteFromJobTitle = job.title.split(" - ").pop().trim();
                      if(deleteFromJobTitle.search(/north|south|west|east/i,"")>-1){
                        job.title = job.title.replace(deleteFromJobTitle,"").trim();
                          let lastChar = job.title.substr(job.title.length -1);
                            if(lastChar === "-"){job.title = job.title.slice(0,-1);}
                            }
                      }


                    job.temp = 1;

                    
                  
                  if(job.location.indexOf("/")>-1){
                  
                    var locs = job.location.split("/"), w;
                    
                    for(w in locs){
                      
                        var jobw = {};

                        jobw.title = job.title;
                        jobw.url   = job.url;
                        jobw.source_jobtype = job.source_jobtype;
                        jobw.dateposted_raw = job.dateposted_raw;
                        jobw.reqid = job.reqid;
                        jobw.temp  = job.temp;
                      
                        jobw.location = locs[w];
                      
                        jobw.location = jobw.location.split("-").reverse().join(", ").trim();

                        jobs.push(jobw);

          }
                    
                  
                  }else{
                    
                    job.location = job.location.split("-").reverse().join(", ").trim();
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
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

            day = day.replace(/rd|st|th/,"").trim();    

         if(day < 10 && day.length < 2){day = "0" + day;} 
    
        if(dateRaw.search(/[a-z]/gi)>-1){ 
            if(month.search(/jan/i)>-1){month = "01";}
            if(month.search(/feb|fév/i)>-1){month = "02";}
            if(month.search(/mar/i)>-1){month = "03";}
            if(month.search(/apr|avr/i)>-1){month = "04";}
            if(month.search(/may|mai/i)>-1){month = "05";}
            if(month.search(/jun|juin/i)>-1){month = "06";}
            if(month.search(/jul|juil/i)>-1){month = "07";}
            if(month.search(/aug|août/i)>-1){month = "08";}
            if(month.search(/sep/i)>-1){month = "09";}
            if(month.search(/oct/i)>-1){month = "10";}
            if(month.search(/nov/i)>-1){month = "11";}
            if(month.search(/dec|déc/i)>-1){month = "12";}
          }
   var datum = month +"/"+  day +"/"+ year;
     return datum;
  }

  // DESCRIPTION 

  (function() {
var out = {};
//IFRAME
var idIframe = "#icims_content_iframe";
  var myIframe = document.querySelector(idIframe).contentWindow.document;

var job = {};
  var selector = "div.iCIMS_MainWrapper"; // donde está la descripción
 
job.html = $(selector,myIframe).html(); //con iframe
  if (typeof job.html == 'undefined'){
          job.html = "";
        }



 job.source_salary= $(selector,myIframe).find("p:contains(PAY)").text().replace("PAY","").split(":").pop().trim();

  job.html = $("<div>"+job.html+"</div>").find("div.alert").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_JobOptions").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_PageFooter").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_Navigation").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_Logo").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("div.iCIMS_profilePicture").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("a,div.container-fluid.iCIMS_JobsTable,div.iCIMS_TopHeader").remove().end().html();
  job.html = $("<div>"+job.html+"</div>").find("p:contains(TITLE),p:contains(PAY),p:contains(LOCATION)").remove().end().html();
  
 
 // job.html = job.html.replace("","");
 
  /*
  if(job.html.indexOf("More information about this job")>-1){
  job.html = removeTextBefore(job.html, "More information about this job", true);
    }
  */
  job.html = job.html.split("Options").shift();
    job.html = cleanHTML(job.html);
    job.jobdesc = job.html;


out["job"] = job;
return out;
})();

 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml =  text + " " + newHtml;
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
//Json con PAGINACION---------------------------------


(function () {
  var jobs = [];
  var out = {};
  var cont = 0;
  var jobs_pp = 0;
  var json;
  var seguir = true;
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0 ,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  do {
    var link="https://careers-kleintools.icims.com/proxy/uxs/portals/search/job?limit=20&offset=" + cont;
    var data = {"fields":["title","url","postDate","category","locations","description"],"filters":{}};

    $.ajax({
      url: link,
     // url: link.concat(pass_it["cont"]) ,                                            // 1) url
      headers: {                                                      
        "Accept": "application/json, text/plain, */*",
        "Content-Type":"application/json;charset=UTF-8"                // 2) headers
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      //data: data,
      data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("SUCCES");
        json  = result.jobs; 
        jobs_pp += 20;
        
        
        //ToKen = result.;
        var total = result.total// 5) ruta de los trabajos
        //msg(json.length);
        for (var i = 0; i < json.length; i++) {
          var job = {};

          var dom = "";
      
          
          if(jobs_pp >= total){
            seguir = false;
          }


          job.title    = json[i].title;
          job.url      = dom + json[i].applyUrl;//factual-data-cbc-companies.icims.com/jobs/1423/job;
          job.location = json[i]['customFields']['Job_AllLocations']['stringValues'][0];

          job.location = job.location.replace(/US/g,"/US").replace(/^\//,"").trim();

          job.source_jobtype = json[i]['customFields']['Job_PositionType']['stringValues'][0];


          var datePosted = json[i].primaryPostedSite.datePosted.split("T")[0];
          job.dateposted_raw = getDateFormat(datePosted,"-",2,1,0);

          job.reqid = json[i].identifier;


          //split on last comma - title

          if(job.title.indexOf(" - ")>-1){

            let deleteFromJobTitle = job.title.split(" - ").pop().trim();
            if(deleteFromJobTitle.search(/north|south|west|east/i,"")>-1){
              job.title = job.title.replace(deleteFromJobTitle,"").trim();
              let lastChar = job.title.substr(job.title.length -1);
              if(lastChar === "-"){job.title = job.title.slice(0,-1);}
            }
          }


          job.temp = 1;



          if(job.location.indexOf("/")>-1){

            var locs = job.location.split("/"), w;

            for(w in locs){

              var jobw = {};

              jobw.title = job.title;
              jobw.url   = job.url;
              jobw.source_jobtype = job.source_jobtype;
              jobw.dateposted_raw = job.dateposted_raw;
              jobw.reqid = job.reqid;
              jobw.temp  = job.temp;

              jobw.location = locs[w];

              jobw.location = jobw.location.split("-").reverse().join(", ").trim();

              jobs.push(jobw);

            }


          }else{

            job.location = job.location.split("-").reverse().join(", ").trim();
            jobs.push(job);

          }




        }
        cont+= 20;
      },
      error: function (error) {
        msg(error);
      }
    });
  } while (seguir == true);                                 // 6) condicion de parada

  out["jobs"] = jobs;
  out["pass_it"]["jobs"] = jobs.length;
  return out;
})();
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();

  let day   =  dateRaw.split(cut)[dayPosition].trim(), 
      month =  dateRaw.split(cut)[monthPosition].trim(), 
      year  = dateRaw.split(cut)[yearPosition].trim();

  day = day.replace(/rd|st|th/,"").trim();    

  if(day < 10 && day.length < 2){day = "0" + day;} 

  if(dateRaw.search(/[a-z]/gi)>-1){ 
    if(month.search(/jan/i)>-1){month = "01";}
    if(month.search(/feb|fév/i)>-1){month = "02";}
    if(month.search(/mar/i)>-1){month = "03";}
    if(month.search(/apr|avr/i)>-1){month = "04";}
    if(month.search(/may|mai/i)>-1){month = "05";}
    if(month.search(/jun|juin/i)>-1){month = "06";}
    if(month.search(/jul|juil/i)>-1){month = "07";}
    if(month.search(/aug|août/i)>-1){month = "08";}
    if(month.search(/sep/i)>-1){month = "09";}
    if(month.search(/oct/i)>-1){month = "10";}
    if(month.search(/nov/i)>-1){month = "11";}
    if(month.search(/dec|déc/i)>-1){month = "12";}
  }
  var datum = month +"/"+  day +"/"+ year;
  return datum;
}