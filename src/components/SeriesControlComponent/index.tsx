import { useSelector } from "react-redux";
import { instanceSelector } from "../../store/instance";
import s from "./styles.module.scss";

export const SeriesControlComponent = () => {
    //const { series, currentSeriesNumber } = useSelector(instanceSelector);
    //console.log("🚀 ~ file: index.tsx:8 ~ SeriesControlComponent ~ currentSeriesNumber:", currentSeriesNumber)
    //console.log("🚀 ~ file: index.tsx:8 ~ SeriesControlComponent ~ series:", series)

    //const changeSerie = (number: number) => {
    //const targetSerie: Series = series[number];
    //setActiveSerie(targetSerie);
    //dispatch(setCurrentSereies(number));
    //};

    return (
        <section>
            {/*<div className="container">
                <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <div>
                            <span style={{ display: "block" }}>Sagital</span>
                            <img
                                style={{ width: "60px", height: "60px" }}
                                src={activeSerie?.sagitalFrame}
                                alt={`Serie ${activeSerie?.name} sagitalFrame`}
                            />
                        </div>
                        <div>
                            <span style={{ display: "block" }}>Coronal</span>
                            <img
                                style={{ width: "60px", height: "60px" }}
                                src={activeSerie?.coronalFrame}
                                alt={`Serie ${activeSerie?.name} coronalFrame`}
                            />
                        </div>
                    </div>
                    <ul style={{ marginTop: "15px", cursor: "pointer", display: "flex", gap: "5px" }}>
                        {Object.values(series).map((item, index) => (
                            <li style={{ textAlign: "center", width: "60px" }} key={index} onClick={() => changeSerie(item.number)}>
                                <span style={{ display: "block" }}>{item.name}</span>
                                {`${item.number === activeSerie?.number ? "(active)" : ""}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>*/}
        </section>
    );
};
