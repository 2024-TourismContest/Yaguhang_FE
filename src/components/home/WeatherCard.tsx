import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { home } from "../../apis/main";

interface WeatherCardProps {
  gameId: number;
}

interface WeatherData {
  minTemp: number;
  maxTemp: number;
  humidity: number;
  temp: number;
  rainFall: number;
  sky: string;
  skyUrl: string;
  stadium: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ gameId }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data: WeatherData = await home.weatherCardAPI(gameId);
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weatherCardAPI data:", err);
      }
    };

    fetchWeatherData();
  }, [gameId]);


  return (
    <WeatherSummaryContainer>
      <WeatherIcon src={weatherData?.skyUrl} alt="Weather Icon" />
      <div>
        <RegionText>{`${weatherData?.stadium}`}</RegionText>
        <TemperatureText>{`${weatherData?.temp}°`}</TemperatureText>
        <WeatherDetailContainer>
          <WeatherDetail>{`최고: ${weatherData?.maxTemp}°  최저: ${weatherData?.minTemp}°`}</WeatherDetail>
          <WeatherDetail>{`강수량: ${weatherData?.rainFall}mm`}</WeatherDetail>
          <WeatherDetail>{`습도: ${weatherData?.humidity}%`}</WeatherDetail>
          <WeatherText>{`오후 20시부터 부분적으로 흐린 상태가 예상됩니다.`}</WeatherText>
        </WeatherDetailContainer>
      </div>
    </WeatherSummaryContainer>
  );
};

const baseTextStyle = `
  color: #FFF;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.04375rem;
`;

const WeatherSummaryContainer = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 1.5625rem;
  background: linear-gradient(180deg, #b6d3ff 0%, #d1d1d1 100%);
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
  border-bottom: #ffffff solid 0.03125rem;
`;

const WeatherText = styled.p`
  ${baseTextStyle}
  font-size: 0.875rem;
  padding-top: 3.06rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

export default WeatherCard;