# my_chat_app

takaのチャットサイトです
(https://chatapp-f1e5d.firebaseapp.com/)

# 使用したもの
- HTML
- CSS
- JavaScript
- vue.js
- BootStrap4(CDN)
- Firebase(Twitter認証,hosting, realtime DB)

# その他素材
- Google Material Icons

    (https://material.io/resources/icons/?style=baseline)
- UnDraw

    (https://undraw.co/)
- fontawesam

    (https://fontawesome.com/)

# 内容
Twitterアカウントを利用してチャットをするアプリです。<br>
- 2019/11/30<br>
    URLから直接チャットページに飛べるようにvue-routerの設定を変更<br>
- 2019/12/04<br>
    githubのセキュリティアラート対応(` js-yaml`関連)で`yarn audit`で確認した結果、`url-loader`と`css-loader`が対象とわかったので、それらを更新した。<br>
- 2019/12/05<br>
    `firebaseui(-ja)`をつかってみました。<br>
    また、
    1. firebase-uiを使用している`develop-b`
    1. firebase-uiを使わずfontawesamとSettingページのUIカラーをそのまま適用させている`develop-a`<br>
    にそれぞれ分けました。
- 2019/12/17<br>
   部屋の作成者かどうか判断する処理を`displayName`ではなく`uid`を使用するように変更
- 2019/3/19<br>
   部屋の作成者かどうか判断する処理を`displayName`ではなく`uid`を使用するように変更
   - `develop-a`廃止
   - 時刻のフォーマットを`moment.js`から`fecha`に変更
