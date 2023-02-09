//Paginación por URL (mister combo)
(function () {
  var out = {};

  if (!pass_it['offset']) {
    out['pass_it'] = {
      offset: 0,
    };
  } else {
    out['pass_it'] = pass_it;
  }

  var url_base =
    'https://healthtrustjobs.com/jobs/ajax/joblisting/?num_items=500&offset=';

  if (typeof pass_it == 'undefined') pass_it = {};
  if (typeof msg == 'undefined')
    msg = function (x) {
      return x;
    };

  //msg(out["pass_it"].offset += 500)

  var perpage_fijo = '500';
  var perpage_actual = document.querySelectorAll('.direct_joblisting').length;

  msg('perpage_fijo: ' + perpage_fijo);
  msg('perpage_actual: ' + perpage_actual);

  if (perpage_actual >= perpage_fijo) {
    out['pass_it'].offset += 500;
    var nuevaUrl = url_base + out['pass_it'].offset;
    //msg("\x1b[45m URL siguiente:\x1b[45m" + nuevaUrl);
    window.location.href = nuevaUrl;
    out['has_next_page'] = true;
  } else {
    //msg('\x1b[41m NO HAY MAS PAGINA ');
    out['has_next_page'] = false;
  }

  //out["wait"]=true;
  out.waitFor = '.direct_joblisting';
  return out;
})();

//ram(combo)
//li.active + li > a; paginacion numerica.

(function () {
  var out = {};
  if (typeof pass_it == 'undefined') pass_it = {};
  if (!pass_it['urls']) {
    out['pass_it'] = {
      urls: [
        //PRIMERA PAGINA "https://www.uni-giessen.de/karriere/stellenangebote/ausschreibungen/professuren/",
        'https://trabalheconosco.vagas.com.br/leforte/oportunidades?pagina=2&q=',
      ],
      //"https://www.uni-giessen.de/karriere/stellenangebote/ausschreibungen/ausbildung-studium/"]                //Colocar las urls
    };
  } else {
    out['pass_it'] = pass_it;
  }

  if (out['pass_it']['urls'].length > 0) {
    var url = out['pass_it'].urls.shift();
    msg('\x1b[42m NUEVA URL --> ' + url + '\x1b[0m');
    window.location.href = url;
    out['has_next_page'] = true;
  } else {
    out['has_next_page'] = false;
  }
  //    out.waitFor = '';  // COLOCAR EL SELECTOR A ESPERAR
  return out;
})();
//---------paginacion por url numero----------
(function () {
  var out = {};
  if (typeof pass_it == 'undefined') pass_it = {};
  if (!pass_it['cont']) {
    out['pass_it'] = {
      cont: 2,
    };
  } else {
    out['pass_it'] = pass_it;
  }
  var next_page_selector = "a[aria-label='Go to next page']"; //selector to identify the next button
  //var last_page_selector = "li.next > "; //selector to identify the last page
  var clickable_elem = document.querySelector(next_page_selector);
  //stop condition
  if (!clickable_elem) {
    //last page
    out['has_next_page'] = false;
  } else {
    //go to next page
    window.location.href = `https://www.groupe-sos.org/recrutement/offres-emploi/?pagenum=${out['pass_it'].cont}`;
    out['has_next_page'] = true;
    out['pass_it'].cont++;
  }
  out.waitFor = 'div.text-left.container > div.box_single_result';
  return out;
})();
