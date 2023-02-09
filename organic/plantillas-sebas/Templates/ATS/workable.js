//extract
(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    var nextKey = '';
    do {
        var data = { "token": nextKey, "query": "", "location": [], "department": [], "worktype": [], "remote": [] };
        $.ajax({
            url: 'https://apply.workable.com/api/v3/accounts' + window.location.pathname + 'jobs',
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en",
                "cache-control": "no-cache",
                "content-type": "application/json;charset=UTF-8",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-datadog-origin": "rum",
                "x-datadog-parent-id": "5967700884722769886",
                "x-datadog-sampled": "1",
                "x-datadog-sampling-priority": "1",
                "x-datadog-trace-id": "7067235668328524817"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.results;
                limit = result.total;
                if (result.nextPage) {
                    nextKey = result.nextPage;
                } else {
                    nextKey = '';
                }
                for (var elem of json) {
                    var job = {};
                    job.reqid = elem.shortcode;
                    job.title = elem.title;
                    if (elem.city) {
                        job.location = elem.city;
                    }
                    if (elem.region) {
                        job.location += ', ' + elem.region;
                    }
                    if (elem.countryCode) {
                        job.location += ', ' + elem.countryCode;
                    }
                    job.url = window.location.href + 'j/' + elem.shortcode;
                    job.dateposted_raw = elem.published.split('T').shift();
                    job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                    if (elem.type == 'full') {
                        job.source_jobtype = 'Full Time';
                    } else {
                        job.source_jobtype = 'Part Time';
                    }

                    job.temp = 96;
                    jobs.push(job);
                }
                counter = counter + 1;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (nextKey != '');

    out["jobs"] = jobs;
    return out;
})();
//jobdata
(function () {
    var out = {};
    var job = {};
    //var jobPassit = pass_it["job"];

    var full_html = document.querySelector('main[class*="job-preview-styles__preview"]');

    if (full_html) {

        for (const a of full_html.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|http|www.|Location:/ig) > -1) {
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

        job.html = removeTextBefore(job.html, 'Description', true);
        job.html = removeTextAfter(job.html, /Belonging at Elvie/, true);

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