import Toast from "@/core/toast";

class Base64Utils {
  convertToBase64 = async (file: any, validSize?: number) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      if (validSize) {
        if (file.size > validSize * 1024 * 1024) {
          Toast.callToastError(`Size max ${validSize} mb`);

          return;
        }
      }

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        Toast.callToastError(error.type);

        return "";
      };
    });
  };

  base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mimeMatch = arr[0]?.match(/:(.*?);/); // Optional chaining untuk mencegah null error
    const mime = mimeMatch ? mimeMatch[1] : ""; // Jika null, set mime menjadi string kosong
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
}

export default new Base64Utils();
