import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useAddOfferCourseMutation, useGetAllCourseQuery, useGetAllRegisterSemesterQuery, useGetFacultiesWithCourseQuery } from "../../../redux/features/admin/courseManagement.api";
import { useGetAllAcademicDeptQuery, useGetAllAcademicFacultyQuery, useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
// import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { TResponse } from "../../../types";
import { toast } from "sonner";
import moment from "moment";



const OfferCourse = () => {
    const [courseId,setCourseId]=useState('');
    // const [isCourseIdExist,setIsCourseIdExist]=useState(false);
    // if(courseId !== ''){
    //     setIsCourseIdExist(true)
    // }
    // addOfferCourse
    const [addOfferCourse]=useAddOfferCourseMutation();
    // getRegisterSemesters
    const {data:registerSemesters}=useGetAllRegisterSemesterQuery(undefined);
    const {data:semesters}=useGetAllSemesterQuery(undefined);
    // getAllAcademicDept
    const {data:academicDepartments}=useGetAllAcademicDeptQuery(undefined);
    // getAllCourse
    const {data:courses}=useGetAllCourseQuery(undefined);
    // getAllFaculties
    // const {data:faculties}=useGetAllFacultiesQuery(undefined);
    // getAllAcademicFaculty
    const {data:academicFaculties}=useGetAllAcademicFacultyQuery(undefined);
    // useGetFacultiesWithCourseQuery
    const {data:facultiesWithCourse,isFetching:facultyWithCourseFetching}=useGetFacultiesWithCourseQuery(courseId,{skip:!courseId});

    const days= ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const daysOption=days.map((item:string)=>({
    value:item,
    label:item
}))
const registeredSemesterOptions=registerSemesters?.data?.map((item)=>({
    value:item._id,
    label:`${item.academicSemester.name} ${item.academicSemester.year}`
}))
const semesterOptions=semesters?.data?.map((item)=>({
    value:item._id,
    label:`${item.name} ${item.year}`
}))
const academicDepartmentsOptions=academicDepartments?.data?.map((item)=>({
    value:item._id,
    label:item.name
}))
const courseOptions=courses?.data?.map((item:any)=>({
    value:item._id,
    label:item.title
}))
const academicFacultyOptions=academicFaculties?.data?.map((item:any)=>({
    value:item._id,
    label:item.name
}))
const facultyOptions=facultiesWithCourse?.data?.faculties?.map((item:any)=>({
    value:item._id,
    label:item?.fullName
}))


const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    const toastId = toast.loading('Creating...')

    const offerCourseData={
        ...data,
        maxCapacity:Number(data?.maxCapacity),
        section:Number(data?.section),
        startTime: moment(new Date(data.startTime)).format('HH:mm'),
        endTime: moment(new Date(data.endTime)).format('HH:mm'),
        
    }
    try {
        const res = (await addOfferCourse(offerCourseData)) as TResponse<any>;
        if (res.error) {
            toast.error(res?.error?.data.message, { id: toastId })
        }
        else {
            toast.success('Offer Course created successfully', { id: toastId })

        }
    } catch (err) {
        toast.error('Something went wrong', { id: toastId })
    }
}

    return (
       

       <Row>
       <Col span={24}>
            <PHForm onSubmit={onSubmit}>
                <Row gutter={24}>
                    
                <Col span={12}>
                
                <PHInput name="title" label="Title" type="text" />
                </Col>
                <Col span={12}>
                
                <PHInput name="prefix" label="Prefix" type="text" />
                </Col>
                <Col span={12}>
                <PHInput name="code" label="Code" type="number" />
                </Col>
         

                <Col span={12}>
                
                <PHSelect name="semesterRegistration" label="Semester Registration"  options={registeredSemesterOptions} />
                </Col>
                <Col span={12}>
                
                <PHSelect name="academicSemester" label="Academic Semester"  options={semesterOptions} />
                </Col>
                <Col span={12}>
                
                <PHSelect name="academicDepartment" label="Academic Department"  options={academicDepartmentsOptions} />
                </Col>
                <Col span={12}>
                <PHSelect name="academicFaculty" label="Academic Faculty"   options={academicFacultyOptions} />
                </Col>
                <Col span={12}>
                <PHSelectWithWatch onValueChange={setCourseId} name="course" label="Course"  options={courseOptions} />
                </Col>
                <Col span={12}>
                
                <PHSelect name="faculty" label="Faculty" disabled={!courseId || facultyWithCourseFetching}  options={facultyOptions} />
                </Col>
                <Col span={12}>
                
                <PHInput name="maxCapacity" label="Max Capacity" type="number" />
                </Col>
                <Col span={12}>
                
                <PHInput name="section" label="Section" type="number" />
                </Col>
                <Col span={12}>
                <PHSelect name="days" label="Days" mode="multiple" options={daysOption} />
                </Col>
                <Col span={12}>
                <PHTimePicker name="startTime" label="Start Time"   />
                </Col>
                <Col span={12}>
                <PHTimePicker name="endTime" label="End Time"   />
                </Col>
                </Row>
                <Button htmlType="submit">Submit</Button>
            </PHForm>
        </Col>
       </Row>


    );
};

export default OfferCourse;