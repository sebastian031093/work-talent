console.log("Hello world");
//console.log(arr);

// function vowelsAndConsonants(s) {
//     [...s].forEach(c => 'aeiou'.includes(c) ?
//         console.log(c) : null);
//     [...s].forEach(c => 'aeiou'.includes(c) ?
//         null : console.log(c));
// }

//vowelsAndConsonants('javascript is awesome');

(async () => {
  let out = {};
  let counter = 1;
  let limit = 0;
  let json;
  try {
    const fetchPro = fetch("", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        accept: "application/json",
        "accept-language": "en-US",
        "content-type": "application/json",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="99", "Opera GX";v="85"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    //Puedes hacer destructuring. {variable que necesito }
    const resp = await fetchPro;
    console.log(resp);
    const data = await resp.json();
    //const dataString = JSON.stringify(data);
    console.log(data);

    let arr = data.map((jobx) => {
      let job = {};
      job.title = jobx.JobTitle;
      //job.location = jobs.positionOfLocation;
      //job.url = jobs.positionOfUrl;
      //job.dateposted_raw = elem.positionOfDatePosted;
      //job.dateclosed_raw = elem.positionOfDateClosed;
      //job.source_jobtype = elem.positionOfJobtype;
      //job.source_salary = elem.positionOfSalary;
      //job.source_empname = elem.positionOfEmpname;
      //job.logo = elem.positionOfLogo;
      //job.source_apply_email = elem.positionOfEmail;
      job.temp = "1";
    });
    out.jobs = arr;
  } catch (err) {
    console.log(err);
  }
  return out;
})();
