import { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric'; 
import { CanvasInstance } from '../CanvasInstance';

export const WhiteBoardCanvas = () => {

  const canvasEl = useRef<HTMLCanvasElement>(null);
	const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas>();

  useEffect(() => {  
		const options = { 
			width: 500,
			height: 500,
			backgroundColor: 'whitesmoke',
			fireMiddleClick: true,
			//selection: false,
      //renderOnAddRemove: true,
		};

		setFabricCanvas(new fabric.Canvas(canvasEl.current, options));


		//canvas.on("mouse:down", (event) => {
		//	const pointer = canvas.getPointer(event.e);
		//	//console.log("🚀 ~ file: index.tsx:24 ~ canvas.on ~ canvas:", canvas)
		//	const x = pointer.x; // Координата x клика
		//	const y = pointer.y; // Координата y клика
		//	console.log(`Mouse click at (${x}, ${y})`);
		//});
	
		
		//return () => {
    //  canvas.dispose();
    //  setFabricCanvas(null);
    //}
  }, []);
	
	

  return <>
	<canvas ref={canvasEl}/>
	{fabricCanvas && <CanvasInstance fabricCanvas={fabricCanvas}/>}
	</>
	
};