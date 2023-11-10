import { WhiteBoardCanvas } from "../WhiteBoardCanvas";
import s from "./styles.module.scss";

const RenderComponent = () => {
    return (
        <section className={s.frame_info}>
            <div className="container">
                <div className={s.current_frame}>
                    <WhiteBoardCanvas />
                </div>
            </div>
        </section>
    );
};

export default RenderComponent;
