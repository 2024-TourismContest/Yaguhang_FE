import styled from "styled-components";

interface MenuItemProps {
  label: string;
  sectionId: string;
  handleScrollToSection: (sectionId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  sectionId,
  handleScrollToSection,
}) => {
  return (
    <StyledMenuItem onClick={() => handleScrollToSection(sectionId)}>
      {label}
    </StyledMenuItem>
  );
};

interface MenuContainerProps {
  handleScrollToSection: (sectionId: string) => void;
}

const MenuContainer: React.FC<MenuContainerProps> = ({
  handleScrollToSection,
}) => {
  return (
    <Container>
      <MenuItem
        label="상세소개"
        sectionId="details"
        handleScrollToSection={handleScrollToSection}
      />
      <MenuItem
        label="사진정보"
        sectionId="images"
        handleScrollToSection={handleScrollToSection}
      />
      <MenuItem
        label="비슷한 관광지"
        sectionId="similarSpots"
        handleScrollToSection={handleScrollToSection}
      />
      <MenuItem
        label="리뷰"
        sectionId="reviews"
        handleScrollToSection={handleScrollToSection}
      />
    </Container>
  );
};

export default MenuContainer;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  padding: 1rem 0;
  top: 0;
  z-index: 1000;
`;

const StyledMenuItem = styled.div`
  flex: 1;
  max-width: 150px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 0 1.5rem;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s ease;

  &:hover {
    border-bottom: 1px solid #fff;
  }

  @media (max-width: 780px) {
    font-size: 0.8em;
    width: 70px;
    max-height: 50px;
    margin: 20px;
  }
`;
