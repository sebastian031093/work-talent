for (const a of document.querySelectorAll('p')) {
   if (a.textContent.search('@') > -1) {
      a.remove();
   }
}

//numbers match
a.textContent.match(/[1-9]/)