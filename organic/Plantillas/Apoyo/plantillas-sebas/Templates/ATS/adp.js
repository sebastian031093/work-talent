//El Rojito/Verde
//Extract
(function () {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = 0;
    var json;
    var cid = window.location.href.split('cid=').pop().split('&').shift();
    var ccId = window.location.href.split('ccId=').pop().split('&').shift();
    var lang = window.location.href.split('lang=').pop().split('&').shift();
    var time = new Date();
    time = Date.now();
    do {
        //var data = {};
        $.ajax({
            url: 'https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=' + cid + '&timeStamp=' + time + '&lang=' + lang + '&iccFlag=yes&eccFlag=yes&ccId=' + ccId + '&locale=' + lang + '&$top=20&$skip=' + counter,
            headers: {
                "accept": "*/*",
                "accept-language": lang,
                "content-type": "application/json",
                "locale": lang,
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-forwarded-host": "workforcenow.adp.com",
                "x-requested-with": "XMLHttpRequest"
            },
            type: 'GET',
            //data : JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.jobRequisitions;
                if (json.length > 0) {
                    limit = result.meta.totalNumber;
                    for (var i = 0; i < json.length; i++) {
                        var job = {};
                        var elem = json[i];
                        job.reqid = elem.clientRequisitionID;
                        job.title = elem.requisitionTitle;
                        job.url = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=' + cid + '&ccId=' + ccId + '&jobId=' + elem.customFieldGroup.stringFields[0].stringValue + '&lang=' + lang;
                        job.dateposted_raw = elem.postDate.split('T').shift();
                        job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                        if (elem.workLevelCode) {
                            if (elem.workLevelCode.shortName) {
                                job.source_jobtype = elem.workLevelCode.shortName;
                            }
                        }
                        job.temp = 96;


                        for (let a of elem.requisitionLocations) {
                            var jobx = {};
                            jobx = { ...job }
                            jobx.location = '';
                            if (a.address.cityName) {
                                jobx.location += a.address.cityName;
                            }
                            if (a.address.countrySubdivisionLevel1.codeValue) {
                                jobx.location += ', ' + a.address.countrySubdivisionLevel1.codeValue;
                            }
                            if (jobx.location.trim() != '') {
                                jobs.push(jobx);
                            }
                        }
                    }
                } else {
                    var job = {};
                    job.title = 'Ghost job, probably no jobs here...' + window.location.href;
                    jobs.push(job);
                }
                counter = counter + 20;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();
//Jobdata
(function () {
    var out = {};
    var job = {};

    var jobid = pass_it["job"].url.split("jobId=").pop().split('&').shift();
    var cid = pass_it["job"].url.split('cid=').pop().split('&').shift();
    var ccId = pass_it["job"].url.split('ccId=').pop().split('&').shift();
    var lang = pass_it["job"].url.split('lang=').pop().split('&').shift();
    var time = new Date();
    time = Date.now();
    var endpoint = "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions/" + jobid + "?cid=" + cid + "&timeStamp=" + time + "&lang=en_US&ccId=" + ccId + "&locale=" + lang;
    //msg(endpoint);

    $.ajax({
        url: endpoint,
        headers: {
            "accept": "*/*",
            "accept-language": lang,
            "content-type": "application/json",
            "locale": "en_US",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-forwarded-host": "workforcenow.adp.com",
            "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        async: false,
        success: function (result) {

            if (result.payGradeRange) {
                //if(result.payGradeRange.maximumRate.amountValue.match(/[0-9]/) && result.payGradeRange.minimumRate.amountValue.match(/[0-9]/)){
                job.source_salary = result.payGradeRange.minimumRate.amountValue + ' to ' + result.payGradeRange.maximumRate.amountValue;
                //}
            }
            if (result.workLevelCode) {
                if (result.workLevelCode.shortName) {
                    job.source_jobtype = result.workLevelCode.shortName;
                }
            }

            var full_html = document.createElement("DIV");
            full_html.innerHTML = result.requisitionDescription;

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

            job.html = full_html.innerHTML.trim();
            //job.html = removeTextBefore(job.html, '', false);
            job.html = removeTextAfter(job.html, /How to Apply/g, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            if (job.jobdesc.length < 50) {
                job.html = " ";
                job.jobdesc = " ";
            }

        },
        error: function (error) {
            msg(error);
        }
    });

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

//El otro
//Extract
(function () {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
        var data = { "filters": [{ "name": "grp", "label": "Area of Interest" }, { "name": "typeOfFulltime", "label": "Position Type" }, { "name": "zzreqSeason", "label": "Season" }, { "name": "zzreqMinAgeRequired", "label": "Minimum Age Required" }], "results": { "pageTitle": "Search Results", "zeroResultsMessage": "We're sorry but we have no job openings at this time that match your search criteria. Please try another search.", "searchFailureMessage": "Oops! Something went wrong.  Search has encountered a problem. Try searching again", "resultsFoundLabel": "results found", "bookmarkText": "Bookmark This", "pageSize": "100", "sortOrder": "00001000", "shareText": "Share", "fields": [{ "name": "ptitle", "label": "Published Job Title" }, { "name": "zzreqSeason", "label": "Season" }, { "name": "zzreqMinAgeRequired", "label": "Minimum Age Required" }, { "name": "grp", "label": "Area of Interest" }] }, "pagefilter": { "page": counter }, "rl": "enUS" };
        $.ajax({
            url: 'https://recruiting.adp.com/srccar/public/rest/1/18101/search/',
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json;charset=UTF-8",
                "pragma": "no-cache",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.jobs;
                limit = result.totalCount;
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    var elem = json[i];
                    job.reqid = elem.num;
                    job.title = elem.ptitle;
                    job.location = '';
                    if (elem.city) {
                        job.location = elem.city;
                    }
                    if (elem.state) {
                        job.location += ', ' + elem.state;
                    }

                    job.url = elem.url;

                    job.temp = 96;
                    jobs.push(job);
                }
                counter = counter + 1;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (jobs.length < limit);

    out["jobs"] = jobs;
    return out;
})();
//Jobdata
(function () {
    var out = {};
    var job = {};

    var jobid = pass_it["job"].url.split("&r=").pop();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/18101/job/" + jobid + "?rl=enUS";
    //msg(endpoint);

    $.ajax({
        url: endpoint,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'GET',
        async: false,
        success: function (result) {
            var full_html = "";

            for (var i = 0; i < result.fields.length; i++) {
                // Ignorar las dos primeras posiciones porque son como basura...
                if (result.fields[i].label == 'Employment Status') {
                    job.source_jobtype = result.fields[i].content;
                }
                if (result.fields[i].label == 'Description of Duties' || result.fields[i].label == 'Requirements' || result.fields[i].label == 'Job Summary') {
                    full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
                    full_html += "<br/>";
                }
            }

            job.html = full_html;

            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();

        },
        error: function (error) {
            msg(error);
        }
    });

    out["job"] = job;
    return out;
})();