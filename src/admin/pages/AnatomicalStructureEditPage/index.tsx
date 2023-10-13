import { useParams } from "react-router-dom";
import s from "./styles.module.scss";
import { useRef, useState } from "react";
import Button from "../../../components/UI/Button";
import toast, { Toaster } from "react-hot-toast";

const AnatomicalStructureEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const [createAnother, setCreateAnother] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const notify = (message: string) => toast(message, { duration: 2000 });

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

        // при успешном сохранении вызвать сообщение
        const isResponseOk: boolean = true;
        if (isResponseOk) {
            notify("структура создана усешно");
        } else {
            notify("ошибка сохранения");
        }
        if (formRef.current) {
            formRef.current.reset();
        }

        //при возрате учесть createAnother
    };

    return (
        <div className={s.page}>
            <div className="container">
                <div className={s.wrapper}>
                    <Toaster />
                    <h1 className="title">{id ? `Редактирование` : `Создание`} Анатомической структуры</h1>
                    <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
                        <label>
                            Theme Name:
                            <input type="text" name="subject" />
                        </label>
                        <label>
                            Theme Color:
                            <input type="color" name="color" />
                        </label>
                        <label>
                            Structure Name:
                            <input type="text" name="structure" />
                        </label>
                        {typeof id === "undefined" ? (
                            <label>
                                Create Another:
                                <input
                                    type="checkbox"
                                    name="createAnother"
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
            </div>
        </div>
    );
};

export default AnatomicalStructureEditPage;
