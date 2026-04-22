export default function Title({titulo, descripcion}){
    return(
        <>
            <div className="flex flex-col">
                <p className="font-bold text-stone-800 tracking-tight text-6xl">{titulo}</p>
                <p className="font-normal text-xl text-stone-500 mt-2">{descripcion}</p>
            </div>
            
        </>
    );
}