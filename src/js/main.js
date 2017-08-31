if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

var page1 = document.querySelector('#page1').getBoundingClientRect().top