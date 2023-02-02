import useSWR from 'swr'
import type { Thread } from '@/types/thread';
import { fetcher } from '@/lib/fetcher';

const Thread = ({ thread }: { thread: Thread }) => {
    return (
        <div className='flex flex-col'>
            <h1>{thread.title}</h1>
            <h2>{thread.content}</h2>
            {
                thread.comments.map((comment, i) => {
                    return (
                        <div key={i}>
                            <h3>{comment.content}</h3>
                        </div>
                    )
                })
            }
        </div>

    );
};
