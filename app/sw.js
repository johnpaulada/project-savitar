importScripts('workbox-sw.prod.v2.0.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/critical.min.css",
    "revision": "04b24a11ec5bf83f0bcf1f02762f2d1a"
  },
  {
    "url": "build/main.min.css",
    "revision": "a5640dff16f428d074127d632a06fe5a"
  },
  {
    "url": "build/main.min.js",
    "revision": "23b05039ad85aa62d0b76f153e380b19"
  },
  {
    "url": "index.html",
    "revision": "0f7a1a5a2f2528e7dc5c4e71093b2d44"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
