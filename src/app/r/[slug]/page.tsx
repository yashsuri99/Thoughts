import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import MiniCreatePost from '@/components/MiniCreatePost';

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subthought.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subthought: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className={'font-bold text-3xl md:text-4xl h-14'}>
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      {/* TODO: Show Posts in User feed */}
    </>
  );
};

export default page;
