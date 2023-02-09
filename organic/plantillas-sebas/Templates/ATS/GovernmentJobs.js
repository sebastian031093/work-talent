//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('div[class*="search-results-grid-container"] tbody tr');
    var jobs = [];
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.querySelector('th').getAttribute('data-job-id').trim();
        job.title = elem.querySelector('h3').textContent.replace(/  new/ig, '').trim();
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('td[class*="job-table-location"]').textContent.trim();
        job.dateposted_raw = elem.querySelector('td[class*="job-table-posted"]').textContent.trim();
        job.dateclosed_raw = elem.querySelector('td[class="job-table-closing"]').textContent.trim();
        job.source_salary = elem.querySelector('td[class*="job-table-salary"]').textContent.trim();
        job.temp = 96;
        jobs.push(job);
    }
    out.pic = true;
    out["jobs"] = jobs;
    return out;
})();
//Pagination
(function () {
    var out = {};
    var selector = 'ul[class="pagination"] a';  // selector donde esta la paginacion

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
//JobData
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('div[id="details-info"]');

    if (full_html) {

        for (const a of document.querySelectorAll('div[class*="term-block"] div[class="term-description"]')) {
            if (a.textContent.search(/Job Type/ig) > -1) {
                job.source_jobtype = a.parentElement.parentElement.querySelector('div[class="term-value"]').textContent.trim();
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