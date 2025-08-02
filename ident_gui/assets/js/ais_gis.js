


//plot_dynamics(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile, `interpolated approach dynamics${j+1}`, mmsi, `smooth_approach_plot${j}`);


/*
*
*   Get active approach profile from mmsi and time
*   
*   time is application ms
*/

function grab_approach_profile(mmsi){

    // get active time
    var current_time = application_data.application_clock.application_time;

    //console.log(application_data.application_clock.application_time);
    // get vessel by mmsi
    var vessel = application_data.ais_vessel_data.get_vessel(mmsi);
    //console.log(vessel);
    // get correct approach
    var approach_profile = vessel.get_approach(current_time);
    //console.log(approach_profile);
    return (approach_profile);


}

/*
*
*   Generate vessel track data from AIS data.
*   Returns Vessel
*
*/

const generate_vessel_tracks = (vessel, app_setup) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
        mmsi = vessel.vessel_overview_data.mmsi;
        approach_radius     = app_setup.setup_data.approach_radius;
        listener_lat        = app_setup.setup_data.data_latitude;
        listener_long       = app_setup.setup_data.data_longitude;
        start_time          = app_setup.setup_data.data_start_time;
        end_time            = app_setup.setup_data.data_end_time;

        // string manipulation to pass times in URL
        start_time_url = start_time.replace(" ", "_");
        end_time_url = end_time.replace(" ", "_");
        start_time_url = start_time_url.replace(" UTC", "");
        end_time_url = end_time_url.replace(" UTC", "");
        // console.log(start_time_url);
        // console.log(end_time_url);
        var track_api_url = `${tracks_api_url}/${mmsi}/target_known/${listener_lat}/${listener_long}/${approach_radius}/${start_time_url}/${end_time_url}`;
        //console.log(track_api_url);
        
        $.getJSON(track_api_url, function (data) {

            

            if (data.result == 0) {
                success = false;
            }
            //console.log(data);
            //build vessel tracks & approaches
            vessel.vessel_dynamics.number_tracks = data['number_tracks'];
            vessel.vessel_dynamics.number_approaches = data['number_of_approaches'];

            
            

            for (i=0; i<vessel.vessel_dynamics.number_tracks; i++){
                vessel_track = new VesselTrack();
                vessel_track.profile = data['data'][i];
                vessel_track.track_id = i;
                vessel_track.start_time = data['data'][i][0]['timestamp']
                profile_size = data['data'][i].length;
                vessel_track.end_time = data['data'][i][profile_size - 1]['timestamp'];
                vessel_track.set_local_track();
                vessel.vessel_dynamics.add_track(vessel_track);
            }

            for (i = 0; i < vessel.vessel_dynamics.number_approaches; i++){
                //console.log("WE HAVE AN APPROACH");
                vessel_approach = new VesselApproach();
                vessel_approach.profile = data['approach_profiles'][i];
                vessel_approach.approach_id = i;
                vessel_approach.start_time = data['approach_profiles'][i][0]['time'];
                profile_size = data['approach_profiles'][i].length;
                vessel_approach.end_time = data['approach_profiles'][i][profile_size - 1]['time'];
                vessel.vessel_dynamics.add_approach(vessel_approach);
            }


            // if (vessel.vessel_overview_data.mmsi == "255806433"){
            //     console.log(vessel.vessel_dynamics.vessel_tracks[0]);
            // }

            if (success) {
                resolve(vessel);
            } else {
                reject(Error("Error in tracks generation."));
            }

        });

    }); // end of promise dec



    
};


/*
*
*   Cross reference available acoustic data with vessel tracks.
*   Returns Vessel
*
*/

const xr_track_with_data = (vessel, app_setup, approach_id) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;

        mmsi = vessel.vessel_overview_data.mmsi;
        approach_radius = app_setup.setup_data.approach_radius;
        listener_lat = app_setup.setup_data.data_latitude;
        listener_long = app_setup.setup_data.data_longitude;
        listener_location = app_setup.setup_data.listener_location;
        start_time = vessel.vessel_dynamics.vessel_approaches[approach_id].start_time;
        end_time = vessel.vessel_dynamics.vessel_approaches[approach_id].end_time;
        session_id = Math.floor(Math.random() * 99999);
        

        post_data = {
                    "start_time"    : start_time,
                    "end_time"      : end_time,
                    "location"      : listener_location,
                    "session_id"    : session_id,
                    "track"         : "true",
                    "track_id"      : approach_id
                };
        
        // console.log(JSON.stringify(post_data));
        
        $.post(data_xr_api_url,JSON.stringify(post_data), function (data) {

            vessel.vessel_dynamics.vessel_approaches[approach_id].acoustic_data_present = data['data_present'];
            vessel.vessel_dynamics.vessel_approaches[approach_id].acoustic_data_cover = data['percentage_complete'];
            vessel.vessel_dynamics.vessel_approaches[approach_id].xr_snapshots = data['snapshot_ids'].slice(0, 500);
            
            if (success) {
                vessel.tracks_built = true;
                vessel.data_xr = true;
                vessel.approaches_built = true;
                resolve(vessel);
            } else {
                reject(Error("Error in data XR."));
            }

        });

    }); // end of promise dec



    
};



const fetchAcousticData = (app_setup, acoustic_data) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
        
        
        start_time = app_setup.setup_data.data_start_time;
        //console.log("sfsaf");
        end_time = app_setup.setup_data.data_end_time;
        listener_location = app_setup.setup_data.listener_location;
        session_id = Math.floor(Math.random() * 99999);
        
        

        post_data = {
            "start_time": start_time,
            "end_time": end_time,
            "location": listener_location,
            "session_id": session_id,
            "track": "false",
            "track_id": -1
        };
        
        //console.log("Fetching Acoustic Data");
        console.log(JSON.stringify(post_data));
        console.log(data_xr_api_url);
        $.post(data_xr_api_url, JSON.stringify(post_data), function (data) {

            //console.log(data);

            var used_ss_ids = [];
            var ss_ids = data['data_one'].slice(0, max_acoustic_snapshots);

            //acoustic_data.snapshot_ids = ss_ids;
            // console.log(ss_ids.length);
            post_data_batch = {
                "ss_id_list": ss_ids
            }
            $.post(ss_batch_url, JSON.stringify(post_data_batch), function (ss_bulk_data) {
                // console.log(ss_bulk_data);
                var ss_batch_data = ss_bulk_data['ss_data'];
                //console.log(ss_batch_data);
                
                //build snapshots and add to acoustic data
                for (var i = 0; i < ss_batch_data.length; i++) {
                    var ss_id = Object.keys(ss_batch_data[i])[0]; //key of object

                    var snapshot_id = ss_batch_data[i][ss_id]['ss_id'];
                    var timeframe_start = `${ss_batch_data[i][ss_id]['data_frame_start']} UTC`;
                    var timeframe_start_js = time_to_js(timeframe_start);
                    var timeframe_start_ms = timeframe_start_js.getTime();

                    var timeframe_end = `${ss_batch_data[i][ss_id]['data_frame_end']} UTC`;
                    var timeframe_end_js = time_to_js(timeframe_end);
                    var timeframe_end_ms = timeframe_end_js.getTime();
                   // console.log(timeframe_start + " " + timeframe_start_js + " " + timeframe_start_ms);
                    var hydrophone_location = location_keys[ss_batch_data[i][ss_id]['data_receiver_location_name']];
                    hydrophone_location = listener_location;
                    if (ss_batch_data[i][ss_id]['spec_images_html'].length < 1) {
                        var spec_location = "";
                    }
                    else {
                        var spec_location = ss_batch_data[i][ss_id]['spec_images_html'][0];
                    }

                    var density = ss_batch_data[i][ss_id]['geo_hit_number'];
                    var sample_rate = ss_batch_data[i][ss_id]['sample_rate'];
                    //var audio_file_path = ss_batch_data[i][ss_id][''];
                    
                    if (timeframe_start_ms < application_data.application_clock.application_focus_end_time) {
                        //console.log(snapshot_id, timeframe_start, timeframe_end, timeframe_start_js, timeframe_end_js, timeframe_start_ms, timeframe_end_ms, hydrophone_location, spec_location, density, sample_rate);
                        var _snapshot = new Snapshot(snapshot_id, timeframe_start, timeframe_end, timeframe_start_js, timeframe_end_js, timeframe_start_ms, timeframe_end_ms, hydrophone_location, spec_location, density, sample_rate);
                        //console.log(_snapshot);
                        acoustic_data.add_snapshot(_snapshot);
                        used_ss_ids.push(snapshot_id);
                    }


                }
                acoustic_data.snapshot_ids = used_ss_ids;
                // get snapshot data
                $.post(ss_merge_url, JSON.stringify(post_data_batch), function (merge_data) {
                   // console.log(merge_data);

                    acoustic_data.sound_source = merge_data['listening_file_paths'];
                    acoustic_data.raw_acoustic_data_source = merge_data['file_paths'];
                    //console.log(merge_data);
                    for (var i = 0; i < merge_data['listening_file_paths'].length; i++){
                        var ss_id = Object.keys(merge_data['listening_file_paths'][i])[0];
                        var source = merge_data['listening_file_paths'][i][ss_id];
                        var _snapshot = acoustic_data.get_snapshot(ss_id);
                        //console.log(ss_id);
                        if (_snapshot != null) {
                            _snapshot.sound_source = source;
                        }
                        //console.log(_snapshot.sound_source);
                        
                    }

                    for (var i = 0; i < merge_data['file_paths'].length; i++){
                        var ss_id = Object.keys(merge_data['file_paths'][i])[0];
                        var data_path =  merge_data['file_paths'][i][ss_id];
                        var _snapshot = acoustic_data.get_snapshot(ss_id);
                        if (_snapshot != null) {
                             _snapshot.raw_acoustic_data_source = data_path;
                        }
                       
                        //console.log(_snapshot.raw_acoustic_data_source);
                        
                    }


                     for (var i = 0; i < merge_data['listening_file_paths_local'].length; i++){
                        var ss_id = Object.keys(merge_data['listening_file_paths_local'][i])[0];
                        var data_path =  merge_data['listening_file_paths_local'][i][ss_id];
                        var _snapshot = acoustic_data.get_snapshot(ss_id);
                        if (_snapshot != null){
                            _snapshot.audio_filepath = data_path;
                        }
                       
                        //console.log(_snapshot.raw_acoustic_data_source);
                        
                    }


                    // debug
                    // for (var i = 0; i < acoustic_data.snapshot_ids.length; i++){
                    //     console.log(acoustic_data.get_snapshot(acoustic_data.snapshot_ids[i]).sound_source);
                    // }
                    //console.log(application_data.acoustic_data.snapshots);


                   


                    if (success) {
                        resolve(success);
                    } else {
                        eject(Error("Error in data download."));
                    }
                });
                

            }); // bulk data
                


        }); // ss list


        // if (success) {
               
        //     resolve(success);
        // } else {
        //     reject(Error("Error in data XR."));
        // }

    }); // promise

};



/*
*
*   
*   
*   Build approaches from interpolated track data
*
*/



const generateApproachesDensity = (application) => {
    return new Promise((resolve, reject) => {
        //console.log("sf");
        var approach_radius = application_data.application_setup.setup_data.approach_radius;
        var reference_latitude = application_data.application_setup.setup_data.data_latitude;
        var reference_longitude = application_data.application_setup.setup_data.data_longitude;

        var ref_pt = {lat: reference_latitude, lng: reference_longitude};
        var _approach_profile = [];

        var in_approach = false;
        var start_time = 0;
        var end_time = 0;

        var success = true;

        var number_of_custom_approaches = 0;

        for (var i = 0; i< application_data.ais_vessel_data.vessels.length; i++){


            for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks.length; j++){
                
                for (var k = 0; k < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length; k++) {
                    var latitude = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k].latitude;
                    var longitude = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k].longitude;
                    //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]);
                    //console.log({ lat: latitude, lng: longitude });
                    var route = [ref_pt, { lat: latitude, lng: longitude }]; //m 
                    var distance = calculateDistance(route);

                    // console.log(distance);
                    // console.log(approach_radius);
                    // add distance
                    application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['ref_distance'] = distance;
                    
                    
                    if (distance < approach_radius) {
                        
                        if (in_approach == false) {
                            //new approach
                            in_approach = true;
                            start_time = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_t'];
                        }
                        application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['distance'] = distance;
                        _approach_profile.push(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]);
                    }

                    if (distance > approach_radius) {
                        if (in_approach) {
                            // close approach
                            var end_time = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_t'];
                            var vessel_approach = new VesselApproach();
                            //console.log(_approach_profile);
                            vessel_approach.profile = _approach_profile;
                            vessel_approach.start_time = start_time;
                            vessel_approach.end_time = end_time;
                            //application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['distance'] = distance;
                        
                            application_data.ais_vessel_data.vessels[i].vessel_dynamics.add_custom_approach(vessel_approach);
                            _approach_profile = [];
                            in_approach = false;
                            number_of_custom_approaches++;
                            start_time = "";
                            end_time = "";
                        }

                    }
                    if (k == application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length - 1) {
                        if (in_approach) {
                            // close approach
                            var end_time = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_t'];
                            var vessel_approach = new VesselApproach();
                            vessel_approach.profile = _approach_profile;
                            vessel_approach.start_time = start_time;
                            vessel_approach.end_time = end_time;
                            application_data.ais_vessel_data.vessels[i].vessel_dynamics.add_custom_approach(vessel_approach);
                            _approach_profile = [];
                            start_time = "";
                            end_time ="";
                            in_approach = false;
                            number_of_custom_approaches++;
                        }

                    }
                }

            }

        }

        application_data.ais_vessel_data.number_custom_approaches =  number_of_custom_approaches;
        //console.log(application_data.ais_vessel_data.number_custom_approaches);



        if (success) {
            resolve(success);
        } else {
            eject(Error("Error in data download."));
        }
    });
};






/*
*
*  Cross reference tracks, time and location to see other tracks
*
*/




/*
*
*   Cross reference tracks, time and location to determine density
*   Build density data from vessel and associated approaches data
*
*/


function BuildDensityMeasures(ais_vessel_hits) {
    
    ais_vessel_hits.vessels.forEach((vessel) => {
        
        


    })

}






/*
*
*  Utils for interpolating tracks
*
*/


function calculateDistance(route) {

    if (route.length < 2) {
        return 0; // Если в маршруте меньше двух точек, расстояние равно 0
    }

    let totalDistance = 0;
    // const earthRadius = 6371e3; // metres

    for (let i = 0; i < route.length - 1; i++) {
        const startPoint = route[i];
        const endPoint = route[i + 1];

        const lat1 = startPoint.lat;
        const lat2 = endPoint.lat;
        const lon1 = startPoint.lng;
        const lon2 = endPoint.lng;

        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        totalDistance += earthRadius * c; // in metres
    }

    return totalDistance;
}

// function getAvgSpeed(route) {
//     if (route.length < 2) {
//         return 0; // Если в маршруте меньше двух точек, расстояние равно 0
//     }

//     let speed = 0;

//     for (let i = 0; i < route.length - 1; i++) {
//         const Date = route[i].Date;

//         let dateParts = Date.split(" ");
    
//         let timeP = dateParts[1].split(":");

//         let hr = parseInt(timeP[0]);
//         let min = parseInt(timeP[1]);
//         let sec = parseInt(timeP[2]);

//         let distance = calculateDistance(route);
//         let time = (hr * 3600 + min * 60 + sec) / 3600;

//         let formula = distance / time;

//         speed += formula;
//     }

//     return speed / (route.length - 1);
// }



// Get  Delta Time ( s )
function getDeltaT(time1, time2) {
    
    const js_start_time = new Date(time1);
    const js_end_time = new Date(time2);
    const delta_t = Math.abs(js_end_time - js_start_time) / 1000;
    return delta_t;
}

// Get average speed ( m /s )
function getAvgSpeed(start_pt, end_pt) {
   
    // console.log(start_pt.time);
    // console.log(end_pt.time);
    // 2019-12-12 14:45:25

    // get delta_t
    if ('time' in start_pt) {
        delta_t = getDeltaT(end_pt.time, start_pt.time);
    }
    else {
         delta_t = getDeltaT(end_pt.timestamp, start_pt.timestamp);
    }
    // get distance
    route = [{ lat: start_pt.latitude, lng: start_pt.longitude }, { lat: end_pt.latitude, lng: end_pt.longitude }];
    d = calculateDistance(route);
    //console.log(d);

    var avg_speed = d / delta_t;
    
    return avg_speed; // m /s
  
}

function secondsToHms(seconds) {
    let d = Number(seconds);
  
    if (d <= 0) {
        return '00:00:00'
    } else {
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
    
        let hDisplay = h <= 9 ? '0'+ h+':' : h+ ":";
        let mDisplay = m <= 9 ? '0'+ m+':' : m+ ":";
        let sDisplay = s <= 9 ? '0'+ s : s;
    
        return hDisplay + mDisplay + sDisplay; 
    }
}


/*
*
*  Interpolate tracks to smooth out data
*
*/

const interpolate_tracks = (known_route, vessel, approach_idx, track_type) => {

    return new Promise((resolve, reject) => {


        if (vessel.vessel_overview_data.mmsi == "235080084") {
            
            console.log(vessel.vessel_dynamics.vessel_tracks[0]);
            console.log(known_route);
        }

        // success value of download
        var success = true;
        if (known_route.length < 2) {
            console.log("No interpolation allowed for lack of point data (< 2 data pts.)");
            return 0;
        }
        
        new_route_i = [];
        //er  	235080084
        
        //console.log(known_route);
        
        for (i = 0; i < known_route.length - 1; i++){
            start_pt = known_route[i];
            end_pt = known_route[i + 1];

            if (vessel.vessel_overview_data.mmsi == "235080084") {
                console.log(start_pt);
                console.log(end_pt);
            }
            interpolated_route = simple_linear_time_interpolate(start_pt, end_pt, i, track_type, vessel.vessel_overview_data.mmsi);
            if (vessel.vessel_overview_data.mmsi == "235080084")
            {
                console.log(interpolated_route);
            }
            
            //console.log(interpolated_route);
            if (interpolated_route.length > 0) {
                if (vessel.vessel_overview_data.mmsi == "235080084") {
                    console.log(`iter ${i}`);
                }
                // console.log(interpolated_route);
                console.log(new_route_i);
                new_route_i = new_route_i.concat(interpolated_route);
                console.log(new_route_i);
                //array1.concat(array2
                //new_route = new_route.push.apply(interpolated_route);
                // for (arr_cnt = 0; arr_cnt < interpolated_route.length; arr_cnt++){
                //     new_route.push(interpolated_route[arr_cnt]);
                // }
            }
            else {
                console.log("no interpolation reqd");
            }
            
            

        }
        
        // uopdate interpolated route
        
        //vessel.vessel_dynamics.vessel_interpolated_approaches[approach_idx] = new_route_i;
        
        if (track_type == "approach") {
            //console.log("WE HAVE AN INTERPOLARTED APPROACH*****************************************");
            var vessel_approach = new InterpolatedVesselApproach();
            vessel_approach.profile = new_route_i;
            vessel_approach.approach_id = approach_idx;
            //vessel_approach.start_time = data['approach_profiles'][i][0]['time'];
            //profile_size = data['approach_profiles'][i].length;
            //vessel_approach.end_time = data['approach_profiles'][i][profile_size - 1]['time'];
            vessel.vessel_dynamics.add_interpolated_approach(vessel_approach);
        }
        if (track_type == "track") {
            var t_length = new_route_i.length;
            if (t_length > 0) {
                //console.log(`WE HAVE AN INTERPOLATED Track ${t_length}`);
            }
            var vessel_approach = new InterpolatedVesselTrack();
            vessel_approach.profile = new_route_i;
            vessel_approach.approach_id = approach_idx;
            //vessel_approach.start_time = data['approach_profiles'][i][0]['time'];
           // profile_size = data['approach_profiles'][i].length;
            //vessel_approach.end_time = data['approach_profiles'][i][profile_size - 1]['time'];
            vessel.vessel_dynamics.add_interpolated_track(vessel_approach);
        }

        // console.log(vessel.vessel_overview_data.name);
        // console.log(new_route_i);


        if (success) {
            resolve(true);
        } else {
            reject(Error("Error in tracks generation."));
        }

     

    }); // end of promise dec



    
};



function simple_linear_interpolate(start_pt, end_pt, iter, track_type, mmsi) {
    
    //console.log(`pointt : ${start_pt}, ${end_pt}`);

    
    if (track_type == "track") {
        console.log(start_pt);
        console.log(end_pt);
    }

    var heading = -1;
    if ('course' in start_pt) {
        heading = start_pt['course'];
    }

    lat1 = start_pt.latitude;
    lat2 = end_pt.latitude;
    long1 = start_pt.longitude;
    long2 = end_pt.longitude;
    
    route = [{ lat: lat1, lng: long1 }, { lat: lat2, lng: long2 }];
    var d = calculateDistance(route);

    var speed = 0;
    speed = getAvgSpeed(start_pt, end_pt);
    if (mmsi == "255806433") {
        console.log(`speed ${speed}`);
    }
    // speed considerations
    // if (typeof start_pt.speed !== 'undefined') {
    //     speed = getAvgSpeed(start_pt, end_pt);
        
    // }
    // else {
    //     speed = ((start_pt.speed * 1.8) * 1000) / 3600; //m / s
    //     console.log(speed);
    // }
   


    var new_route = [];
    
    console.log(d);
    if (d > interpolate_distance_limit) {
        
        // init distance and time
        var interpolate_distance = 0;
        var interpolated_time = null;
        // if ('time' in start_pt) {
        //     //console.log(start_pt.time);
        //     interpolated_time = new Date((start_pt.time));
        // }
        if ('timestamp' in start_pt) {
            //console.log(start_pt.timestamp);
            interpolated_time = new Date((start_pt.timestamp));
            if (mmsi == "255806433") {
                console.log(start_pt.timestamp);
                console.log(interpolated_time);
            }

            // start_pt.timestamp = interpolated_time;
          
        }
        else{
            console.log(start_pt);
            console.log(mmsi);
            console.log(track_type);
        }
        var _t = interpolated_time.getTime(); //ms
        if (mmsi == "255806433") {
                console.log(_t);
                console.log(interpolated_time);
        }

        start_pt['_t'] = _t;
        start_pt['_i'] = new Date((start_pt.timestamp));

        if (mmsi == "255806433") {
                console.log(_t);
            console.log(interpolated_time);
            console.log(start_pt);
            console.log(new_route);
        }
      

        new_route.push(start_pt);

        if (mmsi == "255806433") { 
            console.log(start_pt);
            console.log(new_route);
        }

        if (track_type == "track") {
            console.log(`track in : ${interpolated_time}`);
        }

        console.log(start_pt);
        while (interpolate_distance < d) {
            interpolate_distance += delta_d;
            var delta_t = delta_d / speed;

            if (speed < 2) {
                delta_t = 10;
            }

             if (mmsi == "255806433") {
                console.log(`delta_d ${delta_d} | delta_t ${delta_t}`);
                console.log(`total_d ${d}`);
                console.log(`time: ${interpolated_time} ${iter}`);

            }
           
            // console.log(interpolated_time);
            // console.log(delta_t);
            //console.log(`${track_type} : delta_t : ${delta_t}, ${interpolated_time} speed: ${speed} distance : ${interpolate_distance} : delta_d : ${delta_d}`);
            
            interpolated_time.setMilliseconds(interpolated_time.getMilliseconds() + (delta_t*1000)); 
            //console.log(interpolated_time);
            //console.log(`delta_t : ${delta_t}, ${interpolated_time} speed: ${speed} distance : ${interpolate_distance} : delta_d : ${delta_d}`);
            //	a = sin((1−f)⋅δ) / sin δ    
            const f = parseFloat(interpolate_distance) / d;
            const delta = d / earthRadius;
            const a = Math.sin((1 - f) * delta) / Math.sin(delta);

            // b = sin(f⋅δ) / sin δ
            const b = Math.sin(f * delta) / Math.sin(delta);
           
            // x = a ⋅ cos φ1 ⋅ cos λ1 + b ⋅ cos φ2 ⋅ cos λ2
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const λ1 = long1 * Math.PI / 180;
            const λ2 = long2 * Math.PI / 180;
            const x = (a * Math.cos(φ1) * Math.cos(λ1)) + (b * Math.cos(φ2) * Math.cos(λ2));

            // y = a ⋅ cos φ1 ⋅ sin λ1 + b ⋅ cos φ2 ⋅ sin λ2
            const y = (a * Math.cos(φ1) * Math.sin(λ1)) + (b * Math.cos(φ2) * Math.sin(λ2));

            // 	z = a ⋅ sin φ1 + b ⋅ sin φ2
            const z = (a * Math.sin(φ1)) + (b * Math.sin(φ2));

            // φi = atan2(z, √x² + y²)
            φi = Math.atan2(z, Math.sqrt((x ** 2) + (y ** 2)));

            // λi = atan2(y, x)
            λi = Math.atan2(y, x);

            //console.log(lat1, long1,  (φi*180)/Math.PI, (λi*180)/Math.PI);

            var f_lat = (φi * 180) / Math.PI;
            var f_long = (λi * 180) / Math.PI;
            // _t in unix ms
            var profile_mark = { '_i' : interpolated_time,'heading': heading, 'speed' : speed, 'latitude': f_lat, 'longitude': f_long, 'iter': iter, 'time': interpolated_time, 'timestamp': interpolated_time, '_t' : interpolated_time.getTime() };
            //console.log(profile_mark);
            new_route.push(profile_mark);
            if (mmsi == "255806433") { 
                console.log(profile_mark);
            console.log(new_route);
        }
            

        }
        var _t = interpolated_time.getTime();
        end_pt['_t'] = _t;
        end_pt['_i'] = new Date((end_pt.timestamp));
        new_route.push(end_pt);
        if (mmsi == "255806433") { 
            console.log(new_route);
        }
        // profile_mark = { 'end': true };
        //new_route.push(profile_mark);

        // console.log(new_route.length);

    }
    return new_route;

}



function simple_linear_time_interpolate(start_pt, end_pt, iter, track_type, mmsi) {
    
    //console.log(`pointt : ${start_pt}, ${end_pt}`);

    if (mmsi == "235080084") {
        if (track_type == "track") {
            console.log(start_pt);
            console.log(end_pt);
        }
    }

    var heading = -1;
    if ('course' in start_pt) {
        heading = start_pt['course'];
    }

    lat1 = start_pt.latitude;
    lat2 = end_pt.latitude;
    long1 = start_pt.longitude;
    long2 = end_pt.longitude;
    
    route = [{ lat: lat1, lng: long1 }, { lat: lat2, lng: long2 }];
    var d = calculateDistance(route);
    if (d<10){
        d = 10; // min distance (m) for calcs. Within error bounds.
    }

    var speed = 0;
    speed = getAvgSpeed(start_pt, end_pt);
    if (speed == 0) {
        speed = 0.01;
    }
    if (mmsi == "235080084") {
        console.log(`speed ${speed}`);
    }
    
   
    var start_ms = new Date(start_pt.timestamp).getTime();
    var end_ms = new Date(end_pt.timestamp).getTime();
    var j_duration = end_ms - start_ms;


    var new_route = [];
    

    

    if (mmsi == "235080084") {
        
        console.log(d, track_type);
        console.log(j_duration / 1000, track_type);
        console.log(start_pt.timestamp, track_type);
        console.log(start_ms, track_type);

    }

 
        
        // init distance and time
        var interpolate_distance = 0;
        var interpolated_time = null;
         var interpolated_time_js = null;
        // if ('time' in start_pt) {
        //     //console.log(start_pt.time);
        //     interpolated_time = new Date((start_pt.time));
        // }
        if ('timestamp' in start_pt) {
            //console.log(start_pt.timestamp);
            var tmp = new Date((start_pt.timestamp));
            var tmp_ms = tmp.getTime();
            interpolated_time = time_string(tmp_ms)[5];
            if (mmsi == "235080084") {
                console.log(start_pt.timestamp, track_type);
                console.log(interpolated_time, track_type);
            }

            // start_pt.timestamp = interpolated_time;
          
        }
        else{
            console.log(start_pt);
            console.log(mmsi);
            console.log(track_type);
        }
        //var _t = interpolated_time.getTime(); //ms
        var _t = tmp_ms;
        if (mmsi == "235080084") {
                console.log(_t);
                console.log(interpolated_time);
        }

        start_pt['_t'] = _t;
        start_pt['_i'] = new Date((start_pt.timestamp));
        start_pt['_i'] = interpolated_time;

        if (mmsi == "235080084") {
                console.log(_t);
            console.log(interpolated_time);
            console.log(start_pt);
            console.log(new_route);
        }
      

        //new_route.push(start_pt);

        if (mmsi == "235080084") { 
            console.log(start_pt);
            console.log(new_route);
        }

        if (track_type == "track") {
            console.log(`track in : ${interpolated_time}`);
        }
        
        console.log(start_pt);
        var active_time_ms = start_ms; 
    console.log(interpolated_time);
    interpolated_time_js = new Date((interpolated_time));
    console.log(interpolated_time_js);
    var last_pt = start_pt;
    while (active_time_ms < end_ms) {
            delta_d = speed * inter_delta_t; // get delta distance (m)
            interpolate_distance += delta_d; // get distance from original
            // var delta_t = delta_d / speed;
    //          route = [{ lat: lat1, lng: long1 }, { lat: lat2, lng: long2 }];
            // var d = calculateDistance(route); 
            // lat1 = last_pt.latitude;
            // long1 = last_pt.longitude;
            
            // route = [{ lat: lat1, lng: long1 }, { lat: lat2, lng: long2 }];
            // interpolate_distance = calculateDistance(route); 


            // if (speed < 2) {
            //     delta_t = 10;
            // }\
           
            if (mmsi == "235080084") {
                console.log(`delta_d ${delta_d} | inter_delta_t ${inter_delta_t}`);
                console.log(`total_d ${d}`);
                console.log(`time: ${interpolated_time} ${iter}`);
                console.log(`active time: ${active_time_ms}`);
            }
           
            // console.log(interpolated_time);
            // console.log(delta_t);
            //console.log(`${track_type} : delta_t : ${delta_t}, ${interpolated_time} speed: ${speed} distance : ${interpolate_distance} : delta_d : ${delta_d}`);
            
            interpolated_time_js.setMilliseconds(interpolated_time_js.getMilliseconds() + (inter_delta_t * 1000)); 
            var tmp_iter_ms = interpolated_time_js.getTime();
            //tmp_iter_ms = tmp_iter_ms + (inter_delta_t * 1000);
            interpolated_time = time_string(tmp_iter_ms)[5];
            interpolated_time_js = new Date(interpolated_time);
            
                


            active_time_ms += (inter_delta_t * 1000);
        
            //console.log(interpolated_time);
            //console.log(`delta_t : ${delta_t}, ${interpolated_time} speed: ${speed} distance : ${interpolate_distance} : delta_d : ${delta_d}`);
            //	a = sin((1−f)⋅δ) / sin δ    
            const f = parseFloat(interpolate_distance) / d;
            const delta = d / earthRadius;
            const a = Math.sin((1 - f) * delta) / Math.sin(delta);

            // b = sin(f⋅δ) / sin δ
            const b = Math.sin(f * delta) / Math.sin(delta);
           
            // x = a ⋅ cos φ1 ⋅ cos λ1 + b ⋅ cos φ2 ⋅ cos λ2
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const λ1 = long1 * Math.PI / 180;
            const λ2 = long2 * Math.PI / 180;
            const x = (a * Math.cos(φ1) * Math.cos(λ1)) + (b * Math.cos(φ2) * Math.cos(λ2));

            // y = a ⋅ cos φ1 ⋅ sin λ1 + b ⋅ cos φ2 ⋅ sin λ2
            const y = (a * Math.cos(φ1) * Math.sin(λ1)) + (b * Math.cos(φ2) * Math.sin(λ2));

            // 	z = a ⋅ sin φ1 + b ⋅ sin φ2
            const z = (a * Math.sin(φ1)) + (b * Math.sin(φ2));

            // φi = atan2(z, √x² + y²)
            φi = Math.atan2(z, Math.sqrt((x ** 2) + (y ** 2)));

            // λi = atan2(y, x)
            λi = Math.atan2(y, x);

            //console.log(lat1, long1,  (φi*180)/Math.PI, (λi*180)/Math.PI);

            var f_lat = (φi * 180) / Math.PI;
            var f_long = (λi * 180) / Math.PI;
            // _t in unix ms
        
            var profile_mark = {'_at' : active_time_ms, '_jf' : interpolated_time_js, '_d' : interpolate_distance, '_i' : interpolated_time,'heading': heading, 'speed' : speed, 'latitude': f_lat, 'longitude': f_long, 'iter': iter, 'time': interpolated_time, 'timestamp': interpolated_time, '_t' : interpolated_time_js.getTime() };
           
        //console.log(profile_mark);
        if (active_time_ms < end_ms) {
            new_route.push(profile_mark);
            if (mmsi == "235080084") {
                console.log(start_pt.timestamp, interpolated_time, end_pt.timestamp, active_time_ms);
            }
        }
        else {
            console.log("time over end pt limit");
            if (mmsi == "235080084") { 
             
                console.log(start_ms);
                console.log(active_time_ms);
                console.log(end_ms);
                console.log(delta_d);
                console.log(inter_delta_t);
                console.log(interpolated_time);
                console.log(interpolated_time_js);
                console.log(profile_mark);
                console.log(new_route);
                
        }
        }
        // if (mmsi == "235080084") { 
             
        //         console.log(start_ms);
        //         console.log(active_time_ms);
        //         console.log(end_ms);
        //         console.log(delta_d);
        //         console.log(inter_delta_t);
        //         console.log(interpolated_time_js);
        //         console.log(profile_mark);
        //         console.log(new_route);
                
        // }
            

        }
        var _t = interpolated_time_js.getTime();
        end_pt['_t'] = _t;
        end_pt['_i'] = new Date((end_pt.timestamp));
        end_pt['_i'] = interpolated_time;
        //new_route.push(end_pt);
        if (mmsi == "235080084") { 
            console.log(new_route);
        }
        // profile_mark = { 'end': true };
        //new_route.push(profile_mark);

        // console.log(new_route.length);

    
    return new_route;

}


