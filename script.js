const hamburger = document.getElementById('burgerIcon');
const closeBtn = document.getElementById('closebtn');
const linksContainer = document.getElementById('links-container');
const logo = document.getElementById('logo');

hamburger.onclick = function () {
  openNav();
};

closeBtn.onclick = function () {
  closeNav();
};

/* -- Set the width of the side navigation to 250px -- */
function openNav() {
  if (window.innerWidth < 480)
    //document.getElementById('mySidenav').style.width = '100%';
  linksContainer.style.display = 'block';
  hamburger.style.display = 'none';
  logo.style.marginTop = '-16px';
  logo.style.marginLeft = '160px';

}

/* -- Set the width of the side navigation to 0 -- */
function closeNav() {
  if (window.innerWidth < 480) {
    //document.getElementById('mySidenav').style.width = '0';
    linksContainer.style.display = 'none';
    hamburger.style.display = 'block';
    // hamburger.style.marginTop = '40px';
    logo.style.margin = 'auto';
    logo.style.marginTop = '-24px';
    document.getElementById('mySidenav').style.width = '100%';
  }
}

// if (window.innerWidth > 480) {
//   hamburger.style.display = 'none';
// }
