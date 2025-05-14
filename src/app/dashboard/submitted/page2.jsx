// pages/prescriptions.js
import React from "react";
import { db } from "../../../lib/db";

const statusColor = {
  approved: "success",
  pending: "warning",
  rejected: "error",
};
const statusBadgeStyles = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

async function getPrescription() {
  const response = await db.prescription.findMany({
    select: {
      id: true,
      patientName: true,
      medication: true,
      doctorName: true,
      phoneNumber: true,
      prescriptionDate: true,
      prescriptionFilePath: true,
      status: true,
      declineReason: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response;
}

const Prescriptions = async () => {
  const prescriptions = await getPrescription();
  const pictures = statusColor;

 

  return (
    <>
      {/* <section className="w-full bg-gradient-to-bl from-orange-50 to-slate-100  ">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-orange-400 shadow-2xl "
            fill="#0099ff"
            fill-opacity="0.15"
            d="M0,32L14.1,32C28.2,32,56,32,85,64C112.9,96,141,160,169,202.7C197.6,245,226,267,254,277.3C282.4,288,311,288,339,250.7C367.1,213,395,139,424,117.3C451.8,96,480,128,508,128C536.5,128,565,96,593,80C621.2,64,649,64,678,90.7C705.9,117,734,171,762,202.7C790.6,235,819,245,847,234.7C875.3,224,904,192,932,176C960,160,988,160,1016,186.7C1044.7,213,1073,267,1101,245.3C1129.4,224,1158,128,1186,96C1214.1,64,1242,96,1271,106.7C1298.8,117,1327,107,1355,96C1383.5,85,1412,75,1426,69.3L1440,64L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"
          ></path>
        </svg>
        <div className="max-w-[60vw] lg:max-w-[100vw] md:max-w-[300px] px-3 pb-16 xl:pr-2">
          <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row bg">
            <div className="  w-full max-w-4xl flex-grow pt-10">
              <h1 className=" text-4xl justify-center uppercase  font-semibold text-indigo-900  ">
                Prescriptions
              </h1>
              <div className="rounded-2xl overflow-scroll overflow-y-hidden mb-10 mt-3 shadow-md">
                <table className="table-pin-rows table-pin-cols table-zebra-zebra bg-inherit text-indigo-900 table-zebra border border-l-2 border-r-5  shadow-inner table-sm md:table-md sm:table-sm ">
                  <thead className="">
                    <tr className=" tabs-bordered border-b-0 border font-bold text-md text-white bg-gradient-to-tr from-indigo-300 to-orange-200 ">
                      <th>Prescription ID</th>
                      <th>Patient Name</th>
                      <th>Medication</th>
                      <th>Phone Number</th>
                      <th>Doctor Name</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id} className="">
                        <td>{prescription.id}</td>
                        <td>{prescription.patientName}</td>
                        <td>{prescription.medication}</td>
                        <td>{prescription.phoneNumber}</td>
                        <td>{prescription.doctorName}</td>
                        <td>
                          {prescription.createdAt.toString().slice(3, 15)}
                        </td>

                        <td>
                          <span
                            className={`badge-${pictures[prescription.status]} badge  items-center justify-between`}
                          >
                            {" "}
                            {prescription.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            actions
                            <div
                              tabIndex={0}
                              role="button"
                              className="  z-[1] btn btn-outline dropdown-content dropdown-top drop-shadow-xl shadow-inner shadow-indigo-600 btn-primary"
                            ></div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                            >
                              <li>
                                <a href="">jdnjwndjw</a>
                              </li>
                              <li>
                                <a href="">dwdhbdhwbd</a>
                              </li>
                            </ul>
                          </div>
                        </td>
                        {/* <td>
                                        <modalsList/>
                                    </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="w-full min-h-screen bg-gradient-to-bl from-orange-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-indigo-900 mb-6">
              Prescriptions
            </h1>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Patient</th>
                    <th className="px-4 py-3 text-left">Medication</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Doctor</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{prescription.id}</td>
                      <td className="px-4 py-3">{prescription.patientName}</td>
                      <td className="px-4 py-3">{prescription.medication}</td>
                      <td className="px-4 py-3">{prescription.phoneNumber}</td>
                      <td className="px-4 py-3">{prescription.doctorName}</td>
                      <td className="px-4 py-3">
                        {prescription.createdAt.toString().slice(3, 15)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeStyles[statusColor[prescription.status]]}`}
                        >
                          {prescription.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {/*<button
                          onClick={() => handleOpenModal(prescription)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Details
                        </button>  */}
                        actions
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prescriptions;

