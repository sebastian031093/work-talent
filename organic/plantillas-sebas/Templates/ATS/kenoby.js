//Extract
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('div[class="positions"] > div[class="container"] > a');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.reqid = elem.href.split('/').pop().split('?').shift().trim();
    job.title = elem.textContent.replace(elem.querySelector('span').textContent, '').replace(/C.d\.*\s*[0-9]*\s*-*/g, '').trim();
    if(job.title[0] == '-'){
      job.title = job.title.slice(1, job.title.lentgh);
    }
    job.url = elem.href.split('?').shift().trim();
    job.location = elem.querySelector('span').textContent.replace(/\s{2,}/g, '').replace('/', ', ').trim();
    job.temp = 96;
    if (job.title.search(/Banco de Talentos|Talent Pool/ig) == -1) {
      jobs.push(job);
    }
  }

  out["jobs"] = jobs;
  return out;
})();

//Desc
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var full_html = document.querySelector('div[class="description"]');

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
      if (a.textContent.search(/@|http|www.|Local de trabalho/ig) > -1) {
        a.remove();
      }
      if (a.textContent.search(/CLT/ig) > -1) {
        job.source_jobtype = "CLT";
      }
    }

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    job.html = removeTextBefore(job.html, 'Quem somos nós?', false);
    job.html = removeTextBefore(job.html, 'Quais serão as suas responsabilidades?', false);
    //job.html = removeTextAfter(job.html, 'About Rock Content', true);

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