//before
(function() {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
          cont: 0,
          totalJobs: 0,
          jobs: []
        }
    }
    else {
      out["pass_it"] = pass_it;
    }
  let container = Array.from(document.querySelectorAll('.vacancies .job')); // Main job container
  msg(container.length);
  if (out["pass_it"].totalJobs === 0) {
      let jobs = [];// This will contain all the extracted jobs
    for(let i = 0; i < container.length; i++){
      let job = {};
      var elem = container[i];
      job.title = elem.querySelector('.job_title a').textContent.trim();
      job.url = elem.querySelector('.job_title a').href.trim();
      job.reqid = job.url.split("v=").pop();
      job.location = elem.querySelector('.job_location').textContent.trim() + ', England, GB';
      job.temp = 1;
      jobs.push(job);
    } 
    out["pass_it"].jobs = jobs;
    out["pass_it"].totalJobs = jobs.length;
    container[out["pass_it"].cont].querySelector("a").click();
  }
  else {
    container[out["pass_it"].cont].querySelector("a").click();
    msg("Clicked Job = "  + out["pass_it"].jobs[out["pass_it"].cont].title);
  } 
    out.waitFor = 'div[class="columns col60"]';
    return out;
  })();
  
  //extract 
  (function() {
    var out = {};
    var jobs = [];
    var selector = 'div[class="columns col60"]';
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont];
    //var remove_selectors = ["a","script","style","input","button"];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
      job.html      = full_html.innerHTML.trim();
      var emailRegex = /[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}/i;
      if (job.html.search(emailRegex) > -1) job.source_apply_email = job.html.match(emailRegex)[0].trim();
      job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|https?:\/\/\S+|loading.?.?.?/gi, "");
      //job.html = removeTextBefore(job.html, 'Descrição', false);
      //job.html = removeTextAfter(job.html, 'Application Instructions', true);
      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc); 
    }
    else {
        job.title += " => Invalid job";
        job.url = "";
        job.html = "";
        job.jobdesc= "";	
    }     
    window.history.back();
    jobs.push(job);
    out["jobs"] = jobs;
    out.waitFor = '.vacancies .job';
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
  //Pagination
  (function() {
    var out = {};
    out["pass_it"] = pass_it;
    
      if (out["pass_it"].cont < (out["pass_it"].totalJobs -1)) {
          out["pass_it"].cont += 1;
          out["has_next_page"] = true;
      }
      //stop condition
      else {
          out["has_next_page"] = false;
      }
      msg(out["pass_it"].cont);
      return out;
  })();