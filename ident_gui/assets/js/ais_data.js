


/**
 * Copyright (c) 2024
 *
 * Application data for Ident. Download and definitions.
 *
 * @summary Application data for ident.
 * @author Rahul Tandon (r.tandon@rsaqua.co.uk)
 *
 *
 */


/*
*
*   Download and Data aquistion promises.
*
*/

/*
*
*   Download list of unique vessels satisfying constraints 
*
*/

const ais_download = (application_setup, ais_hits) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
    
    
        var start_time_ms = new Date(application_setup.setup_data.data_start_time).getTime();
        var end_time_ms = new Date(application_setup.setup_data.data_end_time).getTime();

        var search_start = time_string(parseInt(start_time_ms) - 3600000)[6];
        var search_end = time_string(parseInt(end_time_ms) + 3600000)[6];

        post_data = {
            //"dlimit": application_setup.setup_data.track_radius,
            "dlimit":5000,
            "src_lat": application_setup.setup_data.data_latitude,
            "src_long": application_setup.setup_data.data_longitude,
            "src_time": application_setup.setup_data.data_start_time,
            "tlimit": -1,
            // "start_time": application_setup.setup_data.data_start_time,
            // "end_time": application_setup.setup_data.data_end_time
            "start_time" : search_start,
            "end_time" : search_end
          
        };
    
       
        console.log(search_start);
        console.log(search_end);
        console.log(JSON.stringify(post_data));
        console.log(ais_api_url);
        
        $.post(ais_api_url, JSON.stringify(post_data), function (data) {

            console.log(data);
            // if (!('hits' in data['data'][0])) {
            if (data['num_unique'] != 0){
                
                data['data'].forEach((v) => {
                    
                
                    console.log("adding vessel to ais data structure...")
                    console.log(data['data']);
                    vessel = new VesselHit(v['mmsi'], v['call_sign'], v['destination'], v['draught'], v['flag'], v['imo'], v['name'], v['vessel_type']);
                    ais_hits.add_vessel(vessel);
                

                });
        
            }

            if (success) {
                resolve(ais_hits);
            } else {
                reject(Error("Error in AIS Download / Hit data creation"));
            }

        });

    }); // end of promise dec



    
};





// --- test app ---

// ais_hits = new AISVesselHits();
// app_setup = new ApplicationSetup(1500, 1500, "2019-12-13 12:50:00", "2019-12-13 13:50:00", 15.0, 50.871, -1.373, "netley");

// console.log("Grabbing vessels...")
// ais_download(app_setup, ais_hits)
//     .then((ais_hits) => {
//         // console.log(v_hits);
//         console.log(`Number of vessels : ${ais_hits.number_of_vessels}`);

//         //for (j = 0; j < v_hits.number_of_vessels; j++) {
//             for (j = 0; j < 1; j++) {
        
//                 console.log(`Grabbing vessel tracks for : ${ais_hits.vessels[j].vessel_overview_data.mmsi}`);
//                 generate_vessel_tracks(ais_hits.vessels[j], app_setup)
//                     .then((vessel) => {
//                         // console.log(vessel);
                        
//                         console.log(`Iterating over approaches for data xr and interpolation. ${vessel.vessel_overview_data.mmsi}`);
//                         number_approaches = vessel.vessel_dynamics.number_approaches;
//                         //console.log(`number of approaches : ${number_approaches} for mmsi : ${vessel.vessel_overview_data.mmsi}`);
//                         for (ik = 0; ik < vessel.vessel_dynamics.number_approaches; ik++) {

//                             console.log("Cross referencing acoustic data with approaches");
//                             xr_track_with_data(vessel, app_setup, ik).then((vessel) => {
                              
//                             })


//                             console.log(`interpolate approaches ${ik}`)
//                             interpolate_tracks(vessel.vessel_dynamics.vessel_approaches[ik].profile, vessel, ik).then((value) => {
                                   
//                             })



//                         } // number approaches


//                     }).catch((err) => {
                       
//                         // Handle the error...
//                     });
               
//              }
            
//     })
//     .catch((err) => {
//         // Handle the error...
//     });

    


// snapshot_id_download('netley').then((ss_ids) => {
//     // console.log(data);
//     snapshot_data_download(ss_ids).then((data) => {
//         //console.log(data['data'][0]);
//         console.log(data);
//     })
// })

