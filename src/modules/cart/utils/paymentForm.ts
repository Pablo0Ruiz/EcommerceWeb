export interface CardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface FormErrors {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export const formatCardInput = (name: string, value: string): string => {
  let formattedValue = value;
  
  switch (name) {
    case "cardNumber":
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      return formattedValue.length > 19 ? formattedValue.slice(0, 19) : formattedValue;
    
    case "expiryDate":
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      return formattedValue.length > 5 ? formattedValue.slice(0, 5) : formattedValue;
    
    case "cvv":
      formattedValue = value.replace(/\D/g, "");
      return formattedValue.length > 4 ? formattedValue.slice(0, 4) : formattedValue;
    
    default:
      return formattedValue;
  }
};

export const validatePaymentForm = (cardData: CardData): { isValid: boolean; errors: FormErrors } => {
  let isValid = true;
  const errors: FormErrors = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  };


  if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, "").length !== 16) {
    errors.cardNumber = "Número de tarjeta inválido";
    isValid = false;
  }

  if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
    errors.expiryDate = "Fecha inválida";
    isValid = false;
  }


  if (!cardData.cvv || !/^\d{3,4}$/.test(cardData.cvv)) {
    errors.cvv = "CVV inválido";
    isValid = false;
  }

  if (!cardData.cardholderName || cardData.cardholderName.trim().length < 3) {
    errors.cardholderName = "Nombre inválido";
    isValid = false;
  }

  return { isValid, errors };
};