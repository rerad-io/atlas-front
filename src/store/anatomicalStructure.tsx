import { createSlice } from "@reduxjs/toolkit";

export type AnatomicalStructureState = {
	id: string;
	name: string;
	subject: string;
	anatomicalStructureSubjectId: string;
	color: string;
}

//const initialState: AnatomicalStructureState[] = [{
//	id: "id",
//	name: "name",
//	subject: "subject",
//	subjectId: "subjectId",
//	color: "color",
//}];

const initialState: AnatomicalStructureState[] = [
			{
					id: "3ebafa2a-7448-47ba-80fa-5e9ee88f7999",
					name: "структура 1 ",
					subject: "костная ткань",
					anatomicalStructureSubjectId: "3ebafa2a-7448-47ba-80fa-5e9ee88f73d8",
					color: "#00FF12",
			},
			{
					id: "4ebafa2a-7448-47ba-80fa-5e9ee8f76667",
					name: "структура с текстом 2",
					subject: "мышечная ткань",
					anatomicalStructureSubjectId: "4ebafa2a-7448-47ba-80fa-5e9ee88f73d7",
					color: "#d92020",
			},
	];

const anatomicalStructureSlice = createSlice({
	name:"anatomicalStructure",
	initialState,
    reducers: {
			addAnatomicalStructureList(state: AnatomicalStructureState[], action){
				state = action.payload;
			}
		},
}) 

 export const {addAnatomicalStructureList } = anatomicalStructureSlice.actions;

export default anatomicalStructureSlice.reducer;

export const anatomicalStructureSelector = (state:{anatomicalStructure: AnatomicalStructureState[]}) => state.anatomicalStructure;