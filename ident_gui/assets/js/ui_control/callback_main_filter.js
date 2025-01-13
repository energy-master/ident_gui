

const runFilter = (location, density, v_types) => {

    return new Promise((resolve, reject) => {

        // success value of download
        var success = true;
    
        post_data = {
            "location": location,
            "vessel_type_filter": v_types,
            "vessel_density_filter" : density
        }

        url = discrete_data_sets_api;
        console.log(url);
        console.log(JSON.stringify(post_data));
        $.post(url, JSON.stringify(post_data), function (data) {




            //console.log(data);
            buildResults(data);
            

            
           
           
        
            if (success) {
                resolve(success);
            } else {
                reject(Error("Error in data filter"));
            }

        });

    }); // promise
}


/*
*
*   !!!! Run main filter !!!!
*
*/

const runFilterLocal = (location, density, density_logic, v_types, filter_start_time, filter_end_time, mmsi_search) => {

    console.log("filter version: 2.5");

    var filter_distance = valid_distance_m;
    if (location == "netley") {
        filter_distance = valid_distance_nm;
    }

    console.log(`running filter : ${filter_start_time} and ${filter_end_time} Range : ${filter_distance}`);

    //density_logic = 'eq';
    return new Promise((resolve, reject) => {
       

        //update vessel types on v_types
        for (var i = 0; i < v_types.length; i++){
            if (v_types[i] == 40) {
               // v_types.push();
                v_types.push(45);
            }
            if (v_types[i] == 70) {
               // v_types.push();
                v_types.push(79);
            }
        }

        console.log(v_types)
        // success value of download
        var success = true;
    
        url =  discrete_data_fetch_api + `/${location}`;
        console.log(url);
        // console.log(JSON.stringify(post_data));
        valid_epochs = [];
        $.getJSON(url, function (data) {
            console.log("Got Epochs!");
            var epochs = data['data'][0]['json_data']['epochs'];
            console.log(epochs);
            
            var number_e = epochs.length;
            for (var i = 0; i < epochs.length; i++){
                //console.log(`epoch ${i} of  ${number_e}`);
                // *** time filter ***
                var filter_start_date_js = new Date(filter_start_time);
                // console.log(filter_start_date_js);
                var filter_start_date_ms = filter_start_date_js.getTime();

                var filter_end_date_js = new Date(filter_end_time);
                var filter_end_date_ms = filter_end_date_js.getTime();
              
                var epoch_start_time_ms = epochs[i].start_time_s * 1000;
                var epoch_end_time_ms = epochs[i].end_time_s * 1000;
                //console.log(epochs[i].start_time);
                //console.log( epochs[i].start_time_s);
                if (epoch_end_time_ms < filter_start_date_ms) {
                    //exit
                    continue;
                }

                if (epoch_start_time_ms > filter_end_date_ms) {
                    // exit
                    continue;
                }
               

                var epoch_vessels_unique = {};
                var epoch_vessels = epochs[i].epoch_vessel_types;
                var epoch_number_unique_vessels = 0;
                var epoch_mmsis = [];
                // check vessel_type
                // console.log(v_types);
                //console.log(epoch_vessels);

                for (var j = 0; j < epoch_vessels.length; j++) {
                    epoch_mmsis.push(epoch_vessels[j].mmsi);
                }
            
                for (var j = 0; j < epoch_vessels.length; j++){
                    
                    if (!Number.isNaN(epoch_vessels[j])) {
                        var x = GetVesselTypeInt(epoch_vessels[j]);
                        epoch_vessels[j] = parseInt(x);
                    }
                }

                
                for (var j = 0; j < epoch_vessels.length; j++){
                    try {
                        var v_str = GetVesselTypeStr(epoch_vessels[j]);//['vessel_type']
                        console.log(v_str);
                        epoch_vessels[j]['vessel_type_str'] = v_str;


                    }
                    catch (error) {
                        console.error(error);
                    }
                }

                //console.log(epoch_vessels);
                var epoch_vessels = epoch_vessels.map(function (x) { 

                    return parseInt(x); 

                });
                



                var activities = epochs[i].activity;
                if ((includesAny(v_types, epoch_vessels)) && (mmsi_search==null)) {
                    console.log('search non mmsi');
                    for (var j = 0; j < epochs[i].vessels.length; j++){
                        var mmsi = epochs[i].vessels[j].mmsi;
                        if (mmsi in epoch_vessels_unique){

                        }
                        else {
                            epoch_vessels_unique[mmsi] = epochs[i].vessels[j];
                            epoch_number_unique_vessels++;
                        }

                    }

                    epochs[i]['unique_vessels'] = epoch_vessels_unique;
                    epochs[i]['unique_number_vessels'] = epoch_number_unique_vessels;

                    //console.log(epoch_number_unique_vessels);
                    //console.log(epoch_number_unique_vessels);

                    var add_epoch = false;
                    var number_valid = 0;
                    
                    for (var j = 0; j < activities.length; j++){
                        console.log(activities)
                        //unique vessels only
                        var mmsis = [];
                        var unique_vessels = [];
                        var distance_valid = false;
                        var number_dense_vessels = 0;
                        for (var k = 0; k < activities[j].vessels.length; k++){
                            //console.log()
                            var v_int = GetVesselTypeInt(activities[j].vessels[k]['vessel_type']);
                            activities[j].vessels[k]['vessel_type'] = parseInt(v_int);
                            //console.log(activities[j].vessels[k])
                            if (mmsis.includes(activities[j].vessels[k].mmsi)) {
                                if (activities[j].vessels[k].distance < filter_distance) {
                                    //console.log(typeof parseInt(activities[j].vessels[k].vessel_type));
                                    //console.log(v_types);
                                    //console.log(activities[j].vessels[k].vessel_type);
                                    if (array_intersect(v_types, [parseInt(activities[j].vessels[k].vessel_type)])) {
                                        //console.log([activities[j].vessels[k].vessel_type]);
                                        distance_valid = true;
                                    }
                                    //number_dense_vessels++;
                                }
                            }
                            else {
                                mmsis.push(activities[j].vessels[k].mmsi);
                                unique_vessels.push(activities[j].vessels[k]);
                                //console.log(typeof parseInt(activities[j].vessels[k].vessel_type));
                                //console.log(v_types);
                                if (activities[j].vessels[k].distance < filter_distance) {
                                    //console.log(activities[j].vessels[k].vessel_type);
                                    if (array_intersect(v_types, [parseInt(activities[j].vessels[k].vessel_type)])) {
                                            
                                        distance_valid = true;
                                        number_dense_vessels++;
                                    }
                                   // distance_valid=true;
                                    
                                }
                            }
                        }

                        if (number_dense_vessels == 0) {
                            console.log("no vessels");
                        }

                        activities[j]['unique_vessels'] = unique_vessels;
                        activities[j]['number_dense_vessels'] = number_dense_vessels;
                        var number_active_vessels = activities[j].unique_vessels.length;

                        if ((!distance_valid) && (density!=0)){
                            continue;
                        }

                        if (density_logic == 'gt') {
                            //console.log('gt');
                            if (number_dense_vessels > density) {
                                //valid_epochs.push(epochs[i]);
                                add_epoch = true;
                                epochs[i]['valid'] = true; 
                                activities[j]['valid'] = true;
                                number_valid++;
                            }
                        }
                        if (density_logic == 'eq') {
                            // console.log('eq');
                            // console.log(number_dense_vessels, density )
                            if (number_dense_vessels == density) {
                                //valid_epochs.push(epochs[i]);
                                add_epoch = true;
                                epochs[i]['valid'] = true; 
                                activities[j]['valid'] = true;
                                number_valid++;
                            }
                        }
                        if (density_logic == 'lt') {
                            //  console.log('lt');
                            if (number_dense_vessels < density) {
                                //valid_epochs.push(epochs[i]);
                                add_epoch = true;
                                epochs[i]['valid'] = true; 
                                activities[j]['valid'] = true;
                                number_valid++;
                            }
                        }
                        if (density_logic == 'lte') {
                            // console.log('lte');
                            if (number_dense_vessels <= density) {
                                //valid_epochs.push(epochs[i]);
                                add_epoch = true;
                                epochs[i]['valid'] = true; 
                                activities[j]['valid'] = true;
                                number_valid++;
                            }
                        }
                        if (density_logic == 'gte') {
                             console.log('gte');
                            if (number_dense_vessels >= density) {
                                //valid_epochs.push(epochs[i]);
                                add_epoch = true;
                                epochs[i]['valid'] = true; 
                                activities[j]['valid'] = true;
                                number_valid++;
                            }
                        }

                    }
                    if (add_epoch) {
                        
                        epochs[i]['number_valid_activities'] = number_valid;
                        valid_epochs.push(epochs[i]);
                    }

                }
                
                // if correct vessels
                if (v_types.length == 0) {
                    var add_epoch = false;
                    for (var j = 0; j < activities.length; j++) {
                        if (activities[j]['special_note'] == "noise") {
                            add_epoch = true;
                            epochs[i]['valid'] = true;
                            activities[j]['valid'] = true;
                            number_valid++;
                        }

                        activities[j]['unique_vessels'] = 0;
                        activities[j]['number_dense_vessels'] = 0;
                       
                    }

                    epochs[i]['unique_vessels'] = epoch_vessels_unique;
                    epochs[i]['unique_number_vessels'] = epoch_number_unique_vessels;
                    if (add_epoch) {
                            
                        epochs[i]['number_valid_activities'] = number_valid;
                        valid_epochs.push(epochs[i]);
                    }


                }

                if (mmsi_search != null) {
                    var add_epoch = false;
                    console.log("searching mmsi: " + mmsi_search);
                    var activity_unique_vessels = [];
                    for (var j = 0; j < activities.length; j++) {
                        for (var k = 0; k < activities[j].vessels.length; k++) {

                            if (activities[j].vessels[k].mmsi == mmsi_search) {
                                console.log('found');
                                console.log(activities[j].vessels[k].mmsi);
                                console.log(activities[j].vessels[k].distance);

                                if (activities[j].vessels[k].distance < filter_distance){
                                    activity_unique_vessels.push(activities[j].vessels[k]);
                                    add_epoch = true;
                                    epochs[i]['valid'] = true;
                                    activities[j]['valid'] = true;
                                    number_valid++;
                                }
                            }
                       

                        }
                        activities[j]['unique_vessels'] = activity_unique_vessels;
                        activities[j]['number_dense_vessels'] = 1;
                        
                        
                    }
                    epochs[i]['unique_vessels'] = epoch_vessels_unique;
                    epochs[i]['unique_number_vessels'] = epoch_number_unique_vessels;
                    if (add_epoch) {
                            
                        epochs[i]['number_valid_activities'] = number_valid;
                        valid_epochs.push(epochs[i]);
                    }

                }

                
                
                // no vessels selected
                // break;
            }//all epochs


            //buildResults(data);
            if (success) {
                resolve(valid_epochs);
            } else {
                reject(Error("Error in data filter"));
            }

        });

    }); // promise
}


function fill_location(name) {
    var el = document.getElementById('location-data');
    el.value = name;

    console.log(name);
    // for (var i = 0; i < loc_ids.length; i++){
    //     if (name == loc_ids[i]) {
    //         var id_ = `${name}-label`;
    //         console.log(id_);
    //         el = document.getElementById(id_);
    //         if (el.classList.contains('w3-grey')) {
    //             el.classList.remove('w3-grey');
    //             console.log("fds");
    //         }
            
    //         el.classList.add('w3-blue');
    //         console.log(el.classList);
    //     } else {
    //         var id_ = `${name}-label`;
    //         el = document.getElementById(id_);
    //         if (el.classList.contains('w3-blue')) {
    //             el.classList.remove('w3-blue');
    //         }
           
    //         el.classList.add('w3-grey');
    //     }
       
        
    // }
   




}

var loc_ids = ['Netley','so1','so1_server','porpoise'];