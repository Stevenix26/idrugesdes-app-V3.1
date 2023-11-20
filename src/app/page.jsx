import Image from 'next/image'
import heroImage from '/public/images/shelf.jpg'
import Link from 'next/link'


const Page = () => {
  return (
    <section className='h-full'>
      <div className='relative isolate h-full overflow-hidden pt-14'>
        <Image
          alt=''
          src={heroImage}
          className='fixed inset-0 -z-10 h-full w-full object-cover'
        />

        <div
          aria-hidden='true'
          className='fixed inset-0 -z-10 bg-black/60 bg-blend-multiply'
        />

        <div className='mx-auto max-w-2xl py-32 px-4 sm:py-48 md:px-6 lg:py-56 xl:px-8'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
            <div className='relative rounded-full py-1 px-3 text-sm leading-6 text-stone-400 ring-1 ring-white/10 hover:ring-white/20'>
              Announcing Lauching of app{' '}
              <Link href='#' className='font-semibold text-white'>
                <span className='absolute inset-0' aria-hidden='true' />
                Read more <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
              We care for you and your family health.
            </h1>
            <p className='mt-6 text-lg leading-8 text-stone-300'>
              Let handle your prescription and deliver at the swift of time, 
              Check out, Our stores to submit prescription
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/store'
                className='rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
              >
                Visit stores
              </Link>
              <Link
                href='#'
                className='text-sm font-semibold leading-6 text-white'
              >
                Learn more<span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
