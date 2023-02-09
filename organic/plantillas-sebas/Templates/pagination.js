//paginacion por simple
(function () {
	var out = {};
	var next_page_selector = 'li[class="pagination__item pagination__item--next"] > a'; //selector to identify the next button
	var last_page_selector = 'li[class="pagination__item pagination__item--next"][style="display: none;"]'; //selector to identify the last page

	var clickable_elem = document.querySelector(next_page_selector);

	//stop condition
	if (document.querySelector(last_page_selector)) {
		//last page
		out["has_next_page"] = false;
	} else if (clickable_elem) {
		//go to next page
		clickable_elem.click();
		out["has_next_page"] = true;
	} else {
		//try again
		out["has_next_page"] = true;
	}

	//out.waitFor = 'div[class="vacancy-items__details"]';
	out["wait"] = true;
	return out;
})();

//Paginacion Numerica
(function () {
	var out = {};
	var selector = 'li[class="pagination"] a';  // selector donde esta la paginacion

	if (typeof pass_it == "undefined") pass_it = {};

	if (!pass_it["cont"]) {
		out["pass_it"] = {
			"cont": 1
		};
	} else {
		out["pass_it"] = pass_it;
	}

	out["has_next_page"] = false;
	out["pass_it"].cont += 1;

	var all_elems = document.querySelectorAll(selector);
	[].forEach.call(all_elems, function (elemento) {
		if (elemento.textContent.trim() == out["pass_it"].cont) {
			//msg("click!!!!!"+elemento.textContent.trim());
			elemento.click();
			out["has_next_page"] = true;
		}
	});

	out["wait"] = true;
	return out;
})();

//Paginacion URL
(function () {
	var out = {};
	var selector = 'li[class="pagination__item"] > a';  // selector donde esta la paginacion
	var url_base = 'https://careers.aegon.com/en/vacancies/?page=';

	if (typeof pass_it == "undefined") pass_it = {};

	if (!pass_it["cont"]) {
		out["pass_it"] = {
			"cont": 1
		};
	} else {
		out["pass_it"] = pass_it;
	}

	out["has_next_page"] = false;
	out["pass_it"].cont += 1;

	var all_elems = document.querySelectorAll(selector);
	[].forEach.call(all_elems, function (elemento) {
		if (elemento.textContent.trim() == out["pass_it"].cont) {
			var url = url_base + out["pass_it"]["cont"];
			window.location.href = url
			out["has_next_page"] = true;
		}
	});

	out["wait"] = true;
	return out;
})();