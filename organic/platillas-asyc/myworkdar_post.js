//extract
(async () => {
  let out = {};
  let jobs = [];
  out['pass_it'] = pass_it;
  var data = {
    filter: {
      page: out.pass_it.counter,
      offset: out.pass_it.counter - 1,
      totalCount: 0,
      limit: 20,
      searchkeyword: null,
      haslocation: false,
      language: 'es',
    },
  };
  try {
    const resp = fetch('https://www.manpower.es/api/services/Jobs/searchjobs', {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en,es-419;q=0.9,es;q=0.8',
        'content-type': 'application/json;charset=UTF-8',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="104", "Opera GX";v="90"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer: 'https://www.manpower.es/es/buscar',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });

    console.log(resp);
    const datax = await resp.json();
    //const dataString = JSON.stringify(data);
    // console.log(data);
    var json = data.jobsItems;
    out.pass_it.totalJobs = json.length;
    limit = result.filters.offset;

    for (var i = 0; i < json.length; i++) {
      var job = {};
      var elem = json[i];
      job.title = elem.jobTitle;
      job.location = elem.jobLocation;
      job.source_location = elem.jobLocation;
      if (!job.location.match(/\,ES/gi)) {
        job.location = `${job.location}, ES`;
      }
      job.url = `https://www.manpower.es${elem.jobURL}?utm_source=talent&utm_medium=agregador`;
      job.client_tag = elem.jobID;
      job.source_jobtype = elem.employmentType;
      job.source_empname = 'Manpower Group';
      job.experience_required = elem.experience;
      job.temp = '07/01/2022';

      var full_html = getDescription(job.url);
      var temp = document.createElement('div');
      temp.innerHTML = full_html;
      if (temp.querySelector('[id="__JSS_STATE__"]')) {
        var aditionalDescription = JSON.parse(
          temp.querySelector('[id="__JSS_STATE__"]').textContent
        );
        aditionalDescription =
          aditionalDescription.sitecore.route.placeholders['jss-main'][0].fields
            .items.publicDescription;
        var htmlAditionalDescription = document.createElement('p');
        htmlAditionalDescription.innerHTML = aditionalDescription;
      }
      if (temp.querySelector('[class="single-job"]')) {
        var info = temp.querySelector('[class="single-job"]').innerHTML.trim();
        if (
          info.match(
            /(<div>Tipo de empleo<!-- -->:) <!-- -->([A-Za-zéóáíú\s])+(<\/div>)/gi
          )
        ) {
          let tag = info.match(
            /(<div>Tipo de empleo<!-- -->:) <!-- -->([A-Za-zéóáíú\s])+(<\/div>)/gi
          )[0];
          tag = tag
            .split(':')
            .pop()
            .trim()
            .replace('<!-- -->', '')
            .replace('</div>', '');
          job.reqid = replaceAccents(tag);
        }
      }
      var desc = temp.querySelector('[class="single-job"]');
      if (desc) {
        job.html = desc.innerHTML.trim();
        if (htmlAditionalDescription)
          job.html =
            job.html + '<br>' + htmlAditionalDescription.innerHTML.trim();
        job.jobdesc = cleanHTML(job.html);
        jobs.push(job);
      }
    }

    out['jobs'] = jobs;
  } catch (err) {
    var ghost = {
      title: window.location.href,
    };
    jobs.push(ghost);
    // msg(error);
    throw err;
    // console.log(err);
  }
  return out;
})();

function replaceAccents(s) {
  var r = s; //.toLowerCase();
  r = r.replaceAll(/[àáâãäå]/gi, 'a');
  r = r.replaceAll(/[èéêë]/gi, 'e');
  r = r.replaceAll(/[ìíîï]/gi, 'i');
  r = r.replaceAll(/[òóôõö]/gi, 'o');
  r = r.replaceAll(/[ùúûü]/gi, 'u');
  return r;
}

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
