# Project Savitar
A static site starter kit optimized for performance.

[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## How to use

### First time build
1. Install [Yarn](https://yarnpkg.com/).
2. Run `yarn`.
2. Run `npm run build`.

### Watch for changes
Running `gulp watch` will watch and wait for changes to happen to the project and then automatically recompile any files that have changed.

### Deploying
When deploying with this project, just deploy the generated `app` directory.

#### Deploying with Surge
1. Install [Surge](http://surge.sh/).
2. Run `surge`.
3. Specify the path to the `app` directory.
4. Set the name of the surge subdomain you'll be deploying to.

## Features
1. HTML Minification
2. CSS Minification
3. JS Uglification
4. ESNext Support (Babel)
5. JPEG and PNG compression and SVG Optimization
6. Progressive Web App
7. PageSpeed
8. HTTPS
9. HTTP/2
10. gzip
11. Cache Busting w/ gulp-rev

## Roadmap
- WebAssembly (Sample)
- FastDOM (Sample)
- Use BEM (Sample)
- will-change (Sample)
- translateZ(0) (Sample)
- Picture srcset (Sample)
- GIFsicle support (Implement)
- Nginx Caching (Implement)
- Trampolining (Sample)
- Y-Combinator (Sample)
- Use preconnect

## Recommendations
- Use [Compressor.io](https://compressor.io) for compressing files.

## Cleanup
- Use variables for the directories
- Ignore worker.min.js on gulp-rev
- Add more html files in other folders with their corresponding styles and scripts