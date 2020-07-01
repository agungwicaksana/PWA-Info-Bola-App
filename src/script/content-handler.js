import {fetchStanding} from "../data/standings-api.js"
import leagueDOM from "./league-dom.js";

export default async function render(page) {
    if(page.substr(0,6) === 'league') {
        const data = await fetchStanding(page.substr(7))
        leagueDOM(data);
    };
}