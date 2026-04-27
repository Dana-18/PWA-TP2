    // eslint-disable-next-line no-unused-vars
export default function Button ({as: Component = "button", className, text, children, ...props}){
    return (
        <>
            <Component className={`bg-emerald-500 text-white px-4 py-2 hover:bg-emerald-600 transition-colors ${className}`} {...props}>
                {text}
                {children}
            </Component>
        </>
    );
}