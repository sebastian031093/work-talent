//E
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("tr.jobResultItem");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];

      job.title = elem.querySelector("a.jobTitle").textContent.trim().replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
      job.url = elem.querySelector("a.jobTitle").href.trim();
      job.location = elem.querySelector('div.noteSection span.jobContentEM:nth-child(4)').textContent.trim().replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
      job.reqid = elem.querySelector("div.noteSection span.jobContentEM:nth-child(1)").textContent.trim();
      job.dateposted_raw = elem.querySelector("div.noteSection span.jobContentEM:nth-child(2)").textContent.trim().split(" on ").pop().trim();
  
      job.dateposted_raw = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(2)").textContent.trim().split(" on ").pop().trim();
      var separador = '/';
      var ano = job.dateposted_raw.split(separador)[2];
      var mes = job.dateposted_raw.split(separador)[0];
      var dia = job.dateposted_raw.split(separador)[1];
  
      job.dateposted_raw = mes+"/"+dia+"/"+ano;
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      job.source_jobtype = elem.querySelector("div:nth-child(2) > span:nth-child(2)").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 7723;
      if(job.urk !="https://career4.successfactors.com/career?career_ns=job_listing&career_company=C0000179750P&career_job_req_id=10747"){
        jobs.push(job);
      }
    } 
  
    out["jobs"]= jobs;
    return out;
  })();

  ////////////////////////////////////////////////////////////////
  //P
  (function() {
    var out = {};
  var next_page_selector = 'a[title="Next Page"]'; //selector to identify the next button
  //var last_page_selector = "li.next_disabled"; //selector to identify the last page
   var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
   if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = false;
  }

    out["wait"] = true;
    return out;
})();

////////////////////////////////////////////////////////////////////////
//JD

(function() {
    var out = {};
    var job = {};
    var selector = "div.joqReqDescription";
    var remove_selector = "";
    //var job = pass_it["job"];
  
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selector != "") full_html.querySelector(remove_selector).remove();
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = function(x){return x};
  
    let selectorExpre = 'div.joqReqDescription'; //Selector del jobdata (también puede ser p, div, span)
    let regextwo = '[0-9]{1,2} année d’expérience|[0-9]{1,2} année|[0-9]{1,2} et [0-9]{1,2} ans|BAC+[0-9]{1,2}|[0-9]{1,2} à [0-9]{1,2} ans|Bac + [0-9]{1,}|[+][0-9]{1,2}|[0-9]{1,2}[+]|[0-9]{1,2}ère|[0-9]{1,2} an minimum|[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
    for (const a of document.querySelectorAll(selectorExpre)) {
      if (a.textContent.match(/année|BAC|Bac|years in|expérience|experience|Experience|Expérience/gi)) {
        if (a.textContent.match(regextwo)) {
          job.experience_required = a.innerText.match(regextwo)[0];
          //job.experience_required = job.experience_required.replace("+","Bac +").trim();
        }else{
          job.experience_required = '';
        }
      }
    }
    msg('\x1b[41mjob.experience_required : \x1b[0m'+ job.experience_required);
  
    job.html      = full_html.innerHTML.trim();    
    job.html = removeTextAfter(job.html, "Pour savoir comment nous bâtissons", true);
    job.html = removeTextAfter(job.html, "How are we building the Resolute of the future?", true);
    job.html = removeTextAfter(job.html, "Only selected candidates will", true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
  
  
    if(job.jobdesc.length < 250){
      job.html = "";
      job.jobdesc = job.html;
      job.dateclosed_raw = "01/01/1999";
      job.flag_active = 0;
      msg('\x1b[44mJOB INACTIVO');
    }
  
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