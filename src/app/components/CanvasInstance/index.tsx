import { fabric } from 'fabric'; 
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useState } from 'react';

import DEFAULT_IMAGE from "./bones.jpg"

export const CanvasInstance = ({fabricCanvas}) => {
console.log("🚀 ~ file: index.tsx:8 ~ CanvasInstance ~ fabricCanvas:", fabricCanvas)

	useEffect(()=>{

		const layer0 = new fabric.Group();
		
		const image = document.createElement("Image") as HTMLImageElement;
		image.src = DEFAULT_IMAGE;
		
		const currentFram = new fabric.Image(image);
		
		layer0.add(currentFram);
		const point1 = new fabric.Circle({
			left: 100,
			top: 50,
			width: 50,
			height: 50,
			backgroundColor: 'red',
		});
		const layer1 = new fabric.Group();
		layer1.add(point1);
		fabricCanvas.set()
		fabricCanvas.add(layer0);
		fabricCanvas.add(layer1);
		console.log("🚀 ~ file: index.tsx:31 ~ useEffect ~ fabricCanvas:", fabricCanvas)
		fabricCanvas.renderAll()
	},[])
	
return (
	<>
	 	<div className="sample-container"  >
      <FabricJSCanvas  className="sample-canvas" />
    </div>
	</>
	)
}

	//	const layer0 = new fabric.Group();
	
	//const image = document.createElement("Image") as HTMLImageElement;
	//image.src = "https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg";
	
	//const currentFram = new fabric.Image(image);
	
	//layer0.add(currentFram);
		//const point1 = new fabric.Circle({
	//	left: 100,
	//	top: 50,
	//	width: 50,
	//	height: 50,
	//	backgroundColor: 'red',
	//});
	//const layer1 = new fabric.Group();
	//layer1.add(point1);
	//fabricCanvas.add(layer0);
	//fabricCanvas.add(layer1);
	//fabricCanvas.renderAll()