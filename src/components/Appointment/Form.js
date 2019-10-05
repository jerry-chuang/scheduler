import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const {
    name: propName,
    interviewers,
    onSave,
    onCancel,
    interviewer: propInterviewer
  } = props;
  const [name, setName] = useState(propName || "");
  const [interviewer, setInterviewer] = useState(propInterviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => onSave(name, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
