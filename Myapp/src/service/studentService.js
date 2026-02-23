let students = [];

export const addStudent = async (student) => {
  const newStudent = {
    id: students.length + 1,
    ...student,
    created_at: new Date(),
  };

  students.push(newStudent);
  return newStudent;
};

export const getStudents = async () => {
  return students;
};