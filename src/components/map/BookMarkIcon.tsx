import { memo } from "react";
import { BsBookmarkStar } from "react-icons/bs";
import { LuDot } from "react-icons/lu";

interface BookmarkIconProps {
  isMarked: boolean;
  onClick: (e: React.MouseEvent<SVGElement>) => void;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = memo(
  ({ isMarked, onClick }) => {
    const handleClick = (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 함
      onClick(e); // 외부에서 전달받은 onClick 핸들러 호출
    };
    return isMarked ? (
      <LuDot onClick={handleClick} />
    ) : (
      <BsBookmarkStar onClick={handleClick} />
    );
  }
);

export default BookmarkIcon;
