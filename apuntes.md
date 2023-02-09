# Apuntes sobre HTTP REQUEST AND ETAG. EXTRACCION FROM CACHE MEMORI

## casos intervenidos

https://talent.com/private/tools/jobs/pageNewScanidView.php?scanid=198050

https://talent.com/private/tools/jobs/pageNewScanidView.php?scanid=118744

https://www.talent.com/private/tools/jobs/pageNewScanidView.php?scanid=161102 ======> aqui esta el que era : DONE

https://www.talent.com/private/tools/content/scraper/spiderCodeTool.php?scanid=258318 ====> caso mister prioridad alta : DONE

#### casos miguel

https://www.talent.com/private/tools/content/scraper/spiderCodeTool.php?scanid=261816

https://www.talent.com/private/tools/jobs/pageNewScanidView.php?scanid=261860

## casos encontrados los cuales pueden tener una mejora en su rendimeinto

https://talent.com/private/tools/jobs/pageNewScanidView.php?scanid=214876

https://talent.com/private/tools/jobs/pageNewScanidView.php?scanid=26789

## Recursos para estudiar

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
https://www.holisticseo.digital/pagespeed/etag/
https://www.youtube.com/watch?v=aN8wMQVaNvs
https://www.youtube.com/watch?v=TgZnpp5wJWU
https://codeontime.com/print/blog/2022/05/etag-and-http-caching

here important
https://www.holisticseo.digital/pagespeed/etag/

## oportunidades de mejora

Caching Headers

## basic concepts about cache.

Pronounced "browser cash." A temporary storage area in memory or on disk that holds the most recently downloaded Web pages. As you jump from Web page to Web page, caching those pages in memory lets you quickly go back to a page without having to download it from the Web again.

### Hits and misses

The first possible outcome is when the cache finds a matching resource, and is allowed to serve it, which, in the caching world, are indeed two distinct things. This outcome is what we commonly call a cache hit, and is the reason why we use caches in the first place.

When a cache hit happens, it completely offloads the origin server and the latency is dramatically reduced. In fact, when the cache hit happens in the browser’s HTTP cache latency is null and the requested resource is instantly available.

## eTAg

The ETag (or entity tag) HTTP response header is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content was not changed. Additionally, etags help to prevent simultaneous updates of a resource from overwriting each other ("mid-air collisions").

If the resource at a given URL changes, a new Etag value must be generated. A comparison of them can determine whether two representations of a resource are the same.
