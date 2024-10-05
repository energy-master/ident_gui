
var snapshot_data = null;
var run_api_url = "https://vixen.hopto.org/rs/api/v1/run/bulk";

play_state = 0;
console.log('game render v1');

demo_frames = {};
active_frame = 0;
number_frames = 0;
demo_frame_times = null;
number_features = 0;
demo_avg_energy = [];
rolling_energy_frame_number = 0;
var rolling_time_frame_number = 0;
var target= "harbour porpoise";
var activation_energy = 0.8;

function BuildRenderer() {
    // create configuration object
    var config = {
        container: document.getElementById('heatmap-container'),
        radius: 10,
        maxOpacity: 1,
        minOpacity: 0.1,
        blur: 0.1,
        // gradient: {
        //     // enter n keys between 0 and 1 here
        //     // for gradient color customization
        //     '.2': 'blue',
        //     '.8': 'red',
        //     '.5': 'white'
        // }
    };
    
    heatmapInstance = h337.create(config);
    console.log("built");
    
}
var frame_label_hit = false;
function UpdateRender() {

    var width = document.getElementById('heatmap-container').offsetWidth;
    //debug / build with random data
    //data = InitRandom(width);
    data = build_render_data(width, demo_frames[active_frame]);
    console.log(demo_frames[active_frame]);
    // now grab data from brahma framework

    heatmapInstance.setData(data);  
    //hits
    frame_label_hit = false;
    check_label(demo_frame_times[active_frame]);
    detector(demo_frames[active_frame]);


}

function detector(data) {
    
    // console.log(data);
    for (var i in data) {
        if (data[i] > activation_energy) {
            var hit = {
                'target': target,
                'time': demo_frame_times[active_frame]
            }
            add_hit(hit, true);
            break;
        }
    }

}

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
// function UpdateFrame() {
    
// }

function GetData(snapshot_id) {


    url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/group_energies_${snapshot_id}.json`;
    url_times = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/group_times_${snapshot_id}.json`;
    
   
    var exists = true;
    try {
        fetch(url)
            // .then((response) => {
            //     response.json();
            //     // console.log(response.json());
            //     // console.log(response.status);
            //     if (response.status == 404) {
            //         console.log("exit");
            //         exists = false;
            //     }
                
            // })
            .then((response) => response.json())
            .then((json) => {
                
                if (exists == true) {
                    
                    for (feature in json) {
                        number_features += 1;
                        //console.log(feature)
                        e_data = json[feature];
                        for (frame_number in e_data) {
                        
                            //console.log(frame_number)
                            if (demo_frames[frame_number] == null) {
                                demo_frames[frame_number] = [];
                                number_frames = Math.max(number_frames,frame_number);
                            }
                            // console.log(rolling_time_frame_number);
                            demo_frames[frame_number].push(e_data[frame_number]);
                            rolling_energy_frame_number += 1;

                        }

                    }

                    // for (frame_number in demo_frames) {

                    //     var stat = average(demo_frames[frame_number]);
                    
                    //     demo_avg_energy.push(stat.toFixed(2));
                    // }
            
                    // console.log(demo_frames);
                    // console.log(number_frames);
                    //generate_spectrogram();
                    fetch(url_times)
                        .then((response) => response.json())
                        .then((times) => {
                            //console.log(times);
                            
                            
                            demo_frame_times = times;
                            // for (time_entry in times) {
                                
                            // }


                            BuildRenderer();
                            console.log(demo_frames);
                            UpdateRender();
                        });
                


                }

            }
            );
    }
    catch {
        console.log(`url doesnt't exist in data repo`);
    }
    
    



}

function InitRandom(dim_length) {
    
    data = [];
    console.log("building random");
    for (i = 0; i < dim_length; i++){
        for (j = 0; j < dim_length; j++){
            var data_pt = {
                x: i+10,
                y: j+10,
                value: Math.random()
            }
            // console.log(i, j);
            data.push(data_pt);
            j += 5;
        }
        i += 5;
    }
    d_data = {
        min: 0,
        max: 1,
        data: data
    }

    console.log(data.length);
    return d_data;
}

function build_render_data(dim_length, e_data){

    data = []
    console.log("building informed data");
    feature_idx = 0;
    e_data_size = e_data.length;
    for (i = 0; i < dim_length; i++){
        for (j = 0; j < dim_length; j++){
            if (feature_idx > e_data_size - 1) {
                // feature_idx = e_data_size - 1;
                // feature_idx = 0;
                feature_idx = Math.floor(Math.random() * e_data_size);
                
            }
                var data_pt = {
                    x: i + 10,
                    y: j + 10,
                    value: e_data[feature_idx]
                }
            
           
            // console.log(i, j);
            data.push(data_pt);
            feature_idx += 1;
            j += 5;
        }
        i += 5;
    }

    d_data = {
        min: 0,
        max: 1,
        data: data
    }

    console.log(data.length);
    return d_data;

}


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


var app_ss_ids = [];
if (snapshot_id != "all") {
    GetData(snapshot_id);    
}
else {
    //
    // for general live play -> obrain frame number from time vector
    //

    // get all files
    //alert(ss_ids);
    
    console.log(ss_ids);
    // loop over all files and generate frame data
    app_ss_ids = ss_ids.split(',');
    console.log(app_ss_ids);
    app_ss_ids = ['595319575884544847440835','711602635032502887898504'];
    for (ss_idx in app_ss_ids) {
        GetData(app_ss_ids[ss_idx]);
    }

}



// BuildRenderer();
// UpdateRender();
// function tick() {
    
//     console.log("render");
//     UpdateRender();
        
// }

tick_interval = 500;
// setInterval(play, tick_interval);
// console.log("done");
// tick();
play_thread_id = null;
document.getElementById("play").onclick = function() {play_control()};
function play_control() {

    if (snapshot_id != 'all'){

        if (play_state == 0) {
        
            play_thread_id = setInterval(play, tick_interval);
            var html = `<i class="fas fa-pause "></i>`;
            var el = document.getElementById("play");
            el.innerHTML = html;
            play_state = 1;
        }
        else {

            clearInterval(play_thread_id);
            var html = `<i class="fas fa-play "></i>`;
            var el = document.getElementById("play");
            el.innerHTML = html;
            play_state = 0;
        }
    }
    else {
        if (play_state == 0) {
        
            play_thread_id = setInterval(play_live, tick_interval);
            var html = `<i class="fas fa-pause "></i>`;
            var el = document.getElementById("play");
            el.innerHTML = html;
            play_state = 1;
        }
        else {

            clearInterval(play_thread_id);
            var html = `<i class="fas fa-play "></i>`;
            var el = document.getElementById("play");
            el.innerHTML = html;
            play_state = 0;
        }
    }
}



function play_live() {
    
    //active_frame += 1
    //get active frame from application clock

    var app_time_ms = getCookie('clock');
    console.log(app_time_ms);
    active_frame = get_frame_from_time(app_time_ms);
    console.log(active_frame);
    return 0;
    if (active_frame > number_frames)
    {
        active_frame = 0;
        delete_hits();
    }
    var el = document.getElementById("frame_number");
    el.innerText = active_frame;

    console.log(demo_frame_times[active_frame]);
    var el = document.getElementById("time_display");
    el.innerText = demo_frame_times[active_frame] + `  < ${demo_avg_energy[active_frame]} >  ${number_features}`;
    console.log(number_frames);
    // if (active_frame > number_frames)
    // {
    //     active_frame = 0;
    // }
    UpdateRender();

}


function play()
{
    
   


    active_frame += 1
    if (active_frame > number_frames)
    {
        active_frame = 0;
        delete_hits();
    }
    var el = document.getElementById("frame_number");
    el.innerText = active_frame;

    console.log(demo_frame_times[active_frame]);
    var el = document.getElementById("time_display");
    el.innerText = demo_frame_times[active_frame];// + `  < ${demo_avg_energy[active_frame]} >  ${number_features}`;
    console.log(number_frames);
    // if (active_frame > number_frames)
    // {
    //     active_frame = 0;
    // }
    UpdateRender();

    


}

function stop()
{
}



/* Send Run Command */



const run_bots = (snapshot_id, market, user, location_str, base_name) => {

    return new Promise((resolve, reject) => {
        success = false;

        var post_data = {
            "snapshot_id"   : snapshot_id,
            "bot_id"        : "bulk",
            "user"          : user,
            "location"      : location_str,
            "base_name"     : base_name,
            "market"        : market
        }

        console.log(JSON.stringify(post_data));
        
        $.post(run_api_url, JSON.stringify(post_data),function (data) {

            console.log("success");
            
            success = true;
            
            if (success) {
                resolve(JSON.stringify(data));
            } else {
                reject(Error("Error in Game Run"));
            }

        });


    }); // end of promise dec

}

function run_bots_event(){
    

    // show_loader_div('load_div');
    //get market

    var el = document.getElementById('run-div');
    // el.innerText = "running..."

    var el = document.getElementById('market_selector');
    market = el.value;
    console.log(market);
    
    var el = document.getElementById('run_button');
    var html = `<div id="run-div" class="center" ><i class="fas fa-spinner"></i></div>`;
    el.innerHTML = html;


    //alert(market)
    if (market != "none") {
        run_bots(snapshot_id, market, user, snapshot_location, "").then((data) => {
            alert("done");
            GetData(snapshot_id);
            // hide_loader_div('load_div')
            var el = document.getElementById('run_button');
            var html = `<div id="run-div" class="center" onclick="run_bots_event()"><i class="fas fa-play "></i></div>`;
            el.innerHTML = html;

         });
    }
    else {
        alert("Please select a valid target.");
        var el = document.getElementById('run_button');
        var html = `<div id="run-div" class="center" onclick="run_bots_event()"><i class="fas fa-play "></i></div>`;
        el.innerHTML = "";
        el.innerHTML = html;

    }
}


function generate_spectrogram() {
    //var acoustic_snapshot = application_data.acoustic_data.get_snapshot(ss_id);
  
    var identifier = Math.floor(Math.random() * 99999);
    
   
    // get parameters
    // var min_f = parseInt(document.getElementById(`min_f_${acoustic_snapshot.snapshot_id}`).value);
    // var max_f = parseInt(document.getElementById(`max_f_${acoustic_snapshot.snapshot_id}`).value);
   

    // var fft_samples = parseInt(document.getElementById(`fft_sample_select_${acoustic_snapshot.snapshot_id}`).value);
    


    var post_data = {
        "snapshot_id": snapshot_id,
        "location": snapshot_location,
        "identifier": identifier,
        "f_min": "",
        "f_max": "",
        "n_fft" : ""
    }

    var run_spec_url = "https://vixen.hopto.org/rs/api/v1/run/spec"

    console.log(JSON.stringify(post_data));

    $.post(run_spec_url, JSON.stringify(post_data),function (data) {
       
        success = true;
        //build_spec_page(identifier);
        var html = `<img src="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/spec/${identifier}.png" alt="Spectrogram Loading" style="width:100%"></img>`;
        var el = document.getElementById("spec_img");
        el.innerHTML = html;
    });


}




/*
*   Hits table
*/

var w;
build_show_hits();
function add_hit(hit, search=false) {
    var tbodyRef = w.document.getElementById('hits_table').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    if (search) {
        if (frame_label_hit) {
            console.log(newRow);
            newRow.style.background = 'green';
            newRow.style.color = 'white';
        }
        if (!frame_label_hit) {
            console.log(newRow);
            newRow.style.background = 'red';
            newRow.style.color = 'white';
        }

    }
    // Insert a cell at the end of the row
    var newCell = newRow.insertCell();
    // Append a text node to the cell
    var newText = document.createTextNode(hit.time);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    // Append a text node to the cell
    newText = document.createTextNode(hit.target);
    newCell.appendChild(newText);

}


function delete_hits() {
    var tableHeaderRowCount = 1;
    var table = w.document.getElementById('hits_table');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}





function build_show_hits() {
    

    var html = `
    
    <div class="container">
    <table id="hits_table" class="table table-hover">
    <thead>
    
    <row>
    <td>
    time
    </td>
     <td>
    target
    </td>
    </row>
    
    </thead>
    <tbody>
    </tbody>
    </table>
    
    
    </div>
    
    `;



    var page_html = `
    <html><head>
            <html><head><title>Decisions</title><link rel="stylesheet" type="text/css" href="styles.css"></head><body>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

            <link href="https://vixen.hopto.org/rs/ident_app/ident_gui/assets/css/globals.css" rel="stylesheet">
            </head>
            <body>
            ${html}
            </body>
            </html>
            
            
    `;

    



    var title = `decisions_${Math.floor(Math.random() * 99999)}`;
    const windowFeatures = "left=200,top=100,width=700,height=500";
    w=window.open("", title,windowFeatures);
    w.document.body.innerHTML = page_html;


}


tolerance = 1000;

var time_tolerance = 500;

function get_frame_from_time(app_time_ms) {
    console.log(demo_frame_times)
    
    for (const [key, value] of Object.entries(demo_frame_times)) {
        console.log(`${key}: ${value}`);


        time = value;
        //var entries = Object.entries(demo_frame_times[data_time_idx]);

        
        //time = entries.value;
        //console.log(time);
        var target_time = new Date(time);
        var target_time_ms = target_time.getTime();
        if (Math.abs(app_time_ms - target_time_ms) < time_tolerance) {
            console.log('hit');
            return data_time_idx;
        }
    }
    return active_frame;
}



function check_label(time) {
    // console.log(time);
    var target_time = new Date(time);
    // console.log(target_time);
    // console.log(time);
    var target_time_ms = target_time.getTime();
    console.log(target_time_ms);
    //$snapshot_id
    //$snapshot_location
    for (idx in labelled_data) {
        if (labelled_data[idx].listener_location == snapshot_location_) {
           
            // console.log(labelled_data[idx]);
            //var ref_time = (labelled_data[idx].start_time_ms + labelled_data[idx].end_time_ms) / 2;
            
           
            sig_start_ms = labelled_data[idx].start_time_ms;
            sig_end_ms = labelled_data[idx].end_time_ms; 
            var ref_time = (parseFloat(sig_start_ms) + parseFloat(sig_end_ms)) / 2;
            //console.log(sig_start_ms, sig_end_ms, ref_time);
            if (Math.abs(ref_time - target_time_ms) < tolerance) {
                var hit = {
                    'target': `label : ${labelled_data[idx].label}`,
                'time': demo_frame_times[active_frame]
                }
                frame_label_hit = true;
                add_hit(hit);
                   
                
            }

        }
    }
}

var labelled_data = null;




label_data_download().then((data) => {
   
    // console.log(data['data']);
    labelled_data = data['data'];

});

