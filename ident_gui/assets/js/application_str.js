


/*
*
*   Main application events.
*/


const clockTickEvent = new Event("clockTick");
const appReadyEvent = new Event("appReady");
const acousticSourceChangeEvent = new Event("acousticSourceChange");


/*
*
*   Data Filter Data
*/

class DataSearch{

    constructor(filter_data = isrequired(), location_value = isRequired(), location_str = isRequired(), search_radius =isRequired(), search_start_time = isRequired(), search_end_time = isRequired() ) {
        
        this.filter_data = filter_data;
        this.location_value = location_value;
        this.data_latitude = location_geo_lat[location_value];
        this.data_longitude = location_geo_long[location_value];;
        this.location_str = location_str;
        this.search_radius = search_radius;
        
        this.search_start_time = search_start_time;
        this.search_end_time = search_end_time;


    }

    filter_data = null;
    location_value = "";
    location_str = "";
    data_latitude = 0;
    data_longitude = 0;
    search_radius = 0;
    search_start_time = 0;
    search_end_time = 0;
    selected_epoch = null;

    set_selected_epoch(selected_epoch_id){

        for (var i=0; i<this.filter_data.length; i++){
            if (this.filter_data[i].id==selected_epoch_id){
                this.selected_epoch = this.filter_data[i];
            }
        }

        console.log(this.selected_epoch);
        
    }

}

/*
*
*   User
*/

class User{


    constructor(name = isRequired(), level = isRequired(), position = isRequired(), user_uid=isRequired) {
        
        this.name = name;
        this.level = level;
        this.position = position;
        this.user_uid = user_uid;

    }

    name = "";
    level = 0;
    position = "";
    user_uid=  "";



}

/*
*
*   Main setup data structure for application Ident.
*/

class ApplicationData{

    // Constructor
    constructor(application_setup = isRequired(), acoustic_data = isRequired(), ais_vessel_data = isRequired(), application_description  = isRequired(), user = isRequird(), search_epoch=isRequird()) {
        
        
        this.application_setup = application_setup;
        this.acoustic_data = acoustic_data;
        this.ais_vessel_data = ais_vessel_data;
        this.application_description = application_description;
        this.user = user;
        this.acoustic_player = new AcousticPlayer();
        var add_ = "Z";
        var start_time = new Date(this.application_setup.setup_data.data_start_time).getTime();
        //console.log(`active_time_date : ${this.application_setup.setup_data.data_start_time}`);
        //console.log(`active_time : ${start_time}`);


        var end_time = new Date(this.application_setup.setup_data.data_end_time).getTime();
        var current_time = start_time;
        
        this.application_clock = new ApplicationClock(start_time, end_time, current_time);
        //console.log(this.application_clock)
        this.application_plugins = new MarlinPlugins();

        this.search_epoch = search_epoch;


        
    }

    // epoch of data from data search
    search_epoch = null;

    data_query = null;
    
    // application setup
    application_setup = null;

    // acoustic data
    acoustic_data = null;

    // ais data - known vessel hits
    ais_vessel_data = null;

    // Time state controller (ms)
    
    application_clock = null;


    // setup description
    application_description = "";

    // user 
    user = {};

    // server messages
    server_messages = [];


    // plugins ->
    application_plugins = null; 

    // time considerations
    // application_time = "";
    // application_focus_start_time = "";
    // application_focus_end_time = "";
    

    track_analysis = null;

    // save application setup
    Save(description) { 

        if ((description == null) || (description == "")) {
            description = "none";
        }
        show_loader();

        // get id
        var setup_id = Math.floor(Math.random() * 99999);
        

        // build save data
        var save_data = {};
        save_data['ais'] = this.ais_vessel_data;
        save_data['acoustic'] = this.acoustic_data;
        save_data['application_setup'] = this.application_setup;
        save_data['messages'] = this.server_messages;
        save_data['description'] = this.description;
        save_data['search_epoch'] = this.search_epoch;

        // stringify
        var save_data_json = JSON.stringify(save_data);

        // send to db
        var post_data = {
            setup_id : setup_id,
            data: save_data_json,
            location: application_data.application_setup.setup_data.listener_location,
            start_time: application_data.application_setup.setup_data.data_start_time,
            end_time: application_data.application_setup.setup_data.data_end_time,
            description: description,
            user_uid : application_data.user.user_uid
            
        };

        var post_data_json = JSON.stringify(post_data);


        var url = save_app_api_url;
        console.log(post_data_json);
        console.log(url);
        $.post(url, post_data_json, (data) => {
            console.log(data);
            alert("Setup saved.");
        });


        hide_loader();


    }

    

    // add server message to application
    add_message(msg) {
        this.server_messages.push(msg);
    }

    


}



/*
*
*   Main Application Timer -> Time State controller
*/

class ApplicationClock{

    constructor(start_time= isRequired(), end_time= isRequired(), current_time = isRequired()) {

        // current time in the application state. (s)
        this.application_focus_start_time = start_time;
        this.application_focus_end_time = end_time;
        this.application_time = current_time;
        
        
    }



    // timer definitions (ms)
    application_time = "";
    application_focus_start_time = "";
    application_focus_end_time = "";
    

    // **************************************
    // Application State
    // ***************************************
    update_time_state(seconds) {
        this.application_time = this.application_time + (seconds*1000);
    }

    set_focus_start_time(millisecondsseconds) {
        this.application_focus_start_time = millisecondsseconds;
    }
    set_focus_end_time(millisecondsseconds) {
        this.application_focus_end_time = millisecondsseconds;
    }
    //
    // ****************************************
    //


    // **************************************
    // Application State Controller
    // ***************************************
    ticking = false;
    clock_interval_ids = [];
    runClock() {
        this.ticking = true;
        this.clock_interval_ids.push(setInterval(tick, tick_interval));
        
    }

    stopClock() {
        this.ticking = false;
        for (var i = 0; i < this.clock_interval_ids.length; i++){
            clearInterval(this.clock_interval_ids[i]);
        }
       
    }

    
    

    //
    // ****************************************
    //




}

function tick()
{
    
    document.dispatchEvent(clockTickEvent);
    //application_data.application_clock.update_time_stamp(1);
    setCookie('clock',application_data.application_clock.application_time , 1);
    // only update at this point if acoustic is NOT playing.
    if (application_data.acoustic_player.playing == false) {
        application_data.application_clock.application_time += application_time_inc * time_acceleration * 1000;
        setCookie('clock',application_data.application_clock.application_time , 1);
    }

}
    



/*
*
*   Plugins to work on data. ( Access data -> work on data -> export to application.)
*/

class MarlinPlugins{

    marlin_gis_plugins = [];

    add_gis_plugin(marlin_plugin) {
        this.marlin_gis_plugins.push(marlin_plugin);
    }

}


class MarlinPlugin{

    constructor(name = isRequired(), description = isRequired(), run_function = isRequired(), export_function = isRequired(), type=isRequired()) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.run_function = run_function;
        this.export_function = export_function;
    
    }
    
    type = ""
    name = ""
    description = "";
    run_function = "";
    export_function = "";

}




/*
*
*   Track analysis
*   ================
*   View track profile for an approach
*/

class TrackAnalysis{


    constructor(start_time = isRequired(), end_time = isRequired(), acoustic_snapshots= isRequired(), vessel=isRequried(),
                track_profile = isRequired()) {

        this.start_time_ms = start_time;
        this.end_time_ms = end_time;
        this.acoustic_snapshots = acoustic_snapshots;
        this.vessel = vessel;
        this.track_profile = track_profile;
        this.start_time_js = time_string(this.start_time_ms)[1];
        this.end_time_js = time_string(this.end_time_ms)[1];


    }

    start_time_ms = 0;
    end_time_ms = 0;
    acoustic_snapshots = [];
    track_profile = [];
    vessel = null;
    audio_file_url = "";
    mp3_file_url = "";
    raw_data_url = "";
    start_time_js = "";
    end_time_js = "";


}




