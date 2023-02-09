//EXTRACT
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll("div#main > div#content > div[class^=post]");
    var jobs = [];
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
  
    if (!pass_it["urls"]) {
      out["pass_it"] = {
        "cont": 0,
        "no_more_pagination": false,
        "currentUrl": 0,
        "urls": ["https://theugandanjobline.com/search/label/social-sciences-jobs-in-uganda",
                 "https://theugandanjobline.com/search/label/telecommunication-jobs-in-uganda",
                 "https://theugandanjobline.com/search/label/training-and-consultancy",
                 "https://theugandanjobline.com/search/label/transport-and-driver-jobs-in-uganda"],
        "totalJobs": 0,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    if (document.querySelectorAll("div#main > div#content > div[class^=post]").length == 0) {
      var job = {};
      job.title = "jobprueba" + out["pass_it"]["cont"];
      job.url = window.location.href;
  
      jobs.push(job);
    } else {
      for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
  
        var job = {};
        var elem = html_jobs[x];
        job.title = contains("div.entry > p","title",elem).toLowerCase().split(":").pop().replace(/\n/,' ').trim();
        if (job.title.length < 3) {
          job.title = elem.querySelector("h2").textContent.trim();
        }
        job.title = job.title.split(" – ").shift().replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
  
        //if(job.title.indexOf("https:")>-1) { continue;}
        job.url = elem.querySelector("h2 > a").href.trim();
  
        job.location = contains("div.entry > p","Duty Station",elem).toLowerCase().split(":").pop().replace(/\n/,' ').trim();
        if (job.location.search(/.../) > -1) {
          var full_html = getDescription(job.url); 
          var div       = document.createElement("div");
          div.innerHTML = full_html;
          job.location = contains("div.entry > p","Duty ",div).toLowerCase().split(":").pop().replace(/\n/,' ').trim();
        }
        job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(" and ",",").replace(/\//g,",").trim();
        if (job.location.length < 3 || job.location.length > 40 || job.location.search("@") > -1) {
          job.location = "Uganda";
        }
  
        //if(job.url.indexOf("https://theugandanjobline.com/2013/10/it-manager-afrimax.html")>-1) {continue;}
        job.dateposted_raw = elem.querySelector("div > span").textContent.trim().replace(",", '');
        job.dateposted_raw = getDateFormat(job.dateposted_raw, " ",1, 0, 2);
        //DETENER PAGINACIÓN Y FILTRAR JOBS VIEJOS
        var day, month, year, fullClosedDate;
        day   = Number(job.dateposted_raw.split("/")[1]);
        month = Number(job.dateposted_raw.split("/")[0]);
        year  = Number(job.dateposted_raw.split("/")[2]);
  
        fullClosedDate = new Date();
        fullClosedDate.setFullYear(year, month - 1, day);
        var date = fullClosedDate;    
  
        var today   = new Date();
  
        var monthS = (today - date);
        if (monthS > 15552000000){ //6 meses en milisegundos
          msg("EXPIRED JOB. Date closed: " + job.dateposted_raw );
          out["pass_it"].no_more_pagination = true;
        }
        else {
          out["pass_it"].no_more_pagination = false;
        }
  
        //msg(job.dateposted_raw);
  
        job.temp = '04/05/2021';
  
        //if(monthS.toString().indexOf("-")==-1){// To filter expired jobs
  
        //MULTILOCATION
        var flag = false;
        if (job.location.search("–") > -1) {
          var loc = job.location.split("–");
          flag = true;
        }
        else {
          var loc = job.location.split(",");
          if (loc.length > 2) {flag = true;}
        }
  
        if (flag) {
          var c = ', ' + job.location.split(",").pop();
          for (var y = 0; y < loc.length - 1; y++) {
            var jobx = {};
            jobx = {...job};
            msg("MULTIIII: " + jobx.url);
            jobx.location = loc[y].replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
  
            if (jobx.location.toLowerCase().search("west") == -1 && jobx.location.toLowerCase().search("east") == -1 && jobx.location.toLowerCase().search("north") == -1 && jobx.location.toLowerCase().search("south") == -1 && jobx.location.split(",").shift().length > 0) {
              jobx.location = jobx.location + c;
              jobs.push(jobx);
            }
          }  
        }
        else {
          jobs.push(job);
        }
  
        /*if (job.url.indexOf('/2010/') == -1 || job.url.indexOf('/2012/') == -1 || job.url.indexOf('/2013/') == -1
            || job.url.indexOf('/2014/') == -1 || job.url.indexOf('/2015/') == -1 || job.url.indexOf('/2016/') == -1
            || job.url.indexOf('/2017/') == -1 || job.url.indexOf('/2018/') == -1 || job.url.indexOf('2019') == -1 || job.url.indexOf('2019') == -1) {             
          jobs.push(job); 
        }*/
  
      }
    }
  
    /*var job_fantasma = {title:window.location.href};
     jobs.push(job_fantasma);*/
    out["jobs"] = jobs;
    return out;
  })();
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
  
    let day   =  dateRaw.split(cut)[dayPosition].trim(), 
        month =  dateRaw.split(cut)[monthPosition].trim(), 
        year  = dateRaw.split(cut)[yearPosition].trim();
  
  
  
    if (day < 10 && day.length < 2) {day = "0" + day;}
  
  
  
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
      if(month.search(/dec/i)>-1){month = "12";}
    }
    var datum = month +"/"+  day +"/"+ year;
  
    return datum;
  }
  
  function contains(selector,texto,elements){
    let resultado ='';  
    elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto.toLowerCase()).test(elemento.innerText.toLowerCase())){resultado = elemento.textContent}})
    return resultado;
  }
  
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
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

  

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //PAG - Multilink + next button
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    if (typeof msg == "undefined") msg = function(x) { return x; };
  
    var next_page_selector = 'div.navigation > div > a'; 
    var clickable_elem = document.querySelector(next_page_selector);
    if (clickable_elem && !out["pass_it"].no_more_pagination) {
      msg("CLICK NEXT");
      clickable_elem.click();
      out["has_next_page"] = true;
    } 
    else {
      out["pass_it"]["currentUrl"] += 1;
      if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
        var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
        window.location.href = url;
        msg('\x1b[43m URL: ' + url + '\x1b[0m');
        out["has_next_page"] = true;
      } 
      else {
        out["has_next_page"] = false;
      }
    }
  
    out["waitFor"] = "div.navigation > div > a";
    return out;
  })();