import s from "./styles.module.scss";

type StudySeriesItemCurrentFrameProps = {
    currentFrame: {
        id: string;
        img: string;
        alt: string;
    };
};

const StudySeriesItemCurrentFrame = (props: StudySeriesItemCurrentFrameProps) => {
    return (
        <div className={s.current_frame}>
            <img src={props.currentFrame.img} alt={props.currentFrame.alt} />
        </div>
    );
};

export default StudySeriesItemCurrentFrame;
