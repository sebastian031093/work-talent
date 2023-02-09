//E
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.vacancy-info");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h2 > a").textContent.trim();
    	job.url = elem.querySelector("h2 > a").href.trim();
    	job.location = contains("div.form-group.no-marg","Location:",elem).replace("Location:","").trim();//elem.querySelector("").textContent.trim();
      	if(job.location.indexOf("Other")>-1){job.location = "";}
      
         if(typeof contains("div.form-group.no-marg","Closing date:",elem).replace("Closing date:","").trim().length > 5)
          job.dateclosed_raw = cambiofecha(contains("div.form-group.no-marg","Closing date:",elem).replace("Closing date:","").trim().split(",").pop().replace(/th|rd|st|nd/gi,"")," ",1,0,2);//elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		job.source_jobtype = contains("div.form-group.no-marg","Job type:",elem).replace("Job type:","").trim()//elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
      
    if(job.location.indexOf(",")>-1) {
                var aux = job.location.split(",");
				for(var i=0;i< aux.length;i++){
                    var jobx = {};
                    
                   jobx.title = job.title;
    	           jobx.url = job.url;
                   // jobx.source_empname = job.source_empname;
                   jobx.location = aux[i].replace('Region','')+ ", NZ"; 
                   jobx.dateclosed_raw = job.dateclosed_raw;
                   jobx.source_jobtype = job.source_jobtype;
                    
               //     jobx.html = job.html;
               //     jobx.logo = job.logo;
                    jobx.temp = job.temp;
                     
         				if(jobx.title.length > 0 && jobx.location.length > 0){
                         jobs.push(jobx);
                  }
                       
                  }
              }
          else{
            		job.location = job.location +", NZ"
           			if(job.location.length > 5)
         				jobs.push(job);
               
          }   
      
      //if(job.location.length > 0)
    //	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();
function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
} 

function cambiofecha(get_date, sC, pMes, pDia, pAno) {
          get_date = get_date.trim();
          var ano= get_date.split(sC)[pAno].trim();
          var monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
          var dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
          var dateEng = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}; 
           datePosted = dateEng[monthJob].trim()+"/"+dia+"/"+ano;   
      return datePosted;
    }

    /////////////////////////////////////////////////////
//P
(function () {
    var out = {};
    out.waitFor="div.vacancy-info"; //COLOCAR SELECTOR POR EL CUAL ESPERAR
  
    var url_base = "https://huttvalleydhb.careercentre.net.nz/Job?page="; //COLOCAR URL

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  

  var perpage_fijo = 10; //CANTIDAD ELEMENTOS POR PAGINA
  var perpage_actual = document.querySelectorAll("div.vacancy-info").length; //COLOCAR SELECTOR PARA EXTRAER JOBS
    

 msg("perpage_fijo: "+perpage_fijo);
  msg("perpage_actual: "+perpage_actual);
  
  

  
 
  if (perpage_actual >= perpage_fijo){
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("\x1b[45m URL siguiente:\x1b[45m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  } else {
    msg('\x1b[41m NO HAY MAS PAGINA ');
    out["has_next_page"] = false;
  
  }
  
   
    return out;
})();

///////////////////////////////////
//JD
(function() {
	var out = {};
	var job = {};
  	var selector = "div.job-ad-body";
  	var remove_selectors = ['a'];
  	//var job = pass_it["job"];
	
    
	var full_html = document.querySelector(selector);
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
	 //job.dateposted_raw = cambiofecha(contains('Selector','Palabra',full_html),' ',1,0,2);

   //DATECLOSED
   //job.dateclosed_raw = full_html.querySelector('').textContent.trim()
    //job.dateclosed_raw = cambiofecha(contains('Selector','Palabra',full_html),' ',1,0,2);

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
	job.jobdesc 	= full_html.innerHTML.trim();

//REPLACE ELIMINAR URL
//======================
//job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');

//OBTENER EMAIL DE APPLY
//=======================
//if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
//  job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
//}


// --------------- removeTextBefore -----------
job.html = removeTextBefore(job.html, "ABOUT THE ROLE", false);
//job.html = removeTextBefore(job.html, "", false);
//job.html = removeTextBefore(job.html, "", false);
//job.html = removeTextBefore(job.html, "", false);

// ------------ -- removeTextAfter -----------
job.html = removeTextAfter(job.html, "HOW TO APPLY", true);
//job.html = removeTextAfter(job.html, "", true);
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

function cambiofecha(get_date, sC, pMes, pDia, pAno) {  //Ingreso Strin con fecha;caracter separador;posicion Mes, Dia y Año
   get_date = get_date.trim();
   var monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
   var dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
   var dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
   typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
  return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
}
































//E
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.role-item.role--army");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div.role-grid-details a h5.role-grid-details--title").textContent.trim();
    	job.url = elem.querySelector("div.role-cta div.role-link a").href.trim();
    	job.location = "Wellington, NZ";
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = "NOV-04-2020";
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

//P
(function() {
    var out = {};
  var next_page_selector = "div.pagination > a.next-button"; //selector to identify the next button
  //var last_page_selector = ""; //selector to identify the last page
   
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    /*if (!document.querySelector(last_page_selector)) {
        //last page
      out["has_next_page"] = false;
  } else */if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = false;
  }

    out.waitFor = "";
    return out;
})();

//JD
(function() {
    var out = {};
    var job = {};
    var selector = "div.content-block.left.container";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    //job.html = removeTextAfter(job.html, 'Application Instructions', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
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