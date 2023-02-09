//extract
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('div[id="VacancyList"] > a[class="vacancy-item"]');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.reqid = elem.href.split('/').pop().trim();
    job.title = elem.querySelector('div[class="vacancy-title"]').textContent.trim();
    job.url = elem.href.trim();
    job.location = elem.querySelector('div[class="vacancy-location"]').textContent.trim();
    var dateSel = elem.querySelector('div[class="vacancy-date"]');
    if (dateSel) {
      var actualYear = new Date().getFullYear();
      var pastYear = actualYear - 1;
      var actualMonth = new Date().getMonth() + 1;
      var preDate = dateSel.textContent.trim() + " " + actualYear;
      var postingDate = getDateFormat(preDate, " ", 0, 1, 2);
      if (parseInt(postingDate.split("/")[0]) > actualMonth) {
        var postingArr = postingDate.split("/")
        postingArr[2] = pastYear;
        job.dateposted_raw = postingArr.join("/");
      }
      else {
        job.dateposted_raw = postingDate;
      }
    }
    job.temp = 96;
    jobs.push(job);
  }


  out["jobs"] = jobs;
  return out;
})();
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();
  day = day.replace(/rd|st|th|nd/, "").trim();
  if (day < 10 && day.length < 2) { day = "0" + day; }
  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.search(/jan|january/i) > -1) { month = "01"; }
    if (month.search(/feb?v?|february|fév/i) > -1) { month = "02"; }
    if (month.search(/mar|march|maar/i) > -1) { month = "03"; }
    if (month.search(/apr|abr|april|avr/i) > -1) { month = "04"; }
    if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
    if (month.search(/jun|june|juin/i) > -1) { month = "06"; }
    if (month.search(/jul|july|juil/i) > -1) { month = "07"; }
    if (month.search(/aug|ago|august|août/i) > -1) { month = "08"; }
    if (month.search(/sep|set|september/i) > -1) { month = "09"; }
    if (month.search(/oct|out|october|okt/i) > -1) { month = "10"; }
    if (month.search(/nov|november/i) > -1) { month = "11"; }
    if (month.search(/dec|dez|december|déc/i) > -1) { month = "12"; }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}
//desc
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var full_html = document.querySelector('section[class*="vacancy-detail"]');

  if (full_html) {

    for (const a of full_html.querySelectorAll('p, span')) {
      if (a.textContent.search(/@|http|www./ig) > -1) {
        a.remove();
      }
    }
    for (const a of full_html.querySelector('div[id="detail"]').querySelectorAll('*')) {
      if (a.textContent.search(/$/) > -1) {
        job.source_salary = full_html.querySelector('div[id="detail"]').textContent.split(/[a-zA-Z]\./).pop().split('(').shift().trim();
      }
    }
    full_html.querySelector('div[id="detail"]').remove();

    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe'];

    if (remove_selectors.length > 0) {
      remove_selectors.forEach(remove_selector => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    //job.html = removeTextBefore(job.html, '', false);
    //job.html = removeTextAfter(job.html, '', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    if (job.jobdesc.length < 50) {
      job.html = " ";
      job.jobdesc = " ";
    }
  } else {
    job.html = " ";
    job.jobdesc = " ";
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