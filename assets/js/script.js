(function () {
  function appendFooter() {
    var currentYear = new Date().getFullYear();
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('©' + currentYear + ' Pace168.com'));
    var target = document.getElementById('copyright');
    if (target) {
      target.appendChild(p);
    }
  }

  // Run safely even if script is in <head>
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendFooter);
  } else {
    appendFooter();
  }
})();
