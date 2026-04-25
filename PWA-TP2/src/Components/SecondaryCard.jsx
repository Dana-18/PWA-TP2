import Title from "./Title";
import SimpleButton from "./SimpleButton";

export default function SecondaryCard ({nombreRutina="Rutina", descripcion="Descripcion de la rutina"}) {
    return (
        <div className="p-4 py-3 justify-between rounded-3xl bg-white w-full flex">
            <div>
                <Title titulo={nombreRutina} descripcion={descripcion} size="small"/>
            </div>
            <div className="flex gap-2 items-center">
                <SimpleButton text="Editar" size="sm"/>
                <SimpleButton text="Hacer Activa" size="sm"/>
            </div>
        </div>
    );
}