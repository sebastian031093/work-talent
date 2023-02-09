(function(){
  	var out = {};
  	
  	msg(pass_it);
  	if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};  //CREO ARREGLO 'heights' DONDE ALMACENO CANTIDAD DE ELEMENTOS (JOBS) 
                                                              //DE CADA PAGINACION DEL SCROLL
  	else 					out["pass_it"] = pass_it; //SI ARREGLO EXISTE OBTENGO SUS DATOS
  	
  	out["has_next_page"] = true;					          //PAGINACION EN VERDADERO	
  	if(out["pass_it"]["heights"].length > 3){			  //ESPERO A QUE EL ARREGLO TENGA MAS DE 3 VALORES
     	var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); //CON LA FUNCION SLICE OBTENGO LOS ULTIMOS 3 ELEMENTOS DEL ARREGLO
      	if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2]) //EVALUO SI LOS 3 ULTIMOS ELEMENTOS DEL ARREGLO
                                                                                                              // TIENEN LA MISMA CANTIDAD DE JOBS PARA SABER SI LLEGO AL FINAL DEL SCROLL
          out["has_next_page"] = false;                    //NO HAGO MAS SCROLL
    }
  
	window.scrollBy(0, document.body.scrollHeight);	//HAGO SCROLL CON LA ALTURA DEL BODY DEL MISMO JOBSITE PARA CARGAR NUEVOS JOBS
//document.querySelector("#search-result-aside").scrollBy(0,document.querySelector("#search-result-aside").scrollHeight)
  	
  	out["wait"] = true;
    out["pic"] 	= true;
  	//out["html"] 	= true;
  	out["pass_it"]["heights"].push(document.querySelectorAll("div.oracletaleocwsv2-accordion.oracletaleocwsv2-accordion-expandable.clearfix").length); //COLOCAR EL SELECTOR DE LOS JOBS. CON LA FUNCION PUSH ALMACENAR EN EL ARREGLO "heights"LA CANTIDAD DE JOBS CARGADOS DESPUES DEL SCROLL.
  	return out;
})();
