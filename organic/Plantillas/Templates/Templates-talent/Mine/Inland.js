/*
 * Dentro del before extract
 */
(function(){
    var out = {};
    var selector_jobs = ''; //selector jobs
    var selector_desc = ''; //selector descripción 
    var selector_click_job = ''; //selector donde se hace click
  
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
  
      var title =  elem.querySelector('').textContent.trim();
      var url =  window.location.href;// + "?utm_source=talent";      
      var location =  elem.querySelector('').innerText.trim();
      //var jobtype =  elem.querySelector('span.jo-t__contract-type').textContent.trim();
        //Y la almacena en pass_it
      out['pass_it']['title'] = title;
      out['pass_it']['url'] = url;
      out['pass_it']['location'] = location;
      //out['pass_it']['jobtype'] = jobtype;
  
        //Aquí se da el click para abrir la descripción 
      if(typeof(selector_click_job)=='undefined'){
        //window.location.href = '';
        elem.click();
        out.waitFor = out['pass_it']['selector_desc'];
      }else{
        //window.location.href = '';
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


/*
 * Dentro del extract
 */
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
  
        job.html = full_html.innerHTML.trim();
        job.jobdesc = full_html.textContent.trim();
  
        // job.html = removeTextBefore(job.html,'',false);
        // job.jobdesc = removeTextBefore(job.html,'',false);
  
        // job.html = removeTextBefore(job.html,'',false);
        // job.jobdesc = removeTextBefore(job.html,'',false);
  
        job.html = cleanHTML(job.html);
        job.jobdesc = cleanHTML(job.jobdesc);

        jobs.push(job);
        
      }else{
        msg('Entro en el else')
        /* //EN CASO DE QUE SEA UN JOB CERRADO O QUE TENGA ALGÚN SELECTOR QUE INDIQUE QUE NO DEBEMOS SUBIRLO
        if (document.querySelector('div.clsJspBox')) {
          msg('TRABAJO CERRADO');
          var job = {};
          job.title = out['pass_it']['url'];
          jobs.push(job);
          out['pass_it']['salir'] = false;
        }
        */
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


  /*
 * Dentro del pagination
 */
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