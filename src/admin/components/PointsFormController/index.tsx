import { useEffect, useState } from "react";
import { AnatomicalStructure, InstanceData } from "../../../_types";
import Button from "../../../components/UI/Button";
import s from "./styles.module.scss";

type PointsFormControllerProps = {
    currentInstancesList: InstanceData[];
    anatomicalStructureList: AnatomicalStructure[];
    handleSubmit: (anatomicalStructure: AnatomicalStructure) => void;
    handleRemove: (instanceId: string) => void;
    handleApprove: (instanceId: string) => void;
};
export const PointsFormController = ({
    anatomicalStructureList,
    currentInstancesList,
    handleApprove,
    handleRemove,
    handleSubmit,
}: PointsFormControllerProps) => {
    const [selectedInstanceId, setSelectedInstanceId] = useState<string>("");
    const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure>();
    const [frameSize, setFameSize] = useState<{ width: number; height: number }>({
        width: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.3,
        height: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.3,
    });

    useEffect(() => {
        const handleResize = () => {
            setFameSize({
                width: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.3,
                height: window.innerWidth <= 992 ? window.innerWidth : window.innerWidth * 0.3,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSelectInstance = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedId = event.currentTarget.value;
        setSelectedInstanceId(selectedId);
    };

    const handleSelectStructure = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedIndex = +event.currentTarget.value;
        if (selectedIndex >= 0) setSelectedStructure(anatomicalStructureList[selectedIndex]);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedStructure) handleSubmit(selectedStructure);
    };

    return (
        <section className={s.form_wrapper} style={{ maxWidth: frameSize.width }}>
            <form className={s.form} onSubmit={submit}>
                <h3>Добавление инстанса </h3>
                <div className={s.form_content}>
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
                    <div className={s.btn_wrapper}>
                        <Button type="submit">Сохранить</Button>
                    </div>
                </div>
            </form>
            <div className={s.form}>
                <h3>Редактирование инстанса </h3>
                <div className={s.form_content}>
                    <label>
                        Размещенные инстансы
                        <select name="points" onChange={handleSelectInstance}>
                            <option value="">без значения</option>
                            {currentInstancesList?.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {`${el.structureName} (${el.x}, ${el.y}) ${el.status === "UNVERIFIED" ? "(не подтверждено)" : ""}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className={s.btn_wrapper}>
                        <Button type="button" onClick={() => handleApprove(selectedInstanceId)}>
                            Подтвердить
                        </Button>
                        <Button type="button" onClick={() => handleRemove(selectedInstanceId)}>
                            Удалить
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
