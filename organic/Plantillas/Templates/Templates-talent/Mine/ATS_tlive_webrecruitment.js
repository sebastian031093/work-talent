//EJEMPLOS!!
//CASO BLOQUEO EN EXTRACT, ES NECESARIO AGREGAR INFINITE PAGINATION QUE HAGA CLICK EN UN BOTÓN QUE MUESTRA LOS JOBS
//SCANID: 202350
//JOBSITE: https://jobs.karbonhomes.co.uk/tlive_webrecruitment/wrd/run/etrec105gf.open?wvid=5562310fzx

//CASO BLOQUEO EN LAS DESCRIPCIONES
//SCANID: 202536
//JOBSITE: https://win19-itrent01.notts-fire.gov.uk/tlive_webrecruitment/wrd/run/etrec106gf.display_srch_all?wvid=0444650X8f



//INFINITE PAGINATION (EN CASO DE SER NECESARIO DAR CLICK A UN BOTÓN PARA VER LOS JOBS)
(function() {
	var out = {};
  	out.pic = true;
  	var search = document.querySelector("input.srch_standard_bu");
  	if (search) {search.click();}
  	if (document.querySelector('table[role="listitem"]')) {
    	out["has_next_page"] = false;
    }
  	else {out["has_next_page"] = true;}
    return out;
})();


//INLAND!!
//BEFORE EXTRACT
(function(){
    var out = {};
    var selector_jobs = 'table[role="listitem"]'; //selector jobs
    var selector_desc = 'dl.job-details-table'; //selector descripción 
    var selector_click_job = 'a.job-result-title'; //selector donde se hace click
  
    //Pass_it para usar la info en los diferentes step
    if(typeof pass_it == 'undefined')
      pass_it = {};
    if(!pass_it['cont']){
      out['pass_it'] = {
        "cont": 0, //Posición donde del selector donde dará los clicks
        "salir": false, //Bandera para seguir o no
        "selector_job":selector_jobs, 
        "selector_click_job" :selector_click_job,
        "selector_desc" : selector_desc
      };
    }else{
      out['pass_it'] = pass_it;
    }
    msg(document.querySelectorAll(out['pass_it']['selector_job']).length); //Imprime la cantidad de jobs que encuentra
    var elemento = out['pass_it']['selector_job']; //Selecciona el job
    var elem = document.querySelectorAll(elemento)[out['pass_it']['cont']]; //En la posición del cont
    if(elem){ //Si existe toma la info 
  
      var title =  elem.querySelector('a.job-result-title').textContent.trim();
      var url =  'https://jobs.karbonhomes.co.uk/tlive_webrecruitment/wrd/run/etrec105gf.open?wvid=5562310fzx';// + "?utm_source=talent";      
      var location =  "Newcastle upon Tyne, UK";
      //var jobtype =  elem.querySelector('span.jo-t__contract-type').textContent.trim();
        //Y la almacena en pass_it
      out['pass_it']['title'] = title;
      out['pass_it']['url'] = url;
      out['pass_it']['location'] = location;
      //out['pass_it']['jobtype'] = jobtype;
  
        //Aquí se da el click para abrir la descripción 
      if(typeof(selector_click_job)=='undefined'){
        elem.click();
        out.waitFor = out['pass_it']['selector_desc'];
      }else{
        elem.querySelector(selector_click_job).click();
        out.waitFor = out['pass_it']['selector_desc']
      }
    }else{ //Si no existe  el elem entonces bandera salir = true
      msg('En el false de BEFORE');
      msg(elemento);
      msg(elem);
      out['pass_it']['salir'] = true;
    }
    return out;
  })();




  //EXTRACT
  (function(){
    var out = {};
    var jobs = [];
    //Creamos el pass_it si no existe
    out['pass_it']= pass_it;
    if(out['pass_it']['salir']){
      var job = {};
      job.title = 'Hola';
      jobs.push(job);
    }else{ //Si ya existe
      //msg(out['pass_it']['selector']);
      if(document.querySelector(out['pass_it']['selector_desc'])){
        var job = {};
        //Se guarda la info del pass_it en el job
        job.title = out['pass_it']['title'];
        job.url = out['pass_it']['url'];
        job.location = out['pass_it']['location'];
        //job.source_jobtype = out['pass_it']['jobtype'];
        //job.fecha = out['pass_it']['fecha'];
        job.temp = 1;
  
        //Se extrae la descripción y se remueven los selectores deseados
        var full_html = contains("dt.label","description",document).nextElementSibling;
        var remove_selectors = ['a','script','style'];
        //remove somethings from the jobdata
        if(remove_selectors.length > 0){
          remove_selectors.forEach(remove_selectors=>{
            let salir;
            do{
              salir = false;
              if(full_html.querySelector(remove_selectors)){
                full_html.querySelector(remove_selectors).remove();
                salir = true;
              }
            }while(salir);
          });
        }
        job.reqid = contains("dt.label","reference",document).nextElementSibling.textContent.trim();
        
        job.dateposted_raw = contains("dt.label","posted",document).nextElementSibling.textContent.trim().split("/");
        job.dateposted_raw = job.dateposted_raw[1] + "/" + job.dateposted_raw[0] + "/" + job.dateposted_raw[2];
        
        job.dateclosed_raw = contains("dt.label","closing",document).nextElementSibling.textContent.trim().split("/");
        job.dateclosed_raw = job.dateclosed_raw[1] + "/" + job.dateclosed_raw[0] + "/" + job.dateclosed_raw[2];
        
		var salary = contains("dt.label","Salary",document).nextElementSibling.textContent.trim();
      	if (salary.search(/[0-9]/) > -1) {job.source_salary = salary.split(", ").shift().trim();}
        
  
        job.html = full_html.innerHTML.trim();
        job.jobdesc = full_html.textContent.trim();
  
        // job.html = removeTextBefore(job.html,'',false);
        // job.jobdesc = removeTextBefore(job.html,'',false);
  
        job.html = removeTextAfter(job.html,'Important dates',true);
        job.jobdesc = removeTextAfter(job.html,'Important dates',true);
        
        job.html = removeTextAfter(job.html,'If this sounds like the role for you',true);
        job.jobdesc = removeTextAfter(job.html,'If this sounds like the role for you',true);
  
        job.html = cleanHTML(job.html);
        job.jobdesc = cleanHTML(job.jobdesc);

        jobs.push(job);
        
      }else{
        msg('Entro en el else')
      }
    }
    out['jobs'] = jobs;
    return out;
  
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }  		
    }
    return newHtml;
  }
  
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }  		
    }
    return newHtml;
  }

function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento}})
  return resultado;
} 



//P
(function () {
  var out = {};
  out['pass_it'] = pass_it;
  out['pass_it'].cont += 1;
  //Formas de devolverse
  //window.location.href = ''; // por ubicacion
  //window.history.back(); // para devolverse con la fecha de atras
  var selector_back = '';
  if(document.querySelector(selector_back))	document.querySelector(selector_back).click();
  
  if (out['pass_it']['salir'])
      out["has_next_page"] = false;
  else
      out["has_next_page"] = true;
  out.waitFor = out['pass_it']['selector_job'];
  //out['wait'] = true;
  return out;
})();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// - OTRA PLANTILLA - ////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Scanid: http://boo1.neuvoo.com/boo3-web/spider/add-step.php?style=dark&id=26800
//Jobsite: http://boo1.neuvoo.com/boo3-web/spider/add-step.php?style=dark&id=26800
//BE
(function() {
	var out = {};
  	out.waitFor = "table.sect_header.res_sect_header";
    return out;
})();



//E
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("table.sect_header.res_sect_header");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("h2").textContent.trim().split(" based at").shift();
    var url = elem.querySelector("h2 a").href.trim();
    var uno = url.split("%1BUSESSION").shift();
    var dos = elem.querySelector("h2 a").href.split("&W").pop();
    job.url = uno +"&W"+ dos + '&utm_source=talent';
    //console.log(uno)

    //console.log(dos)

    aux_selector = Array.from(elem.querySelectorAll("div.job-search-summary dt"));
    dom_selector = aux_selector.find(aux => aux.innerText.search(/Location/gi)>-1);
    if(dom_selector){		
        job.location = dom_selector.nextElementSibling.textContent.trim();        
      	job.location = job.location.replace("Pickering","Pickering, UK").replace("Wallington","Wallington, UK");//.replace("£9.49 per hour","Whitstable");
        job.location = job.location.replace("Kingsbury","Kingsbury, UK").replace("Didsbury","Didsbury, Manchester, UK");
        job.location = job.location.replace("Weston Rd, Stafford","Stafford, UK").replace("West","Brístol, UK").replace("Wells","Wells, UK");
    }
    if (!job.location) {job.location = elem.querySelector("h2").textContent.trim().split(" based at").pop().trim();}
    //job.location = elem.querySelector("dl > div:nth-child(1) > dd").textContent.trim();

    if(job.url.indexOf("https://ce0136li.webitrent.com/ce0136li_webrecruitment/wrd/run/ETREC107GF.open?VACANCY_ID%3d5952566yaq%1BU&WVID=5282505Pqd&LANG=USA")>-1){ job.location = "Ripley";}
    if(job.url.indexOf("https://ce0136li.webitrent.com/ce0136li_webrecruitment/wrd/run/ETREC107GF.open?VACANCY_ID%3d5046466pZR%1BU&WVID=5282505Pqd&LANG=USA")>-1){ job.location = "Derby";}
    if(job.url.indexOf("https://ce0136li.webitrent.com/ce0136li_webrecruitment/wrd/run/ETREC107GF.open?VACANCY_ID%3d0797646dZZ%1BU&WVID=5282505Pqd&LANG=USA")>-1){ job.location = "Weston Rd, Stafford";}

    dom_selector = aux_selector.find(aux => aux.innerText.search(/Salary/gi)>-1);
    if(dom_selector){		        
        job.source_salary = dom_selector.nextElementSibling.textContent.trim();
    }

    dom_selector = aux_selector.find(aux => aux.innerText.search(/Application closing date/gi)>-1);
    if(dom_selector){		
      	aux = dom_selector.nextElementSibling.textContent.trim().split("/");
       	job.dateclosed_raw = aux[1]+"/"+aux[0]+"/"+aux[2];       
    }
    job.source_jobtype = elem.querySelector("div.desc.jD").textContent.split("Available Hours:").pop().split("–").shift().split("Relief -").pop().split(".").shift().trim();
    job.source_salary = elem.querySelector("dl.inline.job-search-dl").textContent.split("Salary:").pop().split("• Job reference:").shift().trim();
    job.reqid = elem.querySelector("dl.inline.job-search-dl").textContent.split("Job reference:").pop().split("• Application closing date:").shift().trim();

    // var fechaparte = elem.querySelector("dl > div:nth-child(5) > dd").textContent.trim();
   // var separador = '/';
   // var ano = fechaparte.split(separador)[2];
   // var monthJob = fechaparte.split(separador)[1];
   // var dia = fechaparte.split(separador)[0];
   // job.dateclosed_raw = monthJob+"/"+dia+"/"+ano;
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("dl > div:nth-child(3) > dd").textContent.trim();
    job.temp = "Feb-25-2021";
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();



//P
(function () {
	var out = {};
	var next_page_selector = 'input[value="Next"]'; // Selector del next 
	//var last_page_selector = ""; //Selector de la última página

	var clickable_elem = document.querySelector(next_page_selector);

	//stop condition
	if (!document.querySelector(next_page_selector)) {
		out["has_next_page"] = false;
	} else {
		clickable_elem.click();
		out["has_next_page"] = true;
	}

	out.waitFor = "";
	return out;
})();



//Infinite Pag
//////INFINITY PAGINATION/////
(function () {
  var out = {};
  var selector = "input.standard_bu.srch_standard_bu";  // SELECTOR DEL BOTON

  if (typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
          "click": true
      };
  } else {
      out["pass_it"] = pass_it;
  }

  if (out["pass_it"]["click"])
      document.querySelector(selector).click();

  out.waitFor = "table.sect_header.res_sect_header"; // ESPERAR POR LOS JOBS
  return out;
})();
////// END  INFINITY PAGINATION/////



//JD
(function() {
  var out = {};
  var job = {};
  var selector = "dl > dd:nth-child(21)";
  var remove_selectors = ['img'];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();

  var fechaparte = document.querySelector("dl > dd:nth-child(7)").textContent.trim();//.replace(/[-]/g, '/'); //.replace(/ /g,"/")
  var separador = '/';
  var ano = fechaparte.split(separador)[2].trim();
  var monthJob = fechaparte.split(separador)[1].trim();
  var dia = fechaparte.split(separador)[0].trim();
  job.dateposted_raw = monthJob+"/"+dia+"/"+ano;
  msg(job.dateposted_raw)
  
  /*var fechaparte2 = document.querySelector("dl > dd:nth-child(9)").textContent.trim();//.replace(/[-]/g, '/'); //.replace(/ /g,"/")
  var ano2 = fechaparte2.split(separador)[2].trim();
  var monthJob2 = fechaparte2.split(separador)[1].trim();
  var dia2 = fechaparte2.split(separador)[0].trim();
  job.dateclosed_raw = monthJob2+"/"+dia2+"/"+ano2;
  msg(job.dateclosed_raw)*/

  //job.html = removeTextBefore(job.html, '', false);
  //job.html = removeTextBefore(job.html, '', false);
  //job.html = removeTextBefore(job.html, '', false);
  //job.html = removeTextBefore(job.html, '', false);
  //job.html = removeTextBefore(job.html, '', false);
  //job.html = removeTextBefore(job.html, '', false);
  job.html = removeTextAfter(job.html, 'For more information about', true); 
  job.html = removeTextAfter(job.html, 'revise la descripción del trabajo adjunta.', true);
  job.html = removeTextAfter(job.html, 'Learn more about', true); 
  //job.html = removeTextAfter(job.html, 'For more information about the home,', true);
  //job.html = removeTextAfter(job.html, '', true);
  //job.html = removeTextAfter(job.html, '', true);
  //job.html = removeTextAfter(job.html, '', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  
  //if (job.jobdesc.length<55){ job.flag_active = 0}
  
  out["job"] = job;
  return out;

})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }       
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }       
  }
  return newHtml;
}