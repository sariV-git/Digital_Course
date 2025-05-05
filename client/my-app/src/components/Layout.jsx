//the menubar in correct place

import Menubar from './Menubar';
const Layout = ({children}) => {  
    return(
        <div>
            <Menubar/>
            <div style={{ paddingTop: "60px" }}> {/* Adjust padding for Menubar height */}
           {children}
            </div>
        </div>
    );
}
export default Layout