import { MdOutlineLeaderboard } from "react-icons/md";

function MenuDropdown() {
    // const [open, setOpen] = useState(false)
 return (
     <>
         <div className={"hotpairs-section"} >
             <span><MdOutlineLeaderboard/>  LEADERBOARD</span>
             <hr className="hr-row"/>
         </div>

     {/*    {open ? <IoIosArrowUp className={"arrow-style"}/> : <IoIosArrowDown className={"arrow-style"}/>} */}
     </>
 )
}

export default MenuDropdown