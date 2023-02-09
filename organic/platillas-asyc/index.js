(function () {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  do {
    var data = `page=${counter}&sortBy=relevance&descending=false&internal=false&userId=77098e83-6705-45c9-9d3a-3d09be1daf8f&sessionId=a674e49d-2751-4ccc-bf1b-330665593ee4&deviceId=4254078588&domain=lhcgroup.jibeapply.com`;
    $.ajax({
      url: `https://careers.lhcgroup.com/api/jobs?${data}`,
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en,es-419;q=0.9,es;q=0.8",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="100", "Opera GX";v="86"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      type: "GET",
      data: data,
      dataType: "json",
      async: false,
      success: function (result) {
        json = result.jobs;
        limit = result.count;
        //msg(counter);
        for (var i = 0; i < json.length; i++) {
          var job = {};
          var elem = json[i];
          let {
            title,
            short_location,
            posted_date,
            description,
            apply_url,
            req_id,
            qualifications,
            responsibilities,
          } = elem.data;
          job.reqid = req_id;
          job.title = title;
          job.location = short_location;
          let regex1 = /remote/gi;
          let alternative_location = job.location;
          job.source_location = alternative_location;
          job.url = apply_url;
          job.dateposted_raw = getDateFormat(posted_date, " ", 1, 0, 2);
          job.jobdesc = `${description}\n${qualifications}\n${responsibilities}`;
          var tmp = document.createElement("div");
          tmp.innerHTML = job.jobdesc;
          job.html = tmp;
          //job.dateclosed_raw = elem.positionOfDateClosed;
          //job.source_jobtype = elem.positionOfJobtype;
          //job.source_salary = elem.positionOfSalary;
          //job.source_empname = elem.positionOfEmpname;
          //job.logo = elem.positionOfLogo;
          //job.source_apply_email = elem.positionOfEmail;

          job.temp = 23;
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function (error) {
        msg(error);
      },
    });
  } while (jobs.length < limit);

  out["jobs"] = jobs;
  return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();
  day = day.replace(/rd|st|th|nd/, "").trim();
  if (day < 10 && day.length < 2) {
    day = "0" + day;
  }
  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.search(/ene|jan|january|januari|jan?eiro|Январь|janvier/i) > -1) {
      month = "01";
    }
    if (
      month.search(/feb?v?|february|fév|februar|fev?ereiro|Февраль|février/i) >
      -1
    ) {
      month = "02";
    }
    if (month.search(/mar|march|maar|maart|março|Март|mars/i) > -1) {
      month = "03";
    }
    if (month.search(/apr|abr|april|avr|april|abril|Апрель|avril/i) > -1) {
      month = "04";
    }
    if (month.search(/may|mai|mei|maio|Май|Май|mai/i) > -1) {
      month = "05";
    }
    if (month.search(/jun|june|juin|juni|junho|червня|juin/i) > -1) {
      month = "06";
    }
    if (month.search(/jul|july|juil|juli|julho|Июль|juillet/i) > -1) {
      month = "07";
    }
    if (month.search(/aug|ago|august|août|augustus|agosto|Август|août/i) > -1) {
      month = "08";
    }
    if (month.search(/sep|set|september|set?embro|Сентябрь|septembre/i) > -1) {
      month = "09";
    }
    if (
      month.search(/oct|out|october|okt|oktober|out?ubro|Октябрь|octobre/i) > -1
    ) {
      month = "10";
    }
    if (month.search(/nov|november|novembro|Ноябрь|novembre/i) > -1) {
      month = "11";
    }
    if (month.search(/dec|dez|december|déc|dezembro|Декабрь|décembre/i) > -1) {
      month = "12";
    }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}
//////////////////////////////////////=====================async way===========================////////////////////////////////////

(async () => {
  let out = {};
  //let counter = 1;
  out["pass_it"] = pass_it;
  let limit = 0;
  let json;
  jobs = [];
  let data = `page=${out.pass_it.counter}&sortBy=relevance&descending=false&internal=false&userId=77098e83-6705-45c9-9d3a-3d09be1daf8f&sessionId=a674e49d-2751-4ccc-bf1b-330665593ee4&deviceId=4254078588&domain=lhcgroup.jibeapply.com`;
  try {
    const fetchPro = fetch(`https://careers.lhcgroup.com/api/jobs?${data}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en,es-419;q=0.9,es;q=0.8",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="100", "Opera GX";v="86"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: `https://careers.lhcgroup.com/careers-home/jobs?page=${out.pass_it.counter}`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    //Puedes hacer destructuring. {variable que necesito }
    const resp = await fetchPro;
    //console.log(resp);
    const datax = await resp.json();
    //const dataString = JSON.stringify(data);
    //console.log(datax);
    out.pass_it.stop = datax.count;
    datax.jobs.forEach((jobx) => {
      let job = {};
      let {
        title,
        short_location,
        posted_date,
        description,
        apply_url,
        req_id,
        qualifications,
        responsibilities,
      } = jobx.data;
      job.reqid = req_id;
      job.title = title;
      job.location = short_location;
      let regex1 = /remote/gi;
      let alternative_location = job.location;
      job.source_location = alternative_location;
      job.url = apply_url;
      job.dateposted_raw = getDateFormat(posted_date, " ", 1, 0, 2);
      job.jobdesc = `${description}\n${qualifications}\n${responsibilities}`;
      var tmp = document.createElement("div");
      tmp.innerHTML = job.jobdesc;
      job.html = tmp;
      //job.location = jobs.positionOfLocation;
      //job.url = jobs.positionOfUrl;
      //job.dateposted_raw = elem.positionOfDatePosted;
      //job.dateclosed_raw = elem.positionOfDateClosed;
      //job.source_jobtype = elem.positionOfJobtype;
      //job.source_salary = elem.positionOfSalary;
      //job.source_empname = elem.positionOfEmpname;
      //job.logo = elem.positionOfLogo;
      //job.source_apply_email = elem.positionOfEmail;
      job.temp = "1";
      jobs.push(job);
    });

    out.jobs = jobs;
    out.pass_it.arr += jobs.length;
  } catch (err) {
    console.log(err);
  }
  out["jobs"] = jobs;
  return out;
})();
