import Swal from 'sweetalert2'

export const getServiceCost = (serviceType) => {
  switch (serviceType) {
    case "tarot":
      return 19.99;
    case "astral":
      return 10.99;
    default:
      return 19.99;
  };
};

export const parseDates = (date, type) => {
  if (type === "date") {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  if (type === "time") {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
};

export const showAlert = (title, text, icon) => {
  return Swal.fire({icon, text, title});
};

export const isReservationValid = (selectedSlot, contactInfo) => {
  if (!selectedSlot || !contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      Swal.fire({icon: 'error', title: 'Error', text: 'Por favor completa los campos antes de continuar.'});
      return false; 
  };
  
  if (selectedSlot.end - selectedSlot.start > 90 * 60 * 1000) {
      Swal.fire({icon: 'error', title: 'Error', text: 'El bloque de tiempo no puede ser mayor a 1 hora y media. (Solo selecciona un bloque, no mulitples...)'});
      return false; 
  };
  
  if (new Date(selectedSlot.start) < new Date()) {
      Swal.fire({icon: 'error', title: 'Error', text: 'No puedes reservar un turno en el pasado.'});
      return false; 
  };
  
  if (contactInfo.name.length < 3) {
      Swal.fire({icon: 'error', title: 'Error', text: 'El nombre debe tener al menos 3 caracteres.'});
      return false; 
  };
  
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contactInfo.email)) {
      Swal.fire({icon: 'error', title: 'Error', text: 'El correo electrónico no es válido.'});
      return false; 
  };
  
  if (!/^\d{10,}$/.test(contactInfo.phone) || contactInfo.phone.length < 10) {
      Swal.fire({icon: 'error', title: 'Error', text: 'El teléfono no es válido.'});
      return false; 
  };
  
  if (new Date(selectedSlot.start) - new Date() < 2 * 60 * 60 * 1000) {
    // Validación de tiempo mínimo de anticipación: Requerir que las reservas se hagan con un mínimo de horas/días de anticipación.
      Swal.fire({icon: 'error', title: 'Error', text: 'Debes reservar con al menos 2 horas de anticipación.'});
      return false; 
  };
  
  return true;
};