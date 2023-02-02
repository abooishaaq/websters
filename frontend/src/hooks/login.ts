import { useEffect, useState } from "react";
interface User {
    username: string;
    desc: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        setUser({
            username: "John Doe",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        });
    }, []);

    return user;
}
