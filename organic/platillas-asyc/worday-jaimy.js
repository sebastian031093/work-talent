//infinity
(function () {
  var out = {};
  out["pass_it"] = {
    offSet: 0,
    limit: 0,
  };
  return out;
})();

//extrac
(function () {
  var jobs = [];
  var out = {};
  var counter = 0;
  var limit = 0;
  var json;
  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["offSet"]) {
    out["pass_it"] = {
      offSet: 0,
      limit: 0,
    };
  } else {
    out["pass_it"] = pass_it;
  }

  //do {
  var data = {
    limit: 20,
    offset: out["pass_it"].offSet,
    searchText: "",
    appliedFacets: {
      jobFamilyGroup: [],
      workerSubType: [],
      timeType: [],
      locations: [],
    },
  };
  $.ajax({
    url: "https://manulife.wd3.myworkdayjobs.com/wday/cxs/manulife/MFCJH_Jobs/jobs",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    type: "POST",
    data: JSON.stringify(data),
    dataType: "json",
    async: false,
    success: function (result) {
      json = result.jobPostings;
      limit = result.total;
      if (out["pass_it"].limit == 0) out["pass_it"].limit = result.total;
      for (var i = 0; i < json.length; i++) {
        var job = {};
        var elem = json[i];
        job.title = elem.title;
        job.location = elem.locationsText;
        job.reqid = elem.bulletFields[0];
        job.url =
          "https://manulife.wd3.myworkdayjobs.com/es/MFCJH_Jobs" +
          elem.externalPath;
        var dateposted_raw = elem.postedOn;
        job.dateposted_raw = dateAgo(dateposted_raw, " ", 1, 2);
        job.temp = "1-9-6";
        //job.dateclosed_raw = elem.starts_at;
        job.source_jobtype = elem.timeType;
        //la url del job que se necesita para obtener la info se obtiene del job description.
        var concat = job.url.split("/job/").pop().trim(); //se obtiene la parte necesaria de la url para concatenar
        if (job.location.indexOf("Location") > -1) {
          var json_desc = JSON.parse(
            getDescription(
              `https://manulife.wd3.myworkdayjobs.com/wday/cxs/manulife/MFCJH_Jobs/job/${concat}`
            )
          ); //se concatena la url del json que contiene la info del job
          var array = json_desc.jobPostingInfo.additionalLocations;
          array.push(json_desc.jobPostingInfo.location);
          for (var e in array) {
            if (array[e]) {
              var jobx = {};
              jobx.title = job.title;
              jobx.url = job.url;
              jobx.reqid = job.reqid;
              jobx.location = array[e];
              jobx.dateposted_raw = job.dateposted_raw;
              jobx.temp = job.temp;
              jobx.location = jobx.location.replace("Remote", "");
              jobs.push(jobx);
            }
          }
        } else {
          jobs.push(job);
        }
      }
      counter = counter + 20;
    },
    error: function (error) {
      msg(error);
    },
  });
  //} while (counter < limit);

  out["jobs"] = jobs;
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
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g) > -1) {
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

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
  xhrrequest.setRequestHeader(
    "Accept-Language",
    "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2"
  );
  xhrrequest.setRequestHeader("Cache-Control", "no-cache");
  xhrrequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  xhrrequest.setRequestHeader("Pragma", "no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}

//desc
(function () {
  var out = {};
  var job = {};
  var selector = 'div[data-automation-id="jobPostingDescription"]';
  var remove_selectors = [
    "a",
    "script",
    "style",
    "img",
    "div[class='div.ytp-cued-thumbnail-overlay-image']",
  ];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  for (const a of full_html.querySelectorAll("p")) {
    if (
      a.textContent.search(
        /[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi
      ) > -1
    ) {
      //search, match, includes, indexOf can be used
      //if (a.textContent.search(/CV|resume|cover letter|curriculum|Screening/gi) > -1)
      job.source_apply_email = a.textContent.match(
        /[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-z]{2,12}(?:\.[a-z]{2})?/gi
      )[0];
      console.log(job.source_apply_email);
      a.remove(); //removes the selector that contains the email
    }
  }
  // remove something from the jobdatata
  if (remove_selectors.length > 0) {
    remove_selectors.forEach((remove_selector) => {
      let salir;
      do {
        salir = false;
        if (full_html.querySelector(remove_selector)) {
          full_html.querySelector(remove_selector).remove();
          salir = true;
        }
      } while (salir);
    });
  }
  if (typeof cleanHTML == "undefined")
    cleanHTML = function (x) {
      return x;
    };
  if (typeof msg == "undefined") msg = console.log;

  job.html = full_html.innerHTML
    .replace(/&nbsp;/g, " ")
    .replace(/(\r\n|\n|\r|\t)/gm, "")
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    )
    .trim();
  job.html = removeEmojis(job.html);
  job.html = removeTextBefore(job.html, "Job Description", false);
  //quita parrafos.. (desde el punto A al punto B) por lapabras clave
  job.html = cleanFromPointAtoB(job.html, "", "");
  job.html = cleanFromPointAtoB(job.html, "", "");
  /*
  job.html = removeTextAfter(job.html, 'HEB JE VRAGEN?', true);
  job.html = removeTextAfter(job.html, "Contrat: CDI", true);
  job.html = removeTextAfter(job.html, "Réf:", true);
  job.html = removeTextAfter(job.html, 'Interesse?', true);
  job.html = removeTextAfter(job.html, 'Contact', true);
  job.html = removeTextAfter(job.html, 'apply', true);
  job.html = removeTextAfter(job.html, 'Apply', true);
  job.html = removeTextAfter(job.html, 'Info', true);
  job.html = removeTextAfter(job.html, 'Solliciteren', true);
  job.html = removeTextAfter(job.html, 'Neem snel contact', true);
  job.html = removeTextAfter(job.html, 'Heb je interesse?', true);
  job.html = removeTextAfter(job.html, 'Candidature :', true);
  job.html = removeTextAfter(job.html, 'Geïnteresseerd?', true);
  job.html = removeTextAfter(job.html, 'Enthousiast geworden?', true);
  job.html = removeTextAfter(job.html, 'Meer informatie?', true);
  job.html = removeTextBefore(job.html, 'Duties and Responsibilities:', false);
  job.html = removeTextBefore(job.html, 'Specific duties and responsibilities include, but are not limited to:', false);
  job.html = removeTextBefore(job.html, 'Job Duties:', false);
  job.html = removeTextAfter(job.html, 'PAL Airlines is an equal opportunity', true);
  job.html = removeTextAfter(job.html, 'Air Borealis is an Equal Opportunity Employer', true);
  job.html = removeTextAfter(job.html, 'PAL is an equal opportunity employer', true);
  job.html = removeTextAfter(job.html, 'Envoyez votre CV', true);
  */
  job.html = cleanHTML(job.html);
  var tmp = document.createElement("div");
  tmp.innerHTML = job.html;
  job.jobdesc = tmp.textContent.trim();
  job.jobdesc = cleanHTML(job.jobdesc);
  job.jobdesc = job.jobdesc.replace(/<[^>]*>?/g, ""); //quita etiquetas HMLT.
  let regex = /[0-9]{1,} tot|[0-9]{1,} jaar|[0-9]{1,} ans|[0-9]{1,} years/gi;
  if (job.jobdesc.search(regex > -1)) {
    job.experience_required = job.jobdesc.match(regex)?.shift()
      ? job.jobdesc.match(regex)?.shift()
      : "";
  }

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

function cleanFromPointAtoB(text, a, b) {
  if (text.indexOf(a) > -1 && text.indexOf(b) > -1) {
    let a_b = text.slice(text.indexOf(a), text.indexOf(b));
    text = text.replace(a_b, "").replace(b, "").trim();
  }
  return text;
}

function removeEmojis(string) {
  var regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, "");
}
