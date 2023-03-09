import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import {
   Paper,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import CustomerAdd from './components/CustomerAdd';

const styles = (theme) => ({
   progress: {
      margin: theme.spacing(2),
   },
});

function App() {
   const [customers, setCustomers] = useState('');
   const [completed, setCompleted] = useState(0);

   const callApi = async () => {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
   };

   const progress = () => {
      setCompleted((prev) => (prev >= 100 ? 0 : prev + 1));
   };

   const timer = () => {
      setInterval(progress, 20);
   };

   useEffect(() => {
      callApi();
      timer();
   }, []);

   return (
      <div>
         <Paper>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>번호</TableCell>
                     <TableCell>이미지</TableCell>
                     <TableCell>이름</TableCell>
                     <TableCell>생년월일</TableCell>
                     <TableCell>성별dd</TableCell>
                     <TableCell>직업</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {customers ? (
                     customers.map((customer) => (
                        <Customer key={customer.id} customer={customer} />
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan="6" align="center">
                           <CircularProgress
                              className={styles.progress}
                              variant="determinate"
                              value={completed}
                           />
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </Paper>
         <CustomerAdd />
      </div>
   );
}

export default withStyles(styles)(App);
