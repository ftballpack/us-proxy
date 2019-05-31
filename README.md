#public-proxy
This is a scraper that runs on [Morph](https://morph.io/gbballpack/public-proxy). To get started see the [API](https://morph.io/documentation/api?scraper=gbballpack%2Fpublic-proxy)

##Proxy lists used
* http://us-proxy.org/
* http://sslproxies.org/
* http://google-proxy.net/
* http://free-proxy-list.net/
* http://free-proxy-list.net/uk-proxy.html
* http://free-proxy-list.net/anonymous-proxy.html
  Among a continously changing list of proxy sources

##Database format

| ip          | port    | type   | code    | country         | anonymity   | google        | https         | lastchecked                  |
|-------------|---------|--------|---------|-----------------|-------------|---------------|---------------|------------------------------|
| text        | integer | text   | text    | text            | text        | text          | text          | text                         |
| "123.5.1.4" | 8080    | "free" | "[us]"    | "United States" | "anonymous" | "yes" or "no" | "yes" or "no" | "[2016-03-29T17:34:54.814Z]"   |

##Types of proxy servers
* "free"
* "ssl"
* "us"
* "uk"
* "google"
* "anonymous"
* "github"

##Types of proxy anonymity
* Level 1 - Elite Proxy / Highly Anonymous Proxy: The web server can't detect whether you are using a proxy.
* Level 2 - Anonymous Proxy: The web server can know you are using a proxy, but it can't know your real IP.
* Level 3 - Transparent Proxy: The web server can know you are using a proxy and it can also know your real IP.

[us]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Decoding_table
[2016-03-29T17:34:54.814Z]:https://en.wikipedia.org/wiki/ISO_8601
