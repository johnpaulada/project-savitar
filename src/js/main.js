if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

const animator = new Worker('build/worker.min.js');

function animate(startTime) {
  animator.postMessage(startTime)
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)