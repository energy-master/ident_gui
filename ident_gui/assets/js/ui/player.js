


function BuildPlayer() {
    
    var el = document.getElementById("player");

    var html = `
    
    <div class="music-container-div">
        <div class="music-info">
            <h4 id="title">No audio loaded</h4>
            <div class="progress-container">
                <div class="progress">
                </div>
            </div>

        </div>
        <audio src="" id="audio"></audio>
        <div class="navigation">
            <button id="prev" class="action-btn">
                <i class="fas fa-backward"></i>
            </button>
            <button id="play" class="action-btn-big-selected">
                <i class="fas fa-play"></i>
            </button>
            <button id="next" class="action-btn">
                <i class="fas fa-forward"></i>
            </button>
        </div>

        <div id="application-time-progress-container">
            <div id="application-time-progress"></div>
          
        
           
           
        </div>
       
    </div>

    `;

    el.innerHTML = html;



   
}


function BuildPlayerLive() {
    
    var el = document.getElementById("player");

    var html = `
    
    <div class="music-container-div" style="z-index:1000">
        <div class="music-info">
            <h4 id="title">No audio loaded</h4>
            <div class="progress-container">
                <div class="progress">
                </div>
            </div>

        </div>
        <audio src="" id="audio"></audio>
        <div class="navigation">
            <button id="prev_live" class="action-btn">
                <i class="fas fa-backward"></i>
            </button>
            <button id="play_live" class="action-btn-big-selected">
                <i class="fas fa-play"></i>
            </button>
            <button id="next_live" class="action-btn">
                <i class="fas fa-forward"></i>
            </button>
        </div>

    
       
    </div>

    `;

    el.innerHTML = html;



   
}


function BuildClock() {
    
    var el = document.getElementById("clock");

    var html = `
        <div class="clock-container">
            <div class="clock">
            
                <span id="display-time">00:00:00.<span style="font-size:0.8em">000</span></span>
            
            </div>
        
        </div>
    `;

    el.innerHTML = html;
    


}


BuildPlayer();
BuildClock();