import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaMicrochip, FaStop, FaPlay, FaSearchPlus, FaUndo } from 'react-icons/fa';
import { workerFunction } from './workerLogic'; 
import '../../styles/compute.css'; 

const DistributedCompute = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [blockCount, setBlockCount] = useState(0);
  const [statusMsg, setStatusMsg] = useState("Sistema en espera. Dona CPU para iniciar.");
  
  // ESTADO DE VISTA (Coordenadas del Fractal)
  const INITIAL_VIEW = { centerX: -0.5, centerY: 0, zoom: 200 };
  const [view, setView] = useState(INITIAL_VIEW);

  const canvasRef = useRef(null);
  const workerRef = useRef(null);
  
  const WIDTH = 600;
  const HEIGHT = 300;
  const BLOCK_SIZE = 50; 

  // Función para procesar la imagen (reutilizable)
  const processFractal = useCallback((currentView) => {
    if (!workerRef.current) return;

    // Limpiamos el canvas antes de dibujar el nuevo zoom
    const ctx = canvasRef.current.getContext('2d');
    // Solo limpiamos si es el primer bloque (blockCount 0), pero aquí simplificamos:
    // ctx.clearRect(0, 0, WIDTH, HEIGHT); 
    // (Opcional, a veces se ve mejor si se sobreescribe)

    let currentLine = 0;

    const processNextBlock = () => {
      if (!workerRef.current) return; // Seguridad si se detuvo

      if (currentLine >= HEIGHT) {
        setStatusMsg("Tarea completada. Haz clic en la imagen para investigar una zona.");
        // No detenemos el worker, lo dejamos listo para el siguiente clic
        return;
      }

      workerRef.current.postMessage({
        width: WIDTH,
        height: HEIGHT,
        startY: currentLine,
        endY: Math.min(currentLine + BLOCK_SIZE, HEIGHT),
        maxIter: 150 + Math.log(currentView.zoom) * 20, // Más iteraciones al hacer zoom
        
        // Pasamos las coordenadas dinámicas
        centerX: currentView.centerX,
        centerY: currentView.centerY,
        zoom: currentView.zoom
      });
    };

    workerRef.current.onmessage = (e) => {
      const { data, startY, endY } = e.data;
      const ctx = canvasRef.current.getContext('2d');
      const imageData = new ImageData(new Uint8ClampedArray(data), WIDTH, endY - startY);
      ctx.putImageData(imageData, 0, startY);

      currentLine = endY;
      setBlockCount(prev => prev + 1);
      
      const blockId = Math.floor(Math.random() * 0xFFFFFF).toString(16);
      setStatusMsg(`Computando sector ${blockId} | Zoom: x${Math.floor(currentView.zoom)}`);

      requestAnimationFrame(processNextBlock);
    };

    // Iniciar el bucle
    processNextBlock();

  }, []);

  const startWorker = () => {
    if (workerRef.current) return; // Ya existe

    setIsWorking(true);
    setBlockCount(0);
    setStatusMsg("Inicializando Worker Node...");

    const code = workerFunction.toString();
    const blob = new Blob([`(${code})()`], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    // Iniciamos el proceso con la vista actual
    processFractal(view);
  };

  const stopWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setIsWorking(false);
    setStatusMsg("Proceso detenido.");
  };

  // MANEJO DE CLIC (ZOOM)
  const handleCanvasClick = (e) => {
    if (!isWorking) {
        // Si no está corriendo, iniciamos primero
        alert("Primero debes 'Donar CPU' para activar el sistema.");
        return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular nuevas coordenadas basadas en dónde hizo clic el usuario
    const newCenterX = (x - WIDTH / 2) / view.zoom + view.centerX;
    const newCenterY = (y - HEIGHT / 2) / view.zoom + view.centerY;
    const newZoom = view.zoom * 2; // Zoom x2

    const newView = { centerX: newCenterX, centerY: newCenterY, zoom: newZoom };
    
    setView(newView);
    setBlockCount(0); // Reiniciamos contador para la nueva tarea
    
    // Reiniciamos el worker (o mejor dicho, le mandamos nuevo trabajo)
    // Nota: Como processFractal usa recursión, necesitamos asegurarnos de que la "tarea anterior" 
    // no siga escribiendo encima. La forma más fácil es matar y revivir el worker rápido.
    if (workerRef.current) workerRef.current.terminate();
    
    const code = workerFunction.toString();
    const blob = new Blob([`(${code})()`], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;
    
    processFractal(newView);
  };

  const handleReset = () => {
      setView(INITIAL_VIEW);
      if(isWorking) {
          stopWorker();
          setTimeout(startWorker, 100);
      }
  };

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  return (
    <div className="compute-container">
      <div className="compute-header">
        <div className="compute-title">
          <FaMicrochip />
          <h3>Cómputo Distribuido Voluntario</h3>
        </div>
        <div className="compute-stats">
          <button className="icon-btn" onClick={handleReset} title="Reset View"><FaUndo/></button>
          <span>Zoom: x{Math.floor(view.zoom)}</span>
        </div>
      </div>

      <div className="compute-display">
        <canvas 
          ref={canvasRef} 
          width={WIDTH} 
          height={HEIGHT}
          className="fractal-canvas"
          onClick={handleCanvasClick}
          style={{ cursor: isWorking ? 'zoom-in' : 'not-allowed' }}
        />
        
        {!isWorking && (
          <div className="compute-overlay">
            <p>Nodo inactivo.</p>
            <p style={{fontSize: '0.8rem', opacity: 0.7}}>Presiona "Donar CPU" para conectar al grid.</p>
          </div>
        )}
      </div>

      <div className="compute-controls">
        <div className="compute-message">
          <span className="blink">_</span> {statusMsg}
        </div>
        
        <button 
          className={`compute-btn ${isWorking ? 'stop' : 'start'}`}
          onClick={isWorking ? stopWorker : startWorker}
        >
          {isWorking ? (
            <> <FaStop /> Detener </>
          ) : (
            <> <FaPlay /> Donar CPU </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DistributedCompute;