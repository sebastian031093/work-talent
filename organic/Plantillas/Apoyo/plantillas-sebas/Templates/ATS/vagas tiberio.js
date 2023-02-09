//before extract
(function () {
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
  let container = Array.from(document.querySelectorAll("table#Pr2Bn > tbody > tr:not(:first-child):not(:nth-child(2))")); // Main job container
  if (out["pass_it"].totalJobs === 0) {
    let jobsArr = [];
    // This will contain all the extracted jobs
    let jobs = container.reduce((jobsArr, elem) => {
      let job = {};
      job.title = elem.querySelector("a").textContent.replace(/full time | part time/gi, '').trim();
      job.reqid = elem.querySelector("#PrTd").textContent.trim();
      job.url = "https://www.vagas.com.br/tiberio";
      var locDate = elem.querySelector("td:nth-child(2)").textContent.replace(job.title, "").replace(job.reqid, "").trim().split("aberta em");
      job.location = locDate.shift().replace(/\//gi, ", ").trim();
      if (locDate.length > 0) {
        var actualYear = new Date().getFullYear();
        var pastYear = actualYear - 1;
        var actualMonth = new Date().getMonth() + 1;
        var preDate = locDate.pop().split("-").shift().replace(/[^\d|\/]/gi, "").trim() + "/" + actualYear;
        var postingDate = preDate.split("/")[1] + "/" + preDate.split("/")[0] + "/" + preDate.split("/")[2];
        if (parseInt(postingDate.split("/")[0]) > actualMonth) {
          var postingArr = postingDate.split("/");
          postingArr[2] = pastYear;
          job.dateposted_raw = postingArr.join("/");
        }
        else {
          job.dateposted_raw = postingDate;
        }
        //job.dateposted_raw = preDate[1] + "/" + preDate[0] + "/" + preDate[2];
      }
      job.temp = 1;
      jobsArr.push(job);
      return jobsArr;
    },
      []);
    out["pass_it"].jobs = jobs;
    out["pass_it"].totalJobs = jobs.length;
    container[out["pass_it"].cont].querySelector("a").click();
  }
  else {
    container[out["pass_it"].cont].querySelector("a").click();
    msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
  }
  out.pic = true;
  out.html = true;
  out.waitFor = "#Pr2C > tbody > tr:nth-child(2) > td";
  return out;
})();

//extract
(function () {
  var out = {};
  var jobs = [];
  var selector = "#Pr2C > tbody > tr:nth-child(2) > td";
  out["pass_it"] = pass_it;
  var job = out["pass_it"].jobs[out["pass_it"].cont];
  var remove_selectors = ["a", "script", "style", "input", "button"];
  document.querySelector("#Pr2Tn").remove();
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
  if (typeof msg == "undefined") msg = console.log;
  if (full_html) {
    job.html = full_html.innerHTML.trim();
    var emailRegex = /[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}/i;
    if (job.html.search(emailRegex) > -1) job.source_apply_email = job.html.match(emailRegex)[0].trim();
    job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|https?:\/\/\S+|loading.?.?.?/gi, "");
    var salaryRegex = /(\£|\$|\€)\d{2,}(,?.?\s?)?(\d+)?/gi;
    if (job.html.search(salaryRegex) > -1) job.source_salary = "R" + job.html.match(salaryRegex)[0].trim();
    job.html = removeTextBefore(job.html, 'Descrição', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
  }
  else {
    job.html = "";
    job.jobdesc = "";
  }
  window.location.href = "https://www.vagas.com.br/tiberio"; //This is the href from the first step, this will                                                   
  jobs.push(job);
  out["jobs"] = jobs;
  out.waitFor = "td[align*='left']:nth-of-type(2) > a";
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

//pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;

  if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
    out["pass_it"].cont += 1;
    document.querySelector("td[align*='left']:nth-of-type(2) > a").click(); //This is optional if we do not need to click the button.
    out["has_next_page"] = true;
  }
  //stop condition
  else {
    out["has_next_page"] = false;
  }

  out.waitFor = "table#Pr2Bn > tbody > tr:not(:first-child):not(:nth-child(2))";
  msg(out["pass_it"].cont);
  out.pic = true;
  return out;
})();

//infinity
(function () {
  var out = {};
  document.querySelector("td[align*='left']:nth-of-type(2) > a").click();
  out.waitFor = "table#Pr2Bn > tbody > tr:not(:first-child):not(:nth-child(2))";
  return out;
})();

