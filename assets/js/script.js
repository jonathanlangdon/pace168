// document.addEventListener('DOMContentLoaded', function () {
//   fetch('header.html')
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById('header-placeholder').innerHTML = data;
//       // Add event listener after content is loaded
//       const menuTrigger = document.querySelector('.menu-trigger');
//       const nav = document.querySelector('.main-nav .nav');

//       if (menuTrigger && nav) {
//         menuTrigger.addEventListener('click', function () {
//           nav.classList.toggle('active');
//         });
//       }
//     });
// });

function appendFooter() {
  const currentYear = new Date().getFullYear();

  const copyrightText = document.createElement('p');
  copyrightText.innerText = `©${currentYear} Pace168.com`;
  document.getElementById('copyright').appendChild(copyrightText);
}

appendFooter();
