import { Input } from "antd";
import { Controller } from "react-hook-form";
type PHInputProps={
   type:string;
   name:string;
   label?:string;
}
const PHInput = ({type,name,label}:PHInputProps) => {
    
    return (
    <div className="" style={{marginBottom:"20px"}}>
        {label?label:null}
        <Controller
        name={name}
         render={({field})=>(
             <Input {...field}  type={type} id={name} size="large" />

         )}
        />
    </div>
    );
};

export default PHInput;