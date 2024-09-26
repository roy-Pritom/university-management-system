import { Button, Modal, Table} from 'antd';
// import { TQueryParam } from "../../../types/global";
import { TRegisterSemester } from '../../../types';
// import { Link } from 'react-router-dom';
import { useAddFacultiesMutation, useGetAllCourseQuery } from '../../../redux/features/admin/courseManagement.api';
import { useState } from 'react';
import PHForm from '../../../components/form/PHForm';
import PHSelect from '../../../components/form/PHSelect';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';


export type TTableData = Pick<TRegisterSemester,
  'startDate' | 'endDate' | 'status' 
>

const Courses = () => {

    // const [page, setPage] = useState(1)
    // const [params, setParams] = useState<TQueryParam[]>([]);
    const { data: courses, isFetching } = useGetAllCourseQuery(undefined);


    // const metaData = studentData?.meta;

    const tableData = courses?.data?.map(({ _id,title,code,prefix}) => ({
        key: _id,
         title,
         code:`${prefix}${code}`
    }))

 
    const columns= [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
          
        },
      
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                // console.log(item);
                return <AddFacultyModal info={item}/>
            },
            width: "1%"
        }
    ];


    return (
        <>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
            />
            {/* <Pagination
                onChange={(value) => setPage(value)}
                total={metaData?.total}
                pageSize={metaData?.limit}
                current={page}
            /> */}
        </>
    );
};


const AddFacultyModal =({info})=>{
    const {data:facultiesData}=useGetAllFacultiesQuery(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
const [assignFaculty]=useAddFacultiesMutation();
    const facultyOptions=facultiesData?.data?.map((item)=>({
        value:item._id,
        label:item?.fullName
    }))
const handleSubmit:SubmitHandler<FieldValues>=(data)=>{
      const facultyData={
        courseId:info.key,
        data
      }
    //   console.log(facultyData);
    assignFaculty(facultyData)
    
}

  const showModal = () => {
    setIsModalOpen(true);
  };

 

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    return (
        <>
        <Button  onClick={showModal}>
          Assign Faculties
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <PHForm onSubmit={handleSubmit}>
            <PHSelect name='faculties' mode='multiple' label='Faculties' options={facultyOptions}/>
           <Button htmlType='submit'>Submit</Button>
          </PHForm>
        </Modal>
      </>
    )
};

export default Courses;