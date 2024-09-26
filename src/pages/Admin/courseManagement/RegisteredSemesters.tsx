import { Button, Dropdown,  Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
// import { TQueryParam } from "../../../types/global";

import { TRegisterSemester, TResponse } from '../../../types';
// import { Link } from 'react-router-dom';
import { useGetAllRegisterSemesterQuery, useUpdateRegisterSemesterMutation } from '../../../redux/features/admin/courseManagement.api';
import { useState } from 'react';
import { toast } from 'sonner';

export type TTableData = Pick<TRegisterSemester,
  'startDate' | 'endDate' | 'status' 
>
const items=[
    {
        label:"UPCOMING",
        key:"UPCOMING"
    },
    {
        label:"ONGOING",
        key:"ONGOING",
    },
    {
        label:"ENDED",
        key:'ENDED'
    },
]
const RegisteredSemesters = () => {
    const [semesterId, setSemesterId] = useState('');
    // const [page, setPage] = useState(1)
    // const [params, setParams] = useState<TQueryParam[]>([]);
    const { data: sData, isFetching } = useGetAllRegisterSemesterQuery(undefined);

    const [updateSemester]=useUpdateRegisterSemesterMutation();

    // const metaData = studentData?.meta;

    const tableData = sData?.data?.map(({ _id,academicSemester,startDate,endDate,status}) => ({
        key: _id,
        name: `${academicSemester?.name} ${academicSemester?.year}`,
        status,
        startDate,
        endDate
    }))

    const handleUpdateStatus=async(data:any)=>{
        const toastId = toast.loading('Updating...')
        const updateData={
            id:semesterId,
            data:{
                status:data.key
            }
        }
        try {
            const res = (await updateSemester(updateData)) as TResponse<any>;
            if (res.error) {
                toast.error(res?.error?.data.message, { id: toastId })
            }
            else {
                toast.success('Semester updated successfully', { id: toastId })

            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId })
        }
    }
        const menuProps = {
            items,
            onClick: handleUpdateStatus,
          };
    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render:(item)=>{
                // console.log(item);
                let color;
                if (item === 'UPCOMING') {
                    color = 'blue';
                  }
                  if (item === 'ONGOING') {
                    color = 'green';
                  }
                  if (item === 'ENDED') {
                    color = 'red';
                  }
                return (
                    <Tag color={color}>{item}</Tag>
                )
            }
        },
        {
            title: 'Start Date',
            key: 'startDate',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            key: 'endDate',
            dataIndex: 'endDate',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                // console.log(item);
                return (
                <Dropdown menu={menuProps} trigger={['click']}>
                    <Button onClick={()=>setSemesterId(item.key)}>Update</Button>
                </Dropdown>
                )
            },
            width: "1%"
        }
    ];



    // if(isLoading){
    //     return <p>Loading...</p>
    // }

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


export default RegisteredSemesters;