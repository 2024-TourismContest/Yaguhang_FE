import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, BarChart, Bar, LabelList, YAxis } from 'recharts';
import styled from 'styled-components';
import { home } from '../../apis/main';

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
        console.error('Error fetching weatherGraphAPI data:', err);
      }
    };

    fetchWeatherData();
  }, [gameId]);

  // Show a loading state or a message if data is not available
  if (!weatherData || !weatherData.weathers.length) {
    return <div>Loading...</div>;
  }

  return (
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
          domain={['auto', 'auto']}
          tickFormatter={(value) => `${value}시`}
        />
        <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide={true} />
        <Line type="monotone" dataKey="temp" stroke="#E7E7E7" strokeWidth={4} dot={false}>
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
          <img
            key={index}
            src={weather.weatherImgUrl}
            alt={`Weather icon for ${weather.fcstTime}`}
            width={50} 
            height={50}
            style={{ marginRight: '10px' }}
          />
        ))}
      </WeatherImagesContainer>

      <BarChart width={1600} height={100} data={weatherData.weathers}>
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
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 3vw;
`;

const WeatherImagesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 10px 0;
`;

export default WeatherGraph;