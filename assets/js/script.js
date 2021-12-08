//========JS========
var cart = {
		'good': []
	};
if (sessionStorage.getItem('cart')!=null){
	cart = JSON.parse(sessionStorage.getItem('cart'));
	console.log('vv');
	console.log(cart);
}


text = '';

function add_to_cart(name, cost) {
	cart.good.push({'name':name, 'cost':cost, 'res':
		document.getElementById(name).options.selectedIndex, 'num':1});
	//alert(cart.good[0].res);
	console.log(cart);
	sessionStorage.setItem('cart', JSON.stringify(cart));
	alert('Added!');
}

function check(a) {
	//var cart = JSON.parse(sessionStorage.getItem('cart'));
	if (cart == null){
		alert('cart is empty');
	}
	
	for (var i = 1; i < cart.good.length; i++) {
		for(var j=0; j < i; j++){
			if ((cart.good[j].name == cart.good[i].name)&&(cart.good[j].res == cart.good[i].res)){
				
				//alert(cart.good[j].name);
				//alert('blu');
				cart.good[i].num += cart.good[j].num;
				cart.good[j].name = null;
			}
		}
	}
	
	sessionStorage.setItem('cart', JSON.stringify(cart));
	
	//console.log(cart.good.length);

	for (var i = 0; i < cart.good.length; i++) {
		if (cart.good[i].name == null){
			cart.good.splice(i,1);
			console.log(i);
		}
	}
	if (a <= 2){ a += 1; check(); }
	else{
		print();
	}
}

function clear_storage(){
	sessionStorage.clear();
	//document.getElementById('output_1').value = '';
	//cart_render();
}

function print() {
	var sum = 0;
	for (var i=0; i < cart.good.length; i++){
		
		var curr = cart.good[i];
		var resolution = (curr.res==1) ? '(1920x1920)':'(1080x1080)';
		text += curr.name+' '+resolution+' $'+curr.cost+' x'+curr.num+' '+'\n';
		sum += cart.good[i].cost * cart.good[i].num;
	}
	//document.getElementById('output_1').value = text + '\n' + 'sum: $' + sum;
}

function del(name){
	//alert(name);
	cart = JSON.parse(sessionStorage.getItem('cart'));
	for (let i=0; i < cart.good.length; i++){
		if (cart.good[i].name == name){
			cart.good.splice(i,1);
		}
	}
	sessionStorage.setItem('cart', JSON.stringify(cart));
	my_func();
}

function p(name) {
	//alert(name);
	cart = JSON.parse(sessionStorage.getItem('cart'));
	for (let i=0; i < cart.good.length; i++){
		if (cart.good[i].name == name){
			cart.good[i].num += 1;
			//alert('fff');
			break;
		}
	}
	sessionStorage.setItem('cart', JSON.stringify(cart));
	//cart_render();
	my_func();
}

function m(name) {
	//alert(name);
	cart = JSON.parse(sessionStorage.getItem('cart'));
	for (let i=0; i < cart.good.length; i++){
		if (cart.good[i].name == name){
			if (cart.good[i].num == 1){
				del(name);
			}
			else{
				cart.good[i].num -= 1;
			}
			//alert('fff');
			break;
		}
	}
	sessionStorage.setItem('cart', JSON.stringify(cart));
	//cart_render();
	my_func();
}

my_func = null;


function writeFile(name, value) {
	//alert('e');
	var val = value;
	if (value === undefined) {
		val = "";
	}
	var download = document.createElement("a");
	download.href = "data:text/plain;content-disposition=attachment;filename=file," + val;
	download.download = name;
	download.style.display = "none";
	download.id = "download"; document.body.appendChild(download);
	document.getElementById("download").click();
	document.body.removeChild(download);
}




//========JQuery========
//$('#left_but').on('click', alert('gg'));
$(document).ready(function(){
	$(".shop_item").draggable(
		{
			cursor: "move",
			helper: "clone",
			scroll: true,
			containment: "body",
		}
	);

	$(".cart_graggable").droppable(
		{
			accept: ".shop_item",
			classes: {
				"ui-droppable-active": "ui-state-active",
				"ui-droppable-hover": "ui-state-hover"
			},

			drop: function (event, ui) {
				var str = ui.draggable.attr("id").slice(0, -2);
				add_to_cart(str, 10);
				//alert(ui.draggable.attr("id"));
				//alert(str);
			}
		}	
	);


	// ====== ГАЛЕРЕЯ ====== 
	var i = 0;
	var ar_gallery = [
		'url(assets/img/macintoch.png)',
		'url(assets/img/cup.png)',
		'url(assets/img/xmas.png)'
	];
	function left(){
		alert('aa');
		$('.section--gallery').css('background-image', ar_gallery[i]);
		(i==ar_gallery.length-1) ? i=0 : i++;
	}
	function right() {
		$('.section--gallery').css('background-image', ar_gallery[i]);
		(i==0) ? i=ar_gallery.length-1 : i--;
	}
	/*
	function search(text){
		alert('bg');
		//my_func();
	}
	*/
	$("#but_search").click(function () {
		var goods = [
			"red_i",
			"white_i",
			"violet_i",
			"green_i",
			"blue_i",
			"pink_i"
		];
		var flag = false;
		var search_item = $("#inp_text").val();
		//alert(search_item);
		//alert(goods[0]);
		for (var i=0; i < goods.length; i++){
			if ((search_item + "_i") == goods[i]){
				flag = true;
				//alert('g');
				break;
			}
		}
		if (flag){
			//alert('f');
			for(var i = 0; i < goods.length; i++){
				if ((search_item + "_i") != goods[i]){
					//alert(goods[i]);
					$("#" + goods[i]).css('opacity', '0.2');
					$("#" + goods[i] + "s").css('opacity', '0.2');
				}
			}
		}
		if (search_item == ""){
			for(var i=0; i < goods.length; i++){
				$("#" + goods[i]).css('opacity', '1');
				$("#" + goods[i] + "s").css('opacity', '1');
			}
		}
		
	})

	// ====== КОРЗИНА ====== 
	
	function cart_render(){
		bill = '';
		sum = 0;
		$('#inner_dark_plate').empty();
		cart = JSON.parse(sessionStorage.getItem('cart'));
		//alert(cart.good[0]);
		if (cart.good[0] == null){
			$('#inner_dark_plate').append('<h1 class="text_good">Empty</h1>');
		}
		//alert(cart.good[0].name);
		var images = [
		'<img src="assets/img/city_caramel.jpg" class="img_cart">',
		'<img src="assets/img/city_pink.png" class="img_cart">',
		'<img src="assets/img/city_violet.jpg" class="img_cart">',
		'<img src="assets/img/city_dark_red.jpg" class="img_cart">',
		'<img src="assets/img/city_green.png" class="img_cart">',
		'<img src="assets/img/city_blue.png" class="img_cart">'
		];

		var text_start = '<h1 class="text_good">';
		var text_end = '</h1>';
		
		for (let i=0; i < cart.good.length; i++){
			parent_st = '<div class="cart_item" id="cart_item';
			parent_end = '"></div>';
			$('#inner_dark_plate').append(parent_st+i+parent_end);
			let num_of_img = 0;
			
			switch (cart.good[i].name){
				case 'white': num_of_img=0; break;
				case 'pink': num_of_img=1; break;
				case "purple": num_of_img=2; break;
				case 'red': num_of_img=3; break;
				case 'green': num_of_img=4; break;
				case 'blue': num_of_img=5; break;
			}
			
			$('#cart_item'+i).append(images[num_of_img]);
			$('#cart_item'+i).append(text_start+cart.good[i].name+text_end);
			bill += cart.good[i].name + ' ';
			var resolution = (cart.good[i].res==1) ? '(1920x1920)':'(1080x1080)';

			$('#cart_item'+i).append(text_start+resolution+text_end);
			bill += resolution + ' ';

			if (cart.good[i].res==1){
				var cost = cart.good[i].cost*2*cart.good[i].num;
			}
			else{
				var cost = cart.good[i].cost*cart.good[i].num;
			}
			$('#cart_item'+i).append(text_start+'$'+cost+text_end);
			bill += '$' + cost + ' ';
			sum += cost;

			var count1_start = '<h1 class="text_good" onclick="m(';

			$('#cart_item'+i).append(count1_start+"'"+cart.good[i].name+"'"+')">-</h1>');


			
			$('#cart_item'+i).append(text_start+cart.good[i].num+text_end);
			bill += 'num:' + ' ' + cart.good[i].num + '\n';
			//alert(bill);



			var count_start = '<h1 class="text_good" onclick="p(';

			$('#cart_item'+i).append(count_start+"'"+cart.good[i].name+"'"+')">+</h1>');

			var can_but = '<img src="assets/img/cancel.png"height="50%"class="cancel_button" onclick = "del(';

			//alert('ff'+cart.good[i].name);
			$('#cart_item'+i).append(can_but+"'"+cart.good[i].name+"'"+')">');
		}
		bill += 'sum: $' + sum;
		my_func = cart_render;
	}
	//$("#cart_but").on('click', cart_render);
	check(2);
	cart_render();

	$('#left_but').on('click', left);
	$('#right_but').on('click', right);
	
});