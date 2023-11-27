// Файл для хранения глобмальных типов используемых во всем проекте

export interface AuthData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshTokenExpiresIn: number;
    myProperty: unknown;
}

export type AnatomicalStructureSubject = {
    id: string;
    name: string;
    color: string;
};

export type AnatomicalStructure = {
    id: string;
    name: string;
    subject: AnatomicalStructureSubject;
};

export type AnatomicalStructureModel = {
    id: string;
    name: string;
    anatomicalStructureSubject: AnatomicalStructureSubject;
};

export type AnatomicalStructureSubjectModel = {
    id: string;
    name: string;
    color: string;
    anatomicalStructures: AnatomicalStructure[];
};

export type Study = {
    id: string;
    externalId: string;
    name: string;
    description: string;
    previewFrame: string;
};

export type SeriesListModel = {
    id: string;
    number: number;
    name: string;
    studyId: string;
    previewFrame: string;
    instanceCount: number;
    sagitalFrame: string;
    coronalFrame: string;
    instanceDataList: InstanceData[];
    studyExternalId: string;
};

export type StudyFullModel = Study & {
    seriesList: SeriesListModel[];
    instanceDataList: InstanceData[];
};

export type Series = {
    id: string;
    studyId: string;
    name: string;
    number: number;
    instanceCount: number;
    previewFrame: string;
    sagitalFrame: string;
    coronalFrame: string;
};

export type InstanceData = {
    id: string;
    study: string;
    studyId: string;
    series: string;
    seriesId: string;
    seriesNumber: number;
    structureId: AnatomicalStructure;
    structureName: string;
    subjectColor: string;
    instanceNumber: number;
    status: string;
    type: string;
    x: number;
    y: number;
    path: string;
};

export type Point = {
    left: number;
    top: number;
    originX: string;
    originY: string;
    radius: number;
    fill: string;
};
