//////////////////////////////////////=====================other fomr===========================////////////////////////////////////

//infinity
(function () {
  var out = {};
  out["pass_it"] = {
    offSet: 0,
    limit: 0,
  };
  return out;
})();

//https://skyward-wb.wylieisd.net/scripts/wsisa.dll/WService=wsFin/rappljoblst0502.w?isPopup=true
//https://skyward-wb.wylieisd.net/scripts/wsisa.dll/WService=wsFin/rappljoblst0502.w?isPopup=true

//extrac
(async () => {
  let out = {};
  let jobs = [];
  //out["pass_it"] = pass_it;
  try {
    let datax = {
      appliedFacets: {},
      limit: 20,
      offset: 0,
      searchText: "",
    };
    const resp = await fetch(
      window.location.origin +
        "/wday/cxs/" +
        window.location.host.split(".").shift() +
        window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]/, "") +
        "/jobs",
      {
        headers: {
          accept: "application/json",
          "accept-language": "es",
          "content-type": "application/json",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
        referrer:
          window.location.origin +
          "/wday/cxs/" +
          window.location.host.split(".").shift() +
          window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]/, "") +
          "/jobs",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(datax),
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );

    console.log(resp);
    const data = await resp.json();
    //const dataString = JSON.stringify(data);
    // console.log(data);
    // if (out.pass_it.offSet == 0) {
    //   out.pass_it.limit = data.total;
    // }
    // if (out.pass_it.offSet < 2000) {
    json = data.jobPostings;
    for (let i = 0; i < json.length; i++) {
      //Cambiar por un for normal;
      var job = {};
      let elem = json[i];
      job.reqid = elem.bulletFields[0];
      job.title = elem.title;
      job.location = elem.positionOfLocation;
      job.url = window.location.href + elem.externalPath;
      console.log("Title: " + job.title + "\nURL: " + job.url);
      job.dateposted_raw = elem.postedOn.replace("+", "");
      job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 1, 2);
      job.temp = 24;
      //petecion a las desc para traer info de la desc
      const resp2 = await fetch(
        window.location.origin +
          "/wday/cxs/" +
          window.location.host.split(".").shift() +
          window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]/, "") +
          elem.externalPath,
        {
          headers: {
            accept: "application/json",
            "accept-language": "en-US",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua":
              '" Not A;Brand";v="99", "Chromium";v="92", "Opera GX";v="78"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
          },
          referrer:
            window.location.origin +
            "/wday/cxs/" +
            window.location.host.split(".").shift() +
            window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]/, "") +
            elem.externalPath,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );

      console.log(resp2);
      const data2 = await resp2.json();
      //const dataString = JSON.stringify(data);
      //console.log(data2);
      jsonDesc = data2.jobPostingInfo;
      console.log(jsonDesc);
      job.source_jobtype = jsonDesc.timeType;
      var full_html = document.createElement("div");
      full_html.innerHTML = jsonDesc.jobDescription;
      if (full_html) {
        console.log(full_html);
        for (const a of full_html.querySelectorAll("p, span, li")) {
          if (a.textContent.search(/@|http|www./gi) > -1) {
            a.remove();
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
        if (typeof cleanHTML == "undefined")
          cleanHTML = function (x) {
            return x;
          };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim();
        job.html = removeTextBefore(job.html, "", false);
        job.html = removeTextAfter(job.html, "", true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement("div");
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
      }
      if (jsonDesc.additionalLocations) {
        var jobx = {};
        jobx = { ...job };
        let auxArrLocs = [];
        auxArrLocs.push(jsonDesc.location);
        jsonDesc.additionalLocations.map((axloc) => auxArrLocs.push(axloc));
        job.source_location = auxArrLocs.join("\n");
        job.location = jsonDesc.location
          .replace("(", ", ")
          .replace(")", "")
          .trim();
        jobs.push(job);
        for (let auxLoc of jsonDesc.additionalLocations) {
          var jobx = {};
          jobx = {
            ...job,
          };
          jobx.location = auxLoc
            .trim()
            .replace("(", ", ")
            .replace(")", "")
            .trim();
          jobs.push(jobx);
          console.log(jobx);
        }
      } else {
        job.source_location = jsonDesc.location.trim();
        job.location = jsonDesc.location
          .replace("(", ", ")
          .replace(")", "")
          .trim();
        jobs.push(job);
      }
      if (job.location.length == 0) {
        job.location = "Cincinnati, OH";
      }
    }
    //counter = counter + 1;
    // } else {
    //   var job = {};
    //   job.title = "Ghost job, limit reached.";
    //   jobs.push(job);
    //   out.pass_it.offSet = out.pass_it.limit;
    // }

    out["jobs"] = jobs;
  } catch (err) {
    console.log(err);
  }
  console.log(out);
  return out;
})();

function dateAgo(
  text,
  char_separator,
  position_value_DWMY,
  position_word_DWMY
) {
  var numberDWMY = parseInt(
    text.trim().split(char_separator)[position_value_DWMY],
    10
  ); //obtengo el valor numerico del dia, sem, mes o año
  if (typeof text.split(char_separator)[position_word_DWMY] !== "undefined") {
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY];
  } else {
    var dayWeekMonthYear =
      text.split(char_separator)[text.split(char_separator).length - 1];
  }
  var date_Now = new Date(); //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) {
    nDays = 0;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf("YESTERDAY") > -1) {
    nDays = 1;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf("DAYS") > -1) {
    nDays = numberDWMY;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf("WEEK") > -1) {
    nDays = numberDWMY * 7;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf("MONTH") > -1) {
    nDays = numberDWMY * 30;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf("YEAR") > -1) {
    nDays = numberDWMY * 365;
  }
  var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date); //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd = datePosted.getDate(); //devuelve el numero del dia del mes.
  var mm = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  dateJob = mm + "/" + dd + "/" + yyyy;
  return dateJob;
}
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
  out.pass_it.offSet += 20;
  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();
