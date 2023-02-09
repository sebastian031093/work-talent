//Longitud de la descripcion
if (job.jobdesc.length < 50) {
    job.flag_active = 0;
    job.html = " ";
    job.jobdesc = " ";
}

//Existe descripcion?
if (full_html) {
    //Codigo de la descripcion
} else {
    job.flag_active = 0;
    job.html = " ";
    job.jobdesc = " ";
}