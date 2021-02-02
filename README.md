# headless-1

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/01/29

 update  : 2021/02/02

***
### Summary

headless CMS sample, Next.js + mongodb

***
### required
* Next.js : 10.0.0
* mongodb : 3.6.3
* node : 14.11


***
### Setup

npm install

***
### Setup , etc
* next.config.js , 

if change URL, mongodb URL, database name

```
BASE_URL: "http://localhost:3001"
MONGODB_URL: "mongodb://localhost:27017",
MONGODB_DB_NAME: "hcms",    
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3001"
```

***
### start server
* Start :

yarn dev

***
### API sample

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
### SSG sample, Next.js 

https://github.com/kuc-arc-f/jamstack-head-sample

***
### Blog : 

* Headless CMS のような機能の作成【作例】

https://note.com/knaka0209/n/n98586919b8bd

***

