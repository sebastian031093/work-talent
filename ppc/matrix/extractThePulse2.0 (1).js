const configs = {
  errors: {
    table: 'overrall',
    body: type =>
      `status%5B%5D=9&status%5B%5D=5&status%5B%5D=61&crawl_group%5B%5D=22&crawl_group%5B%5D=32&crawl_group%5B%5D=41&last_crawl_status=error&${type}=1`,
  },
  lastWarning: {
    table: 'qa',
    body: type =>
      `status%5B%5D=9&crawl_group%5B%5D=22&crawl_group%5B%5D=32&crawl_group%5B%5D=41&last_crawl_warning%5B%5D=other&${type}=1`,
  },
  matrix: {
    table: 'ppc',
    colors: {
      red: 'exp_vs_total_jobs%5B%5D=actual_less_80',
      orange:
        'exp_vs_total_jobs%5B%5D=actual_greater_80&exp_vs_total_jobs%5B%5D=actual_less_90',
      gray: 'exp_vs_total_jobs%5B%5D=expected_undefined',
      black: 'exp_vs_total_jobs%5B%5D=actual_undefined',
    },
    body: (type, color) =>
      `status%5B%5D=9&crawl_group%5B%5D=22&crawl_group%5B%5D=32&crawl_group%5B%5D=41&${configs.matrix.colors[color]}&${type}=1`,
  },
  date: new Date().toLocaleDateString('en-US'),
  dataType: {
    is_ppc: 'PPC',
    vip: 'VIP',
  },
  capitalize: string => string?.charAt(0).toUpperCase() + string?.slice(1),
  defineType: function (value) {
    const type = {
      100: 'PPC',
      110: 'Quickapply',
      '010': 'Quickapply',
      101: 'Integration',
      '001': 'Integration',
      111: 'Quickapply/Integration',
      '011': 'Quickapply/Integration',
    };
    value = value.replaceAll(/YES/gi, '1').replaceAll(/NO|Undefined/gi, '0');
    return type[value] ? type[value] : 'NO PPC';
  },
};

async function request(operation, type, hasColor) {
  try {
    const req = await fetch(
      `https://talent.com/private/tools/content/thePulse/ajax/getScanidsResults.php?tab=${operation.table}`,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: operation.body(type, hasColor),
        method: 'POST',
      }
    );
    return await req.json();
  } catch (error) {
    throw error;
  }
}

async function getData(whatIs, type, hasColor = null, limitByColor = null) {
  const json = await request(configs[whatIs], type, hasColor);

  const strategy = {
    errors: `Boo-e ${configs.dataType[type]}`,
    lastWarning: `Last Warning ${configs.dataType[type]}`,
    matrix: `Matrix ${configs.capitalize(hasColor)} ${configs.dataType[type]}`,
  };

  const result = [];
  for (const index in json.data) {
    const element = json.data[index];
    if (limitByColor == index) {
      break;
    }

    result.push({
      date: configs.date,
      whatIs: element.status !== 'active' ? 'Stuck' : strategy[whatIs],
      scanid: element.scanid,
      empcode: element.feedcode,
      indexer: '',
      type: configs.defineType(
        `${element.ppc}${element.quickapply}${element.integration}`
      ),
      feedType: element.feedType,
      worked: '',
      reported: '',
      toReport: '',
      comment: '',
      NewRow: '',
      qaOwner: element.qAOwner,
      hasWarning: element.lastCrawlWarning || '',
    });
  }
  return result;
}

async function printData(defineExtract) {
  const data = [];
  const { vip, is_ppc, whatExtract, assignBy } = defineExtract;

  for (const key in whatExtract) {
    const current = whatExtract[key];

    if (typeof current === 'object') {
      for (const color in current) {
        if (current[color] && color !== 'limitByColor') {
          vip &&
            data.push(await getData(key, 'vip', color, current.limitByColor));
          is_ppc &&
            data.push(
              await getData(key, 'is_ppc', color, current.limitByColor)
            );
        }
      }
    } else if (typeof current === 'boolean' && current) {
      vip && data.push(await getData(key, 'vip'));
      is_ppc && data.push(await getData(key, 'is_ppc'));
    }
  }

  const allData = noRepeats(data);

  let result;
  if (assignBy.extract) {
    result = [
      ...assignData(allData.filter(e => e.whatIs.match(/Boo-e/i))),
      ...assignData(allData.filter(e => e.whatIs.match(/Last Warning/i))),
      ...assignData(allData.filter(e => e.whatIs.match(/Matrix/i))),
    ];
  } else {
    result = assignData(allData);
  }
  console.table(result);
}

function noRepeats(data) {
  data = data.flat();
  console.log('With repeats', data.length);
  const result = [];
  data.forEach(element => {
    const toReview = result.findIndex(elem => elem.scanid == element.scanid);
    if (toReview > -1) {
      data[toReview].whatIs += ` - ${element.whatIs}`;
    } else {
      result.push(element);
    }
  });
  return result;
}

function assignData(data) {
  const { indexers } = defineExtract;
  const team = [];
  for (const i in indexers) {
    indexers[i] === 1 && team.push(i);
  }

  let cant = Math.round(data.length / team.length);
  if (team.length * cant > data.length) cant = cant - 1;
  let acum = cant;
  let x = 0;
  team.forEach(e => {
    if (data[x]) {
      for (x; x < acum; x++) {
        data[x].indexer = e;
      }
    }
    acum = acum + cant;
  });

  data.forEach((elem, index) => {
    if (elem.indexer.length < 1) {
      const rand = Math.floor(Math.random() * team.length);
      const indexer_random = team[rand];
      data[index].indexer = indexer_random;
    }
  });
  return data;
}

const defineExtract = {
  whatExtract: {
    errors: true,
    lastWarning: true,
    matrix: {
      red: true,
      orange: false,
      gray: false,
      black: false,
      limitByColor: 10,
    },
  },
  is_ppc: true,
  vip: true,
  assignBy: {
    extract: true,
  },
  indexers: {
    'Alejandra Morales': 0,
    'Alex Calle': 0,
    'Andres Valencia': 0,
    'Brahayan Cossio': 1,
    'Christian Diaz': 0,
    'Duver Betancur': 0,
    'Juan Bedoya': 0,
    'Junior Londoño': 0,
    'Miguel Garcia Henao': 0,
    'Samuel Posada': 0,
    'Sebastian Manco': 1,
    'Victoria Reyes': 0,
  },
};
printData(defineExtract);
