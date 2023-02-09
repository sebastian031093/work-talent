if (job.location.search('/') > -1) {
    var array = job.location.split('/');
    var countReqId = 0;
    for (let auxLoc of array) {
        var jobx = {};
        jobx = { ...job }
        //jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
        jobx.location = auxLoc.trim() + '';
        jobs.push(jobx);
        //countReqId += 1;
    }
} else {
    job.location = job.location + '';
    jobs.push(job);
}
//consecutivo al reqid