import { NavLink } from "react-router-dom";
import styles from "./AdminIndex.module.scss";

const AdminIndex = () => {
    const name = "Full name";
    const role = "Administrator";
    return (
        <>
            <div
                className="container"
                style={{
                    maxWidth: "1920px",
                    padding: "0 15px",
                    margin: "0 auto",
                }}
            >
                <div className={styles.page_wrapper}>
                    <h1>Administration page</h1>
                    <div
                        style={{
                            padding: "20px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <span>You are logged in as:</span>
                        <span>Admin: {name}</span>
                        <span>Role: {role}</span>
                    </div>
                    <nav>
                        <ul className={styles.nav_list}>
                            <li>
                                <NavLink className={styles.nav_link} to="/admin/AnatomicalStructureSubject">
                                    Справочник Тема Анатомической структуры
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={styles.nav_link} to="/admin/AnatomicalStructure">
                                    Справочник Анатомические структуры
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={styles.nav_link} to="/admin/Study">
                                    Исследования
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};
export default AdminIndex;
