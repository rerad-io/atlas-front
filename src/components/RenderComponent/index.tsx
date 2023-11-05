import s from "./styles.module.scss";

type RenderComponentProps = {
    currentFrame: {
        id: string;
        img: string;
        alt: string;
    };
};

const RenderComponent = (props: RenderComponentProps) => {
    return (
        <div className={s.current_frame}>
            <img src={props.currentFrame.img} alt={props.currentFrame.alt} />
        </div>
    );
};

export default RenderComponent;
