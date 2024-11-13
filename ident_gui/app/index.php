<?php
  session_start();
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MARLIN IDent.</title>
    <!--W3 CSS -->
     <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

    <!--====== Required Leaflet ======-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    
   
    
    <!--Globals CSS -->
    <link href="../assets/css/globals.css" rel="stylesheet"> 
    <!-- SetupLoader -->
    <link href="../assets/css/setup_loader.css" rel="stylesheet">
    <!-- Side Menu CSS -->
    <link href="../assets/css/side_menu.css" rel="stylesheet">
    <link href="../assets/css/right_menu.css" rel="stylesheet">
    <!--Data overview Menu CSS -->
    <link href="../assets/css/overview_window.css" rel="stylesheet">
    <!--Working Window CSS -->
    <link href="../assets/css/working_window.css" rel="stylesheet">
    <!--GIS Engine CSS -->
    <link href="../assets/css/gis_engine.css" rel="stylesheet">
    <!--GIS Engine CSS -->
    <link href="../assets/css/player.css" rel="stylesheet">
    <!--Messengere CSS -->
    <link href="../assets/css/messenger.css" rel="stylesheet">
    <!--data - window CSS -->
    <link href="../assets/css/app_data_window.css" rel="stylesheet">
    <!--Filter Window -->
    <link href="../assets/css/main_filter.css" rel="stylesheet">
    <!--Vessel HUD -->
    <link href="../assets/css/vessel_hud.css" rel="stylesheet">

    <!--==== Chart.js ====-->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js" integrity="sha512-L0Shl7nXXzIlBSUUPpxrokqq4ojqgZFQczTYlGjzONGTDAcLremjwaWv5A+EDLnxhQzY5xUZPWLOLqYRkY0Cbw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>


    <link rel="stylesheet" href="../assets/lib/font-awesome-5.15.4/css/fontawesome.min.css"> 
    <link rel="stylesheet" href="../assets/lib/font-awesome-5.15.4/css/all.min.css"> 
   
    <!-- <script type="module">import lottieWeb from 'https://cdn.skypack.dev/lottie-web'; console.log(lottieWeb);</script> -->
     <script src="https://unpkg.com/wavesurfer.js@7"></script>
     <script src="https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.min.js"></script>
   
     <!-- <script src="../js-colormaps.js"></script> -->
    <style>

   

.li{
  position: absolute;
  left: 30vw;
  top:30vh;
  /* background: var(--navbar-dark-primary); */
 
}


.title-container {
    display: flex;
}

.title_{
    font-size: 18px;
}

.app_{
    font-size: 34px;
}


.screen_cover{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: var(--navbar-dark-primary);
  opacity: 0.9;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000000;
  transition: opacity 0.4s linear;
}

#place-holder{
position: fixed;
 background: var(--navbar-dark-primary);

 width: 40vw;
 height:100vh;
 left:60vw;
 z-index: -1;

}
body,html {
    height: 100%;
    padding: 10px;
    background-color: white;
    color:#1F4D54;
}
    </style>
    
  </head>
  <body>
<!-- <div style="left:5px; top: 5px;position: absolute">
   <img src="../assets/img/rsa_logo.png"  height="50" alt="RSA logo.">
</div> -->
    <!-- <div class="container-fluid h-10"> -->
      
      <div class="container-fluid"></div>
        <div class="row justify-content-left align-items-left">
          
          <div class="col col-sm-6 col-md-6 col-lg-6 col-xl-6">

          <!-- <div class="row">
           
            <div class="col">
            <h1>IDent<span style="color:red">.</span></h1>
            </div>
             <div class="col float-right">
            <img src="../assets/img/rsa_logo.png"  height="50" alt="RSA logo.">
            </div>
          </div> -->
          <div class="title-container" style="padding:20px">
            <div style="padding-right: 20px;"><img src="../assets/img/rsa_logo.png"  height="50" alt="RSA logo."></div>
             <div>
              <h1 class="mb-1"> & <span style="color:#1F4D54">MARLIN</span><span style="color:red;">ai</span></h1>
          </div>
          </div>
            <!-- <div class="mb-3" style="padding-top:10px">
 <h4 class="mb-5">artificially intelligent marine acoustic classifiers</h4>
            </div> -->
          
         

                            <div class="card border-left-primary shadow">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div><h1><span style="color:#1F4D54">IDent</span><span style="color:red">.</span></h1></div>
                                        <!-- <h5 class="mb-5">artificially intelligent marine acoustic classifiers</h5> -->
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Acoustic Data Upload</div>
                                       
                                              <div class="mb-3">
  <label for="formFile" class="form-label">Upload acoustic data.</label>
  <!-- <label for="usr">Upload a valid wav file.</label> -->
  <input class="form-control" type="file" id="upload_file" name="upload_file" style="width:300px">
    </div>
      <div class="mb-3">
                <!-- <label for="activation-level">Activation Energy</label> -->
           <input type="text" class="form-control" id="data-notes" style="width:300px" value="" placeholder="data notes">
        
             </div>
  <div class="mb-3">
     <!-- <label for="environment_selector">Select Target</label> -->
      <select id="environment_selector" class="form-select text-primary" aria-label="Default select example" style="width:300px">
                
                <option value ="harbour_porpoise">Harbour Porpoise</option>
               
             </select>  
             </div>
             <div class="mb-3">
     <!-- <label for="environment_selector">Select Target</label> -->
      <select id="version_selector" class="form-select text-primary" aria-label="Default select example" style="width:200px">
                
                <option value ="_1_0_0">1.0.0</option>
               
             </select>  
             </div>

  <div class="mb-3">
<div class="text-xs text-primary mb-1" style="cursor:pointer" id="param-toggle"> Toggle Parameters +/-</div>
 

  </div>

  <div id="params" style="display: none;">
             <div class="row">
              <div class="col-xs-12 col-md-3 col-sm-6">
              <div class="mb-3">
                <label for="activation-level">[E|a]</label>
           <input type="text" class="form-control" id="activation-level" style="width:100px" value="0.8">
        
             </div>
             </div>
              <div class="ol-xs-12 col-md-3 col-sm-6">
               <div class="mb-3">
                 <label for="threshold-energy-lelve">% > E|a</label>
           <input type="text" class="form-control" id="above_e_threshold" style="width:100px" value="10">
             </div>
             </div>
              <div class="ol-xs-12 col-md-3 col-sm-6">
               <div class="mb-3">
                 <label for="threshold-energy-lelve">Structure Similarity</label>
           <input type="text" class="form-control" id="structure_similarity" style="width:100px" value="0.8">
             </div>
             </div>

             <!-- <div class="ol-xs-12 col-md-3 col-sm-6">
              <div class="mb-3">
                <label for="activation-level">70% Threshold</label>
           <input type="text" class="form-control" id="70_threshold" style="width:100px" value="0.9">
        
             </div>
             </div> -->

                <div class="col-xs-12 col-md-3 col-sm-6">
              <div class="mb-3">
                <label for="activation-level">Number Features</label>
           <input type="text" class="form-control" id="number_features" style="width:100px" value="300">
        
             </div>
             </div>

             </div>
        </div>
            <!-- <div class="mb-3">
  <br>
     <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Acoustic Data Description</div>
    <input type="text" class="form-control" id="description-text">
   
  </div> -->
            
                                            
                                <div class="col-auto">
    <button type="submit" id="data-upload" class="btn btn-primary mb-3">Upload & Search</button>
  </div>          
                                         
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>

          <div class="col col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <br>
            <br>
            

</div>
  
    </div>

 
    


    <div class="row justify-content-center align-items-center ">
    <div class="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <p></p>
   
    <div class="card border-left-primary shadow h-100 py-2">
    <div class="card-body">
        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="cursor:pointer" id="run-toggle">
                                               My Runs +/-</div><br>
      <div id="run-table" style= "max-height:800px; overflow-y: scroll; display:none;"></div>

    </div>
    </div>
    
    </div>
    </div>
     
      
    </div>

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
                         <div class="btn btn-primary btn-xl" id="login-btn" >Log In</div>
                        
                    </p>
                </form>
</form>
        </div> 
</div>
   

<footer class="bg-body-tertiary text-center">
  <!-- Grid container -->
  <div class="container p-4 pb-0">
    <!-- Section: Social media -->
    <section class="mb-4">
      <!-- Facebook -->
      <!-- <a
      data-mdb-ripple-init
        class="btn text-white btn-floating m-1"
        style="background-color: #3b5998;"
        href="#!"
        role="button"
        ><i class="fab fa-facebook-f"></i
      ></a> -->

      <!-- Twitter -->
      <!-- <a
        data-mdb-ripple-init
        class="btn text-white btn-floating m-1"
        style="background-color: #55acee;"
        href="#!"
        role="button"
        ><i class="fa-brands fa-x-twitter"></i
      ></a> -->

      <!-- Google -->
      <!-- <a
        data-mdb-ripple-init
        class="btn text-white btn-floating m-1"
        style="background-color: #dd4b39;"
        href="#!"
        role="button"
        ><i class="fab fa-google"></i
      ></a> -->

      <!-- Instagram -->
      <!-- <a
        data-mdb-ripple-init
        class="btn text-white btn-floating m-1"
        style="background-color: #ac2bac;"
        href="#!"
        role="button"
        ><i class="fab fa-instagram"></i
      ></a> -->

      <!-- Linkedin -->
      <a
        data-mdb-ripple-init
        class="btn text-white btn-floating m-1"
        style="background-color: #0082ca;"
        href="#!"
        role="button"
        ><i class="fab fa-linkedin-in"></i
      ></a>
      <!-- Github -->
      <!-- <a
        data-mdb-ripple-init
        class="btn text-white btn-floating m-1"
        style="background-color: #333333;"
        href="#!"
        role="button"
        ><i class="fab fa-github"></i
      ></a> -->
    </section>
    <!-- Section: Social media -->
  </div>
  <!-- Grid container -->

  <!-- Copyright -->
  <div class="text-center p-3 color-primary" style="background-color: white-smoke;">
   © 2024 Copyright:
    <a class="text-body" href="https://www.rsaqua.co.uk/"  style="color:white">RS Aqua</a>
  </div>
  <!-- Copyright -->
</footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="../assets/js/utils.js"></script>
        <script src="../assets/js/application_str.js"></script>
  <script src="assets/js/app.js"></script>
  <script>
      application_id = 0;
      var user = null;
      // build_side_menu();
      // build_right_menu()
      var logon = true;
      
      if (application_id != 0){
        logon = false;
      }
      console.log("logon " + logon);
      if (logon == false){
        // user_data = {};
        // user_data['user_first'] = name;
        // user_data['user_status'] =  level;
        // user_data['position'] = position;
        // user_data['user_uid'] = user_uid;

        // var cover_el = document.getElementById("app-block");
        // $(cover_el).fadeOut("fast");
        // show_loader();
        // console.log(`Downloading data: ${location_value}, ${start_time}, ${end_time}`);
        // user = new User(user_data['user_first'], user_data['user_status'], user_data['position'] , user_data['user_uid']);
        // console.log(user);
        // filter_data_download_analyse(location_value, start_time, end_time);
        // build_side_menu();
        // build_right_menu();
        // BuildUserDataWindow(); 
      }

        const el = document.getElementById("login-btn");
        el.addEventListener('click', (e) => {

            // alert(e);
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            post_data = {
                "username" : username,
                "password" : password
            }
           
            if ((username=="") || (password=="")){
              alert ("Please complete required fields.");
              return (1);
            }
           
            var url = "https://vixen.hopto.org/rs/api/v1/data/login";
            //console.log(JSON.stringify(post_data));
            $.post(url, JSON.stringify(post_data), function (data) {

            console.log(data);

            if (data['access'] == "1") {
                // alert("Success");
                var cover_el = document.getElementById("app-block");
                $(cover_el).fadeOut("fast");
                var user_data = data['data'][0];
                var full_name = user_data['user_first'] +  " " +user_data['user_last'];
                user = new User(user_data['user_first'], user_data['user_status'], user_data['position'] , user_data['user_uid']);

                console.log(user);
                // build_side_menu();
                //build_right_menu();
                // BuildAppDataWindow(); // holder for all app data
                //BuildUserDataWindow(); 
                //show_data_selection();
                grab_ident_runs();
                tick_interval = 2000;
                var play_thread_id = setInterval(grab_ident_runs, tick_interval);
            }
            else{
                alert("Error. Response [404]")
            }
        });
            

        });

        
	    console.log("Marlin 1.00 2/4/24");
        </script>

  </body>
  </html>