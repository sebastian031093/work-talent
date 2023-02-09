//EJEMPLO : http://129.71.217.28:8080/jobs/


//SPIDER CONFIG
{
    "options": {
        "inactivateJQuery": false,
        "ignoreLoadErrors": false,
        "waitForPageLoadEvent": false,
        "waitForResources": false
    },
    "noimage": true,
    "skipResources": false,
    "noUnnecessaryResources": false
}



//BE (CON DOBLE CLICK PARA ABRIR LOS JOBS!!!!)
(function(){
    var out = {};
    var selector_jobs = 'div.x-grid3-body > div'; //selector jobs
    var selector_desc = '#x-auto-15'; //selector descripción 
    var selector_click_job = 'table'; //selector donde se hace click
  
    var next_page = '#x-auto-141 > tbody > tr:nth-child(2) > td.x-btn-mc > em > button:not([aria-disabled="true"])';
  	var button_next = document.querySelector(next_page);
  
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
    //msg(document.querySelectorAll(out['pass_it']['selector_job']).length); //Imprime la cantidad de jobs que encuentra
    var elemento = out['pass_it']['selector_job']; //Selecciona el job
    var elem = document.querySelectorAll(elemento)[out['pass_it']['cont']]; //En la posición del cont
    if(elem){ //Si existe toma la info 
  
      var title =  elem.querySelector('tr td:nth-child(2) div b').textContent.trim();
      var url =  window.location.href;// + "?utm_source=talent";      
      var location =  elem.querySelector('tr td:nth-child(5)').innerText.trim();
      var dateposted =  elem.querySelector('tr td:nth-child(3)').textContent.trim();
        //Y la almacena en pass_it
      out['pass_it']['title'] = title;
      out['pass_it']['url'] = url;
      out['pass_it']['location'] = location;
      out['pass_it']['dateposted'] = dateposted;
  
        //Aquí se da el DOBLE!!! click para abrir la descripción 
      if(typeof(selector_click_job)=='undefined'){
        var targLink    = elem;
        var clickEvent  = document.createEvent('MouseEvents');
        clickEvent.initEvent ('dblclick', true, true);
        targLink.dispatchEvent (clickEvent);
        //out.waitFor = out['pass_it']['selector_desc'];
      }else{
        var targLink    = elem;
        var clickEvent  = document.createEvent ('MouseEvents');
        clickEvent.initEvent ('dblclick', true, true);
        targLink.dispatchEvent (clickEvent);
        //out.waitFor = out['pass_it']['selector_desc']
      }
    }else{ //Si no existe  el elem entonces bandera salir = true
      msg('En el false de BEFORE');
      //msg(elemento);
      //msg(elem);
      out['pass_it']['cont'] = 0;
      out['pass_it']['salir'] = true;
    }
    return out;
  })();




  //E
  (function(){
    var out = {};
    var jobs = [];
    //Creamos el pass_it si no existe
    out['pass_it']= pass_it;
    if(out['pass_it']['salir']){
      var job = {};
      job.title = Math.random();
      jobs.push(job);
    }else{ //Si ya existe
      //msg(out['pass_it']['selector']);
      if(document.querySelector(out['pass_it']['selector_desc'])){
        var job = {};
        //Se guarda la info del pass_it en el job
        job.title = out['pass_it']['title'];
        job.url = out['pass_it']['url'];
        job.location = out['pass_it']['location'];
        job.dateposted_raw = out['pass_it']['dateposted'];
        //job.fecha = out['pass_it']['fecha'];
        job.temp = 1;
  
        //Se extrae la descripción y se remueven los selectores deseados
        var full_html = document.querySelector(out['pass_it']['selector_desc']);
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
        
        //job.source_jobtype = contains('#x-auto-15 table > tbody > tr[role="presentation"] > td.x-table-layout-cell',"Job Type",document).nextElementSibling.textContent.trim();
        job.source_salary = contains('#x-auto-15 table > tbody > tr[role="presentation"] > td.x-table-layout-cell',"Pay Rate",document).nextElementSibling.textContent.trim();
        job.reqid = contains('#x-auto-15 table > tbody > tr[role="presentation"] > td.x-table-layout-cell',"Order Number",document).nextElementSibling.textContent.trim();
        job.experience_required = contains('#x-auto-15 table > tbody > tr[role="presentation"] > td.x-table-layout-cell',"Experience",document).nextElementSibling.textContent.trim();
  
        job.html = full_html.innerHTML.trim();
        job.jobdesc = full_html.textContent.trim();
  
        job.html = removeTextBefore(job.html,'Job Summary',false);
        job.jobdesc = removeTextBefore(job.html,'Job Summary',false);
        
        job.html = removeTextAfter(job.html,'Experience',false);
        job.jobdesc = removeTextAfter(job.html,'Experience',false);
  
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
    //window.location.href = 'http://129.71.217.28:8080/jobs/'; // por ubicacion
    //window.history.back(); // para devolverse con la fecha de atras
    var selector_back = '.x-tab-strip-closable .x-tab-strip-close';
    if(document.querySelector(selector_back))	document.querySelector(selector_back).click();
  
    var next_page = '#x-auto-141 > tbody > tr:nth-child(2) > td.x-btn-mc > em > button:not([aria-disabled="true"])';
  	var button_next = document.querySelector(next_page);
  
  	msg(out['pass_it']['cont']);
    
  	if (out['pass_it']['salir']) {
      	if (button_next) {
            button_next.click();
            out["has_next_page"] = true;
          	out['pass_it']['salir'] = false;
          	
            //out.waitFor = '#x-auto-141 > tbody > tr:nth-child(2) > td.x-btn-mc > em > button';
        }
        else {
            out["has_next_page"] = false;
        }
    }
    else {
        out["has_next_page"] = true;
    	//out.waitFor = out['pass_it']['selector_job'];
    }
    //out['wait'] = true;
    return out;
})();




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////  -  OTRA PLANTILLA  -  //////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Before extract
(function() {
  let out = {};
let selectorJobs ="tr.ftlcopy.ftlrow";
let selectorDescription="div.editablesection";
let selectorPaginacion = 'a[title="Go to the next page"][aria-disabled="false"]'
let elem 

  if (typeof pass_it == "undefined") 
    pass_it = {};
  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 0,
          "salir":false,
          "pagination": false,
          "selectorPaginacion": selectorPaginacion,
          "selectorDescription": selectorDescription,
          "selectorJobs": selectorJobs,
          "nextPage": 0 
      };
  } else {
      out["pass_it"] = pass_it;
  }   
elem = document.querySelectorAll(selectorJobs)[out["pass_it"]["cont"]];
   
if (elem){
  out["pass_it"].title = elem.querySelector("span.titlelink a").textContent.trim() 
  out["pass_it"].location = "Glens Falls, NY, US";
  out["pass_it"].source_jobtype = elem.querySelector("span.jobtype").textContent.trim()
  elem.querySelector("span.titlelink a").click();
  out.waitFor = selectorDescription;
  out.wait = true;
}
else{
  msg("no hay mas jobs")
  
  if(document.querySelector(out["pass_it"].selectorPaginacion)){
     msg("hay paginacion-->")
     out["pass_it"].pagination = true;                 
  }else {
      out["pass_it"]["salir"] = true;
  }        
}

  out.pic = 1
  return out;
})();

// EXTRACT
(function() {
  var out = {};
out.html = true;
  var jobs = [];
  out["pass_it"] = pass_it;
  if (out["pass_it"]["salir"]){
    var job = {};
    job.title = 'holaa';
    jobs.push(job);
  } else {
  if (document.querySelector("html")){
    var job = {};
    job.title = out["pass_it"]["title"]//document.querySelector("").textContent.replace(/\[.*?\]/g, '').trim();
    job.location = out["pass_it"]["location"];//document.querySelector("").textContent.trim();
    job.url = window.location.href;
    job.source_jobtype = out["pass_it"].source_jobtype;
    
    var datePosted    
    for (const a of document.querySelectorAll('div.contentlinepanel')) {
      if (a.textContent.search('Posting:')>-1){
         datePosted = a.textContent.split("Posting:").pop().trim();
         datePosted = datePosted.split(", ").slice(0, -1).join(" ").split(" ")
         job.dateposted_raw = replaceMonths(datePosted[0]) + "/" + datePosted[1] + "/" + datePosted[2];
         job.dateposted_raw = completeMonths(job.dateposted_raw);
      } 
    }
    
    for (const a of document.querySelectorAll('p')) {
      if (a.textContent.search('@')>-1 || a.textContent.search('www')>-1){
         a.remove();
      } 
    }
    job.html = document.querySelector('div.editablesection').innerHTML.trim();
    
    //job.html = removeTextBefore(job.html, 'Description', false);
    job.html = removeTextAfter(job.html, 'Primary Location', true);
    job.html = removeTextAfter(job.html, 'For more information visit', true);
    
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    
    if(job.html < 50) {
      job.flag_active = 0
    }
  job.temp = 1;
  jobs.push(job);
  }   
}

out["jobs"] = jobs;
  return out;

 
})();
function replaceMonths(month) {
  var newMonth = month;
  newMonth = newMonth.replace("Jan", "01").trim();
  newMonth = newMonth.replace("Feb", "02").trim();
  newMonth = newMonth.replace("Mar", "03").trim();
  newMonth = newMonth.replace("Apr", "04").trim();
  newMonth = newMonth.replace("May", "05").trim();
  newMonth = newMonth.replace("Jun", "06").trim();
  newMonth = newMonth.replace("Jul", "07").trim();
  newMonth = newMonth.replace("Aug", "08").trim();
  newMonth = newMonth.replace("Sep", "09").trim();
  newMonth = newMonth.replace("Oct", "10").trim();
  newMonth = newMonth.replace("Nov", "11").trim();
  newMonth = newMonth.replace("Dec", "12").trim();
  return newMonth;
}
function completeMonths(month) {
  var newMonth = month;
  newMonth = newMonth.replace("/1/", "/01/").trim();
  newMonth = newMonth.replace("/2/", "/02/").trim();
  newMonth = newMonth.replace("/3/", "/03/").trim();
  newMonth = newMonth.replace("/4/", "/04/").trim();
  newMonth = newMonth.replace("/5/", "/05/").trim();
  newMonth = newMonth.replace("/6/", "/06/").trim();
  newMonth = newMonth.replace("/7/", "/07/").trim();
  newMonth = newMonth.replace("/8/", "/08/").trim();
  newMonth = newMonth.replace("/9/", "/09/").trim();
  return newMonth;
}
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


//PAGINACION
(function () {
var out = {};
 
  out["pass_it"] = pass_it;
  out["pass_it"].cont += 1;
  //window.location.href = 'https://careers.klm.com/search/all';
  //window.history.back  
  if(document.querySelector('a[title="Return to the previous page"]')) {
    document.querySelector('a[title="Return to the previous page"]').click();
    out.waitFor = out["pass_it"]["selectorJobs"];
  }

 if(out["pass_it"].pagination){
      var  clickPagination = document.querySelector(out["pass_it"].selectorPaginacion);
      if(clickPagination){
          clickPagination.click();        
          out["pass_it"].pagination = false;
          out["pass_it"].cont =0;
          out.waitFor = out["pass_it"].selectorJobs;
          out.wait = true; 
          out["has_next_page"] = true; 
      }else {
          out["has_next_page"] = false; 
      }
        
  }else if (out["pass_it"]["salir"]) {
        out["has_next_page"] = false;
  } else {
        out["has_next_page"] = true;
  }   
 
    //msg(out["pass_it"].nextPage)
    //out.waitFor = out["pass_it"]["selectorJobs"]
    //out.wait = true
    out["pic"] = true
    return out;
})();