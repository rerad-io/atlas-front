import { useState, useEffect } from "react";
import s from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { instanceSelector, setCurrentInstanceNumber } from "../../store/instance";

const slideWidth: number = 80;

const FrameSelector = () => {

	const dispatch = useDispatch();
	
	const {instanceData} = useSelector(instanceSelector);
    const [activeFrame, setactiveFrame] = useState(0);

		useEffect(()=>{
			setactiveFrame(0);
		},[])

		const handleCurrentFrame = (index:number, instanceNumber: number) => {
			setactiveFrame(index);
			dispatch(setCurrentInstanceNumber(instanceNumber));
	};
    return (
        <section>
            <div className="container">
                <div className={s.slider} style={{ maxWidth: `calc(${Object.values(instanceData).flat()?.length}*${slideWidth}px)` }}>
                    <ul className={s.slider_wrapper}>
                        {Object.values(instanceData).flat()?.map((slide, index) => (
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
                                {<img src={slide.path} alt={slide.instanceNumber} className={s.slide_img} />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FrameSelector;
