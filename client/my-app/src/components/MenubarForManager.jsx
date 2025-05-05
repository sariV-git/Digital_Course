import { Card } from "primereact/card"
import { useLocation } from "react-router-dom"
//can delete it?? 

const MenubarForManager = () => {
    const location=useLocation()
    return <div>
        <Menubar start={'DIGITAL COURSE -hello Manager'} model={items} />
    </div>
}

export default MenubarForManager