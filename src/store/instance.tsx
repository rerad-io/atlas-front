import { createSlice } from "@reduxjs/toolkit";
import { AnatomicalStructureSubject, InstanceData, Series, Study } from "../_types";

export type InstanceState = {
    studies?: Study[];
    series?: Record<number, Series>;
    instances?: Record<number, InstanceData[]>;
    availableAnatomicalStructureSubjects?: AnatomicalStructureSubject[];
};

const initialState: InstanceState = {
    studies: [], // список исследований
    series: {
        //1: { /* данные для серии с номером 1 */ },
        //2: { /* данные для серии с номером 2 */ },
        // и так далее
    },
    instances: {
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
        getStudiesList(state, action) {
            state.studies = action.payload;
        },
        getSeriesList(state, action) {
					const seriesObject = action.payload.reduce((acc, serie) => {
						acc[serie.number] = {...serie};
						return acc;
				}, {});
            state.series = seriesObject;
        },
        getInstanceList(state, action) {
            state.instances = action.payload;
        },
    },
});

export const { getStudiesList, getSeriesList, getInstanceList } = instanceSlice.actions;

export default instanceSlice.reducer;

export const instanceSelector = (state: { instance: InstanceState }) => state.instance;
