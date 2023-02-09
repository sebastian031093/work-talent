/**
 * If the job is not in the list, return true.
 * @param jobs - an array of objects
 * @param newJob - the new job to be added to the jobs array
 * @param [hasEmpname=false] - boolean, if true, then the job is considered a duplicate if it has the
 * same title, location, and source_empname.
 * @returns A boolean value.
 */
function canPush(jobs, newJob, hasEmpname = false) {
  if (hasEmpname) {
    return !jobs.some(
      j =>
        j.title.trim() == newJob.title.trim() &&
        j.location.trim() == newJob.location.trim() &&
        j.source_empname.trim() == newJob.source_empname.trim()
    );
  }
  return !jobs.some(
    j =>
      j.title.trim() == newJob.title.trim() &&
      j.location.trim() == newJob.location.trim()
  );
}

//// para proteger el camino ninja
jobs.forEach((jobxxx, index) => {
  data.titles.forEach(title => {
    if (title == jobxxx.title && data.clientag == jobxxx.client_tag) {
      jobs[index].client_tag = data.newCleintag;
    }
  });
});

let data = {
  expansionBy_: [
    {
      reqid: ['72487', '72486'],
    },
  ],
};

let newJobs = [];

jobs.forEach((jobxxx, index, array) => {
  //   msg(jobxxx)
  data.expansionBy_.forEach(obj => {
    let { reqids } = obj;
    reqids.forEach(reqid => {
      // msg(reqid == jobxxx.reqid);
      if (reqid == jobxxx.reqid) {
        let jobx = { ...jobxxx };
        jobx.title = `${jobxxx.title} CDI`;
        newJobs.push(jobx);
      }

      if (reqid == jobxxx.reqid) {
        let joby = {
          ...jobxxx,
        };
        joby.title = `${jobxxx.title} Contrat à durée indéterminée`;
        newJobs.push(joby);
      }
    });
  });
});

newJobs.forEach((jobSexy, index) => {
  jobs.push(jobSexy);
});
