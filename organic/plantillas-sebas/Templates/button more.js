//Button More
(function () {
	var out = {};
	var cli = 'button[id="js-more-jobs"]';  //SELECTOR DEL BOTON MORE

	if (pass_it["count"]) {
		out["pass_it"] = pass_it;
	} else {
		out["pass_it"] = {
			"count": 0
		};
	}
	msg(out.pass_it.count);

	var bool = document.querySelector(cli).getAttribute('style') != "display: none;" ? true : false;

	if (bool && out.pass_it.count < 100) {
		document.querySelector(cli).click();
		msg("HACIENDO CLICK")
		out["has_next_page"] = true;
		out.pass_it.count = out.pass_it.count + 1;
	} else {
		out["has_next_page"] = false;
	}

	out["wait"] = true;
	return out;
})();

//http://qa.neuvoo.com/service/get_fgc.php?url=
