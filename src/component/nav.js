import render from "../script/content-handler.js"

document.addEventListener("DOMContentLoaded", function() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    // Fetch nav.html to DOM
    const loadNav = (() => {
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
                        window.history.pushState('','',`#${page}`);
                    })
                })
            }
        };
        xhttp.open("GET", "src/html/nav.html", true);
        xhttp.send();
    })();
    

    // Handle nav-item on click
    let page = window.location.hash.substr(1);
    
    if (page === "") {
        page = "league/2001"
        window.history.pushState('','',`#${page}`);
        const ivalReload = setInterval(() => {
            if(window.location.hash === `#${page}`) {
                location.reload();
                clearInterval(ivalReload);
            }
        }, 50);
    };
    loadPage(page);
    function loadPage(pg) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#main-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    render(page);
                } else if (this.status === 403) {
                    document.innerHTML = showError('Anda Dilarang Mengakses Halaman Ini');
                } else if (this.status === 404) {
                    content.innerHTML = showError('Halaman Tidak Ditemukan');
                } else {
                    content.innerHTML = showError('Halaman Tidak Dapat Diakses');
                }
            }
        };
        if(pg.slice(0,6) === 'league') { 
            pg = 'league';
        } else if(pg.slice(0,4) === 'team') {
            pg = 'team';
        };
        xhttp.open("GET", "src/html/" + pg + ".html", true);
        xhttp.send();
    };

    // Error Message
    const showError = (msg) => {
        return (`
            <div class="container">
                <div class="row">
                    <h3 class="text-center full-screen">${msg}</h3>
                </div>
            </div>
        `)
    }
});