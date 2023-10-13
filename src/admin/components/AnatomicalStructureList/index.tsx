import AnatomicalStructureItem from "../AnatomicalStructureItem";
import s from "./styles.module.scss";

type AnatomicalStructureListProps = {
    structureList: {
        id: string;
        name: string;
        subject: string;
        anatomicalStructureSubjectId: string;
        color: string;
    }[];
};

const AnatomicalStructureList = (props: AnatomicalStructureListProps) => {
    return (
        <section className={s.section}>
            <div className="container">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className={s.table_head}>Name</th>
                                <th className={s.table_head}>Thema</th>
                                <th className={s.table_head}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.structureList.map((el) => (
                                <AnatomicalStructureItem key={el.id} {...el} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AnatomicalStructureList;
