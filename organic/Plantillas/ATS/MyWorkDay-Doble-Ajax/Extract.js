// EXTRACT STEP -------------->
// DISENADO PARA UN JOBSITE COMO EL SIGUIENTE -----> https://wgu.wd5.myworkdayjobs.com/External
// PONER Get Job Data: Not
(function () {
    var jobs = [];
    var out = {};
  
    // VARIABLE DECLARATIONS
    var json;
    var is_multi_loc; // Es usado para comprobar si el jobsite tiene multilocation
    var full_html;
  
    const ENDPOINT =
      "https://wgu.wd5.myworkdayjobs.com/wday/cxs/wgu/External/jobs"; // URL DONDE SE ENCUENTRA EL JSON
    const BASE_JOB = "https://wgu.wd5.myworkdayjobs.com/en-US/External"; // URL DONDE EL USUARIO VE LA DESCRIPTION
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it.hasOwnProperty("cont")) {
      out["pass_it"] = {
        cont: 0, // USED TO PAGINATE
        jobs_per_page: 0, // GET THE JOBS OBTAIN ON EACH ITERATION
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var data = {
      limit: 20,
      offset: out["pass_it"].cont,
      searchText: "",
      appliedFacets: {},
    };
  
    $.ajax({
      url: ENDPOINT, // 1) url
      headers: {
        accept: "application/json",
        "accept-language": "en-US",
        "content-type": "application/json",
        "sec-ch-ua": '" Not;A Brand";v="99", "Opera";v="79", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      type: "POST", // 2) tipo de peticion
      dataType: "json", // 3) data que retorna
      //data: data,
      data: JSON.stringify(data), // 4) conversion de la variable data a String
      async: false,
      success: function (result) {
        json = result.jobPostings; // 5) ruta de los trabajos
  
        out["pass_it"].jobs_per_page = json.length; // JOBS OBTENIDOS POR PAGINA
  
        if (!out["pass_it"].hasOwnProperty("totalJobs")) {
          out["pass_it"].totalJobs = result.totalCount; // GET EXPECTED JOBS ONCE.
        }
  
        // CONTROLADOR DE MENSAJES ------------------------------>
        msg(
          "\x1b[44m Numero de jobs en la pagina actual  -----> " +
            out["pass_it"].jobs_per_page
        );
        // ------------------------------------------------------>
  
        if (out["pass_it"].jobs_per_page > 0) {
          for (var i = 0; i < out["pass_it"].jobs_per_page; i++) {
            var job = {};
            var elem = json[i];
  
            job.title = elem.title;
            job.reqid = elem.bulletFields[0];
            job.url = BASE_JOB + elem.externalPath;
  
            //=================================================
            //------------------ DATE-POSTED ------------------
            //=================================================
            job.dateposted_raw = elem.postedOn;
            job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 1, 2);
            /*---------------------------------------------------------*/
            //job.source_salary = elem.salary;
            job.source_jobtype = elem.timeType;
            //job.source_empname = elem.zzreqDSBrands;
  
            job.temp = "10132021";
            //====================================================
            //-------------- MULTI-LOCATION CHECK ----------------
            //====================================================
            let URL_JSON_MULTI_LOC =
              "https://wgu.wd5.myworkdayjobs.com/wday/cxs/wgu/External" +
              elem.externalPath; // SE CREA LA URL DONDE ESTA EL JSON DESCRIPTION
            $.ajax({
              url: URL_JSON_MULTI_LOC, // 1) url
              headers: {
                accept: "application/json",
                "content-type": "application/json",
              },
              type: "GET", // 3) tipo
              dataType: "json", // 4) data que retorna
              async: false,
              success: function (result) {
                let res = result.jobPostingInfo;
                // ============================================
                // ++++++++++++ JOB-DESCRIPTION +++++++++++++++
                // ============================================
                full_html = res.jobDescription;
  
                if (full_html) {
                  // ASSIGNING VARIABLES TO THE JOB OBJECT
                  job.html = full_html;
  
                  job.html = removeTextBefore(
                    job.html,
                    "Position Summary",
                    false
                  );
                  job.html = removeTextBefore(
                    job.html,
                    "Job Profile Summary:",
                    false
                  );
                  job.html = removeTextBefore(job.html, "The Role:", false);
  
                  job.html = removeTextAfter(
                    job.html,
                    "As an equal opportunity employer",
                    true
                  );
                  job.html = removeTextAfter(
                    job.html,
                    "We offer heavily discounted WGU",
                    true
                  );
  
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement("div");
                  tmp.innerHTML = job.html;
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
                } else {
                  msg("\x1b[41m NO JOBDESCRIPTION PROPERTY");
                }
  
                is_multi_loc = res.additionalLocations; // COMPROBAR SI TIENE MULTI-LOCATION
                if (is_multi_loc) {
                  if (res.location) {
                    is_multi_loc.push(res.location);
                  }
  
                  is_multi_loc.map((location) => {
                    var jobx = {};
                    jobx = {
                      ...job,
                    };
                    jobx.location = location.trim();
                    jobx.location = jobx.location
                      .replace("City Office", "")
                      .replace("WGU", "")
                      .replace("Office", "")
                      .trim();
                    if (jobx.location == "Home") {
                      jobx.location = "Salt Lake City, UT";
                    }
                    if (jobx.location == "Home Office") {
                      jobx.location = "Salt Lake City, UT";
                    }
                    jobs.push(jobx);
                  });
                } else {
                  job.location = res.location;
                  if (job.location) {
                    job.location = job.location.replace("City Office", "").trim();
                    if (job.location == "Home Office") {
                      job.location = "Salt Lake City, UT";
                    }
                  } else {
                    job.location = "Salt Lake City, UT";
                  }
  
                  jobs.push(job);
                }
              },
              error: function (res) {
                msg(res);
              },
            });
          } // End for loop
        } else {
          var job_fantasma = {
            title: "SPOOKY JOB",
          };
          jobs.push(job_fantasma);
        }
      },
      error: function (error) {
        msg(error);
      },
    });
  
    out["jobs"] = jobs;
    return out;
  })();
  
  function dateAgo(text, cut, value, word) {
    let dayWeekMonthYear;
    let numberDWMY = parseInt(text.trim().split(cut)[value], 10);
  
    if (typeof text.split(cut)[word] !== "undefined") {
      dayWeekMonthYear = text.split(cut)[word].toUpperCase();
    } else {
      dayWeekMonthYear = text
        .split(cut)
        [text.split(cut).length - 1].toUpperCase();
    }
  
    let date_Now = new Date();
    let nDays = 0;
  
    if (dayWeekMonthYear.search(/TODAY|HOUR/g) > -1) nDays = 0;
    if (dayWeekMonthYear.includes("YESTERDAY")) nDays = 1;
    if (dayWeekMonthYear.includes("DAYS")) nDays = numberDWMY;
    if (dayWeekMonthYear.includes("WEEK")) nDays = numberDWMY * 7;
    if (dayWeekMonthYear.includes("MONTH")) nDays = numberDWMY * 30;
    if (dayWeekMonthYear.includes("YEAR")) nDays = numberDWMY * 365;
  
    let dateJob = date_Now.getDate() - nDays;
    let get_date = date_Now.setDate(dateJob);
    let datePosted = new Date(get_date);
    let dd = datePosted.getDate();
    let mm = datePosted.getMonth() + 1;
    let yyyy = datePosted.getFullYear().toString();
  
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
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
  
 