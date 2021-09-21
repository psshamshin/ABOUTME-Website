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
	else{ print(); }
}

function clear_storage(){
	sessionStorage.clear();
	document.getElementById('output_1').value = '';
}

function print() {
	var sum = 0;
	for (var i=0; i < cart.good.length; i++){
		
		var curr = cart.good[i];
		var resolution = (curr.res==1) ? '(1920x1920)':'(1080x1080)';
		text += curr.name+' '+resolution+' $'+curr.cost+' x'+curr.num+' '+'\n';
		sum += cart.good[i].cost * cart.good[i].num;
	}
	document.getElementById('output_1').value = text + '\n' + 'sum: $' + sum;
}