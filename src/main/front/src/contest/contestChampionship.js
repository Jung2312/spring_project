import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import likeBtn from '../img/likeBtn.png';
import "../css/contest.css";
import Header from '../header.js'
import { useNavigate } from 'react-router-dom';

function ContestChampionship() {
    const navigate = useNavigate();
    const [joinData, setJoinData] = useState([]);

    // 콘테스트 참여 내역
    useEffect(() => {
        fetch('http://localhost:80/contest/join/end')
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

    // 4칸
    const rows = [];
    for (let i = 0; i < joinData.length; i += 4) {
        rows.push(joinData.slice(i, i + 4));
    }

    return (
        <div className="contestApplyContainer">
            <Header/>
            <div className="contestBg">
                <div>
                    <img src={contestBg} alt="Contest Background"/>
                    <span className="contestSubjectText">나만의 집 역대 수상작</span>
                </div>
            </div>

            <p className="contestApplyTitleText">역대 수상작</p>
            <p className="contestApplyContentText">과거에 수상한 작품을 확인해보세요.</p>

                <div className="contestContent">
                    {rows.map((row, rowIndex) => (
                        <div className="contestRow" key={rowIndex}>
                            {row.map((join, index) => (
                                <div className="contentWork" key={join.joinnum}>
                                    <a
                                        href={`/contest/postDetail/${join.joinnum}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/contest/postDetail/${join.joinnum}`);
                                        }}
                                    >
                                        <div
                                            className="contentWork"
                                            style={{
                                                backgroundImage: `url("${process.env.PUBLIC_URL}/postImg/${join.joinimg}")`,
                                            }}
                                        >
                                            <div className="contestProfileDiv">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/profileImg/${join.profileimage}` || ''}
                                                    className="contestProfileImg"
                                                    alt="profileImg"
                                                />
                                                <span id="contestUserId" className="contestProfileText">
                                                {join.userid || '없음'}
                                            </span>
                                            </div>
                                            <div className="contestLikeDiv">
                                                <button
                                                    type="button"
                                                    className="contestEndLikeBtn"
                                                    disabled="false"
                                                >
                                                    <img src={likeBtn} alt="like" />
                                                </button>
                                                <span className="contestProfileText">{join.joinlike || 0}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
        </div>
    );
}


export default ContestChampionship;
