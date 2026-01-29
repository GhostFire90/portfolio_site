+++
title ="Mandelbrot text renderer"

[extra]
redirect = "/mandelbrot.html" 
+++
Renders the [mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) in ascii

### API
the query string takes these args
- w: width of the render (in chars)
- h: height of the render (in chars)
- intensityCharacters: string representing what characters to use for the intensity values
- centerX: the center x coordinate of the render region (between `[-2,2]`)
- centerY: the center y coordinate of the render region (between `[-2, 2]`)
- zoom: how far zoomed in

<!-- more -->