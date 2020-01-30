// Generating content based on the template
var template = "<article>\n\
	<img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>\n\
	<h3>NAME</h3>\n\
	<ul>\n\
	<li><span>Course-Price:</span> <strong> price</strong></li>\n\

<li><span>Course-topic:</span> <strong> topic</strong></li>\n\


<li><span>Course-location:</span> <strong> location</strong></li>\n\

	<li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\


	\n\
	</ul>\n\
</article>";
var content = '';
for(var i=0; i<games.length; i++) {
	var entry = template.replace(/POS/g,(i+1))
		.replace(/SLUG/g,games[i].slug)
		.replace(/NAME/g,games[i].name)
		.replace(/price/g,games[i].price)
		.replace(/topic/g,games[i].topic)
		.replace(/location/g,games[i].location)
		.replace(/review/g,games[i].);
	entry = entry.replace('<a href=\'http:///\'></a>','-');
	content += entry;
};
document.getElementById('content').innerHTML = content;

// Registering Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/example/sw.js');
};

// Requesting permission for Notifications after clicking on the button
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			randomNotification();
		}
	});
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random()*games.length);
	var notifTitle = games[randomItem].name;
	var notifBody = 'This will cost you '+games[randomItem].price+'.';
	var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 30000);
};

// Progressive loading images
var imagesToLoad = document.querySelectorAll('img[data-src]');
var loadImages = function(image) {
	image.setAttribute('src', image.getAttribute('data-src'));
	image.onload = function() {
		image.removeAttribute('data-src');
	};
};
if('IntersectionObserver' in window) {
	var observer = new IntersectionObserver(function(items, observer) {
		items.forEach(function(item) {
			if(item.isIntersecting) {
				loadImages(item.target);
				observer.unobserve(item.target);
			}
		});
	});
	imagesToLoad.forEach(function(img) {
		observer.observe(img);
	});
}
else {
	imagesToLoad.forEach(function(img) {
		loadImages(img);
	});
}