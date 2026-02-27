// Temporary in-memory storage
let students = [];

// const addStudent = async (data) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newStudent = {
//         id: Date.now().toString(),
//         ...data,
//       };

//       students.push(newStudent);

//       console.log("Updated Students:", students);
//       resolve(newStudent);
//     }, 500);
//   });
// };


const addStudent = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      // 🔥 Check duplicate roll number inside same department
      const duplicate = students.find(
        (student) =>
          student.department_name.toLowerCase() === data.department_name.toLowerCase() &&
          student.roll_number === data.roll_number
      );

      if (duplicate) {
        reject(new Error("Roll number already exists in this department"));
        return;
      }

      const newStudent = {
        id: Date.now().toString(),
        ...data,
      };

      students.push(newStudent);

      resolve(newStudent);
    }, 500);
  });
};
const getStudents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(students);
    }, 300);
  });
};

export { addStudent, getStudents };
// const addStudent = async (data) => {
//   const response = await fetch("http://your-api-url/students", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return response.json();
// };

// export default addStudent;