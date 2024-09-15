import styled from "styled-components";

export default function MyPageMain() {
  return (
    <MainPageContainer>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 4px;
`;
