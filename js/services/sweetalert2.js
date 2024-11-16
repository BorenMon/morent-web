import sweetalert2 from '/js/modules/sweetalert2.all.min.js';

export const toast = (title, icon = 'success', position = 'top-end') => {
  sweetalert2.fire({
    toast: true,
    showConfirmButton: false,
    position,
    icon,
    title,
    timer: 3000,
  });
}