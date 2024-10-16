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
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data: WeatherData = await home.weatherCardAPI(gameId);
        if (
          !data ||
          Object.values(data).every(
            (value) => value === null || value === undefined
          )
        ) {
          setError(true);
          return;
        }
        setWeatherData(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching weatherCardAPI data:", err);
        setError(true);
      }
    };

    fetchWeatherData();
  }, [gameId]);

  if (error || !weatherData) {
    return (
      <WeatherSummaryContainer>
        <ErrorMessage>{`날씨 정보를\n 조회할 수 없습니다.`}</ErrorMessage>
      </WeatherSummaryContainer>
    );
  }

  return (
    <WeatherSummaryContainer>
      {weatherData.skyUrl && (
        <WeatherIcon src={weatherData.skyUrl} alt="Weather Icon" />
      )}
      {weatherData.stadium && <RegionText>{weatherData.stadium}</RegionText>}
      {weatherData.temp !== null && (
        <TemperatureText>{`${weatherData.temp}°`}</TemperatureText>
      )}
      <WeatherDetailContainer>
        {weatherData.maxTemp !== null && weatherData.minTemp !== null && (
          <WeatherDetail>{`최고: ${weatherData.maxTemp}°  최저: ${weatherData.minTemp}°`}</WeatherDetail>
        )}
        {weatherData.rainFall !== null && (
          <WeatherDetail>{`강수량: ${weatherData.rainFall}mm`}</WeatherDetail>
        )}
        {weatherData.humidity !== null && (
          <WeatherDetail>{`습도: ${weatherData.humidity}%`}</WeatherDetail>
        )}
      </WeatherDetailContainer>
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
  max-width: 360px;
  min-width: 300px;
  height: fit-content;
  border-radius: 25px;
  background: linear-gradient(180deg, #b6d3ff 0%, #d1d1d1 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 100px 50px 100px 50px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const RegionText = styled.p`
  ${baseTextStyle}
  font-size: 15px;
  margin-bottom: 7px;
`;

const TemperatureText = styled.p`
  ${baseTextStyle}
  font-size: 57px;
  margin-bottom: 12px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const WeatherDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WeatherIcon = styled.img`
  position: absolute;
  top: 14%;
  right: 10%;
  width: 98px;

  @media (max-width: 768px) {
    width: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
  }
`;

const WeatherDetail = styled.p`
  ${baseTextStyle}
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: #ffffff solid 1px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ErrorMessage = styled.p`
  ${baseTextStyle}
  font-size: 16px;
  text-align: center;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default WeatherCard;
