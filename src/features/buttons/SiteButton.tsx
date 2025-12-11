import ButtonTypes from './types/ButtonTypes'
import './ui/SiteButton.css'

export default function SiteButton({text, buttonType, action}: {text:string, buttonType:ButtonTypes, action?: () => void}) {
    const extraClass = 
        buttonType == ButtonTypes.White ? "button-white"
        : buttonType == ButtonTypes.Blue ? "button-blue"
        : ""

    return <div className={"site-button " + extraClass}  onClick={action}>
        {text}
    </div>
}