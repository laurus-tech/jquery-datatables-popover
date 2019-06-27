## Jquery-Datatables-Popover

## 目录

- [简介](#简介)
- [依赖](#依赖)
- [用法](#用法)
  - [快速使用](#快速使用)
  - [API](#api)
  - [可配置项](#可配置项)
  - [事件函数](#事件函数)
- [例子](#例子)

## 简介

- 一个弹出框组件，可以弹出表格信息以辅助选择
- 表格借助 datatables，基于 Jquery 拓展
- 还有更多功能待完善

## 依赖

- Jquery
- Datatables

## 用法

### 快速使用

```html
<!-- css -->
<link rel="stylesheet" href="css/table.popover.css" type="text/css" />

<!-- html -->
<div id="popover" class="table-popover fade"></div>

<!-- js -->
<script src="lib/jquery.min.js"></script>
<script src="lib/jquery.dataTables.min.js"></script>

<!-- first jquery, second datatables, third tablePopover -->

<script src="lib/table.popover.js"></script>
<script>
  const columns = [
    {
      data: "name",
      title: "名字"
    },
    {
        data: "gender",
        title: "性别"
    }
  ];

  const data = [
    {
      name: "张三",
      gender: "男"
    },
    {
      name: "西施",
      gender: "女"
    }
  ];

  $("#popover").tablePopover({
    columns: columns,
    data: data
  });
</script>
```

### API

- [`.tablePopover(options)`](<#.tablePopover(options))>)
- [`.tablePopover('show')`](<#.tablePopover('show'))>)
- [`.tablePopover('hide')`](<#.tablePopover('hide'))>)

#### .tablePopover(options)

```javascript
$("#popover").tablePopover({
  columns: columns,
  data: data
});
```

####    .tablePopover('show')
```javascript
$("#popover").tablePopover('show');
```

####    .tablePopover('hide')
```javascript
$("#popover").tablePopover('hide');
```

### 可配置项
可以对组件的样式、功能进行配置

|   名称    |   类型   |  是否必须  |  默认值  |       描述          |
|  :----   | :----:  |    ----   | :----:  |      ----          |
| title      | String  |     否    |         | 标题, 显示弹出框的标题      |
| columns |  Array  |     是    |   []    | 表格列对象, 用来显示表格的表头信息 <br> 数据格式: [{title: '名称', data: 'name'}]|
| data | Array | 是        | [] |  表格数据对象, 用来显示表格的表体信息 <br> 数据格式: [{name: '张三'}]<br><font color="#FF0505">key值需与表格列对象数组中定义的data名称相匹配</font> |
| width  | Number | 否| 600 | 弹出框的宽度  |
| height  | Number | 否| 400 |  弹出框的高度 |
| rowIndex  | Boolean | 否| false | 是否显示序号列  |
| tableStyle  | String | 否| table-bordered | 控制表格样式 <br> 可选项: table-bordered ; table-table-striped |
| chosenClose  | Boolean | 否| true | 选择表格行后关闭弹出框  |

### 事件函数
提供了一些事件函数，可供使用

|   事件类型    |   描述   |
|  :----   | :----:  |
|tp.shown| 弹出框显示出来之后被触发|
|tp.hidden| 弹出框被隐藏之后被触发|
|tp.row-selected | 选择表格数据后被触发|


## 例子

见example.html
