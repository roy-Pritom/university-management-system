import { TQueryParam, TReduxResponse, TStudent } from "../../../types";

import { baseApi } from "../../api/baseApi";

const userManagementApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllStudent: builder.query({
            query: (args) => {
               // console.log(args);
               const params = new URLSearchParams();
               if (args) {
                  args.forEach((element:TQueryParam) => {
                     params.append(element.name, element.value as string)
   
                  });
               }
               return {
                  url: '/students',
                  method: 'GET',
                  params: params
               }
            },
            transformResponse: (response: TReduxResponse<TStudent[]>) => {
               //    console.log('inside redux',response);
               return {
                  data: response.data,
                  meta:response.meta,
               }
            }
         }),
        addStudent: builder.mutation({
            query: (formData) => {
               return {
                  url: 'users/create-student',
                  method: 'POST',
                  body:formData
               }
            },
    
         }),
         getAllFaculties: builder.query({
            query: (args) => {
               // console.log(args);
               const params = new URLSearchParams();
               if (args) {
                  args.forEach((element:TQueryParam) => {
                     params.append(element.name, element.value as string)
   
                  });
               }
               return {
                  url: '/faculties',
                  method: 'GET',
                  params: params
               }
            },
            transformResponse: (response: TReduxResponse<TStudent[]>) => {
               //    console.log('inside redux',response);
               return {
                  data: response.data,
                  // meta:response.meta,
               }
            }
         }),
         changePassword: builder.mutation({
            query: (data) => {
               return {
                  url: '/auth/change-password',
                  method: 'POST',
                  body:data
               }
            },
    
         }),

    })
})


export const {useAddStudentMutation,useGetAllStudentQuery,useGetAllFacultiesQuery,useChangePasswordMutation}=userManagementApi;