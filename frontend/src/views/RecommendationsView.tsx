// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown";

// export default function Recomendaciones() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Recibimos el texto completo de recomendaciones
//   const { recommendations: initialRecommendations } = location.state || {
//     recommendations: "",
//   };

//   const [recommendations, setRecommendations] = useState(initialRecommendations);

//   useEffect(() => {
//     // 🔥 Solo conectamos SSE si no vinieron recomendaciones por state
//     if (!initialRecommendations) {
//       const eventSource = new EventSource(
//         `${import.meta.env.VITE_API_URL}/mcp/recomendar-stream`,
//         { withCredentials: true }
//       );

//       eventSource.onmessage = (event) => {
//         setRecommendations((prev: string) => prev + event.data);
//       };

//       eventSource.onerror = (err) => {
//         console.error("Error en SSE:", err);
//         eventSource.close();
//       };

//       return () => {
//         eventSource.close();
//       };
//     }
//   }, [initialRecommendations]);

//   if (!recommendations) {
//     return (
//       <div className="text-center mt-20">
//         <p className="text-xl text-red-500">No hay recomendaciones para mostrar</p>
//         <button
//           onClick={() => navigate("/form")}
//           className="mt-5 bg-cyan-400 px-5 py-2 rounded-lg font-bold text-slate-700"
//         >
//           Volver al Formulario
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-800 min-h-screen">
//       <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg">
//         <h1 className="text-4xl font-bold text-slate-700 mb-6">
//           Tus Recomendaciones
//         </h1>

//         {/* 🔥 Esto se va actualizando en vivo con el stream o se muestra el texto completo */}
//         <div className="prose prose-slate max-w-none">
//           <ReactMarkdown>{recommendations}</ReactMarkdown>
//         </div>

//         <div className="flex justify-between mt-10">
//           <button
//             onClick={() => navigate("/form")}
//             className="bg-cyan-400 px-5 py-2 rounded-lg font-bold text-slate-700"
//           >
//             Volver al Formulario
//           </button>

//           <button
//             onClick={() => navigate("/users")}
//             className="bg-green-400 px-5 py-2 rounded-lg font-bold text-white"
//           >
//             Volver al Inicio
//           </button>

//           <button
//             onClick={() => navigate("/mapa", { state: { recommendations } })}
//             className="bg-blue-500 px-5 py-2 rounded-lg text-white font-bold"
//           >
//             Ver Mapa
//           </button>
//         </div>
//       </div>
//           <div className="mt-6 p-4 bg-slate-100 rounded-lg">
//       <h2 className="text-2xl font-bold text-slate-700 mb-2">
//         Conoce Mendoza a pie!
//       </h2>
//       <p className="text-slate-600">
//         Descubre los lugares más emblemáticos de la ciudad caminando. A traves de la modalidad Free Walking Tour!
//       </p>

//         <div className="flex flex-wrap gap-3">
//     <button className="bg-cyan-400 px-4 py-2 rounded-lg font-bold text-white hover:bg-cyan-500 transition">
//       Plaza Independencia
//     </button>
//     <button className="bg-cyan-400 px-4 py-2 rounded-lg font-bold text-white hover:bg-cyan-500 transition">
//       Portones del Parque San Martín
//     </button>
//     <button className="bg-cyan-400 px-4 py-2 rounded-lg font-bold text-white hover:bg-cyan-500 transition">
//       Plaza de Chacras de Coria
//     </button>
//   </div>
//     </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Recomendaciones() {
  const location = useLocation();
  const navigate = useNavigate();

  const { recommendations: initialRecommendations } = location.state || {
    recommendations: "",
  };

  const [recommendations, setRecommendations] = useState(initialRecommendations);

  useEffect(() => {
    if (!initialRecommendations) {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_API_URL}/mcp/recomendar-stream`,
        { withCredentials: true }
      );

      eventSource.onmessage = (event) => {
        setRecommendations((prev: string) => prev + event.data);
      };

      eventSource.onerror = (err) => {
        console.error("Error en SSE:", err);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [initialRecommendations]);

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">
          Tus Recomendaciones
        </h1>

        {/* 🔥 Texto IA */}
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown>{recommendations}</ReactMarkdown>
        </div>
<div className="flex justify-between mt-10 gap-4">
  <button
    onClick={() => navigate("/form")}
    className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-bold px-5 py-2 rounded-lg shadow-lg transition"
  >
    Volver al Formulario
  </button>

  <button
    onClick={() => navigate("/users")}
    className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-bold px-5 py-2 rounded-lg shadow-lg transition"
  >
    Volver al Inicio
  </button>

  <button
    onClick={() => navigate("/mapa", { state: { recommendations } })}
    className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-bold px-5 py-2 rounded-lg shadow-lg transition"
  >
    Ver Mapa
  </button>
</div>

      </div>

      {/* 🔥 Free Walking Tour */}
      <div className="mt-10 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md text-center">
        <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 mb-8">
          Conoce Mendoza a pie!
        </h2>
        <p className="text-slate-700 text-lg mb-6">
          Descubre los lugares más emblemáticos de la ciudad caminando a través de la modalidad Free Walking Tour.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() =>
              navigate("/freeWalkingTour", { state: { lugar: "plazaIndependencia" } })
            }
            className="bg-red-500 px-6 py-3 rounded-xl font-bold text-white hover:bg-red-600 transform hover:scale-105 transition"
          >
            Plaza Independencia
          </button>
          <button
            onClick={() =>
              navigate("/freeWalkingTour", { state: { lugar: "portonesSanMartin" } })
            }
            className="bg-green-500 px-6 py-3 rounded-xl font-bold text-white hover:bg-green-600 transform hover:scale-105 transition"
          >
            Portones del Parque San Martín
          </button>
          <button
            onClick={() =>
              navigate("/freeWalkingTour", { state: { lugar: "plazaChacras" } })
            }
            className="bg-indigo-500 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-600 transform hover:scale-105 transition"
          >
            Plaza de Chacras de Coria
          </button>
        </div>
      </div>
    </div>
  );
}
