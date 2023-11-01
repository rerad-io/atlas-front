import { NavLink } from "react-router-dom";
import { studiesList } from "../data/data";
import s from "./styles.module.scss";

const AppIndex = () => {
    return (
        <div className={s.page}>
            <section className={s.menu_section}>
                <div className="container">
                    <div className={s.studies_menu}>
                        <h1 className="title">Исследования:</h1>
                        <ul className={s.studies_list}>
                            {studiesList.map((item, index) => (
                                <li className={s.studies_item} key={index}>
                                    <NavLink className={s.link} to={`/${item.id}`}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default AppIndex;
