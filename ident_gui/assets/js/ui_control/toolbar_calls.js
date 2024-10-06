


BuildToolbar();

/*
*   Toolbar logic   
*/


function BuildToolbar() {
   
    var html = `
    
    
    
  <div class="icon-bar" id="tool-bar">
  <!-- <a href="#"><h4><span style="color:red">i</span></h4></a> -->
  <div class="list-title" href="#"><i class="fas fa-arrows-alt"></i></div>
  <a  href="#"><i class="fa fa-home"></i></a>
   <a href="#" id="target"><i class="fas fa-bullseye"></i></a>
  <a href="#" id="acoustic-data"><i class="fas fa-headphones-alt"></i></a>
    <a href="#" id="study-label"><i class="fas fa-pen"></i></a>
        <a href="#" id="study-tags"><i class="fas fa-tag"></i></a>
         <a href="#" id="sample-upload"><i class="fas fa-upload"></i></a>
          <a href="#" id="study-connect"><i class="fas fa-network-wired"></i></a>
 
</div>
    
    `;


    var el = document.getElementById("toolbar");
    el.innerHTML = html;

    dragElement(document.getElementById("tool-bar"));

}


el = document.getElementById("acoustic-data");
el.onclick = function () { ToolbarClick('acoustic-data') };


el = document.getElementById("study-label");
el.onclick = function () { ToolbarClick('study-label') };


el = document.getElementById("study-tags");
el.onclick = function(){ToolbarClick('study-tags')};


el = document.getElementById("target");
el.onclick = function(){ToolbarClick('target')};


el = document.getElementById("sample-upload");
el.onclick = function(){ToolbarClick('sample-upload')};


window_tracker = {}

function ToolbarClick(data_type) {
   
   
    // create window
    if (data_type == "acoustic-data") {


        if ("acoustic-data" in window_tracker)
        {
            
            var window_id = window_tracker['acoustic-data'];
            console.log('acoustic already built' + window_id);
            showWindow(window_id);
            BuildAppDataAcoustic(`${window_id}_content`);
        }
        else
        {
            var window_id = createWindow("Acoustic Data", "acoustic-data");
            var el = document.getElementById(window_id);
            el.style.width = '60vw';
            var content_id = `${window_id}_content`;
            BuildAppDataAcoustic(content_id);
             
        }
        
    
    
    }
   
    if (data_type == "study-label") {
        var window_id = createWindow("Study Label", "study-label");
        var el = document.getElementById(window_id);
        el.style.width = '40vw';
         el.style.height = '7vw';
        var content_id = `${window_id}_content`;
        BuildStudyLabel(content_id);
    }
    if (data_type == "study-tags") {
        var window_id = createWindow("View labels in study", "study-tags");
        var el = document.getElementById(window_id);
        el.style.width = '40vw';
        el.style.height = '30vw';
        el.style.bottom = '0px';
        el.style.left = '300px';
        var content_id = `${window_id}_content`;
        ShowStudyLabels(content_id);
        //BuildAppDataAcoustic(content_id);
    }
    if (data_type == "target") {
        var window_id = createWindow("IDent Target", "target");
        var el = document.getElementById(window_id);
        el.style.width = '25vw';
        el.style.height = '15vw';
        el.style.bottom = '0px';
        el.style.left = '300px';
        var content_id = `${window_id}_content`;
        //ShowStudyLabels(content_id);
        //BuildAppDataAcoustic(content_id);
        ShowTarget(content_id);
    }
    if (data_type == "sample-upload") {
        var window_id = createWindow("IDent Upload", "sample-upload");
        var el = document.getElementById(window_id);
        el.style.width = '25vw';
        el.style.height = '15vw';
        el.style.bottom = '0px';
        el.style.left = '300px';
      
        var content_id = `${window_id}_content`;
        ShowUpload(content_id);
        
    }
}



