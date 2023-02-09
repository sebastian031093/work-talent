(function() {
  var out = {};
  if (typeof pass_it == "undefined") 
    pass_it = {};

  if (!pass_it["url"]) {
    out["pass_it"] = {
      "url": ""
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var html_jobs = document.querySelectorAll("");            // Selector jobs
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("").textContent.trim();
    job.url = elem.querySelector("").href.trim();
    out["pass_it"].url = job.url.replace("","");            // Change job url
    job.location = elem.querySelector("").textContent.trim();
    //job.reqid = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();


    // Call ajax to extract the date from the json of the description 
    $.ajax({
      url : out["pass_it"].url,
      headers: {
        //---------------------- HEADERS --------------------------//
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
        //----------------------------------------------------------//
      },
      type : 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        job.dateposted_raw = elem.positionOfDate;
      },
      error: function(error){
        msg(error);
      }
    });
    //----------------------------------------------------------------//
    
    job.temp = 1;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;

})();