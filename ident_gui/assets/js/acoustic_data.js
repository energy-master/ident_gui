
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
*   Acoustic Download and Data aquistion promises.
*
*/





/*
*
* Get snapshot ids for location within time constraints.
* Vector of snapshot ids
*/


const snapshot_id_download = (location) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
       
        url = `${location_snapshot_api_url}/${location}`;
        console.log(url);
        $.getJSON(url, function (data) {

            ss_id = [];
            data['data'].forEach((ss) => {
            //console.log(v['mmsi']);
                ss_id.push(ss['ss_id']);
            });
        
            if (success) {
                resolve(ss_id);
            } else {
                reject(Error("Error in snapshot id download"));
            }

        });

    }); // end of promise dec



    
};




/*
*
* Get snapshot data. Get data for batch of snapshot ids.
* Provide vector of snapshot ids.
*/


const snapshot_data_download = (snapshot_ids) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
       

        // set max 100 for now
        post_data = {
            "ss_id_list":snapshot_ids.slice(0, 500)
        }

        url = batch_snapshot_data_api_url;
        console.log(url);
        $.post(url, JSON.stringify(post_data), function (data) {

            // save into acsoutic data structure ( ss ids and structure)
            //console.log(data);
            // data.forEach((data_item) => {

            // })
        
            if (success) {
                resolve(data);
            } else {
                reject(Error("Error in snapshot data download"));
            }

        });

    }); // end of promise dec



    
};


/*
*
* Get signature labels
* 
*/


const label_data_download = () => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;

        url = batch_label_data_api_url;
        console.log(url);
        $.getJSON(url, function (data) {

            if (success) {
                resolve(data);
            } else {
                reject(Error("Error in snapshot data download"));
            }

        });

    }); // end of promise dec



    
};



/*
*
* Get snapshot data. Get data for batch of snapshot ids.
* Provide vector of snapshot ids.
*/


const measure_density = (snapshot_ids) => {

    return new Promise((resolve, reject) => {



        if (success) {
            resolve(success);
        } else {
            reject(Error("Error in snapshot data download"));
        }

    });

};




/*
*
*   ************** Acoustic Source Change*********************
*/


function acousticSourceChange()
{

    // we have a new snapshot id


    // udpate acousitc data view
    BuildAppDataAcoustic();

    // load and play
    application_data.acoustic_player.loadAndPlay();
    

}

