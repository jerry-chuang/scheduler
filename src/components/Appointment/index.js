import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"


export default function Appointment({id, time, interview, interviewers, bookInterview, cancelInterview}) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)

  const onAdd = () => {
    transition(CREATE);
  };

  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then(res =>{transition(SHOW)})
    .catch(error => transition(ERROR_SAVE, true))
  };

  const onCancel = () => {
    back();
  }
  const onConfirm = () => {
    transition(DELETING, true);
    cancelInterview(id)
    .then(res =>{transition(EMPTY)})
    .catch(error => transition(ERROR_DELETE, true))
  };
  const onDelete = () => {
    transition(CONFIRM);
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
        onDelete={onDelete}
        onEdit={onEdit}
      />
    )} 
    {mode === CREATE && (
      <Form
        interviewers={interviewers}
        onSave={onSave}
        onCancel={onCancel}
      />)}
    {mode === SAVING && <Status message="saving"/>}   
    {mode === CONFIRM && <Confirm 
      message="Are you sure you would like to delete?" 
      onConfirm={onConfirm} 
      onCancel={onCancel}
    />}
    {mode === DELETING && <Status message="deleting"/>}   
    {mode === EDIT && (
      <Form
        name={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={interviewers}
        onSave={onSave}
        onCancel={onCancel}
      />)}
    {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={onCancel}/>}
    {mode === ERROR_SAVE && <Error message="Could not book appointment" onClose={onCancel}/>}     

  </article>;
}
