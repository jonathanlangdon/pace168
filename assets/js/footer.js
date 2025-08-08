// /assets/js/footer.js
(function () {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <a href="https://www.hulingsandassociates.com/" class="footer-link">
        <img
          src="/assets/images/hulingsandassociates-logo.jpg"
          alt="Hulings & Associates"
          class="footer-logo"
        />
      </a>

      <div id="copyright"></div>

      <a href="https://davidhulingswrites.com/" class="footer-link">
        <img
          src="/assets/images/hulingswrites-logo.webp"
          alt="David Hulings Writes"
          class="footer-logo"
        />
      </a>
    </div>
  `;

  // Append to the end of <body> (or replace an existing <footer> if you have one)
  document.body.appendChild(footer);

  // Copyright text
  const currentYear = new Date().getFullYear();
  const c = footer.querySelector('#copyright');
  if (c) c.textContent = `©${currentYear} Pace168.com`;
})();
