import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { recommendBookmark } from "../../apis/recommend";
import { Heart } from "../../assets/icons/heart";
import useModalStore from "../../store/modalStore";

export const RecommendLikeButton = ({
  contentId,
  isMarked,
  likes,
}: {
  contentId: number;
  isMarked: boolean;
  likes: (cnt: number) => void;
}) => {
  const [markedSpots, setMarkedSpots] = useState<boolean>(isMarked);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const onClickMark = async (
    contentId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const token = localStorage.getItem("token");
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
    e.stopPropagation();
    try {
      const response = await recommendBookmark(contentId);
      setMarkedSpots((prev) => !prev);
      likes(response.likeCount);
    } catch (error) {
      console.error("추천행 좋아요", error);
    }
  };

  return (
    <Button onClick={(e) => onClickMark(contentId, e)}>
      {markedSpots ? <Heart fill="#FF2A2A" /> : <Heart />}
    </Button>
  );
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 50;
  margin-right: -3px;
  cursor: pointer;
  svg {
    width: 45px;
    height: 45px;
    color: white;
  }
`;
