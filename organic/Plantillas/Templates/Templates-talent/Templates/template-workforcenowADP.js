//workforcenow.adp
//jobsite https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=74015a75-000a-4ccd-a4fd-5b28c18a4cdf&ccId=19000101_000001&type=JS&lang=en_US
//json get

//spider config
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

//before extract
(function() {
    var out = {};
    out.waitFor = "pre";
    out["wait"]= 1500;
    return out;
})();

//extract
(function() {
  var out = {};
  // var html_jobs = document.querySelectorAll("");
  //  This gives you an HTMLElement object
  if(typeof pass_it == "undefined") pass_it = {};
  //msg("***************************************");
  //msg(pass_it);
  //msg(window.location.href);
  //msg("***************************************");
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  //var element = document.querySelector("pre").textContent;
  //msg(element);
  //var jobs =  pass_it["json"];
  var returnedJobs = [];    
     try{
       var element = document.querySelector("pre").textContent;
      //msg(element);
       var json = JSON.parse(element);
       var jobs = json.jobRequisitions; //agregar donde se encuentran los jobs
      // out["json"] = jobs;
     }catch(error){
        out["wait"] = 500;
      
     }
  //msg(typeof(jobs));
  for(i in jobs) {
    
    var job = {};/*init*/
 //se tomaron los datos de la url del jobsite
    var currentURLdomConstant = "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?";
    var cidTillType           = "cid=74015a75-000a-4ccd-a4fd-5b28c18a4cdf&ccId=19000101_000001&type=JS"; 
    
    var jobId                 = jobs[i].itemID;
    var lang                  = "&lang=en_US";

    job.title = jobs[i].requisitionTitle;
    job.reqid = jobs[i].itemID;
    job.url = currentURLdomConstant + cidTillType + "&jobId=" + jobId  + lang;
    var datum  = jobs[i].postDate.split("T")[0];
    job.dateposted_raw = getDateFormat(datum,"-",2,1,0);
    /*if(jobs[i].workLevelCode.shortName){
      job.source_jobtype = jobs[i].workLevelCode.shortName;
    }*/
      // Multi-location 
    if(jobs[i].requisitionLocations[0].nameCode.shortName){
      var locs = jobs[i].requisitionLocations; 
      for (var w in locs) {
        job.location += "/" + locs[w].nameCode.shortName + "/";
        job.location = job.location.replace(/undefined/gi).trim();
        var lastCharLoc = job.location.substr(job.location.length -1);
        if(lastCharLoc === "/"){
          job.location = job.location.slice(0,-1).trim();
        }
      } 
    }else{
        job.location = "US";
    }
    
    if(job.location.indexOf("/")>-1){           
      let splitOnFirstCommaLoc = job.location.split("/").shift().trim(); 
      job.location = job.location.replace(splitOnFirstCommaLoc,"").trim();

      let firstCharLoc = job.location.charAt(0);
      if(firstCharLoc === "/"){job.location = job.location.slice(1).trim();}

    }    

     //---------------------------------------------------------

      job.temp = "MAR-2021";
    
    if(job.location.indexOf(",")>-1){           
      let numberOfCommas = job.location.match(/\,/g).length;  
      if(numberOfCommas == 2){ 
       var state   = job.location.split(",")[1].trim();
        job.title = job.title.split(state).shift().trim();
      }
    } 
     
    if (job.location.indexOf("/") > -1) {
      var locclean = job.location;
      var locs = locclean;
      locs = locs.split('/');
      for (var l in locs) {
        var jobx = {};
        jobx.title    = job.title;
        jobx.url      = job.url;
        jobx.reqid = job.reqid;
        jobx.location = locs[l].split('County NY,').pop().trim();
        jobx.dateposted_raw = job.dateposted_raw;
       // jobx.source_jobtype = job.source_jobtype;
        jobx.temp     = job.temp;
        if(jobx.location.length > 0){returnedJobs.push(jobx);} 
      }
    }else {
      job.location = job.location.split('County NY,').pop().trim(); 
      returnedJobs.push(job);
    }
  }
  //msg(jobs);
  //msg(returnedJobs.length);
  out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
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
         dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
            
          let day   =  dateRaw.split(cut)[dayPosition].trim(), 
              month =  dateRaw.split(cut)[monthPosition].trim(), 
              year  = dateRaw.split(cut)[yearPosition].trim();
  
              day = day.replace(/rd|st|th/i,"").trim();    
  
           if(day < 10 && day.length < 2){day = "0" + day;} 
      
          if(dateRaw.search(/[a-z]/gi)>-1){ 
            //English, Dutch, French
              if(month.search(/jan/i)>-1){month = "01";}
              if(month.search(/feb|fév/i)>-1){month = "02";}
              if(month.search(/mar|maar/i)>-1){month = "03";}
              if(month.search(/apr|avr/i)>-1){month = "04";}
              if(month.search(/may|mai|mei/i)>-1){month = "05";}
              if(month.search(/jun|juin/i)>-1){month = "06";}
              if(month.search(/jul|juil/i)>-1){month = "07";}
              if(month.search(/aug|août/i)>-1){month = "08";}
              if(month.search(/sep/i)>-1){month = "09";}
              if(month.search(/oct|okt/i)>-1){month = "10";}
              if(month.search(/nov/i)>-1){month = "11";}
              if(month.search(/dec|déc/i)>-1){month = "12";}
            }
     var datum = month +"/"+  day +"/"+ year;
       return datum;
    }

//pagination
(function() {
    var out = {};
    
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;

      if (out["pass_it"]["jobs"] < 20) { 
        //last page
 
        
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 20;
       
      var domConstant = 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?';//window.location.origin + window.location.pathname;
      var cid  = "cid=74015a75-000a-4ccd-a4fd-5b28c18a4cdf&timeStamp=1616012115897&lang=en_US&iccFlag=yes&eccFlag=yes&ccId=19000101_000001&locale=en_US&";
      var top = '&$top=20';
      var url = domConstant + cid + "&$skip=" + out["pass_it"].cont + top;

      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    return out;
    })(); 
   
//jobdata
(function() {
  var out = {};
  var job = {};
  
  var selector = ".job-description-data-item";
 
  var full_html = $(selector);
  
    
    //---------INFO-------------------------------------

    var html_2 = $(selector).text(); 

    // job.location           = $("").text().trim();
     job.source_jobtype     = $("div.job-description-details-sub-left-container span.job-description-worker-catergory").text().trim();

   
     /*var exp_eng = $('p:contains(experience)') !== null;
  if(exp_eng){
    
    let x = $('p:contains(experience)').text().trim();
      if(x.search(/[0-9]/g)>-1){
      job.experience_required = x.replace("·","").trim();
      }  */
   // full_html.find("p:contains(experience)").remove().end().html();
  }
  
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

   full_html.find("strong:contains(NOTE:)").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
   //full_html.find("p:contains()").remove().end().html();
  

    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();
    //full_html.find("").remove().end().html();

 //----------------------------------------------------- 
  

  var full_html_text = full_html.text();

 

  //if(full_html_text.trim().length < 200 || full_html_text.indexOf("no description available")>-1){
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