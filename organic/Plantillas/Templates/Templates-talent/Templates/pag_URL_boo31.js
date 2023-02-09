

(function () {
    var out  = {};
    out.wait = 1000;
  
    var url_base           = "";
    var main_loop_selector = "";


    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 2,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  

  var perpage_fijo = 10;
  var perpage_actual = document.querySelectorAll(main_loop_selector).length;
    

    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
 if(perpage_actual < perpage_fijo){
    msg('\x1b[41m The pagination has finished \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
  //out.waitFor = "";
   //out["wait"] = true;
    return out;
})();


///////////////////////////////////////////////////

/*
Si no se detiene la paginación por URL, la condición de parada es un selector que aparece en la última página

*/

(function () {
    var out = {};
    out.wait=2000;
  
    var url_base = "https://stcareers.talent-soft.com/job/list-of-jobs.aspx?page=";
    

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 2,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  

  var perpage_fijo = 10;
  var perpage_actual = document.querySelectorAll(".ts-related-offers.LayerContainer.ListeOffre .ts-offer-card.Layer").length;
    

    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
  
  var last_page_selector = 'span#ctl00_ctl00_corpsRoot_corps_PaginationLower_Pager_ctl73_pagelbl'; //Selector de la última página
  
    if (document.querySelector(last_page_selector)) {
        out["has_next_page"] = false;
    } else {
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
    }
  
  
  /*if(perpage_actual < perpage_fijo){
    msg('\x1b[41m Fin de la paginacion more \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  */
  
  //out.waitFor = "";
   out["wait"] = true;
    return out;
})();

// Validando el n´´umero de jobs



(function () {
    var out  = {};
    out.wait = 500;
  
    var url_base  = "https://careers.lyondellbasell.com/search/?q=&sortColumn=referencedate&sortDirection=desc&searchby=location&d=10&startrow=";



    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 20,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  
var current_number_of_jobs = document.querySelector(".pagination-label-row span.paginationLabel").textContent.trim().split(" of ").shift().split("–").pop().trim();
var total_number_of_jobs   = document.querySelector(".pagination-label-row span.paginationLabel").textContent.trim().split(" of ").pop().trim();   

    

    msg("current_number_of_jobs: \x1b[0m"+current_number_of_jobs);
    msg("Total_number_of_jobs: \x1b[0m"+total_number_of_jobs);
  
 if(current_number_of_jobs ==  total_number_of_jobs){
    msg('\x1b[41m The pagination has finished \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m " +"Paginando" +"\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont+=20;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
   out.waitFor = ".pagination-label-row span.paginationLabel";
   out["wait"] = true;
    return out;
})();