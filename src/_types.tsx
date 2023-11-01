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
    anatomicalStructureSubjectId: string;
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
}
