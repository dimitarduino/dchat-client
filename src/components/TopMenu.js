import React, {useState} from 'react'

import Avatar from 'react-avatar'
import {MdChat} from 'react-icons/md'
import { GrFormDown } from 'react-icons/gr'


export default function TopMenu() {
    const [settings, setSettings] = useState(false);
    const [popup, setPopup] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    //local funkcii
    const logout = () => {
        console.log('logout');
    }

    const handleChange = (e) => {
        console.log('smenav input');
        console.log(e.target.value);
        console.log(e.target.name);
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('promeni lozinka');
    }

    const { oldPassword, newPassword, confirmPassword } = passwords;
    
    return (
        <div className="top-menu container-small">
            <div className="top-menu__left">
                <div className="logo"> 
                    <MdChat className="logo-icon" />
                    <h4>D-Chat</h4>
                </div>
            </div>
            <div className="top-menu__right" onClick={() => setSettings(!settings)}>
                <div className="user-settings-toggle">
                    <Avatar className="avatar" size="30" name={`Димитар Кузмановски`} />
                    <p>Димитар Кузмановски</p>
                    <GrFormDown size="24" />
                </div>
            </div>

            {settings && (
                <div className="options-dropdown">
                    <div onClick={() => setPopup(!popup)} className="option-choose">
                        <p>Промени лозинка</p>
                    </div>
                    <div onClick={logout} className="option-choose">
                        <p>Одјави се</p>
                    </div>
                </div>
            )}


            {
                popup && (
                    <div className="settings fixed d-flex flex-center top-0 left-0 h-100 w-100 bg-dark-light z-9">
                        <div className="settings-inner d-flex flex-column bg-white box-shadow-light">
                            <div className="settings-header bb-1px-solid b-lightGrey-lighter d-flex justify-between align-center">
                                <h4 className="text-uppercase">Подесувања</h4>
                                <span onClick={() => setPopup(false)}>&#10005;</span>
                            </div>
                            <form noValidate onSubmit={onSubmit} className="settings-inner d-flex flex-column px-20px py-20px">
                                <div className="contact-box d-flex flex-column w-100 b-2px-solid b-lightGrey-lighter py-12px mt-15px">
                                    <input className="px-5px w-100" name="oldPassword" onChange={handleChange} value={oldPassword} required type="password" />
                                    <label htmlFor="">Стара лозинка</label>
                                </div>
                                <div className="contact-box d-flex flex-column w-100 b-2px-solid b-lightGrey-lighter py-12px mt-15px">
                                    <input className="px-5px w-100" name="newPassword" onChange={handleChange} value={newPassword} required type="password" />
                                    <label htmlFor="">Нова лозинка</label>
                                </div>
                                <div className="contact-box d-flex flex-column w-100 b-2px-solid b-lightGrey-lighter py-12px mt-15px">
                                    <input className="px-5px w-100" name="confirmPassword" onChange={handleChange} value={confirmPassword} required type="password" />
                                    <label htmlFor="">Потврди лозинка</label>
                                </div>
                                <div className="submit-btn mt-15px">
                                    <button className="w-100 bg-primary hover-bg-primary-dark text-uppercase hover-text-dark py-20px text-center text-white">
                                        {loadingBtn ? 'Ве молиме почекајте...' : 'Промени лозинка'}
                                    </button>
                                </div>
                              
                            </form>

                        </div>
                    </div>
                )
            }
        </div>
    )
}
