import { createSlice } from "@reduxjs/toolkit";
import { AnatomicalStructure, InstanceData, Series, Study } from "../_types";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InstanceState = {
    study: Study;
    studies: Study[];
    series: Record<number, Series>;
    instanceData: Record<number, InstanceData[]>;
    availableAnatomicalStructures: AnatomicalStructure[];
};

const initialState: InstanceState = {
    study: {},
    studies: [],
    series: {},
    instances: {},
    availableAnatomicalStructures: [],
};

const instanceSlice = createSlice({
    name: "instance",
    initialState,
    reducers: {
        setAnatomicalStructures: (state, { payload }: PayloadAction<AnatomicalStructure[]>) => {
            state.availableAnatomicalStructures = payload;
        },
        setStudy: (state, { payload }: PayloadAction<Study>) => {
            state.study = payload;
        },
        setStudiesList: (state, { payload }: PayloadAction<Study[]>) => {
            state.studies = payload;
        },
        setSeriesList: (state, { payload }: PayloadAction<Series[]>) => {
            const seriesObject = payload?.seriesList?.reduce((acc, serie) => {
                acc[serie.number] = { ...serie };
                return acc;
            }, {});
            state.series = seriesObject;

            const result = {};

            payload?.seriesList?.forEach((series) => {
                const filteredInstances = payload?.instanceDataList?.filter((instance) => instance.series === series.name);
                result[series.number] = filteredInstances;
            });
            state.instanceData = result;
        },
    },
});

export const { setStudy, setStudiesList, setSeriesList, setAnatomicalStructures } = instanceSlice.actions;

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

//filteredInstances.forEach(instance => {
//	instance.path = `/dicom-studies/${instance.externalId}/series/${instance.seriesNumber}/instances/${instance.instanceNumber}.png`;
//});
