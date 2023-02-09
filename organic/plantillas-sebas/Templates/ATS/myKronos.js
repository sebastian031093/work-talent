//extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;
    var jsonDesc;
    //do {
    //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
    $.ajax({
        url: 'https://prd01-hcm01.prd.mykronos.com/ta/rest/ui/recruitment/companies/%7C6153717/job-requisitions?offset=' + out.pass_it.offSet, //link del json
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US",
            "sec-ch-ua": "\"Opera GX\";v=\"83\", \"Chromium\";v=\"97\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        }, //se obtienen con el fetch
        type: 'GET',
        //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.job_requisitions;
            out.pass_it.limit = result._paging.total;
            msg("Limit: " + out.pass_it.limit);
            for (let elem of json) {
                var job = {};
                job.reqid = elem.id;
                job.title = elem.job_title;
                job.url = window.location.href;
                job.source_location = [];
                job.source_location.push(elem?.location?.city);
                job.source_location.push(elem?.location?.state);
                job.source_location = job.source_location.filter(Boolean).join(", ");
                job.location = [];
                job.location.push(elem?.location?.city);
                job.location.push(elem?.location?.state);
                job.location.push(elem?.location?.country?.slice(0, -1));
                job.location = job.location.filter(Boolean).join(", ");
                job.temp = "96";
                ///////////////
                $.ajax({
                    url: 'https://prd01-hcm01.prd.mykronos.com/ta/rest/ui/recruitment/companies/%7C6153717/job-requisitions/' + job.reqid, //link del json
                    headers: {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "en-US",
                        "sec-ch-ua": "\"Opera GX\";v=\"83\", \"Chromium\";v=\"97\", \";Not A Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest"
                    }, //se obtienen con el fetch
                    type: 'GET',
                    //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        jsonDesc = result;
                        job.source_jobtype = result?.employee_type?.name;
                        if (result?.base_pay_from || result?.base_pay_to) {
                            job.source_salary = '';
                            if (result?.base_pay_from) {
                                job.source_salary += '$' + result?.base_pay_from;
                            }
                            if (result?.base_pay_to) {
                                job.source_salary += ' - $' + result?.base_pay_to;
                            }
                            if (result?.base_pay_frequency) {
                                job.source_salary += ' / ' + result?.base_pay_frequency;
                            }
                        }
                        var full_html = document.createElement('div');
                        full_html.innerHTML = '';
                        full_html.innerHTML += result?.job_description;
                        full_html.innerHTML += result?.job_requirement;
                        full_html.innerHTML += result?.job_preview;
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
                            //job.html = removeTextAfter(job.html, //, true);
                            job.html = cleanHTML(job.html);
                            var tmp = document.createElement('div');
                            tmp.innerHTML = job.html;
                            job.jobdesc = tmp.textContent.trim();
                            job.jobdesc = cleanHTML(job.jobdesc);
                        }
                    },
                    error: function (error) {
                        msg(error);
                    }
                });
                //////////////
                msg("Title: " + job.title);
                jobs.push(job);
                out.pass_it.jobsQuantity += 1;
            }
            //counter += 1;
        },
        error: function (error) {
            msg(error);
        }
    });
    //} while (counter < limit);
    msg("Q: " + out.pass_it.jobsQuantity);
    out["jobs"] = jobs;
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
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 1;
    if (out.pass_it.jobsQuantity < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
})();
//infinity
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0,
        "jobsQuantity": 0
    };
    return out;
})();