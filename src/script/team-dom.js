import urlRplc from "./url-https.js";
import { loadPage, loadNav } from "./nav-loader.js";

export default function teamDOM(data) {
    const { id, name, shortName, tla,
            area, crestUrl: logo,
            founded, squad, clubColors,
            lastUpdated, website, venue
        } = data;
    const teamContainer = document.getElementById('team-container');
    let teamHTML = '';
    
    const headContent = `
        <div class="light-blue darken-3 white-text br-right">
            <div class="container">
                <div class="row pb10">
                    <div class="col s8 m6 l4 offset-s2 logo-col">
                        <img class="materialboxed mt40 mb10" width="100%" src="${urlRplc((logo))}" onerror="this.onerror=null;this.src='assets/icon.svg'">
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
                    Didirikan
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
                    Update Terakhir
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
                <td class="center-align">${shirtNumber}</td>
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
                                <th class="center-align">#</th>
                                <th>Nama</th>
                                <th>Pos</th>
                                <th>WN</th>
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
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width > 600) {
        const logoCol = document.querySelector('.logo-col');
        const teamDetail = document.querySelector('.team-detail');
        teamDetail.style.minHeight = `${logoCol.offsetHeight}px`;
    };

    // Change navbar to Empty
    const navbarTeam = document.querySelectorAll('.topnav, .sidenav-trigger');
    navbarTeam.forEach(nav => {
        nav.remove();
    });

    const navWrapper = document.querySelector('.nav-wrapper');
    let navWrapperInner = '';
    
    // Add saveBtn
    const saveBtn = `<a class="right"><i class="rem-23 pt-4 material-icons btn-save">star_border</i></a>`;
    navWrapperInner += saveBtn;

    // Move brand logo to center
    const brandLogo = `<a href="#league-2001" class="brand-logo center">Soccerrr</a>`;
    navWrapperInner += brandLogo;

    // Add backBtn
    const aTag = `<a><i class="material-icons left rem-23 pt-4 back-btn">close</i></a>`
    navWrapperInner += aTag;

    navWrapper.innerHTML = navWrapperInner;

    // Cek apakah tim sudah disimpan di idb
    const btnSave = document.querySelector('.btn-save');
    getById(parseInt(id)).then(dataIdb => {
        if(dataIdb) {
            btnSave.innerHTML = 'star';
        };
    })

    // Fungsi pada saveBtn
    btnSave.addEventListener('click', e => {
        e.preventDefault();
        if(btnSave.innerHTML === 'star_border') {
            btnSave.innerHTML = 'star';
            M.toast({html: `${shortName} difavoritkan`});
            // simpan data ke indexedDb.
            saveForLater(data);
        } else {
            btnSave.innerHTML = 'star_border';
            M.toast({html: `${shortName} dihapus dari favorit`});
            // hapus data dari indexed db
            deleteSaved(data);
        };
    })

    // Fungsi pada back backBtn
    const btnBack = document.querySelector('.back-btn');
    btnBack.addEventListener('click',e => {
        e.preventDefault();
        history.back()
        let page = '';
        const backPageInt = setInterval(() => {
            let prevUrl = window.location.href;
            prevUrl = prevUrl.split('#')[1];
            if(prevUrl.substr(0,4) !== 'team') {
                clearInterval(backPageInt);
            };
            loadPage(prevUrl);
            page = prevUrl;
            if(prevUrl.substr(0,6) === 'league' || prevUrl.substr(0,5) === 'saved') {
                // Benerin menu, kembali ke semula
                navWrapper.innerHTML = `
                    <a href="#league-2001" class="brand-logo left">Soccerrr</a>
                    <a href="#" data-target="side-nav" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
                    <ul class="topnav right hide-on-med-and-down">
                    </ul>
                `;
                loadNav(prevUrl);
            };
        }, 50);
    })
}