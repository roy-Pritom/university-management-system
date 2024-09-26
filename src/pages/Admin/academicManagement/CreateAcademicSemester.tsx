import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { SemesterOptions } from "../../../constants/semester";
import { MonthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import { useCreateSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types/academicManagement.type";



// year
const currentYear=new Date().getFullYear();

const YearOptions=[0,1,2,3,4].map(number=>({
    value:String(currentYear+number),
    label:String(currentYear+number)
}))

const CreateAcademicSemester = () => {
    const [addAcademicSemester]=useCreateSemesterMutation();
    const onSubmit = async(data: FieldValues) => {
        // console.log(data);
        const toastId=toast.loading('Creating...')
        const name=SemesterOptions[Number(data?.name)-1]?.label
        const semesterData={
            name,
            code:data.name,
            year:data.year,
            startMonth:data.startMonth,
            endMonth:data.endMonth
        }
        try{
             const res=(await addAcademicSemester(semesterData)) as TResponse<TAcademicSemester>;
            //  console.log(res);
            if(res.error){
                toast.error(res.error.data.message, { id: toastId });
            }
            else{

                toast.success('Semester created', { id: toastId });
            }

            // console.log(semesterData);
        }catch(err){
            toast.error('Something went wrong', { id: toastId });
        }

    }
    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                 
                    <PHSelect name="name" label="Name" options={SemesterOptions} />
                    <PHSelect name="year" label="Year" options={YearOptions} />
                    <PHSelect name="startMonth" label="StartMonth" options={MonthOptions} />
                    <PHSelect name="endMonth" label="EndMonth" options={MonthOptions} />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;