import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import s from "./styles.module.scss";
import Button from "../../../components/UI/Button";
import { updateItem } from "../../../axios/requestsAnatomicalStructure";

const baseUrl = "https://api/";

const AnatomicalStructureEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [createAnother, setCreateAnother] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const notify = (message: string) => toast(message, { duration: 2000 });

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newStructure: Record<string, string> = {};

        formData.forEach((value, key) => {
            newStructure[key] = value as string;
        });

        //console.log(newStructure);

        // Если id не undefined, то диспатчим на функцию редактирования, если undefined, то диспатчим на создание нового item
        if (newStructure.structure && newStructure.subject) {
            //console.log("🚀 ~ file: index.tsx:36 ~ onSubmitHandler ~ newStructure:", newStructure)
            if (id) {
                updateItem(newStructure, id, "AnatomicalStructure/");
            } else {
                const newStructureId = createStructure(newStructure);
                if (!createAnother) {
                    navigate(`/admin/AnatomicalStructure/${newStructureId}`);
                    //navigate(`/admin/AnatomicalStructure/3ebafa2a-7448-47ba-80fa-5e9ee88f73d1`);
                }
            }
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    };

    const createStructure = (newStructure: unknown) => {
        try {
            axios.post(`${baseUrl}AnatomicalStructure`, newStructure).then((res) => {
                notify("структура создана усешно");
                return res.data.id;
            });
        } catch (error) {
            console.log(error);
            notify("ошибка сохранения");
        }
    };

    return (
        <div className={s.page}>
            <div className="container">
                <div className={s.page_wrapper}>
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
