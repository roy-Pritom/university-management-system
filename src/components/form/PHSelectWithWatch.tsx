import { Form, Select} from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps={
  name:string;
  label:string;
  options:{
    value:string;
    label:string;
    disabled?:boolean
  }[] | undefined;
  disabled?:boolean;
  mode?:'multiple' | undefined;
  onValueChange?:React.Dispatch<React.SetStateAction<string>>
}

const PHSelectWithWatch = ({name,label,options,disabled,mode,onValueChange}:TPHSelectProps) => {
  const methods=useFormContext();
  const {control}=methods;
const inputValue=useWatch({
  control,
  name
})

useEffect(()=>{
    onValueChange(inputValue);
},[inputValue])

// console.log(inputValue);
    return (
       <Controller
        name={name}
       render={({field,fieldState:{error}})=>(
        <Form.Item label={label}>
        <Select
            style={{ width: "100%" }}
            {...field}
            mode={mode}
            options={options}
            disabled={disabled}
            size="large"
        />
        {error && <small style={{color:"red"}}>{error.message}</small>}
    </Form.Item>
       )}
       
       
       />

    );
};

export default PHSelectWithWatch;