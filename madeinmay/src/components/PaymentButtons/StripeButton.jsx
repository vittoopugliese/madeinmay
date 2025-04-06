const StripeButton = ({amount, onSuccess}) => {
  const handleStripePayment = () => {
    // En una implementación real, aquí integrarías Stripe Elements
    // Esta es una simulación simple
    console.log("Procesando pago con Stripe por", amount);
    // Simular procesamiento exitoso después de 2 segundos
    setTimeout(() => {
      const mockPaymentId = "ST-" + Math.random().toString(36).substring(2, 12);
      onSuccess(mockPaymentId);
    }, 2000);
  };

  return (
    <button
      className="stripe-button"
      onClick={handleStripePayment}
      style={{backgroundColor: "#6772e5", color: "#ffffff"}}>
      <img
        src="/path-to-stripe-logo.png"
        alt="Stripe"
        style={{height: "24px"}}
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
        }}
      />
      Stripe
    </button>
  );
};

export default StripeButton;
