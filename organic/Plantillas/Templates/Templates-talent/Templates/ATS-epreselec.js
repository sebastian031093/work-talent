//PAGINATION
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
  })();


//EXTRACT
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("div.onepage-ofertas ul li");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("span.op-titulo").textContent.trim();
  
      var base_url = window.location.href.trim() +'?Id_Oferta=';
      job.reqid = elem.querySelector("a").getAttribute("data_idoferta").trim();
  
  
      job.url = base_url + job.reqid;
      job.location = elem.querySelector(".op-fecha").textContent.trim();
      job.location = getDateFormat(job.location, ' ',0,2,3);
  
      //job.dateposted_raw = elem.querySelector("").textContent.trim();
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
  function withCero(n) {
    return n < 10 ? '0' + n : n;
  }
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
      dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
      let day = dateRaw.split(cut)[dayPosition].trim(),
          month = dateRaw.split(cut)[monthPosition].trim(),
          year = dateRaw.split(cut)[yearPosition].trim();
  
      day = day.replace(/rd|st|th/i, "").trim();
      if (day < 10 && day.length < 2) { day = "0" + day; }
      if (year.length == 2) { year = "20" + year; }
  
      if (dateRaw.search(/[a-z]/gi) > -1) {
          //Spanish
          if (month.search(/ener/i) > -1) { month = "01"; }
          if (month.search(/feb/i) > -1) { month = "02"; }
          if (month.search(/mar/i) > -1) { month = "03"; }
          if (month.search(/abr/i) > -1) { month = "04"; }
          if (month.search(/may/i) > -1) { month = "05"; }
          if (month.search(/jun/i) > -1) { month = "06"; }
          if (month.search(/jul/i) > -1) { month = "07"; }
          if (month.search(/ago/i) > -1) { month = "08"; }
          if (month.search(/sep/i) > -1) { month = "09"; }
          if (month.search(/oct/i) > -1) { month = "10"; }
          if (month.search(/nov/i) > -1) { month = "11"; }
          if (month.search(/dic/i) > -1) { month = "12"; }
      }
      var datum = month + "/" + day + "/" + year;
      return datum;
  }
//JOBDATA
(function () {//Dec-2020

    var out = {};
    var job = {};
  
    var selector = 'div#divVacanciesContent';
  
    if (document.querySelector(selector)) {
  
      var full_html = document.querySelector(selector);
  
      //var job = pass_it["job"];
      //--------------------------JOB-INFO ------------------------------------//
      job.location       = document.querySelector('div[id*="LocalidadOferta"] span[id*="LocalidadText"]').textContent.trim();
      job.location       = job.location + ', '+ document.querySelector('div[id*="ProviniciaOferta"] span[id*="ProvinciaText"]').textContent.trim();
      job.location       = job.location + ', España' ;
      
      //job.source_jobtype = document.querySelector('').textContent.trim();
  
      //let datePosted     = document.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(datePosted,"/",1,0,2);
      //---------------------------------------------------------------------//
  
      // To Remove selectors 
      for (const a of full_html.querySelectorAll('a, img, script, style, button, h1, div.avisos, div[class="col-md-12 onepage-rinfo"], div.boton_both, div.avisos, iframe')) {
        if (a) {
          a.remove();
        }
      }
  
      /*     
      for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.search(//i)>-1){
            //job.location = a.textContent.trim();
            //job.source_jobtype = a.textContent.trim();
            a.remove();
      } 
      }
      */
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
  
        job.html = removeTextBefore(job.html, "Descripción", false);
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextBefore(job.html, "", false);
  
        //job.html = job.html.split("").shift();
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
  