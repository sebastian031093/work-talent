//OJO no se debe indexar

//extract
(function () {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = 0;
    var json;
    do {
        //var data = {};
        $.ajax({
            url: 'https://teamworkchile.hiringroom.com/jobs/filter_vacancy',
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Chromium\";v=\"90\", \"Opera GX\";v=\"76\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            type: 'POST',
            data: 'skip=' + counter + '&searched=&area=&locality=&isFromReferrer=false',
            dataType: "json",
            async: false,
            success: function (result) {
                json = document.createElement('div');
                json.innerHTML = result.html;
                limit = result.count;
                var html_jobs = json.querySelectorAll('li[class="vacantes"]');
                for (var elem of html_jobs) {
                    if (typeof elem == "function") continue;
                    if (typeof elem == "number") continue;
                    var job = {};
                    job.reqid = elem.querySelector('a').href.split('/').pop().trim();
                    job.title = elem.querySelector('h2').textContent.trim();
                    job.url = elem.querySelector('a').href.trim();
                    job.location = elem.querySelector('p[class="location"]').textContent.trim();
                    if (elem.querySelector('span[class*="workload"]')) {
                        job.source_jobtype = elem.querySelector('span[class*="workload"]').textContent.trim();
                    }
                    job.temp = 96;
                    jobs.push(job);
                }

                counter += 10;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();
//jobdata
(function () {
    var out = {};
    var job = {};
    //var job = pass_it["job"];

    var full_html = document.querySelector('div[class="job-desc"]');

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
            if (a.textContent.search(/@|http|www.|Tipo de trabajo:/ig) > -1) {
                a.remove();
            }
            if (a.textContent.search(/Sueldo ofrecido:/ig) > -1 && a.textContent.match(/[1-9]/)) {
                job.source_salary = a.textContent.split(':').pop().trim();
                a.remove();
            }
        }

        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (typeof msg == "undefined") msg = console.log;

        job.html = full_html.innerHTML.trim();

        //job.html = removeTextBefore(job.html, '', false);
        job.html = removeTextAfter(job.html, /Tags|Video Destacado/g, true);

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