# headless-1 (Beta)

 Version: 0.9.9

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/01/29

 update  : 2021/03/17

***
### Summary

headless CMS , Next.js + mongodb

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

* if change , release mode

yarn serve


***
### API sample

https://github.com/kuc-arc-f/headless-1/blob/main/doc/manual_doc/3_api_sample.md

***
### SSG sample, Next.js 

https://github.com/kuc-arc-f/jamstack-head-sample

***
### Document

https://cms-kuc-jamstack1.netlify.app/pages/6029cea268013b004be190e2

***
### Blog : 

* Headless CMS のような機能の作成【作例】

https://note.com/knaka0209/n/n98586919b8bd

***

