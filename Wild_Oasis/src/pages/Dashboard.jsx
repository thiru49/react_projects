import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from '../features/dashboard/DashboardLayout'
import DashboardFilter from "../features/dashboard/DashboardFilter";
import styled from "styled-components";

function Dashboard() {
  return (
   <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter/>
    </Row>
    <Row type="horizontal">
      <DashboardLayout/>
    </Row>
  </>
  );
}

export default Dashboard;
