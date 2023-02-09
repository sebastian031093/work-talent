jobsite: https://www.chinabank.ph/young_professional_jobs.aspx
Scanid: 106875
///infinite pagination
(function(){   
  var out = {};
if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
          "cont": 0,
          "jobsT":0,
          "urls":['https://www.chinabank.ph/young_professional_jobs.aspx',
                  'https://www.chinabank.ph/experienced_executive_jobs.aspx'],
          "url":'',
          "salir" : false
        };
    } else {
        out["pass_it"] = pass_it;
    }

     if(out["pass_it"]["urls"].length > 0)
       out["pass_it"]["url"]= out["pass_it"]["urls"].shift();
  
  return out;
})();

//////////before extract
(function () {
    var out = {};
  	var selectorJobs = "div.pnlListItem > div.ListItem";
    if (typeof pass_it == "undefined") pass_it = {};

        out["pass_it"] = pass_it;

    out['pass_it'].jobsT = document.querySelectorAll(selectorJobs).length; //SELECTOR DE LOS JOBS
    msg ("TRABAJO: "+out["pass_it"].cont +" DE "+out['pass_it'].jobsT +" TRABAJOS");
    if (out["pass_it"].cont < out["pass_it"].jobsT) {
        var indice = out["pass_it"].cont;
	    var elemento = document.querySelectorAll(selectorJobs)[indice]; //SELECTOR DE LOS JOBS
      	    out['pass_it']['title']= elemento.textContent.trim();
            out['pass_it']['url'] = window.location.href;
            //out['pass_it']['dateposted'] = elemento.querySelector('span.date').textContent.trim();
            elemento.click() //SELECTOR PARA ABRIR EL TRABAJO
     }else{
      msg("EN EL FALSE DE BEFORE");
      msg(elemento);
      
      out["pass_it"]["salir"] = true;
    }
     //out['wait']=true;
  	out.waitFor = '#pnlJobDetail > div:nth-child(2)';
    return out;
  })();




  
  /////extract////////
  (function() {
    var out = {};
    var jobs = [];
        out["pass_it"] = pass_it;
    if (out["pass_it"]["salir"]){
      var job = {};
      job.title = 'holaa';
      jobs.push(job);
    }else{
     msg("TRABAJOS: "+out["pass_it"].jobsT);
     if ( document.querySelector("#pnlJobDetail > div:nth-child(2)")){ //SELECTOR DE LA DESCRIPCION
     	var job = {};
    
    	job.title = out['pass_it']['title']//elem.querySelector("h1").textContent.trim();Location
    	job.url = out["pass_it"]["url"];//out['pass_it']['url'];//elem.querySelector("").href.trim();
    	job.location = contains('p','Location',document.querySelector("#pnlJobDetail > div:nth-child(2)")).replace('branches','').replace(/Location\:|Metro|Location|and Provincial Branches/g,'').replace(/\,/g,';').replace(/ and /g,';').replace(/Head Office/gi,'Makati City, PH');
        job.location = job.location.replace(/Binondo Business Center/g,'Binondo, Manila, PH').replace(/Cebu/g,'Cebú, PH').replace('Makati-','')
       	if(typeof job.location==='undeifned' || job.location.length == 0 ){
          job.location = 'Makati City, PH';
        }
		//if(job.location.indexOf('Manila'>-1)){
       //   job.location = 'Manila';
       // }
       //job.dateposted_raw =  out['pass_it']['dateposted'];//elem.querySelector("span.date").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
        var full_html = document.querySelector("#pnlJobDetail > div:nth-child(2)");  //SELECTOR DE LA DESCRIPCION

        //var remove_selectors = ['h3','h2'];
  		//var job = pass_it["job"];
  		//remove something from the jobdatata
        //if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        //if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        //if (typeof msg == "undefined") msg = console.log;
      	removeTextSelector('Location:\\:p', full_html);
        job.html 	= full_html.innerHTML.trim();   
        if(job.html.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
          job.source_apply_email = job.html.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
        }
		job.jobdesc 	= full_html.textContent.trim();

        job.html	= removeTextBefore(job.html, 'Job Requirement', false);
		job.html	= removeTextAfter(job.html, 'Apply online', true);

        job.html        = cleanHTML(job.html);
        job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
        job.jobdesc     = cleanHTML(job.jobdesc);
      	job.temp = 1;
       
        if(job.location.indexOf(';')>-1){
          aux = job.location.split(';');
          for (i=1;i<aux.length;i++){
            var jobx = {};
          	jobx.title = job.title;
          	jobx.url = job.url;
          	jobx.location = aux[i].trim();
            jobx.source_apply_email =job.source_apply_email
          	jobx.temp = job.temp
          	jobx.html = jobx.html;
          	jobx.jobdesc = job.jobdesc
          if(jobx.title.length > 0 && jobx.location.length >0)
            jobs.push(jobx)
        }
     }else{
        jobs.push(job);
     }
       
    	//jobs.push(job);
      
        }else{
      		msg('el el else');
        } 
    }
	out["jobs"]= jobs;
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
function contains(selector,texto, elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
}
function removeTextSelector(textSelector, elements){
  let selectors = textSelector.split(',');
  selectors.forEach(function(selector){
  let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
    elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
}


/////////pagination
(function () {
    var out = {};
   
        out["pass_it"] = pass_it;

		out["pass_it"].cont++;
  
       if (out["pass_it"].cont < out["pass_it"].jobsT) {
         msg("HAY PAGINACIO");   

         out["has_next_page"] = true;
    	}else {
      	msg("NO HAY PAGINACIO");   
        out["has_next_page"] = false;
    	}
  
  		/////////////////////////////multilink
       if (!out["has_next_page"]){

          if (out["pass_it"]["urls"].length > 0) {
                out["pass_it"]["url"] = out["pass_it"]["urls"].shift();;
                msg('\x1b[42m CAMBIO DE URL \x1b[0m');
                out["pass_it"].cont = 0
                window.location.href = out["pass_it"]["url"];
                  msg(out["pass_it"]["url"]);
                //out["pass_it"].cont =1;  
                out["has_next_page"] = true;
          } else {
              msg('\x1b[41m FIN MULTILINK \x1b[0m');
              out["has_next_page"] = false;
          }
        }
  
      	//out["wait"] = true;
    	out.waitFor = 'div.pnlListItem > div.ListItem';            //COLOCAR EL SELECTOR A ESPERAR
    return out;
})();