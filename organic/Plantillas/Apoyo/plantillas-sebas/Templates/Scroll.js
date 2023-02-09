//Page Length
(function () {

    var out = {};

    var selectorscroll = 'Selector Barra desplazamiento para hacer Scrooll';


    msg(pass_it);

    if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };

    else out["pass_it"] = pass_it;


    out["has_next_page"] = true;

    if (out["pass_it"]["heights"].length > 3) {

        var last_three_heights = out["pass_it"]["heights"].slice(- 3);

        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2]) {

            out["has_next_page"] = false;
        }
    }


    //window.scrollBy(0, document.body.scrollHeight);

    document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight);


    out["wait"] = true;

    out["pic"] = true;

    out["html"] = true;

    out["pass_it"]["heights"].push(document.querySelector(selectorscroll).scrollHeight);

    return out;

})();

//Jobs Length
(function () {

    var out = {};

    var selectorscroll = 'BARRA DE DESPLAZAMIENTO para hacer scroll';

    var selectorjobs = 'SELECTOR QUE CONTIENE los jobs';

    msg(pass_it);

    if (!pass_it["jobs_lengths"]) out["pass_it"] = { "jobs_lengths": [] };

    else out["pass_it"] = pass_it;


    out["has_next_page"] = true;

    if (out["pass_it"]["jobs_lengths"].length > 3) {

        var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);

        if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2]) {

            out["has_next_page"] = false;
        }
    }




    //var next_page_selector = "div.container.job-list-wrapper > div.paginator > button";​

    //var clickable_elem = document.querySelector(next_page_selector);  ​

    //if(clickable_elem)clickable_elem.click();         ​




    //window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)​

    document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight);


    out["wait"] = true;

    out["pic"] = true;

    //out["html"]   = true;​

    out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);

    return out;

})();

//Event Page Length
(function () {

    var out = {};

    var event = new Event('scroll');


    if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };

    else out["pass_it"] = pass_it;



    out["has_next_page"] = true;



    if (out["pass_it"]["heights"].length > 3) {

        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);

        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2]) {

            out["has_next_page"] = false;
        }
    }




    window.scrollBy(0, document.body.scrollHeight);

    window.dispatchEvent(event);



    out["wait"] = true;

    out["pic"] = true;

    out["html"] = true;

    out["pass_it"]["heights"].push(document.body.scrollHeight);

    return out;

})();​

//Scroll Terminator
(function () {
    var out = {};
    // Crea un div para darle altura a la pagina
    var ref = document.querySelector('div[id="search-result-aside"]'); //Selector que contiene los jobs 
    var newEle = document.createElement('div');
    ref.appendChild(newEle);
    newEle.style.height = '6000px' // para darle altura a la pagina 
    msg(pass_it);
    if(!pass_it["heights"])   out["pass_it"] = {"heights":[]};
    else                  out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if(out["pass_it"]["heights"].length > 3){
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
    }
      ref.scrollBy(0, ref.scrollHeight);
    
    out["wait"] = true;
    out["pic"] = true;
    out["html"] = true;
    out["pass_it"]["heights"].push(document.querySelectorAll('ul[class="search-result-content"] > li').length);//Selector de los JOBS
    return out;
  })();