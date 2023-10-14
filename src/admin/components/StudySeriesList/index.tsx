import StudySeriesListItem from "../StudySeriesListItem";
import s from "./s.module.css";

const obj = {
    items: [
        {
            Id: "342142143213213",
            Study: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            Number: 1,
            Name: "свойство name, а в заметке сказано что это описание",
            PreviewFrame: "previewFrame.jpg",
            InstanceCount: 24,
            SagitalFrame: "SagitalFrame.jpg",
            CoronalFrame: "CoronalFrame.jpg",
        },
        {
            Id: "442142143213213",
            Study: "4ebafa2a-7448-47ba-80fa-5e9ee88f73d2",
            Number: 1,
            Name: "свойство name, а в заметке сказано что это описание",
            PreviewFrame: "previewFrame1.jpg",
            InstanceCount: 24,
            SagitalFrame: "SagitalFrame1.jpg",
            CoronalFrame: "CoronalFrame1.jpg",
        },
    ],
};

// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// !!!!!          уточнить как происходит связь исследования с серией иследования             !!!!!!!!!!!!
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------

const StudySeriesList = () => {
    return (
        <div className={s.page}>
            <h3>Список серий исследования</h3>

            <section className={s.section}>
                <div className="container">
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className={s.table_head}>Id</th>
                                    <th className={s.table_head}>Study</th>
                                    <th className={s.table_head}>Number</th>
                                    <th className={s.table_head}>Name</th>
                                    <th className={s.table_head}>PreviewFrame</th>
                                    <th className={s.table_head}>InstanceCount</th>
                                    <th className={s.table_head}>SagitalFrame</th>
                                    <th className={s.table_head}>CoronalFrame</th>
                                    <th className={s.table_head}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj.items.map((el) => (
                                    <StudySeriesListItem key={el.Id} {...el} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudySeriesList;
