const Footer = () => {
  return (
    <>
    <footer className='text-primary p-6 py-12 z-10 md:p-10 sm:p- xl:p-10 flex items-start justify-between'>
      <div>
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
