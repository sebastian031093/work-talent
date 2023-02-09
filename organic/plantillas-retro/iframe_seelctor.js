var next_page_selector = 'tr#regmenu_tr26 button[class="medbutton  reg_button pcrbuttonw "]'; //selector to identify the next button
  //var last_page_selector = ""; //selector to identify the last page
  var iframe_selector = 'iframe[id="pcrframe"]';
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document
  var clickable_elem = iframeDocument.querySelector(next_page_selector);

  var selector = 'table#reg5_table20 tr#reg5_tr_d9 > td#reg5_td_dx9';
  var iframeDocument = document.querySelector('iframe#pcrframe').contentWindow.document; //Obtener el html del iframe apartir del selector.
  var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
  //var job = pass_it["job"];

  var full_html = iframeDocument.querySelector(selector); //HTML que obtiene la variable iframeDocument