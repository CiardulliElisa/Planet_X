import Swal from 'sweetalert2';

const customAlert = (message) => {
  Swal.fire({
    icon: 'info',
    iconColor: '#f0f0f0',
    text: message,
    confirmButtonText: "OK",
    customClass: {
      confirmButton: 'btn btn-outline-light btn-small',
    },
    background: '#333333',
    position: "center",
    timer: 3 * 60 * 1000,
    color: '#FFF',
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    buttonsStyling: false,
  });
};

export default customAlert;