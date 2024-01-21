
import Sidebar from "@/components/Sidebar"
export default function DashLayout ({children}){
    return(
        <>
        <Sidebar />
        {children}
        </>
    )
}