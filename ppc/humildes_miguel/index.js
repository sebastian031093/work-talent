//Asignar category desde un input

(async () => {
  let out = {};
  let jobs = [];
  let categories = [];
  document
    .querySelectorAll(
      'ul.form li:nth-child(2) div.selectize-dropdown-content div.option'
    )
    .forEach(ids => {
      let category = ids.textContent.trim();
      let id = ids.getAttribute('data-value').trim();
      categories.push({
        category,
        id,
      });
    });
  // ---------- MAKE DATAS FOR REQUEST ---------- //
  //let urls = []
  let urls = categories.map(obj => {
    const { category, id } = obj;
    return {
      category,
      url: `https://k47314.coveto.de/public/jobs/?q=&kategorie=${id}&einsatzort=`,
    };
  });
  // ---------- MAKE DATAS FOR REQUEST ---------- //
  try {
    // -------------- MAKE ALL REQUEST WITH THE DATAS CONTRUCTED BEFORE -------------- //
    let results = await Promise.allSettled(
      urls.map(async obj => {
        const { category, url } = obj;
        const call = await fetch(url, {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'es-ES,es;q=0.9',
            'cache-control': 'max-age=0',
            'sec-ch-ua':
              '"Opera GX";v="93", "Not/A)Brand";v="8", "Chromium";v="107"',
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
        const data = await call.text();
        return {
          category,
          data,
        };
      })
    );
    // -------------- MAKE ALL REQUEST WITH THE DATAS CONTRUCTED BEFORE -------------- //
    //msg(results)
    for (let result of results) {
      if (result.status == 'fulfilled') {
        msg(`\x1b[44mCategory: ${result.value.category}`);
        let html = document.createElement('div');
        html.innerHTML = result.value.data;
        let elems = html.querySelectorAll(
          'table.coveto_jobs_table > tbody > tr'
        );
        for (let elem of elems) {
          let job = {};
          job.title = elem.querySelector('td.stellenname').textContent.trim();
          job.url = elem.querySelector('td.stellenname a').href;
          job.logo =
            'https://www.zollinger-personal.ch/wp-content/uploads/2019/10/logo.png';
          job.location = elem.querySelector('td.einsatzort').textContent.trim();
          job.source_location = job.location;
          job.reqid = elem.querySelector('td.id').textContent.trim();
          job.client_tag = result.value.category;
          let desc = document.createElement('div');
          desc.innerHTML = await getDescription(job.url);
          let html_desc = '';
          desc
            .querySelectorAll('div.amaMC.amaMC50')
            .forEach((fragment, index) => {
              if (index < 2) {
                html_desc = html_desc + fragment.innerHTML + '<br>';
              }
            });
          job.html = html_desc.trim();
          job.jobdesc = job.html.replaceAll(/<[^>]*>/g, '').trim();
          job.temp = '1';
          jobs.push(job);
        }
      }
    }
  } catch (e) {
    throw e;
  }
  out['jobs'] = jobs;
  return out;
})();
async function getDescription(url) {
  const call_desc = fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'es-ES,es;q=0.9',
      'cache-control': 'max-age=0',
      'sec-ch-ua': '"Opera GX";v="93", "Not/A)Brand";v="8", "Chromium";v="107"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    },
    referrer: 'www.talent.com',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });
  const resp_desc = await call_desc;
  const data_desc = await resp_desc.text();
  return data_desc;
}

array.forEach(element => {
  return;
});
