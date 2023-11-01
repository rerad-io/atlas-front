import { useParams } from "react-router-dom";
import s from "./styles.module.scss";
import { useEffect, useState } from "react";
import { seriesData, studiesList } from "../../../data/data";

const StudyPage = () => {
    const { id } = useParams<string>();

		const [study, setStudy] = useState<any>({});
		const [series, setSeries] = useState<any[]>([]);
		const [activeSeries, setActiveSeries] = useState<any[]>(series[0]?.list);
		const [activeNumber, setActiveNumber] =useState<string>(series[0]?.id);
	
		useEffect(()=>{
			//получить данные о самом исследовании
			//в ответsetStudyе должен быть массив с записями объекта InstanceData
			//Массив с записями объекта Series
			const fetchData = async () => {
				try {
						//const tempStudy = await getStudyId(id);
						//const tempSeries = await getStudySeriesId(id);
						
						const elem = studiesList.find(elem => elem.id === id);
						setStudy(elem);
						const tempSeries = seriesData;
						setSeries(tempSeries);
				} catch (error) {
						console.error("Error fetching AnatomicalStructureList:", error);
				}
		};

		fetchData();
		},[])

		useEffect(()=> {
			if(series.length){
				setActiveSeries(series[0].list)
				setActiveNumber(series[0].id)
			}
		},[series])

		const handleClick = (id:string)=> {
			const elem = series.find(elem => elem.id === id)
			setActiveNumber(elem.id)
			setActiveSeries(elem.list);
		}
    return (
        <div className={s.page}>
            <section>
                <div className="container">
                    <h1 className="title">Исследование</h1>
										<p>ID: {study?.id}</p>
										<p>name: {study?.name}</p>
                </div>
            </section>
						<section>
							<div className="container">
							<ul style={{display: "flex", gap: "5px"}}>
								{activeSeries?.map((item, index)=>
								<li key={index}>
									<img src={item.img} alt={item.alt} style={{width: "50px", height: "50px", objectFit: "cover"}}/>
								</li>)}
							</ul>
							<ul style={{marginTop: "15px", cursor:"pointer"}}>
								{series.map((item, index)=>
								<li 

								key={index}
								onClick={()=>handleClick(item.id)}>
									{`${item.name} ${item.id === activeNumber ? "(active)": ''}`}
								</li>)}
							</ul>
							</div>
						</section>
        </div>
    );
};

export default StudyPage;
