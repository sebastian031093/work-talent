(function() {
 	var url = "";
    var out = {};
    var html_jobs = document.querySelectorAll(".editablesection");
    var jobs = [];
  	for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
     	//job.reqid = elem.href.trim().match(/[0-9]{5}/)[0];
      	var reqid = elem.querySelector("td:nth-child(2) div > div > div > div").textContent.trim();
    	job.title = elem.querySelector("span.titlelink > a").textContent.trim().split('(')[0].split('-')[0];
      	job.url = "https://hdr.taleo.net/careersection/ex/jobdetail.ftl?job="+reqid+"&lang=en";
    	//job.url = elem.querySelector("a.js-clickable-area-link").href.trim();
        job.location = elem.querySelector("div.morelocation").textContent.trim();
      	if(job.location.indexOf('More...')>-1){
        	job.location = elem.querySelector("div.morelocation > span:nth-child(2)").getAttribute('title').replace('Position available in other locations:','').trim();
       }
      	job.source_jobtype = elem.querySelector("span.jobtype").textContent.trim();
      
      	var dateposted = elem.querySelector('td:nth-child(2) > div > div > div:nth-child(5) > span:nth-child(4)').textContent.trim();
       	job.dateposted_raw = formatDate(dateposted, ' ',0,1,2);
      
      	job.temp = 1;
        if(job.location.indexOf(',')>-1) {
        var aux = job.location.split(",");
            for(i in aux)
            {
                var jobx = {};
                    jobx.title = job.title
                    jobx.url = job.url;
                    jobx.location = aux[i].split('-').reverse().join(', '); 
                    jobx.dateposted_raw = job.dateposted_raw
                    jobx.source_jobtype = job.source_jobtype
                    jobx.reqid = job.reqid
                    jobx.temp = job.temp;

                    if(jobx.title.length > 0 && jobx.location.length > 0){
                            jobs.push(jobx);
                    }
           }
       	} else {
            job.location = job.location.split('-').reverse().join(', '); 
            jobs.push(job);
        }
    	//job.location = elem.querySelector("span.ort").textContent.trim().replace(/[0-9]{2}\,/,'');
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
      //job.reqid = elem.href.trim().match(/[0-9]{9}/)[0];
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

function formatDate(get_date, sC, pMes, pDia, pAno) {  //Ingreso String con fecha;caracter separador;posicion Mes, Dia y Año   get_date = get_date.replace(/\,/g,"").trim();
   let monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   let dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   let dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}
//job.dateposted_raw = formatDate (dateposted," ",0,1,2);

(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  do {
    var data = {urlname="dolder_hotel_ag"};
    $.ajax({
      url : 'https://api.cvmanager.ch/CareerPageDTO/GetCareerPageDetailsByBranchUrl/',
      headers: {
        "accept": "*/*",
        "accept-language": "es-ES,es;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      type : 'POST',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.Vacancies;
        //limit = result.positionLimit;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          var elem = json[i];
          job.title = elem.VacancyTitle;
          job.location = elem.Region;
          if(job.location.includes("Zürich ")){
            job.location = "Zürich, Zürich, CH";
          }
          job.url = elem.JobadUrl;   
          job.reqid = elem.IdVacancy;
          job.dateposted_raw = elem.DateFrom.match(/\d+/g);
          job.dateclosed_raw = elem.DateTo.match(/\d+/g);
          job.source_jobtype = elem.EmploymentType;
          //job.source_salary = elem.positionOfSalary;         
          job.source_empname = elem.BranchName;
          //job.logo = elem.positionOfLogo;
          //job.source_apply_email = elem.positionOfEmail;

          job.temp = "1";
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
  } while (counter < limit);

  out["jobs"]= jobs;
  return out;
})();