import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Input,
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
import AddTaskForm, { Task } from "@/components/AddTaskForm";
import CustomTable from "@/components/CustomTable/CustomTable";

const inter = Inter({ subsets: ["latin"] });

type MenuItem = Required<MenuProps>["items"][number];

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
      <Dropdown
        overlay={menu}
        placement="bottom"
        trigger={["click"]}
        overlayStyle={{ width: 185, marginLeft: "-30px", marginTop: "40px" }}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          All
        </a>
      </Dropdown>
    ),
    key: 2,
    icon: (
      <CheckCircleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
    ),
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

const mapTasksToTableDate = (tasks: Task[]) => {
  return tasks.map((task) => ({
    ...task,
    key: task.id,
  }));
};

const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];

const alignOptions = ["flex-start", "center", "flex-end"];

export default function Home() {
  const [tasklist, setTasklist] = useState<Task[]>([]);
  const [isClickAddTaskButton, setClickAddTaskButton] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);


  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleAddTask = (task: Task) => {
    setTasklist([
      ...tasklist,
      {
        id: new Date().toISOString(),
        // title,
        ...task,
        completed: false,
        timestart: Date.now(),
        // timeend,
      },
    ]);
    setClickAddTaskButton(false);
  };

  const content = <Button style={{ width: 150, height: 40 }}>Exit</Button>;
  return (
    <>
      <main>
        <Layout
          style={{
            padding: "0% 7% 0 5%",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(300deg, #B9D5FF 0%, #F6D1FC 98.93%)",
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
              <Layout style={{ borderRadius: 10, background: "transparent" }}>
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
                    <Typography style={{ color: "#9333ea" }}>To-Do</Typography>
                    <Typography style={{ color: "#9333ea" }}>
                      Username
                    </Typography>
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
                        background: "transparent",
                        marginRight: 30,
                        borderRadius: 10,
                      }}
                    >
                      <Menu
                        style={{
                          // width: 185,
                          borderRadius: 10,
                          background: "transparent",
                          border: 0,
                        }}
                        // mode="inline"
                        items={items}
                      />
                      <Button
                        icon={
                          <PlusOutlined
                            style={{ fontSize: "20px", marginRight: "10px" }}
                          />
                        }
                        style={{
                          width: 185,
                          marginTop: "auto",
                          height: 40,
                          borderRadius: 10,
                          background: "transparent",
                          border: "1px solid gray",
                        }}
                        onClick={() => setClickAddTaskButton(true)}
                      >
                        Add Task
                      </Button>
                    </Flex>

                    <Layout
                      style={{
                        // width: 457,
                        height: 320,
                        borderRadius: 10,
                        padding: "31px 17px 21px 21px",
                        background: "white",
                      }}
                    >
                      <CustomTable/>
                        <div>
                          <Button
                            type="primary"
                            onClick={start}
                            disabled={!hasSelected}
                            loading={loading}
                          >
                            Completed
                          </Button>
                          <span style={{ marginLeft: 8 }}>
                            {hasSelected
                              ? `Selected ${selectedRowKeys.length} items`
                              : ""}
                          </span>
                        </div>
                    </Layout>
                  </Flex>
                </Layout.Content>
              </Layout>
            </Flex>
          </Flex>
        </Layout>
      </main>
      <AddTaskForm
        visible={isClickAddTaskButton}
        onCancel={() => setClickAddTaskButton(false)}
        onSubmit={handleAddTask}
      />
    </>
  );
}