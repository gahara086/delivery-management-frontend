<template>
  <div class="home">
    <h2 class="text-h5 mb-4">アプリ概要</h2>
    <p>
      本アプリケーションは、とある環境での技術スタックのキャッチアップを目的として
      開発しました。
    </p>
    <p>以下の技術を学びました。</p>
    <ul class="mb-4">
      <li>
        <strong>バックエンド開発</strong>: REST
        APIの設計・実装、データベース連携を行い、Spring
        BootとKotlinの基本を習得。
      </li>
      <li>
        <strong>フロントエンド開発</strong>:
        TypeScriptとVue.jsを用いて、UIの構築からAPI連携までを実現。
      </li>
      <li>
        <strong>AWSクラウド環境でのデプロイ</strong>:
        Docker化したアプリケーションをAWS
        ECS、RDS、S3を活用して本番環境と同等の構成でデプロイ。
      </li>
    </ul>

    <h3 class="text-h6 mb-2">使用技術スタック詳細</h3>
    <h4 class="text-subtitle-1 font-weight-bold mt-4">バックエンド</h4>
    <ul>
      <li><strong>言語</strong>: Kotlin</li>
      <li><strong>フレームワーク</strong>: Spring Boot</li>
      <li><strong>ライブラリ</strong>: Spring Data JPA（データベース操作）</li>
      <li><strong>API</strong>: REST API</li>
      <li><strong>永続化</strong>: MySQL（Amazon RDSでホスティング）</li>
    </ul>

    <h4 class="text-subtitle-1 font-weight-bold mt-4">フロントエンド</h4>
    <ul>
      <li><strong>言語</strong>: TypeScript</li>
      <li><strong>フレームワーク</strong>: Vue.js</li>
      <li>
        <strong>ライブラリ</strong>: Vuetify（UIコンポーネント）,
        Axios（API通信）
      </li>
      <li>
        <strong>スタイリング</strong>: Vuetifyのデフォルトテーマ + カスタムCSS
      </li>
    </ul>

    <h4 class="text-subtitle-1 font-weight-bold mt-4">
      クラウドインフラとデプロイ
    </h4>
    <ul>
      <li><strong>クラウドサービス</strong>: AWS</li>
      <li><strong>使用サービス</strong>:</li>
      <ul>
        <li>Amazon ECS（Fargateを使用したコンテナ管理）</li>
        <li>Amazon ECR（Dockerイメージの管理）</li>
        <li>Amazon RDS（MySQLデータベースのホスティング）</li>
        <li>Amazon S3（静的ファイルのホスティング）</li>
      </ul>
    </ul>

    <h4 class="text-subtitle-1 font-weight-bold mt-4">開発環境</h4>
    <ul>
      <li><strong>OS</strong>: Windows</li>
      <li><strong>開発ツール</strong>:</li>
      <ul>
        <li>IntelliJ IDEA（バックエンド開発）</li>
        <li>Visual Studio Code, Cursor（フロントエンド開発）</li>
      </ul>
      <li><strong>テスト</strong>: Postman（APIテスト）</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  text-align: left;
  margin: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 0.5rem;
}
</style>
