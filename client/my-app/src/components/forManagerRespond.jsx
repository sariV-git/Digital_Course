
import React, { useRef } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';

const LinearDemo=()=> {
    const toast = useRef(null);
    const router = useRouter();
    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                console.log("in Add!!")
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                router.push('/fileupload');
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://react.dev/';
            }
        }
    ];

    return (
        <div className="card">
            <div style={{ position: 'relative', height: '500px' }}>
                <Toast ref={toast} />
                {/* <SpeedDial model={items} direction="up" style={{ left: 'calc(50% - 2rem)', bottom: 0 }} />
                <SpeedDial model={items} direction="down" style={{ left: 'calc(50% - 2rem)', top: 0 }} /> */}
                <SpeedDial model={items} direction="left" style={{ top: 'calc(50% - 2rem)', right: 0 }} />
                {/* <SpeedDial model={items} direction="right" style={{ top: 'calc(50% - 2rem)', left: 0 }} /> */}
            </div>
        </div>
    )
}
   
export default LinearDemo;