import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instanceSelector, setCurrentInstanceNumber } from "../../store/instance";
import { InstanceData } from "../../_types";
import s from "./styles.module.scss";

const slideWidth: number = 80;

// DONE: InstanceData это информация о точках. Их ненужно сюда добавлять. Сюда следует передать
//externalId
//seriesNumber
//instanceCount, именно в этом поле указывается количество кадров, начиная с одного

type Props = {
    instances?: InstanceData[];
};

const FrameSelectorComponent = ({ instances }: Props) => {
    const dispatch = useDispatch();

    const { currentInstanceData } = useSelector(instanceSelector);
    const [instancesFrame, setInstancesFrame] = useState<InstanceData[]>([]);
    console.log("🚀 ~ file: index.tsx:19 ~ FrameSelectorComponent ~ instancesFrame:", instancesFrame);
    const [activeFrame, setActiveFrame] = useState(0);

    useEffect(() => {
        if (instances?.length) {
            setInstancesFrame(instances);
        } else {
            setInstancesFrame(Object.values(currentInstanceData).flat());
        }
        setActiveFrame(0);

        return () => {
            setInstancesFrame([]);
            setActiveFrame(0);
        };
    }, [instances, currentInstanceData]);

    const handleCurrentFrame = (index: number, instanceNumber: number) => {
        setActiveFrame(index);
        dispatch(setCurrentInstanceNumber(instanceNumber));
    };
    return (
        <section>
            <div className="container">
                <div className={s.slider} style={{ maxWidth: `calc(${instancesFrame?.length}*${slideWidth}px)` }}>
                    <ul className={s.slider_wrapper}>
                        {instancesFrame?.map((slide, index) => (
                            <li
                                key={index}
                                className={`${s.slide} ${s[activeFrame === index ? "active" : ""] || ""}`}
                                style={{
                                    maxWidth: `${slideWidth}px`,
                                    maxHeight: `${slideWidth}px`,
                                    color: "white",
                                }}
                                onClick={() => handleCurrentFrame(index, slide.instanceNumber)}
                            >
                                {<img src={slide.path} alt={`${slide.instanceNumber}`} className={s.slide_img} />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FrameSelectorComponent;
