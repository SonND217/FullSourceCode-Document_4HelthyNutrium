import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { object } from "yup";
import FoodAPI from "../../service/Actions/FoodAPI";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} không được bỏ trống.`,
          },
          {
            pattern: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/,
            message: `${title} phải là chữ số và giá trị lớn hơn 0`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const TableEditIngredientFood = ({
  ValueIngredient,
  getDataFromTable,
  valueFoodIdFormTable,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (valueFoodIdFormTable) {
      await FoodAPI.getById(IdFoodFormTable).then((res) => {
        // console.log("food = ", res.data);
        let FoodArr = [];
        const food = res.data;
        const nameIngredientFood = food.ingredientMasses.map(
          (data) => data.ingredient.ingredientName
        );
        const massIngredientFood = food.ingredientMasses.map((data) =>
          data.mass.toString()
        );
        nameIngredientFood.forEach((e, i) => {
          FoodArr.push({
            key: i,
            ingredientName: e,
            mass: massIngredientFood[i],
          });
        });
        setDataSource(FoodArr);
        setCount(FoodArr.length);
      });
    }
  }, [valueFoodIdFormTable]);

  const arrIngredient = ValueIngredient;
  const IdFoodFormTable = valueFoodIdFormTable;
  const [dataSource, setDataSource] = useState("");
  const [count, setCount] = useState(0);
  let TextDisplayWhenNoData = {
    emptyText: "Dữ liệu trống",
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  // console.log(foods);
  // console.log(massFood);
  // console.log(FoodArr);
  // console.log(originData);
  const defaultColumns = [
    {
      title: "Tên nguyên liệu",
      dataIndex: "ingredientName",
      width: "30%",
      editable: false,
    },
    {
      title: "Khối lượng (gram)",
      dataIndex: "mass",
      editable: true,
    },
    {
      title: "Xoá",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Bạn chắc chắn muốn xoá chứ?"
            onConfirm={() => handleDelete(record.key)}
            okText={"Xoá"}
            cancelText={"Huỷ"}
          >
            <a>Xoá</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      ingredientName: `${arrIngredient}`,
      mass: "0",
    };
    if (arrIngredient == undefined) {
      return;
    }
    if (!dataSource.find((data) => data.ingredientName == arrIngredient)) {
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
    }

    // console.log(arrIngredient);
    // console.log(arrIngredienthasave);
  };

  const onsubmit = () => {
    //Gửi giá trị từ form sang Add
    // dataSource.forEach(function (v) {
    //   delete v.key;
    // });
    //Kiểm tra bảng chứa undefined thì x
    console.log(dataSource);
    getDataFromTable(dataSource);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        Thêm nguyên liệu
      </Button>
      <Button
        onClick={onsubmit}
        type="primary"
        style={{
          marginTop: 16,
          marginBottom: 16,
          float: "right",
        }}
      >
        Lưu danh sách nguyên liệu
      </Button>
      <Table
        components={components}
        locale={TextDisplayWhenNoData}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default TableEditIngredientFood;
