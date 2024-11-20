import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import "../css/contest.css";
import { useNavigate } from 'react-router-dom';

function ContestPostPage() {
    const navigate = useNavigate();
    const [contestData, setContestData] = useState([]);
    const [joinData, setJoinData] = useState([]);

    // 콘테스트 정보
    useEffect(() => {
        fetch('http://localhost:80/contest/info')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setContestData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setContestData('Error fetching data');
            });
    }, []);
    return (
        <div className="contestApplyContainer2">
            <div className="contestBg">
                <div>
                    <img src={contestBg} alt="Contest Background" />
                    <span className="contestSubjectText">{contestData[0]?.contesttitle || '주제'}</span>
                    <span className="contestDateText">
                        {contestData[0]?.conteststartdate || '시작일'} - {contestData[0]?.contestenddate || '종료일'}
                    </span>
                </div>
            </div>

            <div id="contestPostContainer2">
                <div id="contestImgContainer">
                </div>

                <div id="contestPostBtnList">
                    <div className="filebox">
                        <label htmlFor="file">사진 첨부</label>
                        <input type="file" id="file"/>
                    </div>
                    <input type="button" value="제출하기" id="contestPostBtn"/>
                </div>
            </div>
        </div>
    );
}


export default ContestPostPage;
