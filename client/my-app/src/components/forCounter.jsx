import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";

const Counter=()=>{
    const toast=useRef(null) 
    const [state,setState]=useState({msg:''})
    const greet=(event)=>{
        event.preventDefault();
       toast.current.show({severity:'success',sumarry:'Success Message',detail:'succeed create lesson: '+state.msg}) ;
    };
    return(<>
    {/* <div className="grid">
        <div className="col-6">
            <Card className="m-3 shaddow-5">
                <h3>counter</h3>
                <Button label="incrment"className="p-button-success mr-2"/>
            </Card>
        </div>

    </div> */}
    <div className="grid">
        <div className="col-4">
            <Card>
                <form>
                    <InputText
                    value={state.msg}
                    onChange={(e)=>setState({...state,msg:e.target.value})}
                    placeholder="message"/>
                    <Button onClick={greet}label={'Greet'}className="p-button-success ml-2"/>
                </form>
            </Card>
            <Toast ref={toast}/>
        </div>

    </div>
    </>)
}

export default Counter;