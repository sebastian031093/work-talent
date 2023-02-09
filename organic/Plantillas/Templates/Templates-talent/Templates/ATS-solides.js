
// HOW TO GET URL ==> https://prnt.sc/110suu9 
// URL EXAMPLE    ==> https://api.solides.jobs/v2/vacancy/search?reference_id=41118&search=&page=1&pagination=25

/* SPIDER CONFIG
{
    "options": {
        "inactivateJQuery": false,
        "ignoreLoadErrors": false,
        "waitForPageLoadEvent": false,
        "waitForResources": false
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
}
*/

//EXTRACT

(function() {
    var out = {};
    if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0,
        'limit': 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
  
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
  
    var jobs = json.data;
    out["pass_it"]["limit"] = json.totalCount;
    msg(out["pass_it"]["limit"])
    var returnedJobs = [];  
  
    for(j in jobs) {
      var job = {};
      job.title = jobs[j].name;
      if(jobs[j].city){
        job.location = jobs[j].city.name + ', ' + jobs[j].state.name + ', Brasil';
      } else {
        job.location = 'Salvador de Bahía, Brasil';
      }
  
      job.url = jobs[j].linkVacancy;
      job.reqid = jobs[j].id;
      //job.dateposted_raw = jobs[j].subtitles[2].instances[0].text;
      job.temp = 1; 
      returnedJobs.push(job);
  
      //   returnedJobs.push(job);
  
  
  
    }
    //    msg(jobs);
    //   msg(returnedJobs.length);
  
    out["pass_it"]["jobs"] = out["pass_it"]["jobs"] + jobs.length;
    msg(out["pass_it"]["jobs"])
    out["jobs"]= returnedJobs;
    return out;
  })();
//PAGINATION
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
  })();
//JOBDATA
(function () {//Dec-2020

    var out = {};
    var job = {};
  
    var selector = 'div#vacancyDescription';
  
    if (document.querySelector(selector)) {
  
      var full_html = document.querySelector(selector);
  
      var job = pass_it["job"];
      //--------------------------JOB-INFO ------------------------------------//
      //job.location       = document.querySelector('').textContent.trim();
      //job.source_jobtype = document.querySelector('').textContent.trim();
  
      //let datePosted     = document.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
      //---------------------------------------------------------------------//
  
      // To Remove selectors 
      for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
        if (a) {
          a.remove();
        }
      }
  
      var datoAEliminar = job.location.split(',')[1].trim().slice(0,-3).toLocaleUpperCase() + 'COMPARTILHAR';
      //var datoAEliminar2 = job.location.split(',')[1].trim().slice(0,-3).toLocaleUpperCase() + 'COMPARTILHAR';
  
  
      job.html = full_html.innerHTML.trim();
  
      //job.html = removeTextBefore(job.html, job.title, true);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
  
  
  
      job.html = job.html.split("20 Vagas").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
  
      //job.html = job.html.replace("/ BACOMPARTILHAR","");
      //job.html = job.html.replace("","");
  
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
  
      job.html = job.html.split(datoAEliminar).pop();
      job.html = job.html.split("SPCOMPARTILHAR").pop();
      job.html = job.html.split("PBCOMPARTILHAR").pop();
      job.html = job.html.split("SECOMPARTILHAR").pop();
      
  
  
  
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
  
    } else {
  
      job.flag_active = 0;
      job.html = "";
      job.jobdesc = "";
  
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

