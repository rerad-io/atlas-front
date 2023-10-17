import s from "./styles.module.scss";
type FrameSelectorProps = {
    frameList: {
        id: string;
        img: string;
        alt: string;
    }[];
    handleClick: (id: string) => void;
};

const FrameSelector = (props: FrameSelectorProps) => {
    const slideWidth: number = 80;
    return (
        <section>
            <div className="container">
                <div className={s.slider} style={{ maxWidth: `calc(${props.frameList.length}*${slideWidth}px)` }}>
                    <ul className={s.slider_wrapper}>
                        {props.frameList.map((slide) => (
                            <li
                                key={slide.id}
                                className={s.slide}
                                style={{
                                    maxWidth: `${slideWidth}px`,
                                    maxHeight: `${slideWidth}px`,
                                }}
                                onClick={() => props.handleClick(slide.id)}
                            >
                                <img src={slide.img} alt={slide.alt} className={s.slide_img} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FrameSelector;
