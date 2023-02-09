//Extract
(function () {
  var out = {};
  var iframeDocument = document.querySelector(
    'iframe[id="icims_content_iframe"]'
  ).contentWindow.document;
  var html_jobs = iframeDocument.querySelectorAll(
    'div[class*="iCIMS_JobsTable"] > div[class="row"]'
  );
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == 'function') continue;
    if (typeof html_jobs[x] == 'number') continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector('h2').textContent.trim();
    job.url =
      elem.querySelector('a').href.split('?').shift().trim() +
      '?mode=job&iis=Neuvoo"';
    for (var a of elem.querySelectorAll(
      'div[class*="header"] > span:nth-child(1)'
    )) {
      if (a.textContent.search(/Location/gi) > -1) {
        job.location = a.parentElement
          .querySelector('span:nth-child(2)')
          .textContent.replace('| ...', '')
          .trim();
      }
      if (a.textContent.search(/Posted Date/gi) > -1) {
        job.dateposted_raw = a.parentElement
          .querySelector('span:nth-child(2)')
          .textContent.trim();
        job.dateposted_raw = dateAgo(job.dateposted_raw, ' ', 0, 1);
      }
    }
    if (!job.location) {
      job.location = 'Cambridge, ON, CA';
    }
    for (var a of elem.querySelectorAll('div[class*="additionalFields"] dl')) {
      if (
        a.querySelector('dt').textContent.search(/ID|Posting Number/gi) > -1
      ) {
        job.reqid = a.querySelector('dd').textContent.trim();
      }
      if (a.querySelector('dt').textContent.search(/Tipo de Posición/gi) > -1) {
        job.source_jobtype = a.querySelector('dd').textContent.trim();
      }
      if (
        a
          .querySelector('dt')
          .textContent.search(
            /Fecha de cierre de la postulación|Closed Date/gi
          ) > -1
      ) {
        job.dateclosed_raw = a.querySelector('dd').textContent.trim();
      }
    }
    job.temp = 96;
    if (job.location.indexOf('|') > -1) {
      var array = job.location.split('|');
      var countReqId = 0;
      for (let auxLoc of array) {
        var jobx = {};
        jobx = { ...job };
        jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
        jobx.location = auxLoc.split('-').reverse().join(', ').trim() + '';
        jobs.push(jobx);
        countReqId += 1;
      }
    } else {
      job.location = job.location.split('-').reverse().join(', ') + '';
      jobs.push(job);
    }
  }
  out['jobs'] = jobs;
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
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
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
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) {
    nDays = 1;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) {
    nDays = numberDWMY;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) {
    nDays = numberDWMY * 7;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) {
    nDays = numberDWMY * 30;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) {
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
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  dateJob = mm + '/' + dd + '/' + yyyy;
  return dateJob;
}
//Pagination
(function () {
  var out = {};
  var iframeDocument = document.querySelector(
    'iframe[id="icims_content_iframe"]'
  ).contentWindow.document;
  var selector = 'div[class="iCIMS_Paginator_Bottom"] a'; // selector donde esta la paginacion
  if (typeof pass_it == 'undefined') pass_it = {};
  if (!pass_it['cont']) {
    out['pass_it'] = {
      cont: 1,
    };
  } else {
    out['pass_it'] = pass_it;
  }
  out['has_next_page'] = false;
  out['pass_it'].cont += 1;
  var all_elems = iframeDocument.querySelectorAll(selector);
  [].forEach.call(all_elems, function (elemento) {
    if (
      elemento.textContent.replace('Page', '').split('of').shift().trim() ==
      out['pass_it'].cont
    ) {
      //msg("Page: " + elemento.textContent.trim());
      elemento.click();
      out['has_next_page'] = true;
    }
  });
  out['wait'] = true;
  return out;
})();
//JobData
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];
  var iframeDocument = document.querySelector(
    'iframe[id="icims_content_iframe"]'
  ).contentWindow.document;
  var full_html = iframeDocument.querySelector('div[class="iCIMS_JobContent"]');
  if (full_html) {
    var remove_selectors = [
      'div[class="iCIMS_JobHeaderGroup"]',
      'div[class="iCIMS_Logo"]',
      'div[class="iCIMS_PageFooter"]',
      'div[class="iCIMS_JobOptions"]',
      'a',
      'script',
      'i',
      'img',
      'style',
      'button',
      'figure',
      'noscript',
      'svg',
      'form',
      'input',
      'iframe',
      'link',
    ];
    if (remove_selectors.length > 0) {
      remove_selectors.forEach(remove_selector => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }
    for (const a of full_html.querySelectorAll('p, span, li')) {
      if (a.textContent.search(/@|http|www./gi) > -1) {
        a.remove();
      }
    }
    for (const a of full_html.querySelectorAll('dt')) {
      if (a.textContent.search(/Minimum Pay/gi) > -1) {
        if (
          a.nextElementSibling.textContent.trim() != '' &&
          a.nextElementSibling.textContent.match(/[1-9]/)
        ) {
          job.source_salary = a.nextElementSibling.textContent.trim();
          a.nextElementSibling.remove();
          a.remove();
        }
      }
      if (a.textContent.search(/Maximum Pay/gi) > -1) {
        if (
          a.nextElementSibling.textContent.trim() != '' &&
          a.nextElementSibling.textContent.match(/[1-9]/)
        ) {
          job.source_salary += ' - ' + a.nextElementSibling.textContent.trim();
          a.nextElementSibling.remove();
          a.remove();
        }
      }
    }
    if (typeof cleanHTML == 'undefined')
      cleanHTML = function (x) {
        return x;
      };
    if (typeof msg == 'undefined') msg = console.log;
    job.html = full_html.innerHTML.trim();
    job.html = removeTextBefore(job.html, 'Overview', false);
    //job.html = removeTextAfter(job.html, '', true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    if (job.jobdesc.length < 50) {
      job.html = ' ';
      job.jobdesc = ' ';
    }
  } else {
    job.html = ' ';
    job.jobdesc = ' ';
  }
  out['job'] = job;
  return out;
})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = '<h3>' + text + '</h3>' + newHtml;
    }
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + '<p>' + text + '</p>';
    }
  }
  return newHtml;
}
//Json
//Extract
(function () {
  var jobs = [];
  var out = {};
  out['pass_it'] = pass_it;
  var counter = 0;
  var limit = 0;
  var json;
  //do {
  //var data = {};
  $.ajax({
    url:
      window.location.origin +
      window.location.pathname +
      '?in_iframe=1&pr=' +
      out.pass_it.offSet,
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="92", "Opera GX";v="78"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'iframe',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'upgrade-insecure-requests': '1',
    },
    type: 'GET',
    //data : JSON.stringify(data),
    dataType: 'html',
    async: false,
    success: function (result) {
      json = document.createElement('div');
      json.innerHTML = result;
      out.pass_it.limit = json
        .querySelector('div[class="iCIMS_Paging text-center"] > a:last-child')
        .href.split('pr=')
        .pop()
        .split('&')
        .shift()
        .trim();
      msg('Counter: ' + out.pass_it.offSet + '\nLimit: ' + out.pass_it.limit);
      //var iframeDocument = json.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
      var html_jobs = json.querySelectorAll(
        'div[class*="iCIMS_JobsTable"] > div[class="row"]'
      );
      for (var elem of html_jobs) {
        var job = {};
        job.title = elem.querySelector('h2').textContent.trim();
        job.url =
          elem.querySelector('a').href.split('?').shift().trim() +
          '?mode=job&iis=Neuvoo"';
        for (var a of elem.querySelectorAll(
          'div[class*="header"] > span:nth-child(1)'
        )) {
          if (a.textContent.search(/Location/gi) > -1) {
            job.source_location = a.parentElement
              .querySelector('span:nth-child(2)')
              .textContent.trim();
            job.location = a.parentElement
              .querySelector('span:nth-child(2)')
              .textContent.replace('| ...', '')
              .trim();
          }
          if (a.textContent.search(/Posted Date/gi) > -1) {
            job.dateposted_raw = a.parentElement
              .querySelector('span:nth-child(2)')
              .getAttribute('title')
              .split(' ')
              .shift()
              .trim();
            //job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 0, 1);
          }
        }
        if (!job.location) {
          job.location = 'Cambridge, ON, CA'; //HQ LOCATION, CHANGE ON EVERY CASE
        }
        for (var a of elem.querySelectorAll(
          'div[class*="additionalFields"] dl'
        )) {
          if (
            a.querySelector('dt').textContent.search(/ID|Posting Number/gi) > -1
          ) {
            job.reqid = a.querySelector('dd').textContent.trim();
          }
          if (
            a
              .querySelector('dt')
              .textContent.search(/Tipo de Posición|Type/gi) > -1 &&
            a
              .querySelector('dd')
              .textContent.match(
                /Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i
              )
          ) {
            job.source_jobtype = a.querySelector('dd').textContent.trim();
          }
          if (
            a
              .querySelector('dt')
              .textContent.search(
                /Fecha de cierre de la postulación|Closed Date/gi
              ) > -1
          ) {
            job.dateclosed_raw = a.querySelector('dd').textContent.trim();
          }
        }
        job.temp = 96;
        if (job.location.indexOf('|') > -1) {
          var array = job.location.split('|');
          var countReqId = 0;
          for (let auxLoc of array) {
            var jobx = {};
            jobx = { ...job };
            jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
            jobx.location = auxLoc.split('-').reverse().join(', ').trim() + '';
            jobs.push(jobx);
            countReqId += 1;
          }
        } else {
          job.location = job.location.split('-').reverse().join(', ') + '';
          jobs.push(job);
        }
      }
    },
    error: function (error) {
      msg(error);
    },
  });
  //} while (counter <= limit);
  out['jobs'] = jobs;
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
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
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
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) {
    nDays = 1;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) {
    nDays = numberDWMY;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) {
    nDays = numberDWMY * 7;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) {
    nDays = numberDWMY * 30;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) {
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
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  dateJob = mm + '/' + dd + '/' + yyyy;
  return dateJob;
}
//pagination
(function () {
  var out = {};
  out['pass_it'] = pass_it;
  out.pass_it.offSet += 1;
  if (out.pass_it.offSet <= out.pass_it.limit) {
    out['has_next_page'] = true;
  } else {
    out['has_next_page'] = false;
  }
  out['wait'] = false;
  return out;
})();
//infinity
(function () {
  var out = {};
  if (pass_it['offSet']) {
    out['pass_it'] = pass_it;
  } else {
    out['pass_it'] = {
      offSet: 0,
      limit: 0,
    };
  }
  return out;
})();
//jobdata
(function () {
  var out = {};
  var job = {};
  var json;
  var jobInfo = pass_it['job'];
  $.ajax({
    url: jobInfo.url.split('?').shift() + '?in_iframe=1',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '"Chromium";v="94", " Not A;Brand";v="99", "Opera GX";v="80"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    },
    type: 'GET',
    //data : JSON.stringify(data),
    dataType: 'html',
    async: false,
    success: function (result) {
      json = document.createElement('div');
      json.innerHTML = result;
      var full_html = json.querySelector('div[class="iCIMS_JobContent"]');
      if (full_html) {
        for (const a of full_html.querySelectorAll('p, span, li')) {
          if (a.textContent.search(/@|http|www./gi) > -1) {
            a.remove();
          }
          if (a.textContent.search(/Starting rate/gi) > -1) {
            job.source_salary =
              '$' + a.textContent.split('$').pop().replace(/\*/g, '').trim();
            a.remove();
          }
        }
        for (const a of full_html.querySelectorAll('dt')) {
          if (a.textContent.search(/Type|Job Classification/gi) > -1) {
            if (
              a.nextElementSibling.textContent.trim() != '' &&
              a.nextElementSibling.textContent.match(
                /Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i
              )
            ) {
              job.source_jobtype = a.nextElementSibling.textContent.trim();
              a.nextElementSibling.remove();
              a.remove();
            }
          }
          if (a.textContent.search(/Minimum Pay/gi) > -1) {
            if (
              a.nextElementSibling.textContent.trim() != '' &&
              a.nextElementSibling.textContent.match(/[1-9]/)
            ) {
              job.source_salary = a.nextElementSibling.textContent.trim();
              a.nextElementSibling.remove();
              a.remove();
            }
          }
          if (a.textContent.search(/Maximum Pay/gi) > -1) {
            if (
              a.nextElementSibling.textContent.trim() != '' &&
              a.nextElementSibling.textContent.match(/[1-9]/)
            ) {
              job.source_salary +=
                ' - ' + a.nextElementSibling.textContent.trim();
              a.nextElementSibling.remove();
              a.remove();
            }
          }
        }
        var remove_selectors = [
          'div[class="iCIMS_JobHeaderGroup"]',
          'div[class="iCIMS_Logo"]',
          'div[class="iCIMS_PageFooter"]',
          'div[class="iCIMS_JobOptions"]',
          'a',
          'script',
          'i',
          'img',
          'style',
          'button',
          'figure',
          'noscript',
          'svg',
          'form',
          'input',
          'iframe',
          'link',
        ];
        if (remove_selectors.length > 0) {
          remove_selectors.forEach(remove_selector => {
            for (const a of full_html.querySelectorAll(remove_selector)) {
              a.remove();
            }
          });
        }
        if (typeof cleanHTML == 'undefined')
          cleanHTML = function (x) {
            return x;
          };
        if (typeof msg == 'undefined') msg = console.log;
        job.html = full_html.innerHTML.trim();
        job.html = removeTextBefore(job.html, 'Overview', false);
        job.html = removeTextAfter(
          job.html,
          /Need help finding the right job\?|\#[A-Z]/gi,
          true
        );
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        if (job.jobdesc.length < 50) {
          job.html = ' ';
          job.jobdesc = ' ';
        }
      } else {
        job.html = ' ';
        job.jobdesc = ' ';
      }
    },
    error: function (error) {
      msg(error);
    },
  });
  out['job'] = job;
  return out;
})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = '<h3>' + text + '</h3>' + newHtml;
    }
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + '<p>' + text + '</p>';
    }
  }
  return newHtml;
}
//https://careers-advocatesinc.icims.com/jobs/search?ss=1
//multilink
//infinity
(function () {
  var out = {};
  out['pass_it'] = {
    offSet: 0,
    limit: 0,
    multiLink: [
      'https://globalhub-berryglobal.icims.com/',
      'https://emeahub-berryglobal.icims.com/',
      'https://latam-berryglobal.icims.com/',
    ],
    multiLinkCount: 0,
  };
  msg(out.pass_it.multiLink);
  return out;
})();
//pagination
(function () {
  var out = {};
  out['pass_it'] = pass_it;
  out.pass_it.offSet += 1;
  if (out.pass_it.offSet <= out.pass_it.limit) {
    out['has_next_page'] = true;
  } else {
    out.pass_it.multiLinkCount += 1;
    if (out.pass_it.multiLinkCount < out.pass_it.multiLink.length) {
      out.pass_it.offSet = 0;
      out.pass_it.limit = 0;
      out['has_next_page'] = true;
    } else {
      out['has_next_page'] = false;
    }
  }
  return out;
})();
//extract
(function () {
  var jobs = [];
  var out = {};
  out['pass_it'] = pass_it;
  var counter = 0;
  var limit = 0;
  var json;
  //do {
  //var data = {};  out.pass_it.multiLink[out.pass_it.multiLinkCount];
  msg(
    'URL: ' +
      out.pass_it.multiLink[out.pass_it.multiLinkCount] +
      '\nPage: ' +
      out.pass_it.offSet
  );
  $.ajax({
    url:
      out.pass_it.multiLink[out.pass_it.multiLinkCount] +
      'jobs/search?in_iframe=1&pr=' +
      out.pass_it.offSet,
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="92", "Opera GX";v="78"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'iframe',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'upgrade-insecure-requests': '1',
    },
    type: 'GET',
    //data : JSON.stringify(data),
    dataType: 'html',
    async: false,
    success: function (result) {
      json = document.createElement('div');
      json.innerHTML = result;
      out.pass_it.limit = json
        .querySelector('div[class="iCIMS_Paging text-center"] > a:last-child')
        ?.href.split('pr=')
        .pop()
        .split('&')
        .shift()
        .trim();
      msg('Counter: ' + out.pass_it.offSet + '\nLimit: ' + out.pass_it.limit);
      //var iframeDocument = json.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
      var html_jobs = json.querySelectorAll(
        'div[class*="iCIMS_JobsTable"] > div[class="row"]'
      );
      for (var elem of html_jobs) {
        var job = {};
        job.title = elem.querySelector('h2').textContent.trim();
        job.url =
          elem.querySelector('a').href.split('?').shift().trim() +
          '?mode=job&iis=Neuvoo"';
        for (var a of elem.querySelectorAll(
          'div[class*="header"] > span:nth-child(1)'
        )) {
          if (a.textContent.search(/Location/gi) > -1) {
            job.source_location = a.parentElement
              .querySelector('span:nth-child(2)')
              .textContent.trim();
            job.location = a.parentElement
              .querySelector('span:nth-child(2)')
              .textContent.replace('| ...', '')
              .trim();
          }
          if (a.textContent.search(/Posted Date/gi) > -1) {
            job.dateposted_raw = a.parentElement
              .querySelector('span:nth-child(2)')
              .getAttribute('title')
              .split(' ')
              .shift()
              .trim();
            //job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 0, 1);
          }
        }
        if (!job.location) {
          job.location = 'Cambridge, ON, CA'; //HQ LOCATION, CHANGE ON EVERY CASE
        }
        for (var a of elem.querySelectorAll(
          'div[class*="additionalFields"] dl'
        )) {
          if (
            a.querySelector('dt').textContent.search(/ID|Posting Number/gi) > -1
          ) {
            job.reqid = a.querySelector('dd').textContent.trim();
          }
          if (
            a
              .querySelector('dt')
              .textContent.search(/Tipo de Posición|Type/gi) > -1 &&
            a
              .querySelector('dd')
              .textContent.match(
                /Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i
              )
          ) {
            job.source_jobtype = a.querySelector('dd').textContent.trim();
          }
          if (
            a
              .querySelector('dt')
              .textContent.search(
                /Fecha de cierre de la postulación|Closed Date/gi
              ) > -1
          ) {
            job.dateclosed_raw = a.querySelector('dd').textContent.trim();
          }
        }
        job.temp = 96;
        if (job.location.indexOf('|') > -1) {
          var array = job.location.split('|');
          for (let auxLoc of array) {
            var jobx = {};
            jobx = { ...job };
            jobx.location = auxLoc
              .split('-')
              .reverse()
              .map(loc => loc.trim())
              .join(', ')
              .trim();
            jobs.push(jobx);
          }
        } else {
          job.location = job.location
            .split('-')
            .reverse()
            .map(loc => loc.trim())
            .join(', ')
            .trim();
          jobs.push(job);
        }
      }
    },
    error: function (error) {
      msg(error);
    },
  });
  //} while (counter <= limit);
  out['jobs'] = jobs;
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
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
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
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) {
    nDays = 1;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) {
    nDays = numberDWMY;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) {
    nDays = numberDWMY * 7;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) {
    nDays = numberDWMY * 30;
  }
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) {
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
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  dateJob = mm + '/' + dd + '/' + yyyy;
  return dateJob;
}
////////////////////////////////////jobdata//////////////////////////
(function () {
  var out = {};
  var job = {};
  var json;
  var jobInfo = pass_it['job'];
  $.ajax({
    url: jobInfo.url.split('?').shift() + '?in_iframe=1',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '"Chromium";v="94", " Not A;Brand";v="99", "Opera GX";v="80"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    },
    type: 'GET',
    //data : JSON.stringify(data),
    dataType: 'html',
    async: false,
    success: function (result) {
      json = document.createElement('div');
      json.innerHTML = result;
      var full_html = json.querySelector('div[class="iCIMS_JobContent"]');
      if (full_html) {
        for (const a of full_html.querySelectorAll('p, span, li')) {
          if (a.textContent.search(/@|http|www./gi) > -1) {
            a.remove();
          }
          if (a.textContent.search(/Starting rate/gi) > -1) {
            job.source_salary =
              '$' + a.textContent.split('$').pop().replace(/\*/g, '').trim();
            a.remove();
          }
        }
        for (const a of full_html.querySelectorAll('dt')) {
          if (a.textContent.search(/Type|Job Classification/gi) > -1) {
            if (
              a.nextElementSibling.textContent.trim() != '' &&
              a.nextElementSibling.textContent.match(
                /Part-Time|Part Time|Parttime|Full-Time|Full Time|Fulltime/i
              )
            ) {
              job.source_jobtype = a.nextElementSibling.textContent.trim();
              a.nextElementSibling.remove();
              a.remove();
            }
          }
          if (a.textContent.search(/Minimum Pay/gi) > -1) {
            if (
              a.nextElementSibling.textContent.trim() != '' &&
              a.nextElementSibling.textContent.match(/[1-9]/)
            ) {
              job.source_salary = a.nextElementSibling.textContent.trim();
              a.nextElementSibling.remove();
              a.remove();
            }
          }
          if (a.textContent.search(/Maximum Pay/gi) > -1) {
            if (
              a.nextElementSibling.textContent.trim() != '' &&
              a.nextElementSibling.textContent.match(/[1-9]/)
            ) {
              job.source_salary +=
                ' - ' + a.nextElementSibling.textContent.trim();
              a.nextElementSibling.remove();
              a.remove();
            }
          }
        }
        var remove_selectors = [
          'div[class="iCIMS_JobHeaderGroup"]',
          'div[class="iCIMS_Logo"]',
          'div[class="iCIMS_PageFooter"]',
          'div[class="iCIMS_JobOptions"]',
          'a',
          'script',
          'i',
          'img',
          'style',
          'button',
          'figure',
          'noscript',
          'svg',
          'form',
          'input',
          'iframe',
          'link',
        ];
        if (remove_selectors.length > 0) {
          remove_selectors.forEach(remove_selector => {
            for (const a of full_html.querySelectorAll(remove_selector)) {
              a.remove();
            }
          });
        }
        if (typeof cleanHTML == 'undefined')
          cleanHTML = function (x) {
            return x;
          };
        if (typeof msg == 'undefined') msg = console.log;
        job.html = full_html.innerHTML.trim();
        job.html = removeTextBefore(job.html, 'Overview', false);
        job.html = removeTextAfter(
          job.html,
          /Need help finding the right job\?|\#[A-Z]/gi,
          true
        );
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
      }
    },
    error: function (error) {
      msg(error);
    },
  });
  out['job'] = job;
  return out;
})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = '<h3>' + text + '</h3>' + newHtml;
    }
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + '<p>' + text + '</p>';
    }
  }
  return newHtml;
}
