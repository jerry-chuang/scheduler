import React, {useReducer, useEffect} from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const UPDATE_DAYS = "UPDATE_DAYS";

const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviwers: {}
}

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW: 
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return {
        ...state,
        appointments: appointments,
      }
    case UPDATE_DAYS:
      return {
        ...state,
        days: action.days
      }
  
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData(initial){

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const setDay = day => dispatch({type: SET_DAY, day})

  
  useEffect(()=>{
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = function (event) {
      socket.send('ping');
    };
    socket.onmessage = function (event) {
      console.log("Message received:", JSON.parse(event.data))
    };
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all)=>{
      dispatch({
        type:SET_APPLICATION_DATA,
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, [])



  const updateDays = () => {
    axios.get("api/days")
      .then(res => {
        dispatch({
          type: UPDATE_DAYS,
          days: res.data
        })
      })
  }
  

  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      // const appointment = {
      //   ...state.appointments[id],
      //   interview: { ...interview }
      // };
      // const appointments = {
      //   ...state.appointments,
      //   [id]: appointment
      // };
      
      axios.put("/api/appointments/"+id, {interview})
        .then(response=> {
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview
          })
          updateDays();
          resolve();
        })
        .catch(res=>{
          reject();
        })
    });
  }

  function cancelInterview(id) {
    return new Promise((resolve, reject) => {
      // const appointment = {
      //   ...state.appointments[id],
      //   interview: null
      // };
      // const appointments = {
      //   ...state.appointments,
      //   [id]: appointment
      // };
      
      axios.delete("/api/appointments/"+id)
        .then(response=> {
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview: null
          })
          updateDays();
          resolve();
        })
        .catch(res=>{
          reject();
        })
    });
  }

  return {state, setDay, bookInterview, cancelInterview}
};
