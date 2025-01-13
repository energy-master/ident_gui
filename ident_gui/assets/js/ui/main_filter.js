




// search_el.addEventListener('click', function(){ 
    
//     alert("Hello World!"); 



// }); 
var vessels_all = [];

function select_all_vessels(){

    //let genders = Object.keys(population);
    vessels_all = Object.keys(vessel_types);
    for (var i = 0; i < vessels_all.length; i++){
        vessels_all[i] = parseInt(vessels_all[i]);
    }
    // console.log(vessels_all);
    // console.log(vessels_all.length);


    //css
    for (var i = 0; i < vessels_all.length; i++){
        var v_type = vessels_all[i];
        var v_id = `v-${v_type}`;
        // console.log(v_id);
        var e = document.getElementById(v_id);
        if (e != null) {
            if (e.classList.contains('w3-grey')) {
                e.classList.remove('w3-grey');
                e.classList.add('w3-blue');
            
            }
            else {
                e.classList.add('w3-blue');
            }
        }

    }


}


function toggleVessel(vessel_type){
    // alert("toggle");
    var v_type = vessel_type;
    var v_id = `v-${v_type}`;
    var e = document.getElementById(v_id);

   
    if (e.classList.contains('w3-grey')) {
            
        e.classList.remove('w3-grey');
        e.classList.add('w3-blue');
        
        //add 
        vessels_all.push(vessel_type);
            
        }
        else {
        
        var index = vessels_all.indexOf(vessel_type);
        if (index !== -1) {
            vessels_all.splice(index, 1);
        }
        e.classList.remove('w3-blue');
        e.classList.add('w3-grey');
        }

        //console.log(vessels_all , vessels_all.length);

}


function deselect_all_vessels(){

    //let genders = Object.keys(population);
    

    //css
    for (var i = 0; i < vessels_all.length; i++){
        var v_type = vessels_all[i];
        var v_id = `v-${v_type}`;
        // console.log(v_id);
        var e = document.getElementById(v_id);

        if (e != null) {

            if (e.classList.contains('w3-blue')) {
                e.classList.remove('w3-blue');
                e.classList.add('w3-grey');
            
            }
            else {
                e.classList.add('w3-grey');
            }
        }

    }

    vessels_all = [];


}


/*
*
* START SEARCH
*/

function openSearch() {
    // alert("sfs");
    //var lel = document.querySelector('.mysearch');
    // lel.addEventListener('click', openSearch);
    // if (lel.classList.contains('open')) {
    //     lel.classList.remove('open');
    //     return 1;
    // }
    // lel.classList.add('open');
    // $('.mysearch-button').click(function () {
    //$('.mysearch-button').toggleClass('open');
    // console.log("conect");
    // });
   
    console.log("search starts");
    show_loader_div('fetch-analyse-loader');
    // var location = document.getElementById('location-data').value;
    // var post_location = location_keys_r[location];
    // var post_density = document.getElementById('density-data').value;
    

    var location_value = document.getElementById('location_select').value;
    var index = document.getElementById('location_select').selectedIndex;
    var location_str= document.getElementById('location_select').options[index].text;
    var post_density = parseFloat(document.getElementById('density_value').value);
    var post_range = parseFloat(document.getElementById('search_range').value);
    var filter_start_time = document.getElementById('start_time_input').value;
    var filter_end_time = document.getElementById('end_time_input').value;
    var mmsi_search = document.getElementById('mmsi_search').value;


    filter_parms = {
        'location': location_value,
        'post_range': post_range,
        'mmsi' : mmsi_search
    }

    console.log(filter_parms);

    if (mmsi_search == "000000000") {
        mmsi_search = null;
    }

    console.log(location_value, location_str, post_density, post_range, filter_start_time, filter_end_time, mmsi_search);
   
    if (location_value == "") {
        alert("Please enter a valid location");
        return (0);
    }

    // search distance


    if (location_value == "netley") {
        valid_distance_nm = post_range;
    }
    else{
        valid_distance_m = post_range;
    }
  
    // alert(post_location);
    console.log(vessels_all);
    var filtered_epochs = runFilterLocal(location_value, post_density, density_logic ,vessels_all, filter_start_time, filter_end_time, mmsi_search).then((data => {
        
        //console.log(data);
        filtered_data = new DataSearch(data, location_value, location, post_range, filter_start_time, filter_end_time);
        buildFilterDataWindow();
        hide_loader_div('fetch-analyse-loader');
    
    }));

}


/*
*
*   MAIN FILTER CONTROL
*
*/
function build_filter_page() {
    var html = "";
    html += `

    <div id="filter-main">
    
    <form>


    <div class="mysearch open">
    <input type="search" class="mysearch-box" id="location-data" value="Netley" placeholder="enter location"/>
    
        <span class="mysearch-button" >
            <span class="mysearch-icon"></span>
        </span>
  
    </div>



    <div class="tag-holder">
     
        <span class="w3-tag w3-blue w3-xlarge" id="Netley-label" onclick="fill_location('Netley')">Netley (Sample)</span>
        <span class="w3-tag w3-blue w3-xlarge" id="so1-label" onclick="fill_location('so1')">Sussex Observatory 1 (Sample))</span>
        <span class="w3-tag w3-blue w3-xlarge" id="porpoise-label" onclick="fill_location('porpoise')">Porpoise Surfer</span>
        <span class="w3-tag w3-blue w3-xlarge" id="so1_server-label" onclick="fill_location('so1_server')">Sussex Observatory Live</span>
         
        <!--<br>
        <span class="w3-tag w3-green w3-large" id="v-add" onclick="select_all_vessels()">Select All</span>
        <span class="w3-tag w3-red w3-large" id="v-remove" onclick="deselect_all_vessels()">Remove All</span>
        <br>-->
        <br>
        <br>
        <br>
        <span class="w3-tag w3-blue w3-xlarge" id="v-30" onclick="toggleVessel(30)">Fishing </span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-40" onclick="toggleVessel(40)">High Speed Craft</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-50" onclick="toggleVessel(50)">Pilot Vessels</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-52" onclick="toggleVessel(52)">Tug</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-53" onclick="toggleVessel(53)">Port Tender</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-60" onclick="toggleVessel(60)">Passenger</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-55" onclick="toggleVessel(55)">Law Enforcement</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-33" onclick="toggleVessel(33)">Dredging or Underwater Ops</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-70" onclick="toggleVessel(70)">Cargo</span>
        <span class="w3-tag w3-blue w3-xlarge" id="v-37" onclick="toggleVessel(37)">Pleasure Craft</span>
       
        <span class="w3-tag w3-blue w3-xlarge" id="v-36" onclick="toggleVessel(36)">Sailing</span>
        <span class="w3-tag w3-grey w3-xlarge" >Harbour Porpoise</span>
        <br>
       
        <br>
        <span class="w3-tag w3-green w3-large" id="v-add" onclick="select_all_vessels()">Select All</span>
        <span class="w3-tag w3-red w3-large" id="v-remove" onclick="deselect_all_vessels()">Remove All</span>
        <br>
        <br>
        <br>
    <div class="">

    <label for="density_range" class="form-label">Source Density (0 -> 10)</label>
    <input type="range" max=10 min=0 step=1 value=1 class="form-range" id="density-data">
      
     </div>

   
     
    </div>
    <div class="filter-search">
  
    </div>
     <!--<div class="container">

      
        <div class="row">
        <div class="col-6">
        
            <div id="nav-title-working-window">Acoustic Data Location</div>
            <select class="form-select mb-3" aria-label="Data Location" id = "location_select">
                <option selected>Select Acoustic Data Location</option>
                <option value="netley">Netley</option>   
            </select>



            <div id="nav-title-working-window">Data Date/Time Range (UTC)</div>
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Start Time" aria-label="Start Time" value="2019-12-13 12:50:00 UTC" id="start_time_input">
            <span class="input-group-text">-</span>
            <input type="text" class="form-control" placeholder="End Time" aria-label="End Time" value="2019-12-13 13:20:00 UTC" id="end_time_input">
            </div>


            <div id="nav-title-working-window">Geographic Search Range (m)</div>
            <input type="text" class="form-control mb-3" id="search_range" placeholder="Search Range" value = "1500">
            <button type="button" id="fetch-analyse"class="btn btn-light">Fetch & Analyse</button>
            </div>
        </div>

        </div>-->

    </form>
    </div>

  
    `;

    html = `
    <form>
   
    <div class="container">
        <br>
        <br>
         <br>
        <br>
        <div class = "row">
        <h2 style="color:white">Acoustic Data Query</h2>
      
        </div>
      
        <div class="row">
        <div class="col-12">
        
            <div id="nav-title-working-window">Acoustic Data Location</div>
           `;
    
    html += `
             <select class="form-select mb-3" aria-label="Data Location" id = "location_select">
              <option selected value="">Select Acoustic Data Location</option>
           `;
    // alert(user.user_uid);
   for (const [key, value] of Object.entries(marlin_locations)) {
       var leg_users = location_permissions[key];
       console.log(leg_users);
       console.log(user.user_uid);
       if (leg_users.includes(user.user_uid) ){
          
          html +=  `<option  value="${key}">${value}</option>`;
       }
     
       
        }
            //     <option selected value="">Select Acoustic Data Location</option>
            //     <option value="netley">Netley Test - Debug</option>   
            //     <option value="so1">Sussex Observatory Test - Debug</option>
            //     <option value="so1_server">Sussex Observatory [1] Product</option>
            //     <option value="brixham">Brixham Product</option>
            //     <option value="67149847">HP [67149847]</option>

            html += `
             </select>`;

    
html += `

  </div>
  `;
    
    var focus_start = "";
    var focus_end = "";

   

html += `
  </div>

        <div class="row">
         <div class="col-12">
            <div id="nav-title-working-window">Data Date/Time Range [UTC]</div>
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Start Time" aria-label="Start Time" value="2019-12-13 12:50:00 UTC" id="start_time_input">
            <span class="input-group-text">-</span>
            <input type="text" class="form-control" placeholder="End Time" aria-label="End Time" value="2019-12-13 13:20:00 UTC" id="end_time_input">
            </div>
            </div>

</div>

<div class="row">
<div class="col-12">
  <div id="nav-title-working-window">Target Types</div>
        <div class="tags">
            <span class="w3-tag w3-blue w3-large" id="v-30" onclick="toggleVessel(30)" style="cursor:pointer">Fishing </span>
            <span class="w3-tag w3-blue w3-large" id="v-40" onclick="toggleVessel(40)" style="cursor:pointer">High Speed Craft</span>
            <span class="w3-tag w3-blue w3-large" id="v-50" onclick="toggleVessel(50)" style="cursor:pointer">Pilot Vessels</span>
            <span class="w3-tag w3-blue w3-large" id="v-52" onclick="toggleVessel(52)" style="cursor:pointer">Tug</span>
            <span class="w3-tag w3-blue w3-large" id="v-53" onclick="toggleVessel(53)" style="cursor:pointer">Port Tender</span>
            <span class="w3-tag w3-blue w3-large" id="v-60" onclick="toggleVessel(60)" style="cursor:pointer">Passenger</span>
            <span class="w3-tag w3-blue w3-large" id="v-55" onclick="toggleVessel(55)" style="cursor:pointer">Law Enforcement</span>
            <span class="w3-tag w3-blue w3-large" id="v-33" onclick="toggleVessel(33)" style="cursor:pointer">Dredging or Underwater Ops</span>
            <span class="w3-tag w3-blue w3-large" id="v-70" onclick="toggleVessel(70)" style="cursor:pointer">Cargo</span>
            <span class="w3-tag w3-blue w3-large" id="v-37" onclick="toggleVessel(37)" style="cursor:pointer">Pleasure Craft</span>
            <span class="w3-tag w3-blue w3-large" id="v-36" onclick="toggleVessel(36)" style="cursor:pointer">Sailing</span>
          
           
        </div>
        <br>
          <span class="w3-tag w3-green w3-large" id="v-add" onclick="select_all_vessels()" style="cursor:pointer">Select All</span>
        <span class="w3-tag w3-red w3-large" id="v-remove" onclick="deselect_all_vessels()" style="cursor:pointer">Remove All</span>

</div>

</div>

        <div class="row">
          <div class="col-6">
            <div id="nav-title-working-window">MMSI</div>
            <input size="10" type="text" class="form-control mb-3" id="mmsi_search" placeholder="MMSI" value = "000000000">
          
            </div>
            </div>

        <div class="row">
          <div class="col-6">
            <div id="nav-title-working-window">Search Range (m)</div>
            <input size="10" type="text" class="form-control mb-3" id="search_range" placeholder="Search Range" value = "1500">
          
            </div>
            </div>



        <div class="row">
          <div class="col-6">
            <div id="nav-title-working-window">Density</div>
            <div class="tags">
                <span class="w3-tag w3-grey w3-large" id="lt" value="eq" onclick="toggleLogic('lt')">< </span>
                <span class="w3-tag w3-grey w3-large" id="eq" onclick="toggleLogic('eq')">= </span>
                <span class="w3-tag w3-grey w3-large" id="gt" onclick="toggleLogic('gt')">></span>
                <span class="w3-tag w3-grey w3-large" id="lte" onclick="toggleLogic('lte')"><= </span>
                <span class="w3-tag w3-grey w3-large" id="gte" onclick="toggleLogic('gte')">>= </span>
      
            </div>
            <br>
            <input size="4" maxlength="4" type="text" class="form-control mb-3" id="density_value" placeholder="Search Range" value = "0">
         
         
            
  
            </div>
        </div>

        <div class="row">
          <div class="col-12">
           <button type="button" id="fetch-analyse"class="btn btn-secondary" >Fetch & Analyse</button>
            <button type="button" id="close" class="btn btn-danger" >Close</button>
            </div>
         </div>
       




   </div>
   </form>

      
    
    `;

  
    var el = document.getElementById('main-filter');
    el.innerHTML = html;
    $(el).fadeIn("fast");


    var search_el = document.getElementById('fetch-analyse');
    search_el.addEventListener('click', openSearch);
    
    var search_el = document.getElementById('close');
    search_el.addEventListener('click', close);

    var loc_el = document.getElementById('location_select');
    loc_el.onchange = function () {
        var val = loc_el.options[loc_el.selectedIndex].value;
        if (val == "brixham") {
            var t_el = document.getElementById('start_time_input');
            t_el.value = "2024-02-24 12:00:00 UTC";

            t_el = document.getElementById('end_time_input');
            t_el.value = "2024-02-24 13:10:00 UTC";
        }

        if (val == "so1_server") {
            var t_el = document.getElementById('start_time_input');
            t_el.value = "2023-06-11 12:00:00 UTC";

            t_el = document.getElementById('end_time_input');
            t_el.value = "2023-07-11 13:10:00 UTC";
        }

        

    };


    toggleLogic(density_logic);


}


function toggleLogic(logic) {
   
    var logic_options = ['eq','lt','gt','lte','gte'];
    density_logic = logic;
    for (var i = 0; i < logic_options.length; i++) {
        var logic_el = document.getElementById(`${logic_options[i]}`);
        if (logic == logic_options[i]) {
            if (logic_el.classList.contains('w3-grey')) {
                logic_el.classList.add('w3-blue');
                logic_el.classList.remove('w3-grey');
            }
        }
        else {
            if (logic_el.classList.contains('w3-blue')) {
                logic_el.classList.add('w3-grey');
                logic_el.classList.remove('w3-blue');
            }
        }
    }

    if (logic == "") {
        var el = document.getElementById(`${density_logic}`);
        el.classList.add('w3-blue');
        el.classList.remove('w3-grey');
        
    }



}

function close() {
    hideDiv('main-filter');
}

function build_filter_second_page() {
    var html = "";
    html += `



    `;

    var el = document.getElementById('main-filter');
    el.innerHTML = html;
    $(el).fadeIn("fast");


    var search_el = document.querySelector('.mysearch-button');
    search_el.addEventListener('click', openSearch);
    


}


function buildResults(data) {
 
    html = `<div class="filter-results-view">`;
    

    // build resulsts and attach on click

    for (var i=0; i<data['epochs'].length; i++){
        // console.log(data['epochs'][i]);
        var epoch = data['epochs'][i];
        html += build_filtered_data_view(epoch);
    }

    html += `</div>`;

    var el = document.getElementById('filter-main');
    el.innerHTML = html;

    // var filter_analyse_action_button = document.getElementById("filter-fetch-analyse");
    // filter_analyse_action_button.onclick = function () {
        
    //     // // show loader
    //     // show_loader();

    //     // hide window
    //     //toggle_working_window_close();
    //     hide_filter();
    //     // run app
    //     //download_analyse();


    // };
    hideApp();
    showFilter();
    

}

// fetch / start app with location and time
function fetch_data(location_value, start_time, end_time, selected_epoch_id, name, uid, position,level) {
   
    // var html = $(id).html();
    // var newWindow = window.open('');
    // newWindow.document.body.innerHTML =  '<html><head><title>Hi</title>  <script src="js/myScript.js"></script> </head>' + html;


    // 1. show loader
    //show_loader();
    var application_id = Math.floor(Math.random() * 9999);
    
    // console.log("application id " + application_id);
    var href = `https://vixen.hopto.org/rs/ident_app/ident_gui/index.php?application_id=${application_id}&location_value=${location_value}&start_time=${start_time}&end_time=${end_time}&name=${name}&uid=${uid}&position=${position}&level=${level}`;
    console.log(href);
    window.open(href, '_blank').focus();
    ///window.location.href = href;
    // 2. set selected epoch
    filtered_data.set_selected_epoch(selected_epoch_id);
    // alert(user.name);
    // 3. run 
    // console.log(`Downloading data: ${location_value}, ${start_time}, ${end_time}`);
    //filter_data_download_analyse(location_value, start_time, end_time);

    // 4. show main window
    //hide_filter();
}

//${epoch.location_value}, ${epoch.start_time}, ${epoch.end_time}
function build_filtered_data_view(epoch){

    epoch.start_time = `${epoch.start_time} UTC`;
    epoch.end_time = `${epoch.end_time} UTC`;
    var selected = "";

    //console.log(application_data);

    // if (snapshot.snapshot_id == application_data.acoustic_data.active_snapshot_id) {
    //     selected = "selected"
    // }
// id="data-filter-view-${epoch.id}"
    var html = `<br><br>
    <div class="filter-list-view ${selected}">
        <table>
            <tr>
            
            <td>${epoch.start_time}</td>
            <td>${epoch.end_time}</td>
           
            <td>  
             <button type="button" id="filter-fetch-analyse"class="btn btn-success" onclick="fetch_data('${epoch.location_value}', '${epoch.start_time}', '${epoch.end_time}','${epoch.id}', '${user.name}', '${user.user_uid}', '${user.position}', '${user.level}')">Fetch & Analyse</button>
            </td>
              <td>  
             <button type="button" id="filter-fetch-analyse"class="btn btn-success" onclick="filter_epoch_gis_view('${epoch.id}')">GIS View</button>
            </td>
            <td>
                <span style="margin-left:15px" onclick="toggle_activities(${epoch.id})"><i class="fas fa-plus"></i></span>
            </td>
            </tr>
        </table>
    </div>
   `;
   

    html += `<div id="data-filter-view-${epoch.id}" style="display:none;">`;
    for (var i = 0;i<epoch.activity.length; i++)
    {
        var start_time_ms = epoch.activity[i].time_s * 1000;
        var unique_number_vessels = epoch.activity[i].unique_vessels.length;
        var time_str = time_string(start_time_ms)[2];
        var number_dense_vessels = epoch.activity[i].number_dense_vessels;
        if ('valid' in epoch.activity[i])
        {
            selected = "selected";
        
            html += `
                <div class="filter-list-view ${selected}" >
                    <table>
                        <tr>
                        <td>${time_str}</td>
                        <td>${unique_number_vessels} sources</td>
                        <td>${number_dense_vessels} dense</td>
                    
                        <td>  
                        <button type="button" id="filter-fetch-analyse"class="btn btn-success" onclick="filter_activity_gis_view('${epoch.id}', '${i}')">GIS View</button>
                        </td>
                        </tr>
                    </table>
                </div>
            `;
        }

    }   
    
    html += `</div>`;
    
    

    

    return html;
}


function show_data_selection(){
     build_filter_page();
     select_all_vessels();
}

// if (application_data == null) {
//     //console.log("here");
//     build_filter_page();
//     select_all_vessels();
    

// }



/*
*
*   Build main filtered data window
*
*/


//Filetered data window

filtered_data_window_id = ""

function buildFilterDataWindow() {

    // hide filter
    hide_filter();

    // build data window
    var html = ``;
    // html = `<div class="filter-results-view">`;
    var epochs = filtered_data.filter_data;
    // console.log(epochs);

    for (var i = 0; i < epochs.length; i++){
        html += build_filtered_data_view(epochs[i]);
    }

    // html += `</div>`;
    

    // new window

    var window_id = createWindow("Data Query Results", "query-results");
    var el = document.getElementById(window_id);
    el.style.width = '450px';
    el.style.top = '100px';
    el.style.right = '100px';
    el.style.height = '60vh';
    var content_id = `${window_id}_content`;
    var el = document.getElementById(content_id);
    el.innerHTML = html;
    console.log(content_id)
    // BuildAppDataLabels(content_id);

    // before new window
    // *** 
    // var el = document.getElementById("filter-data-window-holder");
    // el.innerHTML = html;
    // ***
    

    // update GIS ( GIS Engine needs updating )
    var position = {
        'latitude': filtered_data.data_latitude,
        'longitude': filtered_data.data_longitude
    };
    // console.log(filtered_data.location_value);
    // console.log(filtered_data.location_str);
    console.log(filtered_data);
    focus_gis_engine(position, filtered_data.location_value, 3000, filtered_data.search_radius);
    removeFilterFlags();
    hideApp();
    // showFilter();

    
}