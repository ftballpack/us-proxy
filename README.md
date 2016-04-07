#us-proxy
This is a scraper that runs on [Morph](https://morph.io/CookieMichal/us-proxy). To get started see the [API](https://morph.io/documentation/api?scraper=CookieMichal%2Fus-proxy)

##Proxy lists used
* https://www.us-proxy.org/
* http://free-proxy-list.net/
* http://www.sslproxies.org/
* http://us-proxy.org/
* http://free-proxy-list.net/uk-proxy.html
* http://www.google-proxy.net/
* http://free-proxy-list.net/anonymous-proxy.html

##Database format
```SQL
ip TEXT, port INT, type TEXT, code TEXT, country TEXT, anonymity TEXT, google TEXT, https TEXT, lastchecked TEXT
```
| ip | port | type | code | country | anonymity | google | https | lastchecked |
|---|---|---|---|---|---|---|---|---|
| text | integer | text | text | text | text | text | text | text |
| "123.5.1.4" | 8080 | "free" | "[us](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Decoding_table)" | "United States" | "anonymous" | "yes" or "no" | "yes" or "no" | "[2016-03-29T17:34:54.814Z](https://en.wikipedia.org/wiki/ISO_8601)"

##Types of proxy servers
* "free"
* "ssl"
* "us"
* "uk"
* "google"
* "anonymous"

##Types of proxy anonymity
* Level 1 - Elite Proxy / Highly Anonymous Proxy: The web server can't detect whether you are using a proxy.
* Level 2 - Anonymous Proxy: The web server can know you are using a proxy, but it can't know your real IP.
* Level 3 - Transparent Proxy: The web server can know you are using a proxy and it can also know your real IP.
