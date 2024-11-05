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
}
    </style>
    
  </head>
  <body>
 <br><br>
    <div class="container-fluid h-10">
      
    <div class="row justify-content-center align-items-center h-100">
        <div class="col col-sm-8 col-md-8 col-lg-8 col-xl-8">
            
           
            <!-- <form action=""> -->
                <!-- <div class="container">
    <div class="col-xl-12 col-md-12 mb-12"> -->
          <!-- <h4>MARLIN<span style="color:red">ai</span></h4> -->
       
            <h2>IDent<span style="color:red">.</span></h2>
           <br>
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Acoustic Data Upload</div>
                                         
                                              <div class="mb-3">
  <label for="formFile" class="form-label">Upload acoustic data.</label>
  <input class="form-control" type="file" id="upload_file" name="upload_file">
    </div>
  <div class="mb-3">
      <select id="environment_selector" class="form-select text-primary" aria-label="Default select example">
                
                <option value ="harbour_porpoise">Harbour Porpoise</option>
               
             </select>  
             </div>
            <!-- <div class="mb-3">
  <br>
     <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Acoustic Data Description</div>
    <input type="text" class="form-control" id="description-text">
   
  </div> -->
             <br> 
                                            
                                <div class="col-auto">
    <button type="submit" id="data-upload" class="btn btn-primary mb-3">Upload & Search</button>
  </div>          
                                         
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
  
    </div>
    


    <div class="row justify-content-center align-items-center ">
    <div class="col col-sm-8 col-md-8 col-lg-8 col-xl-8">
      <p></p>
   
    <div class="card border-left-primary shadow h-100 py-2">
    <div class="card-body">
       <h4>Saved Runs</h4>
      <div id="run-table" style= "max-height:300px; overflow-y: scroll;"></div>
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
   
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
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