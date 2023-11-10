import { useState } from "react";
import s from "./styles.module.scss";

const FrameSelector = ({ frameList, handleCurrentFrame }) => {
    const [activeFrame, setactiveFrame] = useState(0);

    const handleFrameActive = (frameIndex: string) => {
        setactiveFrame(frameIndex);
        handleCurrentFrame(frameIndex);
    };
    const slideWidth: number = 80;
    return (
        <section>
            <div className="container">
                <div className={s.slider} style={{ maxWidth: `calc(${frameList?.length}*${slideWidth}px)` }}>
                    <ul className={s.slider_wrapper}>
                        {frameList?.map((slide, index) => (
                            <li
                                key={index}
                                className={`${s.slide} ${s[activeFrame === index ? "active" : ""] || ""}`}
                                style={{
                                    maxWidth: `${slideWidth}px`,
                                    maxHeight: `${slideWidth}px`,
                                    color: "white",
                                }}
                                onClick={() => handleFrameActive(index)}
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
