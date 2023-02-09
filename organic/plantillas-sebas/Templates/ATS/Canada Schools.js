//Ifinity
(function () {

	var out = {};

	var selectorscroll = 'div[id="win0divHRS_AGNT_RSLT_I$grid$0"]';


	msg(pass_it);

	if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };

	else out["pass_it"] = pass_it;


	out["has_next_page"] = true;

	if (out["pass_it"]["heights"].length > 3) {

		var last_three_heights = out["pass_it"]["heights"].slice(- 3);

		if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2]) {

			out["has_next_page"] = false;
		}
	}


	//window.scrollBy(0, document.body.scrollHeight);

	document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight);


	out["wait"] = true;

	out["pic"] = true;

	out["html"] = true;

	out["pass_it"]["heights"].push(document.querySelector(selectorscroll).scrollHeight);

	return out;

})();
//BeforeExtract
(function () {
	var out = {};
	out.waitFor = 'div[title="Search Results List"] > ul > li';
	out["pic"] = true;
	return out;
})();
//Extract
(function () {
	var out = {};
	var html_jobs = document.querySelectorAll('div[title="Search Results List"] > ul > li');
	var jobs = [];
	for (var x in html_jobs) {
		if (typeof html_jobs[x] == "function") continue;
		if (typeof html_jobs[x] == "number") continue;
		var job = {};
		var elem = html_jobs[x];
		job.reqid = elem.querySelector('div[id*="win0divHRS_APP_JBSCH_I_HRS_JOB_OPENING_ID$"] span[class="ps_box-value"]').textContent.trim(); //elem.getAttribute('').split('').pop();
		job.title = elem.querySelector('div[id*="win0divSCH_JOB_TITLE$"] span[class="ps_box-value"]').textContent.replace(/ *\([^)]*\) */g, "").trim();
		job.url = 'https://hrapp.clackamas.us/psc/recruit/EMPLOYEE/HRMS/c/HRS_HRAM_FL.HRS_CG_SEARCH_FL.GBL?PAGE=HRS_APP_SCHJOB_FL&Action=U&FOCUS=Applicant&SiteId=1&JobOpeningId=' + job.reqid + '&PostingSeq=1';
		job.location = elem.querySelector('div[id*="win0divLOCATION$"] span[class="ps_box-value"]').textContent.trim();
		job.dateposted_raw = elem.querySelector('div[id*="win0divSCH_OPENED$"] span[class="ps_box-value"]').textContent.trim();
		if (elem.querySelector('div[id*="win0divHRS_JO_PST_CLS_DT$"] span[class="ps_box-value"]')) {
			job.dateclosed_raw = elem.querySelector('div[id*="win0divHRS_JO_PST_CLS_DT$"] span[class="ps_box-value"]').textContent.trim();
		}
		job.temp = 96;
		jobs.push(job);
	}

	out["jobs"] = jobs;
	return out;
})();
//Before JobData
(function () {
	var out = {};
	out.waitFor = 'div[class="ps_box-scrollarea"]';
	return out;
})();
//Jobdata
(function () {
	var out = {};
	var job = {};
	//var job = pass_it["job"];

	var full_html = document.querySelector('div[class="ps_box-scrollarea"]');

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
		job.html = removeTextAfter(job.html, 'Equal Employment Opportunity', true);

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