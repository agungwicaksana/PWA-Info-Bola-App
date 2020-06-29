document.addEventListener("DOMContentLoaded", function() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    // Fetch nav.html to DOM
    const loadNav = (() => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200) return;
                
                document.querySelectorAll(".topnav, .sidenav, #footer-nav").forEach(e => {
                    e.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll('.sidenav a, .topnav a, #footer-nav a').forEach(e => {
                    e.addEventListener("click", event => {
                        event.preventDefault()
                        const sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                        (page === 'home') ? page='/': page=page;
                        window.history.pushState('','',page);
                    })
                })
            }
        };
        xhttp.open("GET", "src/html/nav.html", true);
        xhttp.send();
    })();
    

    // Handle nav-item on click
    let page = window.location.hash.substr(1);
    
    if (page === "") page = "home";
    loadPage(page);
    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#main-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 403) {
                    document.innerHTML = showError('Anda Dilarang Mengakses Halaman Ini');
                } else if (this.status === 404) {
                    content.innerHTML = showError('Halaman Tidak Ditemukan');
                } else {
                    content.innerHTML = showError('Halaman Tidak Dapat Diakses');
                }
            }
        };
        xhttp.open("GET", "src/html/" + page + ".html", true);
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