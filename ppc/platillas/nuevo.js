////before extract
(function () {
  let out = {};
  out.waitFor = 'a';
  out.pic = true;
  return out;
})();
////extract
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('.jl');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == 'function') continue;
    if (typeof html_jobs[x] == 'number') continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector('a.title').textContent.trim();
    job.url = elem.querySelector('a').href.trim();
    job.reqid = job.url.split('id=').pop();
    job.source_empname = elem.querySelector('span.company').textContent.trim();
    job.location = elem.querySelector('div.jc').textContent.trim();
    job.source_location = job.location;
    //job.source_benefit = elem.querySelector("").textContent.trim();
    job.temp = 1;
    var full_html = getDescription(job.url);
    var temp = document.createElement('div');
    temp.innerHTML = full_html;
    var desc = temp.querySelector('div.description');
    job.html = desc.innerHTML.trim();
    job.jobdesc = desc.textContent.trim();
    job.html = cleanHTML(job.html);
    job.jobdesc = cleanHTML(job.jobdesc);
  }
  out['jobs'] = jobs;
  return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open('GET', url, false); //URL del ajax que trae la información del job
  var response = '';
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}

/////talent
//https://www.careers.com/primetals-technologies/machinist?LS=CB_13 seteala

(function () {
  var out = {};
  var jobs = [];
  var job = {};
  job.title = document.querySelector('h2').textContent.trim();
  job.url =
    'http://bullhorn.personified.com/client/jobInfoApplicationRespMgmt.action?EntityID=32466&source=talent_com'; // set url
  job.location = document
    .querySelector('h2')
    .nextElementSibling.textContent.trim();
  job.source_location = job.location;
  job.temp = '1';
  var full_html = document.querySelector('div[class="textSection"]');
  var remove_selectors = [];

  job.source_benefit = '';
  for (const a of full_html.querySelectorAll('span')) {
    if (a.textContent.search(/COMPENSATION\/BENEFITS:/gi) > -1) {
      //search, match, includes, indexOf can be used
      //if (a.textContent.search(/CV|resume|cover letter|curriculum|Screening/gi) > -1)
      let benefit = a.parentElement.parentElement.nextElementSibling.children;
      for (const [key, value] of Object.entries(benefit)) {
        job.source_benefit += `${value.innerText}, `;
      }
      //   console.log(job.source_apply_email);
      //   a.remove(); //removes the selector that contains the email
    }
  }

  if (remove_selectors.length > 0)
    remove_selectors.forEach(remove_selector => {
      if (full_html.querySelector(remove_selector))
        full_html.querySelector(remove_selector).remove();
    });
  if (typeof cleanHTML == 'undefined')
    cleanHTML = function (x) {
      return x;
    };
  if (typeof msg == 'undefined') msg = console.log;
  job.html = full_html.innerHTML.trim();
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextAfter(job.html, 'Meer weten?', true);
  job.html = cleanHTML(job.html);
  var tmp = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc = tmp.textContent.trim();
  job.jobdesc = cleanHTML(job.jobdesc);
  let newExp = expansions(job);
  newExp.forEach(newJob => jobs.push(newJob));

  //out.jobs.push(job);
  out['jobs'] = jobs;
  return out;
})();

function expansions(job) {
  let newJobs = [];
  let data = {
    expansionBy_119169: [
      {
        reqid: [],
        titles: [
          job.title,
          'Construction Project Cost Control - Relocation Assistance',
          'Project Estimator - Construction - Relocation Assistance',
          'Cost Control Specialist - Construction Projects - Relocation Offered',
        ],
        newLocs: [
          job.location,
          'Little Rock, AR',
          'Dallas, TX',
          'Memphis, TN',
          'Houston, TX',
          'Shreveport, LA',
          'Atlanta, GA',
          'Kansas City, MO',
          'Oklahoma City, OK',
          'Tulsa, OK',
          'Louisville, KY',
        ],
      },
    ],
  };
  data.expansionBy_119169.map(obj => {
    const { titles, newLocs } = obj;
    titles.forEach(title => {
      newLocs.forEach(loc => {
        newJobs.push({
          ...job,
          title: title,
          location: loc,
          // source_location: loc,
        });
      });
    });
  });

  return newJobs;
}

function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = '<h3>' + text + '</h3>' + newHtml;
    }
  }
  return newHtml;
}

function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + '<p>' + text + '</p>';
    }
  }
  return newHtml;
}
