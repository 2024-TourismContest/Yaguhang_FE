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
        setWeatherData(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching weatherCardAPI data:", err);
        setError(true);
      }
    };

    fetchWeatherData();
  }, [gameId]);

  return (
    <WeatherSummaryContainer>
      {error ? (
        <ErrorMessage>날씨 정보를 조회할 수 없습니다.</ErrorMessage>
      ) : (
        <>
          <WeatherIcon src={weatherData?.skyUrl} alt="Weather Icon" />
          <div>
            <RegionText>{weatherData?.stadium}</RegionText>
            <TemperatureText>{`${weatherData?.temp}°`}</TemperatureText>
            <WeatherDetailContainer>
              <WeatherDetail>{`최고: ${weatherData?.maxTemp}°  최저: ${weatherData?.minTemp}°`}</WeatherDetail>
              <WeatherDetail>{`강수량: ${weatherData?.rainFall}mm`}</WeatherDetail>
              <WeatherDetail>{`습도: ${weatherData?.humidity}%`}</WeatherDetail>
            </WeatherDetailContainer>
          </div>
        </>
      )}
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
  height: auto;
`;

const WeatherDetail = styled.p`
  ${baseTextStyle}
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: #ffffff solid 1px;
`;

const ErrorMessage = styled.p`
  ${baseTextStyle}
  font-size: 16px;
  text-align: center;
`;

export default WeatherCard;