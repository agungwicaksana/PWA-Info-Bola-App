import urlRplc from "./url-https.js";

export default function teamDOM(data) {
    const {id, name, shortName, area, crestUrl: logo, founded, squad, clubColor, lastUpdated, website} = data;
    console.log('data',data)
    const teamContainer = document.getElementById('team-container');
    let teamHTML = '';
    
    const headContent = `
        <div class="light-blue darken-3">
            <div class="container pb10">
                <div class="row">
                    <div class="col s8 m6 l4 offset-s2 logo-col">
                        <img class="materialboxed mt40 mb10" width="100%" src="${urlRplc((logo))}">
                    </div>
                    <div class="col s12 m6 l8">
                        <div class="team-detail box-container align-items-end">
                            <h1>hlao</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    teamHTML += headContent;


    teamContainer.innerHTML = teamHTML;
    // Init Materialboxed
    const MBoxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(MBoxed);
    // adjust DOM
    const logoCol = document.querySelector('.logo-col');
    const teamDetail = document.querySelector('.team-detail');
    teamDetail.style.minHeight = `${logoCol.offsetHeight}px`;
}