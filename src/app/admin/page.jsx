
'use client'


import Link from "next/link";

const adminSections = [
  { name: "Orders", path: "/admin/orders" },
  { name: "Prescriptions", path: "/admin/prescriptionList" },
  { name: "Users", path: "/admin/contacts" },
  { name: "Inbox", path: "/admin/inbox" },
];

const AdminDashboard = () => (
  <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminSections.map((section) => (
          <Link key={section.name} href={section.path}>
            <div className="cursor-pointer bg-indigo-100 hover:bg-indigo-200 transition rounded-lg p-6 flex flex-col items-center shadow-md">
              <span className="text-xl font-semibold text-indigo-800 mb-2">{section.name}</span>
              <span className="text-indigo-500">Go to {section.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default AdminDashboard;


