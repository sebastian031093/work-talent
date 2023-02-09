//--------extract

(async () => {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "jobs": 0,
            "totalJobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    let jobs = [];
    try {
        const resp = await fetch("https://sjobs.brassring.com/TgNewUI/Search/Ajax/ProcessSortAndShowMoreJobs", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "content-type": "application/json;charset=UTF-8",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://sjobs.brassring.com/TGnewUI/Search/Home/HomeWithPreLoad?partnerid=25776&siteid=5174&PageType=searchResults",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `{\"partnerId\":\"25776\",\"siteId\":\"5174\",\"keyword\":\"\",\"location\":\"\",\"keywordCustomSolrFields\":\"\",\"locationCustomSolrFields\":\"Location,FORMTEXT1\",\"linkId\":\"0\",\"Latitude\":0,\"Longitude\":0,\"facetfilterfields\":{\"Facet\":[]},\"powersearchoptions\":{\"PowerSearchOption\":[{\"VerityZone\":\"Location\",\"Type\":\"select\",\"OptionCodes\":[]},{\"VerityZone\":\"AutoReq\",\"Type\":\"text\",\"Value\":null},{\"VerityZone\":\"FORMTEXT8\",\"Type\":\"text\",\"Value\":null},{\"VerityZone\":\"FORMTEXT5\",\"Type\":\"text\",\"Value\":null},{\"VerityZone\":\"FORMTEXT4\",\"Type\":\"text\",\"Value\":null},{\"VerityZone\":\"FORMTEXT1\",\"Type\":\"multi-select\",\"OptionCodes\":[]},{\"VerityZone\":\"FORMTEXT13\",\"Type\":\"single-select\",\"OptionCodes\":[]},{\"VerityZone\":\"LastUpdated\",\"Type\":\"date\",\"Value\":null}]},\"SortType\":\"LastUpdated\",\"pageNumber\":${out["pass_it"].cont},\"encryptedSessionValue\":\"^z_slp_rhc_c9ooQrpjYmPjx49gR5_slp_rhc_CqivZlKZ_slp_rhc_UGauGzS3IGJh8rV4F0S8izy6p7rCP5D3FSMCDqLA2IwSBmOZ0Y7hGhQRZri8f/wRL69TIhB6rFcZs=\"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });

        console.log(resp);
        const data = await resp.json();
        //const dataString = JSON.stringify(data);
        console.log(data);
        var json_jobs = data.Jobs.Job;
        out["pass_it"]["jobs"] = data.JobsCount; // condicion de parada
        out["pass_it"]["totalJobs"] = out["pass_it"]["totalJobs"] + json_jobs.length; // total de jobs
        for (i in json_jobs) {
            let job = {}; /*init*/
            var elem = json_jobs[i];

            job.title = elem.Questions[10].Value;
            job.location = elem.Questions[12].Value + ','+ elem.Questions[11].Value;
            job.source_location = elem.Questions[12].Value + ','+ elem.Questions[11].Value;
            job.url = elem.Link;
            //job.dateposted_raw = elem.cell[3];
            job.reqid = elem.Questions[9].Value;
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

//-----------pag.

(function () {
    var out = {};

    out["pass_it"] = pass_it;
    //stop condition

    if (out["pass_it"]["jobs"] <= out["pass_it"]["totalJobs"]) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        out["pass_it"].cont += 1;

        out["has_next_page"] = true;
    }
    out.wait = true;
    return out;
})();

//----desc

(function() {
    var out = {};
    var job = {};
    var selector = "div.questionClass.ng-scope";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
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