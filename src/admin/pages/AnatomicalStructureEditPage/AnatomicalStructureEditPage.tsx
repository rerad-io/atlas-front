import { useParams } from "react-router-dom";
import s from "./styles.module.scss";
import { useState } from "react";

const AnatomicalStructureEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const [createAnother, setCreateAnother] = useState(false);

    // if (id) {
    //     console.log("EDIT PAGE");
    // } else {
    //     console.log("CREATE PAGE");
    // }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            obj[key] = value as string;
        });

        console.log(obj);

        // Если id не undefined, то диспатчим на функцию редактирования, если undefined, то диспатчим на создание нового item
        if (id) {
            // Редактирование существующего
        } else {
            // Создание нового
        }

        //при возрате учесть createAnother
    };

    return <div>{id ? `AnatomicalStructureEditPage/${id}` : "AnatomicalStructureEditPage/create"}</div>;
};

export default AnatomicalStructureEditPage;
