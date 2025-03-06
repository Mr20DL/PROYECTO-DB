import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reportes() {
  const [reporteActivo, setReporteActivo] = useState('salario');
  const [datosReporte, setDatosReporte] = useState([]);
  const [parametros, setParametros] = useState({
    empleadoId: '',
    email: '',
    inicio: '',
    fin: ''
  });

  // Definición completa de reportes
  const reportes = {
    salario: {
      nombre: 'Salario Promedio',
      endpoint: '/reportes/salario-promedio',
      columnas: ['Departamento', 'Salario Promedio']
    },
    topCapacitaciones: {
      nombre: 'Top Capacitaciones',
      endpoint: '/reportes/top-capacitaciones',
      columnas: ['Empleado', 'Total Capacitaciones']
    },
    asistencias: {
      nombre: 'Asistencias Incompletas',
      endpoint: '/reportes/asistencias-incompletas',
      columnas: ['Empleado', 'Fecha', 'Hora Entrada']
    },
    vacaciones: {
      nombre: 'Estados Vacaciones',
      endpoint: '/reportes/vacaciones-estado',
      columnas: ['Estado', 'Total']
    },
    sinCapacitaciones: {
      nombre: 'Empleados sin Capacitaciones',
      endpoint: '/reportes/empleados-sin-capacitaciones',
      columnas: ['ID', 'Nombre', 'Email', 'Puesto']
    },
    pagosDepartamento: {
      nombre: 'Pagos por Departamento',
      endpoint: '/reportes/pagos-departamentos',
      columnas: ['Departamento', 'Total Pagado']
    },
    bajoDesempeno: {
      nombre: 'Bajo Desempeño',
      endpoint: '/reportes/bajo-desempeno',
      columnas: ['Empleado', 'Fecha', 'Desempeño']
    },
    capacitacionesMes: {
      nombre: 'Capacitaciones por Mes',
      endpoint: '/reportes/capacitaciones-mensuales',
      columnas: ['Mes', 'Total Capacitaciones']
    },
    multiplesPuestos: {
      nombre: 'Múltiples Puestos',
      endpoint: '/reportes/empleados-multiples-puestos',
      columnas: ['Empleado', 'Cambios de Puesto']
    },
    resumenDepartamentos: {
      nombre: 'Resumen Departamentos',
      endpoint: '/reportes/resumen-departamental',
      columnas: ['Departamento', 'Empleados', 'Salario Promedio']
    },
    evaluacionesRecientes: {
      nombre: 'Evaluaciones Recientes',
      endpoint: '/reportes/evaluaciones-recientes',
      columnas: ['Empleado', 'Fecha', 'Desempeño']
    },
    capacitacionesRecientes: {
      nombre: 'Capacitaciones Recientes',
      endpoint: '/reportes/capacitaciones-recientes',
      columnas: ['Nombre', 'Descripción', 'Fecha']
    },
    nominasPeriodo: {
      nombre: 'Nóminas por Periodo',
      endpoint: '/reportes/nominas-periodo',
      columnas: ['Empleado', 'Salario Base', 'Total Pago', 'Fecha']
    }
  };

  useEffect(() => {
    const cargarReporte = async () => {
      try {
        const endpoint = reportes[reporteActivo].endpoint;
        const params = obtenerParametros();
        
        const response = await axios.get(`http://localhost:3000/api${endpoint}`, {
          params
        });
        
        setDatosReporte(adaptarDatos(response.data));
      } catch (error) {
        console.error('Error cargando reporte:', error);
      }
    };

    const obtenerParametros = () => {
      switch(reporteActivo) {
        case 'historial':
          return { empleadoId: parametros.empleadoId };
        case 'nominasPeriodo':
          return { inicio: parametros.inicio, fin: parametros.fin };
        case 'busquedaEmail':
          return { email: parametros.email };
        default:
          return {};
      }
    };

    const adaptarDatos = (data) => {
      // Adaptación especial para ciertos reportes
      switch(reporteActivo) {
        case 'capacitacionesRecientes':
            return data.map(item => ({
                Nombre: item.nombre,
                'Descripción': item.descripcion,
                Fecha: new Date(item.fecha).toLocaleDateString('es-ES')
            }));
        case 'sinCapacitaciones':
            return data.map(item => ({
                ID: item.id,
                Nombre: item.nombre,
                Email: item.email,
                Puesto: item.puesto
            }));
        case 'capacitacionesMes':
          return data.map(item => ({
            mes: nombresMeses[item.mes - 1],
            total: item.total
          }));
        default:
          return data;
      }
    };

    cargarReporte();
  }, [reporteActivo, parametros]);

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(reportes).map((key) => (
          <button
            key={key}
            className={`btn ${reporteActivo === key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setReporteActivo(key)}
          >
            {reportes[key].nombre}
          </button>
        ))}
      </div>

      {/* Controles de parámetros */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {reporteActivo === 'historial' && (
          <input
            type="number"
            placeholder="ID de Empleado"
            className="input input-bordered"
            value={parametros.empleadoId}
            onChange={(e) => setParametros({...parametros, empleadoId: e.target.value})}
          />
        )}
        
        {reporteActivo === 'nominasPeriodo' && (
          <>
            <input
              type="date"
              className="input input-bordered"
              value={parametros.inicio}
              onChange={(e) => setParametros({...parametros, inicio: e.target.value})}
            />
            <input
              type="date"
              className="input input-bordered"
              value={parametros.fin}
              onChange={(e) => setParametros({...parametros, fin: e.target.value})}
            />
          </>
        )}

        {reporteActivo === 'busquedaEmail' && (
          <input
            type="text"
            placeholder="Buscar por email"
            className="input input-bordered"
            value={parametros.email}
            onChange={(e) => setParametros({...parametros, email: e.target.value})}
          />
        )}
      </div>

      {/* Tabla de resultados */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {reportes[reporteActivo].columnas.map((columna) => (
                <th key={columna}>{columna}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosReporte.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((valor, i) => (
                  <td key={i}>
                    {typeof valor === 'number' 
                      ? valor.toLocaleString('en-US', { maximumFractionDigits: 2 })
                      : valor}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}