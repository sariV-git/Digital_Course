import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { useSelector } from 'react-redux';

const IntroduceUsers=() =>{
    const [customers, setCustomers] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [token,setToken]=useState(useSelector(state=>state.token.token))
    const[load,setLoad]=useState(true)
    const loadData=async()=>{
        try {
            const respond=await axios.get('http://localhost:5000/user',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
               console.log('users: ',respond.data);
               setCustomers(respond.data)

                } catch (error) {
            setLoad(false)
        }
    }
    useEffect(() => {
        // CustomerService.getCustomersMedium().then((data) => setCustomers(data));
        loadData();
    }, []);

    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
    };

    return (

        <div className="card">
        {load?<><Button label="see Users" icon="pi pi-external-link" onClick={() => setDialogVisible(true)} />
        <Dialog header="Flex Scroll" visible={dialogVisible} style={{ width: '75vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
            <DataTable value={customers} scrollable scrollHeight="flex" tableStyle={{ minWidth: '50rem' }}>
                <Column field="name.firstName" header="first Name"></Column>
                <Column field="name.lastName" header="last Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Phone"></Column>
            </DataTable>
        </Dialog></>:<>Loading...</>}
        
        </div>
    );
}
export default IntroduceUsers