//http://www.egc-interim.fr/
//-----------------------------------------------------------
// Infinite                                             
//-----------------------------------------------------------
(function () {
    var out = {};
    if (document.querySelector('')) {
        document.querySelector('').click();
        out.wait = 4000;
        msg("\x1b[41mClick en el infiniti"); // 1) Mensaje
    } else {
        msg("\x1b[41mNO HAGO Click en el infiniti"); // 1) Mensaje
    }
    //out.waitFor = 'div.listContainer';
    out.pic = true;
    out.html = true;
    return out;
})();

//-----------------------------------------------------------
// Before extract                                             
//-----------------------------------------------------------
(function () {

    /*DEFINIMOS LOS SELECTORES DEL JOBSITE*/
    var out = {};
    var selector_jobs = ""; // 1) Selector de cada job.     
    var selector_titulo = ""; // 2) Selector titulo del job.
    //var selector_location = ""; // 3) Selector localizacion del job.
    //var selector_desc = ""; // 4) Selector de la descripcion de los jobs.
    //var selector_dateposted_raw = ""; // 5) Selector de la fecha de posteo de los jobs.
    //var selector_dateclosed_raw  = ""; // 6) Selector de la fecha de cierre de los jobs.
    //var selector_logo = ""; // 7) Selector de logo de los jobs.
    //var selector_source_empname = ""; // 8) Selector del empname de los jobs.
    //var selector_source_jobtype = ""; // 9) Selector del tipo de trabajo de los jobs.
    //var selector_source_salary = "";  // 10) Selector de la descripcion de los jobs.





    /*CONDICION DEFINIENDO OBJETOS*/
    if (pass_it["posicion_job_objeto"]) {
        out["pass_it"] = pass_it;
    } else {
        out["pass_it"] = {
            "posicion_job_objeto": '', // 1) Ayuda a conocer la posicion del trabajo en el que te encuentras. 
            "salir_objeto": false, // 2) Respuesta para indicar al inland cuando debe detenerse.
            "selector_jobs_objeto": selector_jobs, // 3) Propiedad del objeto a la cual le asignamos el la variable selector_jobs (Selector que contiene la info del job titulo,location,fecha,etc... del trabajo)
            "selector_desc_objeto": selector_desc // 4) Propiedad del objeto a la cual le asignamos el la variable selector_desc (Descripcion de trabajos)
        };
    }





    /*VARIABLES PREVIA PARA LISTAR*/
    var trabajo = out["pass_it"]["selector_jobs_objeto"]; // 1) Almacena en la variable trabajo el selector de los jobs del out con el atributo  pass_it 
    var infoTrabajo = document.querySelectorAll(trabajo)[out["pass_it"]["posicion_job_objeto"]]; // 2) Almacena en la variable infoTrabajo toda la informacion del trabajo (como titulo,localizacion, fecha, etc)  
    // del objeto pass_it con ayuda del document.querySelectorAll para retornar la info del DOM
    // [out["pass_it"]["posicion_job_objeto"] hace referencia al trabajo en el que se esta extrayendo la info actualmente





    /*VARIABLES LISTAS PARA PASAR AL EXTRACT*/
    if (infoTrabajo) {
        out["pass_it"]["title"] = infoTrabajo.querySelector(selector_titulo).textContent.trim();
        out["pass_it"]["location"] = infoTrabajo.querySelector(selector_location).textContent.trim();
        //out["pass_it"]["dateposted_raw"] = infoTrabajo.querySelector(selector_dateposted_raw).textContent.trim();
        //out["pass_it"]["dateclosed_raw"] = infoTrabajo.querySelector(selector_dateclosed_raw).textContent.trim();
        //out["pass_it"]["logo"] = infoTrabajo.querySelector(selector_logo).getAttribute("src").trim();
        //out["pass_it"]["source_empname"] = infoTrabajo.querySelector(selector_source_empname).textContent.trim();
        //out["pass_it"]["source_jobtype"] = infoTrabajo.querySelector(selector_source_jobtype).textContent.trim();
        //out["pass_it"]["source_salary"] = infoTrabajo.querySelector(selector_source_salary).textContent.trim();
        //out["pass_it"]["reqid"] = infoTrabajo.querySelector(selector_source_salary).textContent.trim();

        infoTrabajo.querySelector(' ').click();
        // 1) Damos click a la variable infoTrabajo para acceder a la descripcion
        out.waitFor = out["pass_it"]["selector_desc_objeto"]; // 2) Esperamos que cargue la descripcion y de este punto nos vamos al STEP extract

    } else {
        msg("\x1b[41mNo hay mas trabajos"); // 1) Mensaje
        msg("\x1b[41mColoquemos el job fantasma para salir del proceso y terminar la corrida");// 2) Mensaje
        msg("\x1b[41mSALIR = TRUE");// 3) Mensaje
        out["pass_it"]["salir_objeto"] = true; // 4) Valor de salir = true indicando que ya no debe volver a iterar en los jobs, dando la señal de stop   
    }

    return out;
})();

//-----------------------------------------------------------
// Extract                                             
//-----------------------------------------------------------
(function () {

    /*DEFINIMOS LOS OBJETOS Y VARIABLE DE DESCRIPCION*/
    var out = {};
    var job = {};
    var jobs = [];
    var remove_selectors = ["a", "script", "style"];
    out["pass_it"] = pass_it;
    var full_html = document.querySelector(out["pass_it"]["selector_desc_objeto"]);




    /*CONDICION PARA VERIFICAR SI SEGUIMOS EXTRAYENDO*/
    if (out["pass_it"]["salir_objeto"]) {
        job.title = 'job fantasma';
        jobs.push(job);
    } else {

        if (document.querySelector(out["pass_it"]["selector_desc_objeto"])) {

            /*ASIGNACION DE VARIABLES PARA EXTRAER INFO*/
            job.title = out["pass_it"]["title"];
            job.location = out["pass_it"]["location"];
            //job.url = 
            //job.logo = out["pass_it"]["logo"];
            //job.source_empname = out["pass_it"]["source_empname"];
            //job.source_jobtype = out["pass_it"]["source_jobtype"];
            //job.source_salary = out["pass_it"]["source_salary"];
            //job.dateposted_raw = out["pass_it"]["dateposted_raw"];
            //job.dateclosed_raw = out["pass_it"]["dateclosed_raw"];
            //job.reqid = out["pass_it"]["reqid"];





            /*CONDICION PARA REMOVER SELECTORES*/
            if (remove_selectors.length > 0) {
                remove_selectors.forEach(remove_selector => {
                    let salir
                    do {
                        salir = false;
                        if (full_html.querySelector(remove_selector)) {
                            full_html.querySelector(remove_selector).remove();
                            salir = true;
                        }
                    } while (salir);
                });
            }






            /*VARIABLE  DESCRIPCION*/
            job.html = full_html.innerHTML.trim().replace(/<[^>]*>?/g, ''); // 1) Devuelve el HTML de la descripcion sin etiquetas HTML
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            if (job.jobdesc.length < 50) {
                job.flag_active = 0;
                job.html = " ";
                job.jobdesc = " ";
            }
            job.temp = 1;
            jobs.push(job);


        } else {
            msg("\x1b[41mSelector de la descripcion no esta bien definido");
        }
    }

    out["jobs"] = jobs;
    return out;


})();

//-----------------------------------------------------------
// Pagination                                             
//-----------------------------------------------------------
(function () {

    var out = {};
    out["pass_it"] = pass_it;
    out["pass_it"].posicion_job_objeto += 1; // 1) Acumulamos de uno en uno



    window.history.back(); //2) Volvemos al jobsite donde aparecen las vacantes



    if (out["pass_it"]["salir_objeto"]) { // Tiene mas jobs NO
        msg("\x1b[42mNo tenemos mas trabajos para extraer en el jobsite");
        out["has_next_page"] = false;

    } else { // Tiene mas jobs SI
        msg("\x1b[42mSI tenemos aun trabajos para extraer en el jobsite");
        msg("\x1b[46mVamos al Before extract de nuevo");
        out["has_next_page"] = true;
    }

    out.waitFor = out["pass_it"]["selector_jobs_objeto"];// 5) Esperamos a que cargue la lista de jobs

    return out;

})();
