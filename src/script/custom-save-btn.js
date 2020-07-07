export default function customSaveButton() {
    const topNav = document.querySelector('.topnav');
    topNav.lastElementChild.innerHTML = `<i href="#saved" class="material-icons saved-teams waves-effect">save</i>`
}