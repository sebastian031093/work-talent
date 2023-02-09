
/*

Template: careers + companyname + .com/search/searchresults


*/



(function () {
    var jobs = [];
    var out = {};
    var cont = 0;
    var json;
    var company_name  = window.location.host.split(".")[1].trim(); 
    //var ToKen;
  do {

    //var data = ;

        $.ajax({
            url: 'https://careers.' + company_name + '.com/search/searchresults?jtStartIndex=' + cont + '&jtPageSize=12',                                            // 1) url
            headers: {                                                      
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"                // 2) headers
            },
            type: 'POST',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            //data: data,
            //data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.Records; 
                //ToKen = result.;                               // 5) ruta de los trabajos
				//msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = "";


                    job.title    = json[i].Title.replace(/\<.*?\>/g, '');
                    job.location = json[i].LocationName.replace(/\<.*?\>/g, '');
                  
                    /*
                    if(job.location.indexOf(",")>-1){
                            
                      var city  = job.location.split(",")[0].trim();
                      var state = job.location.split(",")[1].split(" - ").shift().toUpperCase().trim();

                      var loc = "";
                      var array_loc = Array();

                      if(city) array_loc.push(city);
                      if(state) array_loc.push(state);

                      if(array_loc.length) loc = array_loc.join(", ");

                    job.location = loc;
                    
                    
                    }
                    */
                  
                    var dom = 'https://careers.' + company_name +'.com/search/jobdetails/';
                    var mod_title = json[i].Title;

                    mod_title = mod_title.toLowerCase().replace(/\*|\/|\:|\;|\,|\;|\(|\)|\&|\#|\$|\–/g,"-").replace(/\!/g,"").replace(/\<.*?\>/g, '').replace(/ /g,"").trim();

                    job.url      = dom + mod_title + '/' + json[i].ID;
                    

                    //job.source_jobtype = json[i].jobtypeSelector;
                    //job.source_salary = json[i].jobtypeSelector;
	
    				job.dateposted_raw = json[i].PostedDate.replace(/\<.*?\>/g, '').trim();
        

                    job.temp = "2020";

                    jobs.push(job);
                }
                cont+=12;
            },
            error: function (error) {
                msg(error);
            }
        });
    } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();
