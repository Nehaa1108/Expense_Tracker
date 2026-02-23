let attendance = [];

export const markAttendance = async (record) => {
  attendance.push({
    id: attendance.length + 1,
    ...record,
  });

  return record;
};

export const getAttendanceByDate = async (date) => {
  return attendance.filter((item) => item.date === date);
};