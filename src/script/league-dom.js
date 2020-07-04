import urlRplc from "./url-https.js";
import render from "./content-handler.js";

export default function leagueDOM({competition: cp, season: se, standings: st}){
    const time = cp.lastUpdated;

    const container = document.getElementById(`league-container`);
    let html = '';
    const headContent = `
        <div class="light-blue darken-3">
            <div class="container pb10">
                <div class="row white-text right-align s-center-align">
                    <div class="col s12">
                        <h1 class="mb10">${cp.name}</h1>
                    </div>
                </div>
                <div class="row white-text">
                    <div class="col s12 l2 right-align s-center-align right">
                        <div class="box-container flex-end s-flex-center pb20">
                            <div class="white-box">
                                <p>${cp.area.name}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 l10 left-align left">
                        <p class="info"><b>Updated:</b> ${time.substring(0,10)} at ${time.substring(11,16)} UTC</p>
                        <p class="info"><b>Event Ends:</b> ${se.endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    html += headContent;

    const groupList = [];
    st.forEach(group => {
        if(group.type.toUpperCase() === "TOTAL") {
            groupList.push(group)
        }
    });

    let linkGroup = '';
    groupList.forEach(group => {
        let groupName = group.group;
        if(groupName !== null) {
            groupName = groupName.replace('_', ' ');
        } else if(groupName === null) {
            return;
        };
        linkGroup += `
            <a href="#" id="btn_${group.group}" class="group-link waves-effect" data-group="${group.group}">${groupName}</a>
        `;
    })

    const group = `
        <div class="container">
            <div class="scrollmenu mt10 mb10">
                ${linkGroup}  
            </div>
        </div>
        <div class="container">
            <div class="row" id="teams-container">
            </div>
        </div>
    `;
    html += group;

    container.innerHTML = html
    // console.log('cp', cp);
    // console.log('se', se);
    // console.log('st', st);
    
    const groupLinks = document.querySelectorAll('.group-link');
    groupLinks.forEach(link => {
        link.addEventListener('click',e => {
            e.preventDefault();
            groupLinks.forEach(lnk => {
                lnk.classList.remove('active');
            })
            e.target.classList.add('active');
            const groupDataSet = e.target.dataset.group;
            groupList.forEach(group => {
                if(group.group === groupDataSet) {
                    groupDOM(group);
                };
            });
        })
    })

    function groupDOM(group) {  
        const teamsContainer = document.getElementById('teams-container');
        // console.log('group', group)
        let teams = '';
        group.table.forEach(team => {
            let color = team.position;
            if(color >= 4) {
                color = 4
            };
            teams += `
                <a href="#team/${team.team.id}" class="team-detail">
                    <div class="col s12 m10 l8 offset-m1 offset-l2">
                        <div class="team-item waves-effect">
                            <img src="${urlRplc(team.team.crestUrl)}" alt="Logo ${team.team.name}">
                            <div class="team-item-content">
                                <span class="badge bdg-color-${color}">${team.position}</span>
                                <span>${team.team.name}</span>
                                <hr/>
                                <div>
                                    <span class="stat teal-text">
                                        ${team.playedGames}<span> Games</span>
                                    </span>
                                    <span class="stat teal-text">
                                        ${team.won}<span> Won</span>
                                    </span>
                                    <span class="stat orange-text">
                                        ${team.draw}<span> Draw</span>
                                    </span>
                                    <span class="stat red-text">
                                        ${team.lost}<span> Lost</span>
                                    </span>
                                    <span class="stat badge black-text">
                                        ${team.points}<span>pts</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        });
        teamsContainer.innerHTML = teams;

        if(group.group !== null) {
            if(group.group.toUpperCase() === 'GROUP_A') {
                const btn_A = document.getElementById('btn_GROUP_A');
                btn_A.classList.add('active');
            };
        };
        teamEventListener();
    };

    // onPageLoaded
    groupDOM(groupList[0])

    // Add page redirect on team card
    function loadPage(pg) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#main-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    render(pg);
                    window.history.pushState('','',`#${pg}`);
                } else if (this.status === 403) {
                    document.innerHTML = showError('Anda Dilarang Mengakses Halaman Ini');
                } else if (this.status === 404) {
                    content.innerHTML = showError('Halaman Tidak Ditemukan');
                } else {
                    content.innerHTML = showError('Halaman Tidak Dapat Diakses');
                }
            }
        };
        let page;
        if(pg.slice(0,6) === 'league') { 
            page = 'league';
        } else if(pg.slice(0,4) === 'team') {
            page = 'team';
        };
        xhttp.open("GET", "src/html/" + page + ".html", true);
        xhttp.send();
    };

    function teamEventListener() {  
        const teamsDetailBtn = document.querySelectorAll('.team-detail');
        teamsDetailBtn.forEach(btn => {
            btn.addEventListener('click',(e) => {
                e.preventDefault();
                const teamId = btn.getAttribute('href').substr(1);
                // console.log(teamId)
                loadPage(teamId)
            })
        });
    }
}