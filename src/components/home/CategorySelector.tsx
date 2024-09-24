import styled from "styled-components";
import ball from "../../assets/icons/ball.svg";
import festival from "../../assets/icons/festival.svg";
import place from "../../assets/icons/place.svg";
import restaurant from "../../assets/icons/restaurant.svg";
import shopping from "../../assets/icons/shopping.svg";

const categoryIcons: Record<string, string> = {
  숙소: place,
  맛집: restaurant,
  쇼핑: shopping,
  문화: festival,
  선수PICK: ball,
};

interface CategorySelectorProps {
  category: string;
  setCategory: (category: string) => void;
  color?: string;
  categoryList: string[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  setCategory,
  color = "#ffffff",
  categoryList,
}) => {
  return (
    <CategoryButtons color={color}>
      {categoryList.map((cat) => (
        <CategoryButton
          key={cat}
          active={category === cat}
          onClick={() => setCategory(cat)}
          color={color}>
          {cat}
          <IconWrapper active={category === cat}>
            <img src={categoryIcons[cat]} alt={`${cat} icon`} />
          </IconWrapper>
        </CategoryButton>
      ))}
    </CategoryButtons>
  );
};

const CategoryButtons = styled.div<{ color: string }>`
  display: flex;
  gap: 0px;
  margin: 4vh 0;
  width: clamp(44vw, 51vw, 51vw);
  justify-content: center;
  width: 100%;
  gap: 5%;
  padding-left: 2vw;
  padding-right: 2vw;
  box-sizing: border-box;
  color: ${(props) => props.color || "#ffffff"};
`;

const CategoryButton = styled.button<{ active: boolean; color?: string }>`
  position: relative;
  width: clamp(100px, 11vw, 24px);
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  border-bottom: ${(props) =>
    props.active ? `1px solid ${props.color || "white"}` : "none"};
  color: ${(props) => props.color || "black"};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.1s ease;
  font-size: clamp(13px, 1.6vw, 24px);
`;

const IconWrapper = styled.div<{ active: boolean; color?: string }>`
  position: absolute;
  top: -3px;
  right: -10px;
  width: clamp(8px, 1.38vw, 20px);
  height: 20px;
  opacity: ${(props) =>
    props.active && props.color !== "white" && props.color !== "#ffffff"
      ? 1
      : 0};
  visibility: ${(props) =>
    props.active && props.color !== "white" && props.color !== "#ffffff"
      ? "visible"
      : "hidden"};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (max-width: 800px) {
    width: clamp(15px, 1.38vw, 20px);
    top: -3px;
    right: -0px;
  }
`;
