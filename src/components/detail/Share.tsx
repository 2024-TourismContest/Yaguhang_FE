import { useEffect, useState } from "react";
import { FiShare } from "react-icons/fi";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import 네이버밴드 from "../../assets/icons/네이버밴드.png";
import 페이스북 from "../../assets/icons/페이스북.png";
import 카카오톡 from "../../assets/icons/카카오톡.png";
import styled from "styled-components";

interface ShareProps {
  name?: string;
  description?: string;
  address?: string;
}

const Share: React.FC<ShareProps> = ({ name, description, address }) => {
  const [isSharePopupOpen, setSharePopupOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  // 카카오 SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
          setIsKakaoReady(true); // SDK 초기화 완료
        } else {
          setIsKakaoReady(true); // 이미 초기화된 경우
        }
      }
    };

    initKakao();
  }, []);

  const toggleSharePopup = () => {
    setSharePopupOpen(!isSharePopupOpen);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  const shareOnFacebook = (url: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnBand = (url: string, text: string) => {
    const bandUrl = `https://band.us/plugin/share?body=${encodeURIComponent(
      text
    )}&route=${encodeURIComponent(url)}`;
    window.open(bandUrl, "_blank");
  };

  const shareOnKakao = (url: string, text: string) => {
    if (isKakaoReady && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: name || "공유할 제목",
          description: text || "설명",
          imageUrl: "https://yaguhang.kro.kr:8443/teamLogos/main.svg",
          link: {
            // mobileWebUrl: "https://yaguhang.kro.kr:8443",
            webUrl: "https://yaguhang.kro.kr:8443",
          },
        },
      });
    } else {
      console.error("카카오 SDK가 초기화되지 않았습니다.");
    }
  };

  return (
    <div>
      <ShareIcon onClick={toggleSharePopup}>
        <FiShare />
      </ShareIcon>

      {isSharePopupOpen && (
        <>
          <Overlay onClick={toggleSharePopup} />
          <SharePopup>
            <PopupHeader>
              <h2>공유하기</h2>
              <CloseButton onClick={toggleSharePopup}>
                <IoIosCloseCircleOutline />
              </CloseButton>
            </PopupHeader>
            <SNSIcons>
              <SNSButton onClick={() => shareOnFacebook(window.location.href)}>
                <img src={페이스북} alt="페이스북" width="40" height="40" />
              </SNSButton>
              <SNSButton
                onClick={() =>
                  shareOnKakao(
                    window.location.href,
                    `이름: ${name}\n주소: ${address}\n설명: ${description}`
                  )
                }
              >
                <img src={카카오톡} alt="카카오톡" width="40" height="40" />
              </SNSButton>
              <SNSButton
                onClick={() =>
                  shareOnBand(
                    window.location.href,
                    `이름: ${name}\n주소: ${address}\n설명: ${description}`
                  )
                }
              >
                <img
                  src={네이버밴드}
                  alt="네이버 밴드"
                  onClick={() =>
                    shareOnBand(
                      window.location.href,
                      `이름: ${name}\n주소: ${address}\n설명: ${description}`
                    )
                  }
                  width="40"
                  height="40"
                />
              </SNSButton>
            </SNSIcons>
            <LinkContainer>
              <ShareLink>{window.location.href}</ShareLink>
              <CopyButton onClick={handleCopy}>
                {isCopied ? <FaCheck /> : <FaRegCopy />}
              </CopyButton>
            </LinkContainer>
          </SharePopup>
        </>
      )}
    </div>
  );
};

export default Share;

const ShareIcon = styled.div`
  font-size: 1.5rem; /* 24px */
  cursor: pointer;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SharePopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 1rem;
  background-color: #2e2e2e;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: white;
  z-index: 1000;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dfdfdf;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SNSIcons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3rem 0;
`;

const SNSButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #2e2e2e;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  padding: 5px;
  margin-top: 40px;
`;

const ShareLink = styled.p`
  width: 220px;
  height: 20px;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: hidden;
`;
const CopyButton = styled.button`
  border: 1px solid #dfdfdf;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  background-color: #2e2e2e;
  font-size: 20px;
`;
