<?php


$base_id = $_POST['base_id'];


$target_dir = "/home/vixen/rs/dev/marlin_hp/marlin_hp/ext_data/";

$web_target_dir = "/home/vixen/html/rs/ident_app/ident/brahma/out/";
$base_id = $_POST['base_id'];
$ident_id = $_POST['ident_id'];
$user_uid = $_POST['user_uid'];
$number_features = $_POST['number_features'];
$activation_energy = $_POST['activation-level'];
$activation_energy_80 = $_POST['80-activation-level'];
$structure_similarity = $_POST['structure_similarity'];
$target_file = $target_dir . basename($_FILES["upload_file"]["name"]);
$feature_version_selector = $_POST['feature_version_selector'];
$version_time_from = $_POST['version_time_from'];
$version_time_to = $_POST['version_time_to'];
$batch_params = $_POST['batch_params'];



$search_id = "harbour_porpoise";
$search_id = $_POST['environment_selector'];
$path_to_exe = '/home/vixen/rs/dev/marlin_hp/marlin_hp/prepare_ext.py ' . $ident_id . " " . $search_id . " upload " . $user_uid . " " . $activation_energy. " " . $activation_energy_80 . " " . $number_features  . " " . $structure_similarity . " " . $feature_version_selector . " " . $version_time_from . " " . $version_time_to . " " . $batch_params . "  &";
$cmd = " nohup python3 ";

$cmd = $cmd . " " . $path_to_exe;
// echo $cmd;
$result = "none";
$result = exec($cmd);





?>