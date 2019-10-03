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
