//ORGANIZAR FECHA

//CORTO: 
let aux_date = elem.querySelector("div.posting-date").textContent.trim();
job.dateposted_raw = new Date(aux_date).toLocaleDateString();

//LARGO
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g,"").replace(/\./g,"").trim();
     
   let day   =  dateRaw.split(cut)[dayPosition].trim(), 
       month =  dateRaw.split(cut)[monthPosition].trim(), 
       year  = dateRaw.split(cut)[yearPosition].trim();

       day = day.replace(/rd|st|th/,"").trim();    

    if(day < 10 && day.length < 2){day = "0" + day;} 

   if(dateRaw.search(/[a-z]/gi)>-1){ 
       if(month.search(/jan|ene|oca/i)>-1){month = "01";}
       if(month.search(/feb|fév|şub/i)>-1){month = "02";}
       if(month.search(/mar|maar/i)>-1){month = "03";}
       if(month.search(/apr|avr|abr|nis/i)>-1){month = "04";}
       if(month.search(/may|mai|mei/i)>-1){month = "05";}
       if(month.search(/jun|juin|haz/i)>-1){month = "06";}
       if(month.search(/jul|juil|tem/i)>-1){month = "07";}
       if(month.search(/aug|août|ago|ağu/i)>-1){month = "08";}
       if(month.search(/sep|eyl/i)>-1){month = "09";}
       if(month.search(/oct|okt|eki/i)>-1){month = "10";}
       if(month.search(/nov|kas/i)>-1){month = "11";}
       if(month.search(/dec|déc|dic|ara/i)>-1){month = "12";}
     }
var datum = month +"/"+  day +"/"+ year;
return datum;
}




//BORRAR JOBS CON MAS DE 6 MESES Y DETERNER PAGINACIÓN
job_Expired = jobExpired(job.dateposted_raw);

if(job_Expired < 180){
  jobs.push(job);
}
else{
  msg("Consegui 1er job con mas de "+job_Expired+" dias");
  out["pass_it"].seguir = false; //VARIABLE PARA DETENER PAGINACIÓN
}


function jobExpired(fechaJob){
  let fActual = new Date().getTime();  //tiempo en milisegundos desde 01-01-170
  let fJob = fechaJob.length > 0?new Date(fechaJob).getTime():new Date().getTime(); //tiempo jobs, en formati MM/DD/YYYY, si fechaJob es "" devuelve la fecha actual
  let tiempo = (((((fActual - fJob)/1000)/60)/60)/24) 
  return tiempo
}




//FUNCIÓN MD5!!
job.jobid = MD5(job.title+job.location+job.source_empname+job.temp);



//PONER ESPACIOS ANTES DE TODA MAYUSCULA
job.location = loc.replace(/([a-z])([A-Z])/g, '$1 $2');




//FECHA SIN AÑO ENTERO 
job.dateposted_raw = elem.querySelector("div.rightTop").textContent.trim();
let date = new Date();
job.dateposted_raw = job.dateposted_raw.split('/')[1]+'/'+job.dateposted_raw.split('/')[0]+'/'+date.getFullYear();




//FECHA SIN AÑO, Toma sólo mes y día y evalúa si es de este año o del anterior
var dayDate = elem.querySelector("div.latest_post_day").textContent.trim();
        var monthDate = elem.querySelector("div.latest_post_month").textContent.trim();     
      
      	job.dateposted_raw = monthDate + "/" + dayDate;
      	let date = new Date(job.dateposted_raw);
        //job.dateposted_raw = `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}`;
      	dayDate = withCero(date.getDate());
      	monthDate = `${withCero(date.getMonth()+1)}`;
                             
      	var now = new Date();
        var month = now.getMonth() + 1;
		    var day = now.getDate();
      
      	if (parseInt(monthDate, 10) > parseInt(month, 10)) {
          var year = now.getFullYear() - 1;
        }
      
      	else if (parseInt(monthDate, 10) == parseInt(month, 10)) {
          if (parseInt(dayDate, 10) > parseInt(day, 10)) {
            var year = now.getFullYear() - 1;
          }
          else {
            var year = now.getFullYear();
          }
        }
        else {
          var year = now.getFullYear();
        }
        job.dateposted_raw = monthDate + "/" + dayDate + "/" + year;

function withCero(n) {
  return n < 10 ? '0' + n : n;
}



//JOB FANTASMA - Se coloca justo antes de: out["jobs"] = jobs;
var job_fantasma = {url: window.location.ref};
jobs.push(job_fantasma);


//BORRAR TODOS LOS JOBS CON JOB FANTASMA
(function() {
  var out = {};
  var jobs = []
  var job_fantasma = {};
  job_fantasma.url = window.location.href;
  jobs.push(job_fantasma);
  out["jobs"]= jobs;
  return out;
})();




//   EXTRAER LOC DEL TITLE
newLocation = locationsNL(job.title);
function locationsNL(loc){
  var newLocation ="";
  let city_NL = ["Amsterdam","Rotterdam", "Rotterdam", "La Haya", "Den Haag", "Utrecht", "Delft", "Maastricht", "Hengelo","Haarlem", "Eindhoven", "Leiden", "Alkmaar", "Groninga", "Volendam", "Marken", "Dordrecht",
  "Breda", "Hoorn", "Zwolle", "Arnhem", "Den Bosch", "Zaanse Schans", "Bolduque", "Gouda", "Amersfoort", "Edam-Volendam",
  "Kinderdijk", "Leeuwarden", "Almere", "Veenendaal", "Deventer", "Zandvoort", "Naarden", "Enkhuizen", "Lelystad", "Lisse",
  "Amstelveen", "Middelburg", "Bloemendaal", "Kampen", "Venlo", "Apeldoorn", "Nimega", "Giethoorn", "Edam",
  "Roermond", "Den Helder", "Tilburg", "Urk", "Zaanstad", "Hilversum", "Texel", "Aalsmeer", "Purmerend", "Nimega",
  "Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Zeeland","Zuid-Holland",
  "Oud Beijerland","Hoeksche Waard", "Zuid Holland", "‘s Gravendeel","Barendrecht","Warnsveld","Zutphen","Haaglanden"]  
  
  city_NL.forEach(function(e){      
  if(loc.indexOf(e)>-1){newLocation = e}
  });
    return newLocation;
  }


  //LOC EN JSON
   //Location array "city, state"

   var city  = elem.querySelector("selectorDeLaCiudad").textContent;
   var state = elem.querySelector("selectorDelPaís").textContent;
   
   var loc = "";
   var array_loc = Array();

   if(city) array_loc.push(city);
   if(state) array_loc.push(state);
   
   if(array_loc.length) loc = array_loc.join(", ");

 newLocation = loc;


 //LOC UK
function locationsUK(loc){
  var newLocation = "";
  if(loc.indexOf("London")>-1){newLocation = "London, GB";}
  if(loc.indexOf("Edinburgh")>-1){newLocation = "Edinburgh, Scotland, GB";}
  if(loc.indexOf("Liverpool")>-1){newLocation = "Liverpool, England, GB";}
  if(loc.indexOf("Bristol")>-1){newLocation = "Bristol, England, GB";}
  if(loc.indexOf("Birmingham")>-1){newLocation = "Birmingham, England, GB";}
  if(loc.indexOf("Glasgow")>-1){newLocation = "Glasgow, Scotland, GB";}
  if(loc.indexOf("Manchester")>-1){newLocation = "Manchester, England, GB";}
  if(loc.indexOf("York")>-1){newLocation = "York, England, GB";}
  if(loc.indexOf("Newcastle upon Tyne")>-1){newLocation = "Newcastle upon Tyne, England, GB";}
  if(loc.indexOf("Oxford")>-1){newLocation = "Oxford, England, GB";}
  if(loc.indexOf("Cardiff")>-1){newLocation = "Cardiff, Wales, GB";}
  if(loc.indexOf("Leeds")>-1){newLocation = "Leeds, England, GB";}
  if(loc.indexOf("Bath")>-1){newLocation = "Bath, England, GB";}
  if(loc.indexOf("Brighton")>-1){newLocation = "Brighton, England, GB";}
  if(loc.indexOf("Sheffield")>-1){newLocation = "Sheffield, England, GB";}
  if(loc.indexOf("Kingston upon Hull")>-1){newLocation = "Kingston upon Hull, England, GB";}
  if(loc.indexOf("Cambridge")>-1){newLocation = "Cambridge, England, GB";}
  if(loc.indexOf("Norwich")>-1){newLocation = "Norwich, England, GB";}
  if(loc.indexOf("Portsmouth")>-1){newLocation = "Portsmouth, England, GB";}
  if(loc.indexOf("Aberdeen")>-1){newLocation = "Aberdeen, Scotland, GB";}
  if(loc.indexOf("Leicester")>-1){newLocation = "Leicester, GB";}
  if(loc.indexOf("Nottingham")>-1){newLocation = "Nottingham, England, GB";}
  if(loc.indexOf("Plymouth")>-1){newLocation = "Plymouth, England, GB";}
  if(loc.indexOf("Coventry")>-1){newLocation = "Coventry, England, GB";}
  if(loc.indexOf("Chester")>-1){newLocation = "Chester, England, GB";}
  if(loc.indexOf("Durham")>-1){newLocation = "Durham, England, GB";}
  if(loc.indexOf("Exeter")>-1){newLocation = "Exeter, England, GB";}
  if(loc.indexOf("Southampton")>-1){newLocation = "Southampton, England, GB";}
  if(loc.indexOf("Peterborough")>-1){newLocation = "Peterborough, England, GB";}
  if(loc.indexOf("Stoke-on-Trent")>-1){newLocation = "Stoke-on-Trent, England, GB";}
  if(loc.indexOf("Lincoln")>-1){newLocation = "Lincoln, England, GB";}
  if(loc.indexOf("Salisbury")>-1){newLocation = "Salisbury, England, GB";}
  if(loc.indexOf("Bradford")>-1){newLocation = "Bradford, England, GB";}
  if(loc.indexOf("Sunderland")>-1){newLocation = "Sunderland, England, GB";}
  if(loc.indexOf("Dundee")>-1){newLocation = "Dundee, Scotland, GB";}
  if(loc.indexOf("Reading")>-1){newLocation = "Reading, England, GB";}
  if(loc.indexOf("Preston")>-1){newLocation = "Preston, England, GB";}
  if(loc.indexOf("Wolverhampton")>-1){newLocation = "Wolverhampton, England, GB";}
  if(loc.indexOf("Greater Manchester")>-1){newLocation = "Greater Manchester, England, GB";}
  if(loc.indexOf("Swansea")>-1){newLocation = "Swansea, Swansea, GB";}
  if(loc.indexOf("Derby")>-1){newLocation = "Derby, England, GB";}
  if(loc.indexOf("Canterbury")>-1){newLocation = "Canterbury, England, GB";}
  if(loc.indexOf("Luton")>-1){newLocation = "Luton, England, GB";}
  if(loc.indexOf("Bournemouth")>-1){newLocation = "Bournemouth, England, GB";}
  if(loc.indexOf("Blackpool")>-1){newLocation = "Blackpool, England, GB";}
  if(loc.indexOf("Gloucester")>-1){newLocation = "Gloucester, England, GB";}
  if(loc.indexOf("City of Westminster")>-1){newLocation = "City of Westminster, England, GB";}
  if(loc.indexOf("Winchester")>-1){newLocation = "Winchester, England, GB";}
  if(loc.indexOf("Carlisle")>-1){newLocation = "Carlisle, England, GB";}
  if(loc.indexOf("Milton Keynes")>-1){newLocation = "Milton Keynes, England, GB";}
  if(loc.indexOf("Bedford")>-1){newLocation = "Bedford, GB";}
  if(loc.indexOf("Colchester")>-1){newLocation = "Colchester, GB";}
  if(loc.indexOf("Ipswich")>-1){newLocation = "Ipswich, England, GB";}
  if(loc.indexOf("Norwich ")>-1){newLocation = "Norwich, GB";}
  if(loc.indexOf("Peterborough")>-1){newLocation = "Peterborough, England, GB";}
  if(loc.indexOf("Dunfermline")>-1){newLocation = "Dunfermline, Scotland, GB";}
  if(loc.indexOf("Basildon")>-1){newLocation = "Basildon, England, GB";}
  if(loc.indexOf("Hampshire")>-1){newLocation = "Hampshire, GB";}
  if(loc.indexOf("Essex")>-1){newLocation = "Essex, GB";}
  if(loc.indexOf("Wellington")>-1){newLocation = "Wellington, England, GB";}
  if(loc.indexOf("Milton")>-1){newLocation = "Milton, Cambridgeshire, United Kingdom";}
  if(loc.indexOf("Wantage")>-1){newLocation = "Wantage, England, GB";}
  if(loc.indexOf("Norfolk")>-1){newLocation = "Norfolk, England, GB";}
  if(loc.indexOf("Peebles")>-1){newLocation = "Peebles, Scotland, GB";}
  if(loc.indexOf("Evesham")>-1){newLocation = "Evesham, England, GB";}
  if(loc.indexOf("Bridgewater")>-1){newLocation = "Bridgewater, England, GB";}
  if(loc.indexOf("Rochester")>-1){newLocation = "Rochester, England, GB";}
  if(loc.indexOf("Burgess Hill")>-1){newLocation = "Burgess Hill, England, GB";}
  if(loc.indexOf("Tilbury Dock")>-1){newLocation = "Tilbury Dock, GB";}
  if(loc.indexOf("Guildford")>-1){newLocation = "Guildford, GB";}
  if(loc.indexOf("Thurrock")>-1){newLocation = "Thurrock, Essex, GB";}
  if(loc.indexOf("Warrington")>-1){newLocation = "Warrington, GB";}
  if(loc.indexOf("Bletchley")>-1){newLocation = "Bletchley, Milton Keynes, GB";}
  if(loc.indexOf("Kettering")>-1){newLocation = "Kettering, Northamptonshire, GB";}
  if(loc.indexOf("Macclesfield")>-1){newLocation = "Macclesfield, Cheshire, GB";}
  if(loc.indexOf("Northampton")>-1){newLocation = "Northampton, Northamptonshire, GB";}
  if(loc.indexOf("Sandwell")>-1){newLocation = "Sandwell, West Midlands, GB";}
  if(loc.indexOf("Sidcup")>-1){newLocation = "Sidcup, London, GB";}
  if(loc.indexOf("Shaftesbury")>-1){newLocation = "Shaftesbury, Dorset, GB";}
  if(loc.indexOf("Swindon")>-1){newLocation = "Swindon, GB";}
  if(loc.indexOf("Portland")>-1){newLocation = "Portland, GB";}
  
  return newLocation;
}