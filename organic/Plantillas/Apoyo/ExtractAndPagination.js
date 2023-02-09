(function() {
    var jobs = [];
    var out = {};
    var counter = 0;
    var seguir = true;
    //var limit = 0;
    var json;
    do {
      var data = {"filter":{"category":[226],"title":"","qualification":[],"vertragsart":[]},"pagination":{"max":25,"offset":counter},"sorter":{"sort":"enabledDate","order":"desc"}};
      $.ajax({
        url : 'https://jobs.gigroup.de/talention/api/3.2/job',
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "es-ES,es;q=0.9,de;q=0.8",
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin"
        },
        type : 'POST',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          json = result.results;
          var stop_pag = json;
          if (stop_pag.length < 1) {
            seguir = false;
            msg(`---> FINAL DE PAGINACIÓN`);
          }
          //limit = result.resultsTotal;
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem.title;
            job.location = elem.location;
            job.url = elem.url;                    
            job.dateposted_raw = elem.createdDate.split('.');
            job.dateposted_raw = job.dateposted_raw[1]+'/'+job.dateposted_raw[0]+'/'+job.dateposted_raw[2]
            job.reqid = elem.id
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
            job.temp = "OCT-25-2021";
            jobs.push(job);
          }
          counter += 25;
          msg(`---> CONTADOR DE PAGINAS EN POSICIÓN: ${counter}`);
        },
        error: function(error){
          msg(error);
        }
      });
    } while (seguir);
    //out.pic = true
    out["jobs"]= jobs;
    return out;
  })();