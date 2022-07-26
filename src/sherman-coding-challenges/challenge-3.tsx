import Button from "react-bootstrap/Button";
import { useState } from "react";

export interface BoredApi {
    activity: string;
    type: string;
    participants: number;
    price: number;
    link: string;
    key: string;
    accessibility: number;
}

export const Challenge3 = () => {
    const url = "https://www.boredapi.com/api/activity";
    const [activities, setActivities] = useState<BoredApi[]>([]);

    const onFetchActivity = async () => {
        const response = await fetch(url);
        if (!response.ok) return console.error('Error', response.statusText);
        const result = await response.json();
        setActivities(prevState => [...prevState, result]);
    };

    const renderActivities = () => <ul>{activities.map(x => <ExpandableListItem key={x.activity} activity={x} />)}</ul>;

    return (
        <div className={'d-flex flex-column align-items-center'}>
            <div>Challenge 3 - List of activities</div>
            <Button onClick={onFetchActivity}>Generate Activity</Button>
            <hr />
            {renderActivities()}
        </div>
    );
};

const ExpandableListItem = ({ activity }: { activity: BoredApi }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderActivityDetail = (activity: BoredApi) => {
        return (
            <ul>
                {Object.keys(activity).filter(x => x !== 'activity').map(x => {
                    return (
                        <li key={x}>
                            {x}: {activity[x as keyof BoredApi] + ''}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const onToggleActivityDetail = () => setIsExpanded(prevState => !prevState);

    return (
        <li key={activity.activity}>
            {activity.activity} - <Button onClick={onToggleActivityDetail}>Expand</Button>
            {isExpanded && renderActivityDetail(activity)}
        </li>
    );
};


