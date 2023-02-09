//EXTRAER ALGO DENTRO DEL TEXTO
job.source_salary = contains(document.querySelectorAll("strong"), '$').textContent;
job.source_salary  = job.source_salary.toLowerCase().split('up to:').pop();
function contains(elementos, texto) {
  var resultado = [].slice.call(elementos).filter(element => RegExp(texto).test(element.textContent));
  return resultado[0]; // quitar el [0] si quieres todos los resultados
}

for (const a of full_html.querySelectorAll('li')) {
  if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
    job.experienced_required = a.textContent;
  } 
}

//Extraer el selector dentro del elemento que tenga el texto: 
job.location = contains("div.form-group.no-marg","Location:",elem).replace("Location:","").trim();

function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
  return resultado;
} 
//PASANDO TODO EN MINUSCULA PARA QUE NO IMPORTE MAYUS Y MINUS EN EL TEXTO
job.dateclosed_raw = contains("span.jobdescription p","Closing Date",div).toLowerCase().split("closing date:").pop().split(/\n/).shift().split(",").pop().trim();

function contains(selector,texto,elements){
  let resultado ='';  
  elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto.toLowerCase()).test(elemento.innerText.toLowerCase())){resultado = elemento.textContent}})
  return resultado;
}


//Extrarer salary
if (job.jobdesc.search("£") > -1) {
  job.source_salary = "£" + job.jobdesc.split("£")[1].split(" ").shift() + " hour";
}

//Extraer con llamado AJAX
var full_html = getDescription(job.url); 
var div       = document.createElement("div");
div.innerHTML = full_html 
var desc = div.querySelector("ul.p-0.job_detail-list.job_detail-list"); 

job.location = desc.textContent; 

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}



//SACAR IFRAME COMPLEJO
html = eval(out["pass_it"]["id"]).Ctrl_container.querySelector('iframe').contentWindow.document;



//EXTRAER SELECTOR
function getSpecificElem(container, regex, itemSelector) {
  let generalSel = container.querySelectorAll(itemSelector);
  if(container && generalSel) {
    return Array.from(generalSel).filter(item => item.textContent.search(regex) > -1);
  }
 return false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EXTRAER DESCRIPCIÓN ADICINAL CUANDO TENGA
var full_html = elem.querySelector("div.job-vacancy-description");
     	var moreInfo = elem.querySelector("div.job-vacancy-listing"); 
        // remove something from the jobdatata
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
        if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
        if (typeof msg == "undefined") msg = console.log;
      
        for (const a of full_html.querySelectorAll('p')) {
          if (a.querySelector('a')){ //| a.textContent.search('What will happen with your details?')>-1 | a.textContent.search('To apply for this role')>-1 | a.textContent.search('Apply now!')>-1 | a.textContent.search('Click here')>-1
          	a.remove(); 
          } 
          if (a.textContent.search('What will happen with your details?')>-1 | a.textContent.search('To apply for this role')>-1 | a.textContent.search('Apply now!')>-1 | a.textContent.search('Click here')>-1){ //| 
            a.remove(); 
          } 
        }

      var text;
      	      
      	if (moreInfo) {
          for (const a of moreInfo.querySelectorAll('p')) {
            if (a.querySelector('a')){
              a.remove(); 
            } 
          }
        	text = full_html.innerHTML.trim() + moreInfo.innerHTML.trim();
        }
      	else {text = full_html.innerHTML.trim();} 
      
      	job.html = text;
        //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
        //job.html = removeTextAfter(job.html, 'What will happen with your details?', true);
      	//job.html = removeTextAfter(job.html, 'To apply for this role', true);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
      
       	job.temp = "OCT-2020";
      jobs.push(job);
      
////////////////////////////////////////////////////////////////////////////////////////////////////////
















































(function () {
  /*<-- Jhan --->*/

  var jobs = [];
  var out  = {};
  var json; 
  var msg  = console.log;



  var feed = document.querySelectorAll('div.imageGallery > div a');
  feed.forEach((url, indx) =>{

    var cont = 1;        


    //   do {

    //var feeds = {"partnerId":"25968","siteId":elem,"keyword":"","location":"","keywordCustomSolrFields":"Location,FORMTEXT4,FORMTEXT11","locationCustomSolrFields":"FORMTEXT2,FORMTEXT3","linkId":"","Latitude":0,"Longitude":0,"facetfilterfields":{"Facet":[]},"powersearchoptions":{"PowerSearchOption":[]},"SortType":"LastUpdated","pageNumber":cont,"encryptedSessionValue":"^kVaprf2QVLnfZiPLTVg8YlCSnTZNYg/vhizUjbpwlUn7eS4po/CRWtpKWd_slp_rhc_O_slp_rhc_/wcvw0FW99nAmCH5V9zYni//ue3KrUh/gn6FKp56RhoL/s="};


    $.ajax({
      url: url,                                            
      headers: {                                                      
        "Accept": "text/html, */*; q=0.01",
        "Content-Type":"text/x-json; charset=utf-8"  
      },
      type: 'GET',                                        
      dataType: "html",                                   
      //data: JSON.stringify(feeds),
      async: false,
      success: function (result) {
        msg("SUCCES");
        json  = result;  
        msg(json);
        //msg(json.length);
        var maincontent = document.createElement('DIV');
        maincontent.innerHTML = json;

        //console.log(maincontent.length);
        msg("ENTRO A EL SUCCES");

        var html_jobs = maincontent.querySelectorAll('.wsite-section-elements .wsite-multicol');
        token = html_jobs.length;
        for(var x in html_jobs){
          if(typeof html_jobs[x] =="function") continue;
          if(typeof html_jobs[x] =="number") continue;
          var job = {};
          var elem = html_jobs[x];
          msg("ENTRO A EL IF");

          job.title = elem.querySelector('h2').textContent.trim();
          //job.title = formatTitles(job.title.trim());
          //job.title = job.title.replace(/Offre D'emploi Et Job De|Offre D'emploi Et Job D'|Offre D'emploi Et Job|Offre D'emploi De|Offre D'emploi|offre D'emploi Et Job De|Offre D’emploi Et/g, '').trim();


          //job.url = elem.querySelector('a.wsite-button').href.trim();
          /*
            if($('div.paragraph li:contains(Lieu:)', elem)[0]){
              job.location = $('div.paragraph li:contains(Lieu:)', elem)[0].innerText.replace(/Lieu:|Lieu :/, '').trim();
            }else if($('div.paragraph li:contains(Lieu :)', elem)[0]){
              job.location = $('div.paragraph li:contains(Lieu :)', elem)[0].innerText.replace(/Lieu:|Lieu :/, '').trim();
            }else{
              job.location = $('div.paragraph li:nth-of-type(2)', elem)[0].innerText.split(':').pop().trim();
            }
            job.location = job.location.replace(/[0-9]/g, '').trim();
            job.location =  job.location.replace('Rolle, canton de Vaud, Suisse','Rolle (Vaud), CH')

            if($('div.paragraph li:contains(Posté le)', elem)[0]){
              job.dateposted_raw = $('div.paragraph li:contains(Posté le)', elem)[0].innerText.replace('Posté le', '').trim().split('/');
              job.dateposted_raw = job.dateposted_raw[1]+'/'+job.dateposted_raw[0]+'/'+job.dateposted_raw[2];
              if(job.dateposted_raw.search(/2017|2018|2019/)>-1){continue;}
            }

			*/
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          job.temp = "04/15/2021 - 08:25";
          job.location = '';

          var multilocation = " et ";

          if(job.location.indexOf(multilocation)>-1){
            var aux = job.location.split(multilocation);

            for(i in aux){ 
              var jobx = {};

              jobx.title          = job.title;
              jobx.url            = job.url;
              jobx.location       = aux[i];
              //jobx.dateposted_raw = job.dateposted_raw;
              //jobx.dateclosed_raw = job.dateclosed_raw; 
              //jobx.source_salary  = job.source_salary;
              //jobx.source_jobtype  = job.source_jobtype;
              jobx.temp           = job.temp;

              //if(job.title.length > 0 && job.location.length > 0){
              jobs.push(jobx);
              //}

            }
          }else if(job.location.indexOf('&')>-1){
            var aux = job.location.split('&');
            for(i in aux){ 
              var jobx = {};

              jobx.title          = job.title;
              jobx.url            = job.url;
              jobx.location       = aux[i];
              //jobx.dateposted_raw = job.dateposted_raw;
              //jobx.dateclosed_raw = job.dateclosed_raw; 
              //jobx.source_salary  = job.source_salary;
              //jobx.source_jobtype  = job.source_jobtype;
              jobx.temp           = job.temp;

              //if(job.title.length > 0 && job.location.length > 0){
              jobs.push(jobx);
              //}


            }
          }else{
            jobs.push(job);
          }
        } 
        //  cont++;
      },
      error: function (error) {
        msg(error);
      }
    });
    //  } while (json.length > 0);     
  });



  out["jobs"] = jobs;
  return out;
})();


function formatTitles(title){
  title      = title.toLowerCase();
  var word   = title.split(' ');
  var result = new Array();
  word.forEach((elm, idx) =>{
    elm = elm.trim();
    if(elm[0] && elm[0] != ""){
      let stringVal = elm;
      stringVal = stringVal.replace(/^./, stringVal[0].toUpperCase()); 
      result.push(stringVal);  
    }
  })
  result = result.join(' ');
  return result;
}
