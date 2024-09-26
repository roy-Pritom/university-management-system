import { Button, Pagination, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import { useState } from "react";
import { TQueryParam } from "../../../types/global";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from '../../../types';
import { Link } from 'react-router-dom';

export type TTableData = Pick<TStudent,
    'id' | 'email'  
>



const StudentData = () => {
    const [page, setPage] = useState(1)
    const [params, setParams] = useState<TQueryParam[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: studentData, isLoading, isFetching } = useGetAllStudentQuery([{ name: 'limit', value: 3 },
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params]);

    const metaData = studentData?.meta;

    const tableData = studentData?.data?.map(({ _id, name, id, email }) => ({
        key: _id,
        name: `${name?.firstName} ${name?.middleName} ${name?.lastName}`,
        id,
        email


    }))


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Roll No',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                // console.log(item);
                return (
                    <Space>
                        <Button>Update</Button>
                        <Link to={`/admin/student-data/${item?.key}`}><Button>Details</Button></Link>
                        <Button>Block</Button>
                    </Space>
                )
            },
            width: "1%"
        }
    ];
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record: DataType) => ({
        //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //   name: record.name,
        // }),
      };


    const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = []
            filters.name?.forEach(item => {
                queryParams.push({ name: 'name', value: item })
            })
            filters.year?.forEach(item => {
                queryParams.push({ name: 'year', value: item })
            })

            setParams(queryParams)
        }
    };
    // if(isLoading){
    //     return <p>Loading...</p>
    // }

    

    return (
        <>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                onChange={onChange} />
            <Pagination
                onChange={(value) => setPage(value)}
                total={metaData?.total}
                pageSize={metaData?.limit}
                current={page}
            />
        </>
    );
};


export default StudentData;