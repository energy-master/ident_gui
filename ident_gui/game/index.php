<?php
session_start();
$snapshot_id = $_GET['snapshot_id'];
$snapshot_location = $_GET['location'];
$ss_ids = array();
$ss_ids = $_GET['ss_ids'];
echo "<script>var snapshot_id = '$snapshot_id';</script>";
echo "<script>var snapshot_location_ = '$snapshot_location';</script>";

echo "<script>var ss_ids = '$ss_ids';</script>";

?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MARLIN Game Powered by Brahma</title>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <link href="../assets/css/globals.css" rel="stylesheet">
    <link href="../assets/css/player.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../assets/lib/font-awesome-5.15.4/css/fontawesome.min.css"> 
    <link rel="stylesheet" href="../assets/lib/font-awesome-5.15.4/css/all.min.css"> 
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
   <!-- Bootstrap CSS -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="../brahma/vendor/jquery/jquery.min.js"></script>
    <script src="../brahma/vendor/jquery/jquery.js"></script>
    <script src="../assets/js/acoustic_data.js"></script>
    <script src="../assets/js/config.js"></script>
    <style>
    
    body{
        background-color:black;
        /* border: solid red 1px; */
    }
    .center {
        margin: auto;
        width: 100%;
        border: 3px solid green;
        padding: 10px;
        border-radius: 10px;
        background-color: black;
        }
    .play-button
    {
        top:30px;
        left:50px;
        height:100px;
        width: 100px;
        /* background-color:white; */
        position: fixed;
        cursor: pointer;
        font-size:40px;
        color:white;
    }

    .frame-number
    {
        top:30px;
        left:110px;
        height:100px;
        width: 100px;
        /* background-color:white; */
        position: fixed;
        cursor: pointer;
        font-size:30px;
        color:white;
        font-family: 'Courier New', monospace;
    }
    .time-display
    {
        top:30px;
        left:220px;
        height:100px;
        width: 70vw;
        /* background-color:white; */
        position: fixed;
        cursor: pointer;
        font-size:30px;
        color:white;
        font-family: 'Courier New', monospace;
    }
    .select-menu
    {
        top:90vh;
        right:300px;
        height:100px;
        width: 300px;
        /* background-color:white; */
        position: fixed;
        cursor: pointer;
        font-size:50px;
        color:white;
        font-family: 'Courier New', monospace;
        align-vertical: center;
    }
    .run-button
    {
        background-color : black;
        border-radius : 6px;
        top:90vh;
        right:200px;
        /* height:100px; */
        width: 70px;
        /* background-color:white; */
        position: fixed;
        cursor: pointer;
        font-size:30px;
        color:white;
        font-family: 'Courier New', monospace;
        /* border: 1px solid white; */

    }
    #market_selector{
        font-family: 'Courier New', monospace;
        font-size:26px;
        background-color: black;
        color: white;

    }

    #progress-bar-window{
        width: 50vw;
        height: 5px;
        background-color:white;
        position: fixed;
        left:25vw;
        bottom: 20px;
    }

    .label-button{
        position: absolute;
        bottom:5px;
        right:20px;
        z-index: 2000;
        width:300px;
        height: 100px;
        background: white;
        padding:5px;
        border-radius: 5px;
    }

    </style>
    
</head>
<body>
    <script type="text/javascript" src="js/heatmap/build/heatmap.js"></script>
    <script src="../brahma/vendor/jquery/jquery.min.js"></script>

    <div class = "label-button" id="custom-label-upload" style="display:none">
   
        <div class="row">
                 <div class="container">
                     <div class="mb-12" >
                        <label for="formFile" class="form-label"></label>
                        <input class="form-control" type="file" id="upload_file" name="upload_file">
                    </div>
                </div>
        </div>
        <div class="row">
            <div class="container">
                <div class="mb-12">
                    <button type="submit" id="label-upload" class="btn btn-primary mb-3">Integrate Labels</button>
                </div>
            </div>
        </div>
    

    </div>

    <!-- 
    <div class="col-auto">
    <button type="submit" id="label-upload" class="btn btn-primary mb-3">Integrate Labels</button>
     -->
   
    <div id='heatmap-container' style='position: relative; top: 5vh; height: 90vh; widht: 100vw'>
        <canvas id="heatMap" style="position:absolute; left: 0; top: 0"></canvas>
    </div>
    <div id="spec_img">

    </div> 


    <div id="player"></div>
    <div class="play-button" id="play"> <i class="fas fa-play "></i></div>
    <div class="time-display" id="time_display"></div>
    <div class="frame-number" id="frame_number_txt"></div>
    <div id = "progress-bar-window">

        <div class="progress">
            <div class="progress-bar" style="width:70%"></div>
        </div> 

    </div>
    <div class="select-menu" id="select_menu">
    

  <select class="center" id="market_selector">
    <option value="none">-select target-</option>
    <option value="harbour_porpoise">harbour porpoise</option>
  
  </select>


    </div>
    <div class="run-button" id="run_button">

        <div id="run-div" class="center" onclick="run_bots_event()"><i class="fas fa-play "></i></div>
       
        <!-- <div class="center" id="load_div"></div> -->

    </div>
    <script src="../assets/js/utils.js"></script>
    <script>
        var user = "rdtandon";
        var market = ""
        var snapshot_location = snapshot_location_;
        // alert(snapshot_location); 
        var snapshot_ids = [];
        snapshot_ids.push(snapshot_id);
        console.log(snapshot_ids);
    </script>
    <script>

        var heatmapInstance = null;

    </script>
    <script type="text/javascript" src="js/game_render.js"></script>
    
    <!-- <script src="../assets/js/ui/player.js"></script>
    <script>
        BuildPlayerLive();
    </script>
    <script src="../assets/js/ui_control/live_player_control.js"></script> -->
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    
</body>
</html>