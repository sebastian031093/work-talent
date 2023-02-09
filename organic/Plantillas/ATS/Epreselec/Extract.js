(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('a[onclick="saveScrollPosition(); return true;"]');
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("span.op-titulo").textContent.trim();
      job.url = "https://prisajobs.epreselec.com/Ofertas/Ofertas.aspx?Id_Oferta="+elem.getAttribute("data_idoferta");
      job.reqid = elem.getAttribute("data_idoferta");
      job.source_empname = elem.querySelector("span.op-perfil").textContent.trim();
      job.dateposted_raw = elem.querySelector("span.op-fecha").textContent.trim();
      job.dateposted_raw = job.dateposted_raw.replace(" de","");
      job.dateposted_raw = job.dateposted_raw.replace("enero","January");
      job.dateposted_raw = job.dateposted_raw.replace("febrero","February");
      job.dateposted_raw = job.dateposted_raw.replace("marzo","March");
      job.dateposted_raw = job.dateposted_raw.replace("abril","April");
      job.dateposted_raw = job.dateposted_raw.replace("mayo","May");
      job.dateposted_raw = job.dateposted_raw.replace("junio","June");
      job.dateposted_raw = job.dateposted_raw.replace("julio","July");
      job.dateposted_raw = job.dateposted_raw.replace("agosto","August");
      job.dateposted_raw = job.dateposted_raw.replace("septiembre","September");
      job.dateposted_raw = job.dateposted_raw.replace("octubre","October");
      job.dateposted_raw = job.dateposted_raw.replace("noviembre","November");
      job.dateposted_raw = job.dateposted_raw.replace("diciembre","December");
      job.dateposted_raw = new Date(job.dateposted_raw);
      job.dateposted_raw = (job.dateposted_raw.getMonth()+1) +"/"+ job.dateposted_raw.getDate() +"/"+ job.dateposted_raw.getFullYear();
  
      var full_html = getDescription(job.url);
      var tmp = document.createElement("div");
      tmp.innerHTML = full_html; 
      var local = tmp.querySelector("span#ctl00_CPH_Body_lLocalidadText");
      var province = tmp.querySelector("span#ctl00_CPH_Body_lProvinciaText");
      var req = tmp.querySelector("span#ctl00_CPH_Body_lRequisitos");
      if(local){
        job.source_location = local.textContent.trim();
        if(province){
          job.source_location = job.source_location+", "+province.textContent.trim();
        }
        job.location = job.source_location+", ES";
      }else if(province){
        job.source_location = job.source_location+", "+province.textContent.trim();
        job.location = job.source_location+", ES";
      }
      if(req){
        if(req.textContent.includes("Experiencia:")){
          job.experience_required = req.textContent.split("Experiencia:").pop().split(".").shift();
        }
      }
  
  
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_jobtype = elem.querySelector("").textContent.trim();
      //job.source_salary = elem.querySelector("").textContent.trim();
      job.temp = 1;
      jobs.push(job);
    } 
  
    out["jobs"]= jobs;
    return out;
  })();
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    //xhrrequest.setRequestHeader(header, value);
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) { 
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
  }