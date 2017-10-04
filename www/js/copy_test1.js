// This is a JavaScript file

    // Page init event
    document.addEventListener('init', function(event) {
      var page = event.target;

      if (page.matches('#first-page')) {

        page.querySelector('#push-button').onclick = function() {
          document.querySelector('#navigator').pushPage('page2.html');
        };

      } else if (page.matches('#second-page')) {

        page.querySelector('#pop-button').onclick = function() {
          document.querySelector('#navigator').popPage();
        };

      }
    });
