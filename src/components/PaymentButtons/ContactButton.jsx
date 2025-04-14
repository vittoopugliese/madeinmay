const ContactButton = ({onSuccess}) => {
    const handlePayPalPayment = () => {
        onSuccess();
    };
  
    return (
      <button
        className="paypal-button"
        onClick={handlePayPalPayment}
        style={{backgroundColor: "#25D366", color: "#ffffff"}}>
        <img
          src="./whatsapp.svgf.svg"
          alt="PayPal"
          style={{height: "24px"}}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
        WhatsApp
      </button>
    );
  };
  
  export default ContactButton;
  