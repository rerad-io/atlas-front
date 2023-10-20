import Button from "../../../components/UI/Button";
import TableComponent from "../../../components/UI/TableComponent";
// import StudySeriesListItem from "../StudySeriesListItem";
import s from "./s.module.css";

const columns = ["Id", "Study", "Number", "Name", "PreviewFrame", "InstanceCount", "SagitalFrame", "CoronalFrame", "Actions"];

const obj = {
    items: [
        {
            id: "342142143213213",
            study: "8ebafa2a-7448-47ba-80fa-5e9ee88f73d5",
            number: 1,
            name: "свойство name, а в заметке сказано что это описание",
            previewFrame: "previewFrame.jpg",
            instanceCount: 24,
            sagitalFrame: "SagitalFrame.jpg",
            coronalFrame: "CoronalFrame.jpg",
        },
        {
            id: "442142143213213",
            study: "4ebafa2a-7448-47ba-80fa-5e9ee88f73d2",
            number: 1,
            name: "свойство name, а в заметке сказано что это описание",
            previewFrame: "previewFrame1.jpg",
            instanceCount: 24,
            sagitalFrame: "SagitalFrame1.jpg",
            coronalFrame: "CoronalFrame1.jpg",
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

            <Button to="/admin/StudySeries/create">Добавить серию исследования</Button>
            <section className={s.section}>
                <div className="container">
                    <div>
                        {/*<table>
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
                                    <StudySeriesListItem key={el.id} {...el} />
                                ))}
                            </tbody>
                        </table>*/}
												<TableComponent columns={columns} data={obj.items} actions={"/admin/StudySeries/"} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudySeriesList;
