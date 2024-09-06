import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {
    return (
        <div className='mx-16 mt-4'>
            <Calendar
                localizer={localizer}
                {...props}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600}}
            />
        </div>
    )
}



export default MyCalendar