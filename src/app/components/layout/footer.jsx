const Footer = () => {
  return (
    <footer className='z-10 py-7 text-stone-400'>
      <div className='container'>
        <h5 className='text-lg'>IDRUGDES CO.</h5>
        <p className='mt-4 text-sm text-stone-500'>
          &copy; {new Date().getFullYear()} idrugdes Co.
        </p>
        <div className='text-sm text-stone-400'>
          Developed by{' Agboola Stephen '}
          <a
            className='text-sky-600'
            href='##'
            rel='noreferrer'
            target='_blank'
          >
            HB
          </a>{' '}
          using{' '}
          <a
            className='text-cyan-600'
            href='https://www.swell.is/'
            rel='noreferrer'
            target='_blank'
          >
            React
          </a>
          .
        </div>
      </div>
    </footer>
  )
}

export default Footer
