import s from "./styles.module.scss";

const RenderComponent = ({ currentFrame }) => {
    return (
        <section className={s.frame_info}>
            <div className="container">
                <div className={s.current_frame}>
                    <img src={currentFrame?.path} alt={currentFrame?.id} />
                </div>
            </div>
        </section>
    );
};

export default RenderComponent;
