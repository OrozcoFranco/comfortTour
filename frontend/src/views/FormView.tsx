import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";

type TravelForm = {
    cantidadPersonas: number;
    viajanNinos: string;
    fechaViaje: string;
    duracionEstadia: number;
    presupuesto: number;
    intereses: string[];
    ciudadHospedaje: string;
};

export default function PlanificarViaje() {
    const initialValues: TravelForm = {
        cantidadPersonas: 1,
        viajanNinos: "",
        fechaViaje: "",
        duracionEstadia: 1,
        presupuesto: 0,
        intereses: [],
        ciudadHospedaje: "",
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<TravelForm>({ defaultValues: initialValues });

    const enviarFormulario = async (formData: TravelForm) => {
        try {
        const { data } = await api.post("/viajes", formData);
        toast.success(data.message);
        reset();
        } catch (error) {
        if (isAxiosError(error) && error.response) {
            toast.error(error.response.data.message);
        }
        }
    };

    return (
        <>
        <h1 className="text-5xl text-white font-bold text-center">
        Planifica tu Viaje
        </h1>

        <form
            onSubmit={handleSubmit(enviarFormulario)}
            className="bg-white px-5 py-10 rounded-lg space-y-8 mt-10 max-w-md mx-auto shadow-lg"
        >
            {/* Cantidad de Personas */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                Cantidad de Personas
            </label>
            <input
                type="number"
                min={1}
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("cantidadPersonas", {
                required: "La cantidad es obligatoria",
                min: { value: 1, message: "Debe ser al menos 1 persona" },
                })}
            />
            {errors.cantidadPersonas && (
                <ErrorMessage>{errors.cantidadPersonas.message}</ErrorMessage>
            )}
            </div>

            {/* Viajan niños */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                ¿Viajan niños?
            </label>
            <select
                className="bg-slate-100 border-none p-3 rounded-lg"
                {...register("viajanNinos", {
                required: "Este campo es obligatorio",
                })}
            >
                <option value="">Selecciona una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
            </select>
            {errors.viajanNinos && (
                <ErrorMessage>{errors.viajanNinos.message}</ErrorMessage>
            )}
            </div>

            {/* Fecha de viaje */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                Fecha de Viaje
            </label>
            <input
                type="date"
                className="bg-slate-100 border-none p-3 rounded-lg"
                {...register("fechaViaje", {
                required: "La fecha es obligatoria",
                })}
            />
            {errors.fechaViaje && (
                <ErrorMessage>{errors.fechaViaje.message}</ErrorMessage>
            )}
            </div>

            {/* Duración de estadía */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                Duración de Estadía (días)
            </label>
            <input
                type="number"
                min={1}
                className="bg-slate-100 border-none p-3 rounded-lg"
                {...register("duracionEstadia", {
                required: "La duración es obligatoria",
                min: { value: 1, message: "Debe ser al menos 1 día" },
                })}
            />
            {errors.duracionEstadia && (
                <ErrorMessage>{errors.duracionEstadia.message}</ErrorMessage>
            )}
            </div>

            {/* Presupuesto */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                Presupuesto Estimado (USD)
            </label>
            <input
                type="number"
                min={0}
                className="bg-slate-100 border-none p-3 rounded-lg"
                {...register("presupuesto", {
                required: "El presupuesto es obligatorio",
                min: { value: 0, message: "Debe ser un valor positivo" },
                })}
            />
            {errors.presupuesto && (
                <ErrorMessage>{errors.presupuesto.message}</ErrorMessage>
            )}
            </div>

            {/* Intereses principales */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                Intereses Principales
            </label>
            <select
                multiple
                className="bg-slate-100 border-none p-3 rounded-lg"
                {...register("intereses", {
                required: "Selecciona al menos un interés",
                })}
            >
                <option value="gastronomia">Gastronomía</option>
                <option value="cultura">Cultura</option>
                <option value="aventura">Aventura</option>
                <option value="naturaleza">Naturaleza</option>
                <option value="vino">Enoturismo</option>
            </select>
            {errors.intereses && (
                <ErrorMessage>{errors.intereses.message}</ErrorMessage>
            )}
            </div>

            {/* Ciudad de hospedaje */}
            <div className="grid grid-cols-1 space-y-2">
            <label className="text-xl text-slate-600 font-semibold">
                Ciudad de Hospedaje
            </label>
            <input
                type="text"
                placeholder="Ej: Mendoza"
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                {...register("ciudadHospedaje", {
                required: "La ciudad es obligatoria",
                })}
            />
            {errors.ciudadHospedaje && (
                <ErrorMessage>{errors.ciudadHospedaje.message}</ErrorMessage>
            )}
            </div>

            {/* Botón */}
            <input
            type="submit"
            className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
            value="Enviar Plan"
            />
        </form>
        </>
    ) ;
    }
