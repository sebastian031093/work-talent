//infinity
(function () {
    var out = {};
    var regionsAux = [];
    var json;

    if (pass_it["regions"]) {
        out["pass_it"] = pass_it;
    } else {
        out["pass_it"] = {
            "regions": [],
            "jobsCount": 0,
            "keepGoing": true,
            "regCount": 0
        };
    }

    $.ajax({
        url: 'https://www.jobs.ch/api/v1/public/search/cardinalities',
        headers: {
            "accept": "application/json",
            "accept-language": "de",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-node-request": "false",
            "x-source": "jobs_ch_desktop"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.region_ids;
            Object.keys(json).forEach(function (key) {
                regionsAux.push(key);
            });
        },
        error: function (error) {
            msg(error);
        }
    });
    msg(regionsAux);
    out.pass_it.regions = regionsAux;
    //window.location.href = window.location.href + '?term=';
    out.wait = true;
    return out;
})();
//extract
(function () {
    var out = {};
    var regionsAux = [];
    var json;

    if (pass_it["regions"]) {
        out["pass_it"] = pass_it;
    } else {
        out["pass_it"] = {
            "regions": [],
            "jobsCount": 0,
            "keepGoing": true,
            "regCount": 0
        };
    }

    $.ajax({
        url: 'https://www.jobs.ch/api/v1/public/search/cardinalities',
        headers: {
            "accept": "application/json",
            "accept-language": "de",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-node-request": "false",
            "x-source": "jobs_ch_desktop"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function (result) {
            json = result.region_ids;
            Object.keys(json).forEach(function (key) {
                regionsAux.push(key);
            });
        },
        error: function (error) {
            msg(error);
        }
    });
    msg(regionsAux);
    out.pass_it.regions = regionsAux;
    //window.location.href = window.location.href + '?term=';
    out.wait = true;
    return out;
})();
//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;

    if (out.pass_it.keepGoing && out.pass_it.jobsCount <= 20000 && out.pass_it.regions[out.pass_it.regCount + 1] !== undefined) {
        out["has_next_page"] = true;
        out.pass_it.regCount += 1;
    } else {
        out["has_next_page"] = false;
    }

    out["wait"] = true;
    return out;
})();