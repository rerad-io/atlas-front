import { fabric } from 'fabric'; 
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useState } from 'react';

import DEFAULT_IMAGE from "./bones.jpg"

const createImage = (url: string, width:number, height: number, x:number, y:number) =>
    new Promise<fabric.Image>((resolve) => {

        fabric.Image.fromURL(url, (item) => {
            item.scaleToHeight(width);
            item.scaleToWidth(height);
            item.set({
                left: x,
                top: y,
            });
            resolve(item);
        });
    });




export const CanvasInstance = ({fabricCanvas}:{fabricCanvas:fabric.Canvas} ) => {
console.log("🚀 ~ file: index.tsx:8 ~ CanvasInstance ~ fabricCanvas:", fabricCanvas)

	useEffect(()=>{

		//const layer0 = new fabric.Group();
		
		//const image = document.createElement("Image") as HTMLImageElement;
		//image.src = DEFAULT_IMAGE;
		
		//const currentFram = new fabric.Image(image);
		
		//layer0.add(currentFram);
		const point1 = new fabric.Circle({
			left: 100,
			top: 50,
			width: 50,
			height: 50,
			backgroundColor: 'red',
		});
		const layer1Bg = new fabric.Group([]);

		const layer2Frame = new fabric.Group([]);

		const layer3Point = new fabric.Group([]);

		layer3Point.addWithUpdate(point1);

		fabricCanvas.add(layer1Bg);
		fabricCanvas.add(layer2Frame);
		fabricCanvas.add(layer3Point);
		fabricCanvas.renderAll();

		createImage(DEFAULT_IMAGE, 500, 500, 0, 0)
		.then((img)=>{
			layer2Frame.addWithUpdate(img);
			fabricCanvas.renderAll();
		})
	},[]);

	
	
return (
	<>
	 	{/*<div className="sample-container"  >*/}
      {/*<FabricJSCanvas  className="sample-canvas" />*/}
    {/*</div>*/}
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