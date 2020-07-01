import {fetchStanding} from "../data/standings-api.js"
import leagueDOM from "./league-dom.js";

export default async function render(page) {
    console.log('page',page)
    if(page.substr(0,6) === 'league') {
        let data = '';
        switch (page.substr(7)) {
            case '2001':
                data = await fetchStanding('2001')
                break;
            case '2002':
                data = await fetchStanding('2002')
                break;
            case '2003':
                data = await fetchStanding('2003')
                break;
            case '2014':
                data = await fetchStanding('2014')
                break;
            case '2021':
                data = await fetchStanding('2021')
                break;
            default:
                data = await fetchStanding('2001')
                break;
        }
        leagueDOM(data);
    };
}