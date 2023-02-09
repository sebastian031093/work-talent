// https://temenos.csod.com/ux/ats/careersite/4/home

//

 (function(){
  let out = {};
  
  if(typeof pass_it =="undefined")
    pass_it ={}
  
  if(!pass_it["toket"]){
    out["pass_it"] = {
      "token":""
    }
  }else{
   out["pass_it"] = pass_it; 
  }
  
  out["pass_it"].token = getRequest('https://temenos.csod.com/ux/ats/careersite/11/home?c=temenos').split('"token":"')[1].split('","debug"')[0]; 
 // msg(out["pass_it"].token);
  return out
})();

function getRequest(url, data) {
  //let data = ''; //queryString Payload
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  //HEADERS
    xhrrequest.setRequestHeader("accept", "application/json, text/plain, */*");
    xhrrequest.setRequestHeader("accept-language", "es-419,es;q=0.9");
   xhrrequest.setRequestHeader("content-type", "application/json;charset=UTF-8");
  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }else{console(xhrrequest.status); }
  };
  xhrrequest.send(data); 
  return response;

  }


// extract

(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
   out["pass_it"] = pass_it;
  //do {
  var data = {"careerSiteId":4,"careerSitePageId":4,"pageNumber":1,"pageSize":2500,"cultureId":1,"searchText":"","cultureName":"en-US","states":[],"countryCodes":[],"cities":[],"placeID":"","radius":null,"postingsWithinDays":null,"customFieldCheckboxKeys":[],"customFieldDropdowns":[],"customFieldRadios":[]};
  $.ajax({
    url : 'https://eu-cdg.api.csod.com/rec-job-search/external/jobs',
    headers: {
    "accept": "application/json; q=1.0, text/*; q=0.8, */*; q=0.1",
    "accept-language": "es-ES,es;q=0.9",
    "authorization":"Bearer "+out["pass_it"].token,
    "cache-control": "no-cache",
    "content-type": "application/json",
    "csod-accept-language": "en-US",
    "sec-ch-ua": "\"(Not(A:Brand\";v=\"8\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
    },
    type : 'POST',
    data : JSON.stringify(data),
    dataType: "json",
    async : false,
    success : function(result){
      json = result.data.requisitions;
      limit = result.data.totalCount;
      for(var i = 0; i<json.length; i++) {
        var job = {};
        var elem = json[i];
        job.reqid = elem.requisitionId
        job.title = elem.displayJobTitle;
        job.source_location = elem.locations[0];
        job.location = elem.locations[0];
        job.url = `https://temenos.csod.com/ux/ats/careersite/4/home/requisition/${job.reqid}?c=temenos`;                    
        job.dateposted_raw = elem.postingEffectiveDate;
        if(job.location.length > 1){
          job.location.forEach(element =>{
            var jobw = {...job};
            let {city, country} = element;
            jobw.location = `${country}, ${city}`;
            jobw.location = jobw.location.replace("undefined,", '').replace("undefined", "");
            jobs.push(jobw); // Multi-location jobs
            job.temp = 2324;
          });
        }else{
          job.temp = 2324;
          let {city, country} = elem.locations[0];
          job.location = `${city}, ${country}`;
          job.location = job.location.replace("undefined,", '').replace("undefined", "");
          jobs.push(job);
        }

        //job.dateclosed_raw = elem.positionOfDateClosed;
        //job.source_jobtype = elem.positionOfJobtype;
        //job.source_salary = elem.positionOfSalary;     
        //job.source_empname = elem.positionOfEmpname;
        //job.logo = elem.positionOfLogo;
        //job.source_apply_email = elem.positionOfEmail;
      }
      job.temp = 35;
      jobs.push(job);
      counter = counter + 1;
    },
    error: function(error){
      msg(error);
    }
  });
  //} while (jobs.length > 0);

  out["jobs"]= jobs;
  return out;
})();

 
 
 

//JOBDATA

(function() {
	let out = {};
	let job = {};
  	let selector = 'div[id="cs-root"]';
  	//var job = pass_it["job"];
	
    
	let full_html = document.querySelector(selector);
	if(full_html){   //VALIDAR SI DESCRIPCION NO ES NULL

  	// remove something from the jobdatata

	  //if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) 	full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;
      

   //LOCATION
   //job.location = contains('Selector','Palabra',full_html);
   //job.location = full_html.querySelector('').textContent.trim()

   //JOBTYPE
	 //job.source_jobtype = contains('Selector','Palabra',full_html);
   //job.source_jobtype = full_html.querySelector('').textContent.trim()

   //SALARY
   //job.source_salary = contains('Selector','Palabra',full_html);
   //job.source_salary = full_html.querySelector('').textContent.trim()

   //DATEPOSTED
   //job.dateposted_raw = full_html.querySelector('').textContent.trim()
	 //job.dateposted_raw = formatDate(contains('Selector','Palabra',full_html),' ',1,0,2);

   //DATECLOSED
   //job.dateclosed_raw = full_html.querySelector('').textContent.trim()
    //job.dateclosed_raw = formatDate(contains('Selector','Palabra',full_html),' ',1,0,2);

//REMOVER SELECTORES
//===================
removeSelector('script, style, a, img',document);
//removeSelector('selector1, selector2,selectorN',document);
//removeSelector('selector1, selector2,selectorN',document);


//REMOVER SELECTORES POR TEXTO
//=============================
//removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')
//removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')  

	job.html 	    = full_html.innerHTML.trim();

//REPLACE ELIMINAR URL
//======================
//job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

//OBTENER EMAIL DE APPLY
//=======================
//if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
//  job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
//}


// --------------- removeTextBefore -----------
job.html = removeTextBefore(job.html,"Job Description",true);
job.html = removeTextBefore(job.html, "KEY RESPONSIBILITIES", false);
//job.html = removeTextBefore(job.html, "", false);
//job.html = removeTextBefore(job.html, "", false);

// ------------ -- removeTextAfter -----------
    job.html = removeTextAfter(job.html,"Please make sure",true);
    job.html = removeTextAfter(job.html, "HOW TO APPLY?", true);
//job.html = removeTextAfter(job.html, "", true);
//job.html = removeTextAfter(job.html, "", true);

//-----------------FILTRADO POR SPLIT----------------
//job.html 		= job.html.split('')[0];
//job.html 		= job.html.split('')[0];
//job.html 		= job.html.split('')[0];
//job.html 		= job.html.split('')[0];
//job.html 		= job.html.split('')[0];
//job.html 		= job.html.split('')[0];

job.html        = cleanHTML(job.html);
job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
job.jobdesc     = cleanHTML(job.jobdesc);

//desactivar jobs con descripcion menor a 50 caracteres
if (job.jobdesc.length < 50){
    job.flag_active=0;
}
}else{
	job.html 		= '';   //SI DESCRIPCION ES NULL SE LE ASIGNA CERO(0) CARACTERES
	job.jobdesc 	= '';
	job.flag_active=0;
}


	out["job"] = job;
	return out;
  
   
})();

 function removeTextBefore(html, text, flag) {
      let newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = "<h3>" + text + "</h3>" + newHtml;
        }  		
      }
      return newHtml;
    }

    function removeTextAfter(html, text, flag) {
      let newHtml = html;
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
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
}    

function removeTextSelector(textSelector,elements){
  let selectors = textSelector.split(',');
  selectors.forEach(function(selector){
  let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
    elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
}

function removeSelector(selectorDom, elements){
  selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
}

function formatDate(get_date, sC, pMes, pDia, pAno) {  //Ingreso String con fecha;caracter separador;posicion Mes, Dia y Año
   get_date = get_date.replace(/\,/g,"").trim();
   let monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   let dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   let dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}


function tagExperienceRequired(elem = document){
  let primerFiltro = []
  elem.querySelectorAll('*').forEach((word) => {
    if ((word.textContent.match(/experience|expérience|erfahrung/gi) && (word.textContent.match(/[0-9]/)) && word.tagName != "BODY" && word.tagName != "HTML" && word.tagName != "SCRIPT" && word.tagName != "STYLE")) {
      if(word.innerText.match(/experience|expérience|erfahrung/gi))
        primerFiltro.push(word.textContent.trim().split(/[,]|[.]|[;]|[A-z]:|\n/g))

    }
    primerFiltro = primerFiltro.flat()
  });
  var deleteDuplicados = primerFiltro.filter((elem, i) => primerFiltro.indexOf(elem) === i)
  var segundoFiltro = []
  deleteDuplicados.forEach(elem => {
    if(elem.match(/experience|expérience|erfahrung|Berufserfahrung/gi) && elem.match(/\d+/g))
      segundoFiltro.push(elem.trim())

  })
  var arrayFinal = segundoFiltro.filter((elem, i) => segundoFiltro.indexOf(elem) === i)
  return arrayFinal[0]
}