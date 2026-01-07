import ButtonTypes from './types/ButtonTypes'
import './ui/SiteButton.css'

export default function SiteButton({ text, buttonType, action, maxWidth }: { text: string, buttonType: ButtonTypes, action?: () => void, maxWidth?: string }) {
    const extraClass =
        buttonType == ButtonTypes.White ? "button-white"
            : buttonType == ButtonTypes.Blue ? "button-blue"
                : ""

    return <div className={"site-button " + extraClass} onClick={action} style={{maxWidth: maxWidth}}>
        {text}
    </div>
}