import Button from "../../../components/UI/Button";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { getAnatomicalStructureSubjectList } from "../../../requests/anatomicalStructureSubjectRequests";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnatomicalStructure, AnatomicalStructureSubject } from "../../../_types";
import toast, { Toaster } from "react-hot-toast";
import s from "./styles.module.scss";

type Props = {
    setAnatomicalStructureList: Dispatch<SetStateAction<AnatomicalStructure[]>>;
};
const columns = [
    {
        value: "name",
        name: "Название структуры",
    },
    {
        value: "Thema",
        name: "Тема",
    },
];
const AnatomicalStructureForm = ({ setAnatomicalStructureList }: Props) => {
    const [anatomicalStructureSubjectList, setAnatomicalStructureSubjectList] = useState<AnatomicalStructureSubject[]>([]);

    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

    useEffect(() => {
        const fetchDataAndSetAnatomicalStructureSubject = async () => {
            try {
                const result: AnatomicalStructureSubject[] = await getAnatomicalStructureSubjectList();
                setAnatomicalStructureSubjectList(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureForm:", error);
            }
        };
        fetchDataAndSetAnatomicalStructureSubject();
    }, []);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const queryParams = Object.fromEntries(data);

        if (queryParams) {
            const fetchData = async () => {
                try {
                    const result = await getAnatomicalStructureList(queryParams);
                    setAnatomicalStructureList(result);
                } catch (error) {
                    notifyError("ошибка сортировки");
                    console.error("Error fetching Search AnatomicalStructure:", error);
                }
            };

            fetchData();
        }
    };

    return (
        <form className={s.form} onSubmit={submit}>
            <Toaster />
            <h2>Фильтры</h2>
            <label>
                Название
                <input type="input" name="name" placeholder="Search..." />
            </label>
            <label>
                Тема
                <select name="anatomicalStructureSubjectId" defaultValue={"all"}>
                    <option value={"all"}>все</option>
                    {anatomicalStructureSubjectList.map((el) => (
                        <option key={el.id} value={el.id}>
                            {el.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Сортировка
                <select name="orderBy" defaultValue={"name"}>
                    {columns.map((el, index) => (
                        <option key={index} value={el.value}>
                            {el.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Направление сортировки
                <select name="orderByDirection" defaultValue={"asc"}>
                    <option value={"asc"}>от А до Я</option>
                    <option value={"desc"}>от Я до А</option>
                </select>
            </label>

            <Button type="submit">Применить</Button>
        </form>
    );
};

export default AnatomicalStructureForm;
