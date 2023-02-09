//https://wwecorp.wd5.myworkdayjobs.com/wwecorp/0/searchPagination/318c8bb6f553100021d223d9780d30be/0
//https://topbuild.wd5.myworkdayjobs.com/ServicePartners_External/0/searchPagination/318c8bb6f553100021d223d9780d30be/0

// Myworkdayjobs  - August 26, 2020 - NEW PAGINATION sin AJAX 


// Spider info


{
"options": {
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForPageLoadEvent": true,
"waitForResources": false
},
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}


// Before Extract

(function() {
var out = {};
out.waitFor = "pre";
out["wait"]= 1500;
return out;
})();



// Extract 

(function() {
  var out = {};
   
  if(typeof pass_it == "undefined") pass_it = {};
 
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0,
        "total_jobs":0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems; //json.body.children[1].children[0].listItems;
    var total_jobs = json.body.children[0].facetContainer.paginationCount.value;

  var returnedJobs = [];  
  for(j in jobs) {
       var job = {};

      
    job.title = jobs[j].title.instances[0].text;
    job.url   = job.url   = window.location.origin + jobs[j].title.commandLink;

    job.temp = "2020";

    if (job.title.length > 1){

    var json_desc = JSON.parse(getDescription(job.url));
     var array = json_desc.body.children[1].children[0].children;
     

      for(var i in array){
        if(array[i].iconName == 'LOCATION'){
          var jobx = {};
          
          jobx.title    = job.title;
          jobx.url      = job.url; 
          jobx.location = array[i].imageLabel;
          
          job.temp      = "2020";
          
  
          //msg(jobx)
           if(jobx.title.indexOf('Open application') > -1) {jobx.title = '';}
           if(jobx.title.length > 0){

            returnedJobs.push(jobx);
        }
         // returnedJobs.push(jobx);
        }
        }
    }
      
  }
//    msg(jobs);
//    msg(returnedJobs.length);
  
    out["pass_it"]["total_jobs"] = total_jobs;
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send(); 
  return response;
}


// Pagination 


(function() {
    var out = {};
    
  if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
      "cont": 50,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

      var expected = out["pass_it"]["total_jobs"]; 
  
      var lastPageNumber = expected;
      lastPageNumber = Number(lastPageNumber);
      lastPageNumber = lastPageNumber/50;
      lastPageNumber = lastPageNumber.toFixed(0);
      lastPageNumber = lastPageNumber * 50;
      //lastPageNumber = lastPageNumber + 50;

       var dom             = window.location.protocol + "//" + window.location.hostname; 
       var pagConstant     = window.location.pathname.split("be/").shift() + "be/"; 
       var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
      
       var url = dom + pagConstant  + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;


    if (out["pass_it"]["jobs"] > 0 && url.indexOf("be/" + lastPageNumber)==-1) {
     
     
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();


// Description 



(function() {
  var out = {};
  var job = {};
  
  var selector = ".GWTCKEditor-Disabled:eq(1)";
 
  var full_html = $(selector);
  
    
    //---------INFO-------------------------------------

     var html_2 = $("#workdayApplicationFrame").text(); 
 
    
    if(html_2.toLowerCase().indexOf("part time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("part-time") > -1 ){job.source_jobtype = "Part time";}
    if(html_2.toLowerCase().indexOf("full time") > -1 ){job.source_jobtype = "Full time";}
    if(html_2.toLowerCase().indexOf("full-time") > -1 ){job.source_jobtype = "Full time";}
    /*
    if(html_2.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){
    if(html_2.search(/CV|resume|cover letter|apply|curriculum/gi)>-1){
     job.source_apply_email = job.html_2.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0]; }
    */
  


    //job.location       = $("").text().trim();
    //job.source_jobtype = $("").text().trim();

    //job.source_empname = $("").text().trim();
    //job.logo           = $("").attr("src");

    //job.source_salary  = $("").text().trim();



      /*----------DATE-POSTED----------------------------
          
      var datum = $("").text().trim();
     
      var cut   = "";

      var day   =  datum.split(cut)[0];
      var month =  datum.split(cut)[1];
      var year  =  datum.split(cut)[2];
          
      job.dateposted_raw  = month +"/"+  day +"/"+ year;

      /*-------------------------------------------------*/

     
  
 //---------REMOVE---------------------------------------
    full_html.find("div[id^=labeledImage]").remove().end().html();
    full_html.find("li:has(button)").remove().end().html();
    full_html.find('a').remove().end().html();
    full_html.find('style, script').remove().end().html();
    full_html.find('input, img, button').remove().end().html();
    full_html.find('div.alert, form').remove().end().html();
   
    full_html.find("h1").remove().end().html();

    full_html.find("footer").remove().end().html();
    full_html.find("li:has(svg)").remove().end().html();
    full_html.find("ul.WGYM.WIYM, .wd-player-media").remove().end().html();
    //
    

   // full_html.find("li:first").remove().end().html();
    //full_html.find("").remove().end().html();

    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();
    //full_html.find("p:contains()").remove().end().html();

 //----------------------------------------------------- 
  
  var full_html = full_html.html();
  
   job.html     = full_html.trim();
 
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
  //job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
  

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