import { TAcademicDepartment, TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam, TReduxResponse } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllSemester: builder.query({
         query: (args) => {
            // console.log(args);
            const params = new URLSearchParams();
            if (args) {
               args.forEach((element:TQueryParam) => {
                  params.append(element.name, element.value as string)

               });
            }
            return {
               url: '/academic-semesters',
               method: 'GET',
               params: params
            }
         },
         transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
            //    console.log('inside redux',response);
            return {
               data: response.data
               // meta:response.meta;
            }
         }
      }),
      createSemester: builder.mutation({
         query: (data) => ({
            url: '/academic-semesters/create-academic-semester',
            method: 'POST',
            body: data
         })
      }),
      getAllAcademicDept: builder.query({
         query: () => {
              return {
               url: '/academic-departments',
               method: 'GET'
              }
         },
         transformResponse:(response:TReduxResponse<TAcademicDepartment[]>)=>{
             return {
               data:response.data
             }
         }
      }),
      getAllAcademicFaculty:builder.query({
         query:()=>{
            return{
               url:'/academic-faculties',
               method:'GET'
            }
         },
         transformResponse:(response:TReduxResponse<any>)=>{
            return{
               data:response.data
            }
         }
      })
   })
})

export const { useGetAllSemesterQuery, useCreateSemesterMutation,useGetAllAcademicDeptQuery,useGetAllAcademicFacultyQuery } = academicManagementApi;