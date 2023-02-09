/* SPIDER COFING

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
    var html_jobs = document.querySelectorAll("div.job-list table tbody tr");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("td:nth-child(1) a").textContent.trim();
      job.url = elem.querySelector("td:nth-child(1) a").href.trim();
      job.reqid = job.url.split('/')[job.url.split('/').length - 1].split('?').shift().trim();
      if(elem.querySelector("td:nth-child(2)").textContent.trim() != ''){
        job.location = elem.querySelector("td:nth-child(2)").textContent.trim()+', Brasil';
      }else{
        job.location = 'Salvador de Bahía, Brasil'; // Locacion de la oficina central para jobs sin locacion
      }
      job.title = job.title.split('|')[0].trim();
  
  
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      if(!job.title.includes('Banco de Talentos')){ // Se filtran los jobs que no presentan un job concreto si no una posicion abierta
        jobs.push(job);
      }
    } 
  
    out["jobs"]= jobs;
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
  
    var selector = 'div.description';
  
    if (document.querySelector(selector)) {
  
      var full_html = document.querySelector(selector);
  
      //var job = pass_it["job"];
      //--------------------------JOB-INFO ------------------------------------//
      //job.location       = document.querySelector('').textContent.trim();
      //job.source_jobtype = document.querySelector('').textContent.trim();
  
      //let datePosted     = document.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
      //---------------------------------------------------------------------//
  
      // To Remove selectors 
      for (const a of full_html.querySelectorAll('a, img, script, style, button, div.share-links-container, ul.description__social, p.description__button, div.description__about')) {
        if (a) {
          a.remove();
        }
      }
  
  
      for (const a of full_html.querySelectorAll('h2')) {
        if (a.textContent.search(/ACREDITAMOS NAS PESSOAS E/i)>-1){
          a.remove();
        } 
      }
  
      /*
      for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.search(/Apply Today/)>-1){
          //job.location = a.textContent.trim();
          //job.source_jobtype = a.textContent.trim();
          a.nextElementSibling.remove();
      } 
      }
      */
  
      if (cleanHTML(full_html.textContent).trim().length < 50) {
  
        job.flag_active = 0;
        job.html = "";
        job.jobdesc = "";
  
      } else {
  
        job.html = full_html.innerHTML.trim();
  
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
  
        job.html = job.html.split("Conheça mais sobre nós").shift();
        //job.html = job.html.split("").shift();
        //job.html = job.html.split("").shift();
        //job.html = job.html.split("").shift();
  
        //job.html = job.html.replace("","");
        //job.html = job.html.replace("","");
  
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
      }
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
