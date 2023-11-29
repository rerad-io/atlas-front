import s from "./styles.module.scss";
const slideWidth: number = 80;
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
    instancesFrame: string[];
    activeFrame: number;
    handleCurrentFrame?: (index: number) => void;
};

export const Slider = ({ instancesFrame, activeFrame, handleCurrentFrame }: Props) => {
    return (
        <Swiper
            className={s.slider_wrapper}
            style={{
                //width: "500px",
                height: `${slideWidth}px`,
            }}
            spaceBetween={1}
            mousewheel={true}
            scrollbar={{ draggable: true }}
        >
            {instancesFrame?.map((slide: string, index: number) => (
                <SwiperSlide
                    key={index}
                    className={`${s.slide} ${s[activeFrame === index + 1 ? "active" : ""] || ""}`}
                    style={{
                        height: `${slideWidth}px`,
                        color: "white",
                    }}
                    onClick={() => handleCurrentFrame(index + 1)}
                >
                    {<img src={slide} alt="#foto" className={s.slide_img} />}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
