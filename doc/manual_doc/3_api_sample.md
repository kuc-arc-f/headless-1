
# API sample

***
### find

get, content List

* curl sample

```
curl "http://localhost:3001/api/get/find?content=books&site_id=6017b16942e8e9010d663a66"
```

* content

content name : Site > ContentType > content name

* site_id

site_id : Site > open > site_id

***
### findone

get 1 record

* curl sample

```
curl "http://localhost:3001/api/get/findone?content=books&id=6018971bdaeb9700fed5345d"
```

* content

content name : Site > ContentType > content name

* id

 content_id

***
### count

リストの件数

* curl sample

```
curl "http://localhost:3001/api/get/count?content=books&site_id=6017b16942e8e9010d663a66"
```

* content

content name : Site > ContentType > content name

* site_id

site_id : Site > open > site_id

***

