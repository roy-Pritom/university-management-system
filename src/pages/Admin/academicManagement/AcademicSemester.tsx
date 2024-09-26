import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";


import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types/global";

export type TTableData = Pick<TAcademicSemester,
    'name' | 'year' | 'startMonth' | 'endMonth'
>

// type TQueryParam={
//     name:string;
//     value:string;
// }

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: semesterData,isLoading,isFetching } = useGetAllSemesterQuery(params);

    const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
        key: _id,
        name,
        startMonth,
        endMonth,
        year
    }))
    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
                {
                    text: 'Summer',
                    value: 'Summer',

                },
            ],

        },
        {
            title: 'StartMonth',
            dataIndex: 'startMonth',
        },
        {
            title: 'EndMonth',
            dataIndex: 'endMonth',

        },
        {
            title: 'Year',
            dataIndex: 'year',
            filters: [
                {
                    text: '2024',
                    value: '2024',
                },
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: '2026',
                    value: '2026',

                },
                {
                    text: '2027',
                    value: '2027',

                },
            ],

        },
        {
            title: 'Action',
            key: 'x',
            render: () => {
                return (
                    <div className="">
                        <Button>Update</Button>
                    </div>
                )
            }
        }
    ];


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
        <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
    );
};


export default AcademicSemester;