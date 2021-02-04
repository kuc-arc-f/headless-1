
# API Write sample

***
### create

create , content

* curl sample

```
curl  -X POST http://localhost:3001/api/post/create/test_1 -d "title=t203a" -d "content=c203a" -H "apikey:6017b16942e8e9010d663a66"
```
URL : /api/post/create/content_name

* content_name

Site > ContentType > content name

* apikey

Site > open > apikey

***
### delete

delete , content

* curl sample

```
curl  -X POST http://localhost:3001/api/post/delete/test_1 -d "id=601b42c70a2845528036132b" -H "apikey:1Nopktm1ZS34d1GDivZ47ocs"

```
URL : /api/post/delete/content_name

* content_name

Site > ContentType > content name

* id

content.id

* apikey

Site > open > apikey


***
### update

update , content

* curl sample

```
curl  -X POST http://localhost:3001/api/post/update/test_1 -d "id=601b7573c38b34435646fc6b" -d "title=t204c" -d "content=c204c" -H "apikey:1Nopktm1ZS34d1GDivZ47ocs"
```
URL : /api/post/create/content_name

* content_name

Site > ContentType > content name

* id

content.id

* apikey

Site > open > apikey

