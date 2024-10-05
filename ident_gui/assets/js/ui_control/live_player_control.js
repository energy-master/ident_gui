

const musicContainer = document.querySelector('.music-container-div');

const playBtn = document.querySelector('#play_live');
const prevBtn = document.querySelector('#prev_live');
const nextBtn = document.querySelector('#next_live');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
// const cover = document.querySelector('#cover');
const applicationProgressContainer = document.querySelector('#application-time-progress-container');

// music files array
var songs = ['No audio data.'];
var song_source = { "866104000427783051364654": "https://vixen.hopto.org/rs/snapshots/data_ext/snapshots/data/866104000427783051364654/sample_sound_.wav" };
var song_time = []; //s
// active music file index
let songIndex = 0;


// init songs
loadSong(songs[songIndex], song_source);



function get_song_seconds(songIndx) {
    total_seconds = 0;
    for (i = 0; i < songIndex; i++){
        total_seconds += song_time[i];
    }
    return total_seconds;
}

// load song
function loadSong(song, song_source) {
    console.log(song);
    title.innerText = song;
    if (song in song_source) {
        audio.src = `${song_source[song]}`;
    }

}

function loadSongTitle(song) {
    console.log(song);
    title.innerText = song;
    // if (song in song_source) {
    //     audio.src = `${song_source[song]}`;
    // }

}

// load playlist
function load_playlist(play_list, song_times_) {

    songIndex = 0;
    songs = play_list;
    song_times = song_times_;
    

}


load_playlist(["866104000427783051364654"], [5]);

function playSong() {

    
    loadSong(songs[songIndex], song_source);


    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}



function runApplicationClock() {


    time_acceleration = 1;
    application_data.acoustic_player.stop_seeking();

    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    application_data.application_clock.runClock();
    
    if (application_data.acoustic_player.paused) {
        application_data.acoustic_player.loadAndPlay();
    }
    //console.log(application_data.application_clock.application_time);

}


function pauseApplicationClock() {

    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    application_data.application_clock.stopClock();

    application_data.acoustic_player.pause();



}//time_acceleration

function fastForwardClock() {
    // musicContainer.classList.remove('play');
    // playBtn.querySelector('i.fas').classList.remove('fa-pause');
    // playBtn.querySelector('i.fas').classList.add('fa-play');
    // application_data.application_clock.stopClock();
    pauseApplicationClock()
    application_data.acoustic_player.pause();
    application_data.acoustic_player.set_seeking();
    time_acceleration = Math.max(time_acceleration + (time_acceleration * 1.5));
    application_data.application_clock.runClock();
    //tick();

    //console.log(time_acceleration);
}
function fastBackClock() {
    // musicContainer.classList.remove('play');
    // playBtn.querySelector('i.fas').classList.remove('fa-pause');
    // playBtn.querySelector('i.fas').classList.add('fa-play');
    // application_data.application_clock.stopClock();
    // time_acceleration = time_acceleration - (time_acceleration * 1.5);
    // console.log(time_acceleration);
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong() {
    // songIndex--;
    // if (songIndex < 0) { songIndex = songs.length - 1; }
    // loadSong(songs[songIndex], song_source);
    // playSong();
}

function nextSong() {
    // songIndex++;
    // if (songIndex > songs.length - 1) { songIndex = 0; }
    // loadSong(songs[songIndex], song_source);
    // playSong();
    
}



function acoustic_tick(e) {
    // get seconds from start of application time epoch
    const { duration, currentTime } = e.srcElement;
    updateSongProgress(currentTime, duration);
    // add seconds to application base time to get current time;
    //application_data.update(seconds_progressed);
}


function updateSongProgress(current_time, total_time) {
    

    
    var fraction_position = current_time / total_time;
    var percentage_position = fraction_position * 100;

    progress.style.width = `${percentage_position}%`;

}




/*
*
*   Update application time progress bar
*/


function updateApplicationProgress(current_application_time, total_time) {
    
    var app_progress = document.getElementById('application-time-progress');
    var fraction_position = current_application_time / total_time;
    var percentage_position = Math.min((fraction_position * 100), 100);
    
    if (application_data.application_clock.application_time > application_data.application_clock.application_focus_end_time) {
        application_data.application_clock.stopClock();
    }


    app_progress.style.width = `${percentage_position}%`;

}



function seekProgress(e) {
   

    application_data.acoustic_player.set_seeking();

    if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }

    const width = this.clientWidth;
    const clickX = e.offsetX;
   
    var ratio = (clickX / width);
    var duration = application_data.application_clock.application_focus_end_time - application_data.application_clock.application_focus_start_time;
    application_data.application_clock.application_time = application_data.application_clock.application_focus_start_time + Math.floor(ratio * duration);

    console.log(ratio, application_data.application_clock.application_time);

   
    clock_tick();
    application_data.acoustic_player.stop_seeking();
}

function playAcousticLabel(start_time){
    // alert(start_time);
    application_data.acoustic_player.set_seeking();
     if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }
    
    application_data.application_clock.application_time = start_time;
    clock_tick();
    application_data.acoustic_player.stop_seeking();
   

}

function quick_launch(start_time) {
    
 application_data.acoustic_player.set_seeking();
     if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }

    application_data.application_clock.application_time = start_time;
    clock_tick();
    application_data.acoustic_player.stop_seeking();

    console.log(start_time);
}






/*
*
*   Update application time progress bar
*/


function updateClock() {
    currentTime = application_data.application_clock.application_time;
    console.log(`current time ${currentTime}`);
    time_str = time_string(currentTime);

    var el = document.getElementById("display-time");
    console.log(el);
    el.innerHTML = `${time_str[1]}<span style="font-size:0.8em">000</span>`;
    //el.innerHTML = "fsadf";

}





// events
playBtn.addEventListener('click', () => {
    alert("play");
    // if (application_data == null) {
    //     alert("Application clock not set.");
    //     return (0);
    // }

    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        //pauseSong();
        // pauseApplicationClock();
    }
    else {
        //playSong();
        // runApplicationClock();
    }
})




// events
nextBtn.addEventListener('click', () => {

    // if (application_data == null) {
    //     alert("Application clock not set.");
    //     return (0);
    // }

    // fastForwardClock();
})

// events
prevBtn.addEventListener('click', () => {

    // if (application_data == null) {
    //     alert("Application clock not set.");
    //     return (0);
    // }

    // fastBackClock();
})


// applicationProgressContainer.addEventListener('click', seekProgress);

// prevBtn.addEventListener('click', prevSong);
// nextBtn.addEventListener('click', nextSong);
// audio.addEventListener('timeupdate', acoustic_tick);


