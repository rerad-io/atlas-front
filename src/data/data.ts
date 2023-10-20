// temporary Data Base

export const anatomicalStructureSubjectsList = {
    items: [
        {
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
            name: "thema 1 ",
            color: "00FF12",
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
            name: "thema 2",
            color: "d92020",
        },
    ],
};

export const anatomicalStructure = {
    items: [
        {
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d1",
            name: "structura 1",
						anatomicalStructureSubject: {
							id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
							name: "thema 1 ",
							color: "00FF12",
						}
        },
        {
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d2",
            name: "structura 2",
						anatomicalStructureSubject: {
							id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
							name: "thema 1 ",
							color: "00FF12",
						}
        },
        {
            id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d3",
            name: "structura 3",
						anatomicalStructureSubject: {
							id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
							name: "thema 1 ",
							color: "00FF12",
						}
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c1",
            name: "structura 2.1",
						anatomicalStructureSubject: {
							id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
							name: "thema 2",
							color: "d92020",
						}
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c2",
            name: "structura 2.2",
						anatomicalStructureSubject: {
							id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
							name: "thema 2",
							color: "d92020",
						}
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c3",
            name: "structura 2.3",
						anatomicalStructureSubject: {
							id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
							name: "thema 2",
							color: "d92020",
						}
        },
        {
            id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c4",
            name: "structura 2.4",
						anatomicalStructureSubject: {
							id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
							name: "thema 2",
							color: "d92020",
						}
        },
    ],
};

export const anatomicalStructureFullSubjectsList = [
    {
        id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
        name: "thema 1 ",
        color: "00FF12",
        anatomicalStructures: [
            {
                id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d1",
                name: "structura 1",
            },
            {
                id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d2",
                name: "structura 2",
            },
            {
                id: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d3",
                name: "structura 3",
            },
        ],
    },
    {
        id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
        name: "thema 2",
        color: "d92020",
        anatomicalStructures: [
            {
                id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c1",
                name: "structura 2.1",
            },
            {
                id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c2",
                name: "structura 2.2",
            },
            {
                id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c3",
                name: "structura 2.3",
            },
            {
                id: "4ebafa2a-7448-47ba-80fa-5e9ee88f73c4",
                name: "structura 2.4",
            },
        ],
    },
];

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
