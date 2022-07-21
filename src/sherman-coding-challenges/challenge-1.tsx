const things: any = {
    taxi: "a car licensed to transport passengers in return for payment of a fare",
    food: {
        sushi: "a traditional Japanese dish of prepared rice accompanied by seafood and vegetables",
        apple: {
            Honeycrisp: "an apple cultivar developed at the MAES Horticultural Research Center",
            Fuji: "an apple cultivar developed by growers at Tohoku Research Station",
        },
    },
};

export const Challenge1 = () => {

    return (
        <>
            <div>Challenge One</div>
            <ChallengeOneComp things={things} />
        </>
    );
};

interface ChallengeOneCompProps {
    things: any;
    indent?: number;
}

export const ChallengeOneComp = ({ things, indent }: ChallengeOneCompProps) => {
    return (
        <div>
            {Object.keys(things).map(x => {
                indent = indent ?? 0;
                if (typeof things?.[x] === 'string') {
                    return renderWrapper({
                        indent,
                        key: x,
                        children: <>{things[x]}</>
                    });
                    // return (<div key={x} style={{ marginLeft: indent * 30 }}>{x}: {things[x]}</div>);
                }
                return renderWrapper({
                    indent,
                    key: x,
                    children: ChallengeOneComp({ things: things[x], indent: ((indent ?? 0) + 1) })
                });
                // return (
                //     <div key={x} style={{ marginLeft: (indent ?? 0) * 30 }}>
                //         {x}:
                //         {ChallengeOneComp({ things: things[x], indent: ((indent ?? 0) + 1) })}
                //     </div>
                // );
            })}
        </div>
    );
};

interface RenderWrapperProps {
    key: string;
    indent: number;
    children?: JSX.Element;
}

const renderWrapper = ({ key, indent, children }: RenderWrapperProps) => (
    <div key={key} style={{ marginLeft: indent * 30 }}>
        {key}: {children}
    </div>
);
