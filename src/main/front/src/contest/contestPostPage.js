import React, { useEffect, useState } from 'react';
import contestBg from '../img/contest_bg.png';
import "../css/contest.css";
import Header from '../header.js'
import { useNavigate } from 'react-router-dom';

function ContestPostPage() {
    const navigate = useNavigate();
    const [contestData, setContestData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [userid, setUserid] = useState("aaa"); // 사용자 ID (예제 데이터)
    const [contestnum, setContestnum] = useState(1); // 콘테스트 번호 (예제 데이터)

    // 콘테스트 정보 가져오기
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

    // 파일 선택 처리
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const goContestApply = () => {
        navigate('/contest');
    };

    // 제출 버튼 클릭 처리
    const contestPostSubmit = async () => {
        if (!selectedFile) {
            alert("사진을 선택해주세요!");
            return;
        }
        
        // 폼 전송을 위한 생성
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userid", userid);
        formData.append("contestnum", contestnum);

        try {
            const response = await fetch("http://localhost:80/contest/post", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("참여되었습니다.");
                setSelectedFile(null);
                setPreviewImage(null);
                goContestApply();

            } else {
                throw new Error("다시 참여해주세요.");
            }
        } catch (err) {
            console.error(err);
            alert("이미 참여한 콘테스트입니다.");
        }
    };

    return (
        <div className="contestApplyContainer">
            <Header/>
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
                    {previewImage ? <img src={previewImage} id="contestPostImg" alt="Preview" /> : <p>미리보기 없음</p>}
                </div>

                <div id="contestPostBtnList">
                    <div className="filebox">
                        <label htmlFor="file">사진 첨부</label>
                        <input type="file" id="file" onChange={handleFileChange} />
                    </div>
                    <input type="button" value="제출하기" id="contestPostBtn" onClick={contestPostSubmit} />
                </div>
            </div>
        </div>
    );
}

export default ContestPostPage;
