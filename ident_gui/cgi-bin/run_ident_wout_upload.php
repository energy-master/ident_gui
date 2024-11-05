<?php


$base_id = $_POST['base_id'];


$target_dir = "/home/vixen/rs/dev/marlin_hp/marlin_hp/ext_data/";

$web_target_dir = "/home/vixen/html/rs/ident_app/ident/brahma/out/";
$ident_id = $_POST['base_id'];
$ident_id = $_POST['ident_id'];
$user_uid = $_POST['user_uid'];
$activation_energy = $_POST['activation-level'];
$activation_energy_80 = $_POST['80-activation-level'];

$target_file = $target_dir . basename($_FILES["upload_file"]["name"]);


$search_id = "harbour_porpoise";

$path_to_exe = "/home/vixen/rs/dev/marlin_hp/marlin_hp/prepare_ext.py " . $ident_id . " " . $search_id . " upload " . $user_uid . " " . $activation_energy. " " . $activation_energy_80 ."  &";
$cmd = " nohup python3 ";

$cmd = $cmd . " " . $path_to_exe;

$result = "none";
$result = exec($cmd);





?>