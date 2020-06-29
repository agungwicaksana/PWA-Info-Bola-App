export default function leagueDOM({competition: cp, season: se, standings: st}){
    const time = cp.lastUpdated;

    const container = document.getElementById(`${cp.id}-container`);
    let html = '';
    const headContent = `
        <div class="light-blue darken-3">
            <div class="container pb10">
                <div class="row white-text right-align s-center-align">
                    <div class="col s12">
                        <h1>${cp.name}</h1>
                    </div>
                </div>
                <div class="row white-text">
                    <div class="col s2 right-align right">
                        <p>${cp.area.name}</p>
                    </div>
                    <div class="col s10 left-align left">
                        <p class="info">Updated: ${time.substring(0,10)} at ${time.substring(11,16)} GMT</p>
                        <p class="info">Event Ends: ${se.endDate}</p>
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