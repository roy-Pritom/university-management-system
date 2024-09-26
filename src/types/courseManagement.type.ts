import { TAcademicSemester } from ".";

export type TStatus={
    status:'ONGOING'
}


const semesterStatus=['ONGOING','ENDED','UPCOMING'];

export const semesterStatusOptions=semesterStatus?.map(item=>({
    label:item,
    value:item
}))

export type TRegisterSemester= {
    _id: string;
    academicSemester: TAcademicSemester;
    status: string
    startDate: string
    endDate: string
    maxCredit: number
    minCredit: number
    createdAt: string
    updatedAt: string
  }