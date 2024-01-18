import React from 'react'

const OrdersPage = () => {
  return (
    <>
        <div className='p-4 lg:px-5 xl:px-5'>
            <div >
                <h1 className="text-center text-lg">Orders Page</h1>
            </div>
                <table class="table table-striped mt-4 text-center w-full">
                    <thead>
                        <tr className='text-left'>
                            <th scope="col">Order ID</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price per Item ($)</th>
                            <th scope="col">Total Price ($)</th>
                            <th scope="col"></th>
                            </tr>
                    </thead>
                        <tbody>
                                <tr className='text-sm md:text-base odd:bg-gray-100'>
                                    <td>0001</td>
                                    <td>John Doe</td>
                                    <td>iPhone 13 Pro Max</td>
                                    <td>2</td>
                                    <td>950.00</td>
                                    <td>1900.00</td>
                                    <td><button type="button" class="btn btn-primary">View Details
                                    </button></td>
                                </tr>
                            </tbody>
                </table>
                                   {/* <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-end">
                                            <li class="page-item disabled">
                                                <a class="page-link" href="#" tabindex="-1"
                                                aria-disabled="true"><span
                                                aria-hidden="true">&laquo;</span></a>
                                                </li>
                                                <li class="page-item active"><a class="page-link" href="#">1<span class="sr-only">(current)</span></a>
                                                </li>
                                                <li class="page-item"><a class="page-link" href="#
                                                2">2</a></li>
                                                <li class="page-item">
                                                <a class="page-link" href="#3">3</a>
                                                </li>
                                                <li class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
    </a>
    </li>
    </ul>
    </nav> */}
    </div>
                                                    
                                               
    </>
  )
}

export default OrdersPage