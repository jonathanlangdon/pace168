// Asynchronously fetch the PDF
const loadingTask = pdfjsLib.getDocument(PDFurl);

loadingTask.promise.then(
  function (pdf) {
    // Fetch the first page
    pdf.getPage(1).then(function (page) {
      const scale = 1.5;
      const viewport = page.getViewport({ scale: scale });

      // Prepare the canvas using the PDF page's dimensions
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Add canvas to the PDF viewer div
      document.getElementById('pdfViewer').appendChild(canvas);

      // Render the PDF page into the canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  },
  function (reason) {
    // PDF loading error
    console.error(reason);
  }
);
