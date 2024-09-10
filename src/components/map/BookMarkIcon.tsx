import { memo, useState } from "react";
import { BsBookmarkStar } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import { home } from "../../apis/main";

interface BookmarkIconProps {
  stadiumId: number;
  contentId: number;
  isMarked: boolean;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = memo(
  ({ stadiumId, contentId, isMarked }) => {
    const [markedSpots, setMarkedSpots] = useState<boolean>(isMarked);
    const navigate = useNavigate();

    const onClickMark = async (
      contentId: number,
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      const token = localStorage.getItem("token");
      e.stopPropagation();
      if (!token) {
        navigate("/login");
        toast("로그인이 필요합니다");
        return;
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
      <Button onClick={(e) => onClickMark(contentId, e)}>
        {markedSpots ? <LuDot /> : <BsBookmarkStar />}
      </Button>
    );
  }
);

export default BookmarkIcon;

const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  svg {
    width: 100%;
    height: 100%;
    color: white;
  }
`;
