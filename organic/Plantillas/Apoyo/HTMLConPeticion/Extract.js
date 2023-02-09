(function () {
  var jobs = [];
  var out = {};
  var seguir = true;
  var counter = 1;
  var num_jobs =  document.querySelector("span.sum em").textContent.replace(",","").trim();
  //var Tken = '=';
  do {
    //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
    var data = {};
    $.ajax({
      url: 'https://www.518.com.tw/job-index-P-'+counter+'.html?ai=0&ac=1009%2C1012%2C1015&ai=0&ai=0',
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      type: 'GET',
      data: JSON.stringify(data),
      dataType: "html",
      async: false,
      success: function (result) {
        //msg(result)
        var div = document.createElement("div");
        div.innerHTML = result;
        var html_jobs = div.querySelectorAll('ul.all_job_hover');
        // msg();
        var num = 0;
        num = counter * div.querySelectorAll('ul.all_job_hover').length;

        msg(num + " ---- " + num_jobs);

        if (num >= num_jobs) {
          seguir = false;
          msg(`---> FINAL DE PAGINACIÓN`);
        }
        for (var x in html_jobs) {
          if (typeof html_jobs[x] == "function") continue;
          if (typeof html_jobs[x] == "number") continue;
          var job = {};
          var elem = html_jobs[x];
          job.title = elem.querySelector("a").textContent.trim();
          job.url = elem.querySelector("a").href.trim();
          job.reqid = job.url.split("/job-")[1].split(".")[0];
          job.source_location = elem.querySelector("li.area").textContent.trim();
          job.location = job.source_location.replace("-",", ").trim();
          var date = elem.querySelector("li.date");
          if(date){
            date = date.textContent.trim();
            var month = date.split("/")[0];
            var day = date.split("/")[1];
            var date2 = new Date();
            if(month > (date2.getMonth+1)){
              job.dateposted_raw = month+"/"+day+"/"+(date2.getFullYear()-1);
            }else{
              job.dateposted_raw = month+"/"+day+"/"+date2.getFullYear();
            }
          }
          for(const a of elem.querySelectorAll('[class="jobdesc"]')){
            const text = a.textContent.trim();
            if(text.search(/薪/i) > -1){
              if(text.search(/\d/) > -1) job.source_salary = text.split(/薪/i).pop().trim();
            }
          }
          var exp = elem.querySelector("li.exp").textContent.trim();
          if(exp.match(/[0-9]/)){
            job.experience_required = exp;}
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          job.source_empname = elem.querySelector("li.company").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          job.temp = 1;
          jobs.push(job);
        }
        counter += 1;
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
      },
      error: function (error) {
        msg('TENGO UN ERROR');
        msg(error);
      }
    });
  } while (seguir);
  out["jobs"] = jobs;
  return out;
})();