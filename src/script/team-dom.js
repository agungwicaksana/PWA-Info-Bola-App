import urlRplc from "./url-https.js";

export default function teamDOM(data) {
    const { id, name, shortName, tla,
            area, crestUrl: logo,
            founded, squad, clubColors,
            lastUpdated, website, venue
        } = data;
    const teamContainer = document.getElementById('team-container');
    let teamHTML = '';
    
    const headContent = `
        <div class="light-blue darken-3 white-text">
            <div class="container">
                <div class="row pb10">
                    <div class="col s8 m6 l4 offset-s2 logo-col">
                        <img class="materialboxed mt40 mb10" width="100%" src="${urlRplc((logo))}">
                    </div>
                    <div class="col s12 m6 l8 mt20">
                        <div class="team-detail right-align s-center-align">
                            <div class="row">
                                <div class="col s12">
                                    <h1>${name}</h1>
                                </div>
                                <div class="col s12">
                                    <div class="box-container flex-end s-flex-center pb10">
                                        <div class="white-box">
                                            <p>${area.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col s12">
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    teamHTML += headContent;

    const detailContent = `
        <div class="container pt10">
            <div class="row">
                <div class="col s12 m10 l8 offset-m1 offset-l2">
                    <h2 class="my0">${shortName}/<b>${tla}</b></h2>
                </div>
            </div>
            <div class="row my0">
                <div class="col s4 m10 l4 offset-m1 offset-l2">
                    Founded
                </div>
                <div class="col s8 m6 l4 right-align">
                    ${founded}
                </div>
            </div>
            <div class="row my0">
                <div class="col s4 m10 l4 offset-m1 offset-l2">
                    <i class="material-icons">public</i>
                </div>
                <div class="col s8 m6 l4 right-align">
                    <a href="${urlRplc(website)}" target="_blank">${urlRplc(website)}</a>
                </div>
            </div>
            <div class="row my0">
                <div class="col s4 m10 l4 offset-m1 offset-l2">
                    <i class="material-icons">color_lens</i>
                </div>
                <div class="col s8 m6 l4 right-align">
                    ${clubColors}
                </div>
            </div>
            <div class="row my0">
                <div class="col s4 m10 l4 offset-m1 offset-l2">
                    <i class="material-icons">event_seat</i>
                </div>
                <div class="col s8 m6 l4 right-align">
                    ${venue}
                </div>
            </div>
            <div class="row my0">
                <div class="col s4 m10 l4 offset-m1 offset-l2">
                    Last Udpate
                </div>
                <div class="col s8 m6 l4 right-align">
                    ${lastUpdated.substring(0,10)} at ${lastUpdated.substring(11,16)} UTC
                </div>
            </div>
        </div>
    `;
    teamHTML += detailContent;
    
    let trSquad = '';
    squad.forEach(p => {
        let shirtNumber = p.shirtNumber;
        if(p.shirtNumber === null) {
            shirtNumber = '-';
        };
        trSquad += `
            <tr>
                <td>${shirtNumber}</td>
                <td>${p.name}</td>
                <td>${p.position}</td>
                <td>${p.nationality}</td>
            </tr>
        `;
    });

    const squadContent = `
        <div class="container pt20">
            <div class="row">
                <div class="col s12 m10 l8 offset-m1 offset-l2">
                    <h1 class="my0">Squad</h1>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m10 l8 offset-m1 offset-l2">
                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Pos</th>
                                <th>Nat</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${trSquad}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    teamHTML += squadContent;



    teamContainer.innerHTML = teamHTML;
    // Init Materialboxed
    const MBoxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(MBoxed);
    // adjust DOM
    const logoCol = document.querySelector('.logo-col');
    const teamDetail = document.querySelector('.team-detail');
    teamDetail.style.minHeight = `${logoCol.offsetHeight}px`;
}