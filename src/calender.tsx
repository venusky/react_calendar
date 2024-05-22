import React, {useState} from 'react';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    HostName?: string;
}

const MyCalender: React.FC<Omit<CalendarProps, 'localizer'>> = (props) => {

    const [events, setEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [selectDate, setSelectDate] = useState<Date | null>(null)
    const [eventTitle, setEventTitle] = useState('')

    const handleSelectSlot = (slotInfo:any) =>{
        setShowModal(true)
        setSelectDate(slotInfo.start)
    }

    const saveEvent = () =>{
        if (eventTitle && selectDate) {
            const newEvent = {
                title: eventTitle,
                start: selectDate,
                end: moment(selectDate).add(1, 'hours').toDate()
            };
            setEvents([...events, newEvent]);
            setShowModal(false)
            setEventTitle('')
        }
    }

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable={true}
                onSelectSlot={handleSelectSlot}
                {...props}
            />

            {showModal && (
                <div className="modal" style={{
                    display:'block',
                    backgroundColor: 'rgba(0.0.0.0.5',
                    position:'fixed',
                    top:0,
                    bottom:0,
                    right:0
                }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Set your event</h5>
                                <button type="button" className="btn-close" onClick={()=> setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label className={"py-8"}>tape event title.</label>
                                <input
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    type={'text'}
                                    className={'form-control'}
                                    id={'eventTitle'}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=> setShowModal(false)} data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" onClick={saveEvent} className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCalender;
