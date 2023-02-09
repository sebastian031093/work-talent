(function () {
  let jobs = [];
  let out = {};
  let cont = 0;
  let total = 0;
  let json;

  //do {

    /*var data = { 
      "wpbh_search": 2,
      "wpbh_sort": "",
      "page": cont
    };*/

    $.ajax({
      url: '',    // 1) url
      headers: {                                                      
                  //2) headers
      },
      type: 'GET',                                        // 3) tipo
      dataType: "html",                                   // 4) data que retorna
      //data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("SUCCES");
        html = result.toString(); 
        html =  html.replace(/\\n/gi, "");			// limpieza
        html =  html.replace(/\\r/gi, "");
        html =  html.replace(/\\t/gi, "");
        html = html.replace(/\\"/gi, '"');
        html =  html.replace(/\\u003c/gi, "<");
        html =  html.replace(/\\u003e/gi, ">");
        html =  html.replace(/\\\//gi, "/");

        var div = document.createElement("div");
        div.innerHTML = html;
        var html_jobs = div.querySelectorAll(""); //SELECTOR DE LOS JOBS
        total = html_jobs.length;
        //msg("total: "+total);
        //    json = result.;                                 // 5) ruta de los trabajos
        msg(html_jobs.length);
        for(var x in html_jobs){
          if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
          var job = {};
          var elem = html_jobs[x];
          job.title = elem.querySelector("").textContent.trim();
          job.url = elem.querySelector("").href.trim();
          job.location = elem.querySelector("").textContent.trim();
          //job.dateposted_raw = elem.querySelector("").textContent.trim();
          //job.dateclosed_raw = elem.querySelector("").textContent.trim();
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          //job.experience_required = elem.querySelector("").textContent.trim();
          //job.reqid = elem.querySelector("").textContent.trim();
          
          
          job.temp = 1;
          jobs.push(job);
        }
        cont = cont+1;

        msg('pagina: '+cont);
        msg('jobs en esta pagina: '+total);
      },
      error: function (error) {
        msg('error');
      }
    });
  //} while (total > 0);                                 // 6) condicion de parada

  out["jobs"] = jobs;
  return out;
})();        

