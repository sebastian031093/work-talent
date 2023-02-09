
/*

Empname: バイトル
Empcode: baitoru
COmpany Type: jobboard

Template boo 3.1 
Pagina por intervalos de 150 páginas 

*/

// Spider - config -----------------------------------------//

{
options: {
inactivateJQuery: false,
ignoreLoadErrors: false,
waitForPageLoadEvent: true,
waitForResources: false
},
noimage: true,
skipResources: false,
noUnnecessaryResources: false
}

// Before extract -----------------------------------------//

(function() {
  var out = {};
  //out.waitFor = "article.list-jobListDetail";
  out.pic = true;
  out.html = true;
  return out;
})();


// Extract -----------------------------------------// 


(function() {
    var jobs = [];
    var out = {};
    //var pager = 0;
    //var maxPager =5;
    var json;
    var seguir = true;


   if (typeof pass_it == "undefined") pass_it = {};
   if (!pass_it["pager"]) {
        out["pass_it"] = {
         "pager": 1,       //-----------------------------> Modificar dependiendo del intervalo
         "salir" : false,
         "lastPager":150   //-----------------------------> Modificar dependiendo del intervalo
       };
   } else {
        out["pass_it"] = pass_it;
   }


    //out["pass_it"].idPager = document.querySelector('button.btnon-primary').getAttribute('id').trim();
  	
   // do {
      
      if (out["pass_it"].pager==1){
    	var jobSiteUrl1 = "https://www.baitoru.com/tokai/jlist/shizuoka"
        //out["pass_it"].lastPager= parseInt(document.querySelector('ol.ol01 > li.last').textContent.trim(),10);
        msg("Ultima Pagina"+out["pass_it"].lastpager)
      }
  
      if (out["pass_it"].pager!==1){
     	var jobSiteUrl1 = "https://www.baitoru.com/tokai/jlist/shizuoka/page"+ out["pass_it"].pager+"/"
      }

        var data = "_pjax=%23async_content2&name=page";
        $.ajax({
            url : jobSiteUrl1, 
            headers: {
                "accept": "text/html, */*; q=0.01",
                "accept-language": "es-419,es;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-pjax": "true",
                "x-pjax-container": "#async_content2",
                "x-requested-with": "XMLHttpRequest"
            },
            type : 'POST',
            data: data,
            //data : JSON.stringify(data),
            dataType: "html",
            async : false,
            success : function(result){
              msg("\x1b[45m loading jobs...");
              //msg(result)
            //msg('CONTENIDO DEVUELTOOOOOOOOOOOOO:    '+result[1].data);
              var html_jobs = document.createElement('div');
              maxPager = result.max_num_pages;
              html_jobs.innerHTML = result
              var stop = html_jobs.querySelectorAll('div#async_content2 > article[class^="list-jobListDetail"]');
              msg('CANTIDAD DE JOOOOOOOOOOBS:  '+stop.length);
              if (stop.length >0){out["pass_it"].salir = false;}else{out["pass_it"].salir = true}
              json =  html_jobs.querySelectorAll('div#async_content2 > article[class^="list-jobListDetail"]');
              for (var x = 0; x < json.length; x++) {
                var job = {};
                var elem = json[x]
                if(elem.querySelector("div.pt04b > ul:nth-child(2), div.pt03 > dl:nth-child(1)")){
                      var auxTitle = elem.querySelector("div.pt04b > ul:nth-child(2), div.pt03 > dl:nth-child(1)").textContent.trim()
                      if(auxTitle.search(/職種/gi) > -1)
                        job.title = auxTitle.split(/職種/i).pop().split(']').pop().trim();
                    }
                    if(!job.title){
                      job.title = elem.querySelector("h3 a").textContent.trim();
                    }
                    job.url = elem.querySelector("h3 a").href.trim();    
                    job.location = elem.querySelector("div.pt04b ul:nth-child(1) li:nth-child(1),  div.pt02b ul.ul02 li:nth-child(1)").textContent.split(']').pop().split('⁄').shift().trim();       
                    job.source_empname = elem.querySelector("div.pt02b p").textContent.split('ー No033').shift().trim();
                    ////// Extraer salario ///////     
                    for(const a of elem.querySelectorAll('div.pt03 dl')){
                      if(a.textContent.indexOf('給与') > -1){
                        if(a.textContent.search(/[0-9]/g) > -1){
                          job.source_salary = a.textContent.split(/給与/i).pop().split(']').pop().trim();;
                        }
                      }
                    }
                    if(!job.source_salary){
                      var val_salary = elem.querySelector('div#async_content2 > article div.pt04b ul:nth-child(3), div.pt03 dl:not([class="js-dehp-target"]):nth-child(2)').textContent.trim();
                      if(val_salary.search(/[0-9]/g) > -1){
                        job.source_salary = val_salary.split(']').pop().trim();
                      }
                    }
                job.temp = "Ago-20201";
   
                jobs.push(job);

              }
               msg("<<Pagina: >> "+ out["pass_it"].pager)
               //pager = pager + 1;
            },
            error: function (error) {
              msg(error);
           }
          });
         
      // } while (jobs.length > 0);                                 // CONDICION DE PARADA
        out["jobs"] = jobs;
        return out;
      })();

// PAG -------------------------------------------------------------------------------------------------------//

(function () {
  var out = {};
   
    out["pass_it"] = pass_it;
     out["pass_it"].pager += 1;
	msg("PAGINACION>>>>"+out["pass_it"].pager)

  
if (out["pass_it"].pager == out["pass_it"].lastPager)
    out["has_next_page"] = false;
else
    out["has_next_page"] = true;

  //out.waitFor = 'job-card';
  out.wait = true
  return out;
})();




// Infinite - Pagination ---------------------------------------------------------------------------------------//

(function() {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;

  var regex = /\d+/;
  var expected_jobs_str = document.querySelector("#js-job-count").textContent.replace(',','').trim();
  var expected_jobs = regex.exec(expected_jobs_str)[0];

  if(!pass_it["cont"]){
    out["pass_it"] = {"cont": 1,
                      "jobs_acum":0,
                      "ex_jobs":expected_jobs,
                      "last_page":0};
  }else out["pass_it"] = pass_it;

  out["pass_it"]["last_page"] = document.querySelector("#async_content2 > div.common-globalPager > div > div > ol > li.last > a").textContent.trim();

  return out;
})();



// Jobdata ---------------------------------------------------------------------------------------//

(function() {
    var out = {};
    var job = {};
    var selector = 'div.layout-column-1-inner';
    //var selector1 = '';
    //var iframeDocument = document.querySelector('#').contentWindow.document;//Obtener el html del iframe apartir del selector.
    var remove_selectors = ['div.pt01','h2', 'div.detail-basicInfo div.pt01b', 'div.detail-companyEnvironment', 'div.detail-companyChar', 'div.detail-jobMovie'];
      //var job = pass_it["job"];
       
 ////// Valida si el selector existe, si no, lo innactiva /////////
if(document.querySelector(selector)){
 
    var full_html = document.querySelector(selector);
   // var full_html1 = document.querySelector(selector1);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log; 
 
        for(const a of full_html.querySelectorAll('input, javascript, script, style, a, button, div.detail-entryLink')){
        a.remove();//remueve selectores de style, js e inputs
    }
      

        ////// REMOVER CORREOS ////////
        /*for (const a of full_html.querySelectorAll("font, p, dl")) {
            if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){//search, match, includes, indexOf can be used
                a.remove(); //removes the selector that contains the email
            }
          }*/
  
  //////////// REMOVER PAGINAS WEB///////////////////////////////

       for (const a of full_html.querySelectorAll("font, p, dl")) {
            if (a.textContent.search(/http:/gi)>-1){//search, match, includes, indexOf can be used
                a.remove(); //removes the selector that contains the email
            }
          }
  
       
         ////// Extraer jobtype y removerlo///////     
        for(const a of full_html.querySelectorAll('dl')){
            const text = a.textContent.trim();
            if(text.search(/職種|給与/i) > -1){
              a.remove();//remueve el selector si coincide con la palabra clave.
            }
        }

      ////// Extraer jobtype y removerlo///////     
      /*for(const a of full_html.querySelectorAll('dl')){
        const text = a.textContent.trim();
        if(text.indexOf('勤務開始日') > -1){
          let auxDate =text.split(/勤務開始日/i).pop().split('～').shift().trim();
          if(auxDate.search(/[0-9]|\/|-/g) > -1){
            job.dateposted_raw = auxDate;
            a.remove();//remueve el selector si coincide con la palabra clave.
          }

        }
      }*/
  
    //job.location = elem.querySelector("td.sorting_1").textContent.trim();
  
    /*for (const a of document.querySelectorAll('#contents > div.layout-grid-2-2 > div.layout-column-1 > div > div.detail-entryInfo > div > div.pt02 > div > dl.dl03.js-detailAccordion > dd > dl.js-da-target')) {
        if (a.textContent.includes('住所')){ //can use search or match methods
          job.location = a.textContent.trim().split("住所").pop() +' 日本'; //another querySelector if needed
          //a.remove(); //if you want to remove this selector
        } 
      }*/

       
    job.html        = full_html.innerHTML.trim();
    job.jobdesc     = full_html.textContent.trim();
  
    job.html        = cleanHTML(job.html);
    
    if(job.html.length < 100){job.flag_active = 0; msg("Job filtred");}
	if(job.html.indexOf("この求人は、掲載終了または募集を締め切りました")>-1){job.flag_active = 0; msg("Job filtred");}
    if(job.html.search(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
    job.source_apply_email = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    }
    //job.html = removeTextBefore(job.html, '', false);
    job.html = removeTextAfter(job.html, '応募情報', true);
    job.html = removeTextAfter(job.html, '会社情報', true);
    job.html = removeTextAfter(job.html, '応募後の流れについて', true);
    job.html = removeTextAfter(job.html, '登録場所', true);
     job.html = removeTextAfter(job.html, '所在地', true);

 
   var tmp          = document.createElement('DIV');
   tmp.innerHTML    = job.html;
   job.jobdesc      = tmp.textContent.trim();
   job.jobdesc      = cleanHTML(job.jobdesc);
 
/////// Valida si la descripcion no es valida e innactiva el job ////////
   if(job.jobdesc.length < 200){
        job.flag_active = 0;
        out["job"] = job;
        return out; 
    }
  
    out["job"] = job;
    return out;
 
}else{
 
    job.flag_active = 0;
    job.jobdesc = job.html; 
    out["job"] = job;
    return out; 
 
     }  
})();
 
 function removeTextBefore(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
          newHtml = "<h3>" + text + "</h3>" + newHtml;
        }       
      }
      return newHtml;
    }
 
    function removeTextAfter(html, text, flag) {
      var newHtml = html;
      if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
          newHtml = newHtml + "<p>" + text + "</p>";
        }       
      }
      return newHtml;
    }



/*(function() {
  var out = {};
  var job = {};
  var selector = "div.detail-recruitInfo";
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
}*/