//Extract
(function () {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  //do {
  //var data = {};
  $.ajax({
    url: "https://hcgi.fa.us2.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX_2,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS",
    headers: {
      accept: "*/*",
      "accept-language": "en",
      "content-type":
        "application/vnd.oracle.adf.resourceitem+json;charset=utf-8",
      "ora-irc-language": "en",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    type: "GET",
    //data : JSON.stringify(data),
    dataType: "json",
    async: false,
    success: function (result) {
      json = result.items[0].requisitionList;
      limit = result.items[0].TotalJobsCount;
      for (var i = 0; i < json.length; i++) {
        var job = {};
        var elem = json[i];
        job.reqid = elem.Id;
        job.title = elem.Title;
        job.location = elem.PrimaryLocation;
        job.url =
          "https://hcgi.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2/requisitions/job/" +
          elem.Id;
        job.dateposted_raw = elem.PostedDate.split("T").shift();
        job.dateposted_raw =
          job.dateposted_raw.split("-")[1] +
          "/" +
          job.dateposted_raw.split("-")[2] +
          "/" +
          job.dateposted_raw.split("-")[0];

        job.temp = 96;
        jobs.push(job);
      }
      counter = counter + 1;
    },
    error: function (error) {
      msg(error);
    },
  });
  //} while (counter < limit);

  out["jobs"] = jobs;
  return out;
})();
//JobData
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var full_html = document.querySelector('div[class="details"]');

  if (full_html) {
    for (const a of document.querySelectorAll(
      'div[class="job-details-list"] div[class="job-info-labels"]'
    )) {
      if (a.textContent.search(/Job Schedule/gi) > -1) {
        job.source_jobtype = a.nextElementSibling.textContent.trim();
      }
    }

    var remove_selectors = [
      "a",
      "script",
      "i",
      "img",
      "style",
      "button",
      "figure",
      "noscript",
      "svg",
      "form",
      "input",
      "iframe",
      "link",
    ];

    if (remove_selectors.length > 0) {
      remove_selectors.forEach((remove_selector) => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }

    for (const a of full_html.querySelectorAll("p, span, li")) {
      if (a.textContent.search(/@|http|www./gi) > -1) {
        a.remove();
      }
    }

    if (typeof cleanHTML == "undefined")
      cleanHTML = function (x) {
        return x;
      };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    //job.html = removeTextBefore(job.html, '', false);
    //job.html = removeTextAfter(job.html, '', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement("div");
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
