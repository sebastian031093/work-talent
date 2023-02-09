//url: https://www.askgroup.global/careers
(async () => {
  let out = {};
  let jobs = [];
  try {
    const fetchPro = fetch(
      'https://krb-sjobs.brassring.com/TGnewUI/Search/home/HomeWithPreLoad?PageType=JobDetails&partnerid=30013&siteid=5476&Areq=11601BR&codes=Talent#jobDetails=1998515_5476'
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
    let full_html = Array.from(div.querySelectorAll('')); // job selecetor
    console.log(full_html);
    for (const [index, jobx] of Object.entries(full_html)) {
      let job = {};
      job.title = jobx.querySelector('').textContent.trim();
      console.log(job.title);
      //job.url = jobx.href.trim();
      //job.location = jobx.querySelector("").textContent.trim();
      //job.source_location = job.location;
      //let date = jobx.querySelector('').textContent.trim();
      //job.dateposted_raw = getDateFormat(date, "/", 0, 1, 2);
      //job.reqid = job.url.split("Id=").pop().trim();
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

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, '').replace(/\./g, '').trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
    month = dateRaw.split(cut)[monthPosition].trim(),
    year = dateRaw.split(cut)[yearPosition].trim();
  day = day.replace(/rd|st|th|nd/, '').trim();
  if (day < 10 && day.length < 2) {
    day = '0' + day;
  }
  /*if (dateRaw.search(/[a-z]/gi) > -1) {
        //English, Dutch, French
        if (month.search(/ene|jan|january|Januar/i) > -1) { month = "01"; }
        if (month.search(/feb?v?|february|fév|Februar/i) > -1) { month = "02"; }
        if (month.search(/mar|march|maar|März/i) > -1) { month = "03"; }
        if (month.search(/apr|abr|april|avr|April/i) > -1) { month = "04"; }
        if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
        if (month.search(/jun|june|juin|Juni/i) > -1) { month = "06"; }
        if (month.search(/jul|july|juil|Juli/i) > -1) { month = "07"; }
        if (month.search(/aug|ago|august|août/i) > -1) { month = "08"; }
        if (month.search(/sep|set|september/i) > -1) { month = "09"; }
        if (month.search(/oct|out|october|okt|Oktober/i) > -1) { month = "10"; }
        if (month.search(/nov|november/i) > -1) { month = "11"; }
        if (month.search(/dec|dez|december|déc|Dezember/i) > -1) { month = "12"; }
    }*/
  var datum = month + '/' + day + '/' + year;
  return datum;
}
