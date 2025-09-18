import React, { useState } from 'react'
import TranslationText from '../../../Components/TranslationText'
import { NavLink } from 'react-router-dom'
import CustomInput from '../../../Components/Form/CustomInput'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomeBtn from '../../../Components/CustomeBtn';
import { schemaForgotPassword } from '../../../Utils/ValidationUtils';
export default function StepOne({handleStepChange}) {
      const [isLoading, setIsLoading] = useState(false);
      const {
        control,
        handleSubmit,
        formState: { errors, touchedFields },
      } = useForm({
        resolver: yupResolver(schemaForgotPassword),
        mode: "onChange",
        defaultValues: {
          email: '',
        }
      });
      const onSubmit = (data) => {
        setIsLoading(!isLoading);
        handleStepChange(2, data.email);
        console.log("Login Data:", data);
        // هنا ممكن تضيف نداء API لتسجيل الدخول
      };
    return (
        <>
            <div className='text_Form_Layout'>
                <h1 className='title'>
                    <TranslationText title="ForgotPassword" />
                </h1>
                <p className='description'>
                    <TranslationText title="resetPasswordPrompt" />
                </p>
            </div>
            <form autoComplete="off"
                noValidate="noValidate" onSubmit={handleSubmit(onSubmit)} className="Auth-form">

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            label="email"
                            type="text"
                            placeholder="enterYourEmail"
                            Required
                            {...field}
                            errors={errors.email?.message}
                            touched={touchedFields.email}
                        />
                    )}
                />
                <CustomeBtn
                    type='submit'
                    title="sendOTP"
                    isLoading={isLoading}
                    className="btn-primary w-full"
                />

            </form>
        </>
    )
}
