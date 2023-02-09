//---extract

(async () => {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0,
            "totalJobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    let jobs = [];
    try {
        const resp = await fetch("https://hcal.fa.us2.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS,limit=24,offset="+ out["pass_it"].cont , {
            "headers": {
                "accept": "*/*",
                "accept-language": "en",
                "content-type": "application/vnd.oracle.adf.resourceitem+json;charset=utf-8",
                "ora-irc-cx-userid": "324e2ecd-6b74-4521-9368-06aab91a0a15",
                "ora-irc-language": "en",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://hcal.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/requisitions?",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });

        console.log(resp);
        const data = await resp.json();
        //const dataString = JSON.stringify(data);
        console.log(data);
        var json_jobs = data.items[0].requisitionList;
        out["pass_it"]["jobs"] = data.items[0].TotalJobsCount; // condicion de parada
        out["pass_it"]["totalJobs"] = out["pass_it"]["totalJobs"] + json_jobs.length; // total de jobs
        for (i in json_jobs) {
            let job = {}; /*init*/
            var elem = json_jobs[i];

            job.title = elem.Title;
            job.location = elem.PrimaryLocation;
            job.source_location = elem.PrimaryLocation;
            job.url = 'https://hcal.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/requisitions/preview/' + elem.Id;
            let posted = elem.PostedDate;
            posted = new Date(posted)
            job.dateposted_raw = posted.toLocaleDateString('en-US');
            if (job.dateposted_raw.search(/[A-Za-z]/g) > -1) {
                job.dateposted_raw = ''
            };
            job.reqid = elem.Id;
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;

            job.temp = "1";

            jobs.push(job);
        }
        out["jobs"] = jobs;

    } catch (err) {
        console.log(err);
    }

    return out;
})();

//--- pagination

(function () {
    var out = {};

    out["pass_it"] = pass_it;
    //stop condition

    if (out["pass_it"]["jobs"] <= out["pass_it"]["totalJobs"]) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        out["pass_it"].cont += 24;

        out["has_next_page"] = true;
    }
    out.wait = true;
    return out;
})();

//--- descrip

(function() {
    var out = {};
    var job = {};
    var selector = "div.details";
    var remove_selectors = [];
    //var job = pass_it["job"];
    /* var iframe_selector = 'iframe[name="resumator-job-frame"]';
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;*/
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    

  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Rincon Consultants, Inc does not accept', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
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