
var server_message = "No message from the server.";

const isRequired = (param) => { throw new Error(`param ${param} required`); };

function time_string(time_ms) {

    //console.log(time_ms);
    var dt = new Date(time_ms);

    var new_Date = dt.toISOString().substring(0,10);
    var new_Time = dt.toISOString().substring(11,19);
    var safe_ = `${new_Date} ${new_Time}`


    return [dt.toUTCString(), dt.toUTCString(), dt.toUTCString(), dt, time_ms, dt.toISOString(), safe_ ] ;
}


function set_server_message(messages){

    //console.log(messages);
    var html = `<br>
    <table>
    `;

    number_messages = messages.length;
    //console.log(number_messages);

    for (i = number_messages - 1; i > -1; i--){
        var msg_time = messages[i].msg_time;
        var dt = new Date(msg_time);
        var print_time = dt.toLocaleTimeString();
        var msg = messages[i].message;
        // console.log(dt);
        // get readable message time.

        html += `
             
            <tr>
            <td style="color:red; font-size:16px">${print_time}</td>
            <td style="color:green; font-size:16px"> : </td>
            <td style="color:green; font-size:16px">${msg}</td>
            </tr>
            <tr></tr>

        `;

    }

    html += '</table>';

    // var el = document.getElementById("messenger");
    // el.innerHTML = html;

    var el2 = document.getElementById("loader-messager");
    //console.log(el2);
    el2.innerHTML = html;






}


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function hide_filter(){

    var el = document.getElementById('main-filter');
    if (el != null) {
        el.style.display = "none";
    }

}

function show_loader() {

    

    var el = document.getElementById('loading_cover');
    el.style.display = "block";
    

}

function hide_loader() {


    var el = document.getElementById('loading_cover');
    el.style.display = "none";

}
function show_loader_div(div_id) {

    var el = document.getElementById(div_id);

    var html = `<div class="spinner-border text-primary" role="status">
                <span class="visually-hidden"></span>
                </div>`;
    
    el.innerHTML = html;
    el.style.display = "block";
    
}

function hide_loader_div(div_id) {


    var el = document.getElementById(div_id);
    el.innerHTML = "";
    el.style.display = "none";

}


function show_app_screen(){
var el = document.getElementById('app-cover');
    el.style.display = "block";
}

function hide_app_screen() {
     var el = document.getElementById('app-cover');
    el.style.display = "none";
}


function load_app_setup(load_setup_id) {
    console.log("loading app");
    setup_id = load_setup_id;
   
    Load();
   
    show_play_tools();
}

function Load(){
    show_loader();
    
        // var setup_id = 58172;

        var url = load_app_api_url + `/${setup_id}`;
        //console.log(url);

    // var messages = [];
    var m =  { msg_time: Date.now(), message: `Loading application`, level: 1
    };
    messages.push(m);
    set_server_message(messages);
    build_messenger();
    
        $.getJSON(url, function (data) {

            var load_setup = data['data'][0]['data_raw'];
            
            
            // application setup
             m =  { msg_time: Date.now(), message: `Loading setup data.`, level: 1
             };
                messages.push(m);
            set_server_message(messages);
            build_messenger();

            var app_setup = load_setup['application_setup']['setup_data'];
            _app_setup = new ApplicationSetup(app_setup.approach_radius, app_setup.track_radius,
                app_setup.data_start_time, app_setup.data_end_time, app_setup.relevant_delta_time,
                app_setup.data_latitude, app_setup.data_longitude, app_setup.listener_location);
            

            // vessel data
            var vessel_data = load_setup['ais'];
            _vessel_data = new AISVesselHits();
            //console.log(vessel_data.vessels);
            for (var i=0; i<vessel_data.vessels.length; i++){
                
                // build vessel
                var v = vessel_data.vessels[i].vessel_overview_data;
                _vessel = new VesselHit(v['mmsi'], v['call_sign'], v['destination'], v['draught'], v['flag'], v['imo'], v['name'], v['vessel_type']);
                //console.log(vessel_data.vessels[i]['vessel_dynamics']);
                
                // build vessel dynamics
                _vessel.vessel_dynamics.number_tracks =  vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'].length;
                _vessel.vessel_dynamics.number_approaches = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'].length;
                _vessel.vessel_dynamics.number_interpolated_tracks =  vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_tracks'].length;
                _vessel.vessel_dynamics.number_interpolated_approaches = vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_approaches'].length;
                
                _vessel.vessel_dynamics.earliest_approach = vessel_data.vessels[i]['vessel_dynamics']['earliest_approach'];
                _vessel.vessel_dynamics.last_approach = vessel_data.vessels[i]['vessel_dynamics']['last_approach'];
                
                // _vessel.vessel_dynamics.vessel_approaches = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'];
                // _vessel.vessel_dynamics.vessel_tracks = vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'];
                //_vessel.vessel_dynamics.vessel_interpolated_approaches = vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_approaches'];
                //alert("fsd");
                m =  { msg_time: Date.now(), message: `Loading vessel data ${v['mmsi']} ${ v['name']}}`, level: 1
                };

                messages.push(m);
                //console.log(messages);
                set_server_message(messages);
                build_messenger();

                for (var j=0; j<_vessel.vessel_dynamics.vessel_approaches_custom.length; j++){
                    //vessel tracks
                    var vessel_track = new InterpolatedVesselApproach();
                    vessel_track.profile = vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_approaches'][j]['profile'];
                    vessel_track.approach_id = vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_approaches'][j]['approach_id'];
                    //vessel_track.start_time = vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['start_time'];
                    //vessel_track.end_time =vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['end_time'];
                    //vessel_track.set_local_track();
                    //_vessel.vessel_dynamics.vessel_tracks[i].set_local_track();
                   
                    //_vessel.vessel_dynamics.add_interpolated_approach(vessel_track);
                    _vessel.vessel_dynamics.add_custom_approach(vessel_track);
                }

                for (var j=0; j<_vessel.vessel_dynamics.number_interpolated_tracks; j++){
                    //vessel tracks
                    var vessel_track = new InterpolatedVesselTrack();
                    vessel_track.profile = vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_tracks'][j]['profile'];
                    vessel_track.approach_id = vessel_data.vessels[i]['vessel_dynamics']['vessel_interpolated_tracks'][j]['track_id'];
                    //vessel_track.start_time = vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['start_time'];
                    //vessel_track.end_time =vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['end_time'];
                    //vessel_track.set_local_track();
                    //_vessel.vessel_dynamics.vessel_tracks[i].set_local_track();
                    _vessel.vessel_dynamics.add_interpolated_track(vessel_track);
                }






                for (var j=0; j<_vessel.vessel_dynamics.number_tracks; j++){
                    //vessel tracks
                    var vessel_track = new VesselTrack();
                    vessel_track.profile = vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['profile'];
                    //console.log(vessel_track.profile);
                    vessel_track.track_id = j;
                    vessel_track.start_time = vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['start_time'];
                    vessel_track.end_time =vessel_data.vessels[i]['vessel_dynamics']['vessel_tracks'][j]['end_time'];
                    vessel_track.set_local_track();
                    //_vessel.vessel_dynamics.vessel_tracks[i].set_local_track();
                    _vessel.vessel_dynamics.add_track(vessel_track);
                }
                for (var j=0; j<_vessel.vessel_dynamics.number_approaches; j++){
                    //vessel tracks
                    var vessel_approach = new VesselApproach();
                    vessel_approach.profile = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'][j]['profile'];
                    vessel_approach.track_id = j;
                    vessel_approach.start_time = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'][j]['start_time'];
                    vessel_approach.end_time = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'][j]['end_time'];
                    vessel_approach.acoustic_data_present = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'][j]['acoustic_data_present'];
                    vessel_approach.acoustic_data_cover = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'][j]['acoustic_data_cover'];
                    vessel_approach.xr_snapshots = vessel_data.vessels[i]['vessel_dynamics']['vessel_approaches'][j]['xr_snapshots'];
                    // vessel_approach.set_local_track();
                    //_vessel.vessel_dynamics.vessel_tracks[i].set_local_track();
                    _vessel.vessel_dynamics.add_approach(vessel_approach);
                }
                //console.log(`${v['name']} : ${_vessel.vessel_dynamics.vessel_interpolated_approaches.length}`);
                _vessel_data.add_vessel(_vessel);
                // console.log(_vessel);

            }


            // build acoustics
            var _acoustic_data = load_setup['acoustic'];

            acoustic_data = new AcousticData();
            acoustic_data.snapshot_ids = _acoustic_data['snapshot_ids'];
            acoustic_data.sound_source = _acoustic_data['sound_source'];
            //console.log(acoustic_data.sound_source);
            acoustic_data.raw_acoustic_data_source = _acoustic_data['raw_acoustic_data_source'];
            //console.log(acoustic_data.raw_acoustic_data_source);

           //console.log(_acoustic_data['snapshots'])
            for (var i = 0; i < _acoustic_data.snapshot_ids.length; i++) {
                
                var snapshot_id = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['snapshot_id'];
                var timeframe_start = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['timeframe_start'];
                var timeframe_end = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['timeframe_end'];
                var timeframe_start_js = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['timeframe_start_js'];
                var timeframe_end_js= _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['timeframe_end_js'];
                var timeframe_start_ms = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['timeframe_start_ms'];
                var timeframe_end_ms = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['timeframe_end_ms'];
                var hydrophone_location = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['hydrophone_location'];
                // var spec_location = "";
            
                var spec_location = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['spec_location'];
                //console.log(_acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]);
                //console.log(timeframe_start);
                var density = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['density'];
                var sample_rate = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['sample_rate'];
                var _snapshot = new Snapshot(snapshot_id, timeframe_start, timeframe_end, timeframe_start_js, timeframe_end_js, timeframe_start_ms, timeframe_end_ms, hydrophone_location, spec_location, density, sample_rate);
                //console.log(_snapshot);
                _snapshot.sound_source = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['sound_source'];
                _snapshot.raw_acoustic_data_source = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['raw_acoustic_data_source'];
                 _snapshot.audio_filepath = _acoustic_data['snapshots'][_acoustic_data.snapshot_ids[i]]['audio_filepath'];
                //
                acoustic_data.add_snapshot(_snapshot);
            }

            var search_epoch = null;
            search_epoch = load_setup['search_epoch'];
            //console.log(search_epoch);








            // build messages
            var _messages = load_setup['messages'];


            // build application
            application_data = new ApplicationData(
                _app_setup,
                acoustic_data,
                _vessel_data,
                "",
                user
                ,
                search_epoch

            );
            application_data.add_message({ msg_time: Date.now(), message: `Application data loaded.`, level: 1 });
            set_server_message(application_data.server_messages);
            build_messenger();

          
            // Run App
            console.log("Running App");
            // alert("Acoustic & vessel data successfully loaded.")
            hide_loader();
            runApp();
            
            show_play_tools();
        });


}
    

function time_to_js(str_time) {
    //console.log(str_time);
    var str_arr = str_time.split('.');
    var str_time_sec = str_arr[0];
    var str_data = str_time_sec.split('_');
    var yr_str = str_data[0];
    var time_str = str_data[1];

    var yr = "20" + yr_str[0] + yr_str[1];
    var month = yr_str[2] + yr_str[3];
    var day = yr_str[4] + yr_str[5];

    var hr = time_str[0] + time_str[1];
    var min = time_str[2] + time_str[3];
    var second = time_str[4] + time_str[5];

    var yr_int = parseInt(yr);
    var month_int = parseInt(month) -1 ;
    var day_int = parseInt(day);

    var hr_int = parseInt(hr);
    var min_int = parseInt(min);
    var second_int = parseInt(second);

    return new Date(Date.UTC(yr_int, month_int, day_int, hr_int, min_int, second_int));


}

const includesAny = (arr, values) => values.some(v => arr.includes(v));
const includesAll = (arr, values) => values.every(v => arr.includes(v));


function array_intersect(arr1, arr2){

   
    for (var i = 0; i < arr1.length; i++){
        for (var j = 0; j < arr2.length; j++){
           
            if (arr1[i] == arr2[j]){
               // console.log(arr1[i], arr2[j])
                return true;
            }
        }
    }

    return false;

}


function showDiv(id) {
    var el = document.getElementById(id);
    if (el != null){
    $(el).fadeIn("fast");
        //el.style.display = "block";
    }

}

function hideDiv(id) {
    var el = document.getElementById(id);
    if (el != null){
    el.style.display = "none";
    $(el).fadeOut("fast");
    //el.style.display = "none";
    }


}


function showApp() {
    
    showDiv("vessel_hud");
    showDiv("player");
    showDiv("vessel_plots");
    showDiv("clock");
    showDiv("app-data-window-holder");
    showDiv("vessel_focus");
    hideDiv("user-data-window-holder");
  

}

function hideApp() {
    
    hideDiv("vessel_hud");
    hideDiv("player");
    hideDiv("vessel_plots");
    hideDiv("clock");
    hideDiv("app-data-window-holder");
    hideDiv("vessel_focus");

}

function showFilter() {
    console.log("showing filter");
    // show data window
    showDiv("filter-data-window-holder");
    
}

function hideFilter() {
    // hide filter
    hideDiv("filter-data-window-holder");
}

function send_label(ss_id, start_ms, end_ms, listener_location, acoustic_filepath, data_filepath) {
    
    console.log(start_ms, end_ms);

    var el_id = `labelsupplyselect_${ ss_id }`;
    var el = document.getElementById(el_id);
    var label = el.value;
    //alert(label);
    var sig_id = getRandomInt(999999);


    console.log(application_data.user);

    post_data = {
        'snapshot_id': ss_id,
        'label': label,
        'signature_id': sig_id,
        'user_uid': application_data.user.user_uid,
        'user_name': application_data.user.name,
        'start_time_ms' : start_ms,
        'end_time_ms': end_ms,
        'listener_location': application_data.application_setup.setup_data.listener_location,
        'acoustic_filepath': acoustic_filepath,
        'data_filepath' : data_filepath
    }

    var url = "https://vixen.hopto.org/rs/api/v1/data/signature";

    console.log(url);
    console.log(JSON.stringify(post_data));

    if (label != "") {
        $.post(url, JSON.stringify(post_data), function (data) {
            
            console.log(data);
            if (data['status update'] == "1") {
                alert("Signature post successful");

                var lid = document.getElementById(`label_value_${ss_id}`);
                lid.value = lid.value += " " + label;

                BuildAppDataAcoustic();
            }
            //alert("Unsuccessful post.")

        });
    }
    else {
        
        alert ("Label seems empty. Please check.")
    }
    
}


function label_group_analysis(ss_id, listener_location) {
    
    console.log(application_data.application_setup);
    console.log(application_data.application_setup.setup_data.listener_location);
    console.log(listener_location);
    var el_id = `group_labelsupplyselect_${ ss_id }`;
    var el = document.getElementById(el_id);
    var label = el.value;
    
    


    console.log(application_data.user);


    

  
    var start_time_ms = application_data.track_analysis.start_time_ms;
    var end_time_ms = application_data.track_analysis.end_time_ms;

    var url = "https://vixen.hopto.org/rs/api/v1/data/signature";

    console.log(url);
    console.log(JSON.stringify(post_data));

    if (label != "") {

        //for (var i = 0; i < application_data.track_analysis.acoustic_snapshots.length; i++){
            
        var active_ss_id = application_data.track_analysis.acoustic_snapshots[0].snapshot_id;
        var active_location = application_data.track_analysis.acoustic_snapshots[0].hydrophone_location;
        var acoustic_filepath = application_data.track_analysis.audio_file_url;

            console.log(active_ss_id);
            var sig_id = getRandomInt(99999999);
            post_data = {
            'snapshot_id': active_ss_id,
            'label': label,
            'signature_id': sig_id,
            'user_uid': application_data.user.user_uid,
            'user_name': application_data.user.name,
            'start_time_ms' : start_time_ms,
            'end_time_ms': end_time_ms,
            'listener_location': listener_location,
            'acoustic_filepath': acoustic_filepath,
            'data_filepath' : ""
            
            }

            $.post(url, JSON.stringify(post_data), function (data) {
                
                console.log(data);
                if (data['status update'] == "1") {
                    alert("Signature post successful");

                    var lid = document.getElementById(`group_label_value_${ss_id}`);
                    lid.value = lid.value += " " + label;

                    BuildAppDataAcoustic();
                }
                //alert("Unsuccessful post.")

            });
            
        //}
        


    }
    else {
        
        alert ("Label seems empty. Please check.")
    }


    
}


function fly_label(start_ms, end_ms, listener_location) {
    
    console.log(application_data.application_setup);
    console.log(application_data.application_setup.setup_data.listener_location);
    console.log(listener_location);
    var el_id = "fly_label";
    var el = document.getElementById(el_id);
    var label = el.value;

    if (label == "") {
        el_id = `study_label_select`;
        el = document.getElementById(el_id);
        label = el.value;
    
    
    }
    
    


    console.log(application_data.user);


    

  
    var start_time_ms = start_ms;
    var end_time_ms = end_ms;

    var url = "https://vixen.hopto.org/rs/api/v1/data/signature";

    console.log(url);
    console.log(JSON.stringify(post_data));

    if (label != "") {

        //for (var i = 0; i < application_data.track_analysis.acoustic_snapshots.length; i++){
            
        //var active_ss_id = application_data.track_analysis.acoustic_snapshots[0].snapshot_id;
        //var active_location = application_data.track_analysis.acoustic_snapshots[0].hydrophone_location;
        //var acoustic_filepath = application_data.track_analysis.audio_file_url;

           
            var sig_id = getRandomInt(99999999);
            post_data = {
            'snapshot_id': "",
            'label': label,
            'signature_id': "onfly",
            'user_uid': application_data.user.user_uid,
            'user_name': application_data.user.name,
            'start_time_ms' : start_time_ms,
            'end_time_ms': end_time_ms,
            'listener_location': listener_location,
            'acoustic_filepath': "",
            'data_filepath' : ""
            
            }

            $.post(url, JSON.stringify(post_data), function (data) {
                
                console.log(data);
                if (data['status update'] == "1") {
                    alert("Signature post successful");

                    // var lid = document.getElementById(`group_label_value_${ss_id}`);
                    // lid.value = lid.value += " " + label;
                    
                    //get ids of windows from window id dictionary
                    //BuildAppDataAcoustic();
                    //ShowStudyLabels();
                    ReloadAllShownData();
                }
                //alert("Unsuccessful post.")

            });
            
        //}
        


    }
    else {
        
        alert ("Label seems empty. Please check.")
    }


    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function GetVesselTypeStr(vessel_type_int) {

    return vessel_types[vessel_type_int];
}
function GetVesselTypeInt(vessel_type_string) {
    
     if (vessel_type_string == "Sailing Vessel") {
            vessel_type_string = "Sailing";
        }
        if (vessel_type_string == "Other") {
            vessel_type_string = "Other Type, all ships of this type";
        }
        if (vessel_type_string == "Special Craft") {
            vessel_type_string = "Other Type, all ships of this type";
        }
        if (vessel_type_string == "Cargo") {
            vessel_type_string = "Cargo, No additional information";
        }
    for (const [key, value] of Object.entries(vessel_types)) {
       
        // console.log(`${key}: ${value}`);
        if (value == vessel_type_string) {
            return key;
        }
    }       
    return (vessel_type_string);
     
}
function toggle_activities(acoustic_id) {
    //alert("hrere");
    var id = `data-filter-view-${acoustic_id}`;
    console.log(id);
    var el = document.getElementById(id);

    if (el.style.display == "block"){
        console.log('hide');
        hideDiv(id);
        el.style.display = "none";
    }
    else {
        console.log('show');
        showDiv(id);
        el.style.display = "block";
    }


}

function removeLabel(label) {
    // alert('removing label');

    var post_url = label_api_url + `/${user.user_uid}`;
    var post_data = {
        'tag':label,
        'user_uid' : user.user_uid,
        'action' : 'delete'
    };

    $.post(post_url, JSON.stringify(post_data), function (data) {
        console.log("psot made");
        fetchUserLabels().then((data) => {
        console.log(data);
         buildLabelsSetup(data);
        })



    });


}

function addLabel() {
    // alert('removing label');

    var label = document.getElementById('new_label_text').value;
    //alert(label);
    var post_url = label_api_url;
    var post_data = {
        'tag'   : label,
        'user_uid' : user.user_uid,
        'location' : "all",
        'action' : 'add'
    };


    console.log(JSON.stringify(post_data));
    console.log(post_url);

    $.post(post_url, JSON.stringify(post_data), function (data) {
        console.log("psot made");
        
        fetchUserLabels().then((data) => {
            console.log(data);
            buildLabelsSetup(data);
            })



    });
}

//setup-application-data

function toggle_application_data_window(){

    console.log("toggle");
    var el = document.getElementById('app-data-window-holder');
    if (el.style.display == "block"){
        console.log("1");
        el.style.display = "none";
        //hideDiv(el);
    }
    else {
        //showDiv(el);
        console.log("2");
         el.style.display = "block";
    }

}

function color_interpolated(x, colors) {
  let lo = Math.floor(x * (colors.length - 1));
  let hi = Math.ceil(x * (colors.length - 1));
  let r = Math.round((colors[lo][0] + colors[hi][0]) / 2 * 255);
  let g = Math.round((colors[lo][1] + colors[hi][1]) / 2 * 255);
  let b = Math.round((colors[lo][2] + colors[hi][2]) / 2 * 255);
  return [r, g, b];
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}