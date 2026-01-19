
const default_intensities = " .'\\`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const default_max = 500;

class MandelbrotParameters
{
  /**
   * 
   * @param {URLSearchParams} query 
   */
  constructor(query)
  {
    this.dim = GetDim(query);
    this.intensities = query.has("intensityCharacters") ? query.get("intensityCharacters") : default_intensities;
    this.max_iterations = query.has("maxIterations") ?  parseInt(query.get("maxIterations")) : default_max;
    const x = query.has("centerX") ? parseFloat(query.get("centerX")) : 0;
    const y = query.has("centerY") ? parseFloat(query.get("centerY")) : 0;
    this.center = new Complex(x,y);
    this.zoom = query.has("zoom") ? parseFloat(query.get("zoom")) : 1;
  }
}

function GetParams()
{
  const query = new URLSearchParams(window.location.search)
  return query
}

function FontDim()
{
  const span = document.createElement("span");
  span.textContent="H";
  span.style.font = "16px monospace";
  document.body.appendChild(span);
  let [w,h] = [span.getBoundingClientRect().width, span.getBoundingClientRect().height];
  document.body.removeChild(span);
  return [w,h];
}

/**
 * 
 * @param {URLSearchParams | null | undefined} query_string 
 */
function GetDim(query_string)
{
  
  let [fw, fh] = FontDim();

  let w = Math.trunc(window.innerWidth/fw), h = Math.trunc(window.innerHeight/fh);
  
  if(query_string)
  {
    if (query_string.has("w"))
    {
      w = Math.trunc(parseInt(query_string.get("w")))
    }

    if(query_string.has("h"))
    {
      h = Math.trunc(parseInt(query_string.get("h")))
    }
  }
  console.log(`${w}x${h}`)

  return [w,h]
}

class Complex
{
  constructor(real, imag)
  {
    this.real = real,
    this.imag = imag
  }

  square() {
    return new Complex(this.real*this.real-this.imag*this.imag, 2*this.real*this.imag)
  }
  add(other)
  {
    return new Complex(this.real+other.real, this.imag+other.imag)
  }
}


/**
 * 
 * @param {MandelbrotParameters} parameters 
 * @param {number[]} coord 
 */
function NormalizeCoordinates(parameters, coord)
{
  const zoom = Math.pow(parameters.zoom, 1.0/1.02);
  const [w,h] = parameters.dim;
  const minres = Math.min(w, h);
  const [x,y] = coord;
  real = 1/zoom * 2.0 * ((x-.5*w)/minres);
  imag = 1/zoom * 2.0 * ((y-.5*h)/minres);

  return (new Complex(real, imag)).add(parameters.center);
}

/**
 * 
 * @param {number} iteration
 * @param {MandelbrotParameters} parameters 
 */
function GetSymbol(iteration, parameters)
{
  const index = Math.trunc(iteration/parameters.max_iterations * (parameters.intensities.length-1))
  return parameters.intensities[index];
}

/**
 * 
 * @param {MandelbrotParameters} parameters
 * @param {Complex} c 
 */
function Mandelbrot(parameters, c)
{
  let z = new Complex(0,0);
  let i = 0;
  for (; i < parameters.max_iterations; i++)
  {
    z = z.square().add(c);
    if(Math.pow(z.real, 2) + Math.pow(z.imag, 2) > 4.0)
    {
      return i;
    }
  }
  return i;
  
}

/**
 * 
 * @param {MandelbrotParameters} parameters 
 */
function Render(parameters)
{
  let ret = "";
  for(let y = 0; y < parameters.dim[1]; y++)
  {
    for(let x = 0; x < parameters.dim[0]; x++)
    {
      let coord = NormalizeCoordinates(parameters, [x,y]);
      ret += GetSymbol(Mandelbrot(parameters, coord), parameters);
    }
    ret += "\n";
  }
  return ret;
}

document.getElementById("query").textContent = Render(new MandelbrotParameters(GetParams()))