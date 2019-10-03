import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"

export default function Appointment({time, interview}) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)
  const onAdd = () => {
    transition(CREATE);
  };
  const onSave = () => {
    transition(SAVING);
  };
  const onCancel = () => {
    back();
  }
  const onConfirm = () => {
    transition(DELETING);
  };
  const onDelete = () => {
    transition(CONFIRM);
  };
  const onComplete = () => {
    transition(EMPTY);
  };
  const onEdit = () => {
    transition(EDIT);
  };

  return <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
      />
    )} 
    {mode === CREATE && (
      <Form
        name={interview && interview.student}
        interviewers={[]}
        onSave={onSave}
        onCancel={onCancel}
        interviewer={interview && interview.interviewer}
      />)}   
  </article>;
}
