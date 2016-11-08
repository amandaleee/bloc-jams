var setSong = function(songNumber){
  //replaces where we set currentlyPlayingSongNumber and currentSongFromAlbum
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber-1];
  console.log("song has been set");
}; 
var getSongNumberCell = function(number) {
  //replaces where we get .song-item-number as a selector - 198-99, 165-66, 63
  // var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';
  
  var $row = $(template);

  var onHover = function(event) {
    // console.log("on hover");
    var songNumberCell = $(this).find('.song-item-number');
<<<<<<< HEAD
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
=======
    var songNumber = songNumberCell.attr('data-song-number');
    setSong(songNumber);

>>>>>>> updates to album.js

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
    
    if ($(this).parent('.album-view-song-item')) {
      songNumberCell.innerHTML = playButtonTemplate;
      var songItem = this; //this row
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSongNumber) {
        // songItem.innerHTML = playButtonTemplate; - doesn't work bc songItem is the row, not the cell
        $(this).find(songNumberCell).innerHTML = playButtonTemplate;
      }
    }
  };

  var offHover = function(event) {
    // console.log("off hover");
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
    }
    if ($(this).parent('.album-view-song-item')) {
      songNumberCell.innerHTML = songNumber;
      var songItem = this; //this row 
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSongNumber) {
        // songItem.innerHTML = pauseButtonTemplate; - doesn't work bc songItem is the row, not the cell
        $(this).find(songNumberCell).innerHTML = playButtonTemplate;
      }
    }
  };

  var clickHandler = function(event) {

    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt($(this).attr('data-song-number')); 

    if (currentlyPlayingSongNumber !== null) { //if there's a song playing
      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if (currentlyPlayingSongNumber !== songNumber) { //if the currentlyplaying song is not the song that was clicked on.
      $(this).html(pauseButtonTemplate); //change it to pause
      currentlyPlayingSongNumber = songNumber;  //update currentlyplayingsongnumber
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];  //update the number
      updatePlayerBarSong(); //change the playerbar
    } else if (currentlyPlayingSongNumber === songNumber) {
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
    }
  };


  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};
var $songRows = $('.album-view-song-item');

var setCurrentAlbum = function(album) {
  // console.log("current album is being set");
  currentAlbum = album; 
  //the objects on the page
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  // identify the child node of element; the text() method sets their value 
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);


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

var currentlyPlayingSong = null;
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var nextSong = function() {  
  //this is actually getting the previous song, not the last song of the album.
  var getLastSongNumber = function(index) {
    return (index == 0 ? currentAlbum.songs.length : index);
    //if index is 0, return the last song; 
    //otherwise, return the index
  };
  //the index of the current song
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  //increment the index
  currentSongIndex++;
  //if currentsongindex goes higher than the songs on the album, kick it back to 0 [the first song on the album]
  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }
  // Set a new current song number
  currentlyPlayingSongNumber = currentSongIndex + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

  // Update the Player Bar information
  updatePlayerBarSong();

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  console.log("last song number is " + lastSongNumber);
  //either returns index, or current album length.  
  //change the last song number/button template on the next song. 
  var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);   
};

var previousSong = function() {
  //this is the previous song, again. 
  var getLastSongNumber = function(index) {
    return (index == (currentAlbum.songs.length - 1) ? 1 : index + 2);
    //if index is the length of the album minus 1, return 1
    //otherwise, return index + 2
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  // decrement
  currentSongIndex--;

  if (currentSongIndex < 0) { //if currentsongindex is less than 0, 
    currentSongIndex = currentAlbum.songs.length - 1;
    //make it equal songs.length - 1
  }

  // Set a new current song
  currentlyPlayingSongNumber = currentSongIndex + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

  // Update the Player Bar information
  updatePlayerBarSong();

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
    
};

$(document).ready(function(){
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});