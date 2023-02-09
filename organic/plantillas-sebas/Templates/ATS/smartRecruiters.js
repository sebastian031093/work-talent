//infinity
(function () {
    var out = {};
    var cli = document.querySelector('a[class*="js-more"]');  //SELECTOR DEL BOTON MORE

    if (pass_it["count"]) {
        out["pass_it"] = pass_it;
    } else {
        out["pass_it"] = {
            "count": 0
        };
    }
    msg(out.pass_it.count);


    if (cli && out.pass_it.count < 100) {
        cli.click();
        msg("HACIENDO CLICK")
        out["has_next_page"] = true;
        out.pass_it.count = out.pass_it.count + 1;
    } else {
        out["has_next_page"] = false;
    }

    out["wait"] = true;
    return out;
})();
//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('ul[class*="opening-jobs"] > li[class*="opening-job job"] > a');
    var jobs = [];
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.href.split('/').pop().split('-').shift().trim();
        job.title = elem.querySelector('h4').textContent.trim();
        job.url = elem.href.trim();
        job.location = elem.parentElement.parentElement.previousElementSibling.querySelector('h3').textContent.trim();
        job.source_jobtype = elem.querySelector('p').textContent.trim();
        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();
//jobdata
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('div[itemprop="description"]');

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