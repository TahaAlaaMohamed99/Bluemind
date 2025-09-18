import React from 'react'
import TranslationText from '../../../Components/TranslationText'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconArrowLeft } from '../../../Assets/Icons/IconsSvg'
import StepOne from './StepOne'
import VerifyCode from '../VerifyCode'
import NewPassword from '../NewPassword'

export default function ForgotPassword() {
    const { step, key } = useParams();
    const navigate = useNavigate();
    const stepParam = atob(step) || null;
    const keyParam = atob(key) || null;
    const handleStepChange = (newStep, email) => {
        navigate(`/ForgotPassword/${btoa(newStep)}/${btoa(email)}`);
    };
    return (
        <>
            <div className='from_editor_Auth'>
                <Link to="/" className='btn_back'><span className='icon_back'>
                    <IconArrowLeft />
                </span>
                    <TranslationText title="backToLogin" />
                </Link>
                {stepParam == '1' ?
                    <StepOne handleStepChange={handleStepChange} /> :
                    stepParam == '2' ?
                        <VerifyCode description="toResetPassword" keyParam={keyParam} handleStepChange={handleStepChange} /> : stepParam == '3' ?
                            <NewPassword keyParam={keyParam} title="setNewPassword" description="createNewPasswordHint" /> : null
                }
            </div>
            <div className='steper'>
                <div className={'steper_item ' + (stepParam == '1' ? ' active' : '')} />
                <div className={'steper_item ' + (stepParam == '2' ? ' active' : '')} />
                <div className={'steper_item ' + (stepParam == '3' ? ' active' : '')} />
            </div>
        </>

    )
}
