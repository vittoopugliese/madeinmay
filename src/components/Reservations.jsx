/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { getServiceCost, isReservationValid, parseDates, showAlert } from "../utils";
import "./Reservations.css";
import ContactButton from "./PaymentButtons/ContactButton";

const Reservations = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [serviceType, setServiceType] = useState("tarot");
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({name: "", email: "", phone: ""});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // useEffect(() => {
    // getEvents();
    // const urlParams = new URLSearchParams(window.location.search);
    // const status = urlParams.get('status');
    // if (status === "success") {
    //   showAlert("Reserva exitosa", "¡Tu pago fue procesado correctamente! Tu reserva ha sido confirmada.", "success");
    //   getEvents();
    // } else if (status === "failure") {
    //   showAlert("Pago fallido", "No se pudo procesar tu pago. Por favor, intenta nuevamente.", "error");
    // } else if (status === "pending") {
    //   showAlert("Pago pendiente", "Tu pago está siendo procesado. Te notificaremos cuando se confirme.", "info");
    // };
    // if (status) window.history.replaceState({}, document.title, window.location.pathname);
  // }, []);

  // const getEvents = async () => {
  //   const response = await fetch('http://localhost:5000/events');
  //   const data = await response.json();

  //   setAvailableSlots(data.map(event => ({
  //     start: new Date(event.slot.start),
  //     end: new Date(event.slot.end),
  //     title: "Bloque reservado"
  //   })));
  // };

  const handleSlotSelect = (info) => {
    const {start, end} = info;
    setSelectedSlot({start, end});
  };

  const handleContactInfoChange = (e) => {
    const {name, value} = e.target;
    setContactInfo((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert("Por favor completa los campos");
      return;
    };
  };

  const handleWhatsAppContactMessage = () => {
    if (!isReservationValid(selectedSlot, contactInfo)) return;

    const date = parseDates(selectedSlot.start, "date");
    const startTime = parseDates(selectedSlot.start, "time");
    const endTime = parseDates(selectedSlot.end, "time");
    
    const serviceLabel = serviceType === "tarot" ? "Tirada de Tarot" : "Carta Astral";
    
    const message = `Hola! Mi nombre es ${contactInfo.name} y quiero reservar una sesión.
    
      *Detalles de la reserva:*
      - Servicio: ${serviceLabel}
      - Fecha: ${date}
      - Hora: de ${startTime} a ${endTime}
      - Email: ${contactInfo.email}
      - Teléfono: ${contactInfo.phone}
      
      Por favor quedo a la espera de la confirmación de mi reserva . Gracias!
    `;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/5491150172097?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  // const handleReservationComplete = async (paymentMethod, paymentId) => {
  //   setLoading(true);

  //   const reservation = await fetch("http://localhost:5000/events", {
  //     method: "POST", headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       slot: selectedSlot,
  //       contactInfo,
  //       serviceType,
  //       paymentMethod,
  //       paymentId,
  //     }),
  //   });

  //   setSelectedSlot(null);
  //   setContactInfo({name: "", email: "", phone: ""});
  //   setLoading(false);
    
  //   showAlert(
  //     !reservation.ok ? "Reserva Fallida" : "Reserva exitosa",
  //     !reservation.ok ? "No pudimos concretar la reserva... parece ser que el pago no se hizo, por favor, intente de nuevo." : `Tu reserva ha sido confirmada para el ${parseDates(selectedSlot.start, "date")} desde las ${parseDates(selectedSlot.start, "time")} hasta ${parseDates(selectedSlot.end, "time")}.`,
  //     !reservation.ok ? "error" : "success"
  //   );

  //   if (reservation.ok) {
  //     const data = await reservation.json();
  //     setAvailableSlots((prev) => [...prev, {
  //         start: new Date(data.event.slot.start),
  //         end: new Date(data.event.slot.end),
  //         title: "Bloque reservado",
  //       },
  //     ]);
  //   };
  // };

  const handleDateClick = (info) => {
    // Para dispositivos móviles, crear un slot de 1.5 horas al hacer tap en una fecha
    const start = new Date(info.date);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 90); // 1.5 horas (90 minutos)
    
    setSelectedSlot({start, end});
  };

  return (
    <div className="reservations-container" id="reservas">
      <h2 className="reservations-title"></h2>
      <h2 className="section-title">Reserva tu Sesión</h2>

      <div className="calendar-container">
      <FullCalendar
          events={availableSlots}
          select={handleSlotSelect}
          dateClick={handleDateClick}
          businessHours={{daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: "09:00", endTime: "18:00"}}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next", 
            center: "title", 
            right: isMobile ? "timeGridDay,today" : "today"
          }}
          initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
          locale={esLocale}
          slotMinTime="09:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          height="auto"
          hiddenDays={[0]}
          selectable={true}
          selectMirror={true}
          eventColor="#a67fe9"
          slotDuration="01:30:00"
          longPressDelay={0}
          selectLongPressDelay={0}
        />
      </div>

      {selectedSlot && (
        <div className="booking-form-container">
          <h3>Completa tu reserva</h3>
          <p className="selected-slot-info">
            Sesión para el {parseDates(selectedSlot.start, "date")} desde las {parseDates(selectedSlot.start, "time")} hasta {parseDates(selectedSlot.end, "time")}
          </p>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="serviceType">Tipo de servicio:</label>
              <select id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="form-control">
                <option value="tarot">Tirada de Tarot</option>
                <option value="astral">Carta Astral</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Nombre completo:</label>
              <input type="text" id="name" name="name"value={contactInfo.name}
                onChange={handleContactInfoChange} className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" id="email" name="email" value={contactInfo.email}
                onChange={handleContactInfoChange} className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input type="tel" id="phone" name="phone" value={contactInfo.phone}
                onChange={handleContactInfoChange} className="form-control" required />
            </div>
          </form>

          <div className="payment-options">
          {
            loading ? (
              <div className="center">
                <span className="loader"></span>
              </div>
            ) : (
              <>
              <div className="payment-buttons">
              {/* <MercadoPagoButton selectedSlot={selectedSlot} contactInfo={contactInfo} amount={getServiceCost(serviceType)}
                   onSuccess={(paymentId) => handleReservationComplete('mercadopago', paymentId)} serviceType={serviceType} /> */}
                   <ContactButton onSuccess={handleWhatsAppContactMessage} />
              </div>
              </>
            )
          }
              <h4 style={{
                marginTop: 24, 
                lineHeight: "1.8" 
              }}>
                Por motivos de seguridad,<br />
                tu turno será agendado en el calendario<br />
                una vez realizado y confirmado el pago por WhatsApp<br />
                ¡disculpa las molestias!
              </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
