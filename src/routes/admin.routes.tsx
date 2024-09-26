import AdminDashboard from "../pages/Admin/userManagement/AdminDashboard";
import CreateAdmin from "../pages/Admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/userManagement/CreateStudent";
import AcademicDepartment from "../pages/Admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/Admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/Admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/Admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/Admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/Admin/academicManagement/CreateAcademicSemester";
import StudentData from "../pages/Admin/userManagement/StudentData";
import StudentDetails from "../pages/Admin/userManagement/StudentDetails";
import Courses from "../pages/Admin/courseManagement/Courses";
import CreateCourse from "../pages/Admin/courseManagement/CreateCourse";
import OfferedCourses from "../pages/Admin/courseManagement/OfferedCourses";
import OfferCourse from "../pages/Admin/courseManagement/OfferCourse";
import SemesterRegistration from "../pages/Admin/courseManagement/SemesterRegistration";
import RegisteredSemesters from "../pages/Admin/courseManagement/RegisteredSemesters";





export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />
  },
  {
    name: 'Academic Management',
    children: [
      {
        name: 'Create A. Semester',
        path: 'create-academic-semester',
        element: <CreateAcademicSemester />
      },
      {
        name: 'Academic Semester',
        path: 'academic-semester',
        element: <AcademicSemester />
      },
      {
        name: 'Create A. Department',
        path: 'create-academic-department',
        element: <CreateAcademicDepartment />
      },
      {
        name: 'Academic Department',
        path: 'academic-department',
        element: <AcademicDepartment />
      },
      {
        name: 'Create A. Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty/>
      },
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />
      },
    ]
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        name:"StudentData",
        path: 'student-data',
        element: <StudentData />,
      },
      {
        
        path: 'student-data/:studentId',
        element: <StudentDetails />,
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
     


    ]
  },
  {
    name:'Course Management',
    children:[
      {
        name:'Semester Registration',
        path:'semester-registration',
        element:<SemesterRegistration/>
      },
      {
        name:'Registered Semesters',
        path:'registered-semesters',
        element:<RegisteredSemesters/>
      },
      {
        name:'Create Course',
        path:'create-course',
        element:<CreateCourse/>
      },
      {
        name:'Courses',
        path:'all-course',
        element:<Courses/>
      },
      {
        name:'Offer Course',
        path:'offer-course',
        element:<OfferCourse/>
      },
      {
        name:'Offered Courses',
        path:'offered-courses',
        element:<OfferedCourses/>
      },
    ]
  }
]

//* Programatical way
// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element
//     })
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element
//       })
//     })
//   }
//   return acc;
// }, [])

//* Programatical way

// export const adminSidebarItems = adminPaths.reduce((acc: TSideBarItem[], item) => {
//   if (item.name && item.path) {
//     acc.push({
//       key: item.name,
//       label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
//     })
//   }

//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
//       }))
//     })
//   }
//   return acc;
// }, [])