export default function Title({titulo, descripcion, size="large", className, children=""}) {
    let titleClasses = "font-bold text-stone-800 tracking-tight";
    let descriptionClasses = "font-normal text-stone-500 mt-2";

    if (size === "medium") {
        titleClasses += " text-2xl";
        descriptionClasses += " text-base";
    }  else if (size === "small"){
        titleClasses += " text-xl";
        descriptionClasses += " text-sm";
    }else {
        titleClasses += " text-6xl";
        descriptionClasses += " text-xl";
    }

    return(
        <>
            <div className={`flex flex-col ${className}`}>
                <p className={`flex flex-row items-center ${titleClasses}`}>{titulo}{children}</p>
                <p className={descriptionClasses}>{descripcion}</p>
            </div>
            
        </>
    );
}