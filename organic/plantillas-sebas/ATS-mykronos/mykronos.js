// infinite

(function() {
    var out = {};

    if (typeof pass_it == 'undefined') pass_it = {};
    if (typeof msg == 'undefined') msg = console.log;

    if (!pass_it['counter']) {
        out['pass_it'] = {
            counter: 0,
            limit: 0
        };
    } else {
        out['pass_it'] = pass_it;
    }

    return out;
})();

// extract

(function() {
    var jobs = [];
    var out = {};
    out['pass_it'] = pass_it;
    var json;

    //do {

    $.ajax({
        url: 'https://prd01-hcm01.npr.mykronos.com/ta/rest/ui/recruitment/companies/%7C6012355/job-requisitions?offset=' + out['pass_it'].counter + '&ein_id=&_=1632273957182',
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US",
            "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(result) {
            json = result.job_requisitions;
            out['pass_it'].limit = Math.ceil(result._paging.total / result._paging.size);
            for (var i = 0; i < json.length; i++) {
                var job = {};
                var elem = json[i];
                job.title = elem.job_title;
                job.reqid = elem.id;
                job.url = "https://prd01-hcm01.npr.mykronos.com/ta/6012355.careers?ShowJob=" + job.reqid;

                var city = elem.location.city;
                var state = elem.location.state;
                var country = elem.location.country;
                var array_loc = [];

                if (city) array_loc.push(city);
                if (state) array_loc.push(state);
                if (country) array_loc.push(country);
                if (array_loc.length) {
                    job.source_location = array_loc.join(', ');
                    job.location = states_US(job.source_location);
                } else {
                    job.source_location = "";
                    job.location = "Elmira, New York, US";
                }

                var datos = description(elem.id);
                job.source_salary = datos["source_salary"];
                job.html = datos["html"];

                job.html = removeTextBefore(job.html, 'Major Responsibilities', false);
                job.html = removeTextBefore(job.html, 'MAIN FUNCTION:', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextBefore(job.html, '', false);

                job.html = removeTextAfter(job.html, 'Additional Information', true);
                job.html = removeTextAfter(job.html, 'Application Instructions', true);
                job.html = removeTextAfter(job.html, 'PLEASE CONTACT PALESTINE PROCESSING LOCATION FOR ANY QUESTIONS 903-723-2112', true);
                job.html = removeTextAfter(job.html, 'If you experience difficulties with the online application process', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);
                //job.html = removeTextAfter(job.html, '', true);


                job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);

                job.temp = 2021;
                jobs.push(job);
            }
            //counter++;
        },
        error: function(error) {
            msg(error);
        }
    });

    //} while (json.length > 0);

    out["jobs"] = jobs;
    return out;

})();

function description(id) {
    var url = "https://prd01-hcm01.npr.mykronos.com/ta/rest/ui/recruitment/companies/%7C6012355/job-requisitions/" + id + "?_=1632273957187";
    var descriptionJob = "";
    var source_salary = "";
    var jobx = {}
    var data = "";
    $.ajax({
        url: url,
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US",
            "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        type: 'GET',
        data: data,
        dataType: "json",
        async: false,
        success: function(result) {
            // msg(result)
            //job.html      = 
            if (typeof result.job_description !== "undefined")
                jobx.html = result.job_description.trim();
            else
                jobx.html = "";
            /*job.html = removeTextBefore(job.html, 'Major Responsibilities', false);
            //job.html = removeTextAfter(job.html, 'Application Instructions', true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);*/

            if (typeof result.base_pay_from !== "undefined") {
                jobx.source_salary = result.base_pay_from + " " + result.base_pay_frequency;
            } else
                jobx.source_salary = '';
        },
        error: function(error) {
            msg(error);
        }
    });

    return jobx
}

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

function states_US(location) {
    let states = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    };

    let goodLocation = location;
    if (location.search(/ US| USA/gi) > -1) location = location.replace(/ US| USA/gi, "").trim().replace(/,$/g, "").trim();
    if (location.split(",").length - 1 == 2) {
        let city = location.split(",")[0].trim();
        let state = location.split(",")[1].trim().toUpperCase();
        if (typeof states[state] != "undefined") {
            goodLocation = capitalize(city + ", " + states[state]) + ", US";
        } else {
            console.log("State ", state, " not found");
        }
    } else if (location.split(",").length - 1 == 1) {
        let city = location.split(",")[0].trim();
        let state = location.split(",")[1].trim().toUpperCase();
        if (typeof states[state] != "undefined") {
            goodLocation = capitalize(city + ", " + states[state]) + ", US";
        } else {
            console.log("State ", state, " not found");
        }
    } else if (location.split(",").length - 1 == 0) {
        let state = location.trim().toUpperCase();
        if (typeof states[state] != "undefined") {
            goodLocation = capitalize(states[state]) + ", US";
        } else {
            console.log("State ", state, " not found");
        }
    }
    return goodLocation;

    function capitalize(str, lower = true) {
        return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    }
}

// pagintion

(function() {
    var out = {};
    out['pass_it'] = pass_it;

    if (out['pass_it'].counter < out['pass_it'].limit - 1) {
        out['pass_it'].counter++;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }

    return out;
})();