var setSong = function(songNumber){
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = parseInt(currentAlbum.songs[songNumber-1]);
};

var getSongNumberCell = function(num) {
  return $('.song-item-number[data-song-number="' + num + '"]')
}

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';

  var $row = $(template);

  var clickHandler = function() {

    var songNumber = parseInt($(this).attr('data-song-number'));

    if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      updatePlayerBarSong();
      console.log("currently playing song number is not null");
      console.log(currentlyPlayingCell);
      console.log(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);

    }


    if (currentlyPlayingSongNumber !== songNumber) {
      $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      updatePlayerBarSong();
      console.log("currently playing song number is not the song number you're clicking");
      console.log(currentlyPlayingCell);
      console.log(currentlyPlayingSongNumber);
      console.log(songNumber);
    } else if (currentlyPlayingSongNumber === songNumber) {
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      setSong(null);
    }

  };

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    console.log("songNumber type is " + typeof songNumber + "\n and "
      + "currentlyPlayingSongNumber type is " + typeof  
      + currentlyPlayingSongNumber);
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  };
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
  };
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
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

var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null; 
var currentSongFromAlbum = null;

var nextSong = function() {
    
  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  // Note that we're _incrementing_ the song here
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  // Set a new current song
  setSong(currentSongIndex + 1);

  // Update the Player Bar information
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
  $('.main-controls .play-pause').html(playerBarPauseButton);

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber+1);
  var $lastSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber-1);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function() {

  var getLastSongNumber = function(index) {
    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  //decrement
  currentSongIndex--;

  if (currentSongIndex < 0) {
  currentSongIndex = currentAlbum.songs.length - 1;
  }

  // Set a new current song
  setSong(currentSongIndex + 1);

  // Update the Player Bar information
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
  $('.main-controls .play-pause').html(playerBarPauseButton);

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber-1);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

};

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function(){
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  updatePlayerBarSong();
  
});


