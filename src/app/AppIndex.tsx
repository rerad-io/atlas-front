import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./styles.module.scss";
import { getStudyList } from "../requests/StudyRequests";
import { setStudiesList } from "../store/instance";

const AppIndex = () => {
    const { studies } = useSelector((store) => store.instance);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studiesList = await getStudyList();
                dispatch(setStudiesList(studiesList));
            } catch (error) {
                console.error("Error fetching AppIndex:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className={s.page}>
            <section className={s.menu_section}>
                <div className="container">
                    <div className={s.studies_menu}>
                        <h1 className="title">Исследования:</h1>
                        <ul className={s.studies_list}>
                            {studies?.map((item, index) => (
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
