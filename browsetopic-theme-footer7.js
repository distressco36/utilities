var includeDiv = document.createElement('script');
includeDiv.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js';
includeDiv.integrity = 'sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==';
includeDiv.crossOrigin = 'anonymous'; includeDiv.setAttribute('referrer-policy', 'no-referrer');
document.body.appendChild(includeDiv);

fetch('https://script.google.com/macros/s/AKfycbykwYXhKDOS93pFjPuS4yLVpRKxy4nfq9N36r48KZx-VSrXihJJRXOI7naKB1y93_1n2A/exec')
.then((res) => res.json())
.then((res) => {stringArray = res;});

var stringArray = []; 
	
var pkbase = `https://script.google.com/macros/s/AKfycbz6mcocfdtAdMf9P9Z9eUpNx6HLgUWMzeX5s75idn7ThEApvcRYDWxJDZNjk-HUquiY/exec`;
	

var currentTopic = 'The Standard Informer';
document.getElementById('current-topic-ch').innerHTML = `${currentTopic}`;
// Event Listeners
window.addEventListener('load', function() {
	document.getElementById('si-app-wrapper').querySelector('.si-icon-topic').addEventListener('click', function(){
		var background = document.createElement('div'); background.className = 'topic-background';
		document.getElementById('si-app-wrapper').appendChild(background);
		var btncontainer = document.createElement('div'); 
		btncontainer.className = 'topic-back-btn-container';
		var backbtn = document.createElement('div'); 
		backbtn.className = 'search-back-btn';
		backbtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
		backbtn.addEventListener('click', function(){document.getElementById('si-app-wrapper').removeChild(background);});
		btncontainer.appendChild(backbtn);
		background.appendChild(btncontainer);
		var autocompletediv = document.createElement('div'); autocompletediv.className = 'autocomplete';
		autocompletediv.style = 'width:100%';
		var searchinput = document.createElement('input');
		searchinput.className = 'searchinput';
		searchinput.type = 'text'; searchinput.setAttribute('autofocus', 'true');
		searchinput.placeholder = 'Search Topic'; 
		searchinput.onchange = function(e) {
			e.preventDefault(); 
			setTimeout(function(){
				currentTopic = searchinput.value;
				document.getElementById('current-topic-ch').innerHTML = `${currentTopic}`;
				document.getElementById('si-app-wrapper').removeChild(background);
				document.getElementById('si-post-grid').scrollTop = 0;
			}, 200);
		}
		autocompletediv.appendChild(searchinput);
		background.appendChild(autocompletediv);
		autosearch(searchinput, stringArray);
	});
		
	document.getElementById('si-app-wrapper').querySelector('#key-icon').addEventListener('click', function(e){
		var keyInputDiv = document.createElement('div');
		keyInputDiv.className = 'key-input-background';
		var exitBtn = document.createElement('label'); 
		exitBtn.className = 'key-input-exit-btn';
		exitBtn.innerHTML = '&times;';
		exitBtn.addEventListener('click', (e) => document.getElementById('si-app-wrapper').removeChild(e.target.parentNode));
		keyInputDiv.appendChild(exitBtn);
		var keyInput = document.createElement('input');
		keyInput.type = 'text'; keyInput.className = 'key-input';
		keyInput.placeholder = 'Insert Posting Key'; keyInput.id = 'key-input';
		keyInput.setAttribute('autofocus', true); keyInput.setAttribute('autocomplete', 'off');
		keyInputDiv.appendChild(keyInput);
		var submitBtn = document.createElement('label');
		submitBtn.className = 'key-submit'; submitBtn.innerHTML = 'Submit Key';
		submitBtn.addEventListener('click', function(){
			if(keyInput.value == ''){return;}
			var mask = document.createElement('div'); mask.className = 'mask'; document.body.appendChild(mask);
			fetch(`${pkbase}?key=${keyInput.value.toUpperCase()}`)
			.then((res) => res.text())
			.then((key) => {
				document.body.removeChild(mask);
				if(key == 'INVALID'){keyInput.value = ''; keyInput.placeholder = 'Invalid key: Please try again';
				setTimeout(function(){keyInput.placeholder = 'Insert Posting Key';}, 1500); return;} 
				document.getElementById('si-app-wrapper').removeChild(keyInputDiv);
				var keyIcon = document.getElementById('key-icon');
				document.getElementById('si-app-wrapper').querySelector('.post-btn-icon').removeChild(keyIcon);
				document.getElementById('si-app-wrapper').querySelector('.post-btn-icon').innerHTML = 
				`<p style='font-size:60%' id='post-icon'>POST</p>`; 
				document.getElementById('si-app-wrapper').querySelector('#post-icon').addEventListener('click', () => buildPostDash());
			});
		});
		keyInputDiv.appendChild(submitBtn);
		var paragraph = document.createElement('p'); 
		paragraph.className = 'key-query-paragraph';
		paragraph.innerHTML = "Need a Posting Key? <br><br> Use our secure Stripe&copy; payment link below to purchase your posting key. Your activated posting key will be emailed to you within 24 hours. <br><br>A posting key is valid for 1 year and allows unlimited content posting.";
		keyInputDiv.appendChild(paragraph);
		var paymentLink = document.createElement('div');
		paymentLink.className = 'payment-link'; 
		paymentLink.innerHTML = '<i class="fab fa-cc-stripe" style="cursor:pointer"></i>';
		paymentLink.addEventListener('click', () => {
			window.open('https://www.google.com', '_blank');
			document.getElementById('si-app-wrapper').removeChild(keyInputDiv);
		});
		keyInputDiv.appendChild(paymentLink);										
		document.getElementById('si-app-wrapper').appendChild(keyInputDiv);
	});
		
	document.querySelector('.terms-conditions').addEventListener('click', () => openTermsConditions());
});
	
function buildPostDash() {
	var background = document.createElement('div'); background.id = 'background';
	background.className = 'topic-background';
	var attachmentInput = document.createElement('input'); attachmentInput.style = 'display:none';
	attachmentInput.type = 'file'; attachmentInput.setAttribute('accept', 'image/*');
	attachmentInput.id = 'attachment-input';
	attachmentInput.addEventListener('change', function(e){
		var imageFile = e.target.files[0];
		if(!(document.getElementById('ps-btn')) && textinput.innerHTML == '') {addPostPlane(inputGrid);}
		var imageurl = URL.createObjectURL(imageFile);
		var attachmentContainer = document.createElement('div');
		attachmentContainer.className = 'attachment-container tweet-media-inner-div'; 
		var divimage = document.createElement('img');
		divimage.src = imageurl; divimage.className = 'tweet-media-img';
		var divinput = document.createElement('div'); divinput.className = 'post-textarea';
		divinput.setAttribute('contenteditable', 'true'); divinput.style = "height:auto";
		divinput.setAttribute('data-placeholder', 'Add a caption'); divinput.id='caption-input';
		divinput.setAttribute('autofocus', true); 
		divinput.addEventListener('input', (e) => {divinput.style.height = divinput.scrollHeight;});
		var divExit = document.createElement('div'); divExit.innerHTML = `&times;`;
		divExit.className = 'attachment-exit-btn';
		divExit.addEventListener('click', () => {
			attachmentInput.value = '';
			if(textinput.innerHTML == ''){
				if(document.getElementById('ps-btn')){
					removePostPlane(inputGrid, document.getElementById('ps-btn'));
				}
			}
			background.removeChild(attachmentContainer);
		});
		attachmentContainer.appendChild(divExit);
		attachmentContainer.appendChild(divimage);
		attachmentContainer.appendChild(divinput);
		background.appendChild(attachmentContainer);
	});
	background.appendChild(attachmentInput);
	var btncontainer = document.createElement('div'); 
	btncontainer.className="post-back-btn-container";
	var backbtn = document.createElement('div'); 
	backbtn.className = 'search-back-btn';
	backbtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
	backbtn.addEventListener('click', () => document.getElementById('si-app-wrapper').removeChild(background));
	btncontainer.appendChild(backbtn);
	background.appendChild(btncontainer);
	var inputContainer = document.createElement('div');
	inputContainer.className = 'post-input-container';
	var inputGrid = document.createElement('div');
	inputGrid.className = 'post-input-grid';
	inputContainer.appendChild(inputGrid);
	var attachmentIcon = document.createElement('label');
	attachmentIcon.innerHTML = '<i class="fas fa-paperclip"></i>'; attachmentIcon.className = 'attachment-icon';
	attachmentIcon.setAttribute('for', 'attachment-input');
	inputGrid.appendChild(attachmentIcon);
	var textinput = document.createElement('div'); 
	textinput.className = 'post-textarea'; textinput.setAttribute('contenteditable', 'true');
	textinput.setAttribute('data-placeholder', 'Start typing your post here');
	textinput.setAttribute('autofocus', true); textinput.id = 'text-input';
	textinput.addEventListener('input', function(){
		if(!document.getElementById('ps-btn')){
			addPostPlane(inputGrid);
		}
		if(textinput.innerText.length < 1 || textinput.innerText.length > 280){
			if(document.getElementById('ps-btn')){
				removePostPlane(inputGrid, document.getElementById('ps-btn'));
			}
		}
	});
	inputGrid.appendChild(textinput);
	background.appendChild(inputContainer);
	document.getElementById('si-app-wrapper').appendChild(background);
	return;
}
	
function buildPost(data, imageURL, titledata){
	var resultstring = (data.length > 0) ? processInputTxt(data) : '';
	var newPostMessage = document.createElement('div'); newPostMessage.className = 'message sent';
	var timestamp = moment().valueOf();
	var faviconlink = 'https://distressco.com/wp-content/uploads/2022/01/BrowseTopicIcon.png';
	var image = (imageURL == '') ? '' : imageURL; var title = (titledata == '')? '' : processInputTxt(titledata);
	var urlpreview = 'No Media';
	console.log(previewlinkArray.length);
	if(previewlinkArray.length > 0){
		urlpreview = postUrlPreview(previewlinkArray[0]);
		console.log("loading preview");
	}
	urlpreview = (urlpreview != 'No Media') ? urlpreview : '';
	if(imageURL != ''){
	newPostMessage.innerHTML = `<blockquote class="twitter-tweet"><div class='blockquote-header'>Browse Topic<img class='blockquote-logo' id='blockquote-logo' src='${faviconlink}'></img></div><p lang='en' dir='ltr'><p>${resultstring}</p><div class='tweet-media-inner-div'><img class='tweet-media-img' id='media' src='${image}' alt='${image}'</img><div class='tweet-media-title'>${title}</div></div><div>${urlpreview}</div></blockquote><div class='share-icon-container'><i class="fas fa-share coin" id='share'></i></div><div class='post-format'><span class="metadata"><span class="time">${moment(timestamp).format('LLL')}</span></span></div>`;
		return(newPostMessage);
	}
	newPostMessage.innerHTML = `<blockquote class="twitter-tweet"><div class='blockquote-header'>Browse Topic<img class='blockquote-logo' id='blockquote-logo' src='${faviconlink}'></img></div><p lang='en' dir='ltr'><p>${resultstring}</p><div>${urlpreview}</div></blockquote><div class='share-icon-container'><i class="fas fa-share coin" id='share'></i></div><div class='post-format'><span class="metadata"><span class="time">${moment(timestamp).format('LLL')}</span></span></div>`;
	return(newPostMessage);
}
var previewlinkArray = [];	
function processInputTxt(inputText){
	var textparsearray = inputText.trim().split(' '); 
	var resultstring = '';
	textparsearray.forEach((element, index) => {
		if(element.indexOf('http') >= 0){
			previewlinkArray.push(textparsearray[index]);
			textparsearray[index] = `<a target='_blank' href='${element}'> ${element} </a>`;
		}
		resultstring += `${textparsearray[index]} `;
	});
	console.log(previewlinkArray);
	previewlinkArray = [];
	return(resultstring);
}
	
function addPostPlane(inputgrid) {
	var postBtn = document.createElement('div');
	postBtn.style = 'justify-self:center;color:var(--primary-color);font-size:200%;cursor:pointer;';
	postBtn.innerHTML = `<i class="fas fa-paper-plane" id='ps-btn'></i>`; postBtn.id = 'ps-btn';
	postBtn.addEventListener('click', function(){
		var isdata = document.getElementById('text-input').innerHTML;
		var data = (isdata.length > 0) ? isdata : '';
		var isfile = document.getElementById('attachment-input').files[0];
		var image = (isfile != null) ? URL.createObjectURL(isfile) : '';
		var title;
		if(image == ''){title = ''}
		else{
			var istitle = document.getElementById('caption-input').innerHTML;
			var title = (istitle.length > 0) ? istitle : '';
		}
		var newPost = buildPost(data, image, title);
		document.getElementById('si-post-grid').insertBefore(newPost, document.getElementById('si-post-grid').children[1]);
		document.getElementById('si-app-wrapper').removeChild(document.getElementById('background'));
		if(!isfile){sendToDB(null, null, data); return;}
		var fr = new FileReader(); fr.readAsArrayBuffer(isfile);
		fr.onload = function(e) {
			var fileDataObj = {
				name: isfile.name,
				type: isfile.type,
				filedata: [... new Int8Array(e.target.result)]
			};
			sendToDB(fileDataObj, title, data);
		}
	});
	inputgrid.appendChild(postBtn);
	return;
}
	
function removePostPlane(inputgrid, postbtn){
	inputgrid.removeChild(postbtn);
}
	
function sendToDB(upfile, uptitle, uptext){
	var channel = currentTopic.trim(); 
	var channelrev = channel.replaceAll("'", '');
	var channelShareForm = currentTopic.trim().replaceAll(' ', '+');
	var channelShare = channelShareForm.replaceAll("'", '');
	var postid = Math.random().toString(20).substr(2, 11).toUpperCase();
	var shareURL = `https://distressco.com/content/?ch=${channelShare}&postid=${postid}`;
	if(!upfile){
		var uptextp = processInputTxt(uptext);
		var dataToSend = {channel: channelrev, postid: postid, shareurl: shareURL, fileobject: '', caption: '',
			post: uptextp
		};
		wDB(dataToSend);
		console.log(dataToSend); return;
	}
	var uptitlep = (uptitle.length > 0) ? processInputTxt(uptitle) : '';
	var uptextp = (uptext.length > 0) ? processInputTxt(uptext) : '';
	var dataToSend = {channel: channel, postid: postid, shareurl: shareURL, fileobject: upfile, caption: uptitlep, post: uptextp
	};
	wDB(dataToSend);
	return; 
}

var userName = 'Wordpress';
	// Database
const dbu = 'AKfycbz8_rjjoYkY0xtXVwjG9VSLh462cOQRO0XFP5_clPzHN2BhIcfOoS8ArKw13jLULZs8jw/exec';
const dbul = `https://script.google.com/macros/s/${dbu}`; 
	// Fetch Link Utility
const fsu = 'AKfycbxFFwEnWPrj7YGTuDojXsZgIk9MlRpC9yE2MkUT4_iHt1Sy6S_L9yqD1P3iLV3_aLHN';
const fsul = `https://script.google.com/macros/s/${fsu}/exec`;
	// Server Link Utility
const lsu = 'AKfycbzUwjdlWkXDLfHXzSKaT1pgCjaYcNmPY67UsnvpBLj26UJiKz5fvgkWxBhsMBorh92q';
const lsul = `https://script.google.com/macros/s/${lsu}/exec`;
	// Twitter oEmbed base
const twttrbase = 'https://publish.twitter.com/oembed?url=';
	// YouTube oEmbed base
const ytbase = `https://www.youtube.com/oembed?url=`;
	// Vimeo oEmbed base
const vimbase = `https://vimeo.com/api/oembed.json?url=`; 
	
// Available posting utilities 
// postYouTube(url)
// postUrlPreview(url)
// postTweet(url)
// postVimeo(url)

async function postVimeo(url){
	var vimhtml = await fetchUrl(`${vimbase}${url}`);
	var jsondata = JSON.parse(vimhtml[0]);
	jsondata.description = jsondata.description.replace(/(\r\n|\n|\r)/gm, "");
	console.log(jsondata);
	var timestamp = moment().valueOf();
	var message_string = `<div class='message sent'>
<div class='post-format' style='font-weight:bold'>${userName}</div>
<div class='post-message-url'><a href=${url.toString()} target='_blank' style='color:var(--hyperlink-color)'>${url.toString()}</a></div>
<img class='post-preview-img' src=${jsondata.thumbnail_url_with_play_button}></img>
<div class='preview-title' style='font-weight:bold;color:var(--primary-color)'>${jsondata.provider_name}</div>
<div class='preview-title' style='font-weight:bold'>${jsondata.title}</div>
<div class='preview-title'>${jsondata.description.trim()}</div>
<div style='text-align:right;margin-right:0.5em'><i class="fas fa-share coin" id='share'></i></div>
<div class='post-format'><span class="metadata"><span class="time">${moment(timestamp).format('LLL')}</span></span></div>
</div>`;
	message_string = message_string.replace(/(\r\n|\n|\r)/gm, "");
	var message = new DOMParser().parseFromString(message_string, 'text/html').body.children[0];
	var playbutton = message.children[2];
	playbutton.addEventListener('click', function(){window.open('https://player.vimeo.com/video/168565187?h=6b35d8c370', '_blank');});
	var shareIcon = message.children[6].firstElementChild;
	shareIcon.addEventListener('click', async () => {
        try {
        await navigator.share({url: `${url}`, title: `Share this post: ${jsondata.title}`});
        } catch(err) {console.log(err);}
    });
	document.getElementById('link-grid').appendChild(message);
	var vimpostData = {channelname: requestchannel.channel, user: userName, url: url, sitename: jsondata.provider_name, title: jsondata.title, description: jsondata.description.trim(), timestamp: timestamp.toString(),html: message_string.trim()}
	wDB(vimpostData);
}
//postVimeo('https://vimeo.com/168565187');

async function postTweet(url){
	var twhtml = await fetchUrl(`${twttrbase}${url}`); var jsondata = JSON.parse(twhtml[0]);
	var blockquote = new DOMParser().parseFromString(JSON.parse(twhtml[0]).html, 'text/html').body.firstElementChild;
	var blockquoteLinks = blockquote.getElementsByTagName('a');
	var innerLinks = []; var innertweet = [];
	for(var i =0; i < blockquoteLinks.length-1; i++){
		innerLinks[i] = blockquoteLinks[i].href; blockquoteLinks[i].target='_blank';
		innertweet[i] = await fetchUrl(innerLinks[i]);
	}
	var index = -1; var workingURL;
	for(var j = 0; j < innerLinks.length; j++){
		if(innertweet[j] != "Error"){
			index=j; workingURL = innerLinks[j]; j = innerLinks.length; 
		}
	}
	var htmldocu = new DOMParser().parseFromString(innertweet[index][0], 'text/html');
	if(index >= 0){
		var metaData = parseMeta(htmldocu, workingURL); 
		if(metaData != "Failed"){
			var innerMediaDiv = document.createElement('div'); innerMediaDiv.className = 'tweet-media-inner-div';
			var innerMediaImg = document.createElement('img'); innerMediaImg.className = 'tweet-media-img';
			var innerMediaTitle = document.createElement('div'); innerMediaTitle.className = 'tweet-media-title';
			innerMediaDiv.appendChild(innerMediaImg); innerMediaDiv.appendChild(innerMediaTitle);
			blockquote.appendChild(innerMediaDiv); innerMediaImg.id='media';
			innerMediaImg.src = metaData['og:image']; innerMediaTitle.innerHTML = metaData['og:title'];
			if(metaData['og:url']){innerMediaImg.alt = metaData['og:url'];}
			 else{innerMediaImg.alt=metaData['fallback:url'];}
			innerMediaImg.addEventListener('click', function(e){
				window.open(innerMediaImg.alt, '_blank');
			});
			var index = blockquoteLinks.length - 1;
			var timevalue = blockquoteLinks[index].innerHTML;
			blockquote.removeChild(blockquoteLinks[index]);
			var divtime = document.createElement('div'); divtime.innerHTML = timevalue;
			divtime.style = 'padding-left:0.5em;font-weight:400;font-size:90%';
			blockquote.appendChild(divtime);
		}
	}
	var timestamp = moment().valueOf();
	var lgHandle = document.getElementById('link-grid');
	var message = `<div class='message sent'>
<div class='post-format' style='font-weight:bold'>@${userName}</div>
<div class='post-message-url'><a href=${url.toString()} target='_blank' style='color:var(--hyperlink-color)'>${url.toString()}</a></div>
<div class='share-icon-container'><i class="fas fa-share coin" id='share'></i></div>
<div class='post-format'><span class="metadata"><span class="time">${moment(timestamp).format('LLL')}</span></span></div></div>`;
	message = message.replace(/(\r\n|\n|\r)/gm, "");
	var messagehtml = new DOMParser().parseFromString(message, 'text/html').body.children[0];
	messagehtml.children[2].firstElementChild.addEventListener('click', async () => {
    	try {
      	await navigator.share({url: `${url}`, title: `Share this post: ${url}`});
    	} catch(err) {console.log(err);}
  	});
		
	var divHeader = document.createElement('div');
	divHeader.className = 'blockquote-header';
	divHeader.innerHTML=`${jsondata.author_name} <span style='color:var(--text-color)'>via</span>`;
	var imagelogo = document.createElement('img'); 
	imagelogo.src='https://distressco.com/wp-content/uploads/2022/01/2021-Twitter-logo-blue.png'; 
	imagelogo.className = 'blockquote-logo';
	divHeader.appendChild(imagelogo);
	blockquote.insertBefore(divHeader, blockquote.firstElementChild);
	messagehtml.insertBefore(blockquote, messagehtml.children[2]);
	lgHandle.appendChild(messagehtml);
	var html_snippet = new XMLSerializer().serializeToString(messagehtml);
	var tweetPostData = {channelname: requestchannel.channel, user: userName, url: url, 
	timestamp: timestamp.toString(), tweetid: '', html: html_snippet};
	wDB(tweetPostData);
}
//postTweet('https://twitter.com/nytimes/status/1481737844150444033?s=20');
	
async function postYouTube(url){
	var ythtml = await fetchUrl(`${ytbase}${url}`);
	var jsondata = JSON.parse(ythtml[0]);
	var linkshare = new DOMParser().parseFromString(jsondata.html, 'text/html').body.firstElementChild.src;
	var timestamp = moment().valueOf();
	var message = `<div class='message sent'>
<div class='post-format' style='font-weight:bold'>@${userName}</div><div class='post-message-url'><a href=${url.toString()} target='_blank' style='color:var(--hyperlink-color)'>${url.toString()}</a></div>
<div class='message sent'>
<img class='post-preview-img' src=${jsondata.thumbnail_url}></img>
<div class='preview-title' style='font-weight:bold;color:var(--primary-color)'>${jsondata.provider_name}</div>
<div class='preview-title' style='font-weight:bold'>${jsondata.title}</div>
<div class='preview-title'>${jsondata.author_name}</div>
</div>
<div class='share-icon-container'><i class="fas fa-share coin" id='share'></i></div>
<div class='post-format'><span class="metadata"><span class="time">${moment(timestamp).format('LLL')}</span></span></div>
</div>`;
	message = message.replace(/(\r\n|\n|\r)/gm, "");
	var html = new DOMParser().parseFromString(message, 'text/html');
	var embedhtml = html.body.children[0]; 
	var playbutton = embedhtml.children[2].firstElementChild;
	playbutton.addEventListener('click', function(){window.open(linkshare, '_blank');});
	var xmlversion = new XMLSerializer();
	var html_snippet = xmlversion.serializeToString(embedhtml);
	var shareIcon = embedhtml.children[3].firstElementChild;
	shareIcon.addEventListener('click', async () => {
        try {
        await navigator.share({url: `${url}`, title: `Share this post: ${jsondata.title}`});
        } catch(err) {console.log(err);}
    });
	document.getElementById('link-grid').appendChild(embedhtml);
	var ytpostData = {channelname: requestchannel.channel, user: userName, url: url, sitename: jsondata.provider_name, title: jsondata.title, description: jsondata.author_name, timestamp: timestamp.toString(),html: html_snippet.trim()}; 
	wDB(ytpostData);
	return;
}
	
//postYouTube('https://youtu.be/hYQQK30W_go');
	
async function postUrlPreview(url){
	var htmlresult = await fetchUrl(url);
	var metaData = parseMeta(htmlresult[1], url);
	if(metaData == "Failed"){return("No Media");}
	//console.log(metaData);
	//linkGridHandle = document.getElementById('si-post-grid');
	var post = buildMessage(metaData);
	return(post[0]);
	//linkGridHandle.appendChild(post[0]);
	//wDB(post[1]);
}
//postUrlPreview('https://www.aljazeera.com/program/start-here/2022/1/13/crisis-over-ukraine-start-here');
	
function fetchUrl(url){
	return new Promise(resolve => {
		fetch(`${fsul}?url=${url}`)
		.then((res) => res.text())
		.then((res) => {
			var parser = new DOMParser();
			try {
			var html = parser.parseFromString(res, 'text/html');
			} catch(error){
				console.log(`${error}: Failed to parse string to DOM elements`); 
				resultvar = "No Data";
				return("Failed");
			}
			var texthtml = [res, html];
			resolve(texthtml);
		})
		.catch(function(error){
			console.log(error);
			resolve("Error");
		});
			
	});
}
	
function parseMeta(html, url) {
    var headElement = html.head;
    var metaElements = headElement.getElementsByTagName('meta');
    var metaObj = {};
    for(var i = 0; i < metaElements.length; i++){
      	if(metaElements[i].getAttribute('name')){
        	metaObj[metaElements[i].name] = metaElements[i].content;
      	}
      	if(metaElements[i].getAttribute('property')){
        	metaObj[metaElements[i].getAttribute('property')] = metaElements[i].content;
      	}
    }
    metaObj['fallback:url'] = url.toString();
    if(!(metaObj['og:image'] || metaObj['twitter:image'])){return("Failed");}
    return(metaObj);
}
	
function buildMessage(meta){
   	var url = ''; var image = ''; var sitename = ''; var title = ''; var description = ''; 
    if(meta['og:url']){url = meta['og:url'];} else if(meta['twitter:url']){url = meta['twitter:url'];} 
    else {url = meta['fallback:url'];}
    if(meta['og:image']){image = meta['og:image'];} else if(meta['twitter:image']){image = meta['twitter:image'];} 
    else {return("No Media");}
    if(meta['og:site_name']){sitename = meta['og:site_name'];}
    if(meta['og:title']){title = meta['og:title'];} else if(meta['twitter:title']){title = meta['twitter:title'];} 
    else {title = '';}
    if(meta['og:description']){description = meta['og:description'];} else if(meta['twitter:description']){
    description = meta['twitter:description'];} else if(meta['description']){description = meta['description'];}
    else {description = '';}
    var timestamp = moment().valueOf();
    var message = `<div class='message sent'>
<div class='post-format' style='font-weight:bold'>${userName}</div><div class='post-message-url'><a href=${url.toString()} target='_blank' style='color:var(--hyperlink-color)'>${url.toString()}</a></div>
<div class='post-preview-box'>
<img src=${image} class='post-preview-img'></img>
<div class='preview-title' style='color:var(--primary-color);font-weight:bold'>${sitename}</div>
<div class='preview-title' style='font-weight:bold'>${title}</div>
<div class='preview-title'>${description}</div>
</div>
<div style='text-align:right;margin-right:0.5em'><i class="fas fa-share coin" id='share'></i></div>
<div class='post-format'><span class="metadata"><span class="time">${moment(timestamp).format('LLL')}</span></span></div></div>`; 
	message = message.replace(/(\r\n|\n|\r)/gm, "");
    var messageDOM = new DOMParser().parseFromString(message, 'text/html');
    var messageDOMStripped = messageDOM.body.firstElementChild;
    messageDOMStripped.children[3].firstElementChild.addEventListener('click', async () => {
        try {
        await navigator.share({url: `${url}`, title: `Share this post: ${title}`});
        } catch(err) {console.log(err);}
    });
	var dbStoreData = {channelname: requestchannel.channel, user: userName, 'url': url, 'image': image, 
						'sitename': sitename, 'title': title, 'description': description,
						'timestamp': timestamp.toString(), html: message};
    var retData = [messageDOMStripped, dbStoreData];
    return(retData);
}
	
function wDB(data){
	fetch(dbul, { method: "POST", body: JSON.stringify(data) })
  	.then((res) => res.json())
  	.then((res) => console.log(res));
}

function rRSSDB(data, output){
	var channel = data.channel;
	fetch(`${dbul}?channel=${channel}`)
	.then((res) => res.text())
	.then((res) => { 
		if(res.length <= 10){console.log("No Data"); return;}
		var jsonres = JSON.parse(res);
		var visits_created = jsonres.pop();
		var visitsDiv = document.createElement('div');
		visitsDiv.style = 'width:100%;text-align:center';
		visitsDiv.innerHTML = `<span style='color:var(--primary-color);font-weight:bold;'>${visits_created[0][0]} views</span>`;
		document.getElementById(output).appendChild(visitsDiv);
		var resultArray = [];
		for(var i=0; i < jsonres.length; i++){
			var tempObj = {html: jsonres[i][7]}; //postid: jsonres[i][0], url: jsonres[i][1], post: jsonres[i][2], imageurl: jsonres[i][3], caption: jsonres[i][4], html: jsonres[i][5]};
			resultArray.push(tempObj);
		}
			
		for(var j = 0; j < resultArray.length; j++){
			var postElement = document.createElement('div'); postElement.className = 'message sent';
			postElement.innerHTML = resultArray[j].html;
			document.getElementById(output).appendChild(postElement);
			postElement.querySelector('#share').addEventListener('click', async (e) => {
				var url_to_share = e.target.parentNode.getAttribute('value');
    			try {
      			await navigator.share({url: url_to_share, title: `Share this post: ${url_to_share}`});
       			} catch(err) {console.log(err);}
  			});
			if(postElement.querySelector('#media')){
				postElement.querySelector('#media').addEventListener('click', function(e){
					window.open(e.target.alt, '_blank');
				});
			}
		}
			
	});
}
	
function rDB(data, output){
		
	var channel = data.channel;
	fetch(`${dbul}?channel=${channel}`)
	.then((res) => res.text())
	.then((res) => { console.log(res.length);
		if(res.length <= 10){console.log("No Data"); return;}
		var jsonres = JSON.parse(res);
		var visits_created = jsonres.pop();
		//var visitsDiv = document.createElement('div');
		//visitsDiv.style = 'width:100%;text-align:center';
		//visitsDiv.innerHTML = `<span style='color:var(--primary-color);font-weight:bold;'>${visits_created[0][0]} views</span>`;
		//document.getElementById(output).appendChild(visitsDiv);
		var resultArray = [];
		for(var i=0; i < jsonres.length; i++){
			var tempObj = {postid: jsonres[i][0], url: jsonres[i][1], post: jsonres[i][2], imageurl: jsonres[i][3], caption: jsonres[i][4], html: jsonres[i][5]};
			resultArray.push(tempObj);
		}
			
		for(var j = 0; j < resultArray.length; j++){
			var postElement = document.createElement('div'); postElement.className = 'message sent';
			postElement.innerHTML = resultArray[j].html;
			document.getElementById(output).appendChild(postElement);
			postElement.querySelector('#share').addEventListener('click', async (e) => {
				var url_to_share = e.target.parentNode.getAttribute('value');
    			try {
      			await navigator.share({url: url_to_share, title: `Share this post: ${url_to_share}`});
       			} catch(err) {console.log(err);}
  			});
			if(postElement.querySelector('#media')){
				postElement.querySelector('#media').addEventListener('click', function(e){
					window.open(e.target.alt, '_blank');
				});
			}
		}
			
	});
}

var requestchannel = {channel: 'BreakingNews'};
rDB(requestchannel, 'si-post-grid');

function autosearch(inp, arr) {
	var tmpInputArray = [];
  	var currentFocus;
    inp.addEventListener("input", function(e) {
      	var a, b, i, val = this.value;
      	closeAllLists();
      	if (!val) { return false;}
      	currentFocus = -1;
	  	tmpInputArray = [];
		tmpInputArray = val.toUpperCase().split(' '); 
      	a = document.createElement("DIV");
      	a.setAttribute("id", this.id + "autocomplete-list");
      	a.setAttribute("class", "autocomplete-items");
      	this.parentNode.appendChild(a);
      
      	for (i = 0; i < arr.length; i++) {
		  var tmpstr = arr[i].toUpperCase(); 
		  var array1 = tmpstr.trim().split(' '); var array2 = tmpInputArray;
		  const intersection = array1.filter(element => array2.includes(element)); 
			if(val.toUpperCase().slice(0,val.length) == arr[i].toUpperCase().slice(0, val.length) 
		   	|| (intersection.length > 0)){
       			if (val.toUpperCase().slice(0,val.length) == arr[i].toUpperCase().slice(0, val.length) 
				|| intersection.length >= Math.floor(0.5*tmpInputArray.length)) { 
          			b = document.createElement("DIV");
          			b.innerHTML += arr[i];
          			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              		b.addEventListener("click", function(e) {
                		inp.value = e.target.firstElementChild.value;
              			closeAllLists();
          			});
          	a.appendChild(b);
        	}
      		}
	  	}
  	});
  
	function closeAllLists(elmnt) {
     	var x = document.getElementsByClassName("autocomplete-items");
      	for (var i = 0; i < x.length; i++) {
       		if (elmnt != x[i] && elmnt != inp) {
        		x[i].parentNode.removeChild(x[i]);
       		}
    	}
   	}

    document.addEventListener("click", (e) => closeAllLists(e.target));
}

	
function openTermsConditions() {
	var background = document.createElement('div'); background.id='tc-bg';
	background.className = 'tc-bg';
	var exitBtn = document.createElement('div');
	exitBtn.className = 'tc-exit-btn'; exitBtn.innerHTML = `Close`;
	exitBtn.addEventListener('click', function(e){
		document.body.removeChild(background);
		document.body.removeChild(exitBtn);
	});
    var mainContents = document.createElement('p'); mainContents.style = "font-size:80%";
    mainContents.innerHTML = "<h2>Terms and Conditions</h2><h5>Terms and Conditions</h5>This is https://www.browsetopic.com('the Website'); a website operated by Flexon Digital Inc. ('FDI'). Your use of this Website (including the content and any other services provided by us from time to time) is subject to the following Terms of Use, which you are deemed to accept by accessing and/or registering with the Website.<br><br><h5>Content Rights</h5> The copyright and all other rights in the material on this Website are owned by Flexon Digital Inc. (FDI) or are included with the permission of the owner of the rights. Unless we give you express written permission, you may not decompile, reverse engineer, disassemble, rent, lease, loan, sublicense or create derivative works from the Website, which includes any information and software made available via the Website. <br><br> Save as otherwise provided in these Terms of Use, you may not copy, save, download, modify, reproduce, republish, distribute, transmit or use for any purposes, whether commercial or non-commercial, the Website or any information contained on the Website, except to the extent necessarily required in order for you to display, use and navigate the Website. <br><br> <h5>Information, Availability and Links to Other Sites</h5>While FDI takes every care to ensure that the information on this Website is accurate and complete, some of it is supplied to FDI. by third parties and FDI is unable to check its accuracy or completeness. <br><br> You acknowledge and agree that we are not responsible for services or information provided by third parties on the Website or for the availability of any other websites or material you access through the Website, and do not endorse and are not responsible or liable for any content, advertising, transactions, products or services on or available from such third parties or from websites or other material you access through the Website, nor for any damage, loss or offence caused, or alleged to be caused, by or in connection with use of or reliance on any content, advertising, products or services available from such third parties or available on or from such websites or other material. <br><br> Any dealings between you and any third party accessed on or via the Website, including payment for and delivery of products, services and any other terms, conditions, warranties or representations, associated with such dealings, are solely between you and the relevant third party. You agree not to hold us liable for any loss or damage of any kind incurred as the result of any such dealings, or to involve us in any dispute between yourselves and the third parties. <br><br> This Website is provided 'as is'; without any warranties of any kind and FDI does not accept any liability arising from any inaccuracy or omission in the information available on or via the Website or interruption in availability of the Website.<br><br> <h5>Suspension of the Website </h5>We reserve the right to: <br><br> (i) deny or suspend your access to the Website or any part of the Website with or without notice to you if your use of the Website or that part is deemed by us abusive, excessive, or against the interests of other users of the Website or in breach of these Terms of Use; or: <br></br> (ii) if applicable, to remove any content or material uploaded to the Website by you with or without notice where we believe it may contravene these Terms of Use. <br><br> Additionally, we reserve the right to suspend, restrict, or terminate access to the Website for any reason at any time.<br><br> <h5>Limit of Liability</h5>We exclude, to the fullest extent permitted by applicable laws, and save in respect of death or personal injury arising from our negligence, all liability for any claims, losses, demands and damages arising directly or indirectly out of or in any way connected with the Website and/or any services offered via the Website from time to time. This exclusion shall apply in respect of, without limitation, any interruption of service, lost profits, loss of contracts or business opportunity, loss of data, or any other consequential, incidental, special, or punitive damages, arising out of the Website, even if we have been advised of the possibility of such damages, whether arising in contract, tort, under statute or otherwise.<br><br> <h5>Promotions and Competitions</h5>From time to time FDI or selected third parties may offer other competitions, promotions or other offers in addition to the one described above on the Website. Each such offer shall be subject to its own express terms and may not be available in all jurisdictions.<br><br> <h5>Your Obligations to Us</h5>You agree that you will only use the Website in a manner that is consistent with these Terms of Use and any additional terms of use from time to time in force and in such a way as to ensure compliance with all applicable laws and regulations (including without limitation, your local law). In particular, you will not use the Website (or any part of it) to transmit or post any material which is defamatory, offensive, or of an obscene or menacing character, or which may, in our judgment, cause annoyance, inconvenience or anxiety to any person or contains any virus or other computer programming routine which may damage or interfere with the Website and/or any services provided by the Website. <br><br> You agree not to use the Website such that you cause the whole or part of the Website to be interrupted, damaged, rendered less efficient or in any way impaired.<br><br>To the extent to which your use or the use by any person who may be authorised by you or for whom you are responsible (for example, as employer) causes loss or damage to us or any person, you agree to indemnify us immediately on demand in relation to any such losses or damages attributable to us, including where necessary any legal, administrative or technical charges that may arise from such use.<br><br><h5>Your Contributions</h5>Whenever you submit any material to the Website (including without limitation any text, graphics, video or audio) you grant FDI a perpetual, royalty-free, non-exclusive, sublicenseable right and licence to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, play and exercise all copyright and publicity rights with respect to any such work worldwide and/or to incorporate it in other works in any media. If you do not wish to grant such rights to FDI it is suggested that you do not submit your contribution to the Website.<br><br>By submitting your contribution to the Website you also:<br><br>(i) warrant that such contribution is your own original work;<br><br>(ii) agree to indemnify FDI against all legal fees, damages and other expenses that may be incurred by FDI as a result of your breach of the above warranty; and <br><br>(iii) agree to waive any moral rights in your contribution for all the purposes specified herein.<br><br>In the event of any conflict between these Terms and Conditions and specific terms appearing elsewhere on the Website relating to specific material, the latter shall prevail.<br><br><h5>General</h5>In order to continuously improve the quality of the Website, we reserve the right to make changes to these Terms of Use from time to time at our sole discretion and it is your responsibility to review these Terms of Use regularly.<br><br>If any of these Terms and Conditions should be determined to be illegal, invalid or unenforceable by reason of the laws in any state or country in which they are intended to be effective, then to the extent that such Term or Condition is illegal, invalid or unenforceable, it shall be severed and deleted and the remaining Terms and Conditions shall remain in full force and continue to be binding and enforceable."
    document.body.appendChild(exitBtn);
	background.appendChild(mainContents);
	document.body.appendChild(background);
    return;
}
