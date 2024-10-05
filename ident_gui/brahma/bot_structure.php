
<style>

body{
    background-color:black
}

</style>

<?php

$bot_id = $_GET['bot_id'];
echo "<script>var bot_id = '$bot_id';</script>";
?>
<div id = "active_frame"></div>

<script>


var html = `<iframe style="width:100%; height:100%"id="structure_visual_frame" src="https://jsoncrack.com/widget?json=https://vixen.hopto.org/rs/api/v1/platform/bot/structure/${bot_id}"/>`
console.log(html);
var el = document.getElementById('active_frame');
el.innerHTML = html;
</script>


