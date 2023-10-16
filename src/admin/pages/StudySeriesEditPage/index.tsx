import { useParams } from "react-router-dom";
import s from "./s.module.css";
import Button from "../../../components/UI/Button";

const StudySeriesEditPage = () => {
    const { Id } = useParams<{ Id: string }>();

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const obj: Record<string, string> = {};

        formData.forEach((value, key) => {
            obj[key] = value as string;
        });

        const file_preview = formData.get("PreviewFrame") as File;
        const file_sagital = formData.get("SagitalFrame") as File;
        const file_coronal = formData.get("CoronalFrame") as File;

        if (file_preview && file_preview.type.startsWith("image/")) {
            //промис чтения файла
            obj["PreviewFrame"] = Date.now() + "_P" + file_preview.name;
            obj["SagitalFrame"] = Date.now() + "_S" + file_sagital.name;
            obj["CoronalFrame"] = Date.now() + "_C" + file_coronal.name;

            // функция сохранения изображение на сервак - раскоментировать вместе с функцией readFile
            // const imgData = await readFile(file);
            // SAVE_IMAGE_FUNCTION(imgData);
        }

        console.log(obj);

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

    // Id	Study	Number	Name	PreviewFrame	InstanceCount	SagitalFrame	CoronalFrame
    return (
        <div className={s.page}>
            <h1>Редактирование Серии Исследования</h1>
            <form onSubmit={onSubmitHandler} className={s.form}>
                <label htmlFor="Study">
                    Study:
                    <input type="text" name="Name" id="Study" defaultValue={Id} />
                </label>
                <label htmlFor="studyNumber">
                    Study Number:
                    <input type={"number"} id="studyNumber" name="namber" />
                </label>
                <label htmlFor="PreviewFrame">
                    Preview Frame:
                    <input type="file" name="PreviewFrame" id="PreviewFrame" accept="image/*"></input>
                </label>
                <label htmlFor="SagitalFrame">
                    Sagital Frame:
                    <input type="file" name="SagitalFrame" id="SagitalFrame" accept="image/*"></input>
                </label>
                <label htmlFor="CoronalFrame">
                    Coronal Frame:
                    <input type="file" name="CoronalFrame" id="CoronalFrame" accept="image/*"></input>
                </label>

                <Button>Save</Button>
            </form>
        </div>
    );
};

export default StudySeriesEditPage;
