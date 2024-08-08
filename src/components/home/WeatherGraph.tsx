import { LineChart, Line, XAxis, BarChart, Bar, LabelList} from "recharts";
import styled from "styled-components";
import weatherData from "../../dummy-data/dummy-weather-data.json";

const WeatherGraph = () => {
  return (
    <ChartContainer>
      <LineChart
        width={1600}
        height={300}
        data={weatherData.weathers}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="fcstTime" domain={['auto', 'auto']} tickFormatter={(value) => `${value}시`} />
        <Line
          type="monotone"
          dataKey="temp"ㅈ
          stroke="#82ca9d"
          dot={false}
          >
          <LabelList dataKey="temp" position="top" formatter={(value: number) => `${value}°C`} />
          </Line>
      </LineChart>
      <BarChart
        width={1600}
        height={100}
        data={weatherData.weathers}
      >
    <XAxis dataKey="fcstTime" tick={false}/>
    <Bar dataKey="rainyPercent" fill="#8884d8" barSize={20}>
        <LabelList dataKey="rainyPercent" position="top" formatter={(value: number) => `${value}%`} />
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
  margin: 0vw 22vw;
`;


export default WeatherGraph;
