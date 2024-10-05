


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

const isRequired = () => { throw new Error('param is required'); };


/**
 * Description placeholder
 * @date 3/17/2024 - 7:02:07 PM
 *
 * @class ApplicationData
 * @typedef {ApplicationData}
 */
class ApplicationData{

    



}



/**
 * Application Setup. This can be saved for future use or shared for data downloaf
 * @date 3/17/2024 - 7:04:02 PM
 *
 * @class ApplicationSetup
 * @typedef {ApplicationSetup}
 */
class ApplicationSetup{

    // Constructor
    constructor(approach_radius  = isRequired(), track_radius = isRequired(), data_start_time= isRequired(), 
        data_end_time = isRequired(), relevant_delta_time= isRequired(), data_latitude= isRequired(), data_longitude= isRequired()) {
        
        // Define Setup

        this.setup_data.approach_radius = approach_radius;
        this.setup_data.track_radius = track_radius;
        this.setup_data.data_start_time = data_start_time;
        this.setup_data.data_end_time = data_end_time;
        this.setup_data.relevant_delta_time = relevant_delta_time;
        this.setup_data.data_latitude = data_latitude;
        this.setup_data.data_longitude = data_longitude;

    }

    
    setup_data = { 
        approach_radius: 0.0,
        track_radius: 0.0,
        data_start_time: "",
        data_end_time : "",
        relevant_delta_time : 1,
        data_latitude : 0.0,
        data_longitude : 0.0
    };



}



class Vessel{



    
}

class AISVesselData{




}




/*
*
*   Download and Data aquistion promises.
*
*/


const ais_download = (application_setup) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
    

        post_data = {
            "dlimit": application_setup.setup_data.approach_radius,
            "src_lat": application_setup.setup_data.data_latitude,
            "src_long": application_setup.setup_data.data_longitude,
            "src_time": application_setup.setup_data.data_start_time,
            "tlimit": -1,
            "start_time": application_setup.setup_data.data_start_time,
            "end_time": application_setup.setup_data.data_end_time

        };
    

        console.log(JSON.stringify(post_data));
        var url = "https://vixen.hopto.org/rs/api/v1/data/ais/";
        console.log(url);
        $.post(url, JSON.stringify(post_data), function (data) {


            if (success) {
                resolve("Stuff worked!");
            } else {
                reject(Error("Error in AIS Download"));
            }

        });

    }); // end of promise dec



    
};




