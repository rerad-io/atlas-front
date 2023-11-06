import s from "./styles.module.scss";

const FrameSelector = ({ frameList, handleClick }) => {
    const slideWidth: number = 80;
    return (
        <section>
            <div className="container">
                <div className={s.slider} style={{ maxWidth: `calc(${frameList?.length}*${slideWidth}px)` }}>
                    <ul className={s.slider_wrapper}>
                        {frameList?.map((slide, index) => (
                            <li
                                key={index}
                                className={s.slide}
                                style={{
                                    maxWidth: `${slideWidth}px`,
                                    maxHeight: `${slideWidth}px`,
                                }}
                                onClick={() => handleClick(index)}
                            >
                                <img src={slide?.path} alt={slide.serie?.id} className={s.slide_img} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FrameSelector;
