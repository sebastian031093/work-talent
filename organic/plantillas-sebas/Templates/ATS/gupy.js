//Extract
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('div[class*="job-list"] tr');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.reqid = elem.querySelector('a').href.split('/').pop().split('?').shift().trim();
    job.title = elem.querySelector('span[class="title"]').textContent.replace(/- [0-9]*/g, '').trim();
    job.url = elem.querySelector('a').href.split('?').shift().trim();
    job.location = elem.querySelector('td:nth-child(2)').textContent.replace(/and Remote/ig, '').replace('/', ', ').trim();
    if (job.location == undefined || job.location == '' || job.location == 'Remote Work') {
      job.location = '';
    }
    job.source_jobtype = elem.querySelector('td:nth-child(3)').textContent.replace(/employee/i, '').trim();
    job.temp = 96;
    if (job.title.search(/Banco de Talentos|Talent Pool/ig) == -1 && job.source_jobtype.search(/Banco de Talentos|Talent Pool/ig) == -1) {
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

    for (const a of document.querySelectorAll('p, span')) {
      if (a.textContent.search(/Open for applications until/ig) > -1) {
        job.dateclosed_raw = a.textContent.split(':').pop().trim();
        job.dateclosed_raw = job.dateclosed_raw.split('/')[1] + '/' + job.dateclosed_raw.split('/')[0] + '/' + job.dateclosed_raw.split('/')[2];
      }
    }

    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link', 'div[class="description__about"]'];

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
      if (a.textContent.search(/Remuneração|Bolsa auxílio|Salário/ig) > -1 && a.textContent.match(/[0-9]/)) {
        job.source_salary = a.textContent.split(':').pop().trim();
        a.remove();
      }
      if (a.textContent.search(/Tipo de contratação/ig) > -1) {
        job.source_jobtype = a.textContent.split(':').pop().trim();
        a.remove();
      }
    }

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    job.html = removeTextBefore(job.html, 'Job description', false);
    job.html = removeTextAfter(job.html, /SOBRE NÓS|NAS REDES SOCIAIS|Saiba mais sobre|Conheça mais sobre|CONHEÇA A/ig, true);

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