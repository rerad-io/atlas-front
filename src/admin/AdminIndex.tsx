import { NavLink } from "react-router-dom";
import s from "./AdminIndex.module.scss";

const AdminIndex = () => {
    const name = "Full name";
    const role = "Administrator";

    return (
        <div className={s.page}>
            <section className={s.menu_section}>
                <div className="container">
                    <div className={s.page_wrapper}>
                        <h1>Administration page</h1>
                        <div className={s.subtitle}>
                            <span>You are logged in as:</span>
                            <span>Admin: {name}</span>
                            <span>Role: {role}</span>
                        </div>
                        <nav>
                            <ul className={s.nav_list}>
                                <li>
                                    <NavLink className={s.nav_link} to="/admin/AnatomicalStructureSubject">
                                        Справочник Тема Анатомической структуры
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={s.nav_link} to="/admin/AnatomicalStructure">
                                        Справочник Анатомические структуры
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={s.nav_link} to="/admin/Study">
                                        Исследования
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default AdminIndex;
