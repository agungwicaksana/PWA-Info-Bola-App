import {fetchStanding} from "../data/standings-api.js"
import leagueDOM from "./league-dom.js";

export default async function render(page) {
    switch (page) {
        case '2001':
            const data = await fetchStanding(`${page}`)
            leagueDOM(data);
            break;
    
        default:
            break;
    }
    

    // console.log('page',page)
    // const container = document.getElementById('2001-container');
    // container.innerHTML = data
    // console.log(container);
    
}