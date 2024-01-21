// import { db } from '../../../../lib/db'

// export default async function handler(req, res) {
//     const { prescriptionId } = req.query

//     if (typeof prescriptionId !== 'string') {
//         return res.status(400).json({ error: 'Invalid prescription ID' })
//     }

//     const prescriptionIdNumber = Number.parseInt(prescriptionId, 10)

//     try {
//         // Fetch the prescription by ID
//         const prescription = await db.prescription.findUnique({
//             where: { id: prescriptionIdNumber },
//         })

//         if (!prescription) {
//             return res.status(404).json({ error: 'Prescription not found' })
//         }

//         // Validate the prescription object before updating its status
//         if (prescription.status === 'approved') {
//             return res.status(400).json({ error: 'Prescription is already approved' })
//         }

//         // Update the prescription status to "approved"
//         const updatedPrescription = await db.prescription.update({
//             where: { id: prescription.id },
//             data: { status: 'approved' },
//         })

//         res.status(200).json(updatedPrescription)
//     } catch (error) {
//         console.error('Error approving prescription:', error)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }