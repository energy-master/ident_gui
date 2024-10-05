<?php
$identifier = $_GET['identifier'];
$title = "no title";
if (isset($_GET['title'])){
$title = $_GET['title'];
$custom = $_GET['custom'];
}

echo "<script>var identifier = '$identifier';</script>";

echo "<script>var title = '$title';</script>";

?>

<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title><?php echo $title;?></title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="">


<body>
<?php if ($custom == 0){ ?>
<div id="image"><img src="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/spec/<?php echo $identifier?>.png" alt="Spectrogram Loading" style="width:100%"></div>

<?php  }?>

<?php if ($custom == 1){ ?>
<div id="image"><img src="https://marlin-network.hopto.org/html_data/html_data/<?php echo $identifier?>.png" alt="Spectrogram Loading" style="width:100%"></div>

<?php  }?>

<?php if ($custom == 2){ ?>
<div id="image"><img src="<?php echo $identifier?>" alt="Spectrogram Loading" style="width:100%"></div>

<?php  }?>

<script>

// var file_url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/out/spec/${identifier}.png`;
// console.log(file_url);
// var el = document.getElementById("image");
// console.log(el);
// var html =  `<img src="${file_url}" alt="Spectrogram Loading" style="width:100%">`;
// console.log(html);
// el.innerHMTL = html;
// console.log(el);
</script>

</body>

</html> 


