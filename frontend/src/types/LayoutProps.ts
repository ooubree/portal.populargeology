import { Instrument, Time } from './timeline'

export interface LayoutProps {
    time: Time
    instrument: Instrument
    isFooterButtonsLeft?: boolean
    isDisplayed?: boolean
}
