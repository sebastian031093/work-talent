//fechas con letras
x.replace(',', '').replace(/ /g, '/').trim();
job.dateposted_raw = job.dateposted_raw.replace(/January|Jan/i, '1');
job.dateposted_raw = job.dateposted_raw.replace(/February|Feb/i, '2');
job.dateposted_raw = job.dateposted_raw.replace(/March|Mar/i, '3');
job.dateposted_raw = job.dateposted_raw.replace(/April|Apr/i, '4');
job.dateposted_raw = job.dateposted_raw.replace(/May/i, '5');
job.dateposted_raw = job.dateposted_raw.replace(/June|Jun/i, '6');
job.dateposted_raw = job.dateposted_raw.replace(/July|Jul/i, '7');
job.dateposted_raw = job.dateposted_raw.replace(/August|Aug/i, '8');
job.dateposted_raw = job.dateposted_raw.replace(/September|Sep/i, '9');
job.dateposted_raw = job.dateposted_raw.replace(/October|Oct/i, '10');
job.dateposted_raw = job.dateposted_raw.replace(/November|Nov/i, '11');
job.dateposted_raw = job.dateposted_raw.replace(/December|Dec/i, '12');
job.dateposted_raw = job.dateposted_raw.replace(/[A-Z]|[a-z]/g, '');

job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
job.dateclosed_raw = job.dateclosed_raw.split('-')[1] + '/' + job.dateclosed_raw.split('-')[2] + '/' + job.dateclosed_raw.split('-')[0];

job.dateclosed_raw = job.dateclosed_raw.replace(/January|Jan/i, '1');
job.dateclosed_raw = job.dateclosed_raw.replace(/February|Feb/i, '2');
job.dateclosed_raw = job.dateclosed_raw.replace(/March|Mar/i, '3');
job.dateclosed_raw = job.dateclosed_raw.replace(/April|Apr/i, '4');
job.dateclosed_raw = job.dateclosed_raw.replace(/May/i, '5');
job.dateclosed_raw = job.dateclosed_raw.replace(/June|Jun/i, '6');
job.dateclosed_raw = job.dateclosed_raw.replace(/July|Jul/i, '7');
job.dateclosed_raw = job.dateclosed_raw.replace(/August|Aug/i, '8');
job.dateclosed_raw = job.dateclosed_raw.replace(/September|Sep/i, '9');
job.dateclosed_raw = job.dateclosed_raw.replace(/October|Oct/i, '10');
job.dateclosed_raw = job.dateclosed_raw.replace(/November|Nov/i, '11');
job.dateclosed_raw = job.dateclosed_raw.replace(/December|Dec/i, '12');
job.dateclosed_raw = job.dateclosed_raw.replace(/[A-Z]|[a-z]/g, '');

var actualMonth = new Date();
actualMonth = actualMonth.getMonth() + 1;
var actualYear = new Date();
actualYear = actualYear.getFullYear();
if (actualMonth >= job.dateposted_raw.split('/')[0]) {
	job.dateposted_raw = job.dateposted_raw + '/' + actualYear;
} else {
	job.dateposted_raw = job.dateposted_raw + '/' + parseInt(actualYear - 1);
}

/*
January.
February.
March.
April.
May.
June.
July.
August.
September.
October.
November.
December.
*/