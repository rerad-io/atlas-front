import { NavLink } from "react-router-dom";
import s from "./AdminIndex.module.scss";
import StudySeriesItemGallery from "./components/StudySeriesItemGallery";
import StudySeriesItemCurrentFrame from "./components/StudySeriesItemCurrentFrame";
import { gallery_list } from "../data/data";
import { useState } from "react";

const AdminIndex = () => {
    const name = "Full name";
    const role = "Administrator";

    // ======= Перенести после размещения StudySeriesItemGallery и StudySeriesItemCurrentFrame на нужную страницу
    const galleryList: {
        id: string;
        img: string;
        alt: string;
    }[] = gallery_list;
    const [currentFrame, setCurrentFrame] = useState(galleryList[0]);

    const handleClick = (id: string) => {
        const newFrame: {
            id: string;
            img: string;
            alt: string;
        } = galleryList.find((elem) => elem.id === id) as {
					id: string;
					img: string;
					alt: string;
			};
        setCurrentFrame(newFrame);
    };
		//==========
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
						{/*Для страницы Серии ==============================*/}
            <StudySeriesItemGallery galleryList={galleryList} handleClick={handleClick} />
            <section
						className={s.frame_info}
						style={{
							padding: "20px 0",
						}}>
                <div className="container">
                    <div className={s.frame_wrapper}
										style={{
											width:"100%",
											display: "flex",
											alignItems: "flex-start",
											gap:"20px",
										}}>
                        <StudySeriesItemCurrentFrame currentFrame={currentFrame} />
                        <div 
													style={{
														overflow:"hidden",
													}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed adipisci voluptatem corporis qui voluptate
                            veritatis commodi iste est quis vero! Dolorem asperiores eos reprehenderit quisquam nam earum obcaecati
                            repellendus commodi magnam, odio distinctio minima exercitationem ea doloremque labore voluptatibus. Error,
                            nulla expedita omnis maiores veniam temporibus minima fuga tempora neque magnam iure illum, earum vel saepe,
                            animi laudantium! Voluptatem, aut suscipit. Fugiat est, harum iste ipsam explicabo ullam? Dolor consequuntur,
                            perferendis facilis veniam commodi cupiditate voluptatum rem ratione esse magni vel iste. Tempora sint culpa,
                            quasi asperiores sit atque est magni explicabo et quam in ducimus commodi harum placeat veritatis.
                        </div>
                    </div>
                </div>
            </section>
						{/*=============================*/}
        </div>
    );
};
export default AdminIndex;
