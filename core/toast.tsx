import { toast } from "react-toastify";

class Toast {
  public callToastSuccess(message: string) {
    toast.success(message);
  }

  public callToastError(message: string) {
    toast.error(message);
  }
}

export default new Toast();
