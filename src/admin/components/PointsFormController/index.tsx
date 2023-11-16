import { useEffect, useState } from "react";
import { AnatomicalStructure, InstanceData } from "../../../_types";
import { getAnatomicalStructureList } from "../../../requests/anatomicalStructureRequests";
import Button from "../../../components/UI/Button";
import toast, { Toaster } from "react-hot-toast";
import { deleteInstanceData } from "../../../requests/instanceDataRequests";
import s from "./styles.module.scss";

export const PointsFormController = ({
    handleSubmit,
    instances,
}: {
    handleSubmit: (anatomicalStructure: AnatomicalStructure) => void;
    instances: InstanceData[];
}) => {
    const [anatomicalStructureList, setAnatomicalStructureList] = useState<AnatomicalStructure[]>([]);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string>();
    const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure>();

    const notifySuccess = (message: string) => toast.success(message, { duration: 2000 });
    const notifyError = (message: string) => toast.error(message, { duration: 2000 });

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

    const handleSelectInstance = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedId = event.currentTarget.value;
        setSelectedInstanceId(selectedId);
    };
    const handleSelectStructure = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedIndex = +event.currentTarget.value;
        if (selectedIndex) setSelectedStructure(anatomicalStructureList[selectedIndex]);
    };

    const handleRemove = async () => {
        if (selectedInstanceId) {
            const isAlert = confirm("уверены что хотите удалить структуру из исследования?");
            if (isAlert) {
                try {
                    const result = await deleteInstanceData(selectedInstanceId);
                    if (result === 204) {
                        notifySuccess("структура удалена из инстанса!");
                    } else {
                        notifyError("ошибка удаления структуры!");
                    }
                } catch (error) {
                    notifyError("ошибка удаления структуры!");
                    console.error("Error fetching PointsFormController:", error);
                }
            }
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedStructure) handleSubmit(selectedStructure);
    };

    return (
        <section>
            <div className="container">
                <Toaster />
                <form className={s.form} onSubmit={submit}>
                    <h3>Форма редактирования / добавления точек </h3>
                    <label>
                        Существующие точки
                        <select name="points" onChange={handleSelectInstance}>
                            <option value="">без значения</option>
                            {instances?.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {`${el.structure} (${el.x}, ${el.y})`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Анатомические структуры
                        <select name="structure" onChange={handleSelectStructure} required>
                            <option value="">без значения</option>
                            {anatomicalStructureList?.map((el, index) => (
                                <option key={el.id} value={index}>
                                    {el.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className={s.buttons}>
                        <Button type="button" onClick={handleRemove}>
                            Удалить
                        </Button>
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};
