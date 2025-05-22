// "use client";
// import { useSignUp } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export default function SignUpPage() {
//     const { isLoaded, signUp } = useSignUp();
//     const [role, setRole] = useState("PATIENT");
//     const [email, setEmail] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [password, setPassword] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [pendingVerification, setPendingVerification] = useState(false);
//     const [code, setCode] = useState("");
//     const router = useRouter();

//     // Additional fields for pharmacist
//     const [licenseNumber, setLicenseNumber] = useState("");
//     const [specialization, setSpecialization] = useState("");
//     const [yearsOfExperience, setYearsOfExperience] = useState("");
//     const [pharmacyId, setPharmacyId] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!isLoaded) return;

//         try {
//             // Start the sign-up process with Clerk
//             const result = await signUp.create({
//                 emailAddress: email,
//                 password,
//                 firstName,
//                 lastName,
//             });

//             // Send the verification email
//             await result.prepareEmailAddressVerification({ strategy: "email_code" });

//             // Set pending verification to true
//             setPendingVerification(true);

//             // Create user in your database with role
//             await axios.post("/api/users", {
//                 email,
//                 firstName,
//                 lastName,
//                 role,
//                 phoneNumber,
//                 ...(role === "PHARMACIST" && {
//                     pharmacistDetails: {
//                         licenseNumber,
//                         specialization,
//                         yearsOfExperience: parseInt(yearsOfExperience),
//                         pharmacyId,
//                     },
//                 }),
//             });

//             toast.success("Verification email sent!");
//         } catch (err) {
//             console.error("Error:", err);
//             toast.error(err.message || "Something went wrong");
//         }
//     };

//     const handleVerify = async (e) => {
//         e.preventDefault();
//         if (!isLoaded) return;

//         try {
//             const completeSignUp = await signUp.attemptEmailAddressVerification({
//                 code,
//             });
//             if (completeSignUp.status !== "complete") {
//                 toast.error("Verification failed");
//                 return;
//             }

//             toast.success("Account verified!");
//             router.push("/dashboard");
//         } catch (err) {
//             console.error("Error:", err);
//             toast.error(err.message || "Error verifying email");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-base-200">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
//                 {!pendingVerification ? (
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Role</span>
//                             </label>
//                             <select
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 className="select select-bordered w-full"
//                             >
//                                 <option value="PATIENT">Patient</option>
//                                 <option value="PHARMACIST">Pharmacist</option>
//                             </select>
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">First Name</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Last Name</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email</span>
//                             </label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Phone Number</span>
//                             </label>
//                             <input
//                                 type="tel"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         {role === "PHARMACIST" && (
//                             <>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">License Number</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={licenseNumber}
//                                         onChange={(e) => setLicenseNumber(e.target.value)}
//                                         className="input input-bordered"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Specialization</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={specialization}
//                                         onChange={(e) => setSpecialization(e.target.value)}
//                                         className="input input-bordered"
//                                     />
//                                 </div>

//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Years of Experience</span>
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={yearsOfExperience}
//                                         onChange={(e) => setYearsOfExperience(e.target.value)}
//                                         className="input input-bordered"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Pharmacy ID</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={pharmacyId}
//                                         onChange={(e) => setPharmacyId(e.target.value)}
//                                         className="input input-bordered"
//                                         required
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         <button type="submit" className="btn btn-primary w-full">
//                             Sign Up
//                         </button>
//                     </form>
//                 ) : (
//                     <form onSubmit={handleVerify} className="space-y-4">
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Verification Code</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={code}
//                                 onChange={(e) => setCode(e.target.value)}
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary w-full">
//                             Verify Email
//                         </button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// } 