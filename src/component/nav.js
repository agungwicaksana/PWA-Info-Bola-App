import { loadNav, loadPage } from "../script/nav-loader.js";

document.addEventListener("DOMContentLoaded", function() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    let page = window.location.hash.substr(1);
    if (page === "") {
        window.location.href = `${window.location.origin}/#league-2001`;
        window.location.reload();
    };
    
    loadNav(page);
    loadPage(page);
});