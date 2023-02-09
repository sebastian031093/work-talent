//------------------------------------------------- BEFORE -------------------------------------------------------------------------
(function () {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        cont: 0,
        totalJobs: 0,
        newPage: true,
        jobs: []
      }
    }
    else {
      out["pass_it"] = pass_it;
    }
    if (out["pass_it"].newPage) {
      let container = Array.from(document.querySelectorAll("div.job")); // Main job container    // This will contain all the extracted jobs    
      let jobs = container.reduce((jobsArr, elem) => {
        let job = {};
        job.title = elem.querySelector("a").textContent.trim();
        job.location = elem.querySelector("div.additional-jobinfos > div.description > div.grey-description > span#location").textContent.trim();
        job.dateposted_raw = elem.querySelector("div.additional-jobinfos > div.description > div.grey-description > span#online-since").textContent.replace("online seit").trim();
        job.dateposted_raw = new Date(job.dateposted_raw);
        job.dateposted_raw = (job.dateposted_raw.getMonth()+1) +"/"+ job.dateposted_raw.getDate() +"/"+ job.dateposted_raw.getFullYear();
        job.source_empname = elem.querySelector("div.additional-jobinfos > div.description > div.grey-description > span#company").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_apply_email = elem.querySelector("").textContent.trim();
        //job.source_jobtype = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
  
        jobsArr.push(job);
        return jobsArr;
      },
                                  []);
      out["pass_it"].jobs = jobs;
      out["pass_it"].totalJobs = jobs.length;
      container[out["pass_it"].cont].querySelector("a").click();
    }
    else {
      let container = Array.from(document.querySelectorAll("div[ng-repeat*='vacancy']")); // Main job container    
      container[out["pass_it"].cont].querySelector("a").click();
      msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    }
    out.pic = true;
    out.waitFor = ".vacancy-description";
    return out;
  })();
  //------------------------------------------------------------------------EXTRACT---------------------------------------------------------------------------------------
  //extract
(function () {
    var out = {};
    var jobs = [];
    var selector = "div.slim_content > div.slim_text:last-child";
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont];
    var remove_selectors = ["a", "script", "style", "input", "button"];
    var full_html = document.querySelector(selector);
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
      
      job.html = full_html.innerHTML.trim();
      job.url = window.location.href;
      job.temp = 1;
      job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www.\S+|https?\S+|\(\d+\)/gi, "");
      //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
      //job.html = removeTextAfter(job.html, 'E-Mail', true);    
      job.html = removeTextAfter(job.html, 'E-Mail', true);    
      job.html = removeTextAfter(job.html, 'Möchten Sie Ihre berufliche Karriere', true);  
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
    }
    else {
      job.flag_active = 0;
    }
    document.querySelector("div#tjs24-JobDetail > div.tjs24-Navigation > a.tjs24-Back:first-child").click();
    jobs.push(job);
    out["jobs"] = jobs;
    out.wait = true;
    out.html = true;
    out.pic = true;
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
  //------------------------------------------------------------------------ PAGINATION ----------------------------------------------------------------------------
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
      out["pass_it"].nextPage = false;
      out["pass_it"].cont += 1;
      out["has_next_page"] = true;
      msg("Another Job");
    } else {
      var next_page_selector = "div#tjs24-PageCount > a.selected"; //selector to identify the next button      
      var clickable_elem = document.querySelector(next_page_selector).nextElementSibling;
      //stop condition    
      if (!document.querySelector(next_page_selector)) {
        //last page      msg("END OF PAGINATION");
        out["has_next_page"] = false;
        out["pass_it"].nextPage = false;
      } else {
        //go to next page      
        msg("Another page");
        out["pass_it"].cont = 0;
        out["pass_it"].totalJobs = 0;
        clickable_elem.click();
        out["has_next_page"] = true;
        out["pass_it"].nextPage = true;
      }
    }
    msg(out["pass_it"].cont);
    out.html = true;
    out.pic = true;
    out.wait = true;
    return out;
  })();