export const workerFunction = () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.onmessage = (e) => {
    const { width, height, startY, endY, maxIter } = e.data;
    
    const totalPixels = width * (endY - startY);
    const data = new Uint8ClampedArray(totalPixels * 4);

    const zoom = 250;
    const panX = 2;
    const panY = 1.5;

    let offset = 0;

    {/* --- MANDELBROT ALGORITHM --- */}
    for (let y = startY; y < endY; y++) {
      for (let x = 0; x < width; x++) {
        let zx = 0;
        let zy = 0;
        let cX = (x / zoom) - panX;
        let cY = (y / zoom) - panY;
        let iter = 0;

        while (zx * zx + zy * zy < 4 && iter < maxIter) {
          let tmp = zx * zx - zy * zy + cX;
          zy = 2.0 * zx * zy + cY;
          zx = tmp;
          iter++;
        }

        const p = offset * 4;
        
        if (iter === maxIter) {
          data[p] = 0;
          data[p + 1] = 0;
          data[p + 2] = 0;
          data[p + 3] = 255;
        } else {
          const colorVal = iter * 8;
          data[p] = 0;
          data[p + 1] = colorVal;
          data[p + 2] = colorVal * 2;
          data[p + 3] = 255;
        }
        
        offset++;
      }
    }

    {/* --- RETURN PROCESSED DATA --- */}
    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage({ data, startY, endY }, [data.buffer]);
  };
};