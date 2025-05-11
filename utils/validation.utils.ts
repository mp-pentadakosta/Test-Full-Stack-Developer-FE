import { ValidationError } from "@react-types/shared/src/inputs";

class ValidationUtils {
  isValidEmail(email: string): true | ValidationError | null | undefined {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const resp = emailRegex.test(email);

    if (!resp) {
      return "Email is not valid";
    }

    return true;
  }

  isValidPassword(password: string): true | ValidationError | null | undefined {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const resp = passwordRegex.test(password);

    if (!resp) {
      return "Password must be at least 8 characters, and must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    return true;
  }

  isValidUsername(username: string): true | ValidationError | null | undefined {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

    const resp = usernameRegex.test(username);

    if (!resp) {
      return "Username must be at least 3 characters";
    }

    return true;
  }

  isValidName(name: string): true | ValidationError | null | undefined {
    const nameRegex = /^[a-zA-Z ]{3,}$/;

    const resp = nameRegex.test(name);

    if (!resp) {
      return "Name must be at least 3 characters";
    }

    return true;
  }

  isValidPhone(phone: string): true | ValidationError | null | undefined {
    const phoneRegex = /^[0-9]{10,}$/;

    const resp = phoneRegex.test(phone);

    if (!resp) {
      return "Phone number must be at least 10 characters";
    }

    return true;
  }

  isValidAddress(address: string): true | ValidationError | null | undefined {
    const addressRegex = /^[a-zA-Z0-9 ]{3,}$/;

    const resp = addressRegex.test(address);

    if (!resp) {
      return "Address must be at least 3 characters";
    }

    return true;
  }

  isValidCity(city: string): true | ValidationError | null | undefined {
    const cityRegex = /^[a-zA-Z ]{3,}$/;

    const resp = cityRegex.test(city);

    if (!resp) {
      return "City must be at least 3 characters";
    }

    return true;
  }

  isValidCountry(country: string): true | ValidationError | null | undefined {
    const countryRegex = /^[a-zA-Z ]{3,}$/;

    const resp = countryRegex.test(country);

    if (!resp) {
      return "Country must be at least 3 characters";
    }

    return true;
  }

  isValidZipCode(zipCode: string): true | ValidationError | null | undefined {
    const zipCodeRegex = /^[0-9]{6,}$/;

    const resp = zipCodeRegex.test(zipCode);

    if (!resp) {
      return "Zip code must be at least 6 characters";
    }

    return true;
  }

  isValidDate(date: string): true | ValidationError | null | undefined {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const resp = dateRegex.test(date);

    if (!resp) {
      return "Date must be in format YYYY-MM-DD";
    }

    return true;
  }

  maxSizeImage(file: File): true | ValidationError | null | undefined {
    const resp = file.size < 2000000;

    if (!resp) {
      return "Image size must be less than 2MB";
    }

    return true;
  }
}

export default new ValidationUtils();
