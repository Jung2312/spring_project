import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import contestInfo from '../img/contest_info.png';
import contestInfo2 from '../img/contest_info2.png'
import "../css/contest.css";
import Header from '../header.js'
import { useNavigate } from 'react-router-dom';

function ContestNotice() {
    const navigate = useNavigate();
    const [contestData, setContestData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:80/contest/info')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setContestData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setContestData('Error fetching data');
            });
    }, []);

    return (
        <div>
            <Header/>

            <div className="contestApplyContainer">

                <div className="contest_notice">
                    <div className="contest_notice_info">
                        <img className="contest_notice_img" src={contestInfo} alt="contestInfoBg"/>
                        <span className="contestSubjectText">{contestData[0]?.contesttitle || '주제'}</span>
                        <span className="contestDateText_info">
                            {contestData[0]?.conteststartdate || '시작일'}{"\n"}-{"\n"}{contestData[0]?.contestenddate || '종료일'}
                        </span>
                    </div>
                    <div>
                        <div className="contest_info">
                            <div className="contest_notice_main_text">대회명</div>
                            <div className="contest_notice_text">{contestData[0]?.contesttitle || '주제'}</div>
                        </div>
                        <div className="contest_info">
                            <div className="contest_notice_main_text">시작일</div>
                            <div className="contest_notice_text">{contestData[0]?.conteststartdate || '시작일'}</div>
                        </div>
                        <div className="contest_info">
                            <div className="contest_notice_main_text">종료일</div>
                            <div className="contest_notice_text">{contestData[0]?.contestenddate || '종료일'}</div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "2px solid #aaa",
                        lineHeight: "0.1em",
                        margin: "10px 0 20px",
                        color: "#dddddd"
                    }}>
                </div>
                <div className="contest_notice_bg">
                    <img src={contestBg} alt="contestBg"/>
                    <span className="contestSubjectText">{contestData[0]?.contesttitle || '주제'}</span>
                    <span className="contestDateText_info2">
                        {contestData[0]?.conteststartdate || '시작일'} - {contestData[0]?.contestenddate || '종료일'}
                    </span>
                </div>
                <div className="contest_notice_bg"><img src={contestInfo2} alt="contestBg"/></div>
            </div>
        </div>
    );
}

export default ContestNotice;