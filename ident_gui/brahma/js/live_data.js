


var play_state = 0;
var last_time = "undefined";
var status = -1;




/*-------------
*
*   API
*
*--------------- */



const get_last_file_data = () => {
    var file_api_url = "https://marlin-network.hopto.org/api/v1/data/grablive";
    return new Promise((resolve, reject) => {
        success = false;
        $.post(file_api_url, function (data) {

            console.log(data);
            // build_games_table(data['data']);
            BuildAcousticData(data['filename']);
            var last = last_time;
            update_last(last);
            success = true;
            if (success) {
                resolve(success);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}

const connect = () => {
    var file_api_url = "https://marlin-network.hopto.org/api/v1/data/connectlive";
    return new Promise((resolve, reject) => {
        success = false;
        $.post(file_api_url, function (data) {

            console.log(data);
            // build_games_table(data['data']);
            // BuildAcousticData(data['filename']);
            success = true;
            if (success) {
                resolve(data);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}

const disconnect = () => {
    var file_api_url = "https://marlin-network.hopto.org/api/v1/data/connectstop";
    return new Promise((resolve, reject) => {
        success = false;
        $.post(file_api_url, function (data) {

            console.log(data);
            // build_games_table(data['data']);
            // BuildAcousticData(data['filename']);
            success = true;
            if (success) {
                resolve(data);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}

const get_status = () => {
    var file_api_url = "https://marlin-network.hopto.org/api/v1/data/status";
    return new Promise((resolve, reject) => {
        success = false;
        $.post(file_api_url, function (data) {

            console.log(data);
            var status = null;
            status = data['status'];
            // build_games_table(data['data']);
            // BuildAcousticData(data['filename']);
            update_status(status);
            success = true;
            if (success) {
                resolve(status);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}

// function connect() {
//     connect().then((data)=> {
//         alert(data);
//     });
// }

function poll_data() {
    // console.log("running");
    if (play_state == 1) { 
        get_last_file_data().then((data) => {
            get_status().then((data) => {
                
            });
        });
    }

}

const interval = setInterval(function() {
    // method to be executed;
    poll_data();
 }, 1000);


var sample_rate = 360000;
filepath = "https://marlin-network.hopto.org/marlin-prototype/prototype_data/_20240625_105714_156.wav";
/*-------------
*
*   UI
*
*--------------- */

var wavesurfer = null;

async function BuildAcousticData(filepath) {
    show_loader_div("acoustic-loader-data");
    console.log("building ")
    wavesurfer = WaveSurfer.create({
            container: document.querySelector("#acoustic-data"),
            waveColor: '#4F4A85',
            progressColor: '#cc3359',
            barWidth: 10,
            barRadius: 10,
            url: filepath,
            sampleRate: Math.min(sample_rate, 190000),
            // sampleRate: Math.min(sample_rate)
    })
    const Spectrogram = (await import("https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.esm.js")).default;
   
    wavesurfer.registerPlugin(
        Spectrogram.create({
            container: document.querySelector("#acoustic-data"),
            labels: true,
            height: 400,
            colorMap: colors['jet'],
            splitChannels: true,
            fftSamples: 8192,
               
        }));


    wavesurfer.on('ready', () => {
          hide_loader_div("acoustic-loader-data");
    });

    wavesurfer.on('interaction', () => {
        wavesurfer.play()
    });




}


function update_status(status){
    el = document.getElementById('status-tag');
    el.innerHTML = status;
}

function update_last(last){
    el = document.getElementById('last-tag');
    el.innerHTML = status;
}

function update_access() {
    
}



//BuildAcousticData(filepath);
// get_last_file_data();
// get_status();
//poll_data();
get_last_file_data();
