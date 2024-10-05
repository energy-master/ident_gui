



/**
 * Application Setup. This can be saved for future use or shared for data downloaf
 * @date 3/17/2024 - 7:04:02 PM
 *
 * @class ApplicationSetup
 * @typedef {ApplicationSetup}
 */

class ApplicationSetup{

    /**
     * Creates an instance of ApplicationSetup.
     * @date 3/17/2024 - 11:39:07 PM
     *
     * @constructor
     * @param {*} [approach_radius=isRequired()]
     * @param {*} [track_radius=isRequired()]
     * @param {*} [data_start_time=isRequired()]
     * @param {*} [data_end_time=isRequired()]
     * @param {*} [relevant_delta_time=isRequired()]
     * @param {*} [data_latitude=isRequired()]
     * @param {*} [data_longitude=isRequired()]
     */
    // Constructor
    constructor(approach_radius  = isRequired('approach_radius'), track_radius = isRequired('track_radius'), data_start_time= isRequired('data_start_time'), 
        data_end_time = isRequired('date_end_time'), relevant_delta_time= isRequired('relevant_delta_timd'), data_latitude= isRequired('data_latitude'), data_longitude= isRequired('data_long'), listener_location = isRequired('location')) {
        
        // Define Setup

        this.setup_data.approach_radius = approach_radius;
        this.setup_data.track_radius = track_radius;
        this.setup_data.data_start_time = data_start_time;
        this.setup_data.data_end_time = data_end_time;
        this.setup_data.relevant_delta_time = relevant_delta_time;
        this.setup_data.data_latitude = data_latitude;
        this.setup_data.data_longitude = data_longitude;
        this.setup_data.listener_location = listener_location;
    }

   
    
    setup_data = { 
        approach_radius: 0.0,
        track_radius: 0.0,
        data_start_time: "",
        data_end_time : "",
        relevant_delta_time : 1,
        data_latitude : 0.0,
        data_longitude : 0.0,
        listener_location : ""
    };



}


class VesselTrack {
    /**
     * Creates an instance of VesselTrack.
     * @date 3/17/2024 - 11:34:08 PM
     *
     * @constructor
     */
    constructor(){}
    start_time = "";
    end_time = "";
    profile = [];
    location_profile = []; // js time and position stamps lat, long, time
    track_id = -1;


    set_local_track() {
        for (var i = 0; i < this.profile.length; i++){
            var latitude = this.profile[i].latitude;
            var longitude = this.profile[i].longitude;
            var time_js = new Date(this.profile[i].timestamp).getTime();
            var location = { lat: latitude, long: longitude, time: time_js };
            this.location_profile.push(location);
            //console.log(location);
            
        }
    }

    

}

class VesselApproach {
    /**
     * Creates an instance of VesselTrack.
     * @date 3/17/2024 - 11:34:08 PM
     *
     * @constructor
     */
    constructor(){}
    
    profile = [];
    start_time = "";
    end_time = "";
    approach_id = -1;
    acoustic_data_present = false;
    acoustic_data_cover = 0;
    xr_snapshots = [];
    extra_ = [];


}

class InterpolatedVesselApproach {
    /**
     * Creates an instance of VesselTrack.
     * @date 3/17/2024 - 11:34:08 PM
     *
     * @constructor
     */
    constructor(){}
    
    profile = [];
    start_time = "";
    end_time = "";
    approach_id = -1;
    acoustic_data_present = false;
    acoustic_data_cover = 0;
    xr_snapshots = [];


}

class InterpolatedVesselTrack {
    /**
     * Creates an instance of VesselTrack.
     * @date 3/17/2024 - 11:34:08 PM
     *
     * @constructor
     */
    constructor(){}
    
    profile = [];
    start_time = "";
    end_time = "";
    track_id = -1;
    acoustic_data_present = false;
    acoustic_data_cover = 0;
    xr_snapshots = [];


}

class VesselDynamics {
     /**
     * Creates an instance of VesselTrack.
     * @date 3/17/2024 - 11:34:08 PM
     *
     * @constructor
     */
    constructor(){}

    vessel_tracks = [];
    vessel_approaches = [];
    vessel_interpolated_approaches = []; 
    vessel_interpolated_tracks = [];
    vessel_approaches_custom = [];

    
    
    

    // add a track to the vessel dynamics
    add_track(track){
        this.vessel_tracks.push(track);
        //this.number_tracks++;
    }
     add_interpolated_track(approach){
        this.vessel_interpolated_tracks.push(approach);
        // this.number_approaches++;
        //this.vessel_interpolated_approaches.push([]); //add a spot for future interpolated approaches
    }

    // add an approach to vessel dynamics
    add_approach(approach){
        this.vessel_approaches.push(approach);
        // this.number_approaches++;
        //this.vessel_interpolated_approaches.push([]); //add a spot for future interpolated approaches
    }

    add_interpolated_approach(approach){
        this.vessel_interpolated_approaches.push(approach);
        // this.number_approaches++;
        //this.vessel_interpolated_approaches.push([]); //add a spot for future interpolated approaches
    }

    add_load_interpolated_approach(approach) {
        this.vessel_interpolated_approaches.push(approach);
    }

     add_custom_approach(approach) {
        //  console.log('APPPPPP');
        // console.log(approach);
        this.vessel_approaches_custom.push(approach);
    }





    // ONLY SET W/ .length
    number_tracks = 0;
    number_approaches = 0;
    number_interpolated_tracks = 0;
    number_interpolated_approaches = 0;


    earliest_approach = 0;
    last_approach = 0;




}

class VesselHit{
    /**
     * Creates an instance of AISVesselHits.
     * @date 3/17/2024 - 11:34:08 PM
     *
     * @constructor
     */
    constructor(mmsi=isRequired('mmsi'), call_sign = isRequired('call_sign'), destination = isRequired('destination'), draught = isRequired('draught'), flag = isRequired('flag'), imo = isRequired('imo'),
    name = isRequired('name'), vessel_type= isRequired(vessel_type)){

        this.vessel_overview_data.mmsi = mmsi;
        this.vessel_overview_data.call_sign = call_sign;
        this.vessel_overview_data.destination = destination;
        this.vessel_overview_data.draught = draught;
        this.vessel_overview_data.flag = flag;
        this.vessel_overview_data.imo = imo;
        this.vessel_overview_data.name = name;
        this.vessel_overview_data.vessel_type = vessel_type;
        var v_str = "";
        if (!Number.isNaN(vessel_type)) {
            var x = GetVesselTypeInt(vessel_type);
            var v_int = parseInt(x);
            v_str = GetVesselTypeStr(v_int);
            this.vessel_overview_data.vessel_type_str = v_str;
        }
        else {
            this.vessel_overview_data.vessel_type_str = vessel_type;
        }

        //this.vessel_overview_data.vessel_type_str = vessel_types[vessel_type];



        this.vessel_dynamics = new VesselDynamics();
        
    }

    // get active approach by time (ms)
    get_approach(active_time) {

        for (var i = 0; i < this.vessel_dynamics.vessel_approaches_custom.length; i++){
            //console.log("dfs");
            var l = this.vessel_dynamics.vessel_approaches_custom[i].profile.length;
            //console.log(`l ${l}`);
            var start = this.vessel_dynamics.vessel_approaches_custom[i].profile[0]['_t'];
            var end = this.vessel_dynamics.vessel_approaches_custom[i].profile[l - 1]['_t'];
            //console.log(start, end);
            if ((active_time > (start-200000)) && (active_time < (end+200000))) {
               
                //console.log(this.vessel_dynamics.vessel_approaches_custom[i].profile);
                return this.vessel_dynamics.vessel_approaches_custom[i].profile;
            }
        }
        return (0);
    }


    vessel_overview_data = {
        mmsi : "",
        call_sign : "",
        destination : "",
        draught : "",
        flag : "",
        imo: "",
        name : "",
        vessel_type: 0,
        vessel_type_str: ""
 
    };

    // data analysis status
    data_xr = false;
    tracks_built = false;
    approaches_built = false;
    
    // dynamics
    vessel_dynamics = null;


    
}


var vessel_hud = {
    speed: 0,
    heading: 0,
    distance: 0
};

var vessel_huds = {};

class AISVesselHits{

    number_custom_approaches = 0;
    constructor() {
        this.vessels = [];
    }
    
    vessels = null;
    add_vessel(vessel){
        this.vessels.push(vessel);
        this.number_of_vessels = this.vessels.length;
    }
    
    number_of_vessels = 0;
    active_vessel = 0;

    // return vessel by mmsi
    get_vessel(mmsi){   

        for (var i = 0; i < this.vessels.length; i++){
            var v = this.vessels[i];
            if (v.vessel_overview_data.mmsi==mmsi){
                return v;
            }
        }

        return 0;

    }




}


class DensityProfile{

    density_profile = [];
   
    // add density tick
    add_density_tick(density_tick) {
        
        this.number_density_ticks++;
        this.density_ticks.push(density_tick)

    }

    }

class Density{

    ticks = 0;
    start_time = 0;
    end_time = 0;

}










