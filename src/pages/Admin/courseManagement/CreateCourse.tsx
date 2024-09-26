import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import {  useAddCourseMutation, useGetAllCourseQuery } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
    const { data: courseData } = useGetAllCourseQuery(undefined)
    const [addCourse] = useAddCourseMutation();
    const courseOptions = courseData?.data?.map((item:any) => ({
        label: item?.title,
        value: item?._id
    }))
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const myCourseData = {
            ...data,
            code:Number(data.code),
            credits:Number(data.credits),
            preRequisiteCourses:data?.preRequisiteCourses ? data?.preRequisiteCourses?.map((item:string)=>({
                course:item,
                isDeleted:false
            })): [],
            isDeleted:false
        }
        console.log(myCourseData);
        try {
            const res = (await addCourse(myCourseData)) as TResponse<any>;
            if (res.error) {
                toast.error(res?.error?.data.message, { id: toastId })
            }
            else {
                toast.success('Course created successfully', { id: toastId })

            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">

            <Col span={6}>
                <PHForm onSubmit={onSubmit}>

                    <PHInput name="title" label="Title" type="text" />
                    <PHInput name="prefix" label="Prefix" type="text" />
                    <PHInput name="code" label="Code" type="number" />
                    <PHInput name="credits" label="Credits" type="number" />

                    <PHSelect name="preRequisiteCourses" label="PreRequisite Courses" mode="multiple" options={courseOptions} />

                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>

        </Flex>
    );
};

export default CreateCourse;