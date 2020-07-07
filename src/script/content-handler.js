import {fetchStanding, fetchTeam} from "../data/standings-api.js";
import savedTeams from "./saved-dom.js";

export default async function render(page) {
    let data;
    if(page.substr(0,6) === 'league') {
        data = await fetchStanding(page.substr(7));
    } else if(page.substr(0,4) === 'team') {
        data = await fetchTeam(page.substr(5,page.length));
    } else if(page.substr(0,5) === 'saved') {
        savedTeams()
    }
}