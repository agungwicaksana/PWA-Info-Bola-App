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
    return fetch(`${baseUrl}/v2/competitions/${league_id}/standings`, {
            headers : {
                "X-Auth-Token": token
            }
        })
        .then(response => response.json())
        .then(resJson => resJson)
        .finally(() => {
            hidePreloader();
        })
        .catch(error => {
            errorMessage(error);
            M.toast({html: error});
            return error
        })
};
export function fetchTeam(team_id) {
    showPreloader();
    return fetch(`${baseUrl}/v2/teams/${team_id}`, {
            headers : {
                "X-Auth-Token": token
            }
        })
        .then(response => response.json())
        .then(resJson => resJson)
        .finally(() => {
            hidePreloader();
        })
        .catch(error => {
            errorMessage(error)
            M.toast({html: error})
            return error
        })
};