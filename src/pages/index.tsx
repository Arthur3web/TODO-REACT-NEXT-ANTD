import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Popover,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    label,
    children,
  } as MenuItem;
}

const statusList = ["All", "Done", "Undone"];
const menu = (
  <Menu>
    {statusList.map((el, index) => (
      <Menu.Item key={index + 1}>
        <CheckCircleOutlined
          style={{ fontSize: "20px", marginRight: "10px" }}
        />
        {el}
      </Menu.Item>
    ))}
  </Menu>
);

const items: MenuProps["items"] = [
  {
    label: "Today",
    key: 1,
    icon: (
      <ScheduleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
    ),
  },
  {
    label: (
      <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']} overlayStyle={{width: 185}}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <CheckCircleOutlined style={{ fontSize: "20px", marginRight: "10px" }} /> All
        </a>
      </Dropdown>
    ),
    key: 2,
  },
  {
    label: "Date",
    key: 3,
    icon: (
      <>
        <ArrowDownOutlined style={{ fontSize: "10px" }} />
        <ArrowUpOutlined style={{ fontSize: "10px", margin: 0 }} />
      </>
    ),
  },
];

// const allSubMenuItems: MenuProps["items"] = statusList.map((el, index) => {
//   return getItem(
//     el,
//     index + 1,
//     <CheckCircleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
//   );
// });

// const items: MenuProps["items"] = [
//   getItem(
//     "Today",
//     1,
//     <ScheduleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
//   ),
//   getItem(
//     "All",
//     2,
//     <CheckCircleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />,
//     allSubMenuItems // Добавляем элементы подменю "All"
//   ),
//   getItem(
//     "Date",
//     3,
//     <>
//       <ArrowDownOutlined style={{ fontSize: "10px" }} />
//       <ArrowUpOutlined style={{ fontSize: "10px", margin: 0 }} />
//     </>
//   ),
// ];

interface DataTypes {
  key: React.Key;
  content: string;
  timeend: Date;
}

const columns: TableProps<DataTypes>["columns"] = [
  {
    title: "Task content",
    dataIndex: "taskcontent",
  },
  {
    title: "Time end",
    dataIndex: "timeend",
  },
];

const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];

const content = <Button>Выйти</Button>;

const alignOptions = ["flex-start", "center", "flex-end"];

export default function Home() {
  return (
    <main>
      <Layout
        style={{
          padding: "0% 7% 0 5%",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          style={{ width: 1366, height: 1024 }}
        >
          <Typography
            style={{
              fontSize: "96px",
              fontFamily: "Roboto",
              fontWeight: "700",
              color: "#404040",
            }}
          >
            TODO <span style={{ color: "#9333ea" }}>UI</span>
          </Typography>
          <Flex>
            <Layout>
              <Layout.Header
                style={{
                  background: "white",
                  height: 47,
                  padding: "16px 20px 16px 20px",
                  width: 672,
                  borderRadius: 10,
                }}
              >
                <Flex align="center" justify="space-between">
                  <Typography>To-Do</Typography>
                  <Typography>Username</Typography>
                  <Popover
                    content={content}
                    title="Welcome, user!"
                    trigger="click"
                    placement="bottomRight"
                  >
                    <Badge dot>
                      <Avatar
                        size={20}
                        shape="square"
                        icon={<UserOutlined />}
                      />
                    </Badge>
                  </Popover>
                </Flex>
              </Layout.Header>
              <Layout.Content
                style={{
                  paddingTop: "48px",
                  width: 672,
                  borderRadius: 10,
                }}
              >
                <Flex>
                  <Flex
                    vertical
                    style={{
                      background: "white",
                      marginRight: 30,
                      borderRadius: 10,
                    }}
                  >
                    <Menu
                      style={{
                        width: 185,
                        // marginRight: 30,
                        borderRadius: 10,
                      }}
                      mode="inline"
                      items={items}
                    />
                    <Button
                      icon={
                        <PlusOutlined
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                      }
                      style={{ width: 185, marginTop: "auto" }}
                    >
                      Add Task
                    </Button>
                  </Flex>

                  <Layout
                    style={{
                      // width: 457,
                      height: 312,
                      borderRadius: 10,
                      padding: "31px 17px 21px 21px",
                      background: "white",
                    }}
                  >
                    {/* <Table
                    columns={columns}
                    /> */}
                  </Layout>
                </Flex>
              </Layout.Content>
            </Layout>
          </Flex>
        </Flex>
      </Layout>
    </main>
  );
}
