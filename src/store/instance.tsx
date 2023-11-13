import { createSlice } from "@reduxjs/toolkit";
import { AnatomicalStructure, InstanceData, Series, Study } from "../_types";
import type { PayloadAction } from "@reduxjs/toolkit";

type InstanceKey = string;

export type InstanceState = {
    // Static data
    study: Study;
    studies: Study[];
    series: Record<number, Series>;

    // Это у нас база данные точек, где в качестве ключа выступает составной ключ,
    // который состоит из номера серии и номера инстанса, и хранит в себе относящиеся к ключу
    // точки
    instanceData: Record<InstanceKey, InstanceData[]>;
    availableAnatomicalStructures: AnatomicalStructure[];

    // Dynamic data

    // Массив содержит список точек которые актуальны для текущей серии и для текущего кадра
    currentInstanceData: InstanceData[];

    currentInstanceNumber: number;
    currentSeriesNumber: number;
};

const initialState: InstanceState = {
    study: {},
    studies: [],
    series: {},
    instanceData: {},
    availableAnatomicalStructures: [],
    currentInstanceData: [],
    currentInstanceNumber: 0,
    currentSeriesNumber: 1,
};

const instanceKey = (seriesNumber: number, instanceNumber: number): InstanceKey => `${seriesNumber}-${instanceNumber}`;

const instanceSlice = createSlice({
    name: "instance",
    initialState,
    reducers: {
        setAnatomicalStructures: (state, { payload }: PayloadAction<AnatomicalStructure[]>) => {
            state.availableAnatomicalStructures = payload;
        },
        setStudy: (state, { payload }: PayloadAction<Study & { seriesList: Series[]; instanceData: InstanceData[] }>) => {
         
            state.study = {
                id: payload.id,
                externalId: payload.externalId,
                name: payload.name,
                description: payload.description,
                previewFrame: payload.previewFrame,
            };
            state.series = payload.seriesList.reduce(
                (series, item, index) => {
                    series[index] = item;
                    return series;
                },
                {} as Record<number, Series>,
            );
            //			// TODO: бэкэнд должен возвращать seriesNumber в
            //state.instanceData = payload.instanceData.reduce(
            //    (instanceData, item) => {
            //        //const key = instanceKey(item.seriesNumber, item.instanceNumber);
            //        const key = instanceKey(item.seriesNumber, item.instanceNumber);
            //				if(!instanceData[key]){
            //					instanceData[key] = [];
            //				}
            //				instanceData[key].push(item);
            //        return instanceData;
            //    },
            //    {} as Record<InstanceKey, InstanceData[]>,
            //);
            let accum: Record<number, InstanceData[]> = {};

            payload.seriesList.forEach((item) => {
                const seriesKey = item.number;

                accum = payload.instanceData.reduce(
                    (instanceData, item) => {
                        const key = instanceKey(seriesKey, item.instanceNumber);
                        if (!instanceData[key]) {
                            instanceData[key] = [];
                        }
                        instanceData[key].push(item);
                        return instanceData;
                    },
                    {} as Record<InstanceKey, InstanceData[]>,
                );
            });

            state.instanceData = accum;

            // Пример структуры
            // state.instanceData = {
            //     "1-1": [
            //         {x:1, y: 1, ...},
            //         {x:100, y: 100, ...}
            //     ],
            //     "1-2": [
            //         {x:1, y: 1, ...},
            //         {x:97, y: 96, ...}]
            // }

            state.currentInstanceData = [];
        },
        setCurrentSereies: (state, { payload }: PayloadAction<number>) => {
            state.currentSeriesNumber = payload;
            const key = instanceKey(state.currentSeriesNumber, state.currentInstanceNumber);
            state.currentInstanceData = state.instanceData[key] ?? [];
        },
        setCurrentInstanceNumber: (state, { payload }: PayloadAction<number>) => {
            state.currentInstanceNumber = payload;
            const key = instanceKey(state.currentSeriesNumber, state.currentInstanceNumber);
            state.currentInstanceData = state.instanceData[key] ?? [];
        },
    },
});

export const { setStudy, setAnatomicalStructures, setCurrentSereies, setCurrentInstanceNumber } = instanceSlice.actions;

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
