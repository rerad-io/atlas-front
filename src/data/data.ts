// temporary Data Base

const arm: string = "https://www.healthpages.org/wp-content/uploads/hand-x-ray-768x923.jpg";
const had: string = "https://www.lumen.luc.edu/lumen/meded/radio/curriculum/Kumar/skull_xray_pa.jpg";
const lag: string = "https://www.jospt.org/cms/10.2519/jospt.2016.0408/asset/images/medium/jospt-494-fig001.jpg";
const had2: string = "https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg";

export const galleryList = [
    {
        id: "1",
        img: arm,
        alt: "photo1",
    },
    {
        id: "2",
        img: had,
        alt: "photo2",
    },
    {
        id: "3",
        img: lag,
        alt: "photo3",
    },
    {
        id: "4",
        img: had2,
        alt: "photo4",
    },
    {
        id: "5",
        img: arm,
        alt: "photo5",
    },
    {
        id: "6",
        img: had,
        alt: "photo6",
    },
];

export const studiesList = [
    {
        id: "study1",
        externalId: "uuid1",
        name: "Исследование головного мозга",
        description: "описание исследования головного мозга",
        previewFrame: had,
    },
    {
        id: "study2",
        externalId: "uuid2",
        name: "Исследование руки",
        description: "описание исследования руки",
        previewFrame: arm,
    },
    {
        id: "study3",
        externalId: "uuid3",
        name: "Исследование ноги",
        description: "описание исследования ноги",
        previewFrame: lag,
    },
    {
        id: "study4",
        externalId: "uuid4",
        name: "Исследование HR",
        description: "описание исследования HR",
        previewFrame: had2,
    },
];

//export const seriesData = [
//	{
//		id: "serie 1",
//		name: "T 1",
//		study: "study1",
//		number: 1,
//		list:[
//			{
//        id: "1",
//        img: arm,
//        alt: "photo1",
//    },
//    {
//        id: "2",
//        img: had,
//        alt: "photo2",
//    },
//    {
//        id: "3",
//        img: lag,
//        alt: "photo3",
//    },
//		]
//	},
//	{
//		id: "serie 2",
//		name: "T 2",
//		study: "study2",
//		number: 2,
//		list:[ {
//			id: "4",
//			img: had2,
//			alt: "photo4",
//	},
//	{
//			id: "5",
//			img: arm,
//			alt: "photo5",
//	},]
//	},
//	{
//		id: "serie 3",
//		name: "T 3",
//		study: "study3",
//		number: 3,
//		list:[
//			{
//			id: "2",
//			img: had,
//			alt: "photo2",
//	},
//	{
//			id: "3",
//			img: lag,
//			alt: "photo3",
//	},
//	{
//			id: "4",
//			img: had2,
//			alt: "photo4",
//	},]
//	},
//]

export const seriesData = [
    {
        id: "serie 1",
        study: "study1",
        number: 1,
        name: "T 1",
        previewFrame: had,
        instanceCount: 2,
        sagitalFrame: had,
        coronalFrame: had,
    },
    {
        id: "serie 2",
        study: "study1",
        number: 2,
        name: "T 2",
        previewFrame: had,
        instanceCount: 2,
        sagitalFrame: had,
        coronalFrame: had,
    },
    {
        id: "serie 3",
        study: "study1",
        number: 3,
        name: "T 3",
        previewFrame: had,
        instanceCount: 2,
        sagitalFrame: had,
        coronalFrame: had,
    },
    {
        id: "serie 4",
        study: "study2",
        number: 4,
        name: "T 4",
        previewFrame: arm,
        instanceCount: 5,
        sagitalFrame: arm,
        coronalFrame: arm,
    },
    {
        id: "serie 5",
        study: "study2",
        number: 5,
        name: "T 5",
        previewFrame: arm,
        instanceCount: 4,
        sagitalFrame: arm,
        coronalFrame: arm,
    },
    {
        id: "serie 6",
        study: "study3",
        number: 6,
        name: "T 6",
        previewFrame: lag,
        instanceCount: 4,
        sagitalFrame: lag,
        coronalFrame: lag,
    },
    {
        id: "serie 7",
        study: "study3",
        number: 7,
        name: "T 7",
        previewFrame: lag,
        instanceCount: 5,
        sagitalFrame: lag,
        coronalFrame: lag,
    },
    {
        id: "serie 8",
        study: "study4",
        number: 8,
        name: "T 8",
        previewFrame: had2,
        instanceCount: 5,
        sagitalFrame: had2,
        coronalFrame: had2,
    },
];

export const instanceList = [
    {
        id: "instanse 1",
        study: "study1",
        series: "serie 1",
        structure: "7ffa07b6-7d7e-424b-9d55-90e8914511d4",
        instanceNumber: 1,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "",
    },
    {
        id: "instanse 2",
        study: "study1",
        series: "serie 2",
        structure: "7ffa07b6-7d7e-424b-9d55-90e8914511d4",
        instanceNumber: 2,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "",
    },
];
