var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { title: 'Blue', duration: '4:26' },
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21'},
    { title: 'Magenta', duration: '2:15'}
  ]
};
var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21'},
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15'}
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';

  return template;
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

var $songListContainer = $('.album-view-song-list');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var $songRows = $('.album-view-song-item');

var currentlyPlayingSong = null;

$(window).load(function(){
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
    songRows[i].addEventListener('click', function(event) {
      // Event handler call goes here
      console.log("clicked");
      clickHandler(event.target);
    });
  }
});

var findParentByClassName = function(element, targetClass) {
  if (element) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass && currentParent.className !== null) {
      currentParent = currentParent.parentElement;
    }
    return currentParent;
  }
};

var getSongItem = function(element) {
  switch (element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }  
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong ===songItem.getAttribute('data-song-number')){
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  }
};