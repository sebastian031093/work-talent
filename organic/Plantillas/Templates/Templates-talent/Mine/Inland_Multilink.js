//INFINITE PAGINATION - Saca las URL con un for, mientras se tengan los botones que redirigen a los links
(function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) { return x; };
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "cont": 0,
          	"jobsT":0,
            "currentUrl": 0,
            "urls": [],
            "url":'',
            "salir" : false,
            "SelectorDesc":''
        };
    } else {
        out["pass_it"] = pass_it;
    }
    var areas = document.querySelectorAll('div[class*="department"] a'); //Selector de los links
    for (var x in areas) {
        if (typeof areas[x] == "function") continue;
        if (typeof areas[x] == "number") continue;
        var url = areas[x].href.trim();
      	out["pass_it"].urls.push(url);
    }
  	if(out["pass_it"]["urls"].length > 0) {
       out["pass_it"]["url"] = out["pass_it"]["urls"].shift();
  
    }
    return out;
})(); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BEFORE EXTRACT
(function () {
    var out = {};
    var selectorJobs = "div.job-spin";
    var selectorClickJobs = '';
    var selectorDesc = 'div.vacancy-description-html'
    
    if (typeof pass_it == "undefined") pass_it = {};
    out["pass_it"] = pass_it;
    
    //SELECTORES 
    out['pass_it']['SelectorDesc'] = selectorDesc;
    
    out['pass_it'].jobsT = document.querySelectorAll(selectorJobs).length; //SELECTOR DE LOS JOBS
    msg ("TRABAJO: " + out["pass_it"].cont + " DE "+out['pass_it'].jobsT + " TRABAJOS");
    
    if (out["pass_it"].cont < out["pass_it"].jobsT) {
      var indice = out["pass_it"].cont;
      var elemento = document.querySelectorAll(selectorJobs)[indice]; //SELECTOR DE LOS JOBS
      
      out['pass_it']['title'] = elemento.querySelector("h4").textContent.trim();
      out['pass_it']['jobtype'] = elemento.querySelector("div.jobtype").textContent.trim();
      out['pass_it']['url'] = window.location.href;
      //out['pass_it']['dateposted'] = elemento.querySelector('span.date').textContent.trim();
      
      out["pass_it"]["salir"] = false;
      
      //Si tiene selector de click hace click en este, si no hace click en el selector del job
      if(typeof(selectorClickJobs)=='undefined'){
          elemento.click();
        }
      else {
          elemento.querySelector(selectorClickJobs).click();
        }
    }
    else{
      msg("EN EL FALSE DE BEFORE");
      msg(elemento);
      out["pass_it"]["salir"] = true;
    }
    
    //out['wait']=true;
    out.waitFor = out['pass_it']['SelectorDesc'];
    return out;
  })();



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //EXTRACT
  (function() {
    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;
    if (out["pass_it"]["salir"]){
      var job = {};
      job.title = window.location.href; //"HOLA";
      jobs.push(job);
    }
    else {
     msg("TRABAJOS: "+out["pass_it"].jobsT);
     if ( document.querySelector(out['pass_it']['SelectorDesc'])){ //SELECTOR DE LA DESCRIPCION
        var job = {};
  
        job.title = out['pass_it']['title']//elem.querySelector("h1").textContent.trim();Location
        job.url = out["pass_it"]["url"];//out['pass_it']['url'];//elem.querySelector("").href.trim();
        job.location = "London, GB";
        job.source_jobtype = out['pass_it']['jobtype'].split(":").pop().trim();
        job.reqid = window.location.href.split("id=").pop().split("&").shift().trim();
  
        job.temp = 1;
        //job.dateposted_raw =  out['pass_it']['dateposted'];//elem.querySelector("span.date").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
        //job.source_empname = elem.querySelector("").textContent.trim();
        //job.source_salary = elem.querySelector("").textContent.trim();
  
        var full_html = document.querySelector(out['pass_it']['SelectorDesc']);  //SELECTOR DE LA DESCRIPCION
  
        var remove_selectors = ['h3','h2'];
        //remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
  
        job.html 	= full_html.innerHTML.trim();   
        job.jobdesc 	= full_html.textContent.trim();
        //job.html	= removeTextBefore(job.html, 'Job Requirement', false);
        //job.html	= removeTextAfter(job.html, 'Apply online', true);
        job.html        = cleanHTML(job.html);
        job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
        job.jobdesc     = cleanHTML(job.jobdesc);
  
        jobs.push(job);
  
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






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PAGINATION
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out["pass_it"].cont++;
  
    if (out["pass_it"].cont < out["pass_it"].jobsT) {
      msg("HAY PAGINACIO");   
      out["has_next_page"] = true;
      window.history.back();
    }
    else {
      msg("NO HAY PAGINACIO");   
      out["has_next_page"] = false;
    }
  
    /////////////////////////////multilink
    if (!out["has_next_page"]){
  
      if (out["pass_it"]["urls"].length > 0) {
        out["pass_it"]["url"] = out["pass_it"]["urls"].shift();
        msg('\x1b[42m CAMBIO DE URL \x1b[0m');
        out["pass_it"].cont = 0
        window.location.href = out["pass_it"]["url"];
        msg(out["pass_it"]["url"]); 
        out["has_next_page"] = true;
      } 
      else {
        msg('\x1b[41m FIN MULTILINK \x1b[0m');
        out["has_next_page"] = false;
      }
    }
  
    //out["wait"] = true;
    out.waitFor = 'div.job-spin h4';            //COLOCAR EL SELECTOR A ESPERAR
    return out;
  })();