import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, UPDATE_DAYS} from "reducers/application.js";

const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviwers: {}
};

export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      if (message.type) {
        dispatch({
          type: message.type,
          id: message.id,
          interview: message.interview
        });
        updateDays();
      }
    };

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  const updateDays = () => {
    axios.get("/api/days").then(res => {
      dispatch({
        type: UPDATE_DAYS,
        days: res.data
      });
    });
  };

  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      axios
        .put("/api/appointments/" + id, { interview })
        .then(response => {
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview
          });
          updateDays();
          resolve();
        })
        .catch(res => {
          reject();
        });
    });
  }

  function cancelInterview(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/api/appointments/" + id)
        .then(response => {
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview: null
          });
          updateDays();
          resolve();
        })
        .catch(res => {
          reject();
        });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
