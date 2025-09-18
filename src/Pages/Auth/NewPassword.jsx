import React from 'react'
import TranslationText from '../../Components/TranslationText'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomeBtn from '../../Components/CustomeBtn';
import CustomInput from '../../Components/Form/CustomInput';
import { schemaNewPassword } from '../../Utils/ValidationUtils';
export default function NewPassword({ keyParam,title,description,Api }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, touchedFields },

    } = useForm({
        resolver: yupResolver(schemaNewPassword),
        mode: "onChange",
        defaultValues: {
            password: '',
            confirmPassword: '',
        }
    });


    const onSubmit = (data) => {
        setIsLoading(!isLoading);
        console.log("Login Data:", data);
        // هنا ممكن تضيف نداء API لتسجيل الدخول
    };
    return (
        <>
            <div className='text_Form_Layout'>
                <h1 className='title'>
                    <TranslationText title={title} />
                </h1>
                <p className='description'>
                    <TranslationText title={description} />
                </p>
            </div>
            <form autoComplete="off"
                noValidate="noValidate" onSubmit={handleSubmit(onSubmit)} className="Auth-form">



                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            label="password"
                            type="password"
                            placeholder="enterYourPassword"
                            className="form_group_icon"
                            Required
                            {...field}
                            errors={errors.password?.message}
                            touched={touchedFields.password}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            label="confirmPassword"
                            type="password"
                            placeholder="enterconfirmPassword"
                            className="form_group_icon"
                            Required
                            {...field}
                            errors={errors.confirmPassword?.message}
                            touched={touchedFields.confirmPassword}
                        />
                    )}
                />
                <CustomeBtn
                    type='submit'
                    title="signIn"
                    isLoading={isLoading}
                    className="btn-primary w-full"
                />

            </form>
        </>
    )
}
