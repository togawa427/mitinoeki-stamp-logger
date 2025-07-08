import { NumberInput, TextInput } from '@mantine/core';
import React from 'react'

type Props = {
  area: string;
  sumMitinoeki: number;
  visitedMitinoeki: number;
  logDate: Date;
  setArea: React.Dispatch<React.SetStateAction<string>>
  setSumMitinoeki: React.Dispatch<React.SetStateAction<number>>
  setVisitedMitinoeki: React.Dispatch<React.SetStateAction<number>>
  setLogDate: React.Dispatch<React.SetStateAction<Date>>
}

const MitinoekisForm = ({area, sumMitinoeki, visitedMitinoeki, logDate, setArea, setSumMitinoeki, setVisitedMitinoeki, setLogDate}: Props) => {
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  };
  return (
    <div className='max-w-50'>
      <input
        type="date"
        id="start"
        name="trip-start"
        value={formatDate(logDate)}
        onChange={(e) => {
          if(e){
            setLogDate(new Date(e.target.value))
          }
        }}
      />
      {/* <DateInput
        value={logDate}
        onChange={(e) => {
          if(e){
            setLogDate(new Date(e))
          }
        }}
        label="Date input"
        placeholder="Date input"
      /> */}
      <TextInput 
        label="地方名"
        placeholder='北陸地方'
        value={area}
        onChange={(event) => setArea(event.currentTarget.value)}
      />
      <NumberInput
        label="合計の道の駅数"
        value={sumMitinoeki}
        onChange={(e) => setSumMitinoeki(Number(e))}
      />
      <NumberInput
        label="訪れた道の駅数"
        value={visitedMitinoeki}
        onChange={(e) => setVisitedMitinoeki(Number(e))}
      />
    </div>
  )
}

export default MitinoekisForm