import React from "react";
import {SvgXml} from "react-native-svg";

export const MenuIcon = () => {
    const icon = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.64062 7.91016C7.17998 7.91016 7.61719 7.47295 7.61719 6.93359V0.976562C7.61719 0.437207 7.17998 0 6.64062 0C6.10127 0 5.66406 0.437207 5.66406 0.976562V6.93359C5.66406 7.47295 6.10127 7.91016 6.64062 7.91016Z" fill="#A3A3A3"/>
                  <path d="M10.3027 0C9.76338 0 9.32617 0.437207 9.32617 0.976562V7.08008C9.32617 8.56089 8.12144 9.76562 6.64062 9.76562C5.15981 9.76562 3.95508 8.56089 3.95508 7.08008V0.976562C3.95508 0.437207 3.51787 0 2.97852 0C2.43916 0 2.00195 0.437207 2.00195 0.976562V7.08008C2.00195 9.30288 3.57368 11.1653 5.66406 11.615V24.0234C5.66406 24.5628 6.10127 25 6.64062 25C7.17998 25 7.61719 24.5628 7.61719 24.0234V11.615C9.70757 11.1653 11.2793 9.30288 11.2793 7.08008V0.976562C11.2793 0.437207 10.8421 0 10.3027 0Z" fill="#A3A3A3"/>
                  <path d="M21.805 2.60488C20.8835 0.925049 19.6598 0 18.3594 0C17.0589 0 15.8353 0.925049 14.9137 2.60488C14.1667 3.96645 13.7207 5.63945 13.7207 7.08008C13.7207 9.30288 15.2924 11.1653 17.3828 11.615V24.0234C17.3828 24.5628 17.82 25 18.3594 25C18.8987 25 19.3359 24.5628 19.3359 24.0234V11.615C21.4263 11.1653 22.998 9.30288 22.998 7.08008C22.998 5.63945 22.552 3.96645 21.805 2.60488ZM18.3594 9.76562C16.8786 9.76562 15.6738 8.56089 15.6738 7.08008C15.6738 5.96973 16.0387 4.61489 16.626 3.54429C17.1645 2.56279 17.8287 1.95312 18.3594 1.95312C18.8901 1.95312 19.5542 2.56279 20.0927 3.54429C20.68 4.61489 21.0449 5.96973 21.0449 7.08008C21.0449 8.56089 19.8402 9.76562 18.3594 9.76562Z" fill="#A3A3A3"/>
                  </svg>`

    const IconSvg = () => <SvgXml xml={icon} width={25} height={25}/>

    return <IconSvg/>
}

export const OrdersIcon = () => {
    const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4011 22.125H5.01562C3.98181 22.125 3.1355 21.2838 3.1355 20.25V6.09375C3.1355 5.05994 3.98181 4.21875 5.01562 4.21875H7.96362V4.6875C7.96362 6.2384 9.22522 7.5 10.7761 7.5C12.3268 7.5 13.5886 6.2384 13.5886 4.6875V4.21875H16.5417C17.5756 4.21875 18.4167 5.05994 18.4167 6.09375V13.3125C18.4167 13.8303 18.8364 14.25 19.3542 14.25C19.8719 14.25 20.2917 13.8303 20.2917 13.3125V6.09375C20.2917 4.02594 18.6094 2.34375 16.5417 2.34375H13.5886V0.9375C13.5886 0.419678 13.1688 0 12.6511 0H8.90112C8.3833 0 7.96362 0.419678 7.96362 0.9375V2.34375H5.01562C2.94781 2.34375 1.26562 4.02594 1.26562 6.09375V20.25C1.26562 22.3178 2.94781 24 5.01562 24H10.4011C10.9188 24 11.3386 23.5803 11.3386 23.0625C11.3386 22.5447 10.9188 22.125 10.4011 22.125ZM9.83862 1.875H11.7136V4.6875C11.7136 5.20441 11.293 5.625 10.7761 5.625C10.259 5.625 9.83862 5.20441 9.83862 4.6875V1.875ZM22.5991 16.5771L17.9594 23.0579C17.9491 23.072 17.9387 23.0859 17.9279 23.0995C17.5065 23.6237 16.8801 23.95 16.2092 23.9947C16.1561 23.9982 16.103 24 16.0501 24C15.4341 24 14.8354 23.7625 14.387 23.3355L11.3923 20.46C11.0189 20.1015 11.0068 19.5081 11.3655 19.1345C11.7239 18.7612 12.3175 18.7489 12.691 19.1078L15.6826 21.9802C15.8278 22.1184 15.9968 22.1294 16.0844 22.1239C16.1691 22.1182 16.3273 22.0865 16.4535 21.9402L21.0745 15.4856C21.3757 15.0646 21.9613 14.9676 22.3824 15.269C22.8034 15.5704 22.9005 16.1559 22.5991 16.5771ZM7.72925 11.2031C7.72925 11.7209 7.30939 12.1406 6.79175 12.1406H6.323C5.80518 12.1406 5.3855 11.7209 5.3855 11.2031C5.3855 10.6853 5.80518 10.2656 6.323 10.2656H6.79175C7.30939 10.2656 7.72925 10.6853 7.72925 11.2031ZM16.2605 11.2031C16.2605 11.7209 15.8406 12.1406 15.323 12.1406H10.073C9.55518 12.1406 9.1355 11.7209 9.1355 11.2031C9.1355 10.6853 9.55518 10.2656 10.073 10.2656H15.323C15.8406 10.2656 16.2605 10.6853 16.2605 11.2031ZM7.72925 14.9531C7.72925 15.4709 7.30939 15.8906 6.79175 15.8906H6.323C5.80518 15.8906 5.3855 15.4709 5.3855 14.9531C5.3855 14.4353 5.80518 14.0156 6.323 14.0156H6.79175C7.30939 14.0156 7.72925 14.4353 7.72925 14.9531ZM16.2605 14.9531C16.2605 15.4709 15.8406 15.8906 15.323 15.8906H10.073C9.55518 15.8906 9.1355 15.4709 9.1355 14.9531C9.1355 14.4353 9.55518 14.0156 10.073 14.0156H15.323C15.8406 14.0156 16.2605 14.4353 16.2605 14.9531Z" fill="#A3A3A3"/>
                  </svg>`

    const IconSvg = () => <SvgXml xml={icon} width={25} height={25}/>

    return <IconSvg/>
}