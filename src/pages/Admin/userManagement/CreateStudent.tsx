import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { useGetAllAcademicDeptQuery, useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

//! This is only for development
//! Should be removed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const studentDummyData = {
    "student": {

        "name": {
            "firstName": "Anu",
            "middleName": "yo",
            "lastName": "raj"
        },
        "email": "anu12@ll.com",
        "gender": "male",
        "dateOfBirth": "1990-01-01",
        "bloodGroup": "A+",


        "contactNo": "123-456-7890",
        "emergencyContactNo": "987-654-3210",
        "permanentAddress": "123 Main St, Cityville",
        "presentAddress": "456 Side St, Townsville",


        "guardian": {
            "fatherName": "John Doe Sr.",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "111-222-3333",
            "motherName": "Jane Doe",
            "motherOccupation": "Doctor",
            "motherContactNo": "444-555-6666"
        },

        "localGuardian": {
            "name": "Guardian Name",
            "occupation": "Guardian Occupation",
            "contactNo": "777-888-9999",
            "address": "789 Local St, Villagetown"
        },


        "admissionSemester": "656ddc03add0f6c6b23932df",
        "academicDepartment": "656df3bf7d4449d58997f81f",
        "profileImg": "https://example.com/profileImg.jpg"

    }

}
//! This is only for development
//! Should be removed
const defaultValues={
    
      name: {
        firstName: "Raka",
        middleName: "yo",
        lastName: "raj"
      },
      email: "raka12@ll.com",
      gender: "male",
      bloodGroup: "A+",
      contactNo: "123-456-7890",
      emergencyContactNo: "987-654-3210",
      permanentAddress: "123 Main St, Cityville",
      presentAddress: "456 Side St, Townsville",
      guardian: {
        fatherName: "John Doe Sr.",
        fatherOccupation: "Engineer",
        fatherContactNo: "111-222-3333",
        motherName: "Jane Doe",
        motherOccupation: "Doctor",
        motherContactNo: "444-555-6666"
      },
      localGuardian: {
        name: "Guardian Name",
        occupation: "Guardian Occupation",
        contactNo: "777-888-9999",
        address: "789 Local St, Villagetown"
      },
      admissionSemester: "656ddc03add0f6c6b23932df",
      academicDepartment: "656df3bf7d4449d58997f81f",
   
    
  }
const CreateStudent = () => {
    const [addStudent]=useAddStudentMutation();
    const {data:sData,isLoading:sIsLoading}=useGetAllSemesterQuery(undefined)
    const {data:dData,isLoading:dIsLoading}=useGetAllAcademicDeptQuery(undefined,{skip:sIsLoading})
    const semesterOptions=sData?.data?.map((item)=>({
        value:item._id,
        label:`${item.name} ${item.year}`
    }))
    const departmentOptions=dData?.data?.map((item)=>({
        value:item._id,
        label:item.name
    }))
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        const studentData={
            password:'pritom1234',
            student:data
        }
    
        const formData=new FormData();

        formData.append('data',JSON.stringify(studentData));
        formData.append('file',data.profileImg);
        const res= addStudent(formData)
        console.log(res);
    //! This is for development
    //! Just for checking
       console.log(Object.fromEntries(formData));
    }

    return (
        <Row>
            <Col span={24}>
                <PHForm defaultValues={defaultValues} onSubmit={onSubmit}>
                    <Divider>Personal Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHInput name="name.firstName" type="text" label="First Name" />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHInput name="name.middleName" type="text" label="Middle Name" />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHInput name="name.lastName" type="text" label="Last Name" />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHDatePicker name="dateOfBirth"  label="Date of birth" />
                        </Col>
                
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHSelect name="gender" label="Gender" options={genderOptions} />
                        </Col>
                     
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHSelect name="bloodGroup" label="Blood Group" options={bloodGroupOptions} />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <Controller
                            name="profileImg"
                            render={({field:{onChange,value,...field}})=><Form.Item label="Picture">
                                
                                <Input type="file" value={value?.fileName} {...field} onChange={(e)=>onChange(e.target.files?.[0])} />
                            </Form.Item>}
                            />
                        </Col>
                    </Row>

                    <Divider>Contact Info</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="email" label="Email" />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHInput name="contactNo" type="text" label="Contact No" />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHInput name="emergencyContactNo" type="text" label="Emergency Contact" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="presentAddress"
                                label="Present Address"
                            />
                        </Col>
                        <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
                            <PHInput name="permanentAddress" type="text" label="Permanent Address" />
                        </Col>

                    </Row>

                    <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span:12}} lg={{span:8}}>
              <PHSelect disabled={sIsLoading} name="admissionSemester" label="Admission Semester" options={semesterOptions}/>
            </Col>
            <Col span={24} md={{span:12}} lg={{span:8}}>
              <PHSelect disabled={dIsLoading} name="academicDepartment" label="Academic Department" options={departmentOptions}/>
            </Col>
          </Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateStudent;