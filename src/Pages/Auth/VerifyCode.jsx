import React, { useState } from 'react'
import TranslationText from '../../Components/TranslationText'
import OTPInput from '../../Components/Form/OTPInput'
import { schemaOTPPassword } from '../../Utils/ValidationUtils';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import CustomeBtn from '../../Components/CustomeBtn';

export default function VerifyCode({ keyParam ,handleStepChange,description}) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm({
        resolver: yupResolver(schemaOTPPassword),
        mode: "onChange",
        defaultValues: {
            otp: '',
        }
    });


    const onSubmit = (data) => {
        setIsLoading(!isLoading);
        handleStepChange(3, { email: keyParam, otp: data.otp });

        console.log("Login Data:", data);
        // هنا ممكن تضيف نداء API لتسجيل الدخول
    };
    return (
        <>
            <div className='text_Form_Layout'>
                <h1 className='title'>
                    <TranslationText title="checkYourEmail" />
                </h1>
                <p className='description'>
                    <span className='w-full block text-center'>
                        <TranslationText title="enterCodeTo" />
                    </span>
                    <span className='font-semibold me-1 text-secondary dark:text-primary'>
                        {keyParam}
                    </span>
                    <TranslationText title={description} />
                </p>
            </div>
            <form autoComplete="off"
                noValidate="noValidate"
                onSubmit={handleSubmit(onSubmit)}
                className="Auth-form">
                <div>
                    <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                            <OTPInput
                                {...field}
                                value={field.value || ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                errors={errors.otp?.message}
                                touched={touchedFields.otp}
                                length={5}
                                name="otp"
                            />
                        )}
                    />
                </div>

                {/* زر الإرسال */}

                <CustomeBtn
                    type='submit'
                    title="verifyCode"
                    isLoading={isLoading}
                    className="btn-primary w-full"
                />
            </form>
            <div className=' text-center mt-2'>
                <p className='text-sm text-titleColor-light dark:text-titleColor-dark'>
                    <TranslationText title="notReceivedEmail" />
                    <button
                        className="font-semibold ms-0.5  text-secondary dark:text-primary hover:underline"
                    >
                        <TranslationText title="resendEmail" />
                    </button>
                </p>
            </div>
        </>
    )
}
