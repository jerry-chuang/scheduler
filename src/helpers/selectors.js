export function getAppointmentsForDay(state, day) {
  let output = [];
  const filteredDay = state.days.filter(item => item.name === day);
  
  if (filteredDay.length === 0){
    return []
  }

  filteredDay[0].appointments.forEach(item => {
    output.push(state.appointments[item])
  })

  return output;
}

export function getInterview(state, interview) {
  if (!interview){
    return null
  }

  const output = {...interview, interviewer: state.interviewers[interview.interviewer] }

  return output;
}

export function getInterviewersForDay(state, day) {
  let output = [];
  const filteredDay = state.days.filter(item => item.name === day);
  
  if (filteredDay.length === 0){
    return []
  }

  filteredDay[0].interviewers.forEach(item => {
    output.push(state.interviewers[item])
  })

  return output;
}