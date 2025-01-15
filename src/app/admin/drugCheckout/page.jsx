"use client"
import React from 'react'

const drugCheck = () => {
  return (
    <div className="min-h-screen p-4 items bg-base-200">
      <div className="container">
        <div className='grid grid-cols-1 w-full max-w-xxl p-8'>
            <div className="bg-white">
                <div className=' dropdown dropdown-content'>
                    Attached Photos
                </div>
            </div>
            <div className="mt-5">
                <div className=" items-center justify-between p-3 bg-red-800 text-white">
                    <span>seek approval from client before you serve order</span>
                </div>
                <div className="p-3 mt-3">
                    <div className='flex items-center justify-between'>
                        <span>Process Prescription #1344378</span>
                        <div className='flex justify-end gap-4'>
                         <button className='btn btn-error btn-md'>
                            cancel
                        </button>
                         <button className="btn btn-accent btn-md" onClick={() => document.getElementById('my_modal_3').showModal()}>show drug history</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Hello!</h3>
                                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                    <button className="btn">
                                        submit
                                    </button>
                                    </div>
                            </dialog>

                        </div>
                       
                    </div>
                </div>
                <div className='card p-4 shadow-lg'>
                    <div className='flex flex-1 items-center border  p-3 justify-between'>
                        <span className=' pl-3'>Client Order</span>
                        <button className='btn btn-outline btn-xs' >
                            send invoice
                        </button>
                          
                    </div>
                    <div className='p-7 items-center justify-between'>
                        <table className='table flex flex-1 table-sm border box-border border-separate '>
                            <thead>
                                <tr>
                                    <th>Prescription name </th>
                                    <th>Qty required</th>
                                    <th>Qty to supply</th>
                                    <th>Status</th>
                                    <th>Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Paracetamol TABLET 500MG
                                    </td>
                                    <td >
                                        <input className=' input  input-bordered input-xs' type="number" name="qty" id="" />
                                    </td>
                                     <td>
                                        <input className=' input  input-bordered input-xs' type="number" name="qty" id="" />
                                    </td>
                                     <td>
                                     <div className='dropdown'>
                                       <div  tabIndex={0} role='button' >
                                         Process
                                       </div>
                                     
                                        <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                                            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="pending" /></li>
                                            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Lofi" value="reject" /></li>
                                            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" /></li>
                                            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine" /></li>
                                            <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua" /></li>
                                        </ul>
                                    </div>
                                    </td>
                                    <td>
                                        <input className=' input  input-bordered input-xs' type="number" name="" id="" />
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        <div className='flex flex-col mt-4 items-end justify-items-start'>
                            <div >
                                Total Amont(NGN): <span>20.00</span>
                            </div>
                            <input type="checkbox" name="" id="" placeholder='njenejfnjefnejnfemfnjfejn' />
                            <span className='text-error'> Note: Kindly Input the  </span>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </div>

    </div>
  )
}

export default drugCheck