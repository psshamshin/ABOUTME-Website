$(document).ready(function(){
	// ====== ГАЛЕРЕЯ ====== 
	var i = 0;
	var ar_gallery = [
		'url(assets/img/macintoch.png)',
		'url(assets/img/cup.png)',
		'url(assets/img/xmas.png)'
	];
	function left(){
		$('.section--gallery').css('background-image', ar_gallery[i]);
		(i==ar_gallery.length-1) ? i=0 : i++;
	}
	function right() {
		$('.section--gallery').css('background-image', ar_gallery[i]);
		(i==0) ? i=ar_gallery.length-1 : i--;
	}
	$('#left_but').on('click', left);
	$('#right_but').on('click', right);

	// ====== КОРЗИНА ====== 
	
});