import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import likeBtn from '../img/likeBtn.png';
import "../css/contest.css";
import { useNavigate } from 'react-router-dom';

function ContestApply() {
    const navigate = useNavigate();
    const [contestData, setContestData] = useState([]);
    const [joinData, setJoinData] = useState([]);
    const userid = sessionStorage.getItem('userid');

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

    useEffect(() => {
        fetch('http://localhost:80/contest/info/join')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => {
                setJoinData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setJoinData('Error fetching data');
            });
    }, []);

    const clickContestLike = (joinnum) => {
        fetch(`http://localhost:80/contest/like/${joinnum}`, {
            method: "POST",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update like");
                }
                return response.text();
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const goContestPost = () => {
        navigate('/contest/post');
    };

    // 4칸
    const rows = [];
    for (let i = 0; i < joinData.length; i += 4) {
        rows.push(joinData.slice(i, i + 4));
    }

    return (
        <div className="contestApplyContainer">
            <div className="contestBg">
                <div>
                    <img src={contestBg} alt="Contest Background" />
                    <span className="contestSubjectText">{contestData[0]?.contesttitle || '주제'}</span>
                    <span className="contestDateText">
                        {contestData[0]?.conteststartdate || '시작일'} - {contestData[0]?.contestenddate || '종료일'}
                    </span>
                    <input
                        type="button"
                        className="contestApplyPageBtn"
                        value="참여하기"
                        onClick={goContestPost}
                    />
                </div>
            </div>

            <p className="contestApplyTitleText">참여작</p>
            <p className="contestApplyContentText">주제와 가장 어울리는 인테리어에 투표해주세요.</p>

            <div className="contestContentContainer">
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
                                                className="contestLikeBtn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    clickContestLike(join.joinnum);
                                                }}
                                                disabled={!userid || userid === joinData.userid} // userid가 없거나 같으면 버튼 비활성화
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

export default ContestApply;
