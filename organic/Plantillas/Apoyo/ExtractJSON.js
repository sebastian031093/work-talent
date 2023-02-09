//--------------------------------------------------EXTRACT 1-------------------------------------------------------
(function() {
  var out = {};
  var jobs = [];
  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
          "jobs": 0
      };
  } else {
      out["pass_it"] = pass_it;
  }
  //  Selector pre is usually where the string of the json is
  var element = document.querySelector("pre").textContent;
  //  We parse the json so it can be worked
  var json = JSON.parse(element);
  //  Replace positionOfJobs for the path were are the jobs
  var json_jobs = json;

  for(i in json_jobs) {
    var job = {};/*init*/
    var elem = json_jobs[i];

    job.title = elem.title;
    job.location = elem.city+", "+elem.province;
    job.url = elem.link;  
    job.reqid = elem.posting_number;
    var datePosted = elem.posted_date.split("-");
    job.dateposted_raw = datePosted[1]+"/"+datePosted[0]+"/"+datePosted[2];
    job.source_jobtype = elem.employment_type;
    job.desc = elem.description;
    //job.dateclosed_raw = elem.positionOfDateClosed;
    //job.source_salary = elem.positionOfSalary;         
    //job.source_empname = elem.positionOfEmpname;
    //job.logo = elem.positionOfLogo;
    //job.source_apply_email = elem.positionOfEmail;

    job.temp = "1";

    jobs.push(job);
  }

  out["pass_it"]["jobs"] = jobs.length;
  out["jobs"]= jobs;
  return out;
})();
//---------------------------------------------------------------EXTRACT 2---------------------------------------------------------------
(function() {
  var out = {};

  if(typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 50,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);
  var jobs = json.body.children[0].children[0].listItems;
  var returnedJobs = [];  
  for(j in jobs) {
    var job = {};
    job.title = jobs[j].title.instances[0].text;
    job.title = job.title.replace("SAINT LAURENT","");
    job.url = "https://kering.wd3.myworkdayjobs.com"+jobs[j].title.commandLink;
    job.reqid = job.url.split("_").pop();
    //job.dateclosed_raw = elem.positionOfDateClosed;
    //job.source_salary = elem.positionOfSalary;         
    //job.source_empname = elem.positionOfEmpname;
    //job.logo = elem.positionOfLogo;
    //job.source_apply_email = elem.positionOfEmail;

    job.temp = 1;
    returnedJobs.push(job);

  }
  //    msg(jobs);
  //    msg(returnedJobs.length);

  out["pass_it"]["jobs"] = returnedJobs.length;
  out["jobs"]= returnedJobs;
  return out;
})();


//--------------------------------------------------------------------EXTRACT JSON POST CON PAGINACION----------------------------------------------------
(function () {
  var jobs = [];
  var out = {};
  var counter = 1;//CONTADOR DE LA PAGINACION
  var seguir = true;//FLAG PARA VALIDAR LA PARADA DE PAGINACION
  var json;
  //var Tken = '=';
  do {
    //DATOS PARA LA CARGA DEL JSON POST
    //var data = {"token":Tken + counter,"query":"","location":[],"department":[],"worktype":[],"remote":[]};
    var data = {"multilineEnabled":false,"sortingSelection":{"sortBySelectionParam":"3","ascendingSortingOrder":"false"},"fieldData":{"fields":{"KEYWORD":"","LOCATION":""},"valid":true},"filterSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]}]},"advancedSearchFiltersSelectionParam":{"searchFilterSelections":[{"id":"ORGANIZATION","selectedValues":[]},{"id":"LOCATION","selectedValues":[]},{"id":"JOB_FIELD","selectedValues":[]},{"id":"JOB_NUMBER","selectedValues":[]},{"id":"URGENT_JOB","selectedValues":[]},{"id":"EMPLOYEE_STATUS","selectedValues":[]},{"id":"WILL_TRAVEL","selectedValues":[]},{"id":"JOB_SHIFT","selectedValues":[]}]},"pageNo":+counter}
    //FUNCION AJAX DE JQUERY
    $.ajax({
      url: 'https://lifepoint.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=101430233', //URL DEL JSON 
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "tz": "GMT-05:00",
        "tzname": "America/Bogota",
        "x-requested-with": "XMLHttpRequest"
      },

      type: 'POST', //TIPO DE PETICION
      data: JSON.stringify(data),//LOS DATOS QUE SE ENVIARAN AL SERVIDOR EN FORMATO JSON.
      dataType: "json", //EL TIPO DE DATO QUE ESPERA EL SEVIDOR
      async: false, //ACTIVACION DE TRANFERENCIA ASINCRONA O SINCRONA
      success: function (result) { //FUNCION EN CASO DE EXITO, RETORNA LA RESPUES
        // out["expected_jobs"] = result.totalCount;
        json = result.requisitionList; //SE GUARDA EN LA VARIABLE JSON LA RUTA DEL ARRAY ITERABLE DE LOS JOBS
        //   msg(json);
        var stop_pag = json;
        //SE PREGUNTA POR LA LONGITUD DEL ARRAY DE LOS JOBS, PARA DETENER LA PAGINACION
        if (stop_pag.length < 1) {
          seguir = false;
          msg(`---> FINAL DE PAGINACIÓN`);
        }
        //SE ITERA SOBRE EL ARRAY QUE CONTIENE CADA UNO DE LOS JOBS Y SE ACCEDE A LA INFORMACION NECESARIA
        for (var i in json) {
          var job = {};
          job.reqid = json[i].jobId;
          job.title = json[i].column[0];
          job.url = "https://lifepoint.taleo.net/careersection/.lp_corp_external/jobdetail.ftl?job="+json[i].contestNo;
          job.location = json[i].column[1].replace('[\"','').replace('\"]','');
          //job.dateposted_raw = json[i].;
          //job.logo = json[i].;
          //job.source_apply_email = json[i].;
          //job.source_empname = json[i].;
          //job.source_jobtype = json[i].;
          //job.source_salary = json[i].;
          //job.html= json[i].;
          //job.jobdesc = job.html;;

          job.temp = 1;
          jobs.push(job);
        }
        //SE AUMENTA EL CONTADOR DE LA PAGINACION, CUANDO TERMINA DE AGREGAR TODOS LOS TRABAJOS DE LA PAGINA INICIAL
        counter += 1;
        msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
      },
      error: function (error) { //FUNCION EN CASO DE ERROR QUE RETORNA EL ERROR POR EL SEVIDOR
        msg(error);
      }
    });
  } while (seguir);//EJECUTA LA PAGINACION EN CASO DE SER VERDADERO
  out["jobs"] = jobs;
  return out;
})();














