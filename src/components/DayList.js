import React from "react";
import DayListItem from 'components/DayListItem'

export default function DayList({days, day, setDay}) {
  const list = days.map(
    (item)=> 
    <DayListItem 
      key={item.id} 
      name={item.name} 
      spots={item.spots} 
      selected={item.name === day} 
      setDay={setDay} 
    />)

  return (
    <ul>
      {list}
    </ul>
  );
}
