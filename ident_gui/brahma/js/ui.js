

function build_games_table(data) {
    var html = "";

    html += `
    <table class="table table-hover">
  <thead>
    <tr>
        <th scope="col">Game ID</th>
        <th scope="col">User</th>
        <th scope="col">Environment</th>
        <th scope="col">State</th>
        <th scope="col">Number Generations</th>

    </tr>
  </thead>
  <tbody>
   `;

    for (var i = 0; i < data.length; i++){
        html += `
        
        <tr style = "cursor:pointer">
            <td>${data[i].optimisation_id}</th>
            <td>${data[i].user}</td>
            <td>${data[i].market}</td>
            <td>${data[i].status}</td>
            <td>${data[i].number_generations}</td>
        
        </tr>
        
        `
    }


   html += `
  </tbody>
    </table>
    `;
    var el = document.getElementById('game-list');
    el.innerHTML = html;

    var number_games = data.length;
    el = document.getElementById('number-games-tag');
    el.innerHTML = number_games;
    //id = "number-ident-bots-tag" 

}

function build_bots_table(){

}

function build_all_bots_table(data) {
     var html = "";

    html += `
        <table class="table table-hover">
            <thead>
                <tr >
                    <th scope="col">Bot ID</th>
                    <th scope="col">Parent</th>
                    <th scope="col">User</th>
                    <th scope="col">Environment</th>
                    <th scope="col">DOB</th>
                    <th></th>
                </tr>
            </thead>
        <tbody>
   `;

    for (var i = 0; i < data.length; i++){
        html += `
        
        <tr style = "cursor:pointer">
            <td>${data[i].botID}</th>
            <td>${data[i].parent}</td>
            <td>${data[i].owner}</td>
            <td>${data[i].market}</td>
            <td>${data[i].time_added}</td>
            <td><a href = "bot_structure.php?bot_id=${data[i].botID}" target="_blank">view</a></td>
        
        </tr>
        
        `
    }


   html += `
  </tbody>
    </table>
    `;


    var el = document.getElementById('all-bots-list');
    el.innerHTML = html;

    var number_bots = data.length;
    el = document.getElementById('number-ident-bots-tag');
    el.innerHTML = number_bots;
    //id = "number-ident-bots-tag" 
}

