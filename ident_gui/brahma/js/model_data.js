
// global snapshot data structure for model run
var snapshot_data = null;
var run_api_url = "https://vixen.hopto.org/rs/api/v1/run/model";
/*
* API and Data Download
*/



const run_bot = (snapshot_id, bot_id, user, location_str, base_name, activation_level) => {

    return new Promise((resolve, reject) => {
        success = false;

        var post_data = {
            "snapshot_id"   : snapshot_id,
            "bot_id"        : bot_id,
            "user": user,
            "location": location_str,
            "base_name": base_name,
            "activation_level" : activation_level
        }
        console.log(JSON.stringify(post_data));

        
        $.post(run_api_url, JSON.stringify(post_data),function (data) {

         
            
            success = true;
            
            if (success) {
                resolve(JSON.stringify(data));
            } else {
                reject(Error("Error in Game Run"));
            }

        });


    }); // end of promise dec

}


grab_toplevel_data();
// load page data
function grab_toplevel_data() {


    snapshot_data_download(snapshot_ids).then((data) => {
        console.log(data); 
        ss_id = snapshot_ids[0];
        ss_data = data['ss_data'][0][ss_id];
        var snapshot_id = ss_data['ss_id'];
        var timeframe_start = `${ss_data['data_frame_start']} UTC`;
        var timeframe_start_js = time_to_js(timeframe_start);
        var timeframe_start_ms = timeframe_start_js.getTime();
        var timeframe_end = `${ss_data['data_frame_end']} UTC`;
        var timeframe_end_js = time_to_js(timeframe_end);
        var timeframe_end_ms = timeframe_end_js.getTime();
        var hydrophone_location = location_keys[ss_data['data_receiver_location_name']];
        //hydrophone_location = listener_location;
        if (ss_data['spec_images_html'].length < 1) {
            var spec_location = "";
        }
        else {
            var spec_location = ss_data['spec_images_html'][0];
        }

        var density = ss_data['geo_hit_number'];
        var sample_rate = ss_data['sample_rate'];
        //var audio_file_path = ss_batch_data[i][ss_id][''];
        
        // if (timeframe_start_ms < application_data.application_clock.application_focus_end_time) {
        //     //console.log(snapshot_id, timeframe_start, timeframe_end, timeframe_start_js, timeframe_end_js, timeframe_start_ms, timeframe_end_ms, hydrophone_location, spec_location, density, sample_rate);
        //     var _snapshot = new Snapshot(snapshot_id, timeframe_start, timeframe_end, timeframe_start_js, timeframe_end_js, timeframe_start_ms, timeframe_end_ms, hydrophone_location, spec_location, density, sample_rate);
        //     //console.log(_snapshot);
        //     acoustic_data.add_snapshot(_snapshot);
        //     used_ss_ids.push(snapshot_id);
        // }
        snapshot_data = new Snapshot(snapshot_id, timeframe_start, timeframe_end, timeframe_start_js, timeframe_end_js, timeframe_start_ms, timeframe_end_ms, hydrophone_location, spec_location, density, sample_rate);
        snapshot_data.delta_t = ss_data['data_delta_time']; //s
        console.log(snapshot_data);
        BuildDataUI();

    });

}



/* ------------
* UI Build
 -------------- */ 

function BuildDataUI(){

    var el = document.getElementById('snapshot-id-tag');
    el.style.fontSize = '10pt';
    el.innerHTML = snapshot_data.snapshot_id;

    var el = document.getElementById('location-tag');
    el.innerHTML = snapshot_data.hydrophone_location;
    var el = document.getElementById('delta_t-tag');
    el.innerHTML = snapshot_data.delta_t;

    var el = document.getElementById('start_time-tag');
     el.style.fontSize = '10pt';
    el.innerHTML = snapshot_data.timeframe_start_js;


}


function filter_features() {
    
    var el = document.getElementById('environment_selector');
    var feature = el.value;
    //feature = "*";
    if (feature == "none") {
        feature = "harbour_porpoise";
    } 
    console.log(feature);
    console.log(el);
    get_features(feature).then((data) => {
        console.log("features ex");
        var data = (JSON.parse(data));
        console.log(data['data']);
        features = data['data'];
        num_rows = data['num_rows'];
        
        build_feature_dropdown(features, num_rows);
    })

}
function run_bot_event() {
    var rel = document.getElementById("run-text");
    rel.innerHTML = "Running...";
    //loader
    show_loader_div('data-loader');
    // show_loader_div('waveform_main_load');
    // show_loader_div('f_profile_main_load');
    // show_loader_div('spectrogram_main_load');
    // show_loader_div('console_txt_load');

    //get bot id
    bot_id = "";
    var el = document.getElementById('feature_id');
    bot_id = el.value;
    console.log(bot_id);

    el = document.getElementById('activation_level');
    activation_level = el.value

    //get snapshot id
    snaphsot_id = snapshot_data['snapshot_id'];
    user = "rdtandon";
    console.log(snapshot_data);
    location_name = snapshot_data['hydrophone_location'];
    location_str = location_keys_r[location_name];
    base_name = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/${snapshot_id}_${bot_id}`;
    //post to api
    run_bot(snapshot_id, bot_id, user, location_str, base_name, activation_level).then((data) => {
        rel.innerHTML = "Run Bot";
        console.log(data);
        hide_loader_div('data-loader');
        // hide_loader_div('waveform_main_load');
        // hide_loader_div('f_profile_main_load');
        // hide_loader_div('spectrogram_main_load');
        // hide_loader_div('console_txt_load');
        build_generated_data(data, base_name);
        // build_console_data(data, base_name);
        build_main_spec(data, base_name);
        // build_main_wave(data, base_name);
        // build_main_f_profile(data, base_name);
        build_decision_data(data, base_name); 
        
     });

}

function build_console_data(data, base_name) {
    var el = document.getElementById('console_txt');
    var file_path = `${base_name}_console.txt`;

    fetch(file_path)
        .then((res) => res.text())
        .then((text) => {
            el.innerHTML = text;
        })
    

}


function decision_process(text) {
    
    var feature_decisions = [];

    var lines = text.split('\n');
    for (var line = 0; line < lines.length-1; line++) {
        //console.log( "line " + lines[line]);
        var local_lines = lines[line].split(',');
        var local_decision = {
            'version': local_lines[0],
            'target': local_lines[2],
            'decision': local_lines[4],
            'time': local_lines[6],
            'result' : local_lines[10]
            
        } 
        //console.log(local_decision);
        feature_decisions.push(local_decision);
    }

    return feature_decisions;


}



function build_decision_data(data, base_name) {
    // var el = document.getElementById("decision_txt");
    var url = `${base_name}_decisions.csv`;
    console.log(url);
    fetch(url)
        .then((res) => res.text())
        .then((text) => {
            


            processed_decisions = decision_process(text);
            show_decisions(processed_decisions);


        })
    
    // d3.csv(url)
    //     .then((data) => {
    //         console.log(data);
    //         el.innerHTML = data;
    //     });

}

function show_decisions(decisions) {
    


    if (decisions.length == 0){

    var title = `decisions_${Math.floor(Math.random() * 99999)}`;
   
    const windowFeatures = "left=200,top=100,width=700,height=500";
        var w = window.open(title, title, windowFeatures);
        

    w.document.body.innerHTML = "No decisions made.";



    }
    
    var html = `
        <div class="container">
        <div class="row">
        <div class="col-12">
        <table class="table table-hover"   style="width:100%; font-size:12px;">
        <tr>
        <th>
        Fitness Alg.
        </th>
        <th>
        Time
        </th>
        <th>
        Target
        </th>
        <th>
        Result
        </th>
        </tr>
    `;

    for (decision_number in decisions) { 
        console.log(decision_number);
        decision = decisions[decision_number];
        console.log(decision);
        if (decision.decision.trim() == "Idle") {
            
            html += `
            
            <tr>
            <td>
                ${decision.version}
            </td>
            <td>
                ${decision.time}
            </td>
            <td>
                ${decision.target}
            </td>
            <td>
                ${decision.result}
            </td>



            </tr>
            `;


        }
    }

    html += `</table></div></div></div>`;
    console.log(html);

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
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML = page_html;


}

function build_generated_data(data, base_name) {
   
    // Energy Plot
    console.log(data)
    var url = `${base_name}.out`
    // var url = data['result']['energies'];
    
    d3.csv(url)
        .then((data) => {
            console.log(data);
            var times = data.map(function (d) { return d.time });
            var energies = data.map(function(d) {return d.energy});
            console.log(times);
            console.log(energies);
            build_energy_plot(times, energies);
        });

}


function build_main_wave(data, base_name) {
    var filepath = `${base_name}_main_waveform.png`
    var el = document.getElementById('waveform_main');
    var innerHTML = `
   <img src="${filepath}" alt="Loading Waveform"  style="width:100%; height:100%"></img>
    `;
    el.innerHTML = innerHTML;


}//f_profile_main
function build_main_f_profile(data, base_name) {
    var filepath1 = `${base_name}_main_f_profile1.png`;
    var filepath2 = `${base_name}_main_f_profile2.png`;
    var filepath3 = `${base_name}_main_f_profile3.png`;
     var filepath4 = `${base_name}_main_f_profile4.png`;
    var el = document.getElementById('f_profile_main');
    var innerHTML = `
   <img src="${filepath1}" alt="Loading Waveform"  style="width:100%; height:100%"></img>
   <img src="${filepath2}" alt="Loading Waveform"  style="width:100%; height:100%"></img>
   <img src="${filepath3}" alt="Loading Waveform"  style="width:100%; height:100%"></img>
   <img src="${filepath4}" alt="Loading Waveform"  style="width:100%; height:100%"></img>
    `;
    el.innerHTML = innerHTML;


}
function build_main_spec(data, base_name) {
    var filepath = `${base_name}_main_spec.png`
//     var el = document.getElementById('spectrogram_main');
//     var innerHTML = `
//    <img src="${filepath}" alt="Loading Spectogram"  style="width:100%; height:100%"></img>
//     `;
//     el.innerHTML = innerHTML;


    //pop out window?
    const windowFeatures = "left=100,top=100,width=700,height=500";
    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    var title_s = "Spectrogram"

    var w = window.open(`https://vixen.hopto.org/rs/ident_app/ident_gui/brahma/spec.php?identifier=${filepath}&title=${title_s}&custom=2`, title, windowFeatures);
   

}

function build_energy_plot(times, energies) {


    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=100,top=100,width=700,height=500";
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML += '<canvas id="chart_one"></canvas>';


    console.log(times);
    console.log(energies);
    var ctx = w.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        energies.forEach(function (item, index) {
            //console.log(item, index);
            // mylabels.push(item['_t']);
            // plot_data.push(item['ref_distance']);
            // var color = 'blue';
            // var color = 'rgba(160, 160, 9, 0.9)';
            a_color = color_interpolated(item, colors['jet']);
            //console.log(item, a_color);
            mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));

      
        });

        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: times,
                datasets: [{
                    label: 'Distance v Time',
                    data: energies,
                    backgroundColor:mycolors,
                    borderWidth: 1
                }
                ]
     
            },
            options: chart_options
        });
    

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
  

const get_features = (environment) => {
    console.log(environment);
    return new Promise((resolve, reject) => {
        success = false;
        var post_url = 'https://vixen.hopto.org/rs/api/v1/data/features'

        var post_data = {
            "market"   : environment
          
        }
        console.log(JSON.stringify(post_data));
        console.log(post_url);
        
        $.post(post_url, JSON.stringify(post_data),function (data) {

         
           
            success = true;
            
            if (success) {
                resolve(JSON.stringify(data));
            } else {
                reject(Error("Error in Game Run"));
            }

        });


    }); // end of promise dec

}

function build_feature_dropdown(features, num_rows) {


    console.log(features);

    var html = `  <select id="bot_selector" class="form-select text-primary" aria-label="Default select example">`;
      html += `  <option value="none" selected>[${num_rows} features]</option>`


             

    for (feature in features) {
        
        //console.log(features[feature].botID);
        html += `  <option value="${features[feature].botID}" selected>${features[feature].botID}</option>`


    }
    html += `  </select>`;

    var el = document.getElementById('features_list');
    el.innerHTML = html;


    el = document.getElementById("num_features");
    el.innerHTML = ` ${num_rows} features`;

el = document.getElementById('bot_selector');
el.addEventListener("change", (event) => {
    console.log(el.value);
    // result.textContent = `You like ${event.target.value}`;
    feature_el = document.getElementById('feature_id');
    feature_el.value = el.value;
});

}

el = document.getElementById('bot_selector');
el.addEventListener("change", (event) => {
    console.log(el.value);
    // result.textContent = `You like ${event.target.value}`;
    feature_el = document.getElementById('feature_id');
    feature_el.value = el.value;
});




// filter_features();