//Extract
(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
      var data = {};
      $.ajax({
        url : 'https://ashtalentos.abler.com.br/api_v/v1/vagas.json?&page=' + counter,
        headers: {
          "accept": "application/json",
          "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-csrf-token": "1s1+fcUusHCjrJSajht4dMemrCjzcr6aNXCbzWMLAn5teixx0VuKzzSPkv/UbFaTzr9WFxHnfkppQyHfCarJAA=="
        },
        type : 'GET',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          json = result.vacancies.data;
          limit = result.pagy.count;
          for(var elem of json) {
            var job = {};
            job.reqid = elem.id;
            job.title = elem.attributes.title;
            job.location = elem.attributes.location;
            job.url = elem.links.vacancy_url;                    
            job.dateposted_raw = elem.attributes.created_at;
            job.dateposted_raw = job.dateposted_raw.split('/')[1] + '/' + job.dateposted_raw.split('/')[0] + '/' + job.dateposted_raw.split('/')[2];
            job.source_jobtype = elem.attributes.contracting_regime_verbose;
            job.temp = 96;
            jobs.push(job);
          }
          counter = counter + 1;
        },
        error: function(error){
          msg(error);
        }
      });
    } while (jobs.length < limit);
  
    out["jobs"]= jobs;
    return out;
  })();
//JobData
(function () {
	var out = {};
	var job = {};
	//var job = pass_it["job"];

	var full_html = document.querySelector('div[class="card-body card-description"]');

	if (full_html) {
      
      for (const a of document.querySelectorAll('table[class="table table-borderless"] tbody tr')) {
			if (a.querySelector('th').textContent.search(/Bolsa auxílio/ig) > -1 && a.querySelector('td').textContent.match(/[0-9]/)) {
				job.source_salary = a.querySelector('td').textContent.trim();
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