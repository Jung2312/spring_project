import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contestBg from '../img/contest_bg.png';
import "../css/contest.css";
import likeBtn from "../img/likeBtn.png";
import Header from '../header.js'

function ContestPostDetailPage() {
    const { joinnum } = useParams();
    const [joinData, setJoinData] = useState(null);
    const userid = sessionStorage.getItem('userid');

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

    const clickContestLike = (joinuserid, joinnum) => {
        if (userid === null) {
            alert("로그인을 진행하세요.");
        } else if (userid === joinuserid) {
            alert("자신의 참여작에는 투표할 수 없습니다.");
        } else {
            fetch('http://localhost:80/contest/like', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Set content type to JSON if you're using request body.
                    "userid": userid,  // Send userid as a header
                    "joinnum": joinnum.toString()  // Ensure joinnum is sent as a string
                }
            })
                .then((response) => {
                    if (response.ok) {
                        alert("추천이 완료되었습니다.")
                        window.location.reload();

                    }
                    alert("이미 추천한 참여작입니다.");
                    return response.text();
                })
                .then(() => {

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const deletePost = () => {
        fetch(`http://localhost:80/contest/delete/${joinnum}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("게시글 삭제 실패");
                }
                alert("콘테스트 참여 내역이 삭제 되었습니다.");
                window.location.href = "/contest"; // 삭제 후 목록 페이지로 이동
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("게시글 삭제 실패");
            });
    };
    return (
        <div className="contestApplyContainer">
            <Header/>
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
                        <button
                            type="button"
                            className="contestLikeBtn"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                clickContestLike(joinData.userid, joinData.joinnum);
                            }}
                        >
                            <img src={likeBtn} alt="like"/>
                        </button>
                        <span className="contestProfileText2">{joinData.joinlike || 0}</span>
                    </div>
                    {/* 삭제 버튼: 로그인한 사용자와 게시물 작성자가 동일한 경우에만 표시 */}
                    <input
                        type="button"
                        value="삭제"
                        id="contestPostDelBtn"
                        className={userid === joinData.userid ? "" : "hidden"} // 조건부로 hidden 클래스 추가
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            deletePost()
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ContestPostDetailPage;
