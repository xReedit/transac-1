export const URL_SERVER = 'http://localhost:3000/v1/';


export const MSJ_SUCCESS: any = {
        // position: 'top-end',
        type: 'success',
        title: 'Se realizo con exito.',
        showConfirmButton: false,
        timer: 1000
};

export const MSJ_SUCCESS_TOP_END: any = {
        position: 'top-end',
        type: 'success',
        title: 'Se realizo con exito.',
        showConfirmButton: false,
        timer: 1500
};

export const MSJ_ALERT_BORRAR: any = {
        title: 'Esta seguro?',
        text: 'Borrar registro seleccionado',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si Borrar!'
};

export const MSJ_LOADING: any = {
        html:
                '<p><i class="fa fa-circle-o-notch fa-spin fa-4x fa-fw text-info"></i></p>' +
                '<p>Procesando...</p>',
        showCloseButton: false,
        showConfirmButton: false,
};

export const MSJ_ERROR: any =  {
        type: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
        footer: '',
        showCancelButton: true,
};

