import { createSlice } from "@reduxjs/toolkit";
import { AnatomicalStructureSubject, InstanceData, Series, Study } from "../_types";
import { v4 as uuidv4 } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InstanceState = {
    study: Study;
    studies: Study[];
    series: Record<number, Series>;
    instanceData: Record<number, InstanceData[]>;
    availableAnatomicalStructureSubjects: AnatomicalStructureSubject[];
};

const initialState: InstanceState = {
    study: {},
    studies: [], // список исследований
    series: {
        //1: { /* данные для серии с номером 1 */ },
        //2: { /* данные для серии с номером 2 */ },
        // и так далее
    },
    instanceData: {
        //1: [...], // массив данных экземпляров для серии с номером 1
        //2: [...], // массив данных экземпляров для серии с номером 2
        // и так далее
    },
    availableAnatomicalStructureSubjects: [
        //"Тема 1", "Тема 2", /* и так далее */
    ],
};

const instanceSlice = createSlice({
    name: "instance",
    initialState,
    reducers: {
        setAnatomicalStructuresSubjects: (state, { payload }: PayloadAction<AnatomicalStructureSubject[]>) => {
            state.availableAnatomicalStructureSubjects = payload;
        },
        setStudy: (state, { payload }: PayloadAction<Study>) => {
            state.study = payload;
        },
        setStudiesList: (state, { payload }: PayloadAction<Study[]>) => {
            state.studies = payload;
        },
        setSeriesList: (state, { payload }: PayloadAction<Series[]>) => {
            const seriesObject = payload.reduce((acc, serie) => {
                acc[serie.number] = { ...serie };
                return acc;
            }, {});
            state.series = seriesObject;

            // TODO: с рабочей базой использоать данные instanceData с бэкэнда
            const instancesObject = payload.reduce((acc, serie) => {
                //const instancesObject = payload.reduce((acc, instance) => {
                //seriesObject.forEach(serie => {
                const instanceId = serie.number;
                //acc[instanceId] = { ...instance };
                //});
                //return acc;
                // TODO: исправить на формирование обьекта
                if (!acc[instanceId]) {
                    acc[instanceId] = [];
                }
                for (let index = 1; index <= serie.instanceCount; index++) {
                    acc[instanceId].push({
                        id: uuidv4(),
                        study: { id: serie.study.id },
                        series: { id: serie.id },
                        path: `/dicom-studies/${state.study.externalId}/series/${serie.number}/instances/${index}.png`,
                        instanceNumber: index,
                        x: 0,
                        y: 0,
                    });
                }
                return acc;
            }, {});
            state.instanceData = instancesObject;
        },
    },
});

export const { setStudy, setStudiesList, setSeriesList, setAnatomicalStructuresSubjects } = instanceSlice.actions;

export default instanceSlice.reducer;

export const instanceSelector = (state: { instance: InstanceState }) => state.instance;

// TODO: этот код пока оставить для проверки создания инстансов
//шаблон для ссылки на кадр: /api/file/content/9f251dd9-e9b0-4a55-82a1-dbbd888e461a/dicom/{studyNumber}/{seriesNumber}/{instanceNumber}.png
//обращаться нужно будет до api.dev.d.medcol.io
//правки свои я еще не залил, так что адрес пока работать не будет

//for(let index =1 ; index <= instanceCount; index ++){

//	const path = `/dicom-studies/${externalId}/series/${seriesNumber}/instances/${index}.png`;

//	const instanceDatas = data.filter((item)=> item.seriesNumber === seriesNumber && item.instance === index)
//}
