//Infinity
(function () {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;
  var urls = ['https://arentfoxselfapply.viglobalcloud.com/viRecruitSelfApply/ReDefault.aspx?Tag=515dc682-b937-46cf-86fb-6741295b59ab', 'https://arentfoxselfapply.viglobalcloud.com/viRecruitSelfApply/ReDefault.aspx?Tag=e9143172-49f2-4a4b-a556-024df57423a4']; //Declarar urls del multilink
  if (!pass_it["urls"]) {
    out["pass_it"] = {
      "currentUrl": 0,
      "urls": urls,
      "selectOptions": [],
      "pageChange": false,
      "selectOptionPos": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  window.location.href = urls[0];
  out.wait = true;
  return out;
})();
//Before Extract
(function() {
  var out = {};
  out.pass_it = pass_it;
  if(out.pass_it.pageChange){
    for(const a of document.querySelectorAll('select[id="contentPlaceHolder_ddListSearchCategory"] option')){
      out.pass_it.selectOptions.push(a.getAttribute('value'));
    }
    out.pass_it.pageChange = false;
    msg(out.pass_it.selectOptions);
  }else if(out.pass_it.selectOptionPos == 0){
    for(const a of document.querySelectorAll('select[id="contentPlaceHolder_ddListSearchCategory"] option')){
      out.pass_it.selectOptions.push(a.getAttribute('value'));
    }
    msg(out.pass_it.selectOptions);
  }else{
    msg(out.pass_it.selectOptions[out.pass_it.selectOptionPos]);
    document.querySelector('select[id="contentPlaceHolder_ddListSearchCategory"]').value = out.pass_it.selectOptions[out.pass_it.selectOptionPos];
    document.querySelector('a[id="contentPlaceHolder_linkSearch"]').click();
  }
  out.wait = true;
  out.pic = true;
  return out;
})();
//Extract
(function () {
  var out = {};
  out.pass_it = pass_it;
  var html_jobs = document.querySelectorAll('div[id="contentPlaceHolder_panelPositionsList"] div[class="row"]');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.reqid = elem.querySelector('a').href.split('=').pop().trim();
    job.title = elem.querySelector('h4').textContent.trim();
    job.url = elem.querySelector('a').href.trim();
    job.location = elem.nextElementSibling.textContent.split(/\s{2,}/g).shift().trim();
    job.temp = 96;
    jobs.push(job);
  }
  var job = {};
  job.title = out.pass_it.selectOptionPos;
  jobs.push(job);

  out["jobs"] = jobs;
  return out;
})();
//Pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  if (typeof msg == "undefined") msg = function (x) { return x; };

  if((out.pass_it.selectOptionPos + 1) >= out.pass_it.selectOptions.length){
    out.pass_it.pageChange = true;
    out.pass_it.selectOptions = [];
    out.pass_it.selectOptionPos = 0;
    out["pass_it"]["currentUrl"] += 1;
    if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
      var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
  }else{
    out.pass_it.selectOptionPos += 1;
    out["has_next_page"] = true;
  }

  out.wait = true;
  return out;
})();
//Job Desc
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var full_html = document.querySelector('section[class="content"]');

  if (full_html) {

    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

    if (remove_selectors.length > 0) {
      remove_selectors.forEach(remove_selector => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }

    for (const a of full_html.querySelectorAll('p, span, li')) {
      if (a.textContent.search(/@|http|www./ig) > -1) {
        a.remove();
      }
    }

    if(full_html.textContent.search('Experience:') > -1){
      if(full_html.textContent.split('Experience:').pop().split('years').shift().match(/[0-9]/)){
        job.experience_required = full_html.textContent.split('Experience:').pop().split('years').shift().trim() + ' years';
      }
    }
    if(full_html.textContent.search('DATE:') > -1){
      if(full_html.textContent.split('DATE:').pop().split(/\n/).shift().match(/[0-9]/)){
        job.dateposted_raw = full_html.innerHTML.split('DATE:').pop().split('<br>').shift().trim() + ' 1';
        job.dateposted_raw = job.dateposted_raw.split(' ')[0] + '/' + job.dateposted_raw.split(' ')[2] + '/' + job.dateposted_raw.split(' ')[1];
        job.dateposted_raw = job.dateposted_raw.replace(/January|Jan/i, '1');
        job.dateposted_raw = job.dateposted_raw.replace(/February|Feb/i, '2');
        job.dateposted_raw = job.dateposted_raw.replace(/March|Mar/i, '3');
        job.dateposted_raw = job.dateposted_raw.replace(/April|Apr/i, '4');
        job.dateposted_raw = job.dateposted_raw.replace(/May/i, '5');
        job.dateposted_raw = job.dateposted_raw.replace(/June|Jun/i, '6');
        job.dateposted_raw = job.dateposted_raw.replace(/July|Jul/i, '7');
        job.dateposted_raw = job.dateposted_raw.replace(/August|Aug/i, '8');
        job.dateposted_raw = job.dateposted_raw.replace(/September|Sep/i, '9');
        job.dateposted_raw = job.dateposted_raw.replace(/October|Oct/i, '10');
        job.dateposted_raw = job.dateposted_raw.replace(/November|Nov/i, '11');
        job.dateposted_raw = job.dateposted_raw.replace(/December|Dec/i, '12');
      }
    }

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    job.html = removeTextBefore(job.html, 'JOB SUMMARY', false);
    //job.html = removeTextAfter(job.html, '', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    if (job.jobdesc.length < 50) {
      job.flag_active = 0;
      job.html = " ";
      job.jobdesc = " ";
    }
  } else {
    job.flag_active = 0;
    job.html = " ";
    job.jobdesc = " ";
  }
  out["job"] = job;
  return out;

})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }
  }
  return newHtml;
}