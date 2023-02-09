/****************************ejemplo 1************************************/

(function() {

    //declarando un objecto anonima
  	var out = {};

    // elemento a (etiqueta) que contiene el atributo style contenga la palabra display none 
    // not: es un metodo que devuelve elementos que no coincide con ciertos criterios.  
    var selector = "a#more-jobs:not([style*='display: none;'])"; 

    // el texto que contiene el selector
    var partial_text = "";  

    // se le asigna valor false para indicar que no existe paginas.
  	out["has_next_page"] = false;


    //ciclo de la paginación
      //Metodo donde obtendremos el todos los elemento del documento 
    var all_elems = document.querySelectorAll(selector); 

    //[]es una matriz vacia no se utliza, solo para dar acceso a prototipos .forEach
    //call se utiliza para ejecutar la función en la lista de nodo de la matriz
    //se utiliza el forEachejecutar el recorrido de elemento asignado

    [].forEach.call(all_elems, function(elemento){
        if(out["has_next_page"]) return out;

        // indexOf: es un metodo devuelve la posicion de la primera aparicion de un valor, buscar ese texto en ese elemento. el devuelve -1 si el valor a buscar nunca ocurre.
        //textContent: es una propieda donde se establece o devuelve el contenido del texto del nodoespecificado

        if(elemento.textContent.trim().indexOf(partial_text) != -1){

        //El evento .click que se produce cuando se hace click en un elemento
            elemento.click();

            out["has_next_page"] = true;
        }
    });		
	

    //tiempo de espera
  	out["wait"] = true;
  	return out;
})();

/****************************ejemplo 2************************************/

(function() {
var out = {};
var boton = "a.more-link.button"; //selector to identify the next button
// var last_page_selector = ""; //selector to identify the last page
var clickable_elem = document.querySelector("a.more-link.button").getAttribute('style')!="display: none;"?true:false;
msg(clickable_elem);
//stop condition
/* if (!document.querySelector(last_page_selector)) {
//last page
out["has_next_page"] = false;
} else */
if(clickable_elem){
//go to next page
document.querySelector(boton).click();
msg("HACIENDO CLICK");
out["has_next_page"] = true;
} else {
//try again
out["has_next_page"] = false;
}

 out.waitFor = "";
out["wait"] = true;
return out;
})();

/****************************ejemplo 3************************************/

(function() {
var out = {};
var next_page_selector = 'a.load_more_jobs'; //selector boton more
var clickable_elem = document.querySelector(next_page_selector);
var perpage_actual = document.querySelector("a.load_more_jobs").getAttribute("style");

 if(perpage_actual == "display: none;"){
//msg('\x1b[41m Fin de la paginacion more \x1b[0m');
out["has_next_page"] = false;
}else{
clickable_elem.click();
out["has_next_page"] = true;
}

 out["wait"] = true;
out.waitFor = 'a.load_more_jobs';
return out;
})();