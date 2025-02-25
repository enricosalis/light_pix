import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='container flex flex-col h-dvh max-w-screen-2xl items-center justify-center'>
      <div className='text-3xl md:text-7xl mb-4 md:mb-8'>Not Found</div>
      <p className='mb-10'>The page you were looking for does not exist</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}