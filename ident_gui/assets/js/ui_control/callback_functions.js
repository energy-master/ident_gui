


/*
*
*   Toggle working window.
*/

function toggle_working_window() {
    
    document.getElementById("nav-toggle-working-window").checked = false;

    
}


function toggle_working_window_close() {
    
    document.getElementById("nav-toggle-working-window").checked = true;

    
}



/*
*
*   Set working window title
*/

function SetWorkingTitle(title) {
    var el = document.getElementById("nav-header-working-window");
    const html = `
    <a id="nav-title-working-window"  target="_blank">${title}</a>
            <label for="nav-toggle-working-window"><span id="nav-toggle-burger-working-window"></span></label>
            <hr/>
    `;
    el.innerHTML = html;
}

/*
*
*   Display the setup GUI for the app.
*/

function display_setup_ui(){
    toggle_working_window();
    SetWorkingTitle("Application Data");


    var html = `
    
     <div id="ww-data">

        <form>
        <div class="container">

      
        <div class="row">
        <div class="col-6">
        
            <div id="nav-title-working-window">Acoustic Data Location</div>
            <select class="form-select mb-3" aria-label="Data Location" id = "location_select">
                <option selected>Select Acoustic Data Location</option>
                <option value="netley">Netley</option>   
            </select>



            <div id="nav-title-working-window">Data Date/Time Range</div>
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Start Time" aria-label="Start Time" value="2019-12-13 12:50:00" id="start_time_input">
            <span class="input-group-text">-</span>
            <input type="text" class="form-control" placeholder="End Time" aria-label="End Time" value="2019-12-13 13:20:00" id="end_time_input">
            </div>




            <div id="nav-title-working-window">Geographic Search Range (m)</div>
            <input type="text" class="form-control mb-3" id="search_range" placeholder="Search Range" value = "1500">
         <button type="button" id="fetch-analyse"class="btn btn-secondary">Fetch & Analyse</button>
            </div>
        </div>

        </div>

        </form>




        </div>
       
    
    `;

    var el = document.getElementById("nav-content-working-window");
    el.innerHTML = html;

    /*
    *   Link call to fetch & analyse data.
    */

    var download_analyse_action_button = document.getElementById("fetch-analyse");
    download_analyse_action_button.onclick = function () {
        show_loader_div('fetch-analyse');
        console.log("pressed");
        console.log("")
        alert("e");
        // show loader
        show_loader();

        // hide window
        toggle_working_window_close();

        // run app
        download_analyse();

        hide_loader_div('fetch-analyse');

    };



}


/*
*
*   Application entry point.
*/

function download_analyse( ) {

    // get application parameters
    var location_value = document.getElementById("location_select").value;
    var location_label = location_keys[location_value];
    var start_time = document.getElementById("start_time_input").value;
    var end_time = document.getElementById("end_time_input").value;
    var search_range = document.getElementById("search_range").value;
    

    // call the application init and download code.
    init_application(search_range, start_time, end_time, location_value);

    // display summary of download for analysis
    

}


/*
* Init function from search
*/
function filter_data_download_analyse(_location_val, _start_time, _end_time ) {

    console.log(_start_time)
    // get application parameters
    var location_value = _location_val;
    var location_label = location_keys[location_value];
    var start_time = _start_time.replaceAll('/', '-');
    // var start_time = _start_time.replaceAll('T', '');
    // var start_time = _start_time.replaceAll('Z', '');

    var end_time = _end_time.replaceAll('/', '-');
    //var search_range = filtered_data.search_radius;
    var search_range = 1500; // hard coded
    console.log(location_value, start_time, end_time);

    // call the application init and download code.
    init_application(search_range, start_time, end_time, location_value);


    // display summary of download for analysis
    

}


// /*
// * Init applicaiton from 
// */
// function filter_data_download_analyse(_location_val, _start_time, _end_time ) {

    
//     // get application parameters
//     var location_value = _location_val;
//     var location_label = location_keys[location_value];
//     var start_time = _start_time.replaceAll('/', '-');
//     var end_time = _end_time.replaceAll('/', '-');
//     //var search_range = filtered_data.search_radius;
//     var search_range = 1500;
//     console.log(location_value, start_time, end_time);

//     // call the application init and download code.
//     init_application(search_range, start_time, end_time, location_value);


//     // display summary of download for analysis
    

// }