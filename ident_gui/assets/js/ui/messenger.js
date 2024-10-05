


function build_messenger(){
    
    var el = document.getElementById("messenger");
    
    
    var dt = Date.now();
    
    

    var html = `
    
        <table>
            <tr>
            <td>${dt}</td>
            <td> : </td>
            <td>MARLIN Ident messaging service.</td>
            </tr>
             <tr>
            <td>${dt}</td>
            <td> : </td>
            <td>No data loaded and no live streams.</td>
            </tr>
             <tr>
            <td>${dt}</td>
            <td> : </td>
            <td>Load data or connect to a live stream.</td>
            </tr>
        </table>
    
    `;



    
    el.innerHTML = html;

}


build_messenger();