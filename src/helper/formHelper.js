import { toast } from "react-toastify";

let emailRegx = /\S+@\S+\.\S+/;
let mobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class formHelper {
  isEmpty(value) {
    return value === undefined || value.length === 0;
  }

  isMobile(value) {
    return mobileRegx.test(value);
  }

  isEmail(value) {
    return !emailRegx.test(value);
  }

  errorToast(msg) {
    toast.error(msg, { position: "bottom-center" });
  }
  successToast(msg) {
    toast.success(msg, { position: "bottom-center" });
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const {
  isEmpty,
  isMobile,
  isEmail,
  errorToast,
  getBase64,
  successToast,
} = new formHelper();
