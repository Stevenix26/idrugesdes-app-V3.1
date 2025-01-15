import React from 'react'
import Link from 'next/link'
import { db } from '../../../lib/db'


async function getPrescription() {
    const response = await db.prescription.findMany({
        select: {
            id: true,
            patientName: true,
            doctorName: true,
            medication: true,
            createdAt: true,


        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return response;
}

const InboxPage = async () => {

    const prescriptions = await getPrescription();
    console.log(prescriptions)



    return (
        <div className="container" style={{ padding: "30px" }}>
            <div className='grid items-center justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
                {prescriptions.map(item => (
                    <div className="overflow-x-auto">
                        <table  className="table table-zebra">
                            {/* head */}
                            <thead >
                                <tr key={item.id} item={item}>
                                    <th>id</th>
                                    <th>Patient Name</th>
                                    <th>Doctor Name</th>
                                    <th>Medication</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>{item.id}</th>
                                    <td>{item.patientName}</td>
                                    <td>{item.doctorName}</td>
                                    <td>{item.medication}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                ))}
            </div>

           



            
        </div>





    )
}

export default InboxPage



// import {
//     MenuItem,
//     Select,
//     FormControl,
//     TextField,
//     InputLabel,
//     TablePagination,
// } from "@mui/material";
// import { useReducer } from "react";
// // import { testUsers } from "../../../constant/testData";
// import { useUserContext } from "../../../context/UserContext";
// import SelectHelper from "../../../components/SelectHelper";
// import CustomTable from "../../../components/CustomTable";
// import ProfileInfoModal from "../../../components/ProfileInfoModal";
// import Alert from "../../../components/Alert";
// import reducer from "./reducer";

// const AllUsers = () => {
//     const initialState = {
//         searchQuery: "",
//         searchOption: "firstName",
//         selectedUser: null,
//         sortOption: "default",
//         page: 0,
//         rowsPerPage: 10,
//         alert: { open: false, message: "", color: "" },
//     };
//     const { allUsers } = useUserContext();

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const handleSearchChange = (e) => {
//         dispatch({ type: "SEARCH_CHANGE", payload: e.target.value });
//     };
//     const handleSelectOptionChange = (e) => {
//         dispatch({ type: "SELECT_OPTION_CHANGE", payload: e.target.value });
//     };
//     const handleChangeSort = (event) => {
//         dispatch({ type: "CHANGE_SORT", payload: event.target.value });
//     };
//     const handleSelectUser = (user) => {
//         dispatch({ type: "SELECT_USER", payload: user });
//     };
//     const closeModal = () => {
//         dispatch({ type: "CLOSE_MODAL" });
//     };
//     const handleChangePage = (event, newPage) => {
//         dispatch({ type: "CHANGE_PAGE", payload: newPage });
//     };
//     const handleChangeRowsPerPage = (event) => {
//         dispatch({
//             type: "CHANGE_ROWS_PER_PAGE",
//             payload: parseInt(event.target.value, 10),
//         });
//     };
//     const displayAlert = (alertType, msg) => {
//         dispatch({ type: "DISPLAY_ALERT", payload: { alertType, msg } });
//     };

//     const {
//         searchQuery,
//         searchOption,
//         sortOption,
//         rowsPerPage,
//         page,
//         selectedUser,
//         alert,
//     } = state;

//     const filteredUsers = allUsers.filter((user) => {
//         const searchTerm = searchQuery.toLowerCase();
//         if (searchOption === "firstName") {
//             return user.fname.toLowerCase().includes(searchTerm);
//         } else if (searchOption === "lastName") {
//             return user.lname.toLowerCase().includes(searchTerm);
//         }
//         return false;
//     });

//     const sortOptions = [
//         // { value: "status_asc", label: "Status (Active → Offline)" },
//         // { value: "status_desc", label: "Status (Offline → Active)" },
//         { value: "default", label: "Default" },
//         { value: "last_seen_asc", label: "Last Seen (Old → Recent)" },
//         { value: "last_seen_desc", label: "Last Seen (Recent → Old)" },
//         { value: "created_asc", label: "Signup Date (Old → New)" },
//         { value: "created_desc", label: "Signup Date (New → Old)" },
//     ];

//     // Sorting function
//     const sortedUsersData = [...filteredUsers].sort((a, b) => {
//         const lastUnderscoreIndex = sortOption.lastIndexOf("_");
//         const sortKey = sortOption.slice(0, lastUnderscoreIndex);
//         const sortOrder = sortOption.slice(lastUnderscoreIndex + 1);
//         if (sortKey === "last_seen") {
//             const dateA = a.last_seen ? new Date(a.last_seen) : null;
//             const dateB = b.last_seen ? new Date(b.last_seen) : null;

//             if (!dateA && !dateB) {
//                 return 0; // Both users have no last_seen date, keep them in the same order
//             } else if (!dateA) {
//                 return 1; // User a has no last_seen, put it at the end
//             } else if (!dateB) {
//                 return -1; // User b has no last_seen, put it at the end
//             } else {
//                 return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//             }
//         } else if (sortKey === "created") {
//             return sortOrder === "asc"
//                 ? new Date(a.created) - new Date(b.created)
//                 : new Date(b.created) - new Date(a.created);
//         }
//         return 0;
//     });

//     const displayFieldsForTable = [
//         { id: "picture", label: "Picture", accessor: "img" },
//         { id: "name", label: "Name", accessor: "full_name" },
//         { id: "location", label: "Location", accessor: "location" },
//         { id: "status", label: "Status", accessor: "status" },
//         { id: "subscription", label: "Subscription", accessor: "premium" },
//         { id: "sign_up_date", label: "Sign Up Date", accessor: "created" },
//         { id: "last_seen", label: "Last Seen", accessor: "last_seen" },
//     ];

//     return (
//         <div className="min-h-[calc(100vh-10rem)]">
//             <div className="flex gap-4 mb-8">
//                 <div className="w-1/2">
//                     <TextField
//                         name="search"
//                         placeholder="Search..."
//                         type="text"
//                         fullWidth
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//                 <div className="w-1/2">
//                     <FormControl fullWidth>
//                         <Select
//                             id="search-option"
//                             value={searchOption}
//                             onChange={handleSelectOptionChange}
//                         >
//                             <MenuItem value="firstName" disableRipple>
//                                 First Name
//                             </MenuItem>
//                             <MenuItem value="lastName" disableRipple>
//                                 Last Name
//                             </MenuItem>
//                         </Select>
//                     </FormControl>
//                 </div>
//             </div>

//             {/* Sort */}
//             <div className="flex justify-end items-center mb-8">
//                 <div className="max-w-[48%]">
//                     <InputLabel id="sort-label">Sort</InputLabel>
//                     <FormControl fullWidth>
//                         <SelectHelper
//                             data={sortOptions}
//                             selectedData={sortOption}
//                             onChange={handleChangeSort}
//                             label="sort"
//                         />
//                     </FormControl>
//                 </div>
//             </div>
//             {/* <AllUsersTable usersData={testUsers} /> */}
//             <CustomTable
//                 users={sortedUsersData.slice(
//                     page * rowsPerPage,
//                     (page + 1) * rowsPerPage
//                 )}
//                 displayedFields={displayFieldsForTable}
//                 handleSelectUser={handleSelectUser}
//             />
//             <TablePagination
//                 component="div"
//                 count={filteredUsers.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//             <ProfileInfoModal
//                 onClose={closeModal}
//                 user={selectedUser}
//                 action={true}
//                 displayAlert={displayAlert}
//             />
//             <Alert
//                 isOpen={alert.open}
//                 text={alert.message}
//                 alertColor={alert.color}
//                 onClose={() => {
//                     displayAlert("reset");
//                 }}
//             />
