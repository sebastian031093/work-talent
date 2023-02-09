//Infinity
(function () {
    var out = {};
    if (document.querySelector('input[value="Search for Jobs"]')) {
        document.querySelector('input[value="Search for Jobs"]').click();
    }
    out.wait = true;
    out.pic = true;
    return out;
})();
//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('table[class="tableContent list"] > tbody > tr:not([class="listHeader"])');
    var jobs = [];
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.querySelector('td:nth-child(3)').textContent.trim();
        job.title = elem.querySelector('td:nth-child(1)').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('td:nth-child(2)').textContent.trim();
        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();
//Jodata
(function () {
    var out = {};
    var job = {};
    //var jobPassit = pass_it["job"];

    var full_html = document.querySelector('table[id="JobDescription"]');

    if (full_html) {

        for (const a of full_html.querySelectorAll('p, span, li, tr')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
            if (a.textContent.search(/Full-Time\/Part-Time/ig) > -1) {
                job.source_jobtype = a.querySelector('td:nth-child(2)').textContent.trim();
            }
            if (a.textContent.search(/Open Date/ig) > -1) {
                job.dateposted_raw = a.querySelector('td:nth-child(2)').textContent.trim();
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

        job.html = removeTextBefore(job.html, 'Description', false);
        job.html = removeTextAfter(job.html, /Full-Time\/Part-Time|Exempt\/Non-Exempt|Open Date|Location/, true);

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