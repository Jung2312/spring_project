import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import likeBtn from '../img/likeBtn.png';
import "../css/contest.css";
import { useNavigate } from 'react-router-dom';

function ContestChampionship() {
    const navigate = useNavigate();
    const [joinData, setJoinData] = useState([]);

    // 콘테스트 참여 내역
    useEffect(() => {
        fetch('http://localhost:80/contest/info/join')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setJoinData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setJoinData('Error fetching data');
            });
    }, []);
    return (
        <div className="contestApplyContainer">
            <div className="contestBg">
                <div>
                    <img src={contestBg} alt="Contest Background"/>
                    <span className="contestSubjectText">나만의 집 역대 수상작</span>
                </div>
            </div>

            <p className="contestApplyTitleText">역대 수상작</p>
            <p className="contestApplyContentText">과거에 수상한 작품을 확인해보세요.</p>

            {joinData.length > 0 && (
                <div className="contestContent">
                    <a href="">
                        <div className="contentWork"
                             style={{backgroundImage: `url("${process.env.PUBLIC_URL}/${joinData[0]?.joinimg}")`}}>
                            <div className="contestProfileDiv">
                                {/*프로필 사진 넣기*/}
                                <img src={`${process.env.PUBLIC_URL}/${joinData[0]?.joinimg}` || ''}
                                     className="contestProfileImg" alt="profileImg"/>
                                <span id="contestUserId"
                                      className="contestProfileText">{joinData[0]?.userid || '없음'}</span>
                            </div>
                            <div className="contestLikeDiv">
                                <img src={likeBtn} alt="like"/>
                                <span className="contestProfileText">{joinData[0]?.joinlike || 0}</span>
                            </div>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
}


export default ContestChampionship;
