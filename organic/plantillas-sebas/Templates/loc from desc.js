//FUNCION GET DESCRIPT
var desc = getDescription(job.url);
var full_html = document.createElement("div");
full_html.innerHTML = desc;
full_html = full_html.querySelector('');

if (full_html) {

    for (const a of full_html.querySelectorAll('p, span, li')) {
        if (a.textContent.search(/@|http|www./ig) > -1) {
            a.remove();
        }
    }

    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

    if (remove_selectors.length > 0) {
        remove_selectors.forEach(remove_selector => {
            for (const a of full_html.querySelectorAll(remove_selector)) {
                a.remove();
            }
        });
    }

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    //job.html = removeTextBefore(job.html, '', false);
    //job.html = removeTextAfter(job.html, '', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    if (job.jobdesc.length < 50) {
        job.html = " ";
        job.jobdesc = " ";
    }
} else {
    job.html = " ";
    job.jobdesc = " ";
}
/////////////////////////////////////////
function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    var response = "";
    xhrrequest.onreadystatechange = function () {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            //console.log(xhrrequest.responseText);
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}
function removeTextBefore(html, text, flag) {
	var newHtml = html;
	if (newHtml.search(text) > -1) {
		newHtml = newHtml.split(text).pop();
		if (!flag) {
			newHtml = "<h3>" + text + "</h3>" + newHtml;
		}
	}
	return newHtml;
}
function removeTextAfter(html, text, flag) {
	var newHtml = html;
	if (newHtml.search(text) > -1) {
		newHtml = newHtml.split(text).shift();
		if (!flag) {
			newHtml = newHtml + "<p>" + text + "</p>";
		}
	}
	return newHtml;
}