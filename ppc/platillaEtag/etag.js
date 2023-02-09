(async () => {
  let out = {};
  let jobs = [];
  try {
    const fetchPro = fetch('https://www.jobdental.de/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en,es-419;q=0.9,es;q=0.8',
        'cache-control': 'max-age=0',
        'if-none-match': '"9999d53fc9e7db160dbaf2f453bd3361"',
        'sec-ch-ua':
          '"Chromium";v="108", "Opera GX";v="94", "Not)A;Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    const resp = await fetchPro;
    const etag = resp.headers.get('etag');

    const fetchPro2 = fetch('https://www.jobdental.de/', {
      headers: {
        'If-Match': `${etag}`,
      },
    });

    const resp2 = await fetchPro2;

    let data = await resp2.text();
    //console.log(data);
    //div = document.createElement("div");
    //div.innerHTML = data;
    const stringToHTML = str =>
      new DOMParser().parseFromString(str, 'text/html').body;
    let div = stringToHTML(data);
    let full_html = Array.from(div.querySelectorAll('ul li[class*=store-me]')); // job selecetor
    console.log(full_html);

    for (const [index, jobx] of Object.entries(full_html)) {
      let job = {};
      job.title = jobx.querySelector('h2').textContent.trim();
      console.log(job.title);
      job.url = jobx.href.trim();
      job.location = jobx.querySelector('').textContent.trim();
      job.source_location = job.location;
      let date = jobx.querySelector('').textContent.trim();
      job.dateposted_raw = getDateFormat(date, '/', 0, 1, 2);
      job.reqid = job.url.split('Id=').pop().trim();
      //job.logo = jobx.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = jobx.querySelector("").textContent.trim();
      //job.source_empname = jobx.querySelector("").textContent.trim();
      //job.source_jobtype = jobx.querySelector("").textContent.trim();
      //job.source_salary = jobx.querySelector("").textContent.trim();
      // const resp = await fetch(job.url),
      //   html = await resp.text(),
      //   div = document.createElement("div");

      // div.innerHTML = html;

      // const full_html = div.querySelector("");
      job.temp = 23;
      jobs.push(job);
    }

    console.log(jobs);
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  out['jobs'] = jobs;
  return out;
})();
