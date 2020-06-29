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
            <a href="#" class="group-link waves-effect" data-group="${group.group}">${groupName}</a>
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
    console.log('cp', cp);
    console.log('se', se);
    console.log('st', st);
    
    const groupLinks = document.querySelectorAll('.group-link');
    groupLinks.forEach(link => {
        link.addEventListener('click',e => {
            e.preventDefault();
            groupLinks.forEach(lnk => {
                lnk.classList.remove('active');
            })
            e.target.classList.add('active');
            const groupDataSet = e.target.dataset.group;
            // console.log('e', e.target)
            // console.log('dataset', groupDataSet)
            groupList.forEach(group => {
                if(group.group === groupDataSet) {
                    // console.log('group',)
                    const teamsContainer = document.getElementById('teams-container');
                    let teams = '';
                    group.table.forEach(team => {
                        teams += `
                            <div class="col s12 m10 l8 offset-m1 offset-l2">
                                // Disini akan ditambahkan kartu untuk menampung data team
                            </div>
                        `;
                    });
                    teamsContainer.innerHTML = teams;
                };
            });
        })
    })
}