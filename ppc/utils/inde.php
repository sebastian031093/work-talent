<?

if (!function_exists('cleanData')) {
    function cleanData($str){
        return trim(preg_replace("/(!\[CDATA\[)|(]])/ui","",$str));
    }
}