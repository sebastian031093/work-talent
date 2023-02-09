///////////////////////////
////replace caracteres
function replaceAccents(s) {
  var r = s; //.toLowerCase();
  r = r.replaceAll(/[àáâãäå]/gi, 'a');
  r = r.replaceAll(/[èéêë]/gi, 'e');
  r = r.replaceAll(/[ìíîï]/gi, 'i');
  r = r.replaceAll(/[òóôõö]/gi, 'o');
  r = r.replaceAll(/[ùúûü]/gi, 'u');
  return r;
}

//////////////////////////////////////////////////
/////replace linkeding words
if (preg_match('/www.linkedin.com|Linkedin/ui', $job['html'])) {
  $job['html'] = trim(
    preg_replace(
      "/((w+://)[-a-zA-Z0-9:@;?&=/%+.*!'(),$_{}^~[]`#|]+)|www.linkedin.com|Linkedin/ui",
      '',
      $job['html']
    )
  );
}


//////////////////////////////////////////////////////////////////////////
///////Benefits

$regexBenefit = '/Benefits/m';
if (preg_match($regexBenefit, $job['jobdesc']) === 1) {
    $job['source_benefit'] = end(preg_split($regexBenefit, $job['jobdesc']));
    $job['source_benefit'] = preg_split('/The Perks:s/m', $job['source_benefit'])[0];
     printDebug($job['reqid']." reqid -->".$job['source_benefit']);
}


/////////////////////////////////////////////////
///////fechas
$j->date = '2 months ago';
$hoy = date("m/d/Y");
$job['dateposted_raw'] = date("m/d/Y", strtotime($hoy." - ".explode('ago', $j['date'])[0]));
// 2022-09-13T00:00:00 
$job['dateposted_raw'] = date('m/d/Y', strtotime($j['dateposted']));