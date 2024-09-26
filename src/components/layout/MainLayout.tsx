// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

import {  Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Button } from 'antd/es/radio';
import { useAppDispatch } from '../../redux/hooks';
import { logout} from '../../redux/features/auth/authSlice';


const { Header, Content } = Layout;

// const items = [
//     {
//         key:'Dashboard',
//         label:<NavLink to='/admin/dashboard'>Dashboard</NavLink>
//     },
//     {
//         key:'User Management',
//         label:"User Management",
//         children:[
//             {
//                 key:'Create Admin',
//                 label:"Create-admin"
//             },
//             {
//                 key:'Create Student',
//                 label:"Create-student"
//             },
//         ]
//     },
// ]


const MainLayout = () => {
  const dispatch=useAppDispatch();

  const handleLogout=()=>{
     dispatch(logout())
  }
  
    return (
        <Layout style={{height:"100%"}}>
          <Sidebar/>
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>

          </Header>

        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
       
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
    
      </Layout>
    </Layout>
    );
};

export default MainLayout;