
// october pres version

var snapshot_data = null;
var run_api_url = "https://vixen.hopto.org/rs/api/v1/run/bulk";

play_state = 0;
console.log('game render v2');

demo_frames = {};
active_frame = 0;
number_frames = 0;
demo_frame_times = {};
number_features = 0;
demo_avg_energy = [];
rolling_energy_frame_number = 0;
rolling_time_frame_number = 0;



var target= "harbour porpoise";
var activation_energy = 0.9;
var pc_activation_energy = 20;
var pc_50 = 10;
var pc_75 = 10;



number_err = 0;
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


}
var frame_label_hit_b = null;
function UpdateRender() {

    var width = document.getElementById('heatmap-container').offsetWidth;
    //debug / build with random data
    //data = InitRandom(width);
    data = build_render_data(width, demo_frames[active_frame]);
    //console.log(demo_frames[active_frame]);
    // now grab data from brahma framework

    heatmapInstance.setData(data);
    //hits
    frame_label_hit_b = null;
    
    check_label(demo_frame_times[active_frame]);
    detector(demo_frames[active_frame]);


}

function detector(data) {

    //more complex hit here

    // console.log(data);
    var decision_made = false;
    for (var i in data) {
        if (data[i] > activation_energy) {
            var hit = {
                'target': target,
                'time': demo_frame_times[active_frame]
            }
            if (frame_search_hit.includes(active_frame)) {

                }
                else {
                    stats['number_decisions'] += 1;
                    stats['pc_hit'] = ((parseFloat(stats['number_correct'])/parseFloat(stats['number_decisions'])) *  100).toFixed(2);
      
                    decision_made = true;
                    frame_search_hit.push(active_frame);
                    add_hit(hit, true);
                }

            break;
        }
    }
    console.log(decision_made);
    if (decision_made){
        console.log('decision made');
        console.log(frame_label_hit_b);
        if (frame_label_hit_b){
            console.log('hurray');
            stats['number_correct'] += 1;
            stats['pc_hit'] = ((parseFloat(stats['number_correct'])/parseFloat(stats['number_decisions'])) *  100).toFixed(2);
        }
        if (frame_label_hit_b == false)
        {
            console.log(frame_label_hit_b);
            stats['number_wrong'] += 1;
        }
    }
    if (!decision_made){
        if (frame_label_hit_b){
            
            stats['number_missed'] += 1;
        }
    }

}

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
// function UpdateFrame() {

// }


var snapshots_loaded = {}
number_loaded = 0;

number_inside_frames = 0;
function GetData(snapshot_id) {


    url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/group_energies_${snapshot_id}.json`;



    var exists = true;

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
            .then((response) => {


                if (response.ok) {
                    return response.json();
                    response.json();
                }
                else {
                    number_err += 1;
                }
                    // throw new Error('Something went wrong');
            })
            .then((json) => {

                // if (exists == true) {
                    number_features = 0;
                    for (feature in json) {
                        number_features += 1;
                        //console.log(feature)
                        e_data = json[feature];
                        var count = 0;
                        for (frame_number in e_data) {
                            var current_frame = parseInt(frame_number) + parseInt(rolling_energy_frame_number)
                            //console.log(frame_number)
                            if (demo_frames[current_frame] == null) {
                                demo_frames[current_frame] = [];
                                number_frames = Math.max(number_frames, current_frame);
                            }
                            // console.log(rolling_time_frame_number);
                            demo_frames[current_frame].push(e_data[frame_number]);
                            //console.log(current_frame);
                            number_inside_frames = Math.max(number_inside_frames, frame_number);
                            //console.log(number_inside_frames);
                        }


                    }
                    // console.log(demo_frames);
                    //console.log(number_inside_frames);
                    rolling_energy_frame_number += parseInt(number_inside_frames);
                    // console.log(rolling_energy_frame_number);

                    for (frame_number in demo_frames) {

                        var stat = average(demo_frames[frame_number]);

                        demo_avg_energy.push(stat.toFixed(2));
                    }

                    // console.log(demo_frames);
                    // console.log(number_frames);
                    //generate_spectrogram();
                    // console.log("now getting times");

                    url_times = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/group_times_${snapshot_id}.json`;
                    console.log(url_times);
                    fetch(url_times)
                        .then((response) => response.json())
                        .then((times) => {
                            //console.log(times);


                            //demo_frame_times = times;
                            // for (time_entry in times) {
                            //     console.log(times);
                            // }

                            var count = 0;
                            for (const [key, value] of Object.entries(times)) {
                                var current_frame = parseInt(rolling_time_frame_number) + parseInt(count);

                                demo_frame_times[current_frame] = value;

                                count += 1;
                            }
                            rolling_time_frame_number += parseInt(number_inside_frames);
                            // console.log(rolling_time_frame_number);

                            // console.log(demo_frame_times);
                            number_loaded = number_loaded + 1;
                            snapshots_loaded[snapshot_id] = true;
                            // console.log(number_loaded);
                            // console.log(snapshots_loaded)ß;
                            // BuildRenderer();
                            // UpdateRender();
                             init_load();
                            // BuildRenderer();
                            // UpdateRender();
                        })




                })







}


function init_load() {
    console.log(number_loaded + " " + number_sim_snapshots);
    console.log(snapshots_loaded);


    if (number_loaded == (number_sim_snapshots-number_err)) {
            console.log(demo_frame_times);
            BuildRenderer();
            UpdateRender();

            
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
    //console.log("building informed data");
    feature_idx = 0;
    e_data_size = e_data.length;
    for (i = 0; i < dim_length; i++){
        for (j = 0; j < dim_length; j++){
            if (feature_idx > e_data_size - 1) {
                // feature_idx = e_data_size - 1;
                 feature_idx = 0;
                //feature_idx = Math.floor(Math.random() * e_data_size);

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

    //console.log(data.length);
    return d_data;

}


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var number_sim_snapshots = 0;
var app_ss_ids = [];

if (snapshot_id != "all") {

    number_sim_snapshots = 1;
    GetData(snapshot_id);

}
else {

   
    // el = document.getElementById('play');
    // el.style.display = "none";

    el = document.getElementById('market_selector');
    el.style.display = "none";
     el = document.getElementById('run_button');
    el.style.display = "none";

    //
    // for general live play -> obrain frame number from time vector
    //

    // get all files
    //alert(ss_ids);

    //console.log(ss_ids);
    // loop over all files and generate frame data
    app_ss_ids = ss_ids.split(',');
    console.log(app_ss_ids);
    //console.log(app_ss_ids);
    // app_ss_ids = ['711602635032502887898504', '983040429874824099068136', '595319575884544847440835', '496330765318343040702688', '4510916050868080480725', '791766822611366068898805', '255909560907909230385506',
    //     '147806043092917235813293', '78166070127568866942302'
    // ];
    number_sim_snapshots = app_ss_ids.length;
    for (ss_idx in app_ss_ids) {
        GetData(app_ss_ids[ss_idx]);
    }



}
if (snapshot_location_ == "upload"){
    el = document.getElementById('market_selector');
    el.style.display = "none";
     el = document.getElementById('run_button');
    el.style.display = "none";
    
    el = document.getElementById('custom-label-upload');
    el.style.display = "block";



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

    var app_time_ms = getCookie('clock');

    console.log('app time ' + app_time_ms);
    
    active_frame = get_frame_from_time(app_time_ms);
    console.log('active frame : ' + active_frame);
    console.log('number frames ' + number_frames);
   
    var el = document.getElementById("frame_number_txt");
    el.innerText = active_frame;

    
    var el = document.getElementById("time_display");
    el.innerText = demo_frame_times[active_frame] + `  < ${demo_avg_energy[active_frame]} >  ${number_features}`;
   
    UpdateRender();
    update_stats();

}


function play()
{




    active_frame += 1
    if (active_frame > number_frames)
    {
        active_frame = 0;
        delete_hits();
        frame_search_hit = [];
        frame_label_hit = [];
        reset_stats();
    }

    var el = document.getElementById("frame_number_txt");
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
    // update stats
    update_stats();
    



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
var w_stats;
build_show_hits();
function add_hit(hit, search=false) {
    var tbodyRef = w.document.getElementById('hits_table').getElementsByTagName('tbody')[0];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    if (search) {
        if (frame_label_hit_b) {
            console.log(newRow);
            newRow.style.background = 'green';
            newRow.style.color = 'white';
        }
        console.log(frame_label_hit_b);
        if ((frame_label_hit_b==false) && (frame_label_hit_b != null)) {
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


var stats = {

    'number_iterations' : 0,
    'number_decisions' : 0,
    'number_correct' : 0,
    'number_wrong' : 0,
    'number_missed' : 0,
    'average_energy' : 0,
    'max_energy' : 0,
    'threshold' : activation_energy,
    'pc_hit' : 0

}


function reset_stats(){
    stats['number_decisions'] = 0;
    stats['number_correct'] = 0;
    stats['number_wrong'] = 0;
    stats['number_missed'] = 0;

}

function build_show_stats() {


    var html = `
    <br>
    <div class="container">
    <table id="hits_table" class="table table-hover table-bordered bordered-primary ">
    <thead>

    <tr class='table-primary'>

        <td>
            time
        </td>
        <td>
            iteration number
        </td>
        <td>
            number decisions
        </td>
        <td>
            success
        </td>
        <td>
            fail
        </td>
        <td>
            missed
        </td>
            
    </tr>

    </thead>
    <tbody>
 <tr>

        <td id="stats_time">
            0
        </td>
        <td id="stats_iteration">
            0
        </td>
        <td id="stats_number_decisions">
            0
        </td>
        <td id="stats_success">
            0
        </td>
        <td id="stats_fail">
            0
        </td>
        <td id="stats_missed">
            0
        </td>
            
    </tr>
<br>

    </tbody>
     <thead>

    <tr class='table-primary'>
        <td>
            features    
        </td>
        <td >
            max e
        </td>
        <td >
            avg e
        </td>
        
        <td>
            < 25%
        </td>
        <td>
            25% - 75%
        </td>
        <td>
            > 75%
        </td>
            
    </tr>

    </thead>
    <tbody>
 <tr>

        <td id = "num_features">
            0
        </td>
        <td id = "max_e">
            
        </td>
        <td id = "avg_e">
            0
        </td>
      
        <td id = "one">
            0
        </td>
        <td id = "two">
            0
        </td>
        <td id = "three">
            0
        </td>
            
    </tr>


    </tbody>
    
     <thead>

    <tr class='table-primary'>
        
        <td >
            threshold
        </td>
        <td>
            % > threshold    
        </td>
        <td >
            % > 0.5
        </td>
        
        <td>
            % > 0.75
        </td>
        <td>
            
        </td>
        <td>
            % hit
        </td>

            
    </tr>

    </thead>
    <tbody>
        <tr>

        <td id = "threshold">
            0
        </td>
        <td id = "pc_above_threshold">
            0
        </td>
        <td id = "pc_above_05">
            0
        </td>
      
        <td id = "pc_above_75">
            0
        </td>
        <td>
            
        </td>
        <td id = "pc_hit">
            0
        </td>
            
    </tr>

     <tr>

        <td id = "threshold_input">
             <input type="text" class="form-control" id="activation-input" aria-describedby="" placeholder="Activation" value=${activation_energy}>
        </td>
        <td >
             <input type="text" class="form-control" id="pc_above_threshold_input" aria-describedby="" placeholder="Activation" value = ${pc_activation_energy}>
            
        </td>
        <td >
         <input type="text" class="form-control" id="pc_above_05_input" aria-describedby="" placeholder="Activation" value = ${pc_50}>
            
        </td>
      
        <td >
         <input type="text" class="form-control" id="pc_above_75_input" aria-describedby="" placeholder="Activation" value = ${pc_75}>
            
        </td>
        <td>
            
        </td>
        <td>
            
        </td>
            
    </tr>

    </tbody>
    
    
    </table>
    <div>
    <button type="submit" id="set-parameters" class="btn btn-primary mb-3">Apply Parameters</button>
</div>

    </div>

    `;



    var page_html = `
    <html><head>
            <html><head><title>Run Metrics</title><link rel="stylesheet" type="text/css" href="styles.css"></head><body>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

            <link href="https://vixen.hopto.org/rs/ident_app/ident_gui/assets/css/globals.css" rel="stylesheet">
            </head>
            <body>
            ${html}
            </body>
            </html>


    `;





    var title = `stats_${Math.floor(Math.random() * 99999)}`;
    const windowFeatures = "left=500,top=100,width=1000,height=400";
    w_stats=window.open("", title,windowFeatures);
    w_stats.document.body.innerHTML = page_html;


    var el = w_stats.document.getElementById('set-parameters');
    el.onclick = function(){
        set_threshold_parameters();
        
    };



}
build_show_stats();
tolerance = 500;

var time_tolerance = 100;

function get_frame_from_time(app_time_ms) {
    //console.log(demo_frame_times)
    var min_diff = 10000000;
    var new_frame = active_frame;
    console.log(demo_frame_times);
    for (const [key, value] of Object.entries(demo_frame_times)) {
        //console.log(`${key}: ${value}`);


        time = value;
        //var entries = Object.entries(demo_frame_times[data_time_idx]);


        //time = entries.value;
        //console.log(time);
        var target_time = new Date(time);
        var target_time_ms = target_time.getTime();
        // if (Math.abs(app_time_ms - target_time_ms) < time_tolerance) {
        //     console.log('hit');
        //     return key;
        // }

        var diff = Math.abs(app_time_ms - target_time_ms);
        console.log(diff);
        if (diff < min_diff) {
            min_diff = diff;
            new_frame = key;
        }

    }
    console.log(new_frame + "  " + min_diff);
    return new_frame;
}


frame_search_hit = [];
frame_label_hit = [];

function check_label(time) {
    frame_label_hit_b = null;
    var target_time = new Date(time);
   
    var target_time_ms = target_time.getTime();
    
    if (snapshot_location_ != "upload"){
      
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
                frame_label_hit_b = true;
                if (frame_label_hit.includes(active_frame)) {

                }
                else {
                    frame_label_hit.push(active_frame);
                    add_hit(hit);
                    return;
                }

                



            }
            frame_label_hit_b = false;

        }
    }

    }
    else{
        for (const [key, value] of Object.entries(parsed_dynamic_labels) ){

            sig_start_ms = value[3];
            sig_end_ms = value[4];

            var ref_time = (parseFloat(sig_start_ms) + parseFloat(sig_end_ms)) / 2;
            //console.log(ref_time);
            //console.log(sig_start_ms, sig_end_ms, ref_time);
            if (Math.abs(ref_time - target_time_ms) < tolerance) {
                var hit = {
                    'target': `label : ${value[2]}`,
                    'time': demo_frame_times[active_frame]
                }
                frame_label_hit_b = true;
                if (frame_label_hit.includes(active_frame)) {

                }
                else {
                    frame_label_hit.push(active_frame);
                    add_hit(hit);
                    return;
                }
               

        }
        frame_label_hit_b = false;
    }
    
}
}

var labelled_data = null;

label_data_download().then((data) => {

    // console.log(data['data']);
    labelled_data = data['data'];

});





/*
*   Add labels dynamically
*/


el = document.getElementById('label-upload');
el.onclick = function(){
    var ident_id = 213;//Math.floor(Math.random() * 1000)
    var file_data = $('#upload_file').prop('files')[0];
    var form_data = new FormData();
    form_data.append('upload_file', file_data);
    form_data.append('ident_id', ident_id);
    form_data.append('data', "label");
    alert(form_data);
    $.ajax({
        url: '../cgi-bin/upload_data.php', // <-- point to server-side PHP script
        dataType: 'text',  // <-- what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,//'multipart/form-data',
        processData: false,
        data: form_data,
        type: 'post',
        success: function(){
            //alert(php_script_response); // <-- display response from the PHP script, if any
            add_labels_to_sim(ident_id);
        }
     });
};



// var dynamic_label_data = {}

function add_labels_to_sim(ident_id){

    url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/${ident_id}.txt`;

    fetch(url)

    .then( r => r.text() )
    .then( (t) => {
        console.log(t);
        // build dynamic label data
        //...
        // parse data to use ms from time start
        parse_label_data(dynamic_label_data, demo_frame_times[0]);
    } ) //process your text!


}



dynamic_label_data = {

    0 : [3.000000,	3.500000,	'HP'],
    1 : [3.500000,	4.000000,	'HP'],
    2 : [4.000000,	4.500000,	'HP'],
    3:[4.500000,	5.000000,	'HP'],
    4:[5.000000,	5.500000,	'HP'],
    5:[5.500000,	6.000000,   'HP'],
    6:[6.000000,	6.500000,	'HP'],
    7:[6.500000,	7.000000,	'HP'],
    8:[7.000000,	7.500000,	'HP'],
    9: [7.500000,	8.000000,	'HP'],
    10: [21.500000,	22.000000,	'HP'],
    11:[29.500000,	30.000000,	'HP'],
    12:[30.000000,	30.500000,	'HP'],
    13:[30.500000,	31.000000,	'HP'],
    14:[31.000000,	31.500000,	'HP'],
    15:[44.000000,	44.500000,	'HP'],
    16:[45.000000,	45.500000,	'HP'],
    17:[45.500000,	46.000000,	'HP'],
    18:[46.500000,	47.000000,	'HP'],
    19:[47.000000,	47.500000,	'HP'],
    20:[48.000000,	48.500000,	'HP'],
    21:[48.500000,	49.000000,	'HP'],
    22:[49.000000,	49.500000,  'HP'],
    23:[54.000000,	54.500000,  'HP'],
    24:[54.500000,	55.000000,	'HP'],
    25:[55.500000,	56.000000,	'HP'],
    26:[57.500000,	58.000000,	'HP'],
    27:[58.000000,	58.500000,	'HP']


}


parsed_dynamic_labels = {};

function parse_label_data(data, data_start_time){

    var data_start_js = new Date(data_start_time);
   
    var data_start_ms = data_start_js.getTime();

    for (const [key, value] of Object.entries(data) ){
        console.log(value);
        delta_s_start = value[0];
        delta_s_end = value[1];
        value.push(data_start_ms + (delta_s_start*1000))
        value.push(data_start_ms + (delta_s_end*1000))
        
        

    }

    console.log(data);
    parsed_dynamic_labels = data;

}


function update_stats(){

    el = w_stats.document.getElementById('stats_time');
    el.innerHTML = demo_frame_times[active_frame];

    el = w_stats.document.getElementById('stats_iteration');
    el.innerHTML = active_frame;

    el = w_stats.document.getElementById('stats_number_decisions');
    el.innerHTML = stats['number_decisions'];

    el = w_stats.document.getElementById('stats_success');
    el.innerHTML = stats['number_correct'];

    el = w_stats.document.getElementById('stats_fail');
    el.innerHTML = stats['number_wrong'];

    el = w_stats.document.getElementById('stats_missed');
    el.innerHTML = stats['number_missed'];

    energy_stats();

    console.log(stats);
    el = w_stats.document.getElementById('max_e');
    el.innerHTML = stats['max_energy'];

    el = w_stats.document.getElementById('avg_e');
    el.innerHTML = stats['average_energy'];

    el = w_stats.document.getElementById('num_features');
    el.innerHTML = stats['number_features'];

    el = w_stats.document.getElementById('one');
    el.innerHTML = stats['hist'][0];

    el = w_stats.document.getElementById('two');
    var total = stats['hist'][1] + stats['hist'][2]
    el.innerHTML = total;

    el = w_stats.document.getElementById('three');
    el.innerHTML = stats['hist'][3];

    el = w_stats.document.getElementById('threshold');
    el.innerHTML = stats['threshold'];

    el = w_stats.document.getElementById('pc_above_threshold');
    el.innerHTML = stats['pc_above_threshold'];

    el = w_stats.document.getElementById('pc_above_05');
    el.innerHTML = stats['pc_above_05'];

    el = w_stats.document.getElementById('pc_above_75');
    el.innerHTML = stats['gt_75'];


    el = w_stats.document.getElementById('pc_hit');
    el.innerHTML = stats['pc_hit'];


    

}


function histogram(data, size) {
    let min = Infinity;
    let max = -Infinity;

    var number_above_threshold = 0;

    for (const item of data) {
        if (item < min) min = item;
        else if (item > max) max = item;
        
        if (parseFloat(item) > parseFloat(stats['threshold'])){

            number_above_threshold += 1;
            console.log(number_above_threshold);
        }
    }
    console.log(number_above_threshold, stats['number_features'], stats['threshold']);
    stats['pc_above_threshold'] = parseFloat((number_above_threshold / stats['number_features']) * 100).toFixed(2);
    stats['max_energy'] = max;
    max = 1;
    min = 0;
    const bins = Math.ceil((max - min) / size);
    console.log(bins);
    const histogram = new Array(bins).fill(0);

    for (const item of data) {
        histogram[Math.floor((item - min) / size)]++;
    }

    console.log(histogram);

    stats['gt_25'] = parseFloat(((histogram[1] + histogram[2] + histogram[3]) / stats['number_features']) * 100).toFixed(2);
    stats['pc_above_05'] = parseFloat(((histogram[2] + histogram[3])/ stats['number_features']) * 100).toFixed(2);
    stats['gt_75'] = parseFloat(((histogram[3]) / stats['number_features']) * 100).toFixed(2);


    return histogram;
}

function energy_stats(){

    // 'average_energy' : 0,
    // 'max_energy' : 0

    var e_vector = demo_frames[active_frame];
    console.log(e_vector);
    stats['number_features'] = e_vector.length;
    
    var sum = e_vector.reduce((a,b) => a+ b, 0);
    stats['average_energy'] = (sum/e_vector.length).toFixed(2) || 0;

    hist = histogram(e_vector, 0.25);
    console.log(hist);
    stats['hist'] = hist;
    //build_energy_plot(hist);


    

}



var w_plot = null;


var chart = null;


function build_energy_plot(number) {

    if (w_plot == null){
    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=100,top=100,width=700,height=500";
    w_plot=window.open("", title,windowFeatures);
    w_plot.document.body.innerHTML += '<canvas id="chart_one"></canvas>';

    times = [];
    //console.log(times);
    console.log(energies);
    var ctx = w_plot.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        number.forEach(function (item, index) {
            //console.log(item, index);
            // mylabels.push(item['_t']);
            // plot_data.push(item['ref_distance']);
            // var color = 'blue';
            // var color = 'rgba(160, 160, 9, 0.9)';
            a_color = color_interpolated(item, colors['jet']);
            //console.log(item, a_color);
            mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));
            times.push(index);
      
        });

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: times,
                datasets: [{
                    label: 'Number v Energy',
                    data: energies,
                    backgroundColor:mycolors,
                    borderWidth: 1
                }
                ]
     
            },
            options: chart_options
        });
    
    } // null chart
}

    var chart_options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Vessel distance vs time'
            },
        },
        scales: {
            yAxes: [
                { display: true, gridLines: { display: true } }
            ],
            xAxes: [
                { display: true, gridLines: { display: true } }
            ]
        },
        legend: {
            display: false
        },
        // title: { display:true},
        // responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2 // general animation time
        },
        hover: {
            //animationDuration: 2 // duration of animations when hovering an item
        },
        elements: {
            line: {
                tension: 0.8 // disables bezier curves
            },
            point: {
                radius: 0
            }
        },
        showLines: true,
        fill: false
    };
  

    function set_threshold_parameters(){

        var el = w_stats.document.getElementById('activation-input');
        activation_energy = parseFloat(el.value);
        stats['threshold'] = activation_energy;
        console.log(stats['threshold']);
        el = w_stats.document.getElementById('pc_above_threshold_input');
        pc_activation_energy = parseFloat(el.value);

        el = w_stats.document.getElementById('pc_above_05_input');
        pc_50 = parseFloat(el.value);

        el = w_stats.document.getElementById('pc_above_75_input');
        pc_75 = parseFloat(el.value);


        var el = w_stats.document.getElementById('activation-input');
        el.value = activation_energy;

        el = w_stats.document.getElementById('pc_above_threshold_input');
        el.value = pc_activation_energy;

        el = w_stats.document.getElementById('pc_above_05_input');
        el.value = pc_50;

        el = w_stats.document.getElementById('pc_above_75_input');
        el.value = pc_75;





    }