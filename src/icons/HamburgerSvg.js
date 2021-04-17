import React from 'react'
import {SvgXml} from "react-native-svg";

export default function HamburgerSvg() {
    const icon = `<svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 9C0 8.44772 0.447715 8 1 8H13C13.5523 8 14 8.44772 14 9C14 9.55228 13.5523 10 13 10H1C0.447716 10 0 9.55228 0 9Z" fill="#323232"/>
                  <rect width="22" height="2" rx="1" fill="#323232"/>
                  </svg>`

    const IconSvg = () => <SvgXml xml={icon} width={30} height={30} />

    return <IconSvg />
}