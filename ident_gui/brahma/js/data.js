


/*
*   API Calls
*/




const get_games = () => {
    var games_api_url = "https://vixen.hopto.org/rs/api/v1/platform/games";
    return new Promise((resolve, reject) => {
        success = false;
        $.get(games_api_url, function (data) {

            console.log(data);
            build_games_table(data['data']);
            success = true;
            if (success) {
                resolve(success);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}


const get_all_bots = () => {
    var bots_api_url = "https://vixen.hopto.org/rs/api/v1/platform/winners";
    // var bots_api_url = "https://vixen.hopto.org/rs/api/v1/data/features";
    return new Promise((resolve, reject) => {
        success = false;
        console.log('getting bots');
        $.get(bots_api_url, function (data) {

            console.log(data);
            build_all_bots_table(data['data']);
            success = true;
            if (success) {
                resolve(success);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}

const get_game_winners = (game_id) => {

    return new Promise((resolve, reject) => {
        var winners = [];
        $.post(ais_api_url, JSON.stringify(post_data), function (data) {

            

            if (success) {
                resolve(bot);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}

const get_bot = () => {

    return new Promise((resolve, reject) => {
        var bot = null;
        $.post(ais_api_url, JSON.stringify(post_data), function (data) {

            

            if (success) {
                resolve(bot);
            } else {
                reject(Error("Error in Games Download"));
            }

        });


    }); // end of promise dec

}




/*
*
*   Data Structures
*/

var number_of_games = 0;
console.log("Building Data");
grab_toplevel_data();
function grab_toplevel_data(){

    get_games().then((value) => {
        console.log(value); 
    });

    get_all_bots().then((value) => {
        console.log(value); 
    });



}

