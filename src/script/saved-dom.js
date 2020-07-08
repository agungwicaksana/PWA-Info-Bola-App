import urlRplc from "./url-https.js";
import { loadPage } from "./nav-loader.js";

export default function savedTeams() {  
    // console.log('saveddom js')
    getAll().then(teams => {
        // console.log('teams',teams)
        const container = document.getElementById(`saved-container`);
        let htmlSaved = '';
        const headContent = `
            <div class="light-blue darken-3">
                <div class="container pb10">
                    <div class="row white-text right-align s-center-align">
                        <div class="col s12">
                            <h1 class="mb10">Tim Favorit</h1>
                        </div>
                        <div class="col s12">
                            <p class="info">Anda memiliki ${teams.length} tim favorit.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        htmlSaved += headContent;

        const savedTeamsContainer = `
            <div class="container">
                <div class="row" id="saved-teams-container">
                </div>
            </div>
        `;
        htmlSaved += savedTeamsContainer;

        container.innerHTML = htmlSaved;

        let teamComp = ''; 
        teams.forEach(team => {
            teamComp += `
                <a href="#team/${team.id}" class="team-detail">
                    <div class="col s12 m10 l8 offset-m1 offset-l2">
                        <div class="team-item waves-effect">
                            <img src="${urlRplc(team.crestUrl)}" alt="Logo ${team.name}" onerror="this.onerror=null;this.src='assets/icon.svg'">
                            <div class="team-item-content">
                                <span class="badge black-text">${team.tla}</span>
                                <span>${team.name}</span>
                                <hr/>
                                <div>
                                    <span class="stat teal-text">
                                        ${team.venue} - ${team.area.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `
        });
        document.getElementById('saved-teams-container').innerHTML = teamComp;

        (() => {  
            const teamsDetailBtn = document.querySelectorAll('.team-detail');
            teamsDetailBtn.forEach(btn => {
                btn.addEventListener('click',(e) => {
                    e.preventDefault();
                    const teamId = btn.getAttribute('href').substr(1);
                    loadPage(teamId, true);
                })
            });
        })()
    })
}