import React, { ChangeEvent, useEffect, useRef, useState} from "react";
import { RandomUser } from "./randomUser";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import { debounce } from "lodash";
import Spinner from "react-bootstrap/Spinner";

export const Challenge9 = () => {
    const url = 'https://randomuser.me/api?results=2000';
    const [users, setUsers] = useState<RandomUser.User[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [filter, setFilter] = useState<string>('');
    // const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);
    const timeoutRef = useRef<number>(0);

    const fetchUsers = async () => {
        console.log('fetchUsers', users.length);
        if (users?.length) return;

        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) return;
        const result = await response.json() as { info: any, results: RandomUser.User[] };
        console.log('result', result.results);
        setUsers(result.results);
        setIsLoading(false);
    };

    useEffect(() => {
        void fetchUsers();
    }, []);

    // const onInputChange = (e: ChangeEvent<HTMLInputElement>) => startTransition(() => setFilter(e.currentTarget.value.toLowerCase()));
    const updateFilterDebounced = debounce((text: string) => {
        setFilter(text);
        setIsLoading(false);
    }, 1000, { leading: false });
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setIsLoading(true), 250);
        updateFilterDebounced(e.currentTarget.value);
    };

    // TODO: Extract to own component to better optimize
    const renderUser = (user: RandomUser.User) => <div key={user.name. first + user.name.last + user.cell}>{user.name.first} {user.name.last}</div>;
    const filterUser = (user: RandomUser.User) => !filter || !filter.length || (user.name.first + user.name.last).toLowerCase().includes(filter);
    const renderFilteredUsers = () => users?.filter(filterUser).map(renderUser);

    return (
        <>
            <h4>Challenge 9 - Prefix search</h4>
            <hr />

            <Container>
                <>
                    <div className={'position-relative d-flex justify-content-center align-items-center'}>
                        {isLoading && (<Spinner animation={'border'} className={'position-absolute end-0 me-2'} />)}
                        <FormControl autoFocus onChange={onInputChange} ref={inputRef} />
                    </div>
                    <br />
                    {renderFilteredUsers()}
                </>
            </Container>
        </>
    );
};
export default Challenge9;
