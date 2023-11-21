import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { instanceSelector, setCurrentInstanceNumber, setCurrentSereies } from "../../../store/instance";
import { Series } from "../../../_types";
import { backendUrl_2 } from "../../../requests/backendUrl";
import s from "./styles.module.scss";

export const SeriesControlComponent = () => {
    const dispatch = useDispatch();
    const { study, series, currentSeriesNumber } = useSelector(instanceSelector);

    const [currentSerie, setCurrentSerie] = useState<Series>({});

    const sagital =
        Object.values(series)[0]?.number === currentSeriesNumber
            ? `${backendUrl_2}api/file/content/atlas/${study.externalId}/${currentSerie?.sagitalFrame}`
            : "";

    const coronal =
        Object.values(series)[0]?.number === currentSeriesNumber
            ? `${backendUrl_2}api/file/content/atlas/${study.externalId}/${currentSerie?.coronalFrame}`
            : "";

    useEffect(() => {
        setCurrentSerie(Object.values(series)?.find((item) => item.number === currentSeriesNumber));
    }, [series, currentSeriesNumber]);

    const changeSerie = (number: number) => {
        dispatch(setCurrentSereies(number));
        dispatch(setCurrentInstanceNumber(1));
    };

    return (
        <section>
            <div className="container">
                <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <div>
                            <span style={{ display: "block", textAlign: "center" }}>Sagital</span>
                            <div className={s.preview}>
                                <img style={{ width: "60px", height: "60px" }} src={sagital} alt={`sagitalFrame`} />
                            </div>
                        </div>
                        <div>
                            <span style={{ display: "block", textAlign: "center" }}>Coronal</span>
                            <div className={s.preview}>
                                <img style={{ width: "60px", height: "60px" }} src={coronal} alt={`coronalFrame`} />
                            </div>
                        </div>
                    </div>
                    <ul style={{ marginTop: "15px", cursor: "pointer", display: "flex", gap: "5px" }}>
                        {Object.values(series).map((item, index) => (
                            <li
                                style={{ textAlign: "center", width: "80px", flexShrink: "0" }}
                                key={index}
                                onClick={() => changeSerie(item.number)}
                            >
                                <span style={{ display: "block" }}>{item.name}</span>
                                {`${item.number === currentSerie?.number ? "(active)" : ""}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
