import { TQueryParam, TReduxResponse, TRegisterSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllRegisterSemester: builder.query({
         query: (args) => {
            // console.log(args);
            const params = new URLSearchParams();
            if (args) {
               args.forEach((element: TQueryParam) => {
                  params.append(element.name, element.value as string)

               });
            }
            return {
               url: '/semester-registrations',
               method: 'GET',
               params: params
            }
         },
         transformResponse: (response: TReduxResponse<TRegisterSemester[]>) => {
            //    console.log('inside redux',response);
            return {
               data: response.data,
               //  meta:response.meta,
            }
         },
         providesTags: ["semester"]
      }),
      addRegisterSemester: builder.mutation({
         query: (data) => {
            return {
               url: '/semester-registrations/create-semester-registration',
               method: 'POST',
               body: data
            }
         },
         invalidatesTags: ['semester']
      }),
      updateRegisterSemester: builder.mutation({
         query: (updateData) => ({
            url: `/semester-registrations/${updateData.id}`,
            method: 'PATCH',
            body: updateData.data
         }),
         invalidatesTags: ['semester']
      }),
      getAllCourse:builder.query({
         query:()=>{
            return {
               url:'/courses',
               method:'GET'
            }
         },
         transformResponse:(response:TReduxResponse<any>)=>{
               return{
                  data:response.data
               }
         },
          providesTags:['courses']
      }),
      getFacultiesWithCourse:builder.query({
         query:(courseId)=>{
            return {
               url:`/courses/${courseId}/get-faculties`,
               method:'GET'
            }
         },
         transformResponse:(response:TReduxResponse<any>)=>{
               return{
                  data:response.data
               }
         },
          providesTags:['courses']
      }),
      addCourse: builder.mutation({
         query: (data) => ({
            url: `/courses/create-course`,
            method: 'POST',
            body: data
         }),
         invalidatesTags: ['courses']
      }),
      addOfferCourse: builder.mutation({
         query: (data) => ({
            url: `/offered-courses/create-offered-course`,
            method: 'POST',
            body: data
         }),
         invalidatesTags: ['courses']
      }),
      addFaculties: builder.mutation({
         query: (args) => ({
           url: `/courses/${args.courseId}/assign-faculties`,
           method: 'PUT',
           body: args.data,
         }),
         invalidatesTags: ['courses'],
       }),
   })
})

export const {
   useAddRegisterSemesterMutation,
   useGetAllRegisterSemesterQuery,
   useUpdateRegisterSemesterMutation,
   useGetAllCourseQuery,
   useAddCourseMutation,
   useAddOfferCourseMutation,
   useAddFacultiesMutation,
   useGetFacultiesWithCourseQuery

} = courseManagementApi;