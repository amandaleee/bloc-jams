var collectionItemTemplate = 
+	'<div class="collection-album-container column fourth">' 
+	' <img src="assets/images/album_covers/01.png"/>'
+	' <div class="collection-album-info caption">'
+	'   <p>'
+	'      <a class="album-name" href="album.html">The Colors</a>'
+	'      <br/>'
+	'      <a href="#">Pablo Picasso</a>'
+	'      <br/>'
+	'      X songs'
+	'      <br/>'
+	'    </p>'
+	'  </div><!--/collection-album-info-->'
+	'</div><!--/collection-album-container-->';

window.onload = function(){
	var collectonContainer = document.getElementsByClassName('album-covers')[0];
	collectonContainer.innerHTML = '';
	for (var i = 0; i < 12; i++) {
		collectionContainer.innerHTML += collectionItemTemplate;
	}
}