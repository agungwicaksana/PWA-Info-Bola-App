import {fetchStanding, fetchTeam} from "../data/standings-api.js"
import leagueDOM from "./league-dom.js";
import teamDOM from "./team-dom.js"

export default async function render(page) {
    let data;
    if(page.substr(0,6) === 'league') {
        data = await fetchStanding(page.substr(7))
        leagueDOM(data);
    } else if(page.substr(0,4) === 'team') {
        data = await fetchTeam(page.substr(5,page.length))
        teamDOM(data)
    }
    // console.log('page',page.substr(5,page.length))
}