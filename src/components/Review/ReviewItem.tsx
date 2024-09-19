import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarFull from "../../assets/icons/star-fill.png";
import StarHalf from "../../assets/icons/star-half.png";
import StarEmpty from "../../assets/icons/star-unfill.png";
import HeartFull from "../../assets/icons/heart-fill.png";
import HeartEmpty from "../../assets/icons/heart-unfill.png";
import RightArrow from "../../assets/icons/arrow_right.svg";
import defaultImg from "../../assets/images/default-profile.svg";

interface ReviewItemProps {
  reviewId: number;
  spotId: number;
  spotName?: string;
  authorName?: string;
  profileImage?: string;
  createdAt?: string;
  content: string;
  star: number;
  likeCount: number;
  isMine: boolean;
  isLiked: boolean;
  images?: string[];
  stadiumId: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  authorName,
  profileImage,
  createdAt,
  spotName,
  content,
  star,
  likeCount,
  isLiked: initialIsLiked,
  images = [],
  spotId,
  stadiumId,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const navigate = useNavigate();

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleClick = () => {
    const url = `https://yaguhang.kro.kr:7443/details/선수PICK/${spotId}?stadiumId=${stadiumId}`;
    navigate(url);
  };

  const renderStars = (star: number) => {
    const validRating = Math.max(0, Math.min(star, 5));

    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 !== 0;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

    return (
      <>
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <StarImg key={`full-${index}`} src={StarFull} alt="Full Star" />
          ))}
        {hasHalfStar && <StarImg src={StarHalf} alt="Half Star" />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <StarImg key={`empty-${index}`} src={StarEmpty} alt="Empty Star" />
          ))}
      </>
    );
  };

  const formattedRating = (Math.round(star * 2) / 2).toFixed(1);

  return (
    <ReviewItemContainer onClick={handleClick}>
      <LeftContent>
        {profileImage && (
          <ProfileImg
            src={profileImage ? profileImage : defaultImg}
            alt="프로필 이미지"
          />
        )}
        <ContentsContainer>
          <ReviewInfo>
            <StadiumNameContainer>
              {spotName && (
                <>
                  <StadiumName>{spotName}</StadiumName>
                  <ArrowIcon src={RightArrow} alt="Right Arrow" />
                </>
              )}
            </StadiumNameContainer>
            {authorName && <AuthorName>{authorName}</AuthorName>}
            {createdAt && (
              <DateText>{new Date(createdAt).toLocaleDateString()}</DateText>
            )}
            <RatingLikesContainer>
              <Rating>
                {renderStars(star)} <span>({formattedRating})</span>
              </Rating>
              <Likes onClick={toggleLike}>
                <HeartImg src={isLiked ? HeartFull : HeartEmpty} alt="Like" />
                {likes}
              </Likes>
            </RatingLikesContainer>
          </ReviewInfo>
          <ReviewText>{content}</ReviewText>
        </ContentsContainer>
      </LeftContent>
      {images.length > 0 && (
        <ImageContainer>
          <ReviewImage src={images[0]} alt="리뷰 이미지" />
          {images.length > 1 && <ImageCount>+ {images.length - 1}</ImageCount>}
        </ImageContainer>
      )}
    </ReviewItemContainer>
  );
};

export default ReviewItem;
const ReviewItemContainer = styled.div`
  padding: 1.5rem;
  background-color: #ffffff10;
  border: 1px solid #fff;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const LeftContent = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.75rem;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  color: #fff;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const StadiumNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const StadiumName = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ArrowIcon = styled.img`
  width: 1rem;
  margin-left: 1.75rem;

  @media (max-width: 768px) {
    margin-left: 0.75rem;
  }
`;

const AuthorName = styled.p`
  font-weight: 500;
  color: #fff;
  font-size: 1.15rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DateText = styled.p`
  color: #aaa;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const RatingLikesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: white;
  margin-right: 1rem;
  gap: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ReviewText = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  line-height: normal;
  margin-top: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  min-width: 130px;
  height: 130px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    min-width: 100px;
    height: 100px;
  }
`;

const ReviewImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const ImageCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0 12px 0 0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const StarImg = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const HeartImg = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;
