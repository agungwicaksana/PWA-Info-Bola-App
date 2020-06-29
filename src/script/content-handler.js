import {fetchStanding} from "../data/standings-api.js"
import leagueDOM from "./league-dom.js";

export default async function render(page) {
    if(page === '2001' || page === '2002' || page === '2003' || page === '2021' || page === '2014') {
        const data = await fetchStanding(`${page}`)
        leagueDOM(data);
    }
    // switch (page) {
    //     case '2001':
            
    //         break;
    
    //     default:
    //         break;
    // }
    

    // console.log('page',page)
    // const container = document.getElementById('2001-container');
    // container.innerHTML = data
    // console.log(container);
    
}