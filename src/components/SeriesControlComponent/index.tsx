import { useDispatch, useSelector } from "react-redux";
import {useState, useEffect} from "react";
import { instanceSelector, setCurrentSereies } from "../../store/instance";
import { Series } from "../../_types";

type Props={
	studySerie: Series;
}

export const SeriesControlComponent = ({studySerie}:Props) => {

	const dispatch = useDispatch();
    const { series, currentSeriesNumber } = useSelector(instanceSelector);
	
		const [currentSerie, setCurrentSerie] = useState<Series>({});
	
		useEffect(()=>{
			if(Object.keys(series).length){
				setCurrentSerie(Object.values(series).find(item => item.number ===currentSeriesNumber));
			} else {
				setCurrentSerie(studySerie);
			}
		},[studySerie, series,currentSeriesNumber])

    const changeSerie = (number: number) => {
    dispatch(setCurrentSereies(number));
    };

    return (
        <section>
            <div className="container">
                <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <div>
                            <span style={{ display: "block" }}>Sagital</span>
                            <img
                                style={{ width: "60px", height: "60px" }}
                                src={currentSerie?.sagitalFrame}
                                alt={`Serie ${currentSerie?.name} sagitalFrame`}
                            />
                        </div>
                        <div>
                            <span style={{ display: "block" }}>Coronal</span>
                            <img
                                style={{ width: "60px", height: "60px" }}
                                src={currentSerie?.coronalFrame}
                                alt={`Serie ${currentSerie?.name} coronalFrame`}
                            />
                        </div>
                    </div>
                    <ul style={{ marginTop: "15px", cursor: "pointer", display: "flex", gap: "5px" }}>
                        {Object.values(series).map((item, index) => (
                            <li 
														style={{ textAlign: "center", width: "80px", flexShrink: "0" }} 
														key={index} 
														onClick={() => changeSerie(item.number)}>
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
