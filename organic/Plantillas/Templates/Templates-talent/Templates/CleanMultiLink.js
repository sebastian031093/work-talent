(function () {
    var out = {};
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
  
    if (!pass_it["urls"]) {
      out["pass_it"] = {
        // Esta variable se usa en el pagination (Cuando los jobs sean > 0 se debe seguir paginando, en caso contrario se debe ir al siguiente link)
        "jobs": 0,
        // Arreglo de URLs
        "array_urls": [],
        "currentUrl": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var link = document.querySelectorAll('selector_con_las_etiquetas_a');
    for(var i = 0; i<link.length;i++){
      var element = link[i];
  
      var url = element.href;    
      out["pass_it"].array_urls.push(url);
    }
    
    var finalUrls = [... new Set(out["pass_it"].array_urls)]; // creamos un nuevo array sin los duplicados
    
    out["pass_it"].array_urls = finalUrls; // Asignamos el nuevo array 
    
    window.location.href = out["pass_it"].array_urls[0];
  
    out["wait"] = true;
    return out;
  })();
  
  