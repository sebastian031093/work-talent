//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('li[class="oferta_item"]');
    var jobs = [];
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.querySelector('a').href.split('/').slice(0, -1).pop().trim();
        job.title = elem.querySelector('h1').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('div[class="lugarOferta"]').textContent.replace(':', ',').trim() + ', CL';
        job.dateposted_raw = elem.querySelector('h3').textContent.trim();
        job.dateposted_raw = job.dateposted_raw.split('/')[1] + '/' + job.dateposted_raw.split('/')[0] + '/' + job.dateposted_raw.split('/')[2];
        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();
//Jobdate
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('p[itemprop="description"]');

    if (document.querySelector('h4[itemprop="validThrough"]')) {
        job.dateclosed_raw = document.querySelector('h4[itemprop="validThrough"]').textContent.split(':').pop().trim();
        job.dateclosed_raw = job.dateclosed_raw.split('/')[1] + '/' + job.dateclosed_raw.split('/')[0] + '/' + job.dateclosed_raw.split('/')[2];
    }

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