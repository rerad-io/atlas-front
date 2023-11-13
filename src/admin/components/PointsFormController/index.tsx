import { useEffect, useState } from "react";
import { AnatomicalStructure } from "../../../_types";
import s from "./styles.module.scss";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import Button from "../../../components/UI/Button";

export const PointsFormCreate = () => {
    const pointsList = [
        {
            id: "kjhvsrbkrbvkabsrvbrbh",
            name: "Дистальная фаланга мизинца",
            x: 10,
            y: 10,
            color: "pink",
        },
        { id: "kjhvsrbkrbvkabsrvbrss", name: "Дистальная фаланга стопы", x: 40, y: 40, color: "gren" },
    ];

    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAnatomicalStructureList({});
                setAnatomicalStructureList(result);
            } catch (error) {
                console.error("Error fetching AnatomicalStructureList:", error);
            }
        };

        fetchData();
    }, []);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const queryParams = Object.fromEntries(data);
        console.log("🚀 ~ file: index.tsx:46 ~ submit ~ queryParams:", queryParams);
    };

    return (
        <section>
            <div className="container">
                <form className={s.form} onSubmit={submit}>
                    <h3>Форма редактирования / добавления точек </h3>
                    <select name="points">
                        <option value={"all"}>Существующие точки</option>
                        {pointsList.map((el) => (
                            <option key={el.id} value={el.id}>
                                {`${el.name} (${el.x}, ${el.y})`}
                            </option>
                        ))}
                    </select>
                    <select name="points">
                        <option value={"all"}>Существующие точки</option>
                        {anatomicalStructureList?.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                    <div className={s.buttons}>
                        <Button type="submit">Удалить</Button>
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
