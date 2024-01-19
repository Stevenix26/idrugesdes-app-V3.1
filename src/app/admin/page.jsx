// pages/index.js

import PrescriptionList from "./prescriptionList/page";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Prescription List</h1>
      <PrescriptionList />
    </div>
  );
}
