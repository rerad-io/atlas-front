import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../../components/UI/Button";
import AnatomicalStructureList from "../../components/AnatomicalStructureList";
import s from "./s.module.scss";

const baseUrl = "https://api/";

const AnatomicalStructureSubjectEditPage = () => {
	const { id } = useParams<string>();
	const navigate = useNavigate();
	const [createAnother, setCreateAnother] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const notify = (message: string) => toast(message, { duration: 2000 });
	
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newSubject: Record<string, string> = {};

        formData.forEach((value, key) => {
					newSubject[key] = value as string;
        });

				
				if(newSubject.name){
					if (id) {
							updateSubject(newSubject);
					} else {
						const newSubjectId = createSubject(newSubject);
						if(!createAnother){
							navigate(`/admin/AnatomicalStructureSubject/${newSubjectId}`);
							//navigate(`/admin/AnatomicalStructureSubject/3ebafa2a-7448-47ba-80fa-5e9ee88f7999`);
						}
					}
					if (formRef.current) {
            formRef.current.reset();
        }
				}
    }
		
		const updateSubject = (updatedData: unknown) =>{
			try {
				axios.put(`${baseUrl}AnatomicalStructureSubject${id}`, updatedData)
				.then(res=> {
					console.log(res.data);		
					notify("изменение успешно");
				});
			} catch (error) {
				console.log(error);
				notify("ошибка сохранения");
			}
		}

		const createSubject =(newSubject: unknown) =>{
			try {
				axios.post(`${baseUrl}AnatomicalStructureSubject`, newSubject)
				.then(res=> {
					notify("тема создана усешно");	
					return res.data.id
				});
			} catch (error) {
				console.log(error);
				notify("ошибка сохранения");
			}
		}

    return (
        <div className={s.page}>
            <div className="container">
                <h1 className="title">{id ? "Редактировать" : "Создать"} тему</h1>
                <form ref={formRef} onSubmit={onSubmitHandler} className={s.form}>
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
            {id ? <AnatomicalStructureList subjectId={id} /> : null}
        </div>
    );
};

export default AnatomicalStructureSubjectEditPage;
