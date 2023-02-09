/////////////////////////// BEFORE EXTRACT

(function () {
  var out = {};
  out.waitFor = ".jobsbody tr";
  out.pic = true;
  return out;
})();

/////////////////////////// EXTRACT

(function () {
  let out = {};
  let jobs = [];
  let html_jobs = document.querySelectorAll(".ftlcopy:not(.ftlblankrow)"); //.jobsbody tr // #jobList li[id^="job"]

  for (x in html_jobs) {
    if (typeof html_jobs[x] === "function") continue;
    if (typeof html_jobs[x] === "number") continue;

    let job = {};
    let elem = html_jobs[x];

    job.title = elem.querySelector("h3 a").textContent.trim(); // th[scope="row"] a

    /* Cuando hay que armar la URL
      	var url_base = "https://cookcountyil.taleo.net/careersection/jobdetail.ftl?job=";
      	var job_id = document.querySelector('span[id^="requisitionListInterface.reqContestNumberValue.row"]').textContent.trim();
        job.url = url_base + job_id + "&lang=en";
        */

    job.url = elem.querySelector('th[scope="row"] a').href;
    job.reqid = job.url.split("job=").pop().split("&tz").shift();
    job.source_jobtype = elem
      .querySelector(".contentlinepanel:nth-child(5) .jobtype:first-child")
      .textContent.trim(); // td:nth-child(4) span

    if (
      elem
        .querySelector(".contentlinepanel:nth-child(7) ")
        .textContent.indexOf("$") > -1
    ) {
      job.source_salary = elem
        .querySelector(".contentlinepanel:nth-child(7)")
        .textContent.trim()
        .split("$");
      job.source_salary = "$" + job.source_salary[1];
    }

    if (
      elem.querySelector(
        'span[id^="requisitionListInterface.reqPostingDate.row"]'
      )
    ) {
      var datePosted = elem
        .querySelector(
          'span[id^="requisitionListInterface.reqPostingDate.row"]'
        )
        .textContent.trim();
      job.dateposted_raw = getDateFormat(datePosted, " ", 1, 0, 2);
    }

    var dateClosed = elem
      .querySelector(
        'span[id^="requisitionListInterface.reqUnpostingDate.row"]'
      )
      .textContent.trim();
    if (dateClosed !== "Ongoing") {
      job.dateclosed_raw = getDateFormat(dateClosed, " ", 1, 0, 2);
    }

    job.temp = "Sept-17-2020";

    jobs.push(job);
  }
  out["jobs"] = jobs;
  return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,|\.|rd|st|th|nd/g, "").trim();

  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();

  if (day < 10 && day.length < 2) {
    day = "0" + day;
  }
  if (month < 10 && month.length < 2) {
    month = "0" + month;
  }
  if (year.length === 2) {
    year = "20" + year;
  }

  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.toLowerCase().search(/jan/i) > -1) month = "01";
    if (month.toLowerCase().search(/feb|fév/i) > -1) month = "02";
    if (month.toLowerCase().search(/mar|maar/i) > -1) month = "03";
    if (month.toLowerCase().search(/apr|avr/i) > -1) month = "04";
    if (month.toLowerCase().search(/may|mai|mei/i) > -1) month = "05";
    if (month.toLowerCase().search(/jun|juin/i) > -1) month = "06";
    if (month.toLowerCase().search(/jul|juil/i) > -1) month = "07";
    if (month.toLowerCase().search(/aug|août/i) > -1) month = "08";
    if (month.toLowerCase().search(/sep/i) > -1) month = "09";
    if (month.toLowerCase().search(/oct|okt/i) > -1) month = "10";
    if (month.toLowerCase().search(/nov/i) > -1) month = "11";
    if (month.toLowerCase().search(/dec|déc/i) > -1) month = "12";
  }
  let datum = month + "/" + day + "/" + year;
  return datum;
}

/////////////////////////// PAGINATION I

(function () {
  var out = {};
  var next_page_selector =
    'a[id="requisitionListInterface.pagerDivID4736.Next"]';
  var last_page_selector =
    '.pagerlinkoff a[id="requisitionListInterface.pagerDivID4736.Next"]';

  var clickable_elem = document.querySelector(next_page_selector);

  //stop condition
  if (document.querySelector(last_page_selector)) {
    out["has_next_page"] = false;
  } else {
    clickable_elem.click();
    out["has_next_page"] = true;
  }

  //out.waitFor = "";
  return out;
})();

/////////////////////////// PAGINATION II

(function () {
  var out = {};
  var next_page_selector = '.pagerlink a[id="next"]'; // .pagerlink a[id="requisitionListInterface.pagerDivID4093.Next"]
  var last_page_selector = '.pagerlinkoff a[id="next"]';

  var clickable_elem = document.querySelector(next_page_selector);

  if (document.querySelector(last_page_selector)) {
    out["has_next_page"] = false;
  } else {
    clickable_elem.click();
    out["has_next_page"] = true;
  }

  out.waitFor = next_page_selector;
  return out;
})();

/////////////////////////// JOBDESCRIPTION

(function () {
  let out = {};
  let job = {};
  let selector = 'tr[id="requisitionDescriptionInterface.ID3374.row.row1"]'; // .editablesection
  let remove_selectors = [
    "img",
    "video",
    "button",
    "input",
    "style",
    "javascript",
    "script",
  ];

  if (document.querySelector(selector)) {
    /* Cuando la locacion no esta en el extract
        var search_location = document.querySelectorAll('span[id="requisitionDescriptionInterface.ID2034.row1"] p'); 

        for (let i of search_location) {
            if (i.textContent.indexOf("LOCATION:") > -1){
                let location = i.textContent.trim();
                location = location.replace(/[0-9]/g, "").replace("LOCATION:", "").split(",");
                job.location = location[1] + ", " + location[2];
            } else {
                job.location = "Chicago, IL";
            }
        } 
        */

    /* Cuando la fecha de posteo no esta en el extract
        let searching = document.querySelectorAll('.editablesection div');
      	for (let i of searching) {
        	if (i.textContent.indexOf("Job Posting") > -1) {
                var datePosted = i.textContent.replace("Job Posting:", "").trim();  
      			job.dateposted_raw = getDateFormat(datePosted, "-", 1, 0, 2);
            }
        }
        */

    let full_html = document.querySelector(selector);
    // Remove something from the jobdatata
    if (remove_selectors.length > 0) {
      remove_selectors.forEach(function (e) {
        if (full_html.querySelector(e)) {
          let items = full_html.querySelectorAll(e);
          for (const a of items) {
            a.remove();
          }
        }
      });
    }

    let delete_items = document.querySelectorAll("p");
    for (const item of delete_items) {
      if (item.textContent.search(/@|www.|https:/g) > -1) {
        item.remove();
      }
    }

    if (typeof cleanHTML === "undefined")
      cleanHTML = function (x) {
        return x;
      };
    if (typeof msg === "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();
    job.html = cleanHTML(job.html);
    let tmp = document.createElement("div");
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);

    job.html = removeTextBefore(job.html, "POSITION SUMMARY", true);
    job.html = removeTextBefore(job.html, "Community Epidemiology", true);
    job.html = removeTextBefore(job.html, "bottom of this posting.", true);
    job.html = removeTextAfter(job.html, "For further information on", true);

    if (job.jobdesc.length < 120) {
      job.flag_active = 0;
      job.html = "";
      job.jobdesc = "";
    }
  } else {
    job.flag_active = 0;
    job.html = "";
    job.jobdesc = "";
  }
  out["job"] = job;
  return out;
})();

function removeTextBefore(html, text, flag) {
  let newHtml = html;
  if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).pop();
  if (!flag) newHtml = "<h3>" + text + "</h3>" + newHtml;
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  let newHtml = html;
  if (newHtml.indexOf(text) > -1) newHtml = newHtml.split(text).shift();
  if (!flag) newHtml = newHtml + "<p>" + text + "</p>";
  return newHtml;
}
