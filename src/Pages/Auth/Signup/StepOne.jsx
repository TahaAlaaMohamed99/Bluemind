import React, { useState } from 'react'
import TranslationText from '../../../Components/TranslationText'
import { NavLink } from 'react-router-dom'
import CustomInput from '../../../Components/Form/CustomInput'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomeBtn from '../../../Components/CustomeBtn';
import { schemaRegister } from '../../../Utils/ValidationUtils';
import CustomCheckbox from '../../../Components/Form/CustomCheckbox';
export default function StepOne({ handleStepChange }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, touchedFields },
    } = useForm({
        resolver: yupResolver(schemaRegister),
        mode: "onChange",
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            iAgree: false,
        }
    });
    const onSubmit = (data) => {
        setIsLoading(!isLoading);
        console.log("Login Data:", data);
        handleStepChange(2, data.email);

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
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            label="fullName"
                            type="text"
                            placeholder="enterYourFullName"
                            Required
                            {...field}
                            errors={errors.fullName?.message}
                            touched={touchedFields.fullName}
                        />
                    )}
                />
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

                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            label="phoneNumber"
                            type="phone"
                            placeholder="enterPhoneNumber"
                            Required
                            {...field}
                            errors={errors.phone?.message}
                            touched={touchedFields.phone}
                        />
                    )}
                />

                <div className="flex  mb-6">
                    <CustomCheckbox
                        label="agreeTerms"
                        value={watch("iAgree")}
                        onChange={() => setValue("iAgree", !watch("iAgree"))}
                        lang={true}
                    />

                    <NavLink
                        className="font-semibold ms-0.5 text-sm text-secondary dark:text-primary hover:underline"
                        to={`/ForgotPassword/${btoa(1)}/${btoa('key')}`}
                    >
                        <TranslationText title="termsAndConditions" />

                    </NavLink>
                </div>
                <CustomeBtn
                    type='submit'
                    title="createAccount"
                    isLoading={isLoading}
                    className="btn-primary w-full"
                />

            </form>
        </>
    )
}
