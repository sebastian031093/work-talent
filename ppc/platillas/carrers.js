//https://www.careers.com/primetals-technologies/machinist?LS=CB_13 seteala

(async () => {
  let out = {};
  let jobs = [];
  var job = {};
  try {
    const fetchPro = fetch(
      'https://www.careers.com/primetals-technologies/machinist-2?LS=CB_13',
      {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'en,es-419;q=0.9,es;q=0.8',
          'cache-control': 'max-age=0',
          'sec-ch-ua':
            '"Chromium";v="108", "Opera GX";v="94", "Not)A;Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
        },
        referrer: 'https://www.talent.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }
    );

    const resp = await fetchPro;
    // console.log(resp);
    let data = await resp.text();
    //console.log(data);
    //div = document.createElement("div");
    //div.innerHTML = data;
    const stringToHTML = str =>
      new DOMParser().parseFromString(str, 'text/html').body;
    let div = stringToHTML(data);
    // let full_html = div.querySelectorAll(''); // job selecetor
    job.title = div.querySelector('h2.job-title').textContent.trim();
    job.url = ''; // set url
    job.location = div
      .querySelector('span[class="flaticon-pin56 icon"]')
      .nextElementSibling.textContent.trim();
    job.source_location = job.location;
    job.temp = '2324';
    var full_html = div.querySelector('div#job_description div.field-items');
    var remove_selectors = [];

    job.source_benefit = '';
    for (const a of full_html.querySelectorAll('p')) {
      if (a.innerText.search(/Hours\/Benefits\/Compensation:/gi) > -1) {
        //search, match, includes, indexOf can be used
        //if (a.textContent.search(/CV|resume|cover letter|curriculum|Screening/gi) > -1)
        let benefit = a.nextElementSibling.children;
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
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  out['jobs'] = jobs;
  return out;
})();

function expansions(job) {
  let newJobs = [];
  let data = {
    expansionBy_119169: [
      {
        reqid: [],
        titles: [],
        newLocs: [],
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

///////////////////////////////////////////////////////////////
////Fetch

(async () => {
  let out = {};
  let jobs = [];
  var job = {};
  try {
    const fetchPro = fetch(
      'http://bullhorn.personified.com/client/jobInfoApplicationRespMgmt.action?EntityID=32974&source=talent_com',
      {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'en,es-419;q=0.9,es;q=0.8',
          'cache-control': 'max-age=0',
          'upgrade-insecure-requests': '1',
        },
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      }
    );

    const resp = await fetchPro;
    // console.log(resp);
    let data = await resp.text();
    //console.log(data);
    //div = document.createElement("div");
    //div.innerHTML = data;
    const stringToHTML = str =>
      new DOMParser().parseFromString(str, 'text/html').body;
    let div = stringToHTML(data);
    // let full_html = div.querySelectorAll(''); // job selecetor

    let node = div.querySelector('div[class="header_txtContainer"] h2');
    job.title = div
      .querySelector('div[class="header_txtContainer"] h2')
      .textContent.trim();
    job.url =
      'http://bullhorn.personified.com/client/jobInfoApplicationRespMgmt.action?EntityID=32974&source=talent_com'; // set url
    job.location = node.nextElementSibling.innerText;
    job.source_location = job.location;
    job.temp = '2324';
    var full_html = div.querySelector('div[class="textSection"]');
    var remove_selectors = [];

    job.source_benefit = '';

    if (div.querySelector('ul[style="list-style-type:circle"]')) {
      let a = div.querySelector('ul[style="list-style-type:circle"]');
      //search, match, includes, indexOf can be used
      //if (a.textContent.search(/CV|resume|cover letter|curriculum|Screening/gi) > -1)
      let benefit = a.children;
      for (const [key, value] of Object.entries(benefit)) {
        job.source_benefit += `${value.innerText}, `;
      }
      //   console.log(job.source_apply_email);
      //   a.remove(); //removes the selector that contains the email
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
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  out['jobs'] = jobs;
  return out;
})();

function expansions(job) {
  let newJobs = [];
  let data = {
    expansionBy_119169: [
      {
        reqid: [],
        titles: [],
        newLocs: [],
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
