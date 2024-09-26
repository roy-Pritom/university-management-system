import { Form, TimePicker} from "antd";
import { Controller } from "react-hook-form";

type TPHTimePickerProps={
  name:string;
  label:string;

}
const PHTimePicker = ({name,label}:TPHTimePickerProps) => {
    return (
        <Controller
        name={name}
       render={({field})=>(
        <Form.Item label={label}>
             <TimePicker {...field} size="large" style={{width:"100%"}}/>
    </Form.Item>
       )}
       
       
       />
    );
};

export default PHTimePicker;