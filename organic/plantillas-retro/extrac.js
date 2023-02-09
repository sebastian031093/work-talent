//normal extrac
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('');
  var jobs = [];
  for (var x in html_jobs) {
    if (typeof html_jobs[x] == 'function') continue;
    if (typeof html_jobs[x] == 'number') continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector('').textContent.trim();
    job.url = elem.querySelector('').href.trim();
    job.location = elem.querySelector('').textContent.trim();
    job.source_benefit = elem.querySelector('').textContent.trim();
    let regex1 = /remote/gi;
    let alternative_location = job.location;
    job.source_location = alternative_location;
    //job.dateposted_raw = elem.querySelector('').textContent.trim();
    //job.logo = elem.querySelector('').getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector('').textContent.trim();
    //job.source_empname = elem.querySelector('').textContent.trim();
    //job.source_jobtype = elem.querySelector('').textContent.trim();
    //job.source_salary = elem.querySelector('').textContent.trim();
    job.temp = 1;
    jobs.push(job);
  }

  out['jobs'] = jobs;
  return out;
})();

//json extrac
(function () {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  do {
    var data = {};
    $.ajax({
      url: '',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      type: 'POST',
      data: JSON.stringify(data),
      dataType: 'json',
      async: false,
      success: function (result) {
        json = result.positionOfJobs;
        limit = result.positionLimit;
        for (var i = 0; i < json.length; i++) {
          var job = {};
          var elem = json[i];
          job.title = elem.positionOfTitle;
          job.location = elem.positionOfLocation;
          job.url = elem.positionOfUrl;
          //job.dateposted_raw = elem.positionOfDatePosted;
          //job.dateclosed_raw = elem.positionOfDateClosed;
          //job.source_jobtype = elem.positionOfJobtype;
          //job.source_salary = elem.positionOfSalary;
          //job.source_empname = elem.positionOfEmpname;
          //job.logo = elem.positionOfLogo;
          //job.source_apply_email = elem.positionOfEmail;

          job.temp = '1';
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function (error) {
        msg(error);
      },
    });
  } while (counter < limit);

  out['jobs'] = jobs;
  return out;
})();
