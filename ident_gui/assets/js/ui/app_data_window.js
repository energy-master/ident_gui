
//main application data window

function BuildAppDataWindow() {

    var html = `
    <div class="accordion" id="data-accordian-holder">

     <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingSetup">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSetup" aria-expanded="false" aria-controls="panelsStayOpen-collapseSetup">
            Application Setup
        </button>
        </h2>

        <div id="panelsStayOpen-collapseSetup" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSetup">
        <div class="accordion-body" id="data-setup-body">
           
        </div>
        </div>

    </div>


    <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
            Acoustic Snaphots
        </button>
        </h2>

        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body" id="data-acoustic-body">
           
        </div>
        </div>

    </div>

    <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            AIS
        </button>
        </h2>

        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
        <div class="accordion-body" id="data-ais-body">
           
        </div>
        </div>

    </div>


     <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            Data Search
        </button>
        </h2>

        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div class="accordion-body" id="data-search-body">
           
        </div>
        </div>

    </div>



     <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
            Track Analysis
        </button>
        </h2>

        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
        <div class="accordion-body" id="group-data-body">
        <div id="group-visual"></div>
        <div id="group-label"></div>
        <div id="group-action">
        <table>
            <tr>
               
                <th>Custom Start</th>
                <th>Custom End</th>
                <th>Create</th>
            
            </tr>
            <tr>
            <!--<td id="custom_start_time_ms">
            </td>
            <td id="custom_end_time_ms">
            </td>-->
             <td id="custom_start_time">
            </td>
            <td id="custom_end_time">
            </td>
            <td>
            <button id="custom-analysis-create-button" class="action-btn" onclick="custom_epoch_analysis()" style="">
                <i class="fas fa-plus"></i>
            </button>
            </td>
            </tr>
            </table>
        </div>
        </div>
        </div>

    </div>


    </div>


    `;

    var el = document.getElementById("app-data-window");
    el.innerHTML = html;

}

// BuildAppDataWindow();


/*
*
*   Search data
*/

function BuildSearchDataSetup() {
    if (application_data.search_epoch != null) {


        var html = `
        <table class="table ">
        <thead>
        <tr>
            <th>
            time
            </th>
            <th>
            density
            </th>
             <th>
             listen
            </th>
        </tr>
        </thead>
        <tbody>
        
`;

        for (var i = 0; i < application_data.search_epoch.activity.length; i++) {
            if ('valid' in application_data.search_epoch.activity[i]) {

                //console.log(application_data.search_epoch.activity[i]);
                var start_time_ms = application_data.search_epoch.activity[i].time_s * 1000;
                var unique_number_vessels = application_data.search_epoch.activity[i].unique_vessels.length;
                var time_str = time_string(start_time_ms)[2];
                var number_dense_vessels = application_data.search_epoch.activity[i].number_dense_vessels;


                html += `
    <tr>
    <td>
        ${time_str}
    </td>
    <td>
        ${number_dense_vessels}
    </td>
    <td>  
       
                <i class="fas fa-forward" style="cursor:pointer"onclick="playAcousticLabel(${start_time_ms})"></i>
       
    </td>

    </tr>
    `;
            }

        }

        html += `
        </tbody>
        </table>
    `;

        var el = document.getElementById('data-search-body');
        el.innerHTML = html;
    }
}


/*
*
*   AIS 
*/
function BuildAppDataSetup() {


    var html = `
        <table class="table ">
        <tbody>
        <tr>
            <td>Listener Location</td>
            <td>${location_keys[application_data.application_setup.setup_data.listener_location]}</td>
        </tr>
        <tr>
            <td>Approach Radius</td>
            <td>${application_data.application_setup.setup_data.approach_radius} m</td>
        </tr>
         <tr>
            <td>Track Radius</td>
            <td>${application_data.application_setup.setup_data.track_radius} m</td>
        </tr>
        
        <tr>
            <td>Data Start Time</td>
            <td>${application_data.application_setup.setup_data.data_start_time}</td>
        </tr>
        <tr>
            <td>Data End Time</td>
            <td>${application_data.application_setup.setup_data.data_end_time}</td>
        </tr>

        </tbody>
        </table>
    `;

    var el = document.getElementById('data-setup-body');
    el.innerHTML = html;

}

function ShowAppData() {

    if (location_keys.hasOwnProperty(application_data.application_setup.setup_data.listener_location)) {
    }
    else {
        location_keys[application_data.application_setup.setup_data.listener_location] = application_data.application_setup.setup_data.listener_location;
    }

    var html = `${location_keys[application_data.application_setup.setup_data.listener_location]} | ${application_data.application_setup.setup_data.data_start_time}  <i class="fas fa-arrow-circle-right"></i> ${application_data.application_setup.setup_data.data_end_time} | Radius: ${application_data.application_setup.setup_data.track_radius} m`;

    var el = document.getElementById("loc-data");
    el.style.color = "green";
    el.innerHTML = html;

}

function UpdateCustomTimestamps(state = 1) {
    var el = document.getElementById("custom-data");

    var html = 'Study | No data';
    el.style.color = "red";
    if (state == 1) {
        var start_t = time_string(custom_start_ms)[2];
        var end_t = time_string(custom_end_ms)[1];
        html = `Study | ${start_t} <i class="fas fa-arrow-circle-right"></i> ${end_t}   <div class="list-view"  style="cursor:pointer; font-size:9px;"><button type="button" class="btn-sm btn-primary " onclick="clear_checkboxes()">New Study</button></div>
     </div>`;
        el.style.color = "green";
    }
    el.innerHTML = html;
}

function BuildAppDataAIS() {

    var html = `
    <table class="table ">
        <tbody>
            <tr>
                <td># Unique Vessels</td>
                <td>${application_data.ais_vessel_data.number_of_vessels}</td>
            </tr>


        </tbody>
    </table>
 <div class="accordion" id="data-accordian-holder-1">

    `;
    //quick_launch
    // build vessel data
    for (var i = 0; i < application_data.ais_vessel_data.number_of_vessels; i++) {
        var vessel_name = application_data.ais_vessel_data.vessels[i].vessel_overview_data.name;
        var mmsi = application_data.ais_vessel_data.vessels[i].vessel_overview_data.mmsi;
        var number_approaches = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom.length;
        var app_flag = "";
        if (number_approaches > 0) {
            app_flag = " [approaches present] "
        }
        html += `
        <div class="accordion-item">

            <h2 class="accordion-header" id="panel-header${mmsi}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel-b-${mmsi}" aria-expanded="false" aria-controls="panel-header${mmsi}">
                ${vessel_name} ${app_flag}
            </button>
            </h2>

            <div id="panel-b-${mmsi}" class="accordion-collapse collapse" aria-labelledby="panel-header${mmsi}">
            <div class="accordion-body" id="vessel-data-${mmsi}">
            
                <table style="width:100%">
                    <tbody>
                     <tr>
                        <td>MMSI : </td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_overview_data.mmsi}</td>
                    </tr>
                    <tr>
                        <td>Class : </td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_overview_data.vessel_type_str}</td>
                    </tr>
                    <tr>
                        <td>Draught (m): </td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_overview_data.draught}</td>
                    </tr>
                    <tr>
                        <td># Tracks </td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks.length}</td>
                    </tr>
                     <tr>
                        <td># Interpolated Tracks </td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks.length}</td>
                    </tr>
                   
                    <tr>
                        <td># Approaches </td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches.length}</td>
                    </tr>
                  
                    <tr>
                        <td># Interpolated Approaches</td>
                        <td>${application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_approaches.length}</td>
                    </tr>




                    </tbody>
                </table>
                 <br>
                <br>

                <div id="quick-${mmsi}-launch" style="cursor:pointer"></div>
                <br>
                <br>
                <div class="accordion" id="profiles-${mmsi}-profiles">
                </div>
               






            </div>
            </div>

        </div>
        `;

    }

    html += `</div>`;// end accordion holder


    var el = document.getElementById('data-ais-body');
    el.innerHTML = html;

    BuildVesselData();


}



function BuildVesselData() {


    for (var i = 0; i < application_data.ais_vessel_data.number_of_vessels; i++) {


        var vessel_name = application_data.ais_vessel_data.vessels[i].vessel_overview_data.name;
        var mmsi = application_data.ais_vessel_data.vessels[i].vessel_overview_data.mmsi;

        var vessel = application_data.ais_vessel_data.vessels[i];
        if (vessel.vessel_overview_data.mmsi == "255806433") {

            console.log(vessel.vessel_dynamics.vessel_tracks[0]);
        }


        var profile_html = "";
        //tracks
        for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks.length; j++) {
            //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks[j].profile);
            profile_html += build_profile(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks[j].profile, `raw track ${j + 1}`, mmsi, `raw_track_${j}`);
            // console.log(profile_html);

            // interpolated tracks
            for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks.length; j++) {
                //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks[j].profile);
                profile_html += build_profile(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile, `interpolated track ${j + 1}`, mmsi, `interpolated_track_${j}`, 'inter');
                // console.log(profile_html);
            }

            // approaches
            for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches.length; j++) {
                //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks[j].profile);
                profile_html += build_profile(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches[j].profile, `raw approach ${j + 1}`, mmsi, `raw_approach_${j}`);
                // console.log(profile_html);

            }

            // interpolated approaches
            var quick_launch = "";

            for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom.length; j++) {
                //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_tracks[j].profile);
                //console.log(vessel_name);
                //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_interpolated_approaches[j]);
                //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics);
                profile_html += build_profile(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile, `interpolated approach ${j + 1}`, mmsi, `smooth_approach_${j}`);
                // console.log(profile_html);
                //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom, vessel_name);
                var start_t = application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile[0]['_t'];
                quick_launch += `<span class="w3-tag w3-blue w3-large" onclick="approach_analysis(${start_t}, ${mmsi}, ${j})">Approach ${j + 1}</span>`;
            }
            // add quick launch
            var quick_el = document.getElementById(`quick-${mmsi}-launch`);
            quick_el.innerHTML = quick_launch;

            // charting
            // interpolated approaches
            // for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom.length; j++){

            //     //profile_html += plot_dynamics_html(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile, `interpolated approach dynamics ${j+1}`, mmsi, `smooth_approach_plot${j}`);

            //     //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom, vessel_name);
            // }




            var el_tag = `profiles-${mmsi}-profiles`;

            var el = document.getElementById(el_tag);

            el.innerHTML = profile_html;

            // // charting
            // // interpolated approaches
            // for (var j = 0; j < application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom.length; j++){

            //     // populate the chart canvas ( should already be added to html )
            //     //plot_dynamics(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile, `interpolated approach dynamics${j+1}`, mmsi, `smooth_approach_plot${j}`);

            //     //console.log(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom, vessel_name);
            // }


        }




    }
}


function build_profile(profile, name, mmsi, tag, type) {
    //console.log(tag);
    var html = ` <div class="accordion-item">

            <h2 class="accordion-header" id="panel-header${mmsi}-profile-${tag}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel-b-${mmsi}-profile-${tag}" aria-expanded="false" aria-controls="panel-header${mmsi}-${tag}">
                ${name}
            </button>
            </h2>

            <div id="panel-b-${mmsi}-profile-${tag}" class="accordion-collapse collapse" aria-labelledby="panel-header${mmsi}-profile">
            <div class="accordion-body"><table style="width:100%">
            <thead>
            <th>latitude</th>
            <th>longitude</th>
            <th>timestamp</th>
            <th>timestamp (ms)</th>
            <th>timestamp (js)</th>
           
            </thead>
            
        `;

    if ((mmsi == "255806433") && (type == "inter")) {
        console.log(profile);
    }

    for (var i = 0; i < profile.length; i++) {
        //console.log(profile[i]);

        var t_ = "UN";
        var t_js = "UN";
        var t_ms = "UN";
        if ('timestamp' in profile[i]) {
            t_ = profile[i]['timestamp'];
        }

        if (type == "inter") {
            if ('_i' in profile[i]) {
                t_ = profile[i]['_i'];
            }
            if ('_t' in profile[i]) {
                t_ms = profile[i]['_t'];
            }
            if ('_jf' in profile[i]) {
                t_js = profile[i]['_jf'];
            }

        }




        var lat = parseFloat(profile[i]['latitude']).toFixed(5);
        var long = parseFloat(profile[i]['longitude']).toFixed(5);

        html += `
            <tr>
                <td>${lat}</td>
                <td>${long}</td>
                <td>${t_}</td>
                  <td>${t_ms}</td>
                    <td>${t_js}</td>
                    
               
            </tr>`;
    }



    html += `</table></div>
            </div>
            
    </div>`;

    return html;
}


var chart_options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Vessel distance vs time'
        },
    },
    scales: {
        yAxes: [
            { display: false, gridLines: { display: false } }
        ],
        xAxes: [
            { display: false, gridLines: { display: false } }
        ]
    },
    legend: {
        display: false
    },
    // title: { display:true},
    // responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 2 // general animation time
    },
    hover: {
        //animationDuration: 2 // duration of animations when hovering an item
    },
    elements: {
        line: {
            tension: 0.8 // disables bezier curves
        },
        point: {
            radius: 0
        }
    },
    showLines: true,
    fill: false
};



function plot_dynamics_html(profile, name, mmsi, tag) {

    var html = ` <div class="accordion-item">

            <h2 class="accordion-header" id="panel-header${mmsi}-profile-${tag}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel-b-${mmsi}-profile-${tag}" aria-expanded="false" aria-controls="panel-header${mmsi}-${tag}">
                ${name}
            </button>
            </h2>

            <div id="panel-b-${mmsi}-profile-${tag}" class="accordion-collapse collapse" aria-labelledby="panel-header${mmsi}-profile">
                <div class="accordion-body">
                    <canvas id="dynamic-chart-${mmsi}-${tag}" height="200" width="700"></canvas>
                </div>
            </div>
            </div>
            `;

    return html;


}

function plot_dynamics(profile, name, mmsi, tag) {

    console.log("Building Dynamics")

    var canvas_id = `vessel-chart`;
    ctx = document.getElementById(canvas_id).getContext('2d');
    console.log(`ctx ${ctx}`);
    var mylabels = [];
    var colors = [];
    var plot_data = [];
    var scatter_date = [];


    profile.forEach(function (item, index) {
        console.log(item, index);
        mylabels.push(item['_t']);
        plot_data.push(item['ref_distance']);
        var color = 'blue';
        // var color = 'rgba(160, 160, 9, 0.9)';
        colors.push(color);


    });

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mylabels,
            datasets: [{
                label: 'Distance v Time',
                data: plot_data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1


            }
            ]

        },
        options: chart_options
    });

    $(`panel-b-${mmsi}-profile-${tag}`).on('shown.bs.collapse', function () {
        chart.update();
    });





}



function plot_vessel_profile_new(profile, mmsi) {
    if (profile == 0) {
        return (0);
    }



    var canvas = document.getElementById("vessel-chart");
    if (canvas != null) {
        // Apply multiply blend when drawing datasets
        var multiply = {
            beforeDatasetsDraw: function (chart, options, el) {
                chart.ctx.globalCompositeOperation = 'multiply';
            },
            afterDatasetsDraw: function (chart, options) {
                chart.ctx.globalCompositeOperation = 'source-over';
            },
        };
        // Gradient colors 
        var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
        gradientThisWeek.addColorStop(0, '#5555FF');
        gradientThisWeek.addColorStop(1, '#9787FF');
        // Gradient color - previous week
        var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
        gradientPrevWeek.addColorStop(0, '#FF55B8');
        gradientPrevWeek.addColorStop(1, '#FF8787');

        //first plt
        var mylabels = [];
        var _ts = [];
        var plot_data = [];
        var plot_data_two = [];

        profile.forEach(function (item, index) {
            mylabels.push((new Date(item['_t'])));
            plot_data.push(Math.floor(item['ref_distance']));
        });



        // 2nd plt  if (Math.abs(application_data.application_clock.application_time - item['_t']) < chart_active_interval) {
        profile.forEach(function (item, index) {
            mylabels.push((new Date(item['_t'])));
            if (Math.abs(application_data.application_clock.application_time - item['_t']) < chart_active_interval) {
                plot_data_two.push(Math.floor(item['ref_distance']));
            }
            else {
                plot_data_two.push(0.0);
            }
        });


        console.log(plot_data);
        console.log(plot_data_two);

        var config = {
            type: 'line',
            data: {
                labels: mylabels,
                datasets: [
                    {
                        data: plot_data_two,
                        backgroundColor: gradientThisWeek,
                        borderColor: 'transparent',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'white',
                        lineTension: 0.8,

                    },
                    {
                        data: plot_data,
                        backgroundColor: gradientPrevWeek,
                        borderColor: 'transparent',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'white',
                        lineTension: 0.70,


                    }

                ]
            },
            options: {
                elements: {
                    point: {
                        radius: 1,
                        hitRadius: 1,
                        hoverRadius: 5
                    }
                },
                animate: false,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: false,
                        },
                    }]
                },

            },
            plugins: [multiply],




        };

        window.chart = new Chart(canvas.getContext('2d'), config);
    }
}

var chart = null;

function plot_vessel_profile(profile, mmsi) {
    console.log("Building Dynamics plot")

    if (profile == 0) {
        profile = [];
    }

    var canvas_id = `vessel-chart`;
    ctx = document.getElementById(canvas_id).getContext('2d');
    console.log(`ctx ${ctx}`);
    var mylabels = [];
    var colors = [];
    var plot_data = [];
    var scatter_data = [];


    profile.forEach(function (item, index) {
        //console.log(item, index);
        // console.log()
        //mylabels.push(new Date(item['_t']));
        mylabels.push((new Date(item['_t'])));
        plot_data.push(Math.floor(item['ref_distance']));



        var color_active = 'green';
        var color_inactive = 'white';
        //console.log(item);
        //console.log(application_data.application_clock.application_time);
        //console.log(Math.abs(application_data.application_clock.application_time - item['_t']));
        if (Math.abs(application_data.application_clock.application_time - item['_t']) < chart_active_interval) {
            //console.log(application_data.application_clock.application_time, item['_t'])
            colors.push(color_active);
            scatter_data.push({ x: item['_t'], y: item['ref_distance'] })
        }
        else {
            color = color_inactive;
            // var color = 'rgba(160, 160, 9, 0.9)';
            colors.push(color);
        }
        //colors.push('blue');



    });
    console.log(plot_data);
    //     if (chart!=null)
    //     {
    //         chart.destroy();
    // }
    //console.log(scatter_data);
    chart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: mylabels,
            datasets: [
                {
                    label: 'Distance v Time',
                    data: plot_data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4,
                    //borderColor: `blue`
                    // cubicInterpolationMode: 'monotone'



                },
                {
                    type: 'scatter',
                    data: scatter_data
                }



            ]

        },
        options: chart_options
    });





}



/*
*
*   Acoustic
*/


function BuildStudyLabel(content_id) {

    var html = `<div class="center-message">Study times are invalid. Select your study time frame in the acoustic snapshots table.</div>`;

    if (custom_start_ms < custom_end_ms) {
        html = "";
        fetchUserLabels().then((data) => {


            html += `
                <div class="center-message">
                    <table><tr id="">
            

                <td colspan=4>
         <div class="input-group">
            <span class="input-group-text">Annotate</span>
             <textarea rows="1" class="form-control" aria-label="With textarea" id="fly_label"></textarea>
            </div>
         </td>

            <td colspan=1 id="study_label_select">
           
            </td>
          
                <td>

                                <div class="w3-tag w3-blue w3-large marlin-data-success" style="cursor:pointer" onclick="fly_label('${custom_start_ms}','${custom_end_ms}','${application_data.application_setup.setup_data.listener_location}')">Add Label</div>
                
            
                </td>
                   
                </tr>
            </table>
            </div>
        
                
                `;

            var el = document.getElementById(content_id);
            el.innerHTML = html;

            var select_html = buildLabelSelect(data, `group_labelsupplyselect`);
            var s_el = document.getElementById('study_label_select');
            s_el.innerHTML = select_html;




        })
    }
    else {
        var el = document.getElementById(content_id);
        el.innerHTML = html;

    }




}


function BuildInfoWindow(content_id) {
    var html = `<div class="center-message">`;

    html += `<div style="width:100%; height:100%"><img src="assets/img/rsa_logo.png"  height="50" alt="RSA logo."></div></div> `;

    var el = document.getElementById(content_id);
    el.innerHTML = html;
}

function BuildSearchWindow(content_id) {

    html = `
    <form>
    <br>
    <div class="container">
     
        <div class = "row">
           <div class="col-6">

           <h4>Data Query</h4>
           </div>
        </div>
      
        <div class="row">
        <div class="col-12">
          
           `;

    html += `
    <br>

             <select class="form-select mb-3" aria-label="Data Location" id = "location_select">
              <option selected value="">Select Acoustic Data Location</option>
           `;
    // alert(user.user_uid);
    for (const [key, value] of Object.entries(marlin_locations)) {
        var leg_users = location_permissions[key];
        console.log(leg_users);
        console.log(user.user_uid);
        if (leg_users.includes(user.user_uid)) {

            html += `<option  value="${key}">${value}</option>`;
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
            
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Start Time" aria-label="Start Time" value="2019-12-13 12:50:00 UTC" id="start_time_input">
            <span class="input-group-text">-</span>
            <input type="text" class="form-control" placeholder="End Time" aria-label="End Time" value="2019-12-13 13:20:00 UTC" id="end_time_input">
            </div>
            </div>

</div>

<div class="row">
<div class="col-12">

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
<br>
        <div class="row">
       
          <div class="col-3">
          <label for="mmsi_search">Vessel MMSI </label>
            <input size="10" type="text" class="form-control mb-3" id="mmsi_search" placeholder="MMSI" value = "000000000">
              
          
            </div>
            </div>

        <div class="row">
          <div class="col-3">
            <label for="search_range">Distance from Hydrophone (m) </label>
            <input size="10" type="text" class="form-control mb-3" id="search_range" placeholder="Search Range" value = "1500">
          
            </div>
            </div>



        <div class="row">
          <div class="col-6">
            <label for="density_value">Number of hits  </label>


            <div class="tags">
                <span class="w3-tag w3-grey w3-large" id="lt" value="eq" onclick="toggleLogic('lt')">< </span>
                <span class="w3-tag w3-grey w3-large" id="eq" onclick="toggleLogic('eq')">= </span>
                <span class="w3-tag w3-grey w3-large" id="gt" onclick="toggleLogic('gt')">></span>
                <span class="w3-tag w3-grey w3-large" id="lte" onclick="toggleLogic('lte')"><= </span>
                <span class="w3-tag w3-grey w3-large" id="gte" onclick="toggleLogic('gte')">>= </span>

            </div>
        
            <br>
          
           
          
            <input size="40" maxlength="4" type="text" class="form-control mb-3" id="density_value" placeholder="Number of targets." value = "0">
         
            
          
            
  
            </div>
        </div>

        <div class="row">
          <div class="col-12">
           <button type="button" id="fetch-analyse"class="btn btn-secondary" >Fetch & Analyse</button>
           <br>
           <div id="fetch-analyse-loader"></div>
            <!--<button type="button" id="close" class="btn btn-danger" >Close</button>-->
            </div>
         </div>
       




   </div>
   </form>

      
    
    `;








    var el = document.getElementById(content_id);
    el.innerHTML = html;

    var search_el = document.getElementById('fetch-analyse');
    search_el.addEventListener('click', openSearch);


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
    select_all_vessels();

}


function BuildSavedApplicationsList(content_id) {
    show_loader(content_id);
    fetchSetups().then((data) => {
        // hide_loader_div('setup-loader');
        // console.log(data);
        buildSetups_new(data, content_id);
        hide_loader(content_id);

    });

}

function BuildReportStudy(content_id) {

    var html = `<div class="center-message">Study times are invalid. Select your study time frame in the acoustic snapshots table.</div>`;
    
    console.log(custom_start_ms, custom_end_ms)
    
    if (custom_start_ms < custom_end_ms) {
        html = "";



        html += `
                <div class="center-message">
                <table>
                <tr>
                    <td>
            <label>min frequency (Hz)</label>
            <input  id = "report_min_f" class="form-control" type="text" placeholder="0" value="0">


     
                    </td>
                      <td>

            <label>max frequency (Hz)</label>
            <input id = "report_max_f" class="form-control" type="text" placeholder="1000" value="1000">



                    </td>
                </tr>
                 <tr>
                    <td>
            <label>FFT window size (int)</label>
            <input  id = "report_windowsize" class="form-control" type="text" placeholder="2048" value="2048">



                    </td>
                     
                </tr>
                 <tr>
                    <td>
            <label>custom time start (s)</label>
            <input  id = "report_timestart" class="form-control" type="text" placeholder="-1" value="-1">



                    </td>
                      <td>

            <label>custom time end (s)</label>
            <input id = "report_timeend" class="form-control" type="text" placeholder="30" value="30">



                    </td>
                </tr>


                <tr id="">
            

                
                <td colspan="2">
               
                
                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="run_report('${content_id}')">
                <i class="fas fa-download fa-sm text-white-50" id = "run_button"></i><span id="run-text"> Build Study Report </span></div>
                </td>   
                <td>
                <div id="report_run_ticker_${content_id}"></div>
                </td>

                </tr>
            </table>
            </div>
            <div id = "reports_${content_id}"> </div>
            <div id = "download_${content_id}" > </div>
                
                `;




        var el = document.getElementById(content_id);
        el.innerHTML = html;

    }
    else {
      
        var el = document.getElementById(content_id);
        el.innerHTML = html;
        return;

    }




}


function ShowStudyLabels(target_window_id) {

    var html = `<div class="center-message">Study times are invalid. Select your study time frame in the acoustic snapshots table.</div>`;

    if (custom_start_ms < custom_end_ms) {

        html = '<div class="center-message">';
        label_data_download().then((data) => {


            var sigs = data['data'];
            console.log(sigs)
            console.log("Building acoustics");
            // var html = `<div class="list-view-holder" >`;
            // html += build_acoustic_header();
            html += `<table class="table table-bordered">`
            //for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++) {
            //var _sid = application_data.acoustic_data.snapshot_ids[i];
            //console.log(_sid);
            //var _snapshot = application_data.acoustic_data.get_snapshot(_sid);
            //var label = "";
            console.log(application_data.acoustic_data.snapshot_ids.length);
            for (var j = 0; j < sigs.length; j++) {

                var ss_start_ms = custom_start_ms;
                var ss_end_ms = custom_end_ms;
                var sig_start_ms = parseFloat(sigs[j].start_time_ms);
                var sig_end_ms = parseFloat(sigs[j].end_time_ms);

                if ((ss_start_ms <= sig_start_ms) && (ss_end_ms >= sig_end_ms)) {
                    console.log("hit");
                    var time_s = time_string(sig_start_ms)[5];
                    var time_e = time_string(sig_end_ms)[5]
                    label = `[${sigs[j].user_name}] ${sigs[j].label}`;
                    html += `<tr>

                    <td>${sigs[j].id}</td>
                    <td>${sigs[j].label}</td>
                    <td>${time_s}</td>
                     <td>${time_e}</td>
                    <td>${sigs[j].user_name}</td>
                    
                    </tr>`;

                }


            }

            // html += build_snapshot_view(_snapshot, i, label);

            //}

            html += `</table></div>`;

            var el = document.getElementById(target_window_id);
            el.innerHTML = html;




        });
    }
    else {
        var el = document.getElementById(target_window_id);
        el.innerHTML = html;
    }


}



function ShowTarget(target_window_id) {


    // build get request

    var get_request = ``;

    for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++) {
        var _sid = application_data.acoustic_data.snapshot_ids[i];
        if (i == application_data.acoustic_data.snapshot_ids.length - 1) {
            //get_request += `ss_ids[]=${_sid}`;
            get_request += `${_sid}`;
        }
        else {
            //get_request += `ss_ids[]=${_sid}&`;   
            get_request += `${_sid},`;
        }


    }

    console.log(get_request);


    var html = '<div class="center-message">';
    html += `
        
        <div class="container">
        <div class="row">
             <div class="col-xl-6 col-md-6 mb-6">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Target</div>
                                            <div id = "delta_t-tag" class="h5 mb-0 font-weight-bold text-gray-800">
                                            
                                            
                                              <select id="environment_selector" class="form-select text-primary" aria-label="Default select example">
                
                <option value ="harbour_porpoise">Harbour Porpoise</option>
                <!-- <option value ="vixen_bot179733">vixen_bot179733_DAVE</option>
                <option value="vixen_bot179733">vixen_bot179733</option>
                <option value="vixen_bot318806">vixen_bot318806</option> -->
            </select>
                                            
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <!-- <i class="fas fa-dollar-sign fa-2x text-gray-300"></i> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="col-xl-6 col-md-6 mb-6">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Number Features</div>
                                            
                                        </div>
                                        <div class="col-auto">
                                            <!-- <i class="fas fa-dollar-sign fa-2x text-gray-300"></i> -->
                                        </div>
                                    </div>
                                       <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                    <input type="text" class="form-control" placeholder="Number of Features/Bots" aria-label="" value="500" id="forward_number_features">
                        </div></div>
                                </div>
                            </div>
                        </div>

           
        
        </div>
        <br>
        <div class="row">

         <div class="col-xl-12 col-lg-12">
                      
                 
                        <div class="card mb-4">
              <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
               
              <!--<span id="filter-text" onclick="window.open('game/index.php?snapshot_id=all&location=${application_data.application_setup.setup_data.listener_location}&ss_ids=${get_request}','${Math.floor(Math.random() * 99999)}','width=1000,height=700')">Search</span></div>-->
              <span id="filter-text" onclick="run_forward_search('${target_window_id}')">Search</span></div>
              
               <div id="filter-command"></div>
                        </div>
         
                        </div>
        </div>
        </div>
        </div>
        `;
    //
    var el = document.getElementById(target_window_id);
    el.innerHTML = html;

}

//m
function ShowUpload(target_window_id) {

    var html = `
    <p>
   
    
   
   
<!--<form action="cgi-bin/upload_data.php" method="post" enctype="multipart/form-data">-->
   <div class="container">
  
    <div class="mb-3">
  <label for="formFile" class="">file format [ _YYYYMMDD_HHMMSS_000.wav ]. Must be over 60s.</label>
  <input class="form-control" type="file" id="upload_file" name="upload_file">
    </div>
    
     <div class="mb-3">
 <input  id = "upload_location_string" class="form-control" type="text" placeholder="location id [string]" value="">

            
     </div>
     <div class="col-auto">
    <button type="submit" id="data-upload" class="btn btn-primary mb-3">Upload to MARLIN</button>
  </div>




    </div>
 <!---</form>-->
    `;

    var el = document.getElementById(target_window_id);
    el.innerHTML = html;

    el = document.getElementById('data-upload');
    el.onclick = function () {
        document.getElementById('data-upload').disabled = true;

        var file_data = $('#upload_file').prop('files')[0];
        var upload_location_string = document.getElementById('upload_location_string').value;
        var form_data = new FormData();
        form_data.append('upload_file', file_data);
        form_data.append('upload_location_string', upload_location_string);
        form_data.append('user_uid', user.user_uid);
        $.ajax({
            url: 'https://marlin-network.hopto.org/cgi-bin/marlin_data_connect.php', // <-- point to server-side PHP script 
            dataType: 'text',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,//'multipart/form-data',
            processData: false,
            data: form_data,
            type: 'post',
            success: function (php_script_response) {
                document.getElementById('data-upload').disabled = false;
                alert(php_script_response); // <-- display response from the PHP script, if any

            }
        });
    };

}
function upload_data_afterrun(run_id) {
    //load game vis
    window.open(`game/index.php?snapshot_id=${run_id}&location=upload`, `${Math.floor(Math.random() * 99999)}`, 'width=1000,height=700');

}
// this is called on update *** live ***
function BuildAppDataLabels(target_window_id) {
    fetchSignatures().then((data) => {
        //console.log(data);
        console.log(target_window_id);
        build_signature_table(data, target_window_id);

    })
}
function BuildAppDataAcoustic(target_window_id) {

    label_data_download().then((data) => {


        var sigs = data['data'];
        console.log(sigs)
        console.log("Building acoustics");
        var html = `<div class="list-view-holder" >`;
        // html += build_acoustic_header();
        for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++) {
            var _sid = application_data.acoustic_data.snapshot_ids[i];
            //console.log(_sid);
            var _snapshot = application_data.acoustic_data.get_snapshot(_sid);
            var label = "";
            for (var j = 0; j < sigs.length; j++) {
                // if (sigs[j].snapshot_id == _sid) {
                //     label += `[${sigs[j].user_name}] ${sigs[j].label}`;
                //     //console.log(label);
                // }
                var ss_start_ms = _snapshot.timeframe_start_ms;
                var ss_end_ms = _snapshot.timeframe_end_ms;
                var sig_start_ms = parseFloat(sigs[j].start_time_ms);
                var sig_end_ms = parseFloat(sigs[j].end_time_ms);
                listener_location = sigs[j].listener_location;
                if (listener_location == '67149847') {
                    if (_sid == "213547676998594081709676") {
                        console.log(sigs[j]['id'])
                        console.log(`${ss_start_ms} >= ${sig_start_ms}`);
                        console.log(`${ss_end_ms} <= ${sig_end_ms}`);
                    }
                }
                // if (_sid == "213547676998594081709676") {
                //     console.log("active")
                //     console.log(`${ss_start_ms} >= ${sig_start_ms}`);
                //     console.log(`${ss_end_ms} <= ${sig_end_ms}`);
                // }

                if ((ss_start_ms <= sig_start_ms) && (ss_end_ms >= sig_end_ms)) {
                    if (_sid == "213547676998594081709676") {
                        console.log(sigs[j]['id'])
                        console.log(`${ss_start_ms} >= ${sig_start_ms}`);
                        console.log(`${ss_end_ms} <= ${sig_end_ms}`);
                    }
                    label += `[${sigs[j].user_name}] ${sigs[j].label}`;

                }


            }

            html += build_snapshot_view(_snapshot, i, label);

        }

        html += `</div>`;

        var el = document.getElementById(target_window_id);
        el.innerHTML = html;



        // build tag
        fetchUserLabels().then((data) => {


            for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++) {

                var _sid = application_data.acoustic_data.snapshot_ids[i];
                //console.log(_sid);
                html = buildLabelSelect(data, `labelsupplyselect_${_sid}`);

                var s_el = document.getElementById(`tag_select${_sid}`);
                s_el.innerHTML = html;
            }

            for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++) {
                var _sid = application_data.acoustic_data.snapshot_ids[i];
                var _snapshot = application_data.acoustic_data.get_snapshot(_sid);
                // if (!(_sid == "846762002253501575910033")) {
                //BuildAcousticSpectrograms(_sid);
                //}

            }



        })

    });


    // // build tag
    // fetchUserLabels().then((data) => {


    //     for (var i = 0; i < application_data.acoustic_data.snapshot_ids.length; i++) {

    //         var _sid = application_data.acoustic_data.snapshot_ids[i];
    //         //console.log(_sid);
    //         html = buildLabelSelect(data, `labelsupplyselect_${_sid}`);

    //         var s_el = document.getElementById(`tag_select${_sid}`);
    //         s_el.innerHTML = html;
    //     }



    // })


}


function clear_checkboxes() {

    let checkboxes1 = document.querySelectorAll("input[type='checkbox']");
    console.log(checkboxes1);
    let checkboxes = document.querySelectorAll(".cbox");
    console.log(checkboxes);
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    custom_start_ms = 999999999999999999999999;
    custom_end_ms = 0;
    custom_start_id = 0;
    custom_end_id = 0;

    UpdateCustomTimestamps(0);


}
// $('custom_check_btn').on("click", function () {
//     console.log("fs");
//     clear_checkboxes();
// });

function build_acoustic_header() {
    return `
     <div class="list-view"  style="cursor:pointer"><button type="button" class="btn btn-primary" onclick="clear_checkboxes()">Reset / Custom Analysis</button>
     </div>
        `;
}


function build_snapshot_view(snapshot, idx, sig_label) {


    // get signatures for acoustic view -




    var style = `style="display:none"`
    if (idx == 0) {
        style = `style="display:none"`;
    }

    var checked = "";
    var selected = "";
    if (snapshot.snapshot_id == application_data.acoustic_data.active_snapshot_id) {
        selected = "selected";
        console.log("selected");
    }
    if (snapshot.snapshot_id == custom_end_id) {
        checked = "checked";
    }
    if (snapshot.snapshot_id == custom_start_id) {
        checked = "checked";
    }



    console.log(snapshot.timeframe_start_js);
    //.toUTCString()
    //console.log(snapshot);
    var spec_filename = snapshot.spec_location;
    //console.log(spec_filename);
    var label = "[Annotations]" + sig_label;
    var html = `
    <div class="list-view ${selected}" id="list-view-${snapshot.snapshot_id}"  style="cursor:pointer" ${checked} >
        <table style="width:100%; font-size:12px;">
            <tr >
            <td><i class="fas fa-expand-alt"onClick="toggle_acoustic_table('${snapshot.snapshot_id}')" ></i></td>
            <td><input type="checkbox" class = "cbox" id ="check_${snapshot.snapshot_id}" value="${snapshot.snapshot_id}" onclick="ss_select('${snapshot.snapshot_id}')"></td>
            <td onClick="toggle_acoustic_table('${snapshot.snapshot_id}')">${snapshot.timeframe_start_js}</td>
            
            
            <td>${snapshot.timeframe_end_js}</td>
            
            <td>  <button id="play-${snapshot.snapshot_id}" class="action-btn" onclick="playAcousticLabel(${snapshot.timeframe_start_ms})" style="z-index:10000">
                <i class="fas fa-forward"></i>
            </button></td>
            <td>
                <!--<a href="${snapshot.raw_acoustic_data_source}" download><button id="next" class="action-btn">
                 <i class="fas fa-file-download"></i>
                 </button></a>-->



                <!-- <a href="game/index.php?snapshot_id=${snapshot.snapshot_id}&location=${snapshot.hydrophone_location}" target="_blank"> -->
                 <button id="next" class="action-btn">
                    <i class="fas fa-chart-line" onclick="window.open('game/index.php?snapshot_id=${snapshot.snapshot_id}&location=${snapshot.hydrophone_location}','${Math.floor(Math.random() * 99999)}','width=1000,height=700')"></i>
                </button>
                <!--</a>-->
            
            
                </td>
                <td>
    
                 <a href="${snapshot.sound_source}" download><button id="next" class="action-btn">
                    <i class="fas fa-music"></i>
                </button></a>

            </td>
             <td>
             <a>
                <!-- <a href="brahma/models.php?snapshot_id=${snapshot.snapshot_id}" target="_blank">-->
                <button id="next" class="action-btn">
                    <i class="fas fa-chart-line" onclick="window.open('brahma/models.php?snapshot_id=${snapshot.snapshot_id}','${Math.floor(Math.random() * 99999)}','width=1500,height=400')"></i>
                </button>
                </a>
                <!--</a>-->
            </td>
        <!-- <td>${snapshot.density}</td>-->
         
            </tr>
            <tr id="rowspec_${snapshot.snapshot_id}" ${style}>
                <td id="spec_${snapshot.snapshot_id}" colspan="6" alt="Loading Spectogram"></td>
            </tr>
       <!--<tr >
         <td><span class="input-group-text">Snapshot ID</span></td>
         <td colspan=3><input class="form-control" type="text" placeholder="${snapshot.snapshot_id}" disabled></td>
       </tr>-->
            <tr id="fft_${snapshot.snapshot_id}" ${style}>
               <!--<td><span class="input-group-text">Sample Rate</span></td>-->
                <!--<td colspan="2"><input class="form-control" type="text" placeholder="${snapshot.sample_rate}Hz" disabled></td>-->
                <td>
                <div class="form-group">
   
                    <select class="form-control" id="fft_sample_select_${snapshot.snapshot_id}">
                    <option value="select">- FFT SAMPLES -</option>
                    <option value="512">512</option>
                    <option value="1024" selected="selected">1024</option>
                    <option value="2048">2048</option>
                      <option value="4096">4096</option>
                        <option value="8192">8192</option>
                          <option value="16384">16384</option>
                     <option value="32768">32768</option>
                    </select>
                  </div>
                  </td>
                  <!--<td>
                    <div class="form-group">
                    <select class="form-control" id="cm_sample_select_${snapshot.snapshot_id}">
                    <option value="jet">Jet</option>
                    <option value="cool">Cool</option>
                    <option value="greys">Greys</option>
                    <option value="hot">Hot</option>

                    </select>
                    </div>
              
            </td>-->
            <td colspan="2">
                <input id = "min_f_${snapshot.snapshot_id}" class="form-control" type="text" placeholder="0" value="0">
            </td>
            <td colspan="1">
                <input  id = "max_f_${snapshot.snapshot_id}"class="form-control" type="text" placeholder="10000" value="10000">
            </td>
            <td></td><td></td>
                <td colspan="2">
               <!-- <div class="w3-tag w3-blue w3-large marlin-data-success" onclick="BuildAcousticSpectrograms('${snapshot.snapshot_id}')">Generate</div>-->
               <!--<div id="generate_${snapshot.snapshot_id}" class="w3-tag w3-blue w3-large marlin-data-success" onclick="BuildAcousticSpectrograms('${snapshot.snapshot_id}')">Generate</div>-->
                <button type="button" class="btn btn-primary" onclick="BuildAcousticSpectrograms('${snapshot.snapshot_id}')">Build</button>
            
               </td>
            </tr>

      
            <tr id="labelspec_${snapshot.snapshot_id}" ${style}">
         <td colspan=4>
         <div class="input-group">
            <span class="input-group-text">Annotate</span>
            <textarea readonly rows="1" class="form-control" aria-label="With textarea" id="label_value_${snapshot.snapshot_id}" value="${label}">${label}</textarea>
            </div>
         </td>
         <td colspan=1 class="label_ "id="tag_select${snapshot.snapshot_id}">
        
         </td>
        <td></td>
        
             <td colspan="2">

            
             <!--<div class="w3-tag w3-blue w3-large marlin-data-success" onclick="send_label('${snapshot.snapshot_id}','${snapshot.timeframe_start_ms}','${snapshot.timeframe_end_ms}','${snapshot.hydrophone_location}','${snapshot.audio_filepath}','${snapshot.raw_acoustic_data_source}')")">Label</div>-->
            
            
             <button type="button" class="btn btn-primary" onclick="send_label('${snapshot.snapshot_id}','${snapshot.timeframe_start_ms}','${snapshot.timeframe_end_ms}','${snapshot.hydrophone_location}','${snapshot.audio_filepath}','${snapshot.raw_acoustic_data_source}')">Add Label</button>
         
             </td>
         </tr>
         <tr>
         <td colspan="4">
         <div id=spec_${snapshot.snapshot_id}></div>
         </td>
         </tr>


        </table>
    </div>
   `;


    //alt="Loading Spectogram" height="300" width="800"




    return html;

}
function toggle_acoustic_table(ss_id) {


    // console.log((ss_id.toFixed(100)));
    // var _snapshot = application_data.acoustic_data.get_snapshot(ss_id);
    // BuildAcousticSpectrograms(_snapshot);
    var el_id = `rowspec_${ss_id}`;
    var lel_id = `labelspec_${ss_id}`;
    var fft_id = `fft_${ss_id}`;
    // var spec_id = `row_spec_orig_${ss_id}`;
    console.log(el_id);
    var el = document.getElementById(el_id);
    var lel = document.getElementById(lel_id);
    var fft = document.getElementById(fft_id);
    // var spec_el = document.getElementById(spec_id);
    if (el.style.display != "none") {

        $(el).fadeOut("slow");
        $(lel).fadeOut("slow");
        $(fft).fadeOut("slow");

        //  $(spec_el).fadeOut("slow");


    }
    else {

        $(el).fadeIn("slow");
        $(lel).fadeIn("slow");
        $(fft).fadeIn("slow");
        //  $(spec_el).fadeIn("slow");
    }


}


function gis_study_select(time_ms) {
    if (time_ms < custom_start_ms) {
        custom_start_ms = time_ms;
        // custom_start_id = ss_id;
    }
    if (time_ms > custom_end_ms) {
        custom_end_ms = time_ms;
        // custom_end_id = ss_id;
    }


    UpdateCustomTimestamps();

}

function ss_select(ss_id) {
    //alert(ss_id);

    //get snapshot

    var snapshot = application_data.acoustic_data.get_snapshot(ss_id);
    //console.log(snapshot);
    //update custom times
    var _time_start = snapshot.timeframe_start_ms;
    var _time_end = snapshot.timeframe_end_ms;

    if (_time_start < custom_start_ms) {
        custom_start_ms = _time_start;
        custom_start_id = ss_id;
    }
    if (_time_end > custom_end_ms) {
        custom_end_ms = _time_end;
        custom_end_id = ss_id;
    }




    //update gui
    // var el = document.getElementById('custom_start_time_ms');
    // el.innerHTML = `${custom_start_ms}`;

    // var el = document.getElementById('custom_end_time_ms');
    // el.innerHTML = `${custom_end_ms}`;


    // var el = document.getElementById('custom_start_time');
    // var _t = time_string(custom_start_ms)[2];
    // el.innerHTML = `${_t}`;


    // _t = time_string(custom_end_ms)[2];
    // var el = document.getElementById('custom_end_time');
    // el.innerHTML = `${_t}`;

    // var id = `check_${ss_id}`;
    // var el = document.getElementById(id);

    UpdateCustomTimestamps();



}


function ShowOrigSpec(application_data) {



    //spec_images_html[0]
    // for (idx in ss_bulk_data) {

    //     var ss_id = Object.keys(ss_bulk_data[idx])[0]; //key of object
    //     var filename = ss_bulk_data[idx][ss_id]['spec_images_html'][0];
    //     //console.log(filename);
    //     var env_filename = ss_bulk_data[idx][ss_id]['environment_spec_images_html'][0];
    //     html = `<img src="${filename}" alt="Loading Spectogram"  style="width:100%, height:100%"></img>`;
    //     // html += `<img src="${env_filename}" alt="Librosa Spectogram"  style="width:100%, height:100%"></img>`;
    //     console.log(`spec_orig_${ss_id }`);
    //     var el = document.getElementById(`spec_orig_${ss_id}`);
    //     el.innerHTML = html;
    // }

}

var custom_start_ms = 999999999999999999999999;
var custom_end_ms = 0;
var custom_start_id = 0;
var custom_end_id = 0;



function run_forward_search(calling_window_id){

   // show_loader_div(`report_run_ticker_${calling_window_id}`);

    if ((custom_start_ms == 0) || (custom_end_ms == 0)) {
        alert("No defined study period.");
        return (0);
    }

    // define time window / frame
    var start_t_ms = custom_start_ms;
    var end_time_ms = custom_end_ms;

    // set application clock and seek bar
    application_data.acoustic_player.set_seeking();
    if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }

    application_data.application_clock.application_time = start_t_ms;
    clock_tick();
    application_data.acoustic_player.stop_seeking();

    // !!! Get list of snapshot ids for defined window frame !!!
    var valid_snaps = application_data.acoustic_data.get_snapshots_for_timeframe(start_t_ms, end_time_ms);
    console.log(valid_snaps);

    var forward_run_id = Math.floor(Math.random() * 99999);

    // Subit for run
    // var report_run_url = "https://vixen.hopto.org/rs/api/v1/data/forward_run";
    // var analysis_id = Math.floor(Math.random() * 99999);
    // var post_data = {}

    // $.post(report_run_url, JSON.stringify(post_data), function (data) {

   // hide_loader_div(`report_run_ticker_${calling_window_id}`);
    // });

}


function run_report(calling_window_id) {

    show_loader_div(`report_run_ticker_${calling_window_id}`);
    // collect data for call

    if ((custom_start_ms == 0) || (custom_end_ms == 0)) {
        alert("No defined study period.");
        return (0);
    }

    var start_t_ms = custom_start_ms;
    var end_time_ms = custom_end_ms;

    application_data.acoustic_player.set_seeking();
    if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }

    application_data.application_clock.application_time = start_t_ms;
    clock_tick();
    application_data.acoustic_player.stop_seeking();


    var valid_snaps = application_data.acoustic_data.get_snapshots_for_timeframe(start_t_ms, end_time_ms);
    console.log(valid_snaps);


    var vessel = null;
    var vessel_track = null;

    application_data.track_analysis = new TrackAnalysis(start_t_ms, end_time_ms, valid_snaps, vessel, vessel_track);
    console.log(application_data.track_analysis);


    audio_files = [];
    snap_ids = [];

    for (var $i = 0; $i < valid_snaps.length; $i++) {
        //console.log(valid_snaps[$i]);
        audio_files.push(valid_snaps[$i].audio_filepath);
        console.log(valid_snaps[$i]);
        snap_ids.push(valid_snaps[$i].snapshot_id)
    }
    console.log(audio_files);
    console.log(snap_ids);

    var report_run_url = "https://vixen.hopto.org/rs/api/v1/data/studyreport";

    var analysis_id = Math.floor(Math.random() * 99999);

    var post_data = {
        'source_files': snap_ids,//.slice(0,2),
        'analysis_id': analysis_id,
        'report_min_f': document.getElementById('report_min_f').value,
        'report_max_f': document.getElementById('report_max_f').value,
        'window_size': document.getElementById('report_windowsize').value,
        'start_time': document.getElementById('report_timestart').value,
        'end_time': document.getElementById('report_timeend').value,
        'location': application_data.application_setup.setup_data.listener_location
    }


    console.log(JSON.stringify(post_data));
    $.post(report_run_url, JSON.stringify(post_data), function (data) {

        //var html = `<i class="fas fa-plus"></i>`;
        //el.innerHTML = html;
        // var el = document.getElementById('custom-analysis-create-button');
        // el.innterHTML =  `<i class="fas fa-plus"></i>`;

        //console.log("custom build");
        //we have the output file    
        //console.log(data['product_filepath']);
        // save to track analysis
        //application_data.track_analysis.audio_file_url = data['product_filepath'];
        //application_data.track_analysis.mp3_file_url = data['mp3'];

        // Build track analysis data view
        console.log(data)
        //alert("Audio merge and analysis complete.")

        //BuildGroupAnalysis();
        build_report_links(calling_window_id, analysis_id);
        merge_audio(calling_window_id, analysis_id, audio_files);
        hide_loader_div(`report_run_ticker_${calling_window_id}`);
    });





}

function build_report_links(calling_window_id, analysis_id) {

    var el = document.getElementById(`reports_${calling_window_id}`);

    var html = `
         <div class="center-message">
             <table>
                <!--
                <tr>
                <td>
                
                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_entropy_report('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Entropy Profile </span>
                </div>
                  
                
                </td>
                </tr>
                 <tr>
                <td>
                
                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_entropy_f_report('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Entropy Frequency Profile </span>
                </div>
                  
                
                </td>
                
                </tr>
                -->
                <tr>
                 <td>
                
                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_dbpower_spectrum('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Power Spectrum (log) </span>
                </div>

                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_power_spectrum('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Power Spectrum </span>
                </div>

                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_waveform('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Waveform </span>
                </div>
                  
                
                </td>
                </tr>
                <!--
                <tr>
                 <td>
                
                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_frequency_temporal_report('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Dynamic F - P Study</span>
                </div>
                  
                
                </td>
                </tr>
                -->
                <!--
                <tr>
                 <td>
                
                <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onclick="show_kurtosis_profile('${analysis_id}')">
                <i class="fas fa-download fa-sm text-white-50"></i><span> Kurtosis Study </span>
                </div>
                  
                
                </td>
                </tr>
                -->
             </table>
             </div>
        `;

    el.innerHTML = html;

}

function merge_audio(calling_window_id, analysis_id, audio_files) {


    var post_data = {
        'source_files': audio_files,//.slice(0,2),
        'analysis_id': analysis_id
    }

    var audio_url = "";
    if ((application_data.application_setup.setup_data.listener_location == "netley") || (application_data.application_setup.setup_data.listener_location == "so1")) {
        audio_url = audio_merge_api;
    }
    else {
        audio_url = audio_merge_api_rsa;
    }

    //console.log(JSON.stringify(post_data));
    $.post(audio_url, JSON.stringify(post_data), function (data) {



        application_data.track_analysis.audio_file_url = data['product_filepath'];
        application_data.track_analysis.mp3_file_url = data['mp3'];

        show_report_downloads(calling_window_id);
    });
}


function custom_epoch_analysis() {


    var el = document.getElementById('custom-analysis-create-button');
    var html = `<h4>merging</h4>`;
    el.innerHTML = html;

    console.log("custom build");

    if ((custom_start_ms == 0) || (custom_end_ms == 0)) {
        alert("need start and end");
        return (0);
    }

    var start_t_ms = custom_start_ms;
    var end_time_ms = custom_end_ms;

    // Application clock update

    application_data.acoustic_player.set_seeking();
    if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }

    application_data.application_clock.application_time = start_t_ms;
    clock_tick();
    application_data.acoustic_player.stop_seeking();





    // --- get relavent snapshots

    var valid_snaps = application_data.acoustic_data.get_snapshots_for_timeframe(start_t_ms, end_time_ms);
    console.log(valid_snaps);


    var vessel = null;
    var vessel_track = null;

    application_data.track_analysis = new TrackAnalysis(start_t_ms, end_time_ms, valid_snaps, vessel, vessel_track);
    console.log(application_data.track_analysis);

    //application_data.ais_vessel_data.active_vessel = mmsi;

    audio_files = [];
    // generate concated wav/mp3 file 
    for (var $i = 0; $i < valid_snaps.length; $i++) {
        //console.log(valid_snaps[$i]);
        audio_files.push(valid_snaps[$i].audio_filepath);
    }
    console.log(audio_files);

    var analysis_id = Math.floor(Math.random() * 99999);

    var post_data = {
        'source_files': audio_files,//.slice(0,2),
        'analysis_id': analysis_id
    }

    console.log(application_data.application_setup.setup_data.listener_location);
    var audio_url = "";
    if ((application_data.application_setup.setup_data.listener_location == "netley") || (application_data.application_setup.setup_data.listener_location == "so1")) {
        audio_url = audio_merge_api;
    }
    else {
        audio_url = audio_merge_api_rsa;
    }

    console.log(audio_url);
    console.log(JSON.stringify(post_data));


    //console.log(JSON.stringify(post_data));
    $.post(audio_url, JSON.stringify(post_data), function (data) {
        var el = document.getElementById('custom-analysis-create-button');
        var html = `<i class="fas fa-plus"></i>`;
        el.innerHTML = html;
        // var el = document.getElementById('custom-analysis-create-button');
        // el.innterHTML =  `<i class="fas fa-plus"></i>`;

        console.log("custom build");
        //we have the output file    
        console.log(data['product_filepath']);
        // save to track analysis
        application_data.track_analysis.audio_file_url = data['product_filepath'];
        application_data.track_analysis.mp3_file_url = data['mp3'];

        // Build track analysis data view

        alert("Audio merge and analysis complete.")

        BuildGroupAnalysis();
    });




}

function approach_analysis(start_t_ms, mmsi, track_index) {

    console.log("approach analysis");


    // Application clock update

    application_data.acoustic_player.set_seeking();
    if (application_data.acoustic_player.playing == true) {
        application_data.acoustic_player.pause();
    }

    application_data.application_clock.application_time = start_t_ms;
    clock_tick();
    application_data.acoustic_player.stop_seeking();


    // Track analysis Data Structure
    // --- get vessel

    var vessel = application_data.ais_vessel_data.get_vessel(mmsi);
    var vessel_track = vessel.get_approach(start_t_ms);


    // --- get relavent snapshots
    end_time_ms = vessel_track[vessel_track.length - 1]._t;
    var valid_snaps = application_data.acoustic_data.get_snapshots_for_timeframe(start_t_ms, end_time_ms);
    //console.log(valid_snaps);
    custom_start_id = valid_snaps[0]['snapshot_id'];
    custom_end_id = valid_snaps[valid_snaps.length - 1]['snapshot_id'];

    application_data.track_analysis = new TrackAnalysis(start_t_ms, end_time_ms, valid_snaps, vessel, vessel_track);
    console.log(application_data.track_analysis);

    application_data.ais_vessel_data.active_vessel = mmsi;

    audio_files = [];
    // generate concated wav/mp3 file 
    for (var $i = 0; $i < valid_snaps.length; $i++) {
        //console.log(valid_snaps[$i]);
        audio_files.push(valid_snaps[$i].audio_filepath);
    }
    //console.log(audio_files);

    var analysis_id = Math.floor(Math.random() * 99999);

    var post_data = {
        'source_files': audio_files,//.slice(0,2),
        'analysis_id': analysis_id
    }

    console.log(post_data);

    console.log(application_data.application_setup.setup_data.listener_location);
    var audio_url = "";
    if ((application_data.application_setup.setup_data.listener_location == "netley") || (application_data.application_setup.setup_data.listener_location == "so1")) {
        audio_url = audio_merge_api;
    }
    else {
        audio_url = audio_merge_api_rsa;
    }

    //console.log(JSON.stringify(post_data));
    $.post(audio_url, JSON.stringify(post_data), function (data) {

        //we have the output file    
        console.log(data['product_filepath']);
        // save to track analysis
        application_data.track_analysis.audio_file_url = data['product_filepath'];
        // Build track analysis data view

        alert("Audio merge and analysis complete.")

        BuildGroupAnalysis();

        //update gui
        // var el = document.getElementById('custom_start_time_ms');
        // el.innerHTML = `${application_data.track_analysis.start_time_ms}`;

        // var el = document.getElementById('custom_end_time_ms');
        // el.innerHTML = `${application_data.track_analysis.end_time_ms}`;


        var el = document.getElementById('custom_start_time');
        var _t = time_string(application_data.track_analysis.start_time_ms)[2];
        el.innerHTML = `${_t}`;


        _t = time_string(application_data.track_analysis.end_time_ms)[2];
        var el = document.getElementById('custom_end_time');
        el.innerHTML = `${_t}`;



    });



}

var acoustic_detail = {};



function BuildAcousticSpectrograms_server(ss_id = "", custom = 0, custom_filename = "none", custom_sr = 96000, min_f = 0, max_f = 0, n_fft = 1, time_start = "", time_end = "", location = "") {

    console.log("buidling spec on server")

    ss_location = ""
    if (custom == 0) {
        var acoustic_snapshot = application_data.acoustic_data.get_snapshot(ss_id);
        var ss_location = acoustic_snapshot.hydrophone_location;
    }



    var identifier = Math.floor(Math.random() * 99999);


    if (custom == 0) {
        var el = document.getElementById(`generate_${ss_id}`);
        el.innerText = "Thinking";
    }
    if (custom == 1) {
        var el = document.getElementById(`generate_custom`);
        el.innerText = "Thinking";
    }

    // get parameters
    if (custom == 0) {
        var min_f = parseInt(document.getElementById(`min_f_${acoustic_snapshot.snapshot_id}`).value);
        var max_f = parseInt(document.getElementById(`max_f_${acoustic_snapshot.snapshot_id}`).value);
        var fft_samples = parseInt(document.getElementById(`fft_sample_select_${acoustic_snapshot.snapshot_id}`).value);
    }

    if (custom == 1) {
        ss_id = "custom_id";
        ss_location = "custom_location";
        fft_samples = n_fft;
        // var fft_samples = parseInt(document.getElementById(`fft_sample_select_${acoustic_snapshot.snapshot_id}`).value);
    }

    // alert(fft_samples);

    var post_data = {
        "snapshot_id": ss_id,
        "location": ss_location,
        "identifier": identifier,
        "f_min": min_f,
        "f_max": max_f,
        "n_fft": fft_samples,
        "custom": custom,
        "custom_fn": custom_filename,
        "custom_sr": custom_sr
    }

    if (custom_filename == "") {
        alert("No acoustic source filename passed");
        return ("");

    }

    var run_spec_url = "";
    if (custom == 0) {
        run_spec_url = "https://vixen.hopto.org/rs/api/v1/run/spec";
    }
    if (custom == 1) {
        //https://marlin-network.hopto.org/api/v1/data/run/spec
        run_spec_url = "https://marlin-network.hopto.org/api/v1/data/run/spec";
    }
    console.log(run_spec_url);
    console.log(JSON.stringify(post_data));

    $.post(run_spec_url, JSON.stringify(post_data), function (data) {
        console.log(data);
        el.innerText = "Generated";
        success = true;
        build_spec_page(identifier, time_start, time_end, location, custom);

    });



}

function build_spec_page(identifier, time_start, time_end, location, custom) {
    const windowFeatures = "left=100,top=100,width=700,height=500";
    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    var title = `${location} | ${time_start} --> ${time_end}`;


    var w = window.open(`https://vixen.hopto.org/rs/ident_app/ident/brahma/spec.php?identifier=${identifier}&title=${title}&custom=${custom}`, title, windowFeatures);



    w.title = `${location} | ${time_start} --> ${time_end}`;
    console.log(`${location} | ${time_start} --> ${time_end}`);


}

var wavesurfers = {};

async function BuildAcousticSpectrograms(acoustic_snapshot_id) {

    var acoustic_snapshot = application_data.acoustic_data.get_snapshot(acoustic_snapshot_id);


    if (acoustic_snapshot.snapshot_id in wavesurfers) {
        console.log("already built");
        //return (1);
    }

    // get parameters
    var min_f = parseInt(document.getElementById(`min_f_${acoustic_snapshot.snapshot_id}`).value);
    var max_f = parseInt(document.getElementById(`max_f_${acoustic_snapshot.snapshot_id}`).value);
    console.log(min_f, max_f);

    var fft_samples = parseInt(document.getElementById(`fft_sample_select_${acoustic_snapshot.snapshot_id}`).value);
    if (fft_samples == "select") {
        alert("Please enter number fft samples.")
        return (1);
    }
    //var fft_cm = document.getElementById(`cm_sample_select_${acoustic_snapshot.snapshot_id}`).value;
    fft_cm = "none";
    console.log(fft_cm);
    console.log(fft_samples);
    var el_id = `#spec_${acoustic_snapshot.snapshot_id}`;
    var gel = document.getElementById(`spec_${acoustic_snapshot.snapshot_id}`);
    gel.innerHTML = "<h4>Creating acoustic data...</h4>";

    console.log(`building ${acoustic_snapshot.snapshot_id}`)

    console.log("building spec");
    console.log(acoustic_detail);

    if ((acoustic_snapshot.snapshot_id in acoustic_detail)) {
        console.log("already build");
        //return (1);
    }

    console.log(acoustic_snapshot);
    // get snapshot data


    console.log(document.getElementById(`spec_${acoustic_snapshot.snapshot_id}`));

    var snapshot_filepath = acoustic_snapshot.sound_source;
    var sample_rate = acoustic_snapshot.sample_rate;
    // var mycolorMap = colors['jet'];


    wavesurfers[acoustic_snapshot.snapshot_id] = WaveSurfer.create({
        container: document.querySelector(el_id),
        waveColor: '#4F4A85',
        progressColor: '#cc3359',
        barWidth: 10,
        barRadius: 10,
        url: snapshot_filepath,
        sampleRate: Math.min(sample_rate, 190000),
        // sampleRate: sample_rate,

        // sampleRate: Math.min(sample_rate)
    })
    // wavesurfers[acoustic_snapshot.snapshot_id].load(snapshot_filepath);
    console.log(wavesurfers[acoustic_snapshot.snapshot_id]);
    //190
    console.log(sample_rate);
    const Spectrogram = (await import("https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.esm.js")).default;
    // Initialize the Spectrogram plugin

    // wavesurfer.addEventListener('ready', (duration) => {
    //     Spectrogram?.destroy();
    //     alert('decoded');
    //     // wavesurfer.registerPlugin(this.spectrogram);
    //     wavesurfer.registerPlugin(
    //     Spectrogram.create({
    //         container: document.querySelector(el_id),
    //         labels: true,
    //         height: 400,
    //         colorMap: colors['jet'],
    //         splitChannels: true,
    //         fftSamples: 1024,
    //     }),
    // )
    //     });

    // create spectrogram
    console.log("new spec routine for : " + acoustic_snapshot.snapshot_id);
    BuildAcousticSpectrograms_server(ss_id = acoustic_snapshot.snapshot_id, custom = 0, custom_filename = "none", custom_sr = sample_rate, min_f = 0, max_f = 0, n_fft = fft_samples, acoustic_snapshot.timeframe_start, acoustic_snapshot.timeframe_end, acoustic_snapshot.hydrophone_location);

    wavesurfers[acoustic_snapshot.snapshot_id].on('ready', () => {
        document.getElementById(`spec_${acoustic_snapshot.snapshot_id}`).getElementsByTagName("h4")[0].textContent = "Custom Analysis Data";
        wavesurfers[acoustic_snapshot.snapshot_id].setTime(1)
        console.log("ready");
        // create spectrogram
        //BuildAcousticSpectrograms_server(ss_id=acoustic_snapshot.snapshot_id, custom=0, custom_filename="none", custom_sr=sample_rate, min_f=0, max_f=0, n_fft=fft_samples)
        // toggle_acoustic_table(acoustic_snapshot.snapshot_id);
    })
    wavesurfers[acoustic_snapshot.snapshot_id].on('interaction', () => {
        wavesurfers[acoustic_snapshot.snapshot_id].play()
        // 
    })
    wavesurfers[acoustic_snapshot.snapshot_id].on('error', function (e) {
        console.error('WaveSurfer error:', e);
    });
    wavesurfers[acoustic_snapshot.snapshot_id].on('decode', function (e) {
        console.log('WaveSurfer decode:', e);
        console.log('WaveSurfer decode:', sample_rate);

        // wavesurfers[acoustic_snapshot.snapshot_id] = WaveSurfer.create({
        // container: document.querySelector(el_id),
        // waveColor: '#4F4A85',
        // progressColor: '#cc3359',
        // barWidth: 10,
        // barRadius: 10,
        // url: snapshot_filepath,
        // sampleRate: Math.min(sample_rate, 190000)
        // sampleRate: Math.min(sample_rate)
        // })


    });


    acoustic_detail[acoustic_snapshot.snapshot_id] = "loaded";
}


//BuildCustomAcousticSpectrograms

async function BuildCustomAcousticSpectrograms(acoustic_snapshot_id) {

    //var acoustic_snapshot = application_data.acoustic_data.get_snapshot(acoustic_snapshot_id);


    // if (acoustic_snapshot.snapshot_id in wavesurfers) {
    //     console.log("already built");
    //     //return (1);
    // }

    // get parameters
    var min_f = parseInt(document.getElementById(`min_f_${acoustic_snapshot_id}`).value);
    var max_f = parseInt(document.getElementById(`max_f_${acoustic_snapshot_id}`).value);
    console.log(min_f, max_f);

    var fft_samples = parseInt(document.getElementById(`fft_sample_select_${acoustic_snapshot_id}`).value);
    if (fft_samples == "select") {
        alert("Please enter number fft samples.")
        return (1);
    }
    var fft_cm = document.getElementById(`cm_sample_select_${acoustic_snapshot_id}`).value;
    console.log(fft_cm);
    console.log(fft_samples);

    var el_id = `#group-visual`;
    var gel = document.getElementById(`group-visual`);
    gel.innerHTML = "<h4>Creating acoustic data...</h4>";

    console.log(`building ${acoustic_snapshot_id}`)

    console.log("building spec");
    console.log(acoustic_detail);

    if ((acoustic_snapshot_id in acoustic_detail)) {
        console.log("already build");
        //return (1);
    }

    //console.log(acoustic_snapshot);
    // get snapshot data


    //console.log(document.getElementById(`spec_${acoustic_snapshot.snapshot_id}`));

    // var snapshot_filepath = acoustic_snapshot.sound_source;
    // var sample_rate = acoustic_snapshot.sample_rate;
    // var mycolorMap = colors['jet'];
    var snapshot_filepath = application_data.track_analysis.audio_file_url;
    var sample_rate = application_data.track_analysis.acoustic_snapshots[0].sample_rate;
    var location = application_data.track_analysis.acoustic_snapshots[0].hydrophone_location;
    var time_start = application_data.track_analysis.start_time_js;
    var time_end = application_data.track_analysis.end_time_js;

    console.log(snapshot_filepath);

    wavesurfers[acoustic_snapshot_id] = WaveSurfer.create({
        container: document.querySelector(el_id),
        waveColor: '#4F4A85',
        progressColor: '#cc3359',
        barWidth: 10,
        barRadius: 10,
        url: snapshot_filepath,
        sampleRate: Math.min(sample_rate, 190000),

        // sampleRate: Math.min(sample_rate)
    })
    // // wavesurfers[acoustic_snapshot.snapshot_id].load(snapshot_filepath);
    // //console.log(wavesurfers[acoustic_snapshot.snapshot_id]);
    // //190
    // console.log(sample_rate);
    // const Spectrogram = (await import("https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.esm.js")).default;
    // // Initialize the Spectrogram plugin

    // // wavesurfer.addEventListener('ready', (duration) => {
    // //     Spectrogram?.destroy();
    // //     alert('decoded');
    // //     // wavesurfer.registerPlugin(this.spectrogram);
    // //     wavesurfer.registerPlugin(
    // //     Spectrogram.create({
    // //         container: document.querySelector(el_id),
    // //         labels: true,
    // //         height: 400,
    // //         colorMap: colors['jet'],
    // //         splitChannels: true,
    // //         fftSamples: 1024,
    // //     }),
    // // )
    // //     });



    //new spec
    console.log("pass url : " + snapshot_filepath);
    BuildAcousticSpectrograms_server(ss_id = "", custom = 1, custom_filename = snapshot_filepath, custom_sr = sample_rate, min_f = min_f, max_f = max_f, n_fft = fft_samples, time_start, time_end, location);


    wavesurfers[acoustic_snapshot_id].on('ready', () => {
        document.getElementById(`group-visual`).getElementsByTagName("h4")[0].textContent = "Custom Analysis Data";
        wavesurfers[acoustic_snapshot_id].setTime(1)
        console.log("ready");
        //     wavesurfers[acoustic_snapshot_id].registerPlugin(
        //     // Spectrogram.create({
        //     //     container: document.querySelector(el_id),
        //     //     labels: true,
        //     //     height: 400,
        //     //     colorMap: colors[fft_cm],
        //     //     splitChannels: true,
        //     //     fftSamples: fft_samples,
        //     //     frequencyMax: max_f,
        //     //     frequencyMin: min_f
        //     // }),
        // )
        // toggle_acoustic_table(acoustic_snapshot.snapshot_id);

        // new spec
        //BuildAcousticSpectrograms_server(ss_id="", custom=1, custom_filename=snapshot_filepath, custom_sr=sample_rate, min_f=min_f, max_f=max_f, n_fft=fft_samples)

    })
    wavesurfers[acoustic_snapshot_id].on('interaction', () => {
        wavesurfers[acoustic_snapshot_id].play()
        // 
    })
    wavesurfers[acoustic_snapshot_id].on('error', function (e) {
        console.error('WaveSurfer error:', e);
    });
    wavesurfers[acoustic_snapshot_id].on('decode', function (e) {
        console.log('WaveSurfer decode:', e);
        console.log('WaveSurfer decode:', sample_rate);

        // wavesurfers[acoustic_snapshot.snapshot_id] = WaveSurfer.create({
        // container: document.querySelector(el_id),
        // waveColor: '#4F4A85',
        // progressColor: '#cc3359',
        // barWidth: 10,
        // barRadius: 10,
        // url: snapshot_filepath,
        // sampleRate: Math.min(sample_rate, 190000)
        // sampleRate: Math.min(sample_rate)
        // })


    });


    acoustic_detail[acoustic_snapshot_id] = "loaded";
}


async function BuildGroupAnalysis() {

    var gel = document.getElementById('group-visual');
    gel.innerHTML = "<h4>No data loaded.</h4>";

    console.log(application_data.track_analysis);

    var test_sound_url = "https://vixen.hopto.org/rs/snapshots/data_ext/snapshots/data/294479/sample_sound_.wav";

    var sample_rate = application_data.track_analysis.acoustic_snapshots[0].sample_rate;
    console.log(sample_rate);





    /*
    * href for ss_ids
   */
    track_analysis_snap_ids = []
    for (var ij = 0; ij < application_data.track_analysis.acoustic_snapshots.length; ij++) {
        track_analysis_snap_ids.push(application_data.track_analysis.acoustic_snapshots[ij].snapshot_id);
    }

    var ss_link = JSON.stringify(track_analysis_snap_ids);
    var data = new Blob([ss_link]);
    // var a = document.getElementById('a');
    var data_href = URL.createObjectURL(data);

    /*
    * Labelling html
    */

    label_data_download().then((data) => {


        var sigs = data['data'];

        var label = "";

        for (var j = 0; j < sigs.length; j++) {

            var ss_start_ms = application_data.track_analysis.start_time_ms;
            var ss_end_ms = application_data.track_analysis.end_time_ms;
            var sig_start_ms = parseFloat(sigs[j].start_time_ms);
            var sig_end_ms = parseFloat(sigs[j].end_time_ms);
            if ((ss_start_ms >= sig_start_ms) && (ss_end_ms <= sig_end_ms)) {
                label += `[${sigs[j].user_name}] ${sigs[j].label}`;
            }


        }



        var el = document.getElementById('group-label');
        var html = `<br><br>
        <table>
        
        <tr id="fft_${application_data.track_analysis.analysis_id}">
               <td><span class="input-group-text">Sample Rate</span></td>
               <!-- <td><input class="form-control" type="text" placeholder="${sample_rate}Hz" disabled></td>-->
                <td>
                <div class="form-group">
   
                    <select class="form-control" id="fft_sample_select_${application_data.track_analysis.analysis_id}">
                    <option value="select">- FFT SAMPLES -</option>
                    <option value="512">512</option>
                    <option value="1024" selected="selected">1024</option>
                    <option value="2048">2048</option>
                      <option value="4096">4096</option>
                        <option value="8192">8192</option>
                          <option value="16384">16384</option>
                     <option value="32768">32768</option>
                    </select>
                  </div>
                  </td>
                  <td>
                    <div class="form-group">
                    <select class="form-control" id="cm_sample_select_${application_data.track_analysis.analysis_id}">
                    <option value="jet">Jet</option>
                    <option value="cool">Cool</option>
                    <option value="greys">Greys</option>
                    <option value="hot">Hot</option>

                    </select>
                    </div>
              
            </td>
            <td>
                <input id = "min_f_${application_data.track_analysis.analysis_id}" class="form-control" type="text" placeholder="0" value="0">
            </td>
            <td>
                <input  id = "max_f_${application_data.track_analysis.analysis_id}"class="form-control" type="text" placeholder="10000" value="10000">
            </td>
            <td></td>
            <td>
                <!-- <div class="w3-tag w3-blue w3-large marlin-data-success" style="cursor:pointer" onclick="BuildCustomAcousticSpectrograms('${application_data.track_analysis.analysis_id}')">Generate</div>-->
                <div id = "generate_custom" class="w3-tag w3-blue w3-large marlin-data-success" style="cursor:pointer" onclick="BuildCustomAcousticSpectrograms('${application_data.track_analysis.analysis_id}')">Generate</div>   
            </td>
            </tr>

      
        
        <tr id="">
            <td colspan=4>
            <div class="input-group">
                <span class="input-group-text">Annotate</span>
                <textarea rows="1" class="form-control" aria-label="With textarea" id="group_label_value_${application_data.track_analysis.start_time_ms}" value="${label}">${label}</textarea>
                </div>
            </td>
            <td colspan=1 id="tag_select">
           
            </td>
            <td></td>
                <td>

                                <div class="w3-tag w3-blue w3-large marlin-data-success" style="cursor:pointer" onclick="label_group_analysis('${application_data.track_analysis.start_time_ms}','${application_data.application_setup.setup_data.listener_location}')">Sign</div>
                
            
                </td>
                    <td>
                        <a href="${data_href}" type='text/csv' download='ss_data.csv'><button  class="action-btn">
                    <i class="fas fa-file-download"></i>
                </button></a>
                </td>
                <td>
                        <a href="${application_data.track_analysis.audio_file_url}"  download='custom_wav.wav'><button  class="action-btn">
                    <i class="fas fa-file-download"></i>
                </button></a>
                </td>
                 <td>
                        <a href="${application_data.track_analysis.mp3_file_url}" download='custom_mp3.mp3'><button  class="action-btn">
                    <i class="fas fa-file-download"></i>
                </button></a>
                </td>
            </tr>
            
           
            </table>
        `;
        //html = "";
        el.innerHTML = "";
        el.innerHTML = html;

        // build tag
        fetchUserLabels().then((data) => {
            html = buildLabelSelect(data, `group_labelsupplyselect_${application_data.track_analysis.start_time_ms}`);
            var s_el = document.getElementById('tag_select');
            s_el.innerHTML = html;


            // build spectrogram 
            //BuildCustomAcousticSpectrograms(application_data.track_analysis.analysis_id);

        })
    });



}


/*
* USER
*/

function BuildUserDataWindow() {

    var html = `
    <div class="accordion" id="data-accordian-holder" style="display:block">

     <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingSetup1">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSetup1" aria-expanded="false" aria-controls="panelsStayOpen-collapseSetup1">
            My Meta Data (labels)
        </button>
        </h2>

        <div id="panelsStayOpen-collapseSetup1" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSetup1">
        <div class="accordion-body" id="labels-setup-body">
           
        </div>
        </div>

    </div>


    <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne2">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne2" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne2">
            Load Setup
        </button>
        </h2>

        <div id="panelsStayOpen-collapseOne2" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne2">
        <div id="setup-loader"></div>
        <div class="accordion-body" id="data-setups-body">
           
        </div>
        </div>

    </div>

    <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo3">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo3" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo3">
            Save
        </button>
        </h2>

        <div id="panelsStayOpen-collapseTwo3" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo3">
        <div class="accordion-body" id="data-save-body">
           <div class="containter">
            <div class="row">
                <div class="col-12">
                
                <table>
                    <tr>
                        <td>
                         <div class="input-group">
                            <span class="input-group-text">Description</span>
                            <textarea rows="1" class="form-control" aria-label="With textarea" value="" id="user-save-description"></textarea>
                        </div>
                        </td>
                        <td>
                        <span style="margin-left:20px" class="w3-tag w3-blue w3-large" id="user-save-btn">Save Setup</span>
                        </td>
                    </tr>
                </table>

                </div>
            </div>
           </div>
        </div>
        </div>

    </div>
<!--

     <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            Data Search
        </button>
        </h2>

        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div class="accordion-body" id="data-search-body">
           
        </div>
        </div>

    </div>



     <div class="accordion-item ">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
            Track Analysis
        </button>
        </h2>

        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
        <div class="accordion-body" id="group-data-body">
        <div id="group-visual"></div>
        <div id="group-label"></div>
        <div id="group-action">
        <table>
            <tr>
                
                <th>Custom Start</th>
                <th>Custom End</th>
                <th>Create</th>
                
            
            </tr>
            <tr>
           
             <td id="custom_start_time">
            </td>
            <td id="custom_end_time">
            </td>
            <td>
            <button id="" class="action-btn" onclick="custom_epoch_analysis()" style="">
                <i class="fas fa-plus"></i>
            </button>
            </td>
            </tr>
            </table>
        </div>
        </div>
        </div>

    </div>
-->

    </div>


    `;

    var el = document.getElementById("user-data-window");
    if (el != null) {
        el.innerHTML = html;
    }

    // fetchUserLabels((data)=>{
    //     buildLabelsSetup();
    // })
    // fetchUserLabels((data) => {
    //     buildLabelsSetup();
    // });
    fetchUserLabels().then((data) => {
        console.log(data);
        buildLabelsSetup(data);
    })

    show_loader_div('setup-loader');
    fetchSetups().then((data) => {
        hide_loader_div('setup-loader');
        console.log(data);
        buildSetups(data);

    })




    el = document.getElementById("user-data-window-holder");


    if (el.style.display == "none") {
        //showDiv(el);
        // el.style.display = "block";
        el.style.display = "block";

    }
    else {
        console.log("fds");
        //hideDiv(el);
        el.style.display = "none";
    }
    el.style.display = "block";


    var setup_action_button = document.getElementById("user-save-btn");
    setup_action_button.onclick = function () {
        var description = document.getElementById('user-save-description').value;
        var result = application_data.Save(description);
    };



}



// BuildAppDataWindow();


/*
*
*
*   Label selection
*
*/

function BuildSave(content_id) {

    var html = "";

    if (application_data == null) {
        html = `<div class="center-message">No application to save. Create an application from the toolbar.</div>`;

        var el = document.getElementById(content_id);
        el.innerHTML = html;

        return;
    }

    html = `
    <div style="padding:20px">
      <div class="containter">
            <div class="row">
                <div class="col-12">

                <table>
                    <tr>
                        <td>
                         <div class="input-group">
                            <span class="input-group-text">Description</span>
                            <textarea rows="1" class="form-control" aria-label="With textarea" value="" id="user-save-description"></textarea>
                        </div>
                        </td>
                        <td>

                              <button type="button" class="btn btn-primary" id="user-save-btn">Save Application</button>
                       
                        </td>
                    </tr>
                </table>

                </div>
            </div>
           </div></div>`;

    var el = document.getElementById(content_id);
    el.innerHTML = html;

    var setup_action_button = document.getElementById("user-save-btn");
    setup_action_button.onclick = function () {
        var description = document.getElementById('user-save-description').value;
        var result = application_data.Save(description);
    };


}


function buildLabelsSetup(labels) {



    console.log("label setup");

    var html = `
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="tags">`;


    for (var i = 0; i < labels.length; i++) {
        html += ` <span class="w3-tag w3-blue w3-large" id="v-30">${labels[i].tag} <span style="cursor:pointer;" onclick="removeLabel('${labels[i].tag}')"> [x] </span></span>
                `;
    }



    html += `</div>
            </div>
        </div>
    </div>
    <br>
     <table><tr id="">
            <td colspan=2>
            <div class="input-group">
                <span class="input-group-text">Label</span>
                <textarea rows="1" class="form-control" aria-label="With textarea" value="" id="new_label_text"></textarea>
                </div>
            </td>
           
            <td></td>
                <td>

                
                <div class="w3-tag w3-blue w3-large marlin-data-success" style="cursor:pointer" onclick="addLabel()">Add Label</div>
                
            
                </td>
            </tr>
            
           
            </table>
    `;

    var el = document.getElementById('labels-setup-body');
    el.innerHTML = html;


}

// the are the labels we add use to tag!!!
const fetchUserLabels = () => {

    return new Promise((resolve, reject) => {
        var success = true;


        var user_uid = user.user_uid;
        var label_url = label_api_url + `/${user_uid}`;
        var label_data = null;
        console.log(label_url);
        $.getJSON(label_url, function (data) {

            //console.log(data['data']);
            label_data = data['data'];
            if (success) {
                // console.log(label_data);
                resolve(label_data);
            } else {
                eject(Error("Error in data download."));
            }
        });



    });


};

function buildLabelSelect(data, id) {

    var html = `
    <select class="form-control" id="${id}"name="label_supply" onchange="";>
    `;
    for (var i = 0; i < data.length; i++) {
        html += `<option value="${data[i].tag}">${data[i].tag}</option>`;
    }


    html += `  
    </select>
    `;

    return html;

}



/*
* Load / Save setups
*/


const fetchSetups = () => {

    return new Promise((resolve, reject) => {
        var success = true;


        var user_uid = user.user_uid;
        var label_url = setup_api_url + `/${user_uid}`;
        var label_data = null;
        console.log(label_url);
        $.getJSON(label_url, function (data) {

            //console.log(data['data']);
            label_data = data['data'];
            if (success) {
                resolve(label_data);
            } else {
                eject(Error("Error in data download."));
            }
        });



    });


};

function buildSetups(data) {


    var html = "";
    html = `

    <div class="container">

    <div class="row">
    <h3>My Data Setups</h3>
    <br>
    </div>
    
    <div class="row">
        <div class="col-12">
            <table class="table table-hover">
            <thead>
                <th>
                Start 
                </th>
                <th>
                End
                </th>
                <th>
                Location
                </th>
                <th>
                Description
                </th>
                <th>
                Load
                </th>
            </thead>
            <tbody>`;

    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        html += `
        <tr>
        <td>${data[i].start_time}</td> 
        <td>${data[i].end_time}</td>
        <td>${data[i].location}</td>
        <td>${data[i].description}</td>
      
        <td>

        <!--<span class="w3-tag w3-blue w3-large" onclick="load_app_setup('${data[i].setup_id}')" style="cursor:pointer">Load Setup</span>-->
        <button type="button" class="btn btn-primary" onclick="load_app_setup('${data[i].setup_id}')">Load</button>
         
        </tr>`;
    }


    html += `</tbody>
            
            </table>
        </div>
    </div>

    </div>

    `;

    var el = document.getElementById('data-setups-body');
    el.innerHTML = html;



}

function buildSetups_new(data, content_id) {


    var html = "";
    html = `<br>

    <div class="container">

    <div class="row">
    <h3>My Data Setups</h3>
    <br>
    </div>
    
    <div class="row">
        <div class="col-12">
            <table class="table table-hover">
            <thead>
                <th>
                Start 
                </th>
                <th>
                End
                </th>
                <th>
                Location
                </th>
                <th>
                Description
                </th>
                <th>
                Load
                </th>
            </thead>
            <tbody>`;

    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        html += `
        <tr>
        <td>${data[i].start_time}</td> 
        <td>${data[i].end_time}</td>
        <td>${data[i].location}</td>
        <td>${data[i].description}</td>
      
        <td>
        <!--<span class="w3-tag w3-blue w3-large" onclick="load_app_setup('${data[i].setup_id}')" style="cursor:pointer">Load Setup</span>-->
         <button type="button" class="btn btn-primary" onclick="load_app_setup('${data[i].setup_id}')">Load</button>
       
        </tr>`;
    }


    html += `</tbody>
            
            </table>
        </div>
    </div>

    </div>

    `;

    var el = document.getElementById(content_id);
    el.innerHTML = html;



}



function BuildGoto(content_id) {

    var html = `
    <br>
        <div class="container">
        <div class="row">
        <div class="col-12">

        
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
        if (leg_users.includes(user.user_uid)) {

            html += `<option  value="${key}">${value}</option>`;
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
           
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Start Time" aria-label="Start Time" value="2019-12-13 12:50:00 UTC" id="start_time_input">
            <span class="input-group-text">-</span>
            <input type="text" class="form-control" placeholder="End Time" aria-label="End Time" value="2019-12-13 13:20:00 UTC" id="end_time_input">
            </div>
            </div>

</div>

    <div class="row">
    <div class="col-6">
            
            <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked disabled>
  <label class="form-check-label" for="flexCheckChecked">
    Load all GIS layers.
  </label>
</div>
        </div>
        <div class="col-6">
             <button type="button" class="btn btn-primary" onclick="goto_app()">Seek</button>
       
        </div>
    </div>
  
  
  </div>
    `;


    var el = document.getElementById(content_id);
    el.innerHTML = html;

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

}


function goto_app() {  

    show_loader();
    start_time = document.getElementById('start_time_input').value;
    end_time = document.getElementById('end_time_input').value;
    location_value = document.getElementById('location_select').value;
    console.log(start_time, end_time, location_value);
    init_application(3000, start_time, end_time, location_value);

}

/*
* View Signarures
*
*/


function BuildSignatureWindow() {

    console.log('building signatures');
    var html = `
    
    <div class = "container">
    
        <div class="row">

            <div class="col-12"><br>
            <h5>Data Signatures</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
            <div id="signature_table">
            </div>
               
            
            </div>
        </div>
    
    </div>
    
    
    `;

    var el = document.getElementById("signature-data-window");
    el.innerHTML = html;


    el = document.getElementById("signature-data-window-holder");

    if (el.style.display == "none") {
        //showDiv(el);
        // el.style.display = "block";
        console.log("show")
        el.style.display = "block";

    }
    else {
        //console.log("fds");
        //hideDiv(el);
        el.style.display = "none";
        return (1);
    }


    fetchSignatures().then((data) => {
        console.log(data);
        build_signature_table(data);

    })







}

const fetchSignatures = () => {

    return new Promise((resolve, reject) => {
        var success = true;


        var user_uid = user.user_uid;
        var label_url = signatures_api_url;
        var label_data = null;
        console.log(label_url);
        $.getJSON(label_url, function (data) {

            signature_data = data['data'];
            console.log(signature_data);
            if (success) {
                resolve(signature_data);
            } else {
                eject(Error("Error in data download."));
            }
        });



    });


};


var signature_data = {};

function build_signature_table(data, t_win_id) {

    signature_data = {};



    var html = `
     
    <table class="table">
        <thead>
            <tr>
           
            <th scope="col">from</th>
            <th scope="col">to</th>
            <th scope="col">labels</th>
            <th scope="col">location</th>
            <th scope="col">.wav</th>
            <th scope="col">data</th>
            <th></th>
            <th></th>
             <th></th>
            </tr>
        </thead>
        <tbody>
`;
    console.log(data);


    for (var i = 0; i < data.length; i++) {

        var valid_now = false;
        if (application_data != null) {
            var application_start_time = application_data.application_clock.application_focus_start_time;
            var application_end_time = application_data.application_clock.application_focus_end_time;
            var app_location = application_data.application_setup.setup_data.listener_location;
            // check if any labels in app timeframe


            if (app_location == data[i]['listener_location']) {
                console.log("location valid now");
                if ((data[i]['start_time_ms'] > application_start_time) && (data[i]['start_time_ms'] < application_end_time)) {
                    console.log("valid now");
                    valid_now = true;
                }
            }



        }

        //console.log(data[i]); 
        signature_data[data[i]['signature_id']] = data[i];


        var start_ms = parseInt(data[i].start_time_ms);
        var end_ms = parseInt(data[i].end_time_ms);
        // var start_time_js = time_string(start_ms)[2];
        // var end_time_js = time_string(end_ms)[2];
        var start_time_js = time_string(start_ms)[6];
        var end_time_js = time_string(end_ms)[6];

        // if (data[i]['user_uid'] == user.user_uid) {
        if (data[i]['user_uid'] == user.user_uid) {

            if (valid_now) {

                html += ` <tr class="table-success">`;
            }
            else {
                html += ` <tr>`;
            }

            html += `
            
           
              
                <td>${start_time_js}</td>
                <td>${end_time_js}</td>
                <td>${data[i]['label']}</td>
                 <td>${data[i]['listener_location']}</td>
                   <td>
                 <a href="${data[i]['acoustic_filepath']}" download><button id="next" class="action-btn">
                    <i class="fas fa-music"></i>
                </button></a>
            </td>
                 <td>
                <a href="${data[i]['data_filepath']}" download><button id="next" class="action-btn">
                    <i class="fas fa-file-download"></i>
                </button></a>
                </td>
              
            `;

            if (valid_now) {

                html += `<td><i class="fas fa-forward" style="cursor:pointer"onclick="playAcousticLabel(${data[i]['start_time_ms']})"></i></td>`
            }
            else {
                html += ` <td> <button type="button"class="btn btn-success" onclick="spawn_sig_app('${data[i]['signature_id']}')">View</button></td>
            `;
            }


            html += `
            <!--<td>
               <td> <button type="button"class="btn btn-success" onclick="spawn_sig('${data[i]['signature_id']}')" disbled>Summary</button></td>
            </td>-->
               <td>
               <td> <button type="button"class="btn btn-success" onclick="spawn_sig('${data[i]['signature_id']}')" disbled>Learn</button></td>
            </td>


            </tr>
            
            `;




        }


    }
    html += `
            </tbody>
        </table>`;


    var el = document.getElementById(t_win_id);
    el.innerHTML = html;


    return html;

}



function spawn_sig_app(sig_data_id) {
    var sig_data = signature_data[sig_data_id];
    var _location_val = sig_data['listener_location'];
    console.log(sig_data['start_time_ms']);
    var _start_time = time_string(parseInt(sig_data['start_time_ms']) - 300000)[6];
    console.log(_start_time);
    var _end_time = time_string(parseInt(sig_data['end_time_ms']) + 300000)[6];
    console.log(_end_time);
    console.log(_location_val);
    // no application loaded yet

    if (application_data == null) {
        show_loader();
        filter_data_download_analyse(_location_val, _start_time, _end_time);
    }
    else {
        alert("There is currently an active application. Please close first.");
    }


}

