// What we're doing here: 
// - move album data into fixtures.js
// - include that on album.innerHTML
// - track the current song
// - store album data
// -  hover events
// - use song data to update the currently playing bar
// - toggle between play and pause in the playing bar
// - track the index of the current song and use it to generate previousSong and nextSong
// - add event handlers for previous and next
// - use parseInt wherever you need to in order to make sure the song number is actually an integer. 



var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';

  var $row = $(template);
  var onHover = function(event) {
    // Placeholder for function logic
  };
  var offHover = function(event) {
    // Placeholder for function logic
  };
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
//the objects on the page
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');


  // identify the child node of element, nodeValue sets their value
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  // //clear the song list of all previous songs from previously-listened albums
  $albumSongList.empty();

  // add a row for each song in the album - see createSongRow function above. 
  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(document).ready(function(){
  setCurrentAlbum(albumPicasso);
  $songListContainer.on('mouseover', function(event) {
    // #1
    console.log(event.target);
    if (event.target.parentElement.className === 'album-view-song-item') {
      // turn number into play btn
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      var songItem = getSongItem(event.target);
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });

  for (var i = 0; i < $songRows.length; i++) {
    $songRows[i].on('mouseleave', function(event) {
      //this is why we have the data attr - we can still access it, even tho the innerhtml of the song number previously displayed on the page has turned into a play btn
      // this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      if (songItemNumber !== currentlyPlayingSong){
        songItem.innerHTML = songItemNumber;
      }
    });
    $songRows[i].on('click', function(event) {
      // Event handler call goes here
      console.log("clicked");
      clickHandler(event.target);
    });
  }
});
