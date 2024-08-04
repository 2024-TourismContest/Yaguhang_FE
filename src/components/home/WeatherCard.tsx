import React from 'react';
import styled from 'styled-components';
import sunny from '../../assets/icons/sunny.svg';
import overcast from '../../assets/icons/overcast.svg';
import cloudy from '../../assets/icons/cloudy.svg';
import rainy from '../../assets/icons/rain.svg';
import shower from '../../assets/icons/shower.svg';
import snow from '../../assets/icons/snow.svg';

interface WeatherProps {
  weather?: string;
}

// Weather 컴포넌트 정의
const WeatherCard: React.FC<WeatherProps> = ({ weather = rainy }) => {
  return (
    <WeatherSummaryContainer>
      <WeatherIcon src={weather} alt="Weather Icon" />
      <div>
        <RegionText>{`${'서울'} | ${'잠실'}`}</RegionText>
        <TemperatureText>{`${'30'}°`}</TemperatureText>
        <WeatherDetailContainer>
          <WeatherDetail>{`최고: ${34}°  최저: ${26}°`}</WeatherDetail>
          <WeatherDetail>{`강수량: ${25}mm`}</WeatherDetail>
          <WeatherDetail>{`습도: ${90}%`}</WeatherDetail>
          <WeatherText>{`오후 20시부터 부분적으로 흐린 상태가 예상됩니다.`}</WeatherText>
        </WeatherDetailContainer>
      </div>
    </WeatherSummaryContainer>
  );
};


const baseTextStyle = `
  color: #FFF;
  font-family: Inter, sans-serif; /* fallback 추가 */
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.04375rem;
`;

const WeatherSummaryContainer = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 1.5625rem;
  background: linear-gradient(180deg, #B6D3FF 0%, #D1D1D1 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 3.75rem 3.13rem 2.69rem 3.62rem;
`;

const RegionText = styled.p`
  ${baseTextStyle}
  font-size: 0.925rem;
  margin-bottom: 0.44rem;
`;

const TemperatureText = styled.p`
  ${baseTextStyle}
  font-size: 3.59344rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const WeatherDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 12.5rem;
  gap: 0.5rem;
`;

const WeatherIcon = styled.img`
  position: absolute;
  top: 2.69rem;
  right: 1.13rem;
  width: 6.125rem;
`;

const WeatherDetail = styled.p`
  ${baseTextStyle}
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: #FFFFFF solid 0.03125rem;
`;

const WeatherText = styled.p`
  ${baseTextStyle}
  font-size: 0.875rem;
  padding-top: 3.06rem;
  white-space: pre-wrap; 
  word-break: break-word; 
`;

export default WeatherCard;