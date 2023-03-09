import { TableRow, TableCell } from '@material-ui/core';

function Customer({ customer }) {
   return (
      <TableRow>
         <TableCell>{customer.id}</TableCell>
         <TableCell>
            <img src={customer.image} alt="" style={{ width: '64px' }} />
         </TableCell>
         <TableCell>{customer.name}</TableCell>
         <TableCell>{customer.birthday}</TableCell>
         <TableCell>{customer.gender}</TableCell>
         <TableCell>{customer.job}</TableCell>
      </TableRow>
   );
}

export default Customer;
