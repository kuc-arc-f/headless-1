
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
* skip, limit (option)

skip : start position

limit : limit record count

* curl sample / skip, limit

```
curl "http://localhost:3001/api/get/find?content=test_1&site_id=601a52687c693223ee03f570&skip=0&limit=10"
```

***
* order (option)　、並び替え

* colmun name : ex price

* ASC/DESC : 

　ＡSC : 昇順

  DESC : 降順

数値以外は、正しくソートできません

* curl sample  / order

```
curl "http://localhost:3001/api/get/find?content=test_6&site_id=601a52687c693223ee03f570&order=price:DESC"

```

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

