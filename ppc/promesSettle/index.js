(async () => {
  let out = {};
  let jobs = [];
  // out['pass_it'] = pass_it;
  // msg('Hi desde extrac')
  let headers = {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9,fr;q=0.8,de;q=0.7,es;q=0.6',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
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
  };
  //https://www.healthecareers.com/search-jobs/?catid=&ps=50&pg=
  //https://www.healthecareers.com/search-jobs/?catid=&ps=10&pg=1
  const urls = Array(10)
    .fill('')
    .map(
      (elemet, index) =>
        `https://www.healthecareers.com/search-jobs/?catid=&ps=10&pg=${
          index + 1
        }`
    );

  const arrrResponse = urls.map(async url => {
    // msg(url);
    const resp = await fetch(url, headers);
    return resp;
  });
  // console.log(promises);
  let resultsResp = await Promise.allSettled(arrrResponse);
  let arrRespSucces = resultsResp.filter(
    async res => res?.status === 'fulfilled'
  );
  msg(arrRespSucces);

  arrRespSucces.forEach(async (resp, index) => {
    //here you can hadler your data HTML or JSON.
    let data = await resp.value.text();
    msg(data);
    const stringToHTML = str =>
      new DOMParser().parseFromString(str, 'text/html').body;
    let div = stringToHTML(data);
    let full_html = Array.from(
      div.querySelectorAll('div.card.job-results-card')
    ); // job selecetor
    console.log(full_html);
    for (const [index, elem] of Object.entries(full_html)) {
      const job = {};
      job.title = elem.querySelector('div.result-title').textContent.trim();
      console.log(job.title);
      job.url = elem.querySelector('a.job-title.gtm-card-position').href.trim();
      job.source_location = elem
        .querySelector('div.job-location')
        ?.textContent?.trim();

      if (job.source_location) {
        job.location = job.source_location;
      }
      //job.source_location = elem.querySelector("").textContent.trim();
      job.reqid = job.url.split('/').pop();

      job.source_jobtype = elem
        .querySelector('div[data-tag-name="Full Time"]')
        ?.textContent?.trim();
      job.temp = '2324';
      jobs.push(job);
    }
  });
  console.log(jobs);
  out['jobs'] = jobs;
  return out;
})();

//pagination
(function () {
  var out = {};
  out['pass_it'] = pass_it;
  out.pass_it.offSet += 50;
  if (out.pass_it.offSet < out.pass_it.limit) {
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
  out['pass_it'] = {
    offSet: 0,
    limit: 0,
    numJobs: 10,
    counter: 0,
  };
  return out;
})();

/////////////////////////////////////////
////////////asi funciona en el index tool
/////////////////////////////////////////
(async () => {
  let out = {};
  let jobs = [];
  // out['pass_it'] = pass_it;
  // msg('Hi desde extrac')
  let headers = {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9,fr;q=0.8,de;q=0.7,es;q=0.6',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua':
        '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
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
  };
  //https://www.healthecareers.com/search-jobs/?catid=&ps=50&pg=
  //https://www.healthecareers.com/search-jobs/?catid=&ps=10&pg=1
  const urls = Array(10)
    .fill('')
    .map(
      (elemet, index) =>
        `https://www.healthecareers.com/search-jobs/?catid=&ps=10&pg=${
          index + 1
        }`
    );

  let resultsResp = await Promise.allSettled(
    urls.map(async url => {
      // msg(url);
      const resp = await fetch(url, headers);
      return await resp.text();
    })
  );
  // let arrRespSucces = resultsResp.filter(async res => res?.status === "fulfilled");
  // console.log(resultsResp);

  resultsResp.forEach((resp, index) => {
    // msg(resp)
    //here you can hadler your data HTML or JSON.
    let data = resp.value;
    // msg(data)
    const stringToHTML = str =>
      new DOMParser().parseFromString(str, 'text/html').body;
    let div = stringToHTML(data);
    let full_html = Array.from(
      div.querySelectorAll('div.card.job-results-card')
    ); // job selecetor
    // console.log(full_html);
    for (const [index, elem] of Object.entries(full_html)) {
      const job = {};
      job.title = elem.querySelector('div.result-title').textContent.trim();
      // console.log(job.title);
      job.url = elem.querySelector('a.job-title.gtm-card-position').href.trim();
      job.source_location = elem
        .querySelector('div.job-location')
        ?.textContent?.trim();

      if (job.source_location) {
        job.location = job.source_location;
      }
      //job.source_location = elem.querySelector("").textContent.trim();
      job.reqid = job.url.split('/').pop();

      job.source_jobtype = elem
        .querySelector('div[data-tag-name="Full Time"]')
        ?.textContent?.trim();
      job.temp = '2324';
      jobs.push(job);
    }
  });
  // console.log(jobs);
  out['jobs'] = jobs;
  return out;
})();
