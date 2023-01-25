# API-Tutorial

## プロジェクト構成

```
.
├── docs ........................ API仕様書
├── src
|    ├── entity ................. モデル
|    ├── data-source.ts ......... データベース設定
|    └── index.ts ............... API
└── docker-compose.yml ..........　　Composeファイル
```

## ブランチの運用方法
- feature-task*
  - 開発環境。
- main
  - 本番環境。各ブランチからマージされる

## 使用方法

### パッケージインストール
```
npm install
```

### DB起動・停止
```
// 起動
docker-compose up -d
// 停止
docker-compose down
```

### サーバー起動・DB接続
```
// srcディレクトリに移動
cd src
npm start
```
