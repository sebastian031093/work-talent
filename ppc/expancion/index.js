//agregar en la IIFE
// let newExp = expansions(job);
// newExp.forEach(newJob => jobs.push(newJob));

//Funcion de expanciones

function expansions(job) {
  let newJobs = [];
  let data = {
    expansionByReqid: [
      {
        reqid: ['521371968', '465378880'],
        titles: [
          'Sales Executive One',
          'Sales Executive Two',
          'Sales Executive Three',
        ],
        newLocs: [
          'Munich',
          'Barcelona',
          'Santa Marta',
          'Cartagena',
          'Medellin, CO',
          'Cali, CO',
          'Bogota, CO',
          'Barranquilla, CO',
          'New York',
          'Los Angeles',
          'Miami',
          'Madrid',
          'Barcelona',
          'Londres',
        ],
      },
      {
        reqid: ['507409152'],
        titles: [
          'Business Analyst One',
          'Business Analyst Two',
          'Business Analyst Three',
        ],
        newLocs: [
          'Munich',
          'Barcelona',
          'Santa Marta',
          'Cartagena',
          'Medellin, CO',
          'Cali, CO',
          'Bogota, CO',
          'Barranquilla, CO',
          'New York',
          'Los Angeles',
          'Miami',
          'Madrid',
          'Barcelona',
          'Londres',
        ],
      },
    ],
    expansionAll: ['Munich', 'Barcelona', 'Santa Marta', 'Cartagena'],
  };
  data.expansionByReqid.map(obj => {
    const { reqid, titles, newLocs } = obj;
    reqid.forEach(req => {
      if (req == job.reqid) {
        titles.forEach(title => {
          newLocs.forEach(loc => {
            newJobs.push({
              ...job,
              title: title,
              location: loc,
              // source_location: loc,
            });
          });
        });
      }
    });
  });
  data.expansionAll.forEach(loc => {
    newJobs.push({ ...job, location: loc, source_location: loc });
  });
  return newJobs;
}

//Como reducir la fucion expancion and hacer un traker a los pedidos de expoancion que se pidan.

//array client tag

const mySet2 = new Set(arryCleintTag);
let arrClientTag = [...mySet2];
console.log(arrClientTag);

///Job fantasma
html_jobs.length < 0 && jobs.push({ title: Math.random() });
