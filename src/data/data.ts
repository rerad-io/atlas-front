// temporary Data Base

const arm: string = "https://www.healthpages.org/wp-content/uploads/hand-x-ray-768x923.jpg";
const had: string = "https://www.lumen.luc.edu/lumen/meded/radio/curriculum/Kumar/skull_xray_pa.jpg";
const lag: string = "https://www.jospt.org/cms/10.2519/jospt.2016.0408/asset/images/medium/jospt-494-fig001.jpg";
const had2: string = "https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg";

export const pathList = [
    { 1: "https://www.healthpages.org/wp-content/uploads/hand-x-ray-768x923.jpg" },
    { 2: "https://www.lumen.luc.edu/lumen/meded/radio/curriculum/Kumar/skull_xray_pa.jpg" },
    { 3: "https://www.jospt.org/cms/10.2519/jospt.2016.0408/asset/images/medium/jospt-494-fig001.jpg" },
    { 4: "https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg" },
    { 5: "https://www.healthpages.org/wp-content/uploads/hand-x-ray-768x923.jpg" },
    { 6: "https://www.lumen.luc.edu/lumen/meded/radio/curriculum/Kumar/skull_xray_pa.jpg" },
    { 7: "https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg" },
    { 8: "https://www.jospt.org/cms/10.2519/jospt.2016.0408/asset/images/medium/jospt-494-fig001.jpg" },
    { 9: "https://www.healthpages.org/wp-content/uploads/hand-x-ray-768x923.jpg" },
    { 10: "https://www.lumen.luc.edu/lumen/meded/radio/curriculum/Kumar/skull_xray_pa.jpg" },
    { 11: "https://www.jospt.org/cms/10.2519/jospt.2016.0408/asset/images/medium/jospt-494-fig001.jpg" },
    { 12: "https://sofia.medicalistes.fr/spip/IMG/jpg/xray-skulls-cross-bones.jpg" },
    { 13: "https://www.jospt.org/cms/10.2519/jospt.2016.0408/asset/images/medium/jospt-494-fig001.jpg" },
    { 14: "https://www.healthpages.org/wp-content/uploads/hand-x-ray-768x923.jpg" },
    { 15: "https://www.lumen.luc.edu/lumen/meded/radio/curriculum/Kumar/skull_xray_pa.jpg" },
];

// TODO: sagitalFrame, coronalFrame и previewFrame это одни и те же картинки
//framesList.push(`${backendUrl_2}api/file/content/atlas/${study.externalId}/${Object.values(series)[0].previewFrame}`)

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

//export const studiesList = [
//    {
//        id: "study1",
//        externalId: "uuid1",
//        name: "Исследование головного мозга",
//        description: "описание исследования головного мозга",
//        previewFrame: had,
//    },
//    {
//        id: "study2",
//        externalId: "uuid2",
//        name: "Исследование руки",
//        description: "описание исследования руки",
//        previewFrame: arm,
//    },
//    {
//        id: "study3",
//        externalId: "uuid3",
//        name: "Исследование ноги",
//        description: "описание исследования ноги",
//        previewFrame: lag,
//    },
//    {
//        id: "study4",
//        externalId: "uuid4",
//        name: "Исследование HR",
//        description: "описание исследования HR",
//        previewFrame: had2,
//    },
//];

const studyID_1 = "97031477-0e81-4fa6-aecc-657bb9310db9";
const studyID_2 = "1b1d2cee-8560-4dd7-9315-da9c034aaf0f";
const studyID_3 = "903b782c-42d4-483f-86ec-bdea34bb269f";
const studyID_4 = "c97d38d2-a5e9-4c91-9ca1-198302980d34";

const serieID_1 = "serie 1";
const serieID_2 = "serie 2";
const serieID_3 = "serie 3";
const serieID_4 = "serie 4";
const serieID_5 = "serie 5";
const serieID_6 = "serie 6";
const serieID_7 = "serie 7";
const serieID_8 = "serie 8";

const structureId_1 = "270187dd-e455-4277-926d-a5e0340b5e0c";
const structureId_2 = "95fa456a-f489-4fa5-bc31-f6b18f92dc4e";
const structureId_3 = "42896ff5-dade-467d-9e66-7df4a7a6695f";

export const temporarySeriesData = [
    {
        id: serieID_1,
        study: {
            id: studyID_1,
        },
        number: 1,
        name: "T 1",
        previewFrame: had,
        instanceCount: 10,
        sagitalFrame: had,
        coronalFrame: had2,
    },
    {
        id: serieID_2,
        study: {
            id: studyID_1,
        },
        number: 2,
        name: "T 2",
        previewFrame: had,
        instanceCount: 8,
        sagitalFrame: had,
        coronalFrame: had2,
    },
    {
        id: serieID_3,
        study: {
            id: studyID_1,
        },
        number: 3,
        name: "T 3",
        previewFrame: had,
        instanceCount: 6,
        sagitalFrame: had,
        coronalFrame: had2,
    },
    {
        id: serieID_4,
        study: {
            id: studyID_2,
        },
        number: 4,
        name: "T 4",
        previewFrame: arm,
        instanceCount: 5,
        sagitalFrame: arm,
        coronalFrame: arm,
    },
    {
        id: serieID_5,
        study: {
            id: studyID_2,
        },
        number: 5,
        name: "T 5",
        previewFrame: arm,
        instanceCount: 4,
        sagitalFrame: arm,
        coronalFrame: arm,
    },
    {
        id: serieID_6,
        study: {
            id: studyID_3,
        },
        number: 6,
        name: "T 6",
        previewFrame: lag,
        instanceCount: 7,
        sagitalFrame: lag,
        coronalFrame: lag,
    },
    {
        id: serieID_7,
        study: {
            id: studyID_3,
        },
        number: 7,
        name: "T 7",
        previewFrame: lag,
        instanceCount: 9,
        sagitalFrame: lag,
        coronalFrame: lag,
    },
    {
        id: serieID_8,
        study: {
            id: studyID_4,
        },
        number: 8,
        name: "T 8",
        previewFrame: had2,
        instanceCount: 12,
        sagitalFrame: had2,
        coronalFrame: had2,
    },
];

export const temporaryInstanceList = [
    {
        id: "instanse 1",
        study: {
            id: studyID_1,
        },
        series: {
            id: serieID_1,
            number: 1,
        },

        structure: structureId_1,
        instanceNumber: 1,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/d4e12353-b400-4645-8046-893514990fef",
    },
    {
        id: "instanse 2",
        study: {
            id: studyID_1,
        },
        series: {
            id: serieID_1,
            number: 1,
        },
        structure: structureId_2,
        instanceNumber: 2,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/7b48b45d-ac16-4a49-b0d1-b3bf7823e0ae",
    },
    {
        id: "instanse 3",
        study: {
            id: studyID_1,
        },
        series: {
            id: serieID_1,
            number: 1,
        },
        structure: structureId_3,
        instanceNumber: 3,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/ba3a4a23-1bb1-4a70-bdad-535029e77dd4",
    },
    {
        id: "instanse 4",
        study: {
            id: studyID_1,
        },
        series: {
            id: serieID_2,
            number: 2,
        },
        structure: structureId_1,
        instanceNumber: 4,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/5703d5e3-4760-4491-b3fc-bbbc51989b03",
    },
    {
        id: "instanse 5",
        study: {
            id: studyID_1,
        },
        series: {
            id: serieID_2,
            number: 2,
        },
        structure: structureId_2,
        instanceNumber: 5,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/0a42f6e0-ed81-4893-b643-f7a946028a8b",
    },
    {
        id: "instanse 6",
        study: {
            id: studyID_1,
        },
        series: {
            id: serieID_3,
            number: 3,
        },
        structure: structureId_3,
        instanceNumber: 6,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/bdeffdba-5371-479a-a7ca-a37370a77c30",
    },
    {
        id: "instanse 7",
        study: {
            id: studyID_2,
        },
        series: {
            id: serieID_4,
            number: 4,
        },
        structure: structureId_1,
        instanceNumber: 7,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/e2e19e4d-80e4-4835-962f-8d8558fcffd4",
    },
    {
        id: "instanse 8",
        study: {
            id: studyID_2,
        },
        series: {
            id: serieID_4,
            number: 4,
        },
        structure: structureId_2,
        instanceNumber: 8,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/2c024fa0-3386-4c28-967a-1ad1e8046be5",
    },
    {
        id: "instanse 9",
        study: {
            id: studyID_2,
        },
        series: {
            id: serieID_5,
            number: 5,
        },
        structure: structureId_3,
        instanceNumber: 9,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/2e50da7a-6377-45ed-b912-55dec32ff17a",
    },
    {
        id: "instanse 10",
        study: {
            id: studyID_3,
        },
        series: {
            id: serieID_6,
            number: 6,
        },
        structure: structureId_1,
        instanceNumber: 10,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/d8ba4db4-fad2-4636-b1be-6cf4279466a6",
    },
    {
        id: "instanse 11",
        study: {
            id: studyID_3,
        },
        series: {
            id: serieID_7,
            number: 7,
        },
        structure: structureId_2,
        instanceNumber: 11,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/73ace63a-afc5-491f-b69f-1878b241228c",
    },
    {
        id: "instanse 12",
        study: {
            id: studyID_4,
        },
        series: {
            id: serieID_8,
            number: 8,
        },
        structure: structureId_3,
        instanceNumber: 12,
        type: "ENUM TYPE",
        x: 0,
        y: 0,
        path: "blob:https://www.imaios.com/18326447-be2d-416a-9e93-3378fab7f91d",
    },
];

// study:{
//		"id": "785274a2-743e-40c3-868a-6ef9ba3a6d2e",
//		"externalId": "482c0e61-d35e-4d81-a63d-f10380fe9ad3",
//		"name": "Knee joint",
//		"description": "Knee joint",
//		"previewFrame": "dicom/1/1/10.jpg",
//		"seriesList": null
// }

// series: {
//	{
//		"id": "57d66d83-669d-4f54-86ff-622c176c9dc4",
//		"number": 1,
//		"name": "T1",
//		"previewFrame": "dicom/1/1/10.jpg",
//		"instanceCount": 27,
//		"sagitalFrame": "dicom/1/1/10.jpg",
//		"coronalFrame": "dicom/1/1/10.jpg"
//}
//}

// AnatomicalStructureSubject:{
// name: "Human Body",
//	color:	"2C0466",
//}

// AnatomicalStructure :
//[
//	{
//			"id": "28dd5ba8-8a35-4b4b-99a0-11defde634c2",
//			"name": "Vastus medialis muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "b868bfe5-b96c-497c-b24b-121aa6d67a2d",
//			"name": "Vastus lateralis muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "6b2cc757-36e7-4e30-9a11-ec2bedd06371",
//			"name": "Vastus intermedius muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "07f038de-4e8b-44a6-99da-edb0b0592c19",
//			"name": "Transverse ligament of knee",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "790259f7-702b-4cb5-9291-9db3c1c0539e",
//			"name": "Tibialis posterior muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d11c6695-8b27-40a3-9884-cf532074305d",
//			"name": "Tibialis anterior muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f80cd5f1-692f-4630-8e4c-713a0f454721",
//			"name": "Tibial tuberosity",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "0d3682a0-05ed-43b5-838d-5bf9479f94f1",
//			"name": "Tibial nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ac66b7d2-ff6d-4b62-940f-c84db6eadbaa",
//			"name": "Tibial collateral ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "c8a9af84-71f8-4cab-abf3-6d9ad3a98b88",
//			"name": "Tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "5e46210a-ce00-45d2-b16c-e459f199601e",
//			"name": "Tendon of vastus medialis muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "86fe93c4-f334-449e-900f-24b78150ad1a",
//			"name": "Tendon of vastus lateralis muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "c48c50a7-a795-41be-9450-0c4405211016",
//			"name": "Tendon of vastus intermedius muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "9608ebe1-9353-4867-86f2-82034753794b",
//			"name": "Tendon of sartorius muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "3bc49202-c186-4418-bc9e-350717a87d26",
//			"name": "Tendon of rectus femoris muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "e7550226-8c14-42f4-af59-b25bd900456c",
//			"name": "Tendon of quadriceps femori muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d60fefa1-0b79-45c4-8789-5e0733809990",
//			"name": "Sural veins",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f74f21b7-6554-4beb-a3b1-ac8c3d646eba",
//			"name": "Sural communicating branch of common fibular nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "89dda320-bb09-4b6d-8fda-1502235942fd",
//			"name": "Suprapatellar bursa",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "6d65a340-a762-4601-a423-d3606dba107d",
//			"name": "Superior articular surfaces of tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d2f14848-9bae-4e45-b551-09086f886f5d",
//			"name": "Soleus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "6b157806-f8fb-4c70-bf62-32246ca1bdd2",
//			"name": "Soleal line",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "671edad5-eb81-4b33-b730-ea86fd2c7b2b",
//			"name": "Small saphenous vein",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "405237b4-8837-4d01-829e-9c94fb5424dd",
//			"name": "Tendon of semitendinosus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f55bcf0a-2a7d-4d90-a5ac-685d68065306",
//			"name": "Semitendinosus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "b3ff3c19-8857-49cf-b357-01b564cd23bb",
//			"name": "Tendon of semimembranosus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "1b3381e9-293f-4d34-a800-f0e0b89fa1a9",
//			"name": "Semimembranosus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "51eb22b0-e394-4e98-92a7-c9947fffc01a",
//			"name": "Sartorius muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "c72d0d29-3fb5-47e6-9ed2-11b69e7a7c7d",
//			"name": "Saphenous nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "b58e7781-ae27-4fef-9c12-45d76c92f873",
//			"name": "Rectus femoris muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "1b284316-06c9-4e2c-a688-e69979503be3",
//			"name": "Posterior tibial veins",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "9bfab4f1-1bbb-4acd-8613-864dfecc3298",
//			"name": "Posterior tibial artery",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "92f8052d-c539-4768-9db3-65faeeff05db",
//			"name": "Posterior surface of tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "2fe59915-b093-49a0-973c-cafdbf927208",
//			"name": "Posterior meniscofemoral ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "4b28dac2-9563-4fd6-b5c9-eb742fdba7a6",
//			"name": "Posterior intermuscular septum of leg",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "701c38ad-da5d-483d-90a3-e3d3b6c9101b",
//			"name": "Posterior intercondylar area",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ac20364a-ef21-456b-b493-cf0511634223",
//			"name": "Posterior horn",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "17251fe1-6bc0-4896-882c-8f37d84eac62",
//			"name": "Posterior cruciate ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f778c653-0a12-4849-a22f-423c27382e6d",
//			"name": "Popliteus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "4f8c6985-648f-4236-8c6c-a9c1d0e20c06",
//			"name": "Popliteal vein",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "c265f59a-5470-445b-b679-bb78ec3ade8a",
//			"name": "Popliteal surface of femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "26a6faea-cd70-428f-8d13-592aad03e4d3",
//			"name": "Popliteal artery",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "2988d27d-f6f2-4b06-a098-7bbf74b6bd29",
//			"name": "Plica synovialis suprapatellaris",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "fec1bc30-f720-4e63-b519-c1fc9cb67d08",
//			"name": "Plica synovialis mediopatellaris",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ff64de55-5654-47cc-9782-3955a65cb75d",
//			"name": "Plantaris muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "becd618b-cdb5-4069-bead-eb530a38ac50",
//			"name": "Patellar surface of femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f44bd41d-4910-44c2-bd7c-4889013013cb",
//			"name": "Patellar ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "fb0719b8-e8c8-4e60-a313-2c846449654d",
//			"name": "Patella",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "21c9967f-9214-441f-b4e5-f8f69616782c",
//			"name": "Oblique popliteal ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "25d04c18-0145-41d9-a949-0561b98888b6",
//			"name": "Neck of fibula",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ec489778-22cb-4ce6-aa78-ea3cfa317635",
//			"name": "Muscular branches of tibial nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "bf51a6e5-7525-4d61-8c51-67e8e2f1b348",
//			"name": "Medial surface of tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "8461eb10-911c-4a74-b135-73fea1e88a56",
//			"name": "Medial sural cutaneous nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "13a09ec4-4fca-438d-81ac-a8a0bb918c6f",
//			"name": "Medial patellar retinaculum",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "8f1b290b-d797-4f6b-ac50-14bff851c421",
//			"name": "Medial meniscus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "80423d54-226c-4b61-b76b-3b8d1b6295c0",
//			"name": "Medial intercondylar tubercle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "86743a47-b34f-462f-a79d-195088f46b9f",
//			"name": "Medial head of gastrocnemius",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "655dc293-8ae8-4f6a-a5f8-7ed77116c753",
//			"name": "Medial epicondyle of femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "7cb04ff7-f1b1-484b-b73c-38ba8f179c8c",
//			"name": "Medial condyle of femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "622719df-de51-4d89-9a09-caccf2101535",
//			"name": "Medial condyle of tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "b2b96bf7-99cd-4d15-9be9-029536125dfc",
//			"name": "Lateral surface of tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "c5440112-03df-4ce9-bcf3-3e2e09e84197",
//			"name": "Lateral sural cutaneous nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "4e8c898a-5b6a-4243-b395-7f8d2763413f",
//			"name": "Lateral patellar retinaculum",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "721878c3-8dae-47d9-9ac5-806b9d8aa7ae",
//			"name": "Lateral meniscus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f238bb51-2ea4-4fc0-b134-6539b512426c",
//			"name": "Lateral intercondylar tubercle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "36aaba8f-13a8-4e55-93b8-a4c0ad27b636",
//			"name": "Lateral head of gastrocnemius",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "3a3e1435-a12d-423b-bdad-2ba81e5b79c2",
//			"name": "Lateral femoral intermuscular septum",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "6ef1bf7a-1afb-4389-b908-ccabb6708024",
//			"name": "Lateral epicondyle of femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f3323bc7-e922-4609-802e-1aa72c4d7981",
//			"name": "Lateral condyle of tibia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f3a7e8ce-60c0-4ed5-9ba6-3c5f4a4e8594",
//			"name": "Lateral condyle of femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "17f394bb-9169-42e5-bee9-bc33d6ec9dbf",
//			"name": "Interosseous membrane of leg",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "a135bef4-d0ba-442d-b351-73eaa8c787ee",
//			"name": "Intercondylar fossa",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "9a134039-b576-4643-97cd-edc2f975973e",
//			"name": "Intercondylar eminence",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d2974024-0e3c-4cf5-817c-498ad7f21cdc",
//			"name": "Infrapatellar synovial fold",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "2bb31adc-74a1-4377-9f98-0f190dbda874",
//			"name": "Infrapatellar fat pad",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "cceff998-e96e-4831-91d0-dd9ec466d8fe",
//			"name": "Iliotibial tract",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "4cd99019-77c5-47c1-a3e2-324db1cfb51d",
//			"name": "Head of fibula",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "5510ce60-e653-4dff-b598-1a5fdf2fed3b",
//			"name": "Groove for popliteus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "1e15ed7a-95ca-42f9-be6e-c1ba9eb319dd",
//			"name": "Great saphenous vein",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "6929961a-59ad-4178-934d-d605e7999f6c",
//			"name": "Gracilis-Tendon",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "055cb3a7-e2ca-4fae-ab83-53a8aefa3c80",
//			"name": "Gracilis muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "69ba1980-1489-4e80-ae8a-aa21140d6d47",
//			"name": "Tubercle of iliotibial tract",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "fba82f2b-4c4d-45c7-b9c0-714909910c99",
//			"name": "Fibularis longus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "5f24fed0-3a55-4919-beb6-2866541a4135",
//			"name": "Fibular collateral ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "e3c9b703-2cb6-4f41-9524-e796eaedb3cb",
//			"name": "Fibular articular facet",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "8bee5093-7d7f-4522-93f5-3574539e4bae",
//			"name": "Fibula",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d362ae08-e42f-4ba3-bd58-c4e3f361ebd9",
//			"name": "Femur",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ffca8149-220e-45ec-9810-e499f12f9298",
//			"name": "Fascia lata",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "55f0a143-703f-4b75-ba32-36fca7ac1c16",
//			"name": "Fabella",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "dd0751a2-cccd-4160-bb29-38fc845b6a7f",
//			"name": "Extensor digitorum longus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "6d9570ab-cf10-4742-aff7-a81b5a9d9318",
//			"name": "Crural fascia",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "0e57dc79-25f1-4c3b-b8f4-47e1d53cb5d5",
//			"name": "Common fibular nerve",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d044e62d-7510-4cac-9ae7-ddcb20bae11c",
//			"name": "Biceps femoris-Tendon",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ed863b00-d6a1-4ceb-965c-b20225b58570",
//			"name": "Short head of biceps femoris",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "30e65939-54a2-4b9e-8ed4-60604c08f62b",
//			"name": "Long head of biceps femoris",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "a5def9c5-4877-4872-bedc-da5a7b25ddea",
//			"name": "Base of patella",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "c833254d-eea8-4cb0-a4b7-a35865c12c05",
//			"name": "Articularis genus muscle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d6d24ffa-f09e-4b0b-9c34-3a7acafbf027",
//			"name": "Articular surface of patella",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "b894d49e-316c-456d-b3d0-6ccd6c109105",
//			"name": "Articular facet of head of fibula",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "179bbd14-c5c3-430b-912d-0cd10a601645",
//			"name": "Arcuate popliteal ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "33a8d228-1bb1-413c-8f7e-40dace682dad",
//			"name": "Apex of patella",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "e2cd7b43-5a08-468b-8d47-4602376d7106",
//			"name": "Apex of head of fibula",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "5c55a79a-39db-47c6-8dba-a8cd912eafc2",
//			"name": "Anterolateral ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "796991a0-b04e-4e55-83c1-5acba2859398",
//			"name": "Anterior tibial veins",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "f2d9a0ea-9f9b-4ab2-a9d1-daf910c27f8d",
//			"name": "Anterior tibial artery",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "050c74bd-5d1a-4d16-a1e4-eb09cb7a11ae",
//			"name": "Anterior surface of patella",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "eb784d45-e564-4d90-abb6-9cd1b95365c1",
//			"name": "Anterior meniscofemoral ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "9ff78850-ca6a-4f06-a59e-0e599cfcdfd4",
//			"name": "Anterior intermuscular septum of leg",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "191ac72a-971c-4d59-b42e-273039a72ccb",
//			"name": "Anterior intercondylar area",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "90b44af6-ddde-4d20-af3d-753a75b83578",
//			"name": "Anterior horn",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "d787a221-273d-4c00-bd38-3c39a360ef8b",
//			"name": "Anterior cruciate ligament",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "ab9393de-f62b-4f99-826f-b60929c4918d",
//			"name": "Adductor tubercle",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "0bb12dd0-b59e-4790-9d44-d68f53d4d620",
//			"name": "Tendon of adductor magnus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	},
//	{
//			"id": "33ff0caf-8003-4891-aabf-0fd86dc4c1f8",
//			"name": "Adductor magnus",
//			"anatomicalStructureSubject": {
//					"id": "5313410f-0b78-439c-aadb-c62642f07d86",
//					"name": "Human Body",
//					"color": "2C0466"
//			}
//	}
//]
