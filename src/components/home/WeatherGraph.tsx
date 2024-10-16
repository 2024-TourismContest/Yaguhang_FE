import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  BarChart,
  Bar,
  LabelList,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { home } from "../../apis/main";

interface Weather {
  fcstDate: string;
  fcstTime: string;
  weatherForecast: string;
  rainyPercent: number;
  temp: number;
  weatherImgUrl?: string;
}

interface WeatherData {
  weathers: Weather[];
}

interface WeatherGraphProps {
  gameId: number;
}

const WeatherGraph: React.FC<WeatherGraphProps> = ({ gameId }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await home.weatherGraphAPI(gameId);
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weatherGraphAPI data:", err);
      }
    };

    fetchWeatherData();
  }, [gameId]);

  if (!weatherData || !weatherData.weathers.length) {
    return (
      <ChartContainer>
        <NoDataMessage>날씨 정보가 없습니다.</NoDataMessage>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={weatherData.weathers}
          margin={{
            top: 50,
            left: 50,
            right: 50,
          }}
        >
          <YAxis domain={["dataMin - 1", "dataMax + 3"]} hide={true} />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#E7E7E7"
            strokeWidth={4}
            dot={false}
          >
            <LabelList
              dataKey="temp"
              position="top"
              offset={10}
              formatter={(value: number) => `${value}°C`}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          data={weatherData.weathers}
          margin={{
            top: 20,
          }}
        >
          <XAxis
            dataKey="fcstTime"
            domain={["auto", "auto"]}
            tickFormatter={(value) => `${value}시`}
          />

          <Bar dataKey="rainyPercent" fill="#8884d8" barSize={30}>
            <LabelList
              dataKey="rainyPercent"
              position="top"
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <WeatherImagesContainer>
        {weatherData.weathers.map((weather, index) => (
          <WeatherImage
            key={index}
            src={weather.weatherImgUrl}
            alt={`Weather icon for ${weather.fcstTime}`}
          />
        ))}
      </WeatherImagesContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  width: 100%;
`;

const WeatherImagesContainer = styled.div`
  display: flex;
  width: 94%;
  justify-content: space-between;
  padding: 10px 20px;
  box-sizing: border-box;
`;

const WeatherImage = styled.img`
  min-width: 20px;
  max-width: 40px;
  height: auto; 
  object-fit: contain;
`;

const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.5rem;
  color: #888;
`;

export default WeatherGraph;
