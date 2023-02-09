const full_html = getDescription(job.url);
let div = document.createElement('div');
div.innerHTML = full_html;

const id_json = div.querySelector('script[type="application/ld+json"]');

if (id_json) {
    // Extract text on the script
    const html = id_json.textContent.trim().replace(/\s+/g, ' ').replace(/\@/gi, '');

    // convert text to json
    const json = JSON.parse(html);

    let datePosted = json.position;
    job.dateposted_raw = datePosted[1] + '/' + datePosted[2] + '/' + datePosted[0];
}

function getDescription(url) {
    let res = '';
    let req = new XMLHttpRequest();

    req.open('GET', url, false);
    req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) res = req.responseText;
    };
    req.send();
    return res;
}
