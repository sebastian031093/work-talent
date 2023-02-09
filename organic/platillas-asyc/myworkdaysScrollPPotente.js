(async () => {
  let jobs = [];
  let out = {};
  //out["pass_it"] = pass_it;
  let counter = 1;
  let limit = 0;
  let json;
  let jsonDesc;

  try {
    const fetchPro = fetch(
      window.location.origin +
        window.location.pathname +
        "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" +
        0,
      {
        //url del jobsite
        headers: {
          accept: "application/json,application/xml",
          "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="92", "Opera GX";v="78"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          sessionsecuretoken: "smstg2gg4nji819fpo60k0j8et",
          "stats-perf": "08277f793a1f47af8b1cec3b61f3357d,713,,0",
          "x-workday-client": "2021.39.009",
        },
        referrer:
          window.location.origin +
          window.location.pathname +
          "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" +
          0,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );

    const resp = await fetchPro;
    // console.log(resp);
    let json = await resp.json();
    console.log(json);
    // if (out.pass_it.offSet == 0) {
    //     var descPath = getPath(json, "number.paginationCount");
    //     descPath = descPath.split(".").slice(0, -1).join(".") + ".value";
    //     out["pass_it"].limit = setToValue(json, descPath);
    //   }
    var descPath = getPath(json, "facetSearchResultList");
    descPath = descPath.split(".").slice(0, -1).join(".") + ".listItems";
    var jobList = setToValue(json, descPath);
    if (jobList) {
      for (var elem of jobList) {
        var job = {};
        job.title = elem.title.instances[0].text;
        job.url =
          window.location.protocol +
          "//" +
          window.location.hostname +
          elem.title.commandLink +
          "?codes=NEUVOO";
        job.source_location = elem.subtitles[0].instances[0].text;
        //msg('Title: ' + job.title + '\nURL: ' + job.url);
        let urlMad = job.url;
        job.temp = 96;

        const fetchPro2 = fetch(urlMad, {
          //url del jobsite
          headers: {
            accept: "application/json,application/xml",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="92", "Opera GX";v="78"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-workday-client": "2021.39.009",
          },
          referrer: urlMad,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        const resp = await fetchPro2;
        // console.log(resp);
        let jsonDesc = await resp.json();
        job.title = jsonDesc.windowTitle;
        console.log("Title: " + job.title + "\nURL: " + job.url);
        var descPath = getPath(
          jsonDesc,
          "richTextArea.jobPosting.jobDescription"
        );
        descPath = descPath.split(".").slice(0, -1).join(".") + ".text";
        var full_html = document.createElement("div");
        full_html.innerHTML = setToValue(jsonDesc, descPath);
        for (const a of full_html.querySelectorAll("p, span, li")) {
          if (a.textContent.search(/@|http|www\./gi) > -1) {
            a.remove();
          }
        }
        if (typeof cleanHTML == "undefined")
          cleanHTML = function (x) {
            return x;
          };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim();
        job.html = removeTextBefore(job.html, "Job Description", false);
        job.html = removeTextAfter(job.html, /To Apply|Location:/, true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement("div");
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        //---------MULTILOCATION-------------------
        var descJson = JSON.parse(jsonDesc.structuredDataAttributes.data);
        if (typeof descJson !== "undefined") {
          job.dateposted_raw = getDateFormat(descJson.datePosted, "-", 2, 1, 0);
        }
        var descPath = getPath(jsonDesc, "labeledImage.JOB_TYPE");
        if (descPath) {
          descPath = descPath.split(".").slice(0, -1).join(".") + ".imageLabel";
          job.source_jobtype = setToValue(jsonDesc, descPath);
        }
        var descPath = getPath(jsonDesc, "labeledImage.JOB_REQ");
        if (descPath) {
          descPath = descPath.split(".").slice(0, -1).join(".") + ".imageLabel";
          job.reqid = setToValue(jsonDesc, descPath);
        }
        var descPath = getPath(jsonDesc, "labeledImage.LOCATION");
        if (descPath) {
          descPath = descPath.split(".").slice(0, -2).join(".");
          var arrayAuxLoc = setToValue(jsonDesc, descPath);
          let axloc = [];
          arrayAuxLoc.map((alx) => axloc.push(alx.imageLabel));
          for (let auxLoc of arrayAuxLoc) {
            if (auxLoc.ecid == "labeledImage.LOCATION") {
              var jobx = {};
              jobx = { ...job };
              jobx.source_location = axloc.join("\n");
              jobx.location = auxLoc.imageLabel + "";
              jobs.push(jobx);
            }
          }
        } else {
          jobx.source_location = "";
          job.location = "HQ-No Loc";
          jobs.push(job);
        }
      }

      //-----------END DESCRIPTION---------
    } else {
      var job = {};
      job.title = "Ghost job, limit reached.";
      jobs.push(job);
      out.pass_it.offSet = out.pass_it.limit;
    }
    console.log(jobs);
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will lety depending on browser
  }

  //out["jobs"] = jobs;

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
function getPath(obj, value, path) {
  try {
    if (typeof obj !== "object") {
      return;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var t = path;
        var v = obj[key];
        if (!path) {
          newPath = key;
        } else {
          newPath = path + "." + key;
        }
        if (v === value) {
          return newPath;
        } else if (typeof v !== "object") {
          newPath = t;
        }
        var res = getPath(v, value, newPath);
        if (res) {
          return res;
        }
      }
    }
  } catch (e) {
    msg(e.message);
  }
}
function setToValue(obj, path) {
  path = path.split(".");
  for (var i of path) {
    obj = obj[i];
  }
  return obj;
}
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();
  day = day.replace(/rd|st|th/i, "").trim();
  if (day < 10 && day.length < 2) {
    day = "0" + day;
  }
  if (year.length == 2) {
    year = "20" + year;
  }
  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.search(/jan/i) > -1) {
      month = "01";
    }
    if (month.search(/feb|fév/i) > -1) {
      month = "02";
    }
    if (month.search(/mar|maar/i) > -1) {
      month = "03";
    }
    if (month.search(/apr|avr/i) > -1) {
      month = "04";
    }
    if (month.search(/may|mai|mei/i) > -1) {
      month = "05";
    }
    if (month.search(/jun|juin/i) > -1) {
      month = "06";
    }
    if (month.search(/jul|juil/i) > -1) {
      month = "07";
    }
    if (month.search(/aug|août/i) > -1) {
      month = "08";
    }
    if (month.search(/sep/i) > -1) {
      month = "09";
    }
    if (month.search(/oct|okt/i) > -1) {
      month = "10";
    }
    if (month.search(/nov/i) > -1) {
      month = "11";
    }
    if (month.search(/dec|déc/i) > -1) {
      month = "12";
    }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}
