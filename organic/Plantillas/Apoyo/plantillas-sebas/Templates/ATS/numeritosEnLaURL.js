//Infinity
(function () {
    var out = {};
    document.querySelector("#rs-cv-btn-vagasdisponiveis").click();
    out.waitFor = 'table[id="an-table-anuncios"] tbody > tr';
    out.pic = true;
    return out;
})();

//Extract
(function () {
    var out = {};
    var html_jobs = document.querySelectorAll('table[id="an-table-anuncios"] tbody > tr[class*="odd"], table[id="an-table-anuncios"] tbody > tr[class*="even"]');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.reqid = elem.querySelector('td:nth-child(1)').textContent.trim();
        job.title = elem.querySelector('td:nth-child(2)').textContent.trim();
        job.url = 'https://trabalheconosco.primafoods.com.br:8181/novocurriculoweb/';
        job.location = elem.querySelector('td:nth-child(3)').textContent.split('Unidade de').pop().split('Unidade').pop().replace(/\/| - | -/, ', ').trim();
        job.dateposted_raw = elem.querySelector('input[id="an-campoparametro-datini-3"]').getAttribute('value').trim();
        job.dateposted_raw = job.dateposted_raw.split('/')[1] + '/' + job.dateposted_raw.split('/')[0] + '/' + job.dateposted_raw.split('/')[2];

        var url = 'https://trabalheconosco.primafoods.com.br:8181/novocurriculoweb/conector?SIS=RS&ACAO=ANUNCIOS&RANDOM=0.28436055685182793&CODVAG=' + job.reqid + '&PUBALV=2&CODPER=1&DATINI=' + elem.querySelector('input[id="an-campoparametro-datini-3"]').getAttribute('value').trim() + '&STATUS=DETALHAR';
        var tmp = getDescription(url);
        var full_html = document.createElement('div');
        full_html.innerHTML = tmp;
        if (full_html) {

            var remove_selectors = ['div[id="an-div-superior"]', 'a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

            if (remove_selectors.length > 0) {
                remove_selectors.forEach(remove_selector => {
                    for (const a of full_html.querySelectorAll(remove_selector)) {
                        a.remove();
                    }
                });
            }

            for (const a of full_html.querySelectorAll('p, span')) {
                if (a.textContent.search(/@|http|www./ig) > -1) {
                    a.remove();
                }
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




        job.temp = 96;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("POST", url, false); //URL del ajax que trae la información del job
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

//Pagination
(function () {
    var out = {};
    var clickable_elem = document.querySelector('a[class="fg-button ui-button ui-state-default ui-corner-right"]');

    //stop condition
    if (!clickable_elem) {
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

    out.wait = true;
    return out;
})();