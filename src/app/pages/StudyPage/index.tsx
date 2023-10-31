import { useParams } from "react-router-dom";
import s from "./styles.module.scss";

const StudyPage = () => {
    const { id } = useParams<string>();
    return (
        <div className={s.page}>
            <section>
                <div className="container">
                    <h1>Study {id}</h1>
                </div>
            </section>
        </div>
    );
};

export default StudyPage;
