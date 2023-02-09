//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('ul[class="search-results"] > li[class="search-result "]');
    var jobs = [];
    for (var x in html_jobs) {
      if (typeof html_jobs[x] == "function") continue;
      if (typeof html_jobs[x] == "number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.reqid = elem.querySelector('div[class="jobReqId"]').textContent.trim().split('#').pop();
      job.title = elem.querySelector('div[class="posting-title"]').textContent.trim();
      job.url = elem.querySelector('a').href.trim();
      job.location = elem.querySelector('div[class="location"]').textContent.trim();
      job.location = job.location.split(',').slice(-3, job.location.length).join(',').trim();
      job.dateposted_raw = elem.querySelector('div[class="posting-date"]').textContent.trim();
      job.dateposted_raw = getDateFormat(job.dateposted_raw, " ", 2, 1, 3);
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
        if (month.search(/ene|jan|january/i) > -1) { month = "01"; }
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
//Pagination
(function () {
	var out = {};
	var selector = 'nav[class="pagination"] a';  // selector donde esta la paginacion

	if (typeof pass_it == "undefined") pass_it = {};

	if (!pass_it["cont"]) {
		out["pass_it"] = {
			"cont": 1
		};
	} else {
		out["pass_it"] = pass_it;
	}

	out["has_next_page"] = false;
	out["pass_it"].cont += 1;

	var all_elems = document.querySelectorAll(selector);
	[].forEach.call(all_elems, function (elemento) {
		if (elemento.textContent.trim() == out["pass_it"].cont) {
			//msg("click!!!!!"+elemento.textContent.trim());
			elemento.click();
			out["has_next_page"] = true;
		}
	});

	out["wait"] = true;
	return out;
})();
//Jobdata
(function () {
	var out = {};
	var job = {};
	//var job = pass_it["job"];

	var full_html = document.querySelector('div[class="job-posting-content"]');

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

		job.html = removeTextBefore(job.html, 'Summary', false);
    job.html = removeTextAfter(job.html, 'Thank you for your application', true);

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