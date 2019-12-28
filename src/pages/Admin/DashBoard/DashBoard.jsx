import React , {useEffect} from 'react';
import {useReducer, useState} from "reinspect";
import Cookies from 'js-cookie';
import axios from 'axios';
import CountUp from 'react-countup';
import {CategoriesReducerBo, initial} from "../../../reducers/CategoriesReducer(bo)";

const IndexDashBoard = () => {
    const [status, setStatus ] = useState(null);

    useEffect(() => {
        var timer = setInterval(()=>  onLoad() , 3000);
        return () => clearInterval(timer); // clearInterval hàm trên vì khi render lại nếu k xóa thì nó sẽ bội lên hàm setinterval
    }, [status]);
    const onLoad = () => {

        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/status',
            headers: {
                Authorization: Cookies.get('access_token'),
            }
        }).then(res => {
            setStatus(res.data.success);

        }).catch(e => console.log(e));

    }
    return (
        <div className="content-wrapper">

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Bảng Tin</h1>
                        </div>

                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>

                            </ol>
                        </div>

                    </div>
                </div>

            </div>

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i
                                        className="fas fa-cog"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">CPU Traffic</span>
                                    <span className="info-box-number">
                                        { status !== null ? status.total_post : 'loading'}
                                        <small>%</small>
                </span>
                                </div>

                            </div>

                        </div>

                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                    <span className="info-box-icon bg-danger elevation-1"><i
                                        className="fas fa-thumbs-up"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Categories</span>
                                    <CountUp start={0} end={ status !== null ? status.total_category : 0}  duration={4.75} >
                                        {({ countUpRef }) => (
                                            <div>
                                                <span ref={countUpRef} className="info-box-number"/>

                                            </div>
                                        )}
                                    </CountUp>
                                </div>

                            </div>

                        </div>


                        <div className="clearfix hidden-md-up"></div>

                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                    <span className="info-box-icon bg-success elevation-1"><i
                                        className="fas fa-shopping-cart"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Posts</span>
                                    <span className="info-box-number">
                                        <CountUp start={0} end={ status !== null ? status.total_post : 0}  duration={4.75} >
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />

                                                </div>
                                            )}
                                        </CountUp>
                                       </span>
                                </div>

                            </div>

                        </div>

                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i
                                        className="fas fa-users"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">New Members</span>
                                    <span className="info-box-number">
                                        <CountUp start={0} end={status !== null ? status.total_user : 100}  duration={4.75}
                                            // onEnd={console.log('Ended! 👏')}
                                            // onStart={console.log('Started! 💨')}
                                        >
                                            {({ countUpRef }) => (
                                                <div>
                                                    <span ref={countUpRef} />

                                                </div>
                                            )}
                                        </CountUp>

                                       </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}
export default IndexDashBoard;