(function () {
    /*<-- Jhan --->*/

    var jobs = [];
    var out  = {};
    var json; 
    var msg  = console.log;
  
 
    /*
        --Multilink status codes for jobsites--

        5593 => Jobsite : Corporate Office Positions

    */    

    var feed = [
		"https://sii.pl/wp-admin/admin-ajax.php/?lang=pl&action=get_job_offers&sort_by=&current_page=",
		"https://sii.pl/wp-admin/admin-ajax.php/?lang=en&action=get_job_offers&sort_by=&current_page="
	];
    feed.forEach((elem, indx) =>{
    
        var cont = 1;        
		var flag;
        var temporal = [];;
          do {
        
                    

        $.ajax({
            url: elem+cont,                                            
            headers: {                                                      
                "Accept": "*/*",
                "Content-Type":"application/json",
                "Accept-Language": "es-ES,es;q=0.9,en;q=0.8,pt;q=0.7,fr;q=0.6",
            },
            type: 'GET',                                        
            dataType: "json",                                   
            //data: JSON.stringify(feeds),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.data.job_offers; 
                //ToKen = result.;                               // 5) ruta de los trabajos
				//msg(json.length);
                flag = result.data.total_number.split(':').pop();
                try{
                    flag = parseInt(flag.trim());
                }catch(err){        
                    msg(`a error has been : ${err}`);
                }

              
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = "";

                    job.title    = json[i].name;
                    job.url      = dom + json[i].permalink;
                    job.location = json[i].city_name;
                    

                    //job.source_jobtype = json[i].jobtypeSelector;
                    //job.source_salary = json[i].jobtypeSelector;


    				//job.logo = json[i].logoSelector;
   					//job.source_empname = json[i].empnameSelector;
                    //job.source_apply_email = json[i].emailSelector;
    				
    				
    				job.dateposted_raw = json[i].publish_date.split('-');
                    job.dateposted_raw = job.dateposted_raw[1]+'/'+job.dateposted_raw[1]+'/'+job.dateposted_raw[0];
              


                    /*  var fecha = json[i].
                        fecha = fecha.split(" ")[0].split("-");
                        job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/

                    job.temp = 3312;

                    temporal.push(job);
					var multilocation = ",";

                    if(job.location.indexOf(multilocation)>-1){
                        var aux = job.location.split(multilocation);
                        
                        aux.forEach((el, idx) =>{
                            var jobx = {};

                            jobx.title          = job.title;
                            jobx.url            = job.url;
                            jobx.location       = el;
                            jobx.dateposted_raw = job.dateposted_raw;
							if(jobx.location.search(/Praca zdalna|Remote work/i)>-1){
								return;
							}
                            //jobx.dateclosed_raw = job.dateclosed_raw; 
                            //jobx.source_salary  = job.source_salary;
                            //jobx.source_jobtype  = job.source_jobtype;
                            jobx.temp           = job.temp;
                            jobs.push(jobx);
                        })

                     }else{
                       jobs.push(job);
                     }
        
                }
                cont++;
             },
            error: function (error) {
                msg(error);
            }
        });
        //temporal = jobs.length;
        msg(`Total jobs: ${flag} in feed : ${indx + 1}`);
        msg(`jobs per feed: ${temporal.length}`);
      } while (temporal.length < flag);  
    });



    out["jobs"] = jobs;
    return out;
})();