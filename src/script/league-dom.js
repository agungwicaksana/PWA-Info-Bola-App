export default function leagueDOM({competition: cp, season: se, standings: st}){
    const time = cp.lastUpdated;

    const container = document.getElementById(`${cp.id}-container`);
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
                        <p class="info"><b>Updated:</b> ${time.substring(0,10)} at ${time.substring(11,16)} GMT</p>
                        <p class="info"><b>Event Ends:</b> ${se.endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    html += headContent;


    container.innerHTML = html
    console.log('cp', cp);
    console.log('se', se);
    console.log('st', st);
    
}