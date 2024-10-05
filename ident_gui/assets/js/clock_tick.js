

// global code event listeners.
document.addEventListener('clockTick', clock_tick);
document.addEventListener('appReady', runApp);
document.addEventListener('acousticSourceChange', acousticSourceChange);


class DataQueryControl{

    queryActiveSnapshot() {
        console.log("running query");
        var audio_source = false;
        var current_time = application_data.application_clock.application_time;

        for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++){
            var sid = application_data.acoustic_data.snapshot_ids[i];
            // console.log(sid);
            var _snapshot = application_data.acoustic_data.get_snapshot(sid);
            //console.log(current_time,_snapshot.timeframe_start_ms,_snapshot.timeframe_end_ms )
                
            if ((current_time > _snapshot.timeframe_start_ms) && (current_time < _snapshot.timeframe_end_ms)) {
                console.log(current_time,_snapshot.timeframe_start_ms,_snapshot.timeframe_end_ms )
                var _current_snapshot_id = sid;
                audio_source = true;
                if (_current_snapshot_id != application_data.acoustic_data.active_snapshot_id) {
                    console.log("new!");
                    application_data.acoustic_data.active_snapshot_id = _current_snapshot_id;
                    
                    document.dispatchEvent(acousticSourceChangeEvent);
                    return (0);
                   
                }
            }

        }
        if (audio_source == false) {
            console.log(audio_source);
            var _current_snapshot_id = 0;
            if (_current_snapshot_id != application_data.acoustic_data.active_snapshot_id) {
                application_data.acoustic_data.active_snapshot_id = 0;
                audio_source = false;
                document.dispatchEvent(acousticSourceChangeEvent);
                return (0);

            }
           
        }
        

    }

   

}




// Execute on clock tick
function clock_tick() {
    //update global progress bar visual
    updateApplicationProgress((application_data.application_clock.application_time - application_data.application_clock.application_focus_start_time), (application_data.application_clock.application_focus_end_time - application_data.application_clock.application_focus_start_time));

    // udpate clock visual
    updateClock()

   
    if (dataQuery == null) {
        dataQuery = new DataQueryControl;
        application_data.data_query = dataQuery;
    }

    
    //run dynamic plugins
    var gis_layers = [];
    
    for (var i=0; i<application_data.application_plugins.marlin_gis_plugins.length; i++){

        if (application_data.application_plugins.marlin_gis_plugins[i].type=="dynamic"){
            var pi_name = application_data.application_plugins.marlin_gis_plugins[i].name;
            var gis_layer = application_data.application_plugins.marlin_gis_plugins[i].run_function(application_data);
            console.log(`${pi_name} : return layer : ${gis_layer}`);
            if (gis_layer != null) {
                gis_layers.push({ name: pi_name, data: gis_layer });
            }
    
        }

    }



    //paint on map
    build_dynamic_map(gis_layers);
  

    // set active acoustic snapshot
    application_data.data_query.queryActiveSnapshot();
    

    // update vessel hud
    populateHud();

    // update plot
    update_vessel_plots();

   





}



