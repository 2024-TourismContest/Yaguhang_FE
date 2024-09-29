import { memo, useState } from "react";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import { home } from "../../apis/main";
import useModalStore from "../../store/modalStore";

interface BookmarkIconProps {
  stadiumId: number;
  contentId: number;
  isMarked: boolean;
  width?: string;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = memo(
  ({ stadiumId, contentId, isMarked, width = "15%" }) => {
    const { openModal, closeModal } = useModalStore();
    const [markedSpots, setMarkedSpots] = useState<boolean>(isMarked);
    const navigate = useNavigate();

    const onClickMark = async (
      contentId: number,
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      const token = localStorage.getItem("token");
      e.stopPropagation();
      if (!token) {
        openModal({
          title: "로그인 필요",
          content: "로그인이 필요한 페이지입니다.",
          onConfirm: () => {
            navigate("/login");
            closeModal();
          },
          onCancel: () => {
            navigate("/");
            closeModal();
          },
          showCancel: true,
        });
      }

      if (stadiumId) {
        try {
          const res = await home.bookmark(contentId, stadiumId);
          console.log(res);
          setMarkedSpots((prev) => !prev);

          toast.success(
            !markedSpots
              ? "스크랩에 추가되었습니다."
              : "스크랩에서 제거되었습니다."
          );
        } catch (error) {
          console.error("북마크 상태 변경 오류:", error);
          toast.error("북마크 상태 변경에 실패했습니다.");
        }
      }
    };

    return (
      <Button onClick={(e) => onClickMark(contentId, e)} width={width}>
        {markedSpots ? <BsBookmarkStarFill /> : <BsBookmarkStar />}
      </Button>
    );
  }
);

export default BookmarkIcon;
const shake = keyframes`
0% { transform: translateX(0); }
10% { transform: translateX(-2px); }
20% { transform: translateX(2px); }
30% { transform: translateX(-2px); }
40% { transform: translateX(2px); }
50% { transform: translateX(-2px); }
60% { transform: translateX(2px); }
100% { transform: translateX(0); }
`;

const Button = styled.button<{ width: string }>`
  background-color: transparent;
  border: none;
  width: ${(props) => props.width};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: #ccc;
    animation: ${shake} 0.4s linear;
  }
  svg {
    width: 100%;
    height: 100%;
    color: white;
  }
`;
