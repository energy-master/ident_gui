<?php





if ( !empty($_SERVER['CONTENT_LENGTH']) && empty($_FILES) && empty($_POST) )
echo 'The uploaded zip was too large. You must upload a file smaller than ' . ini_get("upload_max_filesize");



echo $message;
switch( $_FILES['upload_file']['error'] ) {
    case UPLOAD_ERR_OK:
        $message = false;;
        break;
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:
        $message .= ' - file too large (limit of '.get_max_upload().' bytes).';
        break;
    case UPLOAD_ERR_PARTIAL:
        $message .= ' - file upload was not completed.';
        break;
    case UPLOAD_ERR_NO_FILE:
        $message .= ' - zero-length file uploaded.';
        break;
    default:
        $message .= ' - internal error #'.$_FILES['newfile']['error'];
        break;
}
if( !$message ) {
    if( !is_uploaded_file($_FILES['upload_file']['tmp_name']) ) {
        $message = 'Error uploading file - unknown error.';
    } else {
        // Let's see if we can move the file...
        $dest .= '/'.$this_file;
        if( !move_uploaded_file($_FILES['upload_file']['tmp_name'], $dest) ) { // No error supporession so we can see the underlying error.
            $message = 'Error uploading file - could not save upload (this will probably be a permissions problem in '.$dest.')';
        } else {
            $message = 'File uploaded okay.';
        }
    }
}

$target_dir = "/home/vixen/rs/dev/marlin_hp/marlin_hp/ext_data/";

$web_target_dir = "/home/vixen/html/rs/ident_app/ident/brahma/out/";
var_dump($_FILES);
$target_file = $target_dir . basename($_FILES["upload_file"]["name"]);

// $target_file = $target_dir . "tesdt";


echo "----";
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

$ident_id = $_POST['ident_id'];
echo $ident_id;

// if ($_FILES["upload_file"]["name"] == "Test_File_1_Sonar.wav"){
//   $ident_id = 213;
// }

$target_file = $target_dir . $ident_id . "." . $imageFileType;

if (isset($_POST['data'])){
  if ($_POST['data'] == "label")
  {
    $target_file = $web_target_dir . $ident_id . "." . $imageFileType;
  }
}

echo $target_file;
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["upload_file"]["tmp_name"]);
  if($check !== false) {
    //echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    //echo "File is not an image.";
    $uploadOk = 0;
  }
}
var_dump($_FILES);
// // Check if file already exists
// if (file_exists($target_file)) {
//   //echo "Sorry, file already exists.";
//   $uploadOk = 0;
// }


// Check file size
// if ($_FILES["fileToUpload"]["size"] > 500000) {
//   echo "Sorry, your file is too large.";
//   $uploadOk = 0;
// }

// Allow certain file formats
// if($imageFileType != "wav" && $imageFileType != "png" && $imageFileType != "txt" && $imageFileType != "jpeg"
// && $imageFileType != "gif" ) {
//   echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed. ". $imageFileType;
//   $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  //echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["upload_file"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}




?>
