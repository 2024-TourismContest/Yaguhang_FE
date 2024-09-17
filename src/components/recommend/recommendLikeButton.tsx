import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import { recommendBookmark } from "../../apis/recommend";
import { Heart } from "../../assets/icons/heart";

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
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 50;
  svg {
    width: 45px;
    height: 45px;
    color: white;
  }
`;
