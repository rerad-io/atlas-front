import { useState } from "react";
import { useParams } from "react-router-dom";
import s from "./s.module.css";
import Button from "../../components/UI/Button";

const AnatomicalStructureSubjectEditPage = () => {
    const { id } = useParams<{ id: string }>(); // прорисать правильный роут (Done)
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

    return (
        <div className={s.wrap}>
            <form onSubmit={onSubmitHandler} className={s.form}>
                <label htmlFor="themeName">
                    Theme Name:
                    <input type="text" name="name" id="themeName" />
                </label>
                <label htmlFor="themeColor">
                    Theme Color:
                    <input type="color" name="color" id="themeColor" />
                </label>
                {typeof id === "undefined" ? (
                    <label htmlFor="createAnother">
                        Create Another:
                        <input
                            type="checkbox"
                            name="createAnother"
                            id="createAnother"
                            defaultChecked={createAnother}
                            onChange={() => {
                                setCreateAnother(!createAnother);
                            }}
                        />
                    </label>
                ) : null}
                <Button>Save</Button>
            </form>
        </div>
    );
};

export default AnatomicalStructureSubjectEditPage;
