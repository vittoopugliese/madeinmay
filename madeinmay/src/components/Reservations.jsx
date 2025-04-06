/* eslint-disable no-unused-vars */
import {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import PayPalButton from "./PaymentButtons/PayPalButton";
import StripeButton from "./PaymentButtons/StripeButton";
import MercadoPagoButton from "./PaymentButtons/MercadoPagoButon";
import "./Reservations.css";

const Reservations = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [serviceType, setServiceType] = useState("tarot");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);

  // Simula obtención de turnos disponibles
  // En una implementación real, esto vendría de tu backend
  useEffect(() => {
    // Crear turnos disponibles para los próximos 30 días
    const slots = [];
    const startDate = new Date();

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);

      // Verificar que sea un día entre lunes (1) y sábado (6)
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 6) {
        // Crear 4 bloques diarios: 10:00, 12:00, 14:00, 16:00
        const slots_hours = [10, 12, 14, 16];

        slots_hours.forEach((hour) => {
          const slotDate = new Date(currentDate);
          slotDate.setHours(hour, 0, 0, 0);

          // Verificar que la fecha no sea en el pasado
          if (slotDate > new Date()) {
            slots.push({
              id: `slot-${slotDate.getTime()}`,
              title: "Disponible",
              start: slotDate,
              end: new Date(slotDate.getTime() + 2 * 60 * 60 * 1000), // 2 horas después
              color: "#a67fe9", // Morado claro
              extendedProps: {
                available: true,
              },
            });
          }
        });
      }
    }

    setAvailableSlots(slots);
  }, []);

  const handleSlotSelect = (info) => {
    const {start, end} = info;
    const startHour = start.getHours();

    // Verificar que el horario seleccionado esté dentro de los permitidos
    if (startHour >= 10 && startHour <= 16 && startHour % 2 === 0) {
      setSelectedSlot({
        start,
        end: new Date(start.getTime() + 2 * 60 * 60 * 1000), // 2 horas de duración
      });
      setShowPaymentOptions(false);
    } else {
      // alert(
      //   "Por favor selecciona un horario disponible (10:00, 12:00, 14:00 o 16:00)"
      // );
    }
  };

  const handleContactInfoChange = (e) => {
    const {name, value} = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Mostrar opciones de pago
    setShowPaymentOptions(true);
  };

  const handleReservationComplete = (paymentMethod, paymentId) => {
    // Aquí enviarías los datos a tu backend
    console.log("Reserva completada", {
      slot: selectedSlot,
      contactInfo,
      serviceType,
      paymentMethod,
      paymentId,
    });

    // Aquí mostrarías un mensaje de confirmación y resetearías el formulario
    alert(
      "¡Reserva completada con éxito! Te hemos enviado un correo con los detalles."
    );
    setSelectedSlot(null);
    setShowPaymentOptions(false);
    setContactInfo({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="reservations-container">
      <h2 className="reservations-title"></h2>
      <h2 className="section-title">Reserva tu Sesión</h2>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth timeGridWeek",
          }}
          locale={esLocale}
          slotMinTime="10:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          height="auto"
          events={availableSlots}
          selectable={true}
          selectMirror={true}
          select={handleSlotSelect}
          weekends={true}
          hiddenDays={[0]} // Ocultar domingos (día 0)
          slotDuration="01:00:00"
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5, 6], // Lunes a sábado
            startTime: "10:00",
            endTime: "18:00",
          }}
        />
      </div>

      {selectedSlot && (
        <div className="booking-form-container">
          <h3>Completa tu reserva</h3>
          <p className="selected-slot-info">
            Fecha seleccionada:{" "}
            {selectedSlot.start.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="selected-slot-info">
            Hora:{" "}
            {selectedSlot.start.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {selectedSlot.end.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="serviceType">Tipo de servicio:</label>
              <select id="serviceType" value={serviceType}
                onChange={handleServiceChange} className="form-control">
                <option value="tarot">Tirada de Tarot</option>
                <option value="astral">Carta Astral</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre completo:</label>
              <input type="text" id="name" name="name"
                value={contactInfo.name}
                onChange={handleContactInfoChange}
                className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" id="email" name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input type="tel" id="phone" name="phone"
                value={contactInfo.phone}
                onChange={handleContactInfoChange}
                className="form-control" required />
            </div>

            {!showPaymentOptions && (
              <button type="submit" className="submit-btn">
                Continuar al pago
              </button>
            )}
          </form>

          {showPaymentOptions && (
            <div className="payment-options">
              <h4>Forma de Pago</h4>
              <div className="payment-buttons">
                <PayPalButton amount={serviceType === 'tarot' ? 50 : 80} onSuccess={(paymentId) => handleReservationComplete('paypal', paymentId)} />
                <StripeButton amount={serviceType === 'tarot' ? 50 : 80} onSuccess={(paymentId) => handleReservationComplete('stripe', paymentId)} />
                <MercadoPagoButton amount={serviceType === 'tarot' ? 50 : 80} onSuccess={(paymentId) => handleReservationComplete('mercadopago', paymentId)} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservations;
