import axios from 'axios';
import { useEffect, useState } from 'react';

export const Home = () => {
    // const nullValue = null;
    const [data, setData] = useState([]);
    // const [year, setYear] = useState('');

    const fetchData = async () => {
        try {
            const result = await axios.get('https://api.spacexdata.com/v3/launches?limit=100');
            console.log("result", result.data);
            setData(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // const renderData = () => { }

    const handelYearFilter = async e => {
        e.preventDefault();
        console.log("Click Year successful");
        console.log(e.target.value);
        let year = e.target.value;
        try {
            const result = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${year}`);
            console.warn("filter data",result.data);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    } 
    
    const handelLanuch = async e => {
        e.preventDefault();
        console.log("Click Lanuch Successfully");
        let lanuch = e.target.value;
        console.log(e.target.value);

        try {
            const result = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=${lanuch}&land_success=true`);
            console.log("Launch data",result.data);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }

    }

    const handelLanding = async e => {
        e.preventDefault();
        console.log("Click Landing Successfully");
        let land = e.target.value;
        console.log(e.target.value);

        try {
            const result = await axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=${land}`);
            console.log("Landing data",result.data);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <div className="grid-container">
                <div className="item1" style={{textAlign: 'start'}}> <span className="heading">SpaceX launches program</span>  </div>
                <div className="item2 bg-color">
                    <p className="fil" style={{textAlign: 'start'}}>   Filters</p>
                    <label className="filter_label">Launch Year</label>
                    <hr></hr>
                    <div className='grid-button-container'>
                        
                            <button onClick={ handelYearFilter} value={"2006"}>2006</button>
                            <button onClick={ handelYearFilter} value={"2007"}>2007</button>
                            <button onClick={ handelYearFilter} value={"2008"}>2008</button>
                            <button onClick={ handelYearFilter} value={"2009"}>2009</button>
                            <button onClick={ handelYearFilter} value={"2010"}>2010</button>
                            <button onClick={ handelYearFilter} value={"2011"}>2011</button>
                            <button onClick={ handelYearFilter} value={"2012"}>2012</button>
                            <button onClick={ handelYearFilter} value={"2013"}>2013</button>
                            <button onClick={ handelYearFilter} value={"2014"}>2014</button>
                            <button onClick={ handelYearFilter} value={"2015"}>2015</button>
                            <button onClick={ handelYearFilter} value={"2016"}>2016</button>
                            <button onClick={ handelYearFilter} value={"2017"}>2017</button>
                            <button onClick={ handelYearFilter} value={"2018"}>2018</button>
                            <button onClick={ handelYearFilter} value={"2019"}>2019</button>
                            <button onClick={ handelYearFilter} value={"2020"}>2020</button>
                        
                    </div>
                    <label className="filter_label">Successful Launch</label>
                    <hr></hr>
                    <div className='grid-button-container'>
                        <button onClick={handelLanuch} value={"true"}>True</button>
                        <button onClick={handelLanuch} value={"false"}>False</button>
                    </div>
                    <label className='filter_label'>Successful Landing</label>
                    <hr></hr>
                    <div className='grid-button-container'>
                        <button onClick={handelLanding} value={"true"}>True</button>
                        <button onClick={handelLanding} value={"false"}>False</button>
                    </div>
                </div>
                <div className="item3 grid-containers">
                    {
                        data.map((el) => {
                            return (
                                <div className="grid-item" key={el.flight_number}>
                                    <img src={el.links.mission_patch_small} alt={el.mission_name} className='images' />
                                    <p className="missionName">{el.mission_name}<span> #{el.flight_number}</span></p>
                                    <p className="mission">Mission Ids: <span className="missionSpan">{el.mission_id}</span></p>
                                    <p className="mission">Launch Year: <span className="missionSpan">{el.launch_year}</span></p>
                                    <p className="mission">Successfully Launch: <span className="missionSpan">{el.launch_success.toString()}</span></p>
                                    <p className="mission">Successfully Landing: <span className="missionSpan">{el.rocket.first_stage.cores[0].land_success == null ? 'null' : el.rocket.first_stage.cores[0].land_success.toString()}</span></p>
                                </div>

                            )
                        })
                    }

                </div>
                {/* <div className="item4">Right</div> */}
                <div className="item5">
                    <p>Developed By: Shuvasis Manna</p>
                </div>
            </div>
        </>
    )
}