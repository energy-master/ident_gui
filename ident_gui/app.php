
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MARLIN</title>
    <!--W3 CSS -->
     <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

    <!--====== Required Leaflet ======-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    
   
    
    <!-- Globals CSS
    <link href="assets/css/globals.css" rel="stylesheet"> -->
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

   

.li{
  position: absolute;
  left: 30vw;
  top:30vh;
  background: var(--navbar-dark-primary);

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

    <div class="container-fluid h-100">
    <div class="row justify-content-center align-items-center h-100">
        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <form action="">
                <div class="container">
    <div class="col-xl-12 col-md-12 mb-12">
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
                                            
                                <div class="col-auto">
    <button type="submit" id="data-upload" class="btn btn-primary mb-3">Upload & Initialise Acoustic Data</button>
  </div>          
                                         
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
  <br>
  


    </div>
        <div class="container" >
        <div class="row">
             <div class="col-xl-12 col-md-12 mb-12">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Select Target</div>
                                         
                                            <br>
                                            
                                              <select id="environment_selector" class="form-select text-primary" aria-label="Default select example">
                
                <option value ="harbour_porpoise">Harbour Porpoise</option>
               
             </select>   
             <br>
             
              <div class="col-auto">
                   <button type="submit" id="data-upload" class="btn btn-primary mb-3">Search</button>
                   </div>
                       
                                          
                                          
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        

           
        
        </div>
        <br>
        <div class="row">

         <!-- <div class="col-xl-12 col-lg-12">
                      
                 
                     
           <button type="submit" id="data-upload" class="btn btn-primary mb-3">Search</button>
                        </div> -->
                         
        </div>
        </div>
        </div>
        
            </form>
        </div>
    </div>
</div>


  </body>
  </html>