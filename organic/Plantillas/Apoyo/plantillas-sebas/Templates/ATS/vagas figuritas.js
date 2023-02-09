//Extract
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('div[class="jobs-filter__list row"] > div[class*="vg-card-oportunidades"]');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.reqid = elem.querySelector('a').href.split('/').pop().trim();
    job.title = elem.querySelector('p[class="box__title"]').textContent.replace(/ *\([^)]*\) *|- [0-9]*/g, "").trim();
    job.url = elem.querySelector('a').href.trim();
    job.location = elem.querySelector('div[class*="localization"]').nextElementSibling.textContent.replace('/', ', ').trim();
    job.dateclosed_raw = elem.querySelector('p[class="box__p job-box__countdown "]').textContent.trim();
    job.dateclosed_raw = dateAgo(job.dateclosed_raw, " ", 1, 2);
    if (elem.querySelector('div[class*="salary_level"]').nextElementSibling.textContent.trim() != 'A combinar') {
      job.source_salary = elem.querySelector('div[class*="salary_level"]').nextElementSibling.textContent.trim();
    }
    job.temp = 96;
    jobs.push(job);
  }

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
  if (dayWeekMonthYear.toUpperCase().search(/HOJE|AGORA|HORA/g) > -1) { nDays = 0; }
  if (dayWeekMonthYear.toUpperCase().indexOf('ONTEM') > -1) { nDays = 1; }
  if (dayWeekMonthYear.toUpperCase().indexOf('DIA') > -1) { nDays = numberDWMY; }
  if (dayWeekMonthYear.toUpperCase().indexOf('SEMANA') > -1) { nDays = numberDWMY * 7; }
  if (dayWeekMonthYear.toUpperCase().indexOf('MÊS') > -1) { nDays = numberDWMY * 30; }
  if (dayWeekMonthYear.toUpperCase().indexOf('ANO') > -1) { nDays = numberDWMY * 365; }
  var dateJob = date_Now.getDate() + nDays;     //resto dias de publicacion a la fecha actual
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
//Pagination
(function () {
  var out = {};
  var selector = 'div[class*="pagination"] > a';  // selector donde esta la paginacion

  if (typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1
    };
  } else {
    out["pass_it"] = pass_it;
  }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;

  var all_elems = document.querySelectorAll(selector);
  [].forEach.call(all_elems, function (elemento) {
    if (elemento.textContent.trim() == out["pass_it"].cont) {
      //msg("click!!!!!"+elemento.textContent.trim());
      elemento.click();
      out["has_next_page"] = true;
    }
  });

  out["wait"] = true;
  return out;
})();
//Jobdata
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var full_html = document.querySelector('div[id="jobSection"]');

  if (full_html) {

    if (document.querySelector("#jobSection > header > div > h6:nth-child(4) > span")) {
      job.source_jobtype = document.querySelector("#jobSection > header > div > h6:nth-child(4) > span").textContent.trim();
    }

    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe'];

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

    job.html = removeTextBefore(job.html, 'Detalhes da vaga', false);
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