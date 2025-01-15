const Footer = () => {
  return (
    <>
    <footer className='grid text-primary p-6 py-12 z-10 md:p-10 sm:p- xl:p-10'>
        {/* <div className=" bg-white rounded-lg py-4 sm:py-32 items-center justify-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              Trusted by the world’s most innovative teams
            </h2>
            <div className="mx-auto mt-10 grid max-w-md grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div> */}
        


        <div className="items-start justify-between mt-6">
        <h5 className='text-lg'>IDRUGDES CO.</h5>
        <p className='mt-4 text-sm '>
          &copy; {new Date().getFullYear()} idrugdes Co.
        </p>
        <div className='text-sm '>
          Developed by{' Agboola Stephen '}
          <span
            className='text-secondary' 
          >
            CPE/17/3096
          </span>
          {/* {' '}
          using{' '}
          <a
            className='text-cyan-600'
            href='https://www.swell.is/'
            rel='noreferrer'
            target='_blank'
          >
            React
          </a> */}
          .
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer;
