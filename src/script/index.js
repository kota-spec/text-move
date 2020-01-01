import { makeArray } from './_make-array';
// import { TweenMax } from 'gsap';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const $$text = document.querySelectorAll('.js-scoll-text');
    const textArr = []; // 要素毎のデータを格納
    let scrollTop; // スクロール値

    makeArray($$text).forEach(r => {
      const obj = {}; // textアニメーションで使うデータを格納

      // 要素のスクロール値を取得
      const rect = r.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const myTop = rect.top + scrollTop;

      // データを格納
      obj['el'] = r;
      obj['top'] = myTop + 100;
      obj['isActive'] = false;

      // データを配列に格納
      textArr.push(obj);

      // 文字を加工する処理
      const text = r.innerHTML;
      const result = text.split('<br>');
      const resultText = [];

      r.innerHTML = null;

      result.forEach((rr, ii) => {
        let result = '';

        rr.split('').forEach(t => {
          if (t === ' ') {
            t = '&nbsp;';
          }
          result = `${result}<div class="js-text-inner"><span class="js-text">${t}</span></div>`;
        });

        resultText[ii] = result;
      });

      resultText.forEach(c => {
        r.innerHTML += `<div class="js-text-wrap">${c}</div>`;
      });
    });

    document.addEventListener('scroll', () => {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop = top + window.innerHeight;

      // テキストのアニメーション
      textArr.forEach(obj => {
        if (scrollTop >= obj.top && !obj.isActive) {
          obj.isActive = true;
          const $$texts = obj.el.querySelectorAll('.js-text');

          // 文字一つ一つにクラスを装着
          makeArray($$texts).forEach((r, i) =>
            window.setTimeout(() => r.classList.add('display'), i * 30)
          );
        }
      });
    });
  });
})();
