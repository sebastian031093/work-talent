/*--------------------extract-------------------------*/
(function () {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  do {
    msg("paginando page--->" + counter);
    var data = {
      filters: [
        { name: "state", label: "State" },
        { name: "city", label: "City" },
        { name: "grp", label: "Career Areas" },
        { name: "zzreqPositionLevel", label: "Experience Level" },
      ],
      results: {
        pageTitle: "Search Results",
        zeroResultsMessage:
          "We're sorry but we have no job openings at this time that match your search criteria. Please try another search.",
        searchFailureMessage:
          "Oops! Something went wrong.  Search has encountered a problem. Try searching again",
        resultsFoundLabel: "results found",
        bookmarkText: "Bookmark This",
        pageSize: "250",
        sortOrder: "00002000",
        shareText: "Share",
        fields: [{ name: "ptitle", label: "Published Job Title" }],
      },
      pagefilter: { page: counter },
      rl: "enUS",
    };
    $.ajax({
      url: "https://recruiting.adp.com/srccar/public/rest/1/1049707/search/",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json",
      async: false,
      success: function (result) {
        json = result.jobs;
        limit = result.pages + 1;
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].ptitle;
          job.url = json[i].url;
          if (json[i].location) {
            job.location = json[i].location
              .split(" - ")
              .reverse()
              .join(", ")
              .trim();
          } else if (json[i].city && json[i].state) {
            job.location = json[i].city + ", " + json[i].state + ", US";
          } else {
            job.location = ", US";
          }
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          //job.temp = 1;
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function (error) {
        msg(error);
      },
    });
  } while (counter < limit);
  out["jobs"] = jobs;
  return out;
})();
/*--------------------job data-------------------------*/
(function () {
  var out = {};
  var job = {};
  var jobid = pass_it["job"].url.split("&r=").pop();
  var endpoint =
    "https://recruiting.adp.com/srccar/public/rest/1/791541/job/" +
    jobid +
    "?rl=enUS";
  //msg(endpoint);
  $.ajax({
    url: endpoint,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    type: "GET",
    async: false,
    success: function (result) {
      var full_html = "";
      for (var i = 0; i < result.fields.length; i++) {
        // Ignorar las dos primeras posiciones porque son como basura...
        if (
          result.fields[i].label == "Job Description" ||
          result.fields[i].label == "Requirements"
        ) {
          full_html +=
            "<h3>" +
            result.fields[i].label +
            "</h3><br/>" +
            result.fields[i].content;
          full_html += "<br/>";
        }
        if (result.fields[i].label == "Position Type")
          job.source_empname = result.fields[i].content;
      }
      job.html = full_html;
      job.html = cleanHTML(job.html);
      var tmp = document.createElement("DIV");
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
    },
    error: function (error) {
      msg(error);
    },
  });
  out["job"] = job;
  return out;
})();
//other form//
//----Extract------------------
(function () {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);
  var expected_jobs_str = json.meta.totalNumber;
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      cont: 1,
      jobs: 0,
      //"total_jobs":0,
      expected_jobs: expected_jobs_str,
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var jobs = json.jobRequisitions;
  var returnedJobs = [];
  for (i in jobs) {
    var job = {}; /*init*/
    if (typeof jobs[i].requisitionTitle != "undefined") {
      job.title = jobs[i].requisitionTitle;
      job.title = job.title
        .replace(/\([^)]*\)/g, "")
        .replace(/[.*+?^${}()|[\]\\]/g, "")
        .trim();
      job.title = job.title
        .replace(/part time|full time|part-time|full-time|H\/F/gi, "")
        .trim();
      if (jobs[i].requisitionLocations[0]) {
        if (jobs[i].requisitionLocations[0].nameCode.shortName) {
          job.location = jobs[i].requisitionLocations[0].nameCode.shortName;
        } else if (jobs[i].requisitionLocations[0].address.cityName)
          job.location = jobs[i].requisitionLocations[0].address.cityName;
      } else {
        job.location = "Moncton, Canada";
      }
      //if(job.location)job.location +=', Canada';
      job.dateposted_raw = jobs[i].postDate;
      if (job.title && jobs[i].workLevelCode) {
        job.source_jobtype = jobs[i].workLevelCode.shortName;
      }
      let id = jobs[i].customFieldGroup.stringFields[0].stringValue;
      job.url =
        "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=a5d768f8-9498-4650-940d-bf5e9cba3859&ccId=19000101_000001&jobId=" +
        id +
        "&lang=en_US&source=TW";
      job.temp = 9900159999;
      returnedJobs.push(job);
    }
  }
  //msg(jobs);
  //msg(returnedJobs.length);
  out["pass_it"].jobs = returnedJobs.length;
  //out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
  out["jobs"] = returnedJobs;
  return out;
})();
//Paginacion
(function () {
  var out = {};
  if (typeof msg == "undefined")
    msg = function (x) {
      return x;
    };
  out["pass_it"] = pass_it;
  if (out["pass_it"].expected_jobs <= out["pass_it"].cont + 20) {
    out["has_next_page"] = false;
  } else if (out["pass_it"].jobs > 0) {
    out["pass_it"].cont += 20;
    var url =
      "https://workforcenow.adp.com/mascsr/default/careercenter/public/events/staffing/v1/job-requisitions?cid=a5d768f8-9498-4650-940d-bf5e9cba3859&timeStamp=1581698537927&lang=en_US&ccId=19000101_000001&locale=en_US&$skip=" +
      out["pass_it"].cont;
    msg("\x1b[32m URL--> " + url);
    window.location.href = url;
    out["has_next_page"] = true;
  }
  out.waitFor = "pre";
  return out;
})();
///Description
(function () {
  var out = {};
  var job = {};
  var selector = "div.job-description-data";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0)
    remove_selectors.forEach((remove_selector) => {
      if (full_html.querySelector(remove_selector))
        full_html.querySelector(remove_selector).remove();
    });
  if (typeof cleanHTML == "undefined")
    cleanHTML = function (x) {
      return x;
    };
  if (typeof msg == "undefined") msg = console.log;
  if (document.querySelector("span.job-description-salary")) {
    job.source_salary = document
      .querySelector("span.job-description-salary")
      .textContent.trim();
  }
  job.html = full_html.innerHTML.trim();
  job.html = removeTextBefore(job.html, "The Opportunity", false);
  job.html = removeTextBefore(job.html, "Job Description", false);
  job.html = removeTextAfter(job.html, "The Rewards", true);
  //Organizational Structure:
  var temp_html = document.createElement("div");
  temp_html.innerHTML = job.html;
  job.jobdesc = temp_html.textContent.trim();
  job.html = cleanHTML(job.html);
  job.jobdesc = cleanHTML(job.jobdesc);
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
