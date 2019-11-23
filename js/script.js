///////////// title

const controller = new ScrollMagic.Controller();

const randomTtl = document.getElementsByClassName('js-target');

//getElementsByClassNameは配列として扱えないのでこの記述
Array.prototype.forEach.call(randomTtl, function(el, index) {
	const node = randomTtl[index];
	console.log(node);
	var str = node.textContent.split(''); //文字を分割strに代入
	var types = []; //ランダム表示する文字のタイプの配列
	var index = []; //始動時の順序の配列。ランダムに表示させるために使用
	var step = 3; //繰り返しの数何週するか
	var fps = 20; //表示スピード
	var strClone = []; //strクローン用の配列
	var typeClone = []; //typeクローン用の配列

	for (var i = 0; i <= str.length; i++) {
		index[i] = i; //文字の長さ分だけ格納。あとでシャッフルする。
		types[i] = 'symbol'; //randomCharでsymbolを返す。
		typeClone[i] = 'first'; //randomCharでfirstをを返す。
	};

	// ランダム文字を生成して返す。
	var randomChar = function (type) {
		var pool;

		switch (type) {
			case 'symbol':
			pool = '?/\\(^)![]abcdefghijklmnopqrstuvwxyz0123456789{}*&^%$';
			break;
			case 'first':
			pool = '---';
			break;
			default:
			pool = '';
		}

		return pool.charAt(Math.floor(Math.random() * pool.length));
	};
	//初期化。
	var j = 0;
	var k = 0;
	node.textContent = '';
	// ランダム文字を織り交ぜながら一文字ずつ表示させる。メインです。
	var tickers = {
		index: function(){

			if (k > str.length) {
				k = str.length;
				//str.lengthを超えたらstr.lengthで止める。
				//理由はそれ以上文字がないから止まっちゃうので。
			}

			//Math.max(a, 0); aと0を比較して値の大きい方を返します。aがマイナスの値の間は0。
			for (var i = Math.max((j + ((step - 1) * - str.length)), 0); i < k; i++) {
				strClone[Math.abs(i)] = randomChar(typeClone[Math.abs(i)]);
				//strCloneにランダムな文字列を返す。first or symbol

				if (k >= str.length) {
					typeClone.splice(Math.abs(j - str.length), 1, types[Math.abs(i)]);
					//typeCloneの中身を入れ替える。from first to symbol
				};

				if ((j + ((step - 1) * - str.length)) >= 0) {
					strClone[Math.abs(j + ((step - 1) * - str.length))] = str[Math.abs(j + ((step - 1) * - str.length))];
					//strCloneの中身をランダムな文字列から最初の文字列に戻す。
				};
			};///////////for

			node.textContent = strClone.join('');
			//ループkから抜けた現在のstrCloneの中身をtimer措きに'#letter'の中に追加していきます。

			if (j === step * str.length) {
				return;
				//この条件で終了。
			};

			j++;
			k++;
			return setTimeout(function () {
				tickers.index();
			}, 1000 / fps);
		}
	}; /////////tickers

	const randomScene = new ScrollMagic.Scene({
		triggerElement: node,
	  triggerHook: 0.8
	})
	.on('enter', function(){
		tickers.index();
		console.log(node);
	})
  .addTo(controller);
}); ////////////forEach
