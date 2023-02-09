//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('table[class="jv-job-list jv-search-list"] > tbody > tr');
    var jobs = [];
    for (var elem of html_jobs) {
        if (typeof elem == "function") continue;
        if (typeof elem == "number") continue;
        var job = {};
        job.reqid = elem.querySelector('a').href.split('/').pop().trim(); //elem.getAttribute('').split('').pop();
        job.title = elem.querySelector('td[class="jv-job-list-name"]').textContent.trim();
        job.url = elem.querySelector('a').href.trim() + '?__jvst=Job Board&__jvsd=talent';
        job.temp = 96;
        var desc = getDescription(job.url);
        var full_html = document.createElement("div");
        full_html.innerHTML = desc;
        job.location = full_html.querySelector('p[class="jv-job-detail-meta"]').innerHTML.replace(/ *\<[^>]*\> */g, "/").split('//');
        job.location = job.location.slice(1, job.location.length).join('/').replace(/\s{2,}/g, ' ').trim();
        full_html = full_html.querySelector('div[class="jv-job-detail-description"]');

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
        if (job.location.search('/') > -1) {
            var array = job.location.split('/');
            var countReqId = 0;
            for (let auxLoc of array) {
                var jobx = {};
                jobx = { ...job }
                jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
                jobx.location = auxLoc.trim() + '';
                jobs.push(jobx);
                countReqId += 1;
            }
        } else {
            job.location = job.location.trim() + '';
            jobs.push(job);
        }
    }

    out["jobs"] = jobs;
    return out;
})();
function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    var response = "";
    xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}
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