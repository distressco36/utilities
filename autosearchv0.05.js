function autosearch(inp, arr) {
	var tmpInputArray = [];
  	var currentFocus;
    inp.addEventListener('input', function(e) {
      	var a, b, i, val = this.value;
      	closeAllLists();
      	if (!val) { return false;}
      	currentFocus = -1;
	  	tmpInputArray = [];
		tmpInputArray = val.toUpperCase().split(' '); 
      	a = document.createElement('DIV');
      	a.setAttribute('id', this.id + 'autocomplete-list');
      	a.setAttribute('class', 'autocomplete-items');
      	this.parentNode.appendChild(a);
      
      	for (i = 0; i < arr.length; i++) {
		  var tmpstr = arr[i].toUpperCase(); 
		  var array1 = tmpstr.trim().split(' '); var array2 = tmpInputArray;
		  const intersection = array1.filter(element => array2.includes(element)); 
			if(val.toUpperCase().slice(0,val.length) == arr[i].toUpperCase().slice(0, val.length) 
		   	|| (intersection.length > 0)){
       			if (val.toUpperCase().slice(0,val.length) == arr[i].toUpperCase().slice(0, val.length) 
				|| intersection.length >= Math.floor(0.6*tmpInputArray.length)) { 
          			b = document.createElement('DIV');
          			b.innerHTML += arr[i];
          			//b.innerHTML += `<input type='hidden' value='arr[i]'>`;
              		b.addEventListener('click', function(e) {
                		inp.value = this.innerHTML; //e.target.firstElementChild.value;
              			closeAllLists();
          			});
          			a.appendChild(b);
        		}
      		}
	  	}
  	});
  
	function closeAllLists(elmnt) {
     	var x = document.getElementsByClassName('autocomplete-items');
      	for (var i = 0; i < x.length; i++) {
       		if (elmnt != x[i] && elmnt != inp) {
        		x[i].parentNode.removeChild(x[i]);
       		}
    	}
   	}

    document.addEventListener('click', (e) => closeAllLists(e.target));
}

var searchHandle = document.getElementById('article-searchbar');
autosearch(searchHandle, articleArray);

searchHandle.addEventListener('change', (e) => {
	//if(this.value == ''){return;}
	console.log(articleObj[`${this.value}`]);
	/*setTimeout(function(){
		window.open(articleObj[`${this.value}`], '_top');
	}, 200);*/
});
