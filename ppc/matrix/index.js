/////////////////////////////////////////////////////////////
////////Databse
(() => {
  const result = {
    team: [],
    data: [],
  };
  const date = () => {
    let date = new Date();
    const withCero = n => (n < 10 ? `0${n}` : n);
    return `${withCero(date.getDate())}/${withCero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  };
  const defineType = value => {
    this.value = value.replaceAll(/YES/gi, '1').replaceAll(/NO/gi, '0');
    switch (this.value) {
      case '100':
        return 'PPC';
        break;
      case '110':
        return 'Quickapply';
        break;
      case '010':
        return 'Quickapply';
        break;
      case '101':
        return 'Integration';
        break;
      case '001':
        return 'Integration';
        break;
      case '111':
        return 'Quickapply/Integration';
        break;
      case '011':
        return 'Quickapply/Integration';
        break;
      default:
        break;
    }
  };
  const selector = 'table[id="table-overall"] tbody > tr'; // cambiar selector en la matriz
  [...document.querySelectorAll(selector)].forEach(element => {
    result.data.push({
      date: date(),
      whatIs:
        element.querySelector('td:nth-child(4)').textContent.trim() == 'stuck'
          ? 'Stuck'
          : 'Boo-e',
      scanid: element.querySelector('td:nth-child(3)').textContent.trim(),
      empcode: element.querySelector('td:nth-child(2)').textContent.trim(),
      indexer: '',
      type: defineType(
        `${element.querySelector('td:nth-child(8)').textContent.trim()}${element
          .querySelector('td:nth-child(9)')
          .textContent.trim()}${element
          .querySelector('td:nth-child(10)')
          .textContent.trim()}`
      ),
    });
  });
  // Repartir
  const indexers = {
    'Sebastian Manco': 1,
    'Duver Betancur': 1,
    'Christian Adolfo Diaz': 1,
    'Miguel Garcia Henao': 0,
    'Victoria Reyes': 0,
    'Juan Bedoya': 1,
    'Andres Valencia': 1,
    'Brahayan Cossio': 0,
    'Johan Castrillon': 0,
  };
  for (let i in indexers) {
    if (indexers[i] === 1) result.team.push(i);
  }
  let cant = Math.round(result.data.length / result.team.length);
  if (result.team.length * cant > result.data.length) cant = cant - 1;
  let acum = cant;
  let x = 0;
  result.team.forEach(e => {
    if (result.data[x]) {
      for (x; x < acum; x++) {
        result.data[x].indexer = e;
      }
    }
    acum = acum + cant;
  });
  //Funcion para asignar las pocisiones no asignadas a alguien al azar
  result.team.forEach(e => {
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].indexer.length < 1) {
        var rand = Math.floor(Math.random() * result.team.length);
        var indexer_random = result.team[rand];
        result.data[i].indexer = indexer_random;
      }
    }
  });
  console.log(`Cantidad de casos a trabajar por indexer prom: ${cant}`);
  console.log(
    `Cantidad de casos sin asignar: ${result.data.length % result.team.length}`
  );
  console.table(result.data);
})();

//////////////////////////////////////////////////////////////////////////
/////////cl
(function () {
  var out = {};
  var html_jobs = document.querySelectorAll('tbody tr');
  var jobs = [];
  for (var x in html_jobs) {
    var elem = html_jobs[x];
    var rojas = elem.querySelector('span.badge-error');
    var amarillas = elem.querySelector('span.badge-warning');
    var verdes = elem.querySelector('span.badge-success');
    if (rojas || amarillas || verdes) {
      var company = elem.querySelector('a').textContent.trim();
      console.log(company);
    }
  }
})();
