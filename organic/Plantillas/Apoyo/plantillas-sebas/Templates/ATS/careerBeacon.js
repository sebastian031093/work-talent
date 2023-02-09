//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('table[class*="job_list"] > tbody > tr');
    var jobs = [];
    for (var elem of html_jobs) {
      if (typeof elem == "function") continue;
      if (typeof elem == "number") continue;
      var job = {};
      job.reqid = elem.querySelector('a').href.split('/').slice(0, -3).pop().trim();
      job.title = elem.querySelector('div[class="job_details"] > div:nth-child(1)').textContent.trim();
      job.url = elem.querySelector('a').href.trim();
      job.location = elem.querySelector('span[class="location"]').textContent.replace(elem.querySelector('span[class="location"] > span[class="lower hidden-xs"]').textContent, '').trim();
      job.dateposted_raw = elem.querySelector('div[class="job_pub_date"]').getAttribute('title');
      job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
      job.temp = 96;
      jobs.push(job);
    }
  
    out["jobs"] = jobs;
    return out;
  })();
//JobData
(function () {
	var out = {};
	var job = {};
	//var jobPassit = pass_it["job"];

	var full_html = document.querySelector('section[class="job_details_container"]');

	if (full_html) {

		for (const a of full_html.querySelectorAll('p, span, li')) {
			if (a.textContent.search(/@|http|www./ig) > -1) {
				a.remove();
			}
		}

		var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

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

		job.html = removeTextBefore(job.html, '<h4>Responsibilities', false);
		//job.html = removeTextAfter(job.html, //, true);

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