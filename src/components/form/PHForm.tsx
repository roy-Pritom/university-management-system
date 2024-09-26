import { Form } from "antd";
import { ReactNode } from "react";
import {  FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TPHFormProps={
    onSubmit:SubmitHandler<FieldValues>;
    children:ReactNode;
} & TFormConfig;
type TFormConfig={
    defaultValues?:Record<string,any>,
    resolver?:any;
}
const PHForm = ({children,onSubmit,defaultValues,resolver}:TPHFormProps) => {
  const formConfig:TFormConfig={};
  if(defaultValues){
    formConfig['defaultValues']=defaultValues;
  }
  if(resolver){
    formConfig['resolver']=resolver;
  }
//   console.log(formConfig);

    const methods = useForm(formConfig)
    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>{children}</Form>
        </FormProvider>
    );
};

export default PHForm;