/*
*Link: https://bbt.wd1.myworkdayjobs.com/CRC/fs/searchPagination/318c8bb6f553100021d223d9780d30be/0
!spider congif
{​
"options": {​
"inactivateJQuery": false,
"ignoreLoadErrors": false,
"waitForResources": true,
"waitForPageLoadEvent": true
}​,
"noimage": true,
"skipResources": false,
"noUnnecessaryResources": false
}​
*/
//! Extract-------------------------------------------------------
(function() {​
  var out = {​}​;
  if(typeof pass_it == "undefined") pass_it = {​}​;
  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);
  var total_jobs = json.body.children[3].facetContainer.paginationCount.value; //Job count from page (total jobs to extract)
  if (!pass_it["cont"]) {​
    out["pass_it"] = {​
      "cont": 0,
      "jobs": 0,
      "total_jobs":total_jobs
      //"expected_jobs":expected_jobs_str
    }​;
  }​ else {​
    out["pass_it"] = pass_it;
  }​
  /*var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);*/
  var jobs = json.body.children[3].children[0].listItems;
  var returnedJobs = [];    
  for(i in jobs) {​
    var job = {​}​;//init
    job.title = jobs[i].title.instances[0].text.split(" - ")[0];
    /*if(jobs[i].subtitles[1]){​
      job.location = jobs[i].subtitles[1].instances[0].text.split("-").reverse().join(", ");
      job.location = job.location.split(", More...").shift().trim();
    }​else{​
      job.location = "headquartes";
    }​*/ 
    job.url = "https://bbt.wd1.myworkdayjobs.com"+jobs[i].title.commandLink;
      job.reqid = jobs[i].subtitles[0].instances[0].text;
    //-------------------------------------------------DATE-----------------------------------------
    job.dateposted_raw = jobs[i].subtitles[2].instances[0].text; //Posted Yesterday || Posted x Days Ago || Posted 30+ Days Ago
    job.dateposted_raw = getXDaysBefore(job.dateposted_raw);
    //-------------------------------------------------DATE-----------------------------------------
    //-------------------------------------------------DESCRIPTION-----------------------------------------
    var json_desc = JSON.parse(getDescription(job.url)); //GET to job URL
    job.source_jobtype = json_desc.body.children[1].children[1].children[1].imageLabel;
    job.html = json_desc.openGraphAttributes.description;
    job.html = removeTextBefore(job.html, 'Please review the following job description:', false);
    job.html = removeTextAfter(job.html, 'CRC is an Equal Opportunity', true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement("DIV");
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    //-------------------------------------------------DESCRIPTION-----------------------------------------
    //-------------------------------------------------MULTILOCATION-----------------------------------------
    out["pass_it"].jobs++; //Counts jobs before multilocation starts (for pagination purposes)
    var array = json_desc.body.children[1].children[0].children; //Array for multiple locations
    for (var i in array) {​
      if (array[i].iconName == 'LOCATION') {​
        var jobx = {​}​;
        jobx.title = job.title;
        jobx.url = job.url;
        jobx.location = array[i].imageLabel;
        jobx.reqid = job.reqid;
        jobx.dateposted_raw = job.dateposted_raw;
        if(jobx.location.indexOf('Telecommuter') > -1){​
            jobx.location = 'Telecommuter, '+jobx.location.split(' - ').shift().split(' ').pop();
        }​
        jobx.source_jobtype = job.source_jobtype;
        jobx.html = job.html;
            jobx.jobdesc = job.jobdesc;
        jobx.temp = "2021";
        //msg(jobx)
        if (jobx.title.indexOf('Open application') > -1) {​
          jobx.title = '';
        }​
        if (jobx.title.length > 0) {​
          returnedJobs.push(jobx);
        }​
        // returnedJobs.push(jobx);
      }​
    }​
    //-------------------------------------------------MULTILOCATION-----------------------------------------
    /*job.temp = 4501;
    returnedJobs.push(job);*/
  }​
  //msg(jobs);
  //msg(returnedJobs.length);
  //out["pass_it"].jobs = returnedJobs.length;
  //out["pass_it"].total_jobs = total_jobs;
  out["jobs"]= returnedJobs;
  return out;
}​)();
function getXDaysBefore(dateposted){​ //dateposted = Posted Yesterday || Posted x Days Ago || Posted 30+ Days Ago
  let today = new Date(), dd, mm, yyyy;
  dateposted = dateposted.toLowerCase();
  if(dateposted.indexOf('today') != -1){​
    msg("date doesn't change");
  }​
  else if(dateposted.indexOf('yesterday') != -1){​
    today.setDate(today.getDate() - 1);
  }​
  else if(dateposted.indexOf('+ days ago') != -1){​ //Normally 30+ Days Ago
    today.setDate(today.getDate() - 30); //substracts 30 days from actual date
  }​
  else{​ 
    dateposted = dateposted.replace(/\D/g,''); //Replaces any not number --> Posted 23 Days Ago => 23
    today.setDate(today.getDate() - dateposted);
  }​
  dd = String(today.getDate()).padStart(2, '0'); //sets the day
  mm = String(today.getMonth() + 1).padStart(2, '0'); //sets the month (January is 0!)
  yyyy = today.getFullYear(); //sets the year
  return mm + '/' + dd + '/' + yyyy;
}​
function getDescription(url) {​
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function() {​
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {​
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }​
  }​;
  xhrrequest.send(); 
  return response;
}​
function removeTextBefore(html, text, flag) {​
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {​
    newHtml = newHtml.split(text).pop();
    if (!flag) {​
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }​
  }​
  return newHtml;
}​
function removeTextAfter(html, text, flag) {​
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {​
    newHtml = newHtml.split(text).shift();
    if (!flag) {​
      newHtml = newHtml + "<p>" + text + "</p>";
    }​
  }​
  return newHtml;
}​
//! Pagination-------------------------------------------------------
(function() {​
  var out = {​}​;
  msg(pass_it["cont"])
  if(typeof pass_it == "undefined") pass_it = {​}​;
  if(typeof msg == "undefined") msg = function(x){​return x;}​;
  if (!pass_it["jobs"]) {​
      out["pass_it"] = {​
        "cont": 0,
        "jobs": 0
      }​;
  }​ 
  else {​
    out["pass_it"] = pass_it;
  }​
  var dom             = window.location.protocol + "//" + window.location.hostname; 
  var pagConstant     = window.location.pathname.split("be/").shift() + "be/"; 
  var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
  if (out["pass_it"]["jobs"] == 50){​
    out["pass_it"].cont += 50;
    var url = dom + pagConstant  + out["pass_it"].cont;
    window.location.href = url;
    out["has_next_page"] = true;
  }​ 
  else {​
    out["has_next_page"] = false;
  }​
  return out;
}​)();
    








//OTRA PAGINACIÓN 
(function() {
  var out = {};
  
  if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};
  if (!pass_it["jobs"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } 
  else {
    out["pass_it"] = pass_it;
  }

  var meineJSON = getDescription();   // se registra el JSON en una variable
  var meineObj  = JSON.parse(meineJSON); // Se parsea el JSON 
  // meineObj  = meineObj;              // Se ontiene el valor que se desea del mismo

  var expected = meineObj.body.children[0].facetContainer.paginationCount.value;

  var lastPageNumber = expected;
  lastPageNumber = Number(lastPageNumber);
  lastPageNumber = lastPageNumber/50;
  lastPageNumber = lastPageNumber.toFixed(0);
  lastPageNumber = lastPageNumber * 50;

  msg(lastPageNumber);
  
  var dom             = window.location.protocol + "//" + window.location.hostname; 
  var pagConstant     = window.location.pathname.split("be/").shift() + "be/"; 
  var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
  msg(pass_it["cont"]);

  if (out["pass_it"]["jobs"] > 0 && out["pass_it"].cont < lastPageNumber){
    out["pass_it"].cont += 50;
    var url = dom + pagConstant  + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;
    msg(url);
    window.location.href = url;
    out["has_next_page"] = true;
  } 
  else {
    out["has_next_page"] = false;
  }
  return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", window.location.origin + window.location.pathname.split("/fs").shift().trim() + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/0", false); //URL del ajax que trae la información del job

  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };

  xhrrequest.send();
  return response;
}
    
  
  

