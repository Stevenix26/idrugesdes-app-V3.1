// import { headers } from 'next/headers';
// import { Webhook } from 'svix';
// import { WebhookEvent } from '@clerk/nextjs/server';
// import { db } from '@/lib/db';

// // Disable the default middleware for this route
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export async function POST(req) {
//     const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

//     if (!WEBHOOK_SECRET) {
//         throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
//     }

//     // Get the headers
//     const headerPayload = headers();
//     const svix_id = headerPayload.get("svix-id");
//     const svix_timestamp = headerPayload.get("svix-timestamp");
//     const svix_signature = headerPayload.get("svix-signature");

//     // If there are no headers, error out
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//         return new Response('Error occurred -- no svix headers', {
//             status: 400
//         });
//     }

//     // Get the body
//     const payload = await req.json();
//     const body = JSON.stringify(payload);

//     // Create a new Svix instance with your webhook secret
//     const wh = new Webhook(WEBHOOK_SECRET);

//     let evt;

//     try {
//         // Verify the webhook
//         evt = wh.verify(body, {
//             "svix-id": svix_id,
//             "svix-timestamp": svix_timestamp,
//             "svix-signature": svix_signature,
//         }) as WebhookEvent;
//     } catch (err) {
//         console.error('Error verifying webhook:', err);
//         return new Response('Error occurred', {
//             status: 400
//         });
//     }

//     // Get the event type and data
//     const { type, data } = evt;

//     console.log(`Webhook received: ${type}`);

//     // Handle the event
//     try {
//         switch (type) {
//             case 'user.created':
//                 await handleUserCreated(data);
//                 break;
//             case 'user.updated':
//                 await handleUserUpdated(data);
//                 break;
//             case 'user.deleted':
//                 await handleUserDeleted(data);
//                 break;
//             default:
//                 console.log(`Unhandled event type: ${type}`);
//         }

//         return new Response('Webhook processed successfully', {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error('Error processing webhook:', error);
//         return new Response(
//             JSON.stringify({ error: 'Error processing webhook' }),
//             {
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//     }
// }

// // Handler functions for different webhook events
// async function handleUserCreated(data) {
//     try {
//         // Check if user already exists
//         const existingUser = await db.user.findUnique({
//             where: { id: data.id }
//         });

//         if (existingUser) {
//             console.log('User already exists:', data.id);
//             return;
//         }

//         // Create a new user in your database
//         await db.user.create({
//             data: {
//                 id: data.id,
//                 email: data.email_addresses[0]?.email_address,
//                 name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
//                 role: 'USER', // Default role
//                 imageUrl: data.image_url,
//             },
//         });

//         console.log('User created successfully:', data.id);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// }

// async function handleUserUpdated(data) {
//     try {
//         // Check if user exists
//         const existingUser = await db.user.findUnique({
//             where: { id: data.id }
//         });

//         if (!existingUser) {
//             console.log('User not found:', data.id);
//             return;
//         }

//         // Update the user in your database
//         await db.user.update({
//             where: { id: data.id },
//             data: {
//                 email: data.email_addresses[0]?.email_address,
//                 name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
//                 imageUrl: data.image_url,
//             },
//         });

//         console.log('User updated successfully:', data.id);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         throw error;
//     }
// }

// async function handleUserDeleted(data) {
//     try {
//         // Check if user exists
//         const existingUser = await db.user.findUnique({
//             where: { id: data.id }
//         });

//         if (!existingUser) {
//             console.log('User not found:', data.id);
//             return;
//         }

//         // Delete the user from your database
//         await db.user.delete({
//             where: { id: data.id },
//         });

//         console.log('User deleted successfully:', data.id);
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         throw error;
//     }
// } 