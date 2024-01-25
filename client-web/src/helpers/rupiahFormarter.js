export function toRupiah(number) {
  return number.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}
