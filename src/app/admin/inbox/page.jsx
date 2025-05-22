"use client";

import React, { useState } from 'react'
import { db } from '../../../lib/db'
import { formatDistanceToNow } from 'date-fns'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import PrescriptionModal from '../../components/PrescriptionModal'

async function getPrescription() {
    const response = await db.prescription.findMany({
        select: {
            id: true,
            patientName: true,
            doctorName: true,
            medication: true,
            createdAt: true,
            status: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return response;
}

const InboxPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    React.useEffect(() => {
        const loadPrescriptions = async () => {
            try {
                const data = await getPrescription();
                setPrescriptions(data);
            } catch (error) {
                console.error('Failed to load prescriptions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPrescriptions();
    }, []);

    const filteredPrescriptions = prescriptions.filter(prescription => {
        const matchesSearch = (
            prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus = statusFilter === 'ALL' || prescription.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewPrescription = (prescription) => {
        setSelectedPrescription(prescription);
    };

    const handleCloseModal = () => {
        setSelectedPrescription(null);
    };

    const handleStatusChange = async (prescriptionId, newStatus) => {
        try {
            // Add your status update logic here
            const updatedPrescription = { ...selectedPrescription, status: newStatus };
            setPrescriptions(prescriptions.map(p =>
                p.id === prescriptionId ? updatedPrescription : p
            ));
            setSelectedPrescription(null);
        } catch (error) {
            console.error('Failed to update prescription status:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prescription Inbox</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage and review incoming prescriptions
                </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search prescriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Patient Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Doctor Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Medication
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Received
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPrescriptions.length > 0 ? (
                                filteredPrescriptions.map((prescription) => (
                                    <tr key={prescription.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {prescription.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {prescription.patientName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {prescription.doctorName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                            {prescription.medication}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prescription.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                : prescription.status === 'APPROVED'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                {prescription.status || 'PENDING'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDistanceToNow(new Date(prescription.createdAt), { addSuffix: true })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    onClick={() => handleViewPrescription(prescription)}
                                                >
                                                    View
                                                </button>
                                                {prescription.status === 'PENDING' && (
                                                    <>
                                                        <button
                                                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                            onClick={() => handleStatusChange(prescription.id, 'APPROVED')}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                            onClick={() => handleStatusChange(prescription.id, 'REJECTED')}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        No prescriptions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPrescription && (
                <PrescriptionModal
                    prescription={selectedPrescription}
                    onClose={handleCloseModal}
                />
            )}
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
