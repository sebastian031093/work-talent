// instrucciones: Cambiar la URL del spider config> ejemplo formato normal job site: "https://prudential.wd3.myworkdayjobs.com/prudential"
//  GETJOBDATA: "NO" 
//
//Extract
(function () {
  var returnedJobs = [];
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "expected_jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  let endpoint = window.location.href.split("/0/").shift().split("/fs/").shift() + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont;
  msg(endpoint);
  var data = {};
  $.ajax({
    url: endpoint,
    headers: {
      "accept": "application/json,application/xml",
      "accept-language": "en,es;q=0.9,en-CA;q=0.8,es-419;q=0.7,en-US;q=0.6",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "stats-perf": "735878cec60544f0881b0a2776d1be57,1129,,0",
      "workday-client-manifest-id": "mvp",
      "x-workday-client": "2021.18.009"
    },
    type: 'GET',
    //data : JSON.stringify(data),
    dataType: "json",
    async: false,
    success: function (json) {
      if (out["pass_it"].cont == 0) {
        //extract total jobs in first pagination
        var descPath = getPath(json, "number.paginationCount");
        descPath = descPath.split('.').slice(0, -1).join('.') + '.value';
        var expected_jobs_str = setToValue(json, descPath);
        //var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
        out["pass_it"].expected_jobs = expected_jobs_str;
      }

      var descPath = getPath(json, "facetSearchResultList");
      descPath = descPath.split('.').slice(0, -1).join('.') + '.listItems';
      var jobs = setToValue(json, descPath);
      //var jobs = json.body.children[1].children[0].listItems;
      for (i in jobs) {
        var job = {}; /*init*/
        job.title = jobs[i].title.instances[0].text;
        job.url = window.location.protocol + "//" + window.location.hostname + jobs[i].title.commandLink + '?codes=NEUVOO';
        msg('Title: ' + job.title + '\nURL: ' + job.url);
        //-----------DESCRIPTION---------
        var json = JSON.parse(getDescription(job.url));
        var descPath = getPath(json, "richTextArea.jobPosting.jobDescription");
        var descJson = JSON.parse(json.structuredDataAttributes.data);
        descPath = descPath.split('.').slice(0, -1).join('.') + '.text';
        //job.html = json.openGraphAttributes.description.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www\.\S+|https?\S+|\(\d+\)|\S+\.com|<\/?[^>]+(>|$)/gi, "");
        var full_html = document.createElement('div');
        full_html.innerHTML = setToValue(json, descPath);

        for (const a of full_html.querySelectorAll('p, span, li')) {
          if (a.textContent.search(/@|http|www\.|www\.oxfordproperties\.com|\.com/ig) > -1) {
            a.remove();
          }
        }

        job.html = full_html.innerHTML.trim();

        job.html = removeTextBefore(job.html, "Job Description", false);
        job.html = removeTextAfter(job.html, /To Apply|Location:/, true);

        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);

        //---------MULTILOCATION-------------------
        job.temp = 96;

        if (typeof descJson !== 'undefined') {
          job.dateposted_raw = getDateFormat(descJson.datePosted, '-', 2, 1, 0)
        }

        var descPath = getPath(json, "labeledImage.JOB_TYPE");
        if (descPath) {
          descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
          job.source_jobtype = setToValue(json, descPath);
        }


        var descPath = getPath(json, "labeledImage.JOB_REQ");
        if (descPath) {
          descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
          job.reqid = setToValue(json, descPath);
        }

        var descPath = getPath(json, "labeledImage.LOCATION");
        if (descPath) {
          descPath = descPath.split('.').slice(0, -2).join('.');
          var arrayAuxLoc = setToValue(json, descPath);

          var countReqId = 0;
          for (let auxLoc of arrayAuxLoc) {
            if (auxLoc.ecid == 'labeledImage.LOCATION') {
              var jobx = {};
              jobx = { ...job }
              jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
              jobx.location = auxLoc.imageLabel + '';
              returnedJobs.push(jobx);
              countReqId += 1;
            }
          }
        } else {
          job.location = 'HQ-No Loc';
          returnedJobs.push(job);
        }

      }
    },
    error: function (error) {
      msg(error);
    }
  });
  out['pass_it'].jobs = returnedJobs.length;
  out["jobs"] = returnedJobs;
  return out;
})();
function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control", "no-cache");
  xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma", "no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
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
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
  } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) { nDays = 0; }
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
  var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  dateJob = mm + '/' + dd + '/' + yyyy;
  return dateJob;
}
function getPath(obj, value, path) {
  try {
    if (typeof obj !== 'object') {
      return;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var t = path;
        var v = obj[key];
        if (!path) {
          newPath = key;
        } else {
          newPath = path + '.' + key;
        }
        if (v === value) {
          return newPath;
        } else if (typeof v !== 'object') {
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
  path = path.split('.');
  for (var i of path) {
    obj = obj[i];
  }
  return obj
}
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();

  day = day.replace(/rd|st|th/i, "").trim();
  if (day < 10 && day.length < 2) { day = "0" + day; }
  if (year.length == 2) { year = "20" + year; }

  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.search(/jan/i) > -1) { month = "01"; }
    if (month.search(/feb|fév/i) > -1) { month = "02"; }
    if (month.search(/mar|maar/i) > -1) { month = "03"; }
    if (month.search(/apr|avr/i) > -1) { month = "04"; }
    if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
    if (month.search(/jun|juin/i) > -1) { month = "06"; }
    if (month.search(/jul|juil/i) > -1) { month = "07"; }
    if (month.search(/aug|août/i) > -1) { month = "08"; }
    if (month.search(/sep/i) > -1) { month = "09"; }
    if (month.search(/oct|okt/i) > -1) { month = "10"; }
    if (month.search(/nov/i) > -1) { month = "11"; }
    if (month.search(/dec|déc/i) > -1) { month = "12"; }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}

//Pagination 
(function () {
  var out = {};
  if (typeof msg == "undefined") msg = function (x) { return x; };
  out["pass_it"] = pass_it;
  if (out["pass_it"].expected_jobs <= (out["pass_it"].cont + 50)) {
    out["has_next_page"] = false;
  } else if (out["pass_it"].jobs > 0) {
    out["pass_it"].cont += 50;
    out["has_next_page"] = true;
  }
  out.waitFor = 'pre';
  out.wait = true;
  return out;
})();




//El Simplificado https://mckesson.wd3.myworkdayjobs.com/External_Careers
//extract
(function () {
  var jobs = [];
  var out = {};
  out["pass_it"] = pass_it;
  var counter = 1;
  var limit = 0;
  var json;
  var jsonDesc;

  var data = { "limit": 20, "offset": out.pass_it.offSet, "searchText": "", "appliedFacets": {} };
  $.ajax({
    url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift() + window.location.pathname + '/jobs',
    headers: {
      "accept": "application/json",
      "accept-language": "en-US",
      "content-type": "application/json",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    type: 'POST',
    data: JSON.stringify(data),
    dataType: "json",
    async: false,
    success: function (result) {
      if (out.pass_it.offSet == 0) {
        out.pass_it.limit = result.total;
      }
      json = result.jobPostings;
      for (var elem of json) {
        var job = {};
        job.reqid = elem.bulletFields[0];
        job.title = elem.title;
        //job.location = elem.positionOfLocation;
        job.url = window.location.href + elem.externalPath;
        msg('Title: ' + job.title + '\nURL: ' + job.url);
        job.dateposted_raw = elem.postedOn.replace('+', '');
        job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 1, 2);
        job.temp = 96;
        ///////////////////////////////
        $.ajax({
          url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift() + window.location.pathname + elem.externalPath,
          headers: {
            "accept": "application/json",
            "accept-language": "en-US",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
          },
          type: 'GET',
          dataType: "json",
          async: false,
          success: function (result) {
            jsonDesc = result.jobPostingInfo;
            job.source_jobtype = jsonDesc.timeType;
            var full_html = document.createElement("div");
            full_html.innerHTML = jsonDesc.jobDescription;

            if (full_html) {

              for (const a of full_html.querySelectorAll('p, span, li')) {
                if (a.textContent.search(/@|http|www./ig) > -1) {
                  a.remove();
                }
              }

              var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

              if (remove_selectors.length > 0) {
                remove_selectors.forEach(remove_selector => {
                  for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                  }
                });
              }

              if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
              if (typeof msg == "undefined") msg = console.log;

              job.html = full_html.innerHTML.trim();

              //job.html = removeTextBefore(job.html, '', false);
              //job.html = removeTextAfter(job.html, '', true);

              job.html = cleanHTML(job.html);
              var tmp = document.createElement('div');
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

            if (jsonDesc.additionalLocations) {
              var countReqId = 0;

              var jobx = {};
              jobx = { ...job }
              jobx.location = jsonDesc.jobRequisitionLocation.descriptor.trim();
              jobs.push(jobx);

              for (let auxLoc of jsonDesc.additionalLocations) {
                var jobx = {};
                jobx = { ...job }
                jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
                jobx.location = auxLoc.trim();
                jobs.push(jobx);
                countReqId += 1;
              }
            } else {
              job.location = jsonDesc.jobRequisitionLocation.descriptor.trim();
              jobs.push(job);
            }
          },
          error: function (error) {
            msg(error);
          }
        });
        ///////////////////////////////
      }
      counter = counter + 1;
    },
    error: function (error) {
      msg(error);
    }
  });
  out["jobs"] = jobs;
  return out;
})();
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
  } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) { nDays = 0; }
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
  var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  dateJob = mm + '/' + dd + '/' + yyyy;
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
  out.pass_it.offSet += 20
  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();
//infinity
(function () {
  var out = {};
  if (pass_it["offSet"]) {
    out["pass_it"] = pass_it;
  } else {
    out["pass_it"] = {
      "offSet": 0,
      "limit": 0
    };
  }
  return out;
})();

//El viejo pero optimizado
//extract
(function () {
  var jobs = [];
  var out = {};
  out["pass_it"] = pass_it;
  var counter = 1;
  var limit = 0;
  var json;
  var jsonDesc;

  $.ajax({
    url: window.location.origin + window.location.pathname + '/fs/searchPagination/318c8bb6f553100021d223d9780d30be/' + out.pass_it.offSet,
    headers: {
      "accept": "application/json,application/xml",
      "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sessionsecuretoken": "smstg2gg4nji819fpo60k0j8et",
      "stats-perf": "08277f793a1f47af8b1cec3b61f3357d,713,,0",
      "x-workday-client": "2021.39.009"
    },
    type: 'GET',
    dataType: "json",
    async: false,
    success: function (result) {
      json = result;
      if (out.pass_it.offSet == 0) {
        var descPath = getPath(json, "number.paginationCount");
        descPath = descPath.split('.').slice(0, -1).join('.') + '.value';
        out["pass_it"].limit = setToValue(json, descPath);
      }

      var descPath = getPath(json, "facetSearchResultList");
      descPath = descPath.split('.').slice(0, -1).join('.') + '.listItems';
      var jobList = setToValue(json, descPath);
      //var jobs = json.body.children[1].children[0].listItems;
      for (var elem of jobList) {
        var job = {};
        //job.title = elem.title.instances[0].text;
        job.url = window.location.protocol + "//" + window.location.hostname + elem.title.commandLink + '?codes=NEUVOO';
        //msg('Title: ' + job.title + '\nURL: ' + job.url);
        job.temp = 96;
        //-----------DESCRIPTION---------
        $.ajax({
          url: job.url,
          headers: {
            "accept": "application/json,application/xml",
            "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-workday-client": "2021.39.009"
          },
          type: 'GET',
          dataType: "json",
          async: false,
          success: function (result) {
            jsonDesc = result;

            job.title = jsonDesc.windowTitle;
            msg('Title: ' + job.title + '\nURL: ' + job.url);

            var descPath = getPath(jsonDesc, "richTextArea.jobPosting.jobDescription");
            descPath = descPath.split('.').slice(0, -1).join('.') + '.text';
            var full_html = document.createElement('div');
            full_html.innerHTML = setToValue(jsonDesc, descPath);

            for (const a of full_html.querySelectorAll('p, span, li')) {
              if (a.textContent.search(/@|http|www\./ig) > -1) {
                a.remove();
              }
            }

            job.html = full_html.innerHTML.trim();

            job.html = removeTextBefore(job.html, "Job Description", false);
            job.html = removeTextAfter(job.html, /To Apply|Location:/, true);

            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);

            //---------MULTILOCATION-------------------

            var descJson = JSON.parse(jsonDesc.structuredDataAttributes.data);
            if (typeof descJson !== 'undefined') {
              job.dateposted_raw = getDateFormat(descJson.datePosted, '-', 2, 1, 0)
            }

            var descPath = getPath(jsonDesc, "labeledImage.JOB_TYPE");
            if (descPath) {
              descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
              job.source_jobtype = setToValue(jsonDesc, descPath);
            }

            var descPath = getPath(jsonDesc, "labeledImage.JOB_REQ");
            if (descPath) {
              descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
              job.reqid = setToValue(jsonDesc, descPath);
            }

            var descPath = getPath(jsonDesc, "labeledImage.LOCATION");
            if (descPath) {
              descPath = descPath.split('.').slice(0, -2).join('.');
              var arrayAuxLoc = setToValue(jsonDesc, descPath);

              var countReqId = 0;
              for (let auxLoc of arrayAuxLoc) {
                if (auxLoc.ecid == 'labeledImage.LOCATION') {
                  var jobx = {};
                  jobx = { ...job }
                  jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
                  jobx.location = auxLoc.imageLabel + '';
                  jobs.push(jobx);
                  countReqId += 1;
                }
              }
            } else {
              job.location = 'HQ-No Loc';
              jobs.push(job);
            }
          },
          error: function (error) {
            msg(error);
          }
        });
        //-----------END DESCRIPTION---------
      }
    },
    error: function (error) {
      msg(error);
    }
  });
  out["jobs"] = jobs;
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
    if (typeof obj !== 'object') {
      return;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var t = path;
        var v = obj[key];
        if (!path) {
          newPath = key;
        } else {
          newPath = path + '.' + key;
        }
        if (v === value) {
          return newPath;
        } else if (typeof v !== 'object') {
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
  path = path.split('.');
  for (var i of path) {
    obj = obj[i];
  }
  return obj
}
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
      month = dateRaw.split(cut)[monthPosition].trim(),
      year = dateRaw.split(cut)[yearPosition].trim();

  day = day.replace(/rd|st|th/i, "").trim();
  if (day < 10 && day.length < 2) { day = "0" + day; }
  if (year.length == 2) { year = "20" + year; }

  if (dateRaw.search(/[a-z]/gi) > -1) {
    //English, Dutch, French
    if (month.search(/jan/i) > -1) { month = "01"; }
    if (month.search(/feb|fév/i) > -1) { month = "02"; }
    if (month.search(/mar|maar/i) > -1) { month = "03"; }
    if (month.search(/apr|avr/i) > -1) { month = "04"; }
    if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
    if (month.search(/jun|juin/i) > -1) { month = "06"; }
    if (month.search(/jul|juil/i) > -1) { month = "07"; }
    if (month.search(/aug|août/i) > -1) { month = "08"; }
    if (month.search(/sep/i) > -1) { month = "09"; }
    if (month.search(/oct|okt/i) > -1) { month = "10"; }
    if (month.search(/nov/i) > -1) { month = "11"; }
    if (month.search(/dec|déc/i) > -1) { month = "12"; }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}
//pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 50
  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();
//infinity
(function() {
  var out = {};
  if (pass_it["x"]) {
    out["pass_it"] = pass_it;
  } else {
    out["pass_it"] = {
      "offSet": 0,
      "limit": 0
    };
  }
  return out;
})();