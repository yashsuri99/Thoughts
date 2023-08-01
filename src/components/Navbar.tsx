import Link from 'next/link';
import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { getAuthSession } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';

const NavBar = async () => {
  const session = await getAuthSession();

  return (
    <div
      className={
        'fixed top-0 inset-x-0 h-fit bg-zinc-100 border-zinc-300 z-[10] py-2'
      }
    >
      <div
        className={
          'container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'
        }
      >
        {/* logo */}
        <Link href={'/'} className={'flex gap-2 items-center'}>
          <Icons.logo className={'h-8 w-8 sm:h-6 sm:w-6'} />
          <p className={'text-zinc-700 text-sm font-medium md:block hidden'}>
            Thoughts
          </p>
        </Link>
        {/* Search Bar */}
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={'/sign-in'} className={buttonVariants()}>
            Sign-In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
