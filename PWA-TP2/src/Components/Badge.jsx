export default function Badge({text, className}) {
    return (
        <>
            <span className={`text-sm font-semibold text-center p-2 rounded-2xl ${className}`}>
                {text}
            </span>
        </>
    );
}