//the menubar in correct place

import MenubarWithEdit from './Menubar';
const Layout = ({children}) => {  
    return(
        <div>
            <MenubarWithEdit/>
            <div style={{ paddingTop: "60px" }}> {/* Adjust padding for Menubar height */}
           {children}
            </div>
        </div>
    );
}
export default Layout