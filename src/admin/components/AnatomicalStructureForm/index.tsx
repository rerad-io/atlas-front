import Button from "../../../components/UI/Button";
import s from "./styles.module.scss";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import { getAnatomicalStructureSubjectList } from "../../../requests/anatomicalStructureSubjectRequests";
import { useEffect, useState } from "react";

const AnatomicalStructureForm = ({ anatomicalStructureList, setAnatomicalStructureList }) => {
    const [anatomicalStructureSubjectList, setAnatomicalStructureSubjectList] = useState([]);

    useEffect(() => {
        const fetchDataAndSetAnatomicalStructureSubject = async () => {
            try {
                const result = await getAnatomicalStructureSubjectList();
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
                    console.error("Error fetching Search AnatomicalStructure:", error);
                }
            };

            fetchData();
        }
    };

    return (
        <>
            <form className={s.form} onSubmit={submit}>
                <h2>Фильтры</h2>
                <label>
                    Название:
                    <input type="input" name="name" placeholder="Search..." />
                </label>
                <label>
                    Тема:
                    <select name="anatomicalStructureSubjectId">
                        <option disabled selected>
                            default
                        </option>
                        {anatomicalStructureSubjectList.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Сортировка:
                    <select name="orderBy">
                        <option disabled selected>
                            default
                        </option>
                        {anatomicalStructureList.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Направление сортировки:
                    <select name="orderByDirection">
                        <option disabled>default</option>
                        <option value={"asc"} selected>
                            asc
                        </option>
                        <option value={"desc"}>desc</option>
                    </select>
                </label>

                <Button type="submit">Применить</Button>
            </form>
        </>
    );
};

export default AnatomicalStructureForm;
