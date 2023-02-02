import { Comment } from './comment';

export interface Thread {
    id: string;
    title: string;
    content: string;
    comments: Comment[];
};
