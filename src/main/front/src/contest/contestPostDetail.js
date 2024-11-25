import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contestBg from '../img/contest_bg.png';
import "../css/contest.css";
import likeBtn from "../img/likeBtn.png";

function ContestPostDetailPage() {
    const { joinnum } = useParams(); // Get joinnum from route params
    const [joinData, setJoinData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:80/contest/join?joinnum=${joinnum}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch contest join detail');
                }
                return res.json();
            })
            .then(data => {
                setJoinData(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
            });
    }, [joinnum]);


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

    return (
        <div className="contestApplyContainer">
            <div className="contestBg">
                <img src={contestBg} alt="Contest Background" />
            </div>

            {joinData && (
                <div id="contestPostContainer2">
                    <div className="contestProfileDiv2">
                        <img
                            src={`${process.env.PUBLIC_URL}/profileImg/${joinData.profileimage}`}
                            className="contestProfileImg2"
                            alt="profileImg"
                        />
                        <span className="contestProfileText2">{joinData.userid || '없음'}</span>
                    </div>

                    <div
                        id="contestImgContainer2"
                        style={{
                            backgroundImage: `url("${process.env.PUBLIC_URL}/postImg/${joinData.joinimg}")`,
                            backgroundSize: "cover",
                        }}
                    ></div>

                    <div className="contestLikeDiv2">
                        <button type="button" className="contestLikeBtn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    clickContestLike(joinData.joinnum);
                                }}>
                            <img src={likeBtn} alt="like" id="likeBtnImg"/>
                        </button>
                        <span className="contestProfileText2">{joinData.joinlike || 0}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContestPostDetailPage;
