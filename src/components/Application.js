import React, {useState, useEffect} from "react";
import DayList from 'components/DayList'
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import axios from 'axios';

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {}
  });
  
  const setDay = day => setState({...state, day})

  useEffect(()=>{
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all)=>{
      setState(prev => ({
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  const appointments = getAppointmentsForDay(state, state.day)
  
const schedule = appointments.map(item => {
  const interview = getInterview(state, item.interview)
  return <Appointment key={item.id} {...item} interview={interview}/>
})

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
