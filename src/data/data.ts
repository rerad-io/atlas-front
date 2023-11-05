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

const studyID_1 = "80824070-8536-4e23-91fa-3be3d75d1bd0";
const studyID_2 = "dd2e241c-4ddc-4711-910e-721ae07b5007";
const studyID_3 = "84a41dc8-bb94-48e7-aee9-5a32c73f56f7";
const studyID_4 = "fa000a82-d00a-4cf8-9698-4f18dc539d72";

const serieID_1 = "serie 1";
const serieID_2 = "serie 2";
const serieID_3 = "serie 3";
const serieID_4 = "serie 4";
const serieID_5 = "serie 5";
const serieID_6 = "serie 6";
const serieID_7 = "serie 7";
const serieID_8 = "serie 8";

const structureId_1 = "e1f9f341-c237-4b3f-b377-d367e7ce7fd2";
const structureId_2 = "914776eb-0bfa-4a4f-b713-91dc215e508b";
const structureId_3 = "12df651b-5831-46ba-8675-4679b4cbfcc8";

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
