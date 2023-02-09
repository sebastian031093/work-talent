const resp = await fetch(job.url),
  html = await resp.text(),
  div = document.createElement("div");

div.innerHTML = html;

const full_html = div.querySelector("");
