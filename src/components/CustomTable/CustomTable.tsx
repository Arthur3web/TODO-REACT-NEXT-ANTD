import { Table, TableProps } from "antd"

const columns: TableProps["columns"] = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 140,
    },
    {
      title: "End Time",
      dataIndex: "timeend",
      key: "timeend",
      width: 80,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <span>{completed ? "Completed" : "Not Completed"}</span>
      ),
      width: 100,
    },
  ];


const CustomTable = () => {
    return (
        <Table
        // rowSelection={rowSelection}
        columns={columns}
        // dataSource={mapTasksToTableDate(tasklist)}
        // pagination={{ pageSize: 3 }}
      />
    )
}

export default CustomTable