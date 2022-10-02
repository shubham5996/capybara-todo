function clock() {// We create a new Date object and assign it to a variable called "time".
  var time = new Date(),
      
      // Access the "getHours" method on the Date object with the dot accessor.
      hours = time.getHours(),
      
      // Access the "getMinutes" method with the dot accessor.
      minutes = time.getMinutes();
      
  
  document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes);
    
    function harold(standIn) {
      if (standIn < 10) {
        standIn = '0' + standIn
      }
      return standIn;
    }
  }
  setInterval(clock,1000)



var curr_track = document.createElement('audio');

function playTrack() {
// Play the loaded track

  curr_track.play();
  isPlaying= true;
}

function pauseTrack() {
// Pause the loaded track

curr_track.pause();
isPlaying = false;
}
function playButtonChange() {

playButton.style.display = 'none';
pauseButton.style.display = 'block';
playTrack();

}

function pauseButtonChange() {

pauseButton.style.display = 'none';
playButton.style.display = 'block';
pauseTrack();
}

var tracks = ['biscuit.mp3', 'onion.mp3', 'dreamland.mp3', 'home.mp3', 'picnic.mp3', 'teapot.mp3', 'donut.mp3'];
var len_tracks = tracks.length;
var trackIndex = 0;
var isPlaying = false;
var playButton = document.querySelector('#play-button');
var pauseButton = document.querySelector('#pause-button');
var src = 'static/todo/songs/' + tracks[trackIndex];
var song_name = document.querySelector('#song-name');
song_name.innerHTML = tracks[trackIndex].slice(0, -4);

curr_track.src = src;
curr_track.load();


function prevButtonChange() {
pauseTrack();
trackIndex = (trackIndex+1)%len_tracks;
next_song_path = 'static/todo/songs/' + tracks[trackIndex];
curr_track.src = next_song_path;
curr_track.load();
playTrack();
song_name.innerHTML = tracks[trackIndex].slice(0, -4);
playButton.style.display = 'none';
pauseButton.style.display = 'block';
// player.classList.toggle("resume");
}

function nextButtonChange() {
pauseTrack();
if (trackIndex == 0) {
  trackIndex = len_tracks - 1;
}
else {
  trackIndex = trackIndex - 1;
}
next_song_path = 'static/todo/songs/' + tracks[trackIndex];
curr_track.src = next_song_path;
curr_track.load();
playTrack();
song_name.innerHTML = tracks[trackIndex].slice(0, -4);
playButton.style.display = 'none';
pauseButton.style.display = 'block';
// player.classList.toggle("resume");
}

curr_track.addEventListener("ended", () => {
  pauseTrack();
  curr_track.currentTime = 0;
  playTrack();
});
// location thingy

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     console.log("geolocation not supported");
//   }
// }

// function showPosition(position) {
//   var lat = position.coords.latitude;
//   var lon = position.coords.longitude;
//   fetch(`http://api.weatherstack.com/current?access_key=0fac605895f9b6d4e9220efb5db3c33a&query=${lat},${lon}`).then(
//   (response) => response.json()
// ).then(
//   (data) => console.log(data['current']['temperature'])
// );
// }

// getLocation();
// showPosition();

  

function updateNotes() {
  text = document.querySelector('#notes-box').value;
  fetch('/notes', {
    method: 'POST',
    body: JSON.stringify(text)}).then(
      () => {});
    }
  
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#play-button').addEventListener('click', playButtonChange);
  document.querySelector('#pause-button').addEventListener('click', pauseButtonChange);
  document.querySelector('#prev-button').addEventListener('click', prevButtonChange);
  document.querySelector('#next-button').addEventListener('click', nextButtonChange);
});


window.onload = function () {
  var today = new Date();


  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;
  document.getElementById("msg").innerHTML = today;
}

var count = 5;

add_task(); // Call the add_task function
delete_task(); // Call the delete_task function

function add_task() {

  $('.add-new-task').submit(function(){
    var new_task = $('.add-new-task input[name=new-task]').val();
    count = count + 1;
    var print = '<li><span>' + new_task + '</span><button id="' + count + '" class="delete-button">X</button></li>';
    
    if(new_task !== ''){
      $('.add-new-task input[name=new-task]').val('');
      $(print).appendTo('.task-list ul').hide().fadeIn();
      delete_task();
    }

    fetch('/tasks', {
      method: "POST", 
      body: JSON.stringify({"add" : new_task})
    }).then(
      () => {});
    return false;
  });
}

function delete_task() {
  $('.delete-button').click(function(){
    var current_element = $(this);
    var id = $(this).attr('id');
    current_element.parent().fadeOut("fast", function() { $(this).remove(); });
    fetch('/tasks', {
      method: "POST", 
      body: JSON.stringify({"delete" : current_element.attr('name')})
    }).then(
      () => {});
    
  }
  );
  
}


function hide(name){
  var x = document.getElementById(name);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  } 
}

i=0;
setInterval(function qoutes(){
  const array_qoute = ["You can do it! ","Don't give up","Keep up the good work! ","You are almost there! ", "Every problem has a creative solution.", "Learn to rest, not to quit.", "Be patient. Things will work out.", "There will always be a way."];    
    document.getElementById('qoutes').innerHTML =array_qoute[i];
    i++;
    if (i >(array_qoute.length-1)){
      i=0;
    }
}, 10000);
setInterval(updateNotes, 1000);

var btn1 = document.getElementById('btn_notes');
var notes = document.getElementById('notes');

btn1.addEventListener('click', function() {
notes.classList.toggle('hide');
});


var btn2 = document.getElementById('btn_task_list');
var task_list = document.getElementById('task_listt');

btn2.addEventListener('click', function() {
  task_list.classList.toggle('hide');
});

var btn3 = document.getElementById('btn_qoutes');
var qoutes = document.getElementById('qoutes');

btn3.addEventListener('click', function() {
  qoutes.classList.toggle('hide');
});

var btn4 = document.getElementById('btn_palette');
var palette = document.getElementById('palette_holder');

btn4.addEventListener('click', function() {
  palette.classList.toggle('hide');
});

var btn5 = document.getElementById('settings');
var settings = document.getElementById('navbar');

btn5.addEventListener('click', function() {
  settings.classList.toggle('hide');
});



document.getElementById('lavendar').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='lavendar');
});

document.getElementById('red').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='red');
});

document.getElementById('blue').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='blue');
});


document.getElementById('pink').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='pink');
});


document.getElementById('yellow').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='yellow');
});

document.getElementById('green').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='green');
});

document.getElementById('orange').addEventListener('click', function() { 
  var container = document.getElementById('containerr');
  var currentTheme = container.getAttribute('data-theme');
  container.setAttribute('data-theme', currentTheme ='orange');
});

function toggleFullScreen(elem) {
  if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
  