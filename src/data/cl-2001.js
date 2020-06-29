// fetch("https://api.football-data.org/v2/competitions/2001/standings", {
//     headers : {
//         "X-Auth-Token": "02c651fbb55e47e18b7702cacefba634"
//     }
// })
//     .then(response => response.json())
//     .then(resJson => {
//         return resJson
//     })
//     .catch(error => {
//         return error
//     })
import {fetchStanding} from "./standings-api.js";
async function data () {  
    const data = await fetchStanding(2002);
    console.log(data);
}

data()