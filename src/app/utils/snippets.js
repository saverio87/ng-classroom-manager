// fetchStudent = () => {

const { clearInterval } = require("timers");

//     // Check if props being passed from StudentsViewComponent
//     if(history.state.student) {
//       this.student = history.state.student
//       this.persister.set('student', this.student)
//       console.log('fetched student from history');

//     } else {
//       // If not, try and fetch it from localStorage
//       this.student = this.persister.get('student')
//       if (!this.student.name) {
//         console.log("couldn't find student object");
//         this.router.navigate(['/classrooms'])

//       }
//       console.log('fetched student from localstorage');

//     }

//   }

//   fetchClassroom = () => {

//     // Check if props being passed from StudentsViewComponent
//     if(history.state.classroom) {
//       this.classroom = history.state.classroom
//       this.studentsInClass = history.state.studentsInClass;
//       this.persister.set('classroom', this.classroom)
//       this.persister.set('studentsInClass', this.studentsInClass)

//       console.log('fetched classroom from history');

//     } else {
//       // If not, try and fetch it from localStorage
//       this.classroom = this.persister.get('classroom')
//       this.studentsInClass = this.persister.get('studentsInClass')

//       if (!this.classroom.name) {
//         console.log("couldn't find classroom object");
//         this.router.navigate(['/classrooms'])

//       }
//       console.log('fetched classroom from localstorage');

//     }

//   }

const student1 = {
  name: "sticazzi",
  group: 3,
  grouped: false,
  _id: 123931431,
};

const student2 = {
  name: "pippo",
  group: 3,
  grouped: false,
  _id: 123933434,
};

const student3 = {
  name: "pluto",
  group: 3,
  grouped: false,
  _id: 123956567,
};

const student4 = {
  name: "paperino",
  group: 3,
  grouped: false,
  _id: 1231234463,
};

// 1. Group students

// 2. Create array from which you will subtract elements by copying original array
let students = [student1, student2, student3, student4];
let arr = [...students].map((student) => student._id);
// Array.from(Array(students.length).keys());
console.log(arr);

setInterval(() => {
  if (arr.length > 0) {
    const elDeleted = arr.splice(Math.floor(Math.random() * arr.length), 1);
    console.log("Element deleted from second array is", elDeleted[0]);

    students = students.map((student) => {
      if (student._id == elDeleted[0]) {
        return {
          ...student,
          grouped: true,
        };
      }

      return student;
    });

    console.log(students);
  }

  clearInterval
}, 1000);
