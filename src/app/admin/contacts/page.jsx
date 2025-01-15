
// // import { Box } from "@mui/material";
// // import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// // // import { tokens } from "../../components/themes/theme";
// // import { mockDataContacts } from "../../data/mockData";
// // import Header from "../../components/Header";
// // // import { useTheme } from "@mui/material";
// // import { db } from '../../../lib/db';


// // async function getPrescription() {
// //   const response = await db.prescription.findMany({
// //     select: {
// //       id: true,
// //       patientName: true,
// //       medication: true,
// //       doctorName: true,
// //       phoneNumber: true,
// //       prescriptionDate: true,
// //       prescriptionFilePath: true,
// //       status: true,
// //       declineReason: true,
// //       createdAt: true,
// //       updatedAt: true,
// //     },
// //     orderBy: {
// //       createdAt: 'desc'
// //     }
// //   });
// //   return response;
// // }

// // const Contacts = async () => {
// //   const prescriptions = await getPrescription();
// //   // const theme = useTheme();
// //   // const colors = tokens(theme.palette.mode);

// //   const columns = [
// //     { field: "id", headerName: "ID", flex: 0.5 },
// //     { field: "registrarId", headerName: "Registrar ID" },
// //     {
// //       field: "patientName",
// //       headerName: "patientName",
// //       flex: 1,
// //       cellClassName: "name-column--cell",
// //     },
// //     {
// //       field: "medication",
// //       headerName: "medication",
// //       type: "number",
// //       headerAlign: "left",
// //       align: "left",
// //     },
// //     {
// //       field: "doctorName",
// //       headerName: "doctorName",
// //       flex: 1,
// //     },
// //     {
// //       field: "phoneNumber",
// //       headerName: "phoneNumber",
// //       flex: 1,
// //     },
// //     {
// //       field: "prescriptionDate",
// //       headerName: "prescriptionDate",
// //       flex: 1,
// //     },
// //     {
// //       field: "prescriptionFilePath",
// //       headerName: "prescriptionFilePath",
// //       flex: 1,
// //     },
// //     {
// //       field: "status",
// //       headerName: "status",
// //       flex: 1,
// //     },
// //     {
// //       field: "declineReason",
// //       headerName: "declineReason",
// //       flex: 1,
// //     },
// //     {
// //       field: "createdAt",
// //       headerName: "createdAt",
// //       flex: 1,
// //     },
// //     {
// //       field: "updatedAt",
// //       headerName: "updatedAt",
// //       flex: 1,
// //     },

// //   ];

// //   return (
// //     <Box m="20px">
// //       <Header
// //         title="CONTACTS"
// //         subtitle="List of Contacts for Future Reference"
// //       />
// //       <Box
// //         m="40px 0 0 0"
// //         height="75vh"
// //         // sx={{
// //         //   "& .MuiDataGrid-root": {
// //         //     border: "none",
// //         //   },
// //         //   "& .MuiDataGrid-cell": {
// //         //     borderBottom: "none",
// //         //   },
// //         //   "& .name-column--cell": {
// //         //     color: colors.greenAccent[300],
// //         //   },
// //         //   "& .MuiDataGrid-columnHeaders": {
// //         //     backgroundColor: colors.blueAccent[700],
// //         //     borderBottom: "none",
// //         //   },
// //         //   "& .MuiDataGrid-virtualScroller": {
// //         //     backgroundColor: colors.primary[400],
// //         //   },
// //         //   "& .MuiDataGrid-footerContainer": {
// //         //     borderTop: "none",
// //         //     backgroundColor: colors.blueAccent[700],
// //         //   },
// //         //   "& .MuiCheckbox-root": {
// //         //     color: `${colors.greenAccent[200]} !important`,
// //         //   },
// //         //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
// //         //     color: `${colors.grey[100]} !important`,
// //         //   },
// //         // }}
// //       >
// //         <DataGrid
// //           rows={prescriptions}
// //           columns={columns}
// //           components={{ Toolbar: GridToolbar }}
// //         />
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Contacts;


// import { useTheme } from "@mui/material";
// import { ResponsiveBar } from "@nivo/bar";
// import { tokens } from "../../components/themes/theme";
// import { mockBarData as data } from "../../data/mockData";

// const BarChart = ({ isDashboard = false }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <ResponsiveBar
//       data={data}
//       theme={{
//         // added
//         axis: {
//           domain: {
//             line: {
//               stroke: colors.grey[100],
//             },
//           },
//           legend: {
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//           ticks: {
//             line: {
//               stroke: colors.grey[100],
//               strokeWidth: 1,
//             },
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//         },
//         legends: {
//           text: {
//             fill: colors.grey[100],
//           },
//         },
//       }}
//       keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
//       indexBy="country"
//       margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//       padding={0.3}
//       valueScale={{ type: "linear" }}
//       indexScale={{ type: "band", round: true }}
//       colors={{ scheme: "nivo" }}
//       defs={[
//         {
//           id: "dots",
//           type: "patternDots",
//           background: "inherit",
//           color: "#38bcb2",
//           size: 4,
//           padding: 1,
//           stagger: true,
//         },
//         {
//           id: "lines",
//           type: "patternLines",
//           background: "inherit",
//           color: "#eed312",
//           rotation: -45,
//           lineWidth: 6,
//           spacing: 10,
//         },
//       ]}
//       borderColor={{
//         from: "color",
//         modifiers: [["darker", "1.6"]],
//       }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? undefined : "country", // changed
//         legendPosition: "middle",
//         legendOffset: 32,
//       }}
//       axisLeft={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? undefined : "food", // changed
//         legendPosition: "middle",
//         legendOffset: -40,
//       }}
//       enableLabel={false}
//       labelSkipWidth={12}
//       labelSkipHeight={12}
//       labelTextColor={{
//         from: "color",
//         modifiers: [["darker", 1.6]],
//       }}
//       legends={[
//         {
//           dataFrom: "keys",
//           anchor: "bottom-right",
//           direction: "column",
//           justify: false,
//           translateX: 120,
//           translateY: 0,
//           itemsSpacing: 2,
//           itemWidth: 100,
//           itemHeight: 20,
//           itemDirection: "left-to-right",
//           itemOpacity: 0.85,
//           symbolSize: 20,
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemOpacity: 1,
//               },
//             },
//           ],
//         },
//       ]}
//       role="application"
//       barAriaLabel={function (e) {
//         return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
//       }}
//     />
//   );
// };

// export default BarChart;
