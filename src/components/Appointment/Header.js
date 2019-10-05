import React from "react";
import "components/Appointment/styles.scss";

export default function Header({ time, interview }) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
