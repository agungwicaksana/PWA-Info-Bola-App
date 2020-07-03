const baseUrl = "https://api.football-data.org"
const token = "02c651fbb55e47e18b7702cacefba634";

export function fetchStanding(league_id) {
    return fetch(`${baseUrl}/v2/competitions/${league_id}/standings`, {
            headers : {
                "X-Auth-Token": token
            }
        })
        .then(response => response.json())
        .then(resJson => {
            return resJson
        })
        .catch(error => {
            M.toast({html: error})
            return error
        })
};
export function fetchTeam(team_id) {
    return fetch(`${baseUrl}/v2/teams/${team_id}`, {
            headers : {
                "X-Auth-Token": token
            }
        })
        .then(response => response.json())
        .then(resJson => {
            return resJson
        })
        .catch(error => {
            M.toast({html: error})
            return error
        })
};