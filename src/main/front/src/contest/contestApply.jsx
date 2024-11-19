import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import likeBtn from '../img/likeBtn.png';
import "../css/contest.css";

function ContestApply() {
    const [contestData, setContestData] = useState([]);
    const [joinData, setJoinData] = useState([]);

    // 콘테스트 정보
    useEffect(() => {
        fetch('http://localhost:80/contest/info')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json(); // Read the response body once
            })
            .then(data => {
                console.log(data);  // Now you can safely use `data`
                setContestData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setContestData('Error fetching data');
            });
    }, []);

    // 콘테스트 참여 내역
    useEffect(() => {
        fetch('http://localhost:80/contest/info/join')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json(); // Read the response body once
            })
            .then(data => {
                console.log(data);  // Now you can safely use `data`
                setJoinData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setJoinData('Error fetching data');
            });
    }, []);

    return (
        <form action="">
            <div className="contestBg">
                <div>
                    <img src={contestBg} alt="Contest Background" />
                    <span className="contestSubjectText">{contestData[0]?.contesttitle || '주제'}</span>
                    <span className="contestDateText">
                        {contestData[0]?.conteststartdate || '시작일'} - {contestData[0]?.contestenddate || '종료일'}
                    </span>
                    <input type="button" className="contestApplyPageBtn" value="참여하기" />
                </div>
            </div>

            <p className="contestApplyTitleText">참여작</p>
            <p className="contestApplyContentText">주제와 가장 어울리는 인테리어에 투표해주세요.</p>

            {joinData.length > 0 && (
                <div className="contestContent">
                    <a href="">
                        <div className="contentWork"
                             style={{backgroundImage: 'url("profileImg/20241113_162515_075.jpg")'}}>
                            <div className="contestProfileDiv">
                                <img src={joinData[0]?.joinimg || ''} className="contestProfileImg" alt="profileImg"/>
                                <span id="contestUserId"
                                      className="contestProfileText">{joinData[0]?.userid || '없음'}</span>
                            </div>
                            <div className="contestLikeDiv">
                                <button type="button" className="contestLikeBtn" onClick="">
                                    <img src={likeBtn} alt="like"/>
                                </button>
                                <span className="contestProfileText">{joinData[0]?.joinlike || 0}</span>
                            </div>
                        </div>
                    </a>
                </div>
            )}

        </form>
    );
}

export default ContestApply;
