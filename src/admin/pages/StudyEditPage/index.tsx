import { useState } from "react";
import { useParams } from "react-router-dom";
import s from "./s.module.css";
import Button from "../../components/UI/Button";

const StudyEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const [createAnother, setCreateAnother] = useState(false);

    // if (id) {
    //     console.log("EDIT PAGE");
    // } else {
    //     console.log("CREATE PAGE");
    // }
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            obj[key] = value as string;
        });

        const file = formData.get("PreviewFrame") as File;

        if (file && file.type.startsWith("image/")) {
            //промис чтения файла
            obj["PreviewFrame"] = Date.now() + "_" + file.name;

            // функция сохранения изображение на сервак - раскоментировать вместе с функцией readFile
            // const imgData = await readFile(file);
            // SAVE_IMAGE_FUNCTION(imgData);
        }

        console.log(obj);

        if (id) {
            // Редактирование существующего исследования
        } else {
            // Создание нового исследования
        }

        // при возврате учти createAnother
    };

    //  чтение файла - раскоментировать когда будем реализовывать сохранение файла
    // const readFile = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             resolve(e.target.result as string);
    //         };

    //         reader.onerror = (error) => {
    //             reject(error);
    //         };

    //         reader.readAsDataURL(file);
    //     });
    // };

    return (
        <div className={s.wrap}>
            <form onSubmit={onSubmitHandler} className={s.form}>
                <label htmlFor="studyName">
                    Study Name:
                    <input type="text" name="Name" id="studyName" />
                </label>
                <label htmlFor="studyDescription">
                    Study Description:
                    <textarea id="studyDescription" name="Description" rows={4} cols={50}></textarea>
                </label>
                <input type="file" name="PreviewFrame" accept="image/*"></input>
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

export default StudyEditPage;
