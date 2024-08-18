import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  BarChart,
  Bar,
  LabelList,
  YAxis,
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
    return <div>Loading...</div>;
  }

  return (
    <OuterContainer>
      <ChartContainer>
        <LineChart
          width={1600}
          height={300}
          data={weatherData.weathers}
          margin={{
            top: 50,
            left: 30,
            right: 50,
          }}
        >
          <XAxis
            dataKey="fcstTime"
            domain={["auto", "auto"]}
            tickFormatter={(value) => `${value}시`}
          />
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide={true} />
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

        <WeatherImagesContainer>
          {weatherData.weathers.map((weather, index) => (
            <WeatherImage
              key={index}
              src={weather.weatherImgUrl}
              alt={`Weather icon for ${weather.fcstTime}`}
            />
          ))}
        </WeatherImagesContainer>

        <BarChart
          width={1600}
          height={100}
          data={weatherData.weathers}
          margin={{
            top: 20,
          }}
        >
          <XAxis dataKey="fcstTime" tick={false} />
          <Bar dataKey="rainyPercent" fill="#8884d8" barSize={20}>
            <LabelList
              dataKey="rainyPercent"
              position="top"
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  background-color: #fff;
  overflow-x: auto;
  padding: 0;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WeatherImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1600px;
  margin: 10px 0;
`;

const WeatherImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export default WeatherGraph;
