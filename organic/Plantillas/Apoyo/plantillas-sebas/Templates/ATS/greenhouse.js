//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('div[class="opening"]');
    var jobs = [];
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.querySelector('a').href.split('/').pop().trim();
        job.title = elem.querySelector('a').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.location = elem.querySelector('span[class="location"]').textContent.replace(/or remote|remote|, remote|\/ remote/ig, '').trim();
        if (job.location == '') {
            job.location = '';
        }
        job.temp = 96;
        if (job.location.indexOf(';') > -1) {
            var array = job.location.split(';');
            var countReqId = 0;
            for (let auxLoc of array) {
                var jobx = {};
                jobx = { ...job }
                //jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
                jobx.location = auxLoc.trim() + '';
                jobs.push(jobx);
                countReqId += 1;
            }
        } else {
            job.location = job.location + '';
            jobs.push(job);
        }
    }

    out["jobs"] = jobs;
    return out;
})();
//JobData
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('div[id="content"]');

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

        job.html = full_html.innerHTML.replace(/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g, '').trim();

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