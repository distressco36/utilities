if(document.querySelector('.contact-form-btn')){
	document.querySelector('.contact-form-btn').addEventListener('click', (e) => {
		e.preventDefault();
		var element = e.target.parentNode.parentNode.children[0];
		var info = document.querySelector('.contact-form-textarea');
		var email = element.value;
		(email == '') ? displayMessage(element, "Please provide an email address") : 
		(!(email.includes('@') && email.includes('.'))) ? displayMessage(element, "Invalid Email Address") : sendData(element, info);
		});
	}
				
	function displayMessage(element, message) {
		element.value = '';
		element.placeholder = message;
		setTimeout(function(){element.placeholder = 'Email'}, 1500);
	  return;
	}
				
	function sendData(email, info) {
		var obj = {email: email.value, requestinfo: info.value};
		email.parentNode.reset();
		var url = "https://script.google.com/macros/s/AKfycbzjMHQyFWa-XHhGMcD8x_72llHS_S5dTATNVO48bh2ICFDpDtk_TO2bV3cjtLI_5soz/exec";
		fetch(url, {method: "POST", body: JSON.stringify(obj)})
		.then((res) => res.json())
		.then((res) => {
				var tempstatement = info.placeholder;
				info.placeholder = "Thank you for your submission. We have received your request and will be in contact with you shortly.";
				setTimeout(function() {info.placeholder = tempstatement}, 2500);
				});
				return;
		}
