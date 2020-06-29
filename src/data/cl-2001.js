import {fetchStanding} from "./standings-api.js";
async function data () {  
    const data = await fetchStanding(2002);
    console.log(data);
}

data()