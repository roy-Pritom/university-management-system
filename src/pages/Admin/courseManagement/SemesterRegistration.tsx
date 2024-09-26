import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TResponse, semesterStatusOptions } from "../../../types";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { toast } from "sonner";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
    const { data: semesterData } = useGetAllSemesterQuery(undefined)
    const [addRegisterSemester] = useAddRegisterSemesterMutation();
    const semesterOptions = semesterData?.data?.map((item) => ({
        label: `${item?.name} ${item?.year}`,
        value: item?._id
    }))
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const semesterData = {
            ...data,
            maxCredit: Number(data.maxCredit),
            minCredit: Number(data.minCredit),
        }
        // console.log(semesterData);
        try {
            const res = (await addRegisterSemester(semesterData)) as TResponse<any>;
            if (res.error) {
                toast.error(res?.error?.data.message, { id: toastId })
            }
            else {
                toast.success('Semester register successfully', { id: toastId })

            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">

            <Col span={6}>
                <PHForm onSubmit={onSubmit}>


                    <PHSelect name="academicSemester" label="Academic Semester" options={semesterOptions} />

                    <PHSelect name="status" label="Status" options={semesterStatusOptions} />

                    <PHDatePicker name="startDate" label="Start Date" />
                    <PHDatePicker name="endDate" label="End Date" />

                    <PHInput name="minCredit" label="Min Credit" type="number" />


                    <PHInput name="maxCredit" label="Max Credit" type="number" />

                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>

        </Flex>
    );
};

export default SemesterRegistration;