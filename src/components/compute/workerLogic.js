export const workerFunction = () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.onmessage = (e) => {
    // AHORA RECIBIMOS LAS COORDENADAS (props) DEL MENSAJE PRINCIPAL
    const { width, height, startY, endY, maxIter, centerX, centerY, zoom } = e.data;
    
    const totalPixels = width * (endY - startY);
    const data = new Uint8ClampedArray(totalPixels * 4);

    let offset = 0;

    for (let y = startY; y < endY; y++) {
      for (let x = 0; x < width; x++) {
        // MATEMÁTICA AJUSTADA PARA ZOOM DINÁMICO
        // Convertimos píxel (x,y) a coordenada compleja
        let cX = (x - width / 2) / zoom + centerX;
        let cY = (y - height / 2) / zoom + centerY;
        
        let zx = 0;
        let zy = 0;
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
          // Un esquema de color un poco más vibrante para el zoom
          const colorVal = iter * 5;
          data[p] = colorVal * 2;     // R (Un poco de rojo para variedad)
          data[p + 1] = colorVal;     // G
          data[p + 2] = colorVal * 4; // B
          data[p + 3] = 255;
        }
        
        offset++;
      }
    }

    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage({ data, startY, endY }, [data.buffer]);
  };
};