//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('div[class="job__list"] > div[class="job"]');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.reqid = elem.getAttribute('id').split('-').pop().trim();
        job.title = elem.querySelector('h2[class="job__header__title"]').textContent.trim();
        job.url = elem.querySelector('a').href.trim();

        for (const a of elem.querySelectorAll('div[class="job__details"] > dl[class="job__field"]')) {
            if (a.textContent.search('Localização:') > -1) {
                job.location = a.textContent.split(':').pop().replace(' / ', ', ').trim() + ', BR';
            }
            if (a.textContent.search('Salário:') > -1 && a.textContent.match(/[0-9]/)) {
                job.source_salary = a.textContent.split(':').pop().trim();
            }
        }

        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

//Description
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('div[class="job__description"]');

    if (full_html) {

        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe'];

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
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}