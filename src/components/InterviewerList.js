import React from "react";
import InterviewerListItem from 'components/InterviewerListItem'
import "components/InterviewerList.scss";

export default function InterviewerList({interviewers, value, onChange}) {
  const list = interviewers.map(
    (item)=> 
      <InterviewerListItem 
      key={item.id} 
      name={item.name} 
      avatar={item.avatar} 
      selected={item.id === Number(value)} 
      setInterviewer={()=>onChange(item.id)} 
      />
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {list}
      </ul>
    </section>
  );
}
