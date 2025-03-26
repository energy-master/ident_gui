



/*
*
*   ************** Application Data Init. *********************
*/


var load_tracker = {vessels : 0, vessels_worked : 0, total_tracks : 0, total_approaches : 0, data_xr_approaches : 0, interpolated_approaches : 0, interpolated_tracks : 0 }

function init_application(search_range=isRequired(), start_time= isRequired(), end_time= isRequired(), location_value= isRequired()) {


    console.log(start_time, end_time);

    // reset app
    application_data = null;
    //get gps from location

    //console.log("build app");
    // init the setup
    var track_radius = search_range * 2;
    //console.log(start_time, end_time);
    app_setup = new ApplicationSetup(search_range, track_radius, start_time, end_time, 15.0, location_geo_lat[location_value], location_geo_long[location_value], location_value);
    // ais setup
    ais_data = new AISVesselHits();
    //console.log(ais_data);
    // acoustic data
    acoustic_data = new AcousticData();



    // init application data structure

    if (filtered_data != null) {
        application_data = new ApplicationData(app_setup, acoustic_data, ais_data, "Ident Run", user, filtered_data.selected_epoch);
    }
    else {
        application_data = new ApplicationData(app_setup, acoustic_data, ais_data, "Ident Run", user, null);
    }
    //console.log(application_data);

    var human_time_start = time_string(application_data.application_clock.application_focus_start_time);
    var human_time_start_str = `${human_time_start[0]}-${human_time_start[1]}`;
    var human_time_end = time_string(application_data.application_clock.application_focus_end_time);
    var human_time_end_str = `${human_time_end[0]}-${human_time_end[1]}`;


    application_data.add_message({ msg_time: Date.now(), message: `Application clock created from ${application_data.application_clock.application_focus_start_time} (${human_time_start_str}) to ${application_data.application_clock.application_focus_end_time} (${human_time_end_str})`, level: 1 });
    set_server_message(application_data.server_messages);
    build_messenger(application_data.server_messages);
    // init application messages
    application_data.add_message({ msg_time:  Date.now(), message: "Initialising Application.", level: 1 });
    set_server_message(application_data.server_messages);
    build_messenger(application_data.server_messages);

    application_data.add_message({ msg_time: Date.now(), message: "Fetching vessel AIS data.", level: 1 });
    set_server_message(application_data.server_messages);
    build_messenger(application_data.server_messages);
    // return (0);

    /*
    *  Init / Add plugins - hard code now
   */

    //track plugin
    // tracks_plugin = new ShowTracksPlugin();
    // marlin_plugin = tracks_plugin.create_plugin();
    // application_data.application_plugins.add_gis_plugin(marlin_plugin);


    var promises_made = 0;
    var promises_kept = 0;


    var short_cut = false;
    //console.log("Grabbing vessels...")
    //set_server_message("Fetching vessel data.")
    //promises_made++;
    //console.log("Fetching application acoustic data");
    var application_show_event = false;
    fetchAcousticData(app_setup, acoustic_data)
        .then((success) => {

            //console.log(`Fetch Data Result -> ${success}`);

            //console.log(ais_data);
            ais_download(app_setup, ais_data).then((ais_data) => {
                // no vessels
                if (ais_data.number_of_vessels == 0) {
                    console.log("NO VESSELS IN Dataset");
                    document.dispatchEvent(appReadyEvent);
                    return (0);
                }
                console.log("ais data downloaded");
                //promises_kept++;
                //console.log(`Number of vessels : ${ais_data.number_of_vessels}`);
                console.log(ais_data);
                application_data.add_message({ msg_time: Date.now(), message: `Number of unique vessels in dataset : ${ais_data.number_of_vessels}`, level: 1 });
                set_server_message(application_data.server_messages);
                build_messenger(application_data.server_messages);
                load_tracker.vessels = ais_data.number_of_vessels;
                // // if (ais_data.number_of_vessels==0){}s
                for (j = 0; j < ais_data.number_of_vessels; j++) {
                    //console.log(load_tracker);
                    console.log(`Grabbing vessel tracks for : ${ais_data.vessels[j].vessel_overview_data.mmsi} vessel ${j+1} of${ais_data.number_of_vessels} `);
                    application_data.add_message({ msg_time: Date.now(), message: `Generating tracks and approaches for vessel ${ais_data.vessels[j].vessel_overview_data.mmsi}`, level: 1 });
                    set_server_message(application_data.server_messages);
                    build_messenger(application_data.server_messages);
                    //promises_made++;
                    generate_vessel_tracks(ais_data.vessels[j], app_setup)
                        .then((vessel) => {
                            if (vessel.vessel_overview_data.mmsi == "235080084")
                            {
                                
                                console.log(vessel.vessel_dynamics.vessel_tracks);
                                console.log(vessel.vessel_dynamics.vessel_approaches);
                            }
                            //promises_kept++;
                            load_tracker.total_approaches = load_tracker.total_approaches + vessel.vessel_dynamics.number_approaches;

                            //console.log(load_tracker);

                            // console.log(vessel);
                            application_data.add_message({ msg_time: Date.now(), message: `Interpolating approaches for smoother data.`, level: 1 });
                            set_server_message(application_data.server_messages);
                            build_messenger(application_data.server_messages);
                            application_data.add_message({ msg_time: Date.now(), message: `Cross referencing approaches with available acoustic data.`, level: 1 });
                            set_server_message(application_data.server_messages);
                            build_messenger(application_data.server_messages);
                            //console.log(`Iterating over approaches for data xr and interpolation. ${vessel.vessel_overview_data.mmsi}`);
                            number_approaches = vessel.vessel_dynamics.number_approaches;
                            //console.log(`number of approaches : ${number_approaches} for mmsi : ${vessel.vessel_overview_data.mmsi}`);

                            if (number_approaches == 0) {
                                if (short_cut == false){
                                console.log("NO Approach");
                                    short_cut = true;
                                //document.dispatchEvent(appReadyEvent);
                                }
                                
                            }
                            //track interpolation
                            for (ik = 0; ik < vessel.vessel_dynamics.number_tracks; ik++) {

                                console.log(`interpolate tracks ${ik}`)
                                //promises_made++;
                                interpolate_tracks(vessel.vessel_dynamics.vessel_tracks[ik].profile, vessel, ik, "track").then((vessel) => {
                                    //promises_kept++;
                                    //load_tracker.interpolated_tracks++;
                                    // console.log(load_tracker);
                                })



                            } // number tracks
                            console.log(`number of approaches: ${vessel.vessel_dynamics.number_approaches}`);
                            for (ik = 0; ik < vessel.vessel_dynamics.number_approaches; ik++) {
                                console.log(`interpolate approaches ${ik}`)
                                //promises_made++;
                                interpolate_tracks(vessel.vessel_dynamics.vessel_approaches[ik].profile, vessel, ik, "approach").then((vessel) => {
                                    //promises_kept++;
                                    load_tracker.interpolated_approaches++;
                                    // console.log(load_tracker);
                                     //promise_tracker(promises_made, promises_kept);
                                })

                                //console.log("Cross referencing acoustic data with approaches");
                                promises_made++;
                                xr_track_with_data(vessel, app_setup, ik).then((vessel) => {

                                    promises_kept++;
                                    load_tracker.data_xr_approaches++;
                                    // console.log(load_tracker);
                                    promise_tracker(promises_made, promises_kept);
                                })





                            } // number approaches

                            load_tracker.vessels_worked++;
                            console.log(load_tracker.vessels_worked);
                            if (load_tracker.vessels_worked == load_tracker.vessels) {
                                if (application_show_event == false) {
                                    application_show_event = true;
                                    document.dispatchEvent(appReadyEvent);
                                }
                            }


                        }).catch((err) => {
                            console.log('error');
                            // Handle the error...
                        })

                } // per vessel

            }).catch((err) => {
                // Handle the error...
                console.log('error');
            })// AIS DATA
            //console.log("Application Built")
            // if (ais_data.number_of_vessels == 0) {
            //      document.dispatchEvent(appReadyEvent);
            // }
        }).catch((err) => {
            console.log('error');

        })
}


function promise_tracker(made, kept) {
    console.log(made, kept);
    if (made == kept) {
        if (application_show_event == false) {
            document.dispatchEvent(appReadyEvent);
            application_show_event = true;
        }
    }

}



/*
*
*   ************** Run App Entry*********************
*/

// static only and clock tick for dynamic?
function runApp() {

    hideFilter();
    showApp();

    console.log("Running App");
    // run distance & approached
    generateApproachesDensity(application_data).then((result) => {



        ShowAppData();
    // Data Setup
    //BuildAppDataSetup();
    // Data AIS
    //BuildAppDataAIS();
    // Acoustic
    //BuildAppDataAcoustic();
    // Build Search Datatable
    //BuildSearchDataSetup();
    // user data window
    //BuildUserDataWindow();
        
        
    // hide_loader();
    // return (0);

    // RESET GIS MAP DATA
    console.log("Reseting map");
    ResetMap();


    //load plugins
    load_plugins();


    console.log("Ready to run application Ident!");
    var location = application_data.application_setup.setup_data.listener_location;
    var lat = application_data.application_setup.setup_data.data_latitude;
    var long = application_data.application_setup.setup_data.data_longitude;
    var search_r = application_data.application_setup.setup_data.track_radius;
    var approach_r = application_data.application_setup.setup_data.approach_radius;
        console.log(search_r, approach_r);
    focus_gis_engine({latitude:lat, longitude:long}, location, search_r, approach_r);

    // Run plugins on complete dataset - GIS
    var gis_layers = [];
    var gis_layer = application_data.application_plugins.marlin_gis_plugins[0].run_function(application_data);
    var gis_layer1 = application_data.application_plugins.marlin_gis_plugins[1].run_function(application_data);
    //var gis_layer2 = application_data.application_plugins.marlin_gis_plugins[2].run_function(application_data.ais_vessel_data.vessels[1]);
    //var gis_layer3 = application_data.application_plugins.marlin_gis_plugins[2].run_function(application_data.ais_vessel_data.vessels[30]);

    gis_layers.push({name : "All Tracks", data:gis_layer});
    gis_layers.push({name: "All AIS Hits", data:gis_layer1});


    var gis_layer5 = application_data.application_plugins.marlin_gis_plugins[5].run_function(application_data);
    gis_layers.push({name: "Interpolated AIS", data:gis_layer5});


    var gis_layer7 = application_data.application_plugins.marlin_gis_plugins[7].run_function(application_data);
    gis_layers.push({name: "All Approaches", data:gis_layer7});



    console.log(`NUMBER OF VESSELS IN DATA: ${application_data.ais_vessel_data.vessels.length}`);

    for (var i=0; i<application_data.ais_vessel_data.vessels.length; i++){
        var gis_layer_ = application_data.application_plugins.marlin_gis_plugins[2].run_function(application_data.ais_vessel_data.vessels[i]);
        if (gis_layer_ != null) {
            gis_layers.push({ name: application_data.ais_vessel_data.vessels[i].vessel_overview_data.name, data: gis_layer_ });
        }
        gis_layer_ = application_data.application_plugins.marlin_gis_plugins[3].run_function(application_data.ais_vessel_data.vessels[i]);
        if (gis_layer_ != null) {
            console.log(gis_layer_)
            gis_layers.push({ name: `APPROACH :: ${application_data.ais_vessel_data.vessels[i].vessel_overview_data.name}`, data: gis_layer_ });
        }
    }




    console.log(gis_layers); // array of grouped layers

    console.log("building map");
    build_map(gis_layers);  // create layer control

    hide_loader();
    // alert("Application built.")    

    console.log(application_data);
    })

}



