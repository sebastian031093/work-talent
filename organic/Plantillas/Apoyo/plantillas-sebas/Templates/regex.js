///REGEX
x.replace(/\(|-|\*|%|&|\)|\/|\./g, "");

//parentesis y contenido
x.replace(/ *\([^)]*\) */g, "");

//emoji
x.replace(/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g, '');

//@ and WWW
x.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www\.\S+|https?\S+|\(\d+\)|\S+\.com|<\/?[^>]+(>|$)/gi, "");