//extract
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('div[id="resultDiv"] ul > li');
  var jobs = [];
  for (var elem of html_jobs) {
    if (typeof elem == "function") continue;
    if (typeof elem == "number") continue;
    var job = {};
    job.reqid = elem.querySelector('a').href.split('id=').pop().split('&').shift().trim();
    job.title = elem.querySelector('a').textContent.trim();
    job.url = elem.querySelector('a').href.trim();

    job.source_jobtype = elem.querySelector('div[itemprop="employmentType"]').textContent.trim();
    var desc = getDescription(job.url);
    var full_html = document.createElement("div");
    full_html.innerHTML = desc;

    if (full_html.querySelector('span[class="ResAts__card-subtitle"]')) {
      job.location = full_html.querySelector('span[class="ResAts__card-subtitle"]').textContent.split('·').pop().split(',').reverse().join(', ').replace(/\s{2,}/g, ' ').trim();
    }

    full_html = full_html.querySelector('div[class*="BambooRichText"]');

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
    job.temp = 96;
    jobs.push(job);
  }

  out["jobs"] = jobs;
  return out;
})();
function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}
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