import { useParams } from "react-router-dom";
import s from "./s.module.css";
import { useState } from "react";
import Button from "../../../components/UI/Button";
import { gallery_list } from "../../../data/data";
import StudySeriesItemGallery from "../../components/StudySeriesItemGallery";
import StudySeriesItemCurrentFrame from "../../components/StudySeriesItemCurrentFrame";

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

    // ======= Перенести после размещения StudySeriesItemGallery и StudySeriesItemCurrentFrame на нужную страницу
    const galleryList: {
        id: string;
        img: string;
        alt: string;
    }[] = gallery_list;
    const [currentFrame, setCurrentFrame] = useState(galleryList[0]);

    const handleClick = (id: string) => {
        const newFrame: {
            id: string;
            img: string;
            alt: string;
        } = galleryList.find((elem) => elem.id === id) as {
            id: string;
            img: string;
            alt: string;
        };
        setCurrentFrame(newFrame);
    };
    //==========

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

            {/*Для страницы Серии ==============================*/}
            <StudySeriesItemGallery galleryList={galleryList} handleClick={handleClick} />
            <section
                className={s.frame_info}
                style={{
                    padding: "20px 0",
                }}
            >
                <div className="container">
                    <div
                        className={s.frame_wrapper}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "20px",
                        }}
                    >
                        <StudySeriesItemCurrentFrame currentFrame={currentFrame} />
                        <div
                            style={{
                                overflow: "hidden",
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed adipisci voluptatem corporis qui voluptate
                            veritatis commodi iste est quis vero! Dolorem asperiores eos reprehenderit quisquam nam earum obcaecati
                            repellendus commodi magnam, odio distinctio minima exercitationem ea doloremque labore voluptatibus. Error,
                            nulla expedita omnis maiores veniam temporibus minima fuga tempora neque magnam iure illum, earum vel saepe,
                            animi laudantium! Voluptatem, aut suscipit. Fugiat est, harum iste ipsam explicabo ullam? Dolor consequuntur,
                            perferendis facilis veniam commodi cupiditate voluptatum rem ratione esse magni vel iste. Tempora sint culpa,
                            quasi asperiores sit atque est magni explicabo et quam in ducimus commodi harum placeat veritatis.
                        </div>
                    </div>
                </div>
            </section>
            {/*=============================*/}
        </div>
    );
};

export default StudySeriesEditPage;
