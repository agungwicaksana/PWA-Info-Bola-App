import {fetchStanding, fetchTeam} from "../data/standings-api.js";
import savedTeams from "./saved-dom.js";

export default function render(page) {
    if(page.substr(0,6) === 'league') {
        fetchStanding(page.substr(7));
    } else if(page.substr(0,4) === 'team') {
        fetchTeam(page.substr(5,page.length));
    } else if(page.substr(0,5) === 'saved') {
        savedTeams()
    }
}