export type TStudent= {
    _id: string
    id: string
    user: TUser
    name: TName
    email: string
    gender: string
    contactNo: string
    emergencyContactNo: string
    permanentAddress: string
    presentAddress: string
    dateOfBirth: string
    bloodGroup: string
    guardian: TGuardian
    localGuardian: LocalGuardian
    admissionSemester: string
    academicDepartment: string
    profileImg: string
    isDeleted: boolean
    fullName?:string
  }
  
  export type TUser ={
    _id: string
    id: string
    needsPasswordChange: boolean
    role: string
    status: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
    passwordChangedAt: string
  }
  
  export type TName ={
    firstName: string
    middleName: string
    lastName: string
    _id: string
  }
  
  export type TGuardian ={
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    _id: string
  }
  
  export type LocalGuardian= {
    name: string
    occupation: string
    contactNo: string
    address: string
    _id: string
  }
  