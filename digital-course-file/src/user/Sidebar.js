import {CDBSidebar,CDBSidebarContent,CDBSidebarFooter,CDBSidebarHeader,CDBSidebarMenu,CDBSidebarMenuItem,} from 'cdbreact';
import { NavLink,Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{  display: 'flex', height: '100vh', overflow: 'scroll initial'}}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <a
            className="text-decoration-none"
            style={{ color: 'inherit'}}
          >
            <p align="center">Welcome, Professor </p>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to={"/"} activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="table">Course File</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={'/assignment'} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">Assignments</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/feedback" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Feedbacks
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>


      </CDBSidebar>

    </div>
  );
};

export default Sidebar;