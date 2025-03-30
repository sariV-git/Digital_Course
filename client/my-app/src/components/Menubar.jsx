
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { useNavigate } from 'react-router-dom';

export default function TemplateDemo() {
    const navigate=useNavigate()
    const items = [{
        label: 'Login',
        icon: 'pi pi-user',
        command: () => {navigate('./Login') }
    }]
        return(
          <div>
            {/* <Menubar model={items} style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-200 ), var(--bluegray-500))' }}/> */}
            <Menubar start={'DIGITAL COURSE'} model={items} />
          </div>  
            
        )}
    