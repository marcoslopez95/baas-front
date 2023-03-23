const db = {
    status: {
           Active: 'Active',
           Inactive: 'Inactive',
           Verification: 'En verificacion',
           Awaiting: 'En espera de comprobante',
           Accept: 'Aceptado',
           Reject: 'Rechazado',
           true: 'true',
           false: 'false',
         },
       statusColor: {
           true: 'success',
           false: 'error',
           Verification: 'warning',
           Awaiting: 'info',
           Accept: 'success',
           Reject: 'error',      
         }
   }
   
   export default db;