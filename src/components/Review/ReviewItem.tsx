import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleLikeOnServer } from "../../apis/review/index";
import styled from "styled-components";
import StarFull from "../../assets/icons/star-fill.png";
import StarHalf from "../../assets/icons/star-half.png";
import StarEmpty from "../../assets/icons/star-unfill.png";
import HeartFull from "../../assets/icons/heart-fill.png";
import HeartEmpty from "../../assets/icons/heart-unfill.png";
import RightArrow from "../../assets/icons/arrow_right.svg";
import defaultImg from "../../assets/images/default-profile.svg";
import ImageModal from "../../components/common/ImageModal";
import { Review } from "../../types/myPageType";

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
  image?: string[];
  stadiumId: number;
  category: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  authorName,
  reviewId,
  profileImage,
  createdAt,
  spotName,
  content,
  star,
  likeCount,
  isLiked: initialIsLiked,
  spotId,
  stadiumId,
  image = [],
  category,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const toggleLike = async () => {
    const newLikeStatus = !isLiked;
    const updatedLikeCount = await toggleLikeOnServer(reviewId);

    if (updatedLikeCount !== null) {
      setIsLiked(newLikeStatus);
      setLikes(updatedLikeCount);
    }
  };

  const handleClick = () => {
    const url = `/details/${category}/${spotId}?stadiumId=${stadiumId}`;
    navigate(url);
  };

  //이미지 모달
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const nextImage = () => {
    if (currentImageIndex < image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
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
            <Icon key={`full-${index}`} src={StarFull} alt="Full Star" />
          ))}
        {hasHalfStar && <Icon src={StarHalf} alt="Half Star" />}
        {Array(emptyStars)
          .fill(null)
          .map((_, index) => (
            <Icon key={`empty-${index}`} src={StarEmpty} alt="Empty Star" />
          ))}
      </>
    );
  };

  const formattedRating = (Math.round(star * 2) / 2).toFixed(1);

  return (
    <>
      <ReviewItemContainer>
        <LeftContent>
          {profileImage && (
            <ProfileImg
              src={profileImage ? profileImage : defaultImg}
              alt="프로필 이미지"
            />
          )}
          <ContentsContainer>
            <ReviewInfo>
              <StadiumNameContainer onClick={handleClick}>
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
                  <Icon src={isLiked ? HeartFull : HeartEmpty} alt="Like" />
                  {likes}
                </Likes>
              </RatingLikesContainer>
            </ReviewInfo>
            <ReviewText>{content}</ReviewText>
          </ContentsContainer>
        </LeftContent>
        <ImagesContainer>
          {image.length > 0 &&
            image
              .slice(0, 4)
              .map((img, index) => (
                <ReviewImage
                  key={index}
                  src={img}
                  alt={`리뷰 이미지 ${index + 1}`}
                  onClick={() => openModal(index)}
                />
              ))}
          {image.length > 4 && (
            <ImageCount onClick={() => openModal(4)}>
              + {image.length - 4}
            </ImageCount>
          )}
        </ImagesContainer>
        <Actions>
          <EditButton onClick={() => {}}>수정</EditButton>
          <DeleteButton onClick={() => {}}>
            삭제
          </DeleteButton>
        </Actions>
      </ReviewItemContainer>

      <ImageModal
        isOpen={isModalOpen}
        image={image[currentImageIndex]}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
};

export default ReviewItem;

const ReviewItemContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px dashed #ccc;
  display: flex;
  flex-direction: column; /* 방향을 세로로 변경 */
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const LeftContent = styled.div`
  display: flex;
  width: 100%; /* 전체 너비 사용 */

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
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ImageCount = styled.div`
  color: white;
  font-size: 1rem;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;
`;

const Actions = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;
