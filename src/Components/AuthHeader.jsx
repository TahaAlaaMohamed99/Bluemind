import React from 'react'
import { IconLogoSvg } from '../Assets/Icons/IconsSvg'
import ActionsTheme from './ActionsTheme'
import '../Styles/AuthHeader/styles.css'
import TranslationText from './TranslationText'
export default function AuthHeader() {
    return (
        <header className='Auth_Header'>
            <div className='logo'>
                <IconLogoSvg />
            </div>
            <div className='actions'>
                <ActionsTheme />
            </div>
        </header>
    )
}
