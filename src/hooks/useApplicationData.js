import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData(initial){
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

  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      axios.put("/api/appointments/"+id, {interview})
        .then(response=> {
          setState({...state, appointments});
          resolve()
        })
        .catch(res=>{
          reject()
        })
    });
  }

  function cancelInterview(id) {
    return new Promise((resolve, reject) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      axios.delete("/api/appointments/"+id)
        .then(response=> {
          setState({...state, appointments});
          resolve()
        })
        .catch(res=>{
          reject()
        })
    });
  }

  return {state, setDay, bookInterview, cancelInterview}
};
