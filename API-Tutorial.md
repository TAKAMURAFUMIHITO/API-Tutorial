---
stoplight-id: xjzk9sa55nko3
---

# API-Tutorial

##  概要
API-Tutorial について仕様を説明します。本APIは書籍の扱うサービスに関するAPIであり、これを使用することにより、書籍に対してCRUD処理を行うことができます。
|ホスト|プロトコル|バージョン|データ形式|
|:--:|:--:|:--:|:--:|
|-|http|-|YAML|

### URL
http://localhost:3000

## 仕様
- 登録されている書籍の一覧を取得できる
- idを指定して登録されている特定の書籍の情報を取得できる
- 書籍を登録できる
- 書籍の情報を更新できる
- 登録されている書籍を削除できる
- 書籍は以下の情報を登録・更新できる
  - タイトル
  - 要約

### 書籍(例)
~~~
{
  "id": 0,
  "title": "string",
  "body": "string",
  "createDate": "2019-08-24T14:15:22Z",
  "updateDate": "2019-08-24T14:15:22Z"
}
~~~

## 結果
HTTPレスポンスコードを見て結果を判定。
- 200 Get Books：書籍の一覧の取得成功
- 200 Get Book：：指定された書籍の取得成功
- 200 Book Updated：更新成功
- 201 Book Created：生成成功
- 204 Book Deleted：削除完了
---
不要か
- 400 Bad Request：クライアントのリクエストが不正
- 404 Not Found：書籍が登録されていない
- 500 Internal Server Error：サーバー側のエラー
---

## 書籍の取得

### リクエスト
`GET`メソッド  
`http://localhost:3000/book`

### レスポンス
HTTPレスポンスコードを見て結果を判定。成功の場合何が返る？
~~~
何かが返る
~~~

## 書籍の生成

### リクエスト
`POST`メソッド  
`http://localhost:3000/book`

### レスポンス
HTTPレスポンスコードを見て結果を判定。

## 指定された書籍の取得

### リクエスト
`GET`メソッド  
`http://localhost:3000/books/book_id`

### レスポンス
HTTPレスポンスコードを見て結果を判定。

## 書籍の更新

### リクエスト
`PUT`メソッド  
`http://localhost:3000/books/book_id`

### レスポンス
HTTPレスポンスコードを見て結果を判定。

## 書籍の削除

### リクエスト
`DELETE`メソッド  
`http://localhost:3000/books/book_id`

### レスポンス
HTTPレスポンスコードを見て結果を判定。