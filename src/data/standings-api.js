import leagueDOM from "../script/league-dom.js";
import teamDOM from "../script/team-dom.js";

const baseUrl = "https://api.football-data.org"
const token = "02c651fbb55e47e18b7702cacefba634";

const loading = document.getElementById('loading-container');
const loadingContainer = content => {
    loading.innerHTML = `
        <div class="row preloader-container">
            <div class="col s12 m10 l8 offset-m1 offset-l2 center-align">
                ${content}
            </div>
        </div>
    `;
}
const showPreloader = () => {
    loading.style.display = 'block';
    loadingContainer(`
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    `);
};
const hidePreloader = () => {
    loading.style.display = 'none';
    loading.innerHTML ='';
}
const errorMessage = message => {
    loading.style.display = 'block';
    loadingContainer(`
        <h2>${message}</h1>
        <p class="coba-lagi">Coba Lagi</p>
        `
    );
    const cobaLagi = document.querySelector('.coba-lagi');
    cobaLagi.addEventListener('click', () => {
        location.reload();
    })
};

export function fetchStanding(league_id) {
    showPreloader();
    new Promise(resolve => {
        if ('caches' in window) {
            caches.match(`${baseUrl}/v2/competitions/${league_id}/standings`, {
                headers:{
                    'X-Auth-Token' : token
                }
            })
            .then(response => {
                if(response) {
                    response.json().then(resJson => {
                        hidePreloader();
                        leagueDOM(resJson);
                        return resolve(resJson);
                    })
                    .finally(() => {
                        hidePreloader();
                    })
                }
            })
            .catch(error => {
                M.toast({html: error})
            })
        }
        
        fetch(`${baseUrl}/v2/competitions/${league_id}/standings`, {
                headers : {
                    "X-Auth-Token": token
                }
            })
            .then(response => response.json())
            .then(resJson => {
                leagueDOM(resJson);
                return resolve(resJson);
            })
            .finally(() => {
                hidePreloader();
            })
            .catch(error => {
                M.toast({html: error})
            })
    })
};
export function fetchTeam(team_id) {
    showPreloader();
    new Promise(resolve => {
        if(location.hash === '#saved') {
            getById(parseInt(team_id)).then(data => {
                hidePreloader();
                teamDOM(data);
                return resolve(data);
            })
        }
        if ('caches' in window) {
            caches.match(`${baseUrl}/v2/teams/${team_id}`, {
                headers:{
                    'X-Auth-Token' : token
                }
            })
            .then(response => {
                if(response) {
                    response.json().then(resJson => {
                        hidePreloader();
                        teamDOM(resJson);
                        return resolve(resJson);
                    })
                    .finally(() => {
                        hidePreloader();
                    })
                }
            })
            .catch(error => {
                M.toast({html: error})
            })
        }

        fetch(`${baseUrl}/v2/teams/${team_id}`, {
                headers : {
                    "X-Auth-Token": token
                }
            })
            .then(response => response.json())
            .then(resJson => {
                teamDOM(resJson);
                return resolve(resJson);
            })
            .finally(() => {
                hidePreloader();
            })
            .catch(error => {
                M.toast({html: error})
            })
    })
};