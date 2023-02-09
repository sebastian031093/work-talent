//infinity
(function () {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      finishSearch: false,
      firstTime: true,
      cont: 1,
    };
  } else {
    out["pass_it"] = pass_it;
  }
  if (out["pass_it"].firstTime) {
    document.querySelector(".rcmmultiselectitem").click();
    msg("First Click");
    out["pass_it"].firstTime = false;
    out["has_next_page"] = true;
  } else if (out["pass_it"].finishSearch === false) {
    document.querySelector(".rcmmultiselectdialogheader > input").click();
    document.querySelector(".rcmmultiselectitem").click();
    msg("Second Click");
    out["pass_it"].finishSearch = true;
    out["has_next_page"] = true;
  } else {
    document.querySelector(".globalPrimaryButton").click();
    msg("Search Click");
    out["has_next_page"] = false;
    out.waitFor = "tr.jobResultItem";
  }
  out.pic = true;
  return out;
})();
//extract
(function () {
  var out = {};

  var html_jobs = document.querySelectorAll("tr.jobResultItem");
  var jobs = [];

  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a").textContent.trim();
    job.url = elem.querySelector("a").href.trim();
    job.url = job.url.split("&jobAlertController_jobAlertId")[0].trim(); //to prevent reindexation

    job.location = "Brazilia, Brazil";
    job.dateposted_raw = elem
      .querySelector("div.noteSection span:nth-child(2)")
      .textContent.replace("Posted on", "")
      .trim();
    job.dateposted_raw =
      job.dateposted_raw.split("/")[1] +
      "/" +
      job.dateposted_raw.split("/")[0] +
      "/" +
      job.dateposted_raw.split("/")[2];
    job.reqid = elem
      .querySelector(
        "td:nth-child(1) > div.noteSection > div > span:nth-child(1)"
      )
      .textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = "07/13/2021";

    jobs.push(job);
  }

  out["html"] = true;
  out["pic"] = true;
  out["jobs"] = jobs;
  return out;
})();
//pagination
(function () {
  var out = {};
  //out["pic"] = true;
  var next_page_selector = "li.next > a"; //selector to identify the next button
  var last_page_selector = "li.last_disabled"; //selector to identify the last page
  var clickable_elem = document.querySelector(next_page_selector);

  //stop condition
  if (document.querySelector(last_page_selector)) {
    //last page
    out["has_next_page"] = false;
  } else if (clickable_elem) {
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = true;
  }

  out.waitFor = "tr.jobResultItem";
  return out;
})();
//jobdata
(function () {
  var out = {};
  var job = {};
  var selector = "div.joqReqDescription";
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

  if (
    full_html != "" &&
    full_html != null &&
    full_html.textContent.trim() != "[Not translated in selected language]"
  ) {
    job.html = full_html.innerHTML.trim();
    job.jobdesc = full_html.textContent.trim();

    //despues
    job.html = removeTextAfter(job.html, "#SoySonda", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "#SoySonda", true);

    job.html = removeTextAfter(job.html, "Ter disponibilidade", true);
    job.jobdesc = removeTextAfter(job.jobdesc, "Ter disponibilidade", true);

    job.html = cleanHTML(job.html);
    job.jobdesc = cleanHTML(job.jobdesc);
  } else {
    job.flag_active = 0;
  }
  /*
    if(job.jobdesc.indexOf("Salario")>=0){
        job.source_salary = job.html.split("Salario").shift().split("</span>").pop().replace(/:|(<([^>]+)>)/g, "").trim();
    }

    if(job.jobdesc.indexOf("Contrato")>=0){
        job.source_jobtype = job.html.split("Contrato").shift().split("</span>").pop().replace(/:|(<([^>]+)>)/g, "").trim();
    }
    */
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

//////////////////////////////////////=====================JSON EXTRAC===========================////////////////////////////////////

/*  NOTA IMPORTANTE

en caso de que el link de todos los trabajos tenga un idioma diferente 
puedes contruirlo con el siguiente link
https://career5.successfactors.eu/career?company=mercadonas&lang=es_ES&career_ns=job_listing_summary&navBarLevel=JOB_SEARCH

recuerda que al hacerlo el selector next "a[title='Next Page']" de la paginacion
tambien cambiará de lenguaje

*/
// Before extract
(function () {
  var out = {};
  out.waitFor = "tr.jobResultItem";
  document.querySelector('span.sfDropDownContainer option[value="50"]').click();
  out.waitFor = "tr.jobResultItem";
  return out;
})();

// extract

(function () {
  var out = {};
  var html_jobs = document.querySelectorAll("tr.jobResultItem");
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == "function") continue;
    if (typeof html_jobs[x] == "number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem
      .querySelector("a.jobTitle")
      .textContent.trim()
      .split("&selected_lang=")
      .shift();
    job.url = elem.querySelector("a").href.trim();

    // if (elem.querySelector("span:nth-child(6)")) {
    job.location = elem
      .querySelector("div.noteSection div span:nth-of-type(3)")
      .textContent.trim();
    //   job.location = job.location.replace(". Ca",", CA").replace(" Va,",", VA,").replace(". Ak,",", AK,").replace(". Il,",", Il,").replace(". Tn,",", TN,").replace(". Ga, ",", GA,").replace(" , ",", ").trim();
    //  }

    job.dateposted_raw = elem
      .querySelector("div.noteSection > div:nth-child(1) > span:nth-child(2)")
      .textContent.trim()
      .split(" on ")
      .pop()
      .trim();
    var separador = "/";
    var ano = job.dateposted_raw.split(separador)[2];
    var mes = job.dateposted_raw.split(separador)[1];
    var dia = job.dateposted_raw.split(separador)[0];

    job.dateposted_raw = mes + "/" + dia + "/" + ano;
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();

    job.source_jobtype = elem
      .querySelector("div.noteSection div span:nth-of-type(4)")
      .textContent.trim();
    //job.jobid = MD5(job.title+job.location+job.dateposted_raw+job.source_jobtype+job.temp)
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 2;
    jobs.push(job);
  }

  out["jobs"] = jobs;
  return out;
})();

// Before pagination

(function () {
  var out = {};
  out["pic"] = true;
  out.waitFor = "a[title='Next Page']";
  return out;
})();

// pagination

(function () {
  var out = {};
  var next_page_selector = "li:not(.next_disabled) a[title='Next Page']"; //selector to identify the next button
  //var last_page_selector = ""; //selector to identify the last page

  var clickable_elem = document.querySelector(next_page_selector);

  //stop condition
  if (!document.querySelector(next_page_selector)) {
    //last page
    out["has_next_page"] = false;
  } else if (clickable_elem) {
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = true;
  }

  out.waitFor = "table#j tbody tr";
  return out;
})();

// job description
