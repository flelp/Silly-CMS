getpage = function() {
	return new URLSearchParams(window.location.search).get('p') || 'index.md';
}

download = function(p) {
    fetch(p).then(function(r) {
		if (r.ok) {
			return r.text().then(function(text) {
				document.querySelector('main').innerHTML = convert(text);
			});
		} else {
			document.querySelector('main').innerHTML = convert('# Whoops!\n404-ish.');
		}
	}).catch(function(e) {
		document.querySelector('main').innerHTML = convert('# Whoops!\n' + e.toString());

	});
}

convert = function(md) {
	var converter = new showdown.Converter({tables: true}),
		html = converter.makeHtml(md);
	return html;
}

document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('nav').addEventListener("click", function(e) {
		e.preventDefault();
		window.history.pushState(null, null, '?p=' + e.target.attributes.href.value)
		download(e.target.href);
	});
  
	window.addEventListener("popstate", function(e) {
		download(getpage());
	});

	download(getpage());
});

