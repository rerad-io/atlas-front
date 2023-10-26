import Button from "../../../components/UI/Button";
import { useState } from "react";
import s from "./styles.module.scss";
import { searchAnatomicalStructure } from "../../../requests/anatomicalStructureRequests";

const AnatomicalStructureForm = ({ setAnatomicalStructureList }) => {
    const [value, setValue] = useState<string>("");

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchName = e.currentTarget.name.value;
        if (searchName) {
            const fetchData = async () => {
                try {
                    const result = await searchAnatomicalStructure(searchName);
                    setAnatomicalStructureList(result);
                } catch (error) {
                    console.error("Error fetching Search AnatomicalStructure:", error);
                }
            };

            fetchData();
            setValue("");
        }
    };

    return (
        <>
            <form className={s.form} onSubmit={submit}>
                <h2>Фильтры</h2>
                <label>
                    Название:
                    <input type="input" name="name" placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)} />
                </label>

                <Button type="submit">Применить</Button>
            </form>
        </>
    );
};

export default AnatomicalStructureForm;
