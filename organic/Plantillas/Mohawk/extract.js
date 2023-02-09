(function() {
 	var url = "";
    var out = {};
    var html_jobs = document.querySelectorAll("tr.job-tile");
    var jobs = [];
  	for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div.tiletitle > h2 > a").textContent.trim();
    	job.url = elem.querySelector("div.tiletitle > h2 > a").href.trim();
     	job.reqid = job.url.match(/[0-9]{9}/)[0];
        job.location = elem.querySelector("div#job-"+job.reqid+"-desktop-section-location-value").textContent.trim();
      	//job.source_jobtype = elem.querySelector("span.jobtype").textContent.trim();
      	//var dateposted = elem.querySelector('td:nth-child(2) > div > div > div:nth-child(5) > span:nth-child(4)').textContent.trim();
       	//job.dateposted_raw = formatDate(dateposted, ' ',0,1,2);
      	job.temp = 1;
      	jobs.push(job);
      
        /*if(job.location.indexOf(',')>-1) {
        var aux = job.location.split(",");
            for(i in aux)
            {
                var jobx = {};
                    jobx.title = job.title
                    jobx.url = job.url;
                    jobx.location = aux[i].split('-').reverse().join(', '); 
                    //jobx.dateposted_raw = job.dateposted_raw
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
        }*/
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

/*function formatDate(get_date, sC, pMes, pDia, pAno) {  //Ingreso String con fecha;caracter separador;posicion Mes, Dia y Año   get_date = get_date.replace(/\,/g,"").trim();
   let monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   let dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   let dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}*/
//job.dateposted_raw = formatDate (dateposted," ",0,1,2);
