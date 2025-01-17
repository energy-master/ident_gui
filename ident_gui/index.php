<?php
session_start();
?>

<script>
    var application_id = 0

</script>
<?php

$application_id = 0;
if (isset($_GET['application_id'])) {
    $application_id = $_GET['application_id'];
    $location_value = $_GET['location_value'];
    $start_time = $_GET['start_time'];
    $end_time = $_GET['end_time'];
    $name = $_GET['name'];
    $user_uid = $_GET['uid'];
    $position = $_GET['position'];
    $level = $_GET['level'];




    echo "<script>var location_value = '$location_value';</script>";
    echo "<script>var start_time = '$start_time';</script>";
    echo "<script>var end_time = '$end_time';</script>";
    echo "<script>var name = '$name';</script>";
    echo "<script>var user_uid = '$user_uid';</script>";
    echo "<script>var position = '$position';</script>";
    echo "<script>var level = '$level';</script>";

}
echo "<script>application_id = '$application_id';</script>";

?>


<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MARLIN Researh & Development</title>
    <!--W3 CSS -->
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

    <!--====== Required Leaflet ======-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />



    <!-- Globals CSS -->
    <link href="assets/css/globals.css" rel="stylesheet">
    <!-- SetupLoader -->
    <link href="assets/css/setup_loader.css" rel="stylesheet">
    <!-- Side Menu CSS -->
    <link href="assets/css/side_menu.css" rel="stylesheet">
    <link href="assets/css/right_menu.css" rel="stylesheet">
    <!--Data overview Menu CSS -->
    <link href="assets/css/overview_window.css" rel="stylesheet">
    <!--Working Window CSS -->
    <link href="assets/css/working_window.css" rel="stylesheet">
    <!--GIS Engine CSS -->
    <link href="assets/css/gis_engine.css" rel="stylesheet">
    <!--GIS Engine CSS -->
    <link href="assets/css/player.css" rel="stylesheet">
    <!--Messengere CSS -->
    <link href="assets/css/messenger.css" rel="stylesheet">
    <!--data - window CSS -->
    <link href="assets/css/app_data_window.css" rel="stylesheet">
    <!--Filter Window -->
    <link href="assets/css/main_filter.css" rel="stylesheet">
    <!--Vessel HUD -->
    <link href="assets/css/vessel_hud.css" rel="stylesheet">
    <!--Floating menu -->
    <link href="assets/js/css/floating_menu.css" rel="stylesheet">

    <!--==== Chart.js ====-->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js" integrity="sha512-L0Shl7nXXzIlBSUUPpxrokqq4ojqgZFQczTYlGjzONGTDAcLremjwaWv5A+EDLnxhQzY5xUZPWLOLqYRkY0Cbw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>


    <link rel="stylesheet" href="assets/lib/font-awesome-5.15.4/css/fontawesome.min.css">
    <link rel="stylesheet" href="assets/lib/font-awesome-5.15.4/css/all.min.css">

    <!-- <script type="module">import lottieWeb from 'https://cdn.skypack.dev/lottie-web'; console.log(lottieWeb);</script> -->
    <script src="https://unpkg.com/wavesurfer.js@7"></script>
    <script src="https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.min.js"></script>
    <script src="js-colormaps.js"></script>
    <style>
        .li {
            position: absolute;
            left: 30vw;
            top: 30vh;
            background: var(--navbar-dark-primary);

        }


        #place-holder {
            position: fixed;
            background: var(--navbar-dark-primary);

            width: 40vw;
            height: 100vh;
            left: 60vw;
            z-index: -1;

        }
    </style>

</head>

<body>

    <div id="windows"></div>
    <div id="main_hdr_l">

        <div class="header-data" id="loc-data">No Data Loaded.</div>



    </div>
    <!-- <br><br> -->
    <div id="main_hdr_r">

        <div class="header-data" id="custom-data">No Study Data Selected.</div>


    </div>

    <div id="toolbar"></div>

    <!-- <div id = "draggable_window"><div id="draggable_window_hdr"><span style="color:red">IDent</span> Data Window<div class=close-icon>X</div></div>
  <div class="window-bottom-border"></div>
  </div> -->



    <div class="preloader" id="loading_cover">
        <!-- <img src="assets/img/spinner.svg" alt="spinner"> -->
        <div class="loader-messager" id="loader-messager"></div>
    </div>

    <!-- <div class="app_grey_screen" id= "app-cover" style="display:none"></div> -->
    <!-- 
    <div id="place-holder"></div> -->
    <div id="nav-bar-holder-2"></div>
    <!-- <div  id="nav-bar-holder-1"></div> -->

    <div id="overview-data-window"></div>
    <div class="gis_engine_window" id="gis_engine"> </div>
    <div id="working-window" style="display:none"> </div>
    <div id="messenger" style="display:none;"></div>
    <!-- <div id="vessel_hud" style="display:none;"></div> -->
    <div id="vessel_focus" style="display:block;"></div>
    <!-- <div id="vessel_plots" style="display:none;">
       <canvas id="vessel-chart" height="200" width="400"></canvas>
    </div> -->
    <div class="music-container" id="player" style="display:none;"></div>
    <div id="clock" style="display:none;"></div>
    <!--<div id="app-data-window-holder" style="display:block;"><div id="app-data-window" ></div></div>-->
    <div id="user-data-window-holder" style="display:block;">
        <div id="user-data-window"></div>
    </div>
    <div id="signature-data-window-holder" style="display:none;">
        <div id="signature-data-window"></div>
    </div>

    <div id="filter-data-window-holder" style="display:none;">
        <div id="filter-data-window"></div>
    </div>
    <div id="new-filter"></div>
    <div class="filter_cover" id="main-filter" style="display:none;"></div>
    <div class="screen_cover" id="app-block" style="display:block">


        <div class="li">
            <form id="form_login">

                <p>
                <h2><span style="color:white">MARLIN</span><span style="color:red">ai</span></h2>
                <p>

                    <input type="text" id="username" placeholder="username" />
                </p>
                <p>
                    <input type="password" id="password" placeholder="password" />
                </p>

                <p>
                <div class="btn btn-primary btn-xl" id="login-btn">Log In</div>

                </p>
            </form>
            </form>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

        <!--- Leaflet GIS -->
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

        <script type="module">import lottieWeb from 'https://cdn.skypack.dev/lottie-web';</script>
        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"
            integrity="sha512-jEnuDt6jfecCjthQAJ+ed0MTVA++5ZKmlUcmDGBv2vUI/REn6FuIdixLNnQT+vKusE2hhTk2is3cFvv5wA+Sgg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- <script src="assets/js/utils.js"></script> -->

        <script src="assets/js/js-colormaps.js"></script>

        <!-- Import JS -->

        <!-- Core UI Visualisation-->
        <script src="assets/js/ui/side_menu.js"></script>
        <script src="assets/js/ui/overview_window.js"></script>
        <script src="assets/js/ui/working_window.js"></script>
        <script src="assets/js/ui/messenger.js"></script>
        <script src="assets/js/ui/player.js"></script>
        <script src="assets/js/ui/app_data_window.js"></script>
        <script src="assets/js/ui/vessel_hud.js"></script>

        <script src="assets/js/ui/setup_loader.js"></script>



        <!-- Core Data Data Structures-->
        <script src="assets/js/utils.js"></script>
        <script src="assets/js/config.js"></script>
        <script src="assets/js/acoustic_data_str.js"></script>
        <script src="assets/js/ais_data_str.js"></script>

        <!-- Core Application Data Structures-->
        <script src="assets/js/application_str.js"></script>


        <!-- Core Application Data Algorithms-->
        <script src="assets/js/vessel_types.js"></script>
        <script src="assets/js/ais_gis.js"></script>
        <script src="assets/js/ais_data.js"></script>
        <script src="assets/js/acoustic_data.js"></script>

        <!-- Core Application Algorithms-->
        <script src="assets/js/application.js"></script>

        <!-- Core Plugins -->
        <script src="assets/js/gis_engine.js"></script>
        <script src="assets/js/ui_plugins/ais_ui.js"></script>
        <script src="assets/js/ui_plugins/acoustic_ui.js"></script>


        <!-- Core UI Callbacks -->
        <script src="assets/js/ui_control/callback_functions.js"></script>
        <script src="assets/js/ui_control/callback_calls.js"></script>
        <script src="assets/js/ui_control/player_control.js"></script>
        <script src="assets/js/ui_control/callback_main_filter.js"></script>

        <!-- <script src="assets/js/ui_control/callback_main_filter.js"></script> -->


        <!-- Custom plugins -->
        <!------ show tracks - non temporal ----------->
        <script src="assets/js/plugins/tracks.js"></script>
        <script src="assets/js/plugins/plugins_load.js"></script>

        <!--Clock tick control -->
        <script src="assets/js/clock_tick.js"></script>

        <!--App setup-->
        <script src="assets/js/ui/main_filter.js"></script>
        <script src="assets/js/ui/new_filter.js"></script>

        <!-- Toolbars -->
        <script src="assets/js/ui/floating_menu_build.js"></script>
        <script src="assets/js/ui/floating_menu.js"></script>
        <script src="assets/js/ui_control/toolbar_calls.js"></script>

        <!-- Connect to buttons-->
        <script src="assets/js/ui_control/report.js"></script>




        <script>
            //Load starting page
        </script>

        <script>

            hide_loader();

        </script>



        <script>
            /*
            *
            *   Global Data
            */



            var acoustic_data = null;
            var ais_data = null;
            var app_setup = null;
            var application_data = null;
            var dataQuery = null;

            var filtered_data = null; // filter data structure

            // var user = null;
        </script>
        <script>
            var user = null;
            // build_side_menu();
            // build_right_menu()
            var logon = true;

            if (application_id != 0) {
                logon = false;
            }
            console.log("logon " + logon);
            if (logon == false) {

                user_data = {};
                user_data['user_first'] = name;
                user_data['user_status'] = level;
                user_data['position'] = position;
                user_data['user_uid'] = user_uid;

                var cover_el = document.getElementById("app-block");
                $(cover_el).fadeOut("fast");
                show_loader();
                console.log(`Downloading data: ${location_value}, ${start_time}, ${end_time}`);
                user = new User(user_data['user_first'], user_data['user_status'], user_data['position'], user_data['user_uid']);
                console.log(user);

                // build_side_menu();
                // build_right_menu();
                // BuildUserDataWindow(); 

                console.log('-------');
                post_data_l = { 'user_uid': user.user_uid }
                locations_url = "https://vixen.hopto.org/rs/api/v1/data/locations";

                $.post(locations_url, JSON.stringify(post_data_l), function (data_l) {
                    // console.log(data_l);
                    for (var ij in data_l['data']) {

                        //console.log(data_l['data'][ij]);
                        l_ = data_l['data'][ij]['location'];
                        console.log(l_);
                        if (marlin_locations.hasOwnProperty(l_) == false) {
                            console.log(l_);
                            marlin_locations[l_] = l_

                            if (location_permissions.hasOwnProperty(l_) == true) {
                                // location_permissions[l_] = [];
                                location_permissions[l_].push(user.user_uid);
                                continue;
                            }
                            if (location_permissions.hasOwnProperty(l_) == false) {
                                location_permissions[l_] = [];
                                location_permissions[l_].push(user.user_uid);

                            }

                            if (location_geo_lat.hasOwnProperty(l_) == false) {

                                location_geo_lat[l_] = data_l['data'][ij]['latitude'];
                                location_geo_long[l_] = data_l['data'][ij]['longitude'];

                            }







                        }
                        else {
                            if (location_permissions.hasOwnProperty(l_) == true) {

                                location_permissions[l_].push(user.user_uid);
                            }
                        }

                    }
                    console.log(marlin_locations);
                    console.log(location_permissions);
                    console.log(location_geo_lat);
                    console.log(location_geo_long);

                    // console.log(user);
                    //build_side_menu();


                    // ToolbarClick('search-data');
                    filter_data_download_analyse(location_value, start_time, end_time);
                    // build_floating_menu();
                    // connect_toolbar();
                    // show_play_tools();
                });

            }

            const el = document.getElementById("login-btn");
            el.addEventListener('click', (e) => {

                // alert(e);
                var username = document.getElementById("username").value;
                var password = document.getElementById("password").value;

                post_data = {
                    "username": username,
                    "password": password
                }

                if ((username == "") || (password == "")) {
                    alert("Please complete required fields.");
                    return (1);
                }

                var url = "https://vixen.hopto.org/rs/api/v1/data/login";
                //console.log(JSON.stringify(post_data));
                $.post(url, JSON.stringify(post_data), function (data) {
                    console.log('---');
                    console.log(data);

                    if (data['access'] == "1") {




                        var cover_el = document.getElementById("app-block");
                        $(cover_el).fadeOut("fast");
                        var user_data = data['data'][0];
                        var full_name = user_data['user_first'] + " " + user_data['user_last'];
                        user = new User(user_data['user_first'], user_data['user_status'], user_data['position'], user_data['user_uid']);

                        console.log('-------');
                        post_data_l = { 'user_uid': user.user_uid }
                        locations_url = "https://vixen.hopto.org/rs/api/v1/data/locations";

                        $.post(locations_url, JSON.stringify(post_data_l), function (data_l) {
                            // console.log(data_l);
                            for (var ij in data_l['data']) {
                                //console.log(data_l['data'][ij]);
                                l_ = data_l['data'][ij]['location'];
                                if (marlin_locations.hasOwnProperty(l_) == false) {
                                    //console.log(l_);
                                    marlin_locations[l_] = l_
                                    if (location_permissions.hasOwnProperty(l_) == true) {
                                        // location_permissions[l_] = [];
                                        location_permissions[l_].push(user.user_uid);
                                        continue;
                                    }
                                    if (location_permissions.hasOwnProperty(l_) == false) {
                                        location_permissions[l_] = [];
                                        location_permissions[l_].push(user.user_uid);

                                    }

                                    if (location_geo_lat.hasOwnProperty(l_) == false) {

                                        location_geo_lat[l_] = data_l['data'][ij]['latitude'];
                                        location_geo_long[l_] = data_l['data'][ij]['longitude'];

                                    }




                                }
                                else {
                                    if (location_permissions.hasOwnProperty(l_) == true) {

                                        location_permissions[l_].push(user.user_uid);
                                    }
                                }

                            }
                            // console.log(marlin_locations);
                            // console.log(location_permissions);
                            // console.log(location_geo_lat);
                            // console.log(location_geo_long);

                            // console.log(user);
                            //build_side_menu();
                            // build_floating_menu();
                            // connect_toolbar();
                            // //show_data_tools();
                        });

                        // console.log(user);
                        // build_side_menu();
                        //build_right_menu();
                        // BuildAppDataWindow(); // holder for all app data
                        //BuildUserDataWindow(); 
                        //show_data_selection();



                    }
                    else {
                        alert("Error. Response [404]")
                    }
                });


            });


            console.log("Marlin 1.00 2/4/24");
        </script>


        <script>
            //build_new_filter();
            // Load();
            //launch_save();

        </script>



</body>

</html>