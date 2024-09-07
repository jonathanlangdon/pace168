document.addEventListener('DOMContentLoaded', function () {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    });
});

function appendFooter() {
  const currentYear = new Date().getFullYear();

  const copyrightText = document.createElement('p');
  copyrightText.innerText = `©${currentYear} Pace168.com`;
  document.getElementById('copyright').appendChild(copyrightText);
}

appendFooter();
