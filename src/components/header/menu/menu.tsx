import { LuMenu } from "react-icons/lu";
import { BsXLg } from "react-icons/bs";
import {useState} from "react";
function HeaderMenu() {
    const [open,setOpen] = useState(false)
    return(
        <>
            <div className={"header-menu"} style={{display: "none"}} onClick={()=>setOpen(!open)}>
                {open ? <BsXLg/> : <LuMenu/>}
              </div>
        </>
    )
}

export default HeaderMenu