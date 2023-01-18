import { Board, Priority } from "../type";
// import highest from "../images/icons/priorities/highest.svg";

export const initialData: Board = {
  tasks: {
    // "task-1": { id: "task-1", content: "Take out the garbage" },
    // "task-2": { id: "task-2", content: "Watch my favorite show" },
    // "task-3": { id: "task-3", content: "Charge my phone" },
    // "task-4": { id: "task-4", content: "Cook dinner" },
  },
  count: 0,
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO DO",
      // taskIds: ["task-1", "task-2", "task-3", "task-4"],
      taskIds: [],
      status: "todo",
    },
    "column-2": {
      id: "column-2",
      title: "IN PROGRESS",
      taskIds: [],
      status: "doing",
    },
    "column-3": {
      id: "column-3",
      title: "DONE",
      taskIds: [],
      status: "done",
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export const baseURL =
  "https://us-east-1.aws.data.mongodb-api.com/app/application-0-kydyf/endpoint";

// export const priorities: {
//   value: string;
//   label: JSX.Element;
// }[] = [
//   {
//     value: "highest",
//     label: (
//       <>
//         <img
//           src="../images/icons/priorities/highest.svg"
//           width="24"
//           height="24"
//           alt="優先度最高"
//         />
//         最高
//       </>
//     ),
//   },
//   {
//     value: "high",
//     label: (
//       <>
//         <img
//           src="../images/icons/priorities/high.svg"
//           width="24"
//           height="24"
//           alt="優先度高"
//         />
//         高
//       </>
//     ),
//   },
//   {
//     value: "medium",
//     label: (
//       <>
//         <img
//           src="../images/icons/priorities/medium.svg"
//           width="24"
//           height="24"
//           alt="優先度中"
//         />
//         中
//       </>
//     ),
//   },
//   {
//     value: "low",
//     label: (
//       <>
//         <img
//           src="../images/icons/priorities/low.svg"
//           width="24"
//           height="24"
//           alt="優先度低"
//         />
//         低
//       </>
//     ),
//   },
//   {
//     value: "lowest",
//     label: (
//       <>
//         <img
//           src="../images/icons/priorities/lowest.svg"
//           width="24"
//           height="24"
//           alt="優先度最低"
//         />
//         最低
//       </>
//     ),
//   },
//   {
//     value: "none",
//     label: (
//       <>
//         <img
//           src="../images/icons/priorities/none.svg"
//           width="24"
//           height="24"
//           alt="優先度未設定"
//         />
//         未設定
//       </>
//     ),
//   },
// ];

export const priorities: {
  priority: Priority;
  text: string;
  imgPath: string;
}[] = [
  {
    priority: "highest",
    text: "最高",
    imgPath: "../images/icons/priorities/highest.svg",
  },
  {
    priority: "high",
    text: "高",
    imgPath: "../images/icons/priorities/high.svg",
  },
  {
    priority: "medium",
    text: "中",
    imgPath: "../images/icons/priorities/medium.svg",
  },
  {
    priority: "low",
    text: "低",
    imgPath: "../images/icons/priorities/low.svg",
  },
  {
    priority: "lowest",
    text: "最低",
    imgPath: "../images/icons/priorities/lowest.svg",
  },
  {
    priority: "none",
    text: "未設定",
    imgPath: "../images/icons/priorities/none.svg",
  },
];

// export const priorities = ["最高", "高", "中", "低", "最低", "未設定"];
