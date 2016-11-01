//i'm confused because i think i'm not doing everything here that i'm supposed to be doing - like it would be helpful to have a listed feature set for what this is supposed to do, because following along with the code in the tutorial, i'm feeling like some functionality that had previously been there is now gone. 


var setSong = function(songNumber){
  currentlyPlayingSongNumber = parseInt(songNumber);
  //the currently playing song = the integer value of song Number, which is set...below.
};

var currentSongFromAlbum = parseInt(currentAlbum.songs[songNumber-1]);

var getSongNumberCell = function(num) {
  return $('.song-item-number[data-song-number="' + num + '"]')
  //return the jq object that is the song item number with data-song-number, setting the data attr here as the argument the function took in. 
}

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';

    //above - a template that takes in 3 params, and injects them into the template markup

  var $row = $(template);
  //making template into a jquery object

  var clickHandler = function() {

    var songNumber = parseInt($(this).attr('data-song-number'));
    //a var that is the integer value of data-song-number

    if (currentlyPlayingSongNumber !== null) {
      //if currentlyplayingsongnumber is not null, eg if there is a song playing
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      //run the getsongnumbercell function, with currentlyplayingsongnumber - so this makes the currentlyplayingcell and currentlyplayingsongnumber the same. 
      updatePlayerBarSong();
      //run the updateplayerbarsong function...this is somehow out of order i think
      
      console.log("currently playing song number is not null");
      console.log(currentlyPlayingCell);
      console.log(currentlyPlayingSongNumber);
      // some console logs because i want to make sure i've got this right. 

      
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
      //change the innerhtml of currentlyplayingcell to currentlyplayingsongnumber 
    }


    if (currentlyPlayingSongNumber !== songNumber) { //above - line 2 - currentlyPlayingSongNumber = parseInt(songNumber); - so in what case is this ever going to happen? the only time i can think of is when the mouse is hovering? if this is the case, why not use .hover() since we have the jq library; or better yet, we could actually do some of this in pure css using the content property
      $(this).html(pauseButtonTemplate); 
      //show the pause button template
      setSong(songNumber); 
      //set the song as the song number
      updatePlayerBarSong();
      //update the player bar
      console.log("currently playing song number is not the song number you're clicking");
      console.log(currentlyPlayingCell);
      console.log(currentlyPlayingSongNumber);
      console.log(songNumber);
      //buncha console logs
    } else if (currentlyPlayingSongNumber === songNumber) {//if the currentlyplayingsongnumber is the songnumber
      $(this).html(playButtonTemplate);//play button in the song number cell
      $('.main-controls .play-pause').html(playerBarPlayButton);//show the play button
      setSong(null);//why is this? because there would still be a currentlyplaying song number. 
    }

  };

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');//find the element w class .song-item-number
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));//get the val the data-song-number attr, and convert it to integer
    // console.log("songNumber type is " + typeof songNumber + "\n and "
      // + "currentlyPlayingSongNumber type is " + typeof  
      // + currentlyPlayingSongNumber);
    //checked the type there above
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }//if it's not currently playing, show the play button template. 
  };
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');//this is duplicative - i know we have to refactor this as part of the assignment.
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));//same
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }//if it's not currently playing, show the number. 
  };
  $row.find('.song-item-number').click(clickHandler);//call the clickhandler when someone clicks on the row
  $row.hover(onHover, offHover); //call the hover functions when someone hovers on the row. 
  return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  //get elements on the page and make them into jq objects
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
  //   the above line is giving me "Cannot read property 'title' of null" - this is probably because the current album isn't set yet? 
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

//below: templates, this is the easy stuff
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//what's the purpose of these null
var currentAlbum = null;
var currentlyPlayingSongNumber = null; 
var currentSongFromAlbum = null;

var nextSong = function() {
  var getLastSongNumber = function(index) { 
    //if index == 0, return the length of the album in songs; otherwise, get index 
    return (index == 0 ? currentAlbum.songs.length : index);
    //meaning if it's currently playing the first song, getLastSongNumber will return the last as tho it had been looped.
    //i'm confused about this syntax? i know the ternary, but the exercise had it without the () and that looks weird to me, not sure why. 
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  //increase the song
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    //eg if curretnsongindex has incremented past the length of the album, 
    currentSongIndex = 0; //then currentsongindex = 0. eg it loops, like above. 
  }

  // Set a new current song
  setSong(currentSongIndex + 1); //setSong is where we get the track number - hence the +1

  // Update the Player Bar information
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
  $('.main-controls .play-pause').html(playerBarPauseButton);

  //why do we need these below though? 
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber+1);
  var $lastSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber-1);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function() {

  var getLastSongNumber = function(index) {
    
    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;

    //so let's do the math here: 
    // getLastSongNumber(3); when currentAlbum.songs.length is 4
    // return (3 == currentAlbum.songs.length -1)? 1 : 3 + 2;
    //(3 == currentAlbum.songs.length -1) is true so it returns 1

    //another case: 
    // getLastSongNumber(3); when currentAlbum.songs.length is 6
    // return (3 == currentAlbum.songs.length -1)? 1 : 3 + 2;
    //(3 == currentAlbum.songs.length -1) is false so it returns 3+2 = 5
    // why does this work? is this an off-by-one thing that i can't get my head around? 
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  //decrement currentSongIndex
  currentSongIndex--;

  if (currentSongIndex < 0) { //we've decremented by 1 so if it's less than 0, it's the first song on the album
    currentSongIndex = currentAlbum.songs.length - 1; //so then the previous song is the last on the album. 
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


