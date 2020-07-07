import render from "./content-handler.js";

export function loadNav(page = '') {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;
            const targets = '.topnav, .sidenav, #footer-nav';
            document.querySelectorAll(targets).forEach(e => {
                e.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll(targets).forEach(e => {
                e.addEventListener("click", event => {
                    event.preventDefault()
                    const sidenav = document.querySelector('.sidenav');
                    M.Sidenav.getInstance(sidenav).close();

                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                    console.log('page',page)
                    window.history.pushState('','',`#${page}`);
                })
            })
        }
    };
    xhttp.open("GET", "src/html/nav.html", true);
    xhttp.send();
};

export function loadPage(pg, fromLeagueDOM = false) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            const content = document.querySelector("#main-content");
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                render(pg)
                if(fromLeagueDOM) {
                    window.history.pushState('','',`#${pg}`);
                };
            } else if (this.status === 403) {
                document.innerHTML = showError('Anda Dilarang Mengakses Halaman Ini');
            } else if (this.status === 404) {
                content.innerHTML = showError('Halaman Tidak Ditemukan');
            } else {
                content.innerHTML = showError('Halaman Tidak Dapat Diakses');
            }
        }
    };
    let pageHtml;
    if(pg.slice(0,6) === 'league') { 
        pageHtml = 'league';
    } else if(pg.slice(0,4) === 'team') {
        pageHtml = 'team';
    } else if (pg.slice(0,5) === 'saved') {
        pageHtml = 'saved';
    };
    xhttp.open("GET", "src/html/" + pageHtml + ".html", true);
    xhttp.send();
    
    const showError = (msg) => {
        return (`
            <div class="container">
                <div class="row">
                    <h3 class="text-center full-screen">${msg}</h3>
                </div>
            </div>
        `)
    }
};
