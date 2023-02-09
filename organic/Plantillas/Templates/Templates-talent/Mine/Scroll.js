  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CASOS COMPLICADOS!!!!
(function(){
    var out = {};
    var event = new Event('scroll');  
    //msg(pass_it);
    if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
    else 					out["pass_it"] = pass_it;
    
    out["has_next_page"] = true;
  
    /*****///validación para detener el scroll ya si a la tercera vez no coincide nueva longitud
    if(out["pass_it"]["heights"].length > 3){
       var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
        if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
          out["has_next_page"] = false;
    }
    
  window.scrollBy(0, document.body.scrollHeight); ////// scrollBy es un metodo que desplaza un número especifico de pixeles
  window.dispatchEvent(event);
  /********************/ // horizontal en cero y vertical la altura del html
    
    out["wait"] = true;
    out["pic"] 	= true;
    //out["html"] 	= true;
    out["pass_it"]["heights"].push(document.body.scrollHeight); ///añadiendo la altura del html obtenida al arreglo de pass_it
    return out;
  })();



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //SIMPLE
  (function(){
  	var out = {};

  	msg(pass_it);
  	if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  	else 					out["pass_it"] = pass_it;
  	
  	out["has_next_page"] = true;
  	if(out["pass_it"]["heights"].length > 3){
     	var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      	if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
          out["has_next_page"] = false;
    }
  	//var body = document.querySelector("#vacancies");
	window.scrollBy(0, document.body.scrollHeight);
  	
  	out["wait"] = true;
  	out["pic"] 	= true;
  	out["html"] = true;
  	out["pass_it"]["heights"].push(document.body.scrollHeight);
  	return out;
})();


//CASOS IMPORSIBLES
(function(){
  var out = {};
  var event = new Event('scroll');  
  //msg(pass_it);
  if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  else 					out["pass_it"] = pass_it;
  
  out["has_next_page"] = true;

  /*****///validación para detener el scroll ya si a la tercera vez no coincide nueva longitud
  if(out["pass_it"]["heights"].length > 3){
     var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
  }
  
window.scrollBy(0, document.body.scrollHeight); ////// scrollBy es un metodo que desplaza un número especifico de pixeles
window.dispatchEvent(event);
/********************/ // horizontal en cero y vertical la altura del html
  
  out["wait"] = true;
  out["pic"] 	= true;
  //out["html"] 	= true;
  out["pass_it"]["heights"].push(document.body.scrollHeight); ///añadiendo la altura del html obtenida al arreglo de pass_it
  return out;
})();

























(function(){
  var out = {};
  var event = new Event('scroll');  
  //msg(pass_it);
  if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  else 					out["pass_it"] = pass_it;
  
  out["has_next_page"] = true;

  /*****///validación para detener el scroll ya si a la tercera vez no coincide nueva longitud
  if(out["pass_it"]["heights"].length > 3){
     var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
  }
  
document.querySelector('body').scrollBy(0, document.querySelector('div.ipost.mb-4.mb-lg-4.scrollbar-vt.scrollbar').scrollHeight); ////// scrollBy es un metodo que desplaza un número especifico de pixeles
document.querySelector('body').dispatchEvent(event);
/********************/ // horizontal en cero y vertical la altura del html
  
  out["wait"] = true;
  out["pic"] 	= true;
  //out["html"] 	= true;
  out["pass_it"]["heights"].push(document.querySelector('div.ipost.mb-4.mb-lg-4.scrollbar-vt.scrollbar').scrollHeight); ///añadiendo la altura del html obtenida al arreglo de pass_it
  return out;
})();
