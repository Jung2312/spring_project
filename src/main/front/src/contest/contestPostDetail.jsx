import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import "../css/contest.css";
import { useNavigate } from 'react-router-dom';
import likeBtn from "../img/likeBtn.png";

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
        <div className="contestApplyContainer">
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
                <div className="contestProfileDiv2">
                    {/*프로필 사진 넣기*/}
                    <img src={`${process.env.PUBLIC_URL}/${joinData[0]?.joinimg}` || ''} className="contestProfileImg2"
                         alt="profileImg"/>
                    <span id="contestUserId" className="contestProfileText2">{joinData[0]?.userid || '없음'}</span>
                </div>

                <div id="contestImgContainer2"
                     style={{backgroundImage: `url("${process.env.PUBLIC_URL}/profileImg/nongdamgom.png")`}}>
                </div>

                <div className="contestLikeDiv2">
                    <button
                        type="button"
                        className="contestLikeBtn"
                    >
                        <img src={likeBtn} alt="like" id="likeBtnImg"/>
                    </button>
                    <span className="contestProfileText2">{joinData[0]?.joinlike || 0}</span>
                </div>
                <div id="contestPostBtnList2">
                    <input type="button" value="삭제" id="contestPostDelBtn" className="hidden"/>
                </div>
            </div>
        </div>
    );
}


export default ContestPostPage;
