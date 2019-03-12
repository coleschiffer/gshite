function download(value) {
	var zip = new JSZip();
	var html = '<!DOCTYPE html><html><head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><title></title> <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> <style type="text/css"> a{color: inherit !important; text-decoration: none;}a:hover{color: inherit !important; text-decoration: none;}</style> <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script> <script src="http://pretend.life/socialsheet.js"></script> <script type="text/javascript">load("https://spreadsheets.google.com/feeds/list/'+ value + '/1/public/values?alt=json");</script></head><body><div class="container-fluid" id="body"></div></body></html>';
	var index = zip.folder("website");
	console.log(value);
	index.file("index.html", html);
	zip.generateAsync({type:"blob"})
	.then(function(content) {
	    // see FileSaver.js
	    saveAs(content, "socialsheet.zip");
	});
}

