(function () {
    var jobs = [];
    var out = {};
   // var cont = 1;
    var json;
    //var ToKen;

  
 // do {

    //var data = ;

        $.ajax({
            url: '',                                            // 1) url
            headers: {                                                      
                "Accept": "*/*",
                "Content-Type":"application/json"                // 2) headers
            },
            type: 'POST',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            data: data,
            //data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.; 
                //ToKen = result.;                               // 5) ruta de los trabajos
                //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = "";


                    job.title    = json[i].titleSelector;
                    job.url      = dom + json[i].urlSelector;
                    job.location = json[i].locationSelector;
                    

                    //job.source_jobtype = json[i].jobtypeSelector;
                    //job.source_salary = json[i].jobtypeSelector;


                    //job.logo = json[i].logoSelector;
                    //job.source_empname = json[i].empnameSelector;
                    //job.source_apply_email = json[i].emailSelector;
                    
                    
                    //job.dateposted_raw = json[i].datepostedSelector;
              


                    /*  var fecha = json[i].
                        fecha = fecha.split(" ")[0].split("-");
                        job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/

                    job.temp = 1;

                    jobs.push(job);
                }
               // cont++;
            },
            error: function (error) {
                msg(error);
            }
        });
  //  } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();
